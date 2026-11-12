import express from 'express';
import fs from 'fs';
import crypto from 'crypto';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { MongoClient } from 'mongodb';
import { initialQuestionBank, ALL_SUBJECTS } from './data/questionBank.js';
import Razorpay from 'razorpay';
import {
  ALL_ROLES,
  ALL_SKILLS,
  companiesList,
  roadmapData,
  studyTips,
  resumeTips,
  githubTips,
  communicationTips,
  coreSubjects,
  placementRounds,
  codingPlatforms,
  mentorAnswers,
} from './data/placementData.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;
const DATA_DIR = path.join(__dirname, 'data');
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET || JWT_SECRET.length < 32) {
  throw new Error(
    'JWT_SECRET must be set in .env and be at least 32 characters long.'
  );
}
const MONGODB_URI = process.env.MONGODB_URI || '';

const SUPER_ADMIN_EMAIL = (process.env.SUPER_ADMIN_EMAIL || '').trim().toLowerCase();
const SUPER_ADMIN_PASSWORD = process.env.SUPER_ADMIN_PASSWORD || '';

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const QUESTIONS_FILE = path.join(DATA_DIR, 'questions.json');
const ATTEMPTS_FILE = path.join(DATA_DIR, 'attempts.json');
const USERS_FILE = path.join(DATA_DIR, 'users.json');

console.log('Users file being loaded from:', USERS_FILE);

// MongoDB handles
let mongoClient = null;
let mongoDb = null;
let isMongoConnected = false;

function sanitizeUser(u) {
  return {
    id: u.id,
    username: u.username,
    name: u.name,
    email: u.email,
    role: u.role,
    isAdmin: !!u.isAdmin,
    trackedSkills: u.trackedSkills || [
      'Data Structures and Algorithms (DSA)',
      'Database Management Systems (DBMS)',
      'Operating Systems (OS)',
    ],
    lastAssessmentScore: u.lastAssessmentScore,
    readinessLevel: u.readinessLevel || 'beginner',

    // Subscription details
    subscriptionPlan: u.subscriptionPlan || 'free',
    subscriptionExpiry: u.subscriptionExpiry || null,
    freeAssessmentCount: u.freeAssessmentCount || 0,
  };
}

function loadQuestionsFromFile() {
  try {
    if (fs.existsSync(QUESTIONS_FILE)) {
      const data = fs.readFileSync(QUESTIONS_FILE, 'utf-8');
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Error reading questions.json:', err);
  }
  fs.writeFileSync(QUESTIONS_FILE, JSON.stringify(initialQuestionBank, null, 2), 'utf-8');
  return initialQuestionBank;
}

function saveQuestionsToFile(questions) {
  fs.writeFileSync(QUESTIONS_FILE, JSON.stringify(questions, null, 2), 'utf-8');
  if (isMongoConnected && mongoDb) {
    mongoDb
      .collection('questions')
      .deleteMany({})
      .then(() => mongoDb.collection('questions').insertMany(questions))
      .catch((err) => console.error('Error syncing questions to MongoDB:', err));
  }
}

function loadAttemptsFromFile() {
  try {
    if (fs.existsSync(ATTEMPTS_FILE)) {
      const data = fs.readFileSync(ATTEMPTS_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error reading attempts.json:', err);
  }
  return [];
}

function saveAttemptsToFile(attempts) {
  fs.writeFileSync(ATTEMPTS_FILE, JSON.stringify(attempts, null, 2), 'utf-8');
}

function loadUsersFromFile() {
  try {
    if (fs.existsSync(USERS_FILE)) {
      const data = fs.readFileSync(USERS_FILE, 'utf-8');
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) {
        return parsed.map((u) => ({
          id: u.id || `u-${Date.now()}`,
          username: u.username || 'user',
          name: u.name || 'Student',
          email: u.email || `${(u.username || 'user').toLowerCase()}@skillsync.edu`,
          passwordHash: u.passwordHash || bcrypt.hashSync('Student@123', 10),
          role: u.role || 'Software Engineer',
          isAdmin: !!u.isAdmin,
          isSuperAdmin: u.isSuperAdmin === true,
          trackedSkills: u.trackedSkills || [
            'Data Structures and Algorithms (DSA)',
            'Database Management Systems (DBMS)',
            'Operating Systems (OS)',
          ],
          readinessLevel: u.readinessLevel || 'beginner',
          subscriptionPlan: u.subscriptionPlan || 'free',
subscriptionExpiry: u.subscriptionExpiry || null,
freeAssessmentCount: u.freeAssessmentCount || 0,
freeAssessmentWindowStart: u.freeAssessmentWindowStart || null,
          lastAssessmentScore: u.lastAssessmentScore,
          createdAt: u.createdAt || new Date().toISOString(),
          updatedAt: u.updatedAt || new Date().toISOString(),
        }));
      }
    }
  } catch (err) {
    console.error('Error reading users.json:', err);
  }
  return [];
}

function saveUsersToFile(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf-8');
}

let questionBank = loadQuestionsFromFile();
let assessmentAttempts = loadAttemptsFromFile();
let userAccounts = loadUsersFromFile();

function seedInitialUsers() {
  // Demo account should only be created in local development
  if (
    process.env.NODE_ENV === 'production' ||
    process.env.SEED_DEMO_USER !== 'true'
  ) {
    return;
  }

  let changed = false;

  const studentEmail = 'student@skillsync.edu';

  const existingStudent = userAccounts.find(
    (u) => u.email && u.email.toLowerCase() === studentEmail.toLowerCase()
  );

  if (!existingStudent) {
    const studentAccount = {
      id: 'student-seed-01',
      username: 'priya_sharma',
      name: 'Priya Sharma',
      email: studentEmail,
      passwordHash: bcrypt.hashSync('Student@123', 10),
      role: 'Software Engineer',
      isAdmin: false,
      trackedSkills: [
        'Data Structures and Algorithms (DSA)',
        'Database Management Systems (DBMS)',
        'Operating Systems (OS)',
      ],
      readinessLevel: 'intermediate',
      lastAssessmentScore: 68,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    userAccounts.push(studentAccount);
    changed = true;
  }

  if (changed) {
    saveUsersToFile(userAccounts);
  }
}

seedInitialUsers();

async function ensureSuperAdmin() {
  if (!SUPER_ADMIN_EMAIL || !SUPER_ADMIN_PASSWORD) {
    throw new Error('Super Admin credentials are missing from .env');
  }

  if (SUPER_ADMIN_PASSWORD.length < 12) {
    throw new Error('Super Admin password must be at least 12 characters.');
  }

  const existingUser = userAccounts.find(
    (u) => u.email?.toLowerCase() === SUPER_ADMIN_EMAIL
  );



  if (existingUser) {
    if (!existingUser.isSuperAdmin) {
      throw new Error(
        'Super Admin email already belongs to another account. Use a new email.'
      );
    }

    return;
  }

  const superAdmin = {
    id: `super-admin-${Date.now()}`,
    username: SUPER_ADMIN_EMAIL.split('@')[0],
    name: 'SkillSync Owner',
    email: SUPER_ADMIN_EMAIL,
    passwordHash: await bcrypt.hash(SUPER_ADMIN_PASSWORD, 12),
    role: 'Super Administrator',
    isAdmin: true,
    isSuperAdmin: true,
    trackedSkills: ['All Technical Subjects', 'All Aptitude Modules'],
    readinessLevel: 'advanced',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  userAccounts.push(superAdmin);
  saveUsersToFile(userAccounts);

  if (isMongoConnected && mongoDb) {
    await mongoDb.collection('users').insertOne(superAdmin);
  }

  console.log('Super Admin account created successfully.');
}

// Correct accidental admin privilege assignment
const normalStudent = userAccounts.find(
  u => u.email?.toLowerCase() === 'prerna@skillsync.edu'
);

if (normalStudent) {
  normalStudent.isAdmin = false;
  normalStudent.updatedAt = new Date().toISOString();

  saveUsersToFile(userAccounts);

  console.log('Student admin privilege corrected.');
}

// Auth Middleware: Verify JWT Bearer Token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

  if (!token) {
    return res.status(401).json({ error: 'Authentication required. No session token provided.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Session expired or invalid token. Please log in again.' });
  }
}

// Admin Middleware: Verify current admin status from database
async function requireAdmin(req, res, next) {
  try {
    let currentUser;

    if (isMongoConnected && mongoDb) {
      currentUser = await mongoDb.collection('users').findOne({
        id: req.user?.id
      });
    } else {
      currentUser = userAccounts.find(
        u => u.id === req.user?.id
      );
    }

    if (!currentUser || currentUser.isAdmin !== true) {
      return res.status(403).json({
        error: 'Access denied: Admin privileges required.'
      });
    }

    req.currentUser = currentUser;
    next();

  } catch (err) {
    console.error('Admin verification error:', err);

    return res.status(500).json({
      error: 'Unable to verify administrator privileges.'
    });
  }
}

// Super Admin Middleware: Only owner can manage admin accounts
async function requireSuperAdmin(req, res, next) {
  try {
    let currentUser;

    if (isMongoConnected && mongoDb) {
      currentUser = await mongoDb.collection('users').findOne({
        id: req.user?.id
      });
    } else {
      currentUser = userAccounts.find(
        u => u.id === req.user?.id
      );
    }

    if (!currentUser || currentUser.isSuperAdmin !== true) {
      return res.status(403).json({
        error: 'Access denied: Super Admin privileges required.'
      });
    }

    req.currentUser = currentUser;
    next();

  } catch (err) {
    console.error('Super Admin verification error:', err);

    return res.status(500).json({
      error: 'Unable to verify Super Admin privileges.'
    });
  }
}

async function startServer() {
  if (MONGODB_URI) {
    try {
      mongoClient = new MongoClient(MONGODB_URI, { serverSelectionTimeoutMS: 3000 });
      await mongoClient.connect();
      mongoDb = mongoClient.db();
      isMongoConnected = true;
      console.log('✓ Successfully connected to MongoDB cluster');

      const usersCollection = mongoDb.collection('users');
      const attemptsCollection = mongoDb.collection('attempts');
      const questionsCollection = mongoDb.collection('questions');

      const existingUsersCount = await usersCollection.countDocuments();
      if (existingUsersCount === 0 && userAccounts.length > 0) {
        await usersCollection.insertMany(userAccounts);
      } else {

  // Initialize subscription fields only when they are missing
  await usersCollection.updateMany(
    { subscriptionPlan: { $exists: false } },
    { $set: { subscriptionPlan: 'free' } }
  );

  await usersCollection.updateMany(
    { subscriptionExpiry: { $exists: false } },
    { $set: { subscriptionExpiry: null } }
  );

  await usersCollection.updateMany(
    { freeAssessmentCount: { $exists: false } },
    { $set: { freeAssessmentCount: 0 } }
  );

  const mongoUsers = await usersCollection.find().toArray();

  if (mongoUsers.length > 0) {
    userAccounts = mongoUsers;
    saveUsersToFile(userAccounts);
  }
}
      const existingQuestionsCount = await questionsCollection.countDocuments();
      if (existingQuestionsCount === 0 && questionBank.length > 0) {
        await questionsCollection.insertMany(questionBank);
      }

// Fix accidental admin privilege for normal student
const studentEmail = 'prerna@skillsync.edu';

const student = userAccounts.find(
  u => u.email?.toLowerCase() === studentEmail
);

if (student) {
  student.isAdmin = false;
  student.updatedAt = new Date().toISOString();

  await usersCollection.updateOne(
    { email: studentEmail },
    {
      $set: {
        isAdmin: false,
        updatedAt: new Date().toISOString()
      }
    }
  );

  saveUsersToFile(userAccounts);

  console.log('Student admin privilege corrected in MongoDB.');
}

      const existingAttemptsCount = await attemptsCollection.countDocuments();
      if (existingAttemptsCount === 0 && assessmentAttempts.length > 0) {
        await attemptsCollection.insertMany(assessmentAttempts);
      }
    } catch (mongoErr) {
      console.warn('MongoDB connection unavailable, using resilient persistent JSON document store:', mongoErr.message);
      isMongoConnected = false;
    }
  }
// Remove old demo admin privilege
const legacyAdminEmail = 'admin@skillsync.edu';

const legacyAdmin = userAccounts.find(
  (u) => u.email?.toLowerCase() === legacyAdminEmail
);

if (legacyAdmin && !legacyAdmin.isSuperAdmin) {
  legacyAdmin.isAdmin = false;
  legacyAdmin.updatedAt = new Date().toISOString();

  saveUsersToFile(userAccounts);

  if (isMongoConnected && mongoDb) {
    await mongoDb.collection('users').updateOne(
      { email: legacyAdminEmail },
      {
        $set: {
          isAdmin: false,
          updatedAt: legacyAdmin.updatedAt,
        },
      }
    );
  }

  console.log('Old demo admin privilege removed.');
}

// Create Super Admin account
await ensureSuperAdmin();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

  const app = express();

// Razorpay Webhook: preserve original request body
app.use('/api/payment/webhook', express.raw({
  type: 'application/json'
}));

// Other APIs use normal JSON parsing
app.use(express.json());

  // Serve static HTML, CSS, and Vanilla JavaScript frontend files
  app.use(express.static(path.join(__dirname, 'public')));

  // ==========================================
  // AUTHENTICATION ROUTES
  // ==========================================

  // 1. Student Registration
  app.post('/api/auth/register', async (req, res) => {
    try {
      const { name, email, password, role } = req.body;

      if (!name || typeof name !== 'string' || name.trim().length < 2) {
        return res.status(400).json({ error: 'Please enter a valid full name (at least 2 characters).' });
      }

      if (!email || typeof email !== 'string') {
        return res.status(400).json({ error: 'Email address is required.' });
      }
      const cleanEmail = email.trim().toLowerCase();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(cleanEmail)) {
        return res.status(400).json({ error: 'Please provide a valid email address (e.g., student@college.edu).' });
      }

      if (!password || typeof password !== 'string' || password.length < 6) {
        return res.status(400).json({ error: 'Password must be at least 6 characters long.' });
      }
      const hasLetter = /[a-zA-Z]/.test(password);
      const hasNumber = /[0-9]/.test(password);
      if (!hasLetter || !hasNumber) {
        return res.status(400).json({
          error: 'Password must contain at least one letter and one number for security.',
        });
      }

      const existingUser = userAccounts.find(
        (u) => u.email && u.email.toLowerCase() === cleanEmail
      );
      if (existingUser) {
        return res.status(409).json({
          error: 'An account with this email address already exists. Please log in instead.',
        });
      }

      const passwordHash = await bcrypt.hash(password, 10);
      const cleanName = name.trim();
      const targetRole = role || 'Software Engineer';

      const newUser = {
        id: `u-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        username: cleanEmail.split('@')[0].replace(/[^a-z0-9_]/gi, '_').toLowerCase(),
        name: cleanName,
        email: cleanEmail,
        passwordHash,
        role: targetRole,
        isAdmin: false,
        trackedSkills: [
          'Data Structures and Algorithms (DSA)',
          'Database Management Systems (DBMS)',
          'Operating Systems (OS)',
        ],
        readinessLevel: 'beginner',
        subscriptionPlan: 'free',
        subscriptionExpiry: null,
        freeAssessmentCount: 0,

        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      userAccounts.push(newUser);
      saveUsersToFile(userAccounts);

      if (isMongoConnected && mongoDb) {
        mongoDb.collection('users').insertOne(newUser).catch(console.error);
      }

      const token = jwt.sign(
        {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
          role: newUser.role,
          isAdmin: false,
        },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      res.status(201).json({
        success: true,
        token,
        user: sanitizeUser(newUser),
        message: 'Registration successful! Welcome to SkillSync.',
      });
    } catch (err) {
      console.error('Registration error:', err);
      res.status(500).json({ error: 'Registration failed due to a server error.' });
    }
  });

  // 2. Student Login
  app.post('/api/auth/login', async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: 'Please enter both your email address and password.' });
      }

      const cleanEmail = String(email).trim().toLowerCase();
      const user = userAccounts.find(
        (u) => u.email && u.email.toLowerCase() === cleanEmail
      );

      if (!user) {
        return res.status(401).json({ error: 'Invalid email address or password. Please verify and try again.' });
      }

      const isMatch = await bcrypt.compare(String(password), user.passwordHash);
      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid email address or password. Please verify and try again.' });
      }

      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          isAdmin: !!user.isAdmin,
        },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      res.json({
        success: true,
        token,
        user: sanitizeUser(user),
        message: `Welcome back, ${user.name}!`,
      });
    } catch (err) {
      console.error('Login error:', err);
      res.status(500).json({ error: 'Login failed due to a server error.' });
    }
  });

// 3. Dedicated Admin Login
app.post('/api/auth/admin/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: 'Administrator email and password are required.'
      });
    }

    const cleanEmail = String(email).trim().toLowerCase();

    let user;

    if (isMongoConnected && mongoDb) {
      user = await mongoDb.collection('users').findOne({
        email: cleanEmail
      });

      if (user) {
        userAccounts = userAccounts.map(u =>
          u.id === user.id ? user : u
        );
      }
    } else {
      user = userAccounts.find(
        u => u.email?.toLowerCase() === cleanEmail
      );
    }

    if (!user || user.isAdmin !== true) {
      return res.status(403).json({
        error: 'Access denied: Authorized administrators only.'
      });
    }

    const isMatch = await bcrypt.compare(
      String(password),
      user.passwordHash
    );

    if (!isMatch) {
      return res.status(401).json({
        error: 'Invalid administrator credentials.'
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        isAdmin: true,
        isSuperAdmin: user.isSuperAdmin === true
      },
      JWT_SECRET,
      { expiresIn: '3d' }
    );

    res.json({
      success: true,
      token,
      user: {
        ...sanitizeUser(user),
        isSuperAdmin: user.isSuperAdmin === true
      },
      message: user.isSuperAdmin
        ? 'Super Admin authorization granted.'
        : 'Admin authorization granted.'
    });

  } catch (err) {
    console.error('Admin login error:', err);

    res.status(500).json({
      error: 'Admin login failed due to a server error.'
    });
  }
});

// 4. Forgot / Reset Password (Temporarily Disabled)
app.post('/api/auth/forgot-password', (req, res) => {
  return res.status(501).json({
    success: false,
    error: 'Password reset is temporarily unavailable. Please contact the system administrator.'
  });
});
  
// 5. Get current profile from token
app.get('/api/auth/me', authenticateToken, async (req, res) => {
  try {
    let user = null;

    if (isMongoConnected && mongoDb) {
      user = await mongoDb.collection('users').findOne({
        id: req.user.id
      });
    } else {
      user = userAccounts.find((u) => u.id === req.user.id);
    }

    if (!user) {
      return res.status(404).json({
        error: 'User profile not found.'
      });
    }

    res.json({
      user: sanitizeUser(user),
      success: true
    });

  } catch (err) {
    console.error('Profile fetch error:', err);
    res.status(500).json({
      error: 'Unable to fetch user profile.'
    });
  }
});



// Create Razorpay Payment Order
app.post('/api/payment/create-order', authenticateToken, async (req, res) => {
  try {
    const { plan } = req.body;

    const plans = {
      monthly: { amount: 9900, durationDays: 30 },
      quarterly: { amount: 24900, durationDays: 90 }
    };

    const selectedPlan = plans[plan];

    if (!selectedPlan) {
      return res.status(400).json({
        error: 'Invalid subscription plan.'
      });
    }

    if (!isMongoConnected || !mongoDb) {
      return res.status(503).json({
        error: 'Payment service is temporarily unavailable.'
      });
    }

    const order = await razorpay.orders.create({
      amount: selectedPlan.amount,
      currency: 'INR',
      receipt: `skill-${Date.now()}-${req.user.id.slice(-6)}`,
      notes: {
        userId: req.user.id,
        plan
      }
    });

    // Save pending payment record in MongoDB
    await mongoDb.collection('payments').insertOne({
      orderId: order.id,
      userId: req.user.id,
      plan: plan,
      amount: selectedPlan.amount,
      currency: 'INR',
      durationDays: selectedPlan.durationDays,
      status: 'created',
      createdAt: new Date(),
      updatedAt: new Date()
    });

    res.status(201).json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID
    });

  } catch (err) {
    console.error('Payment order error:', err);
    res.status(500).json({
      error: 'Unable to create payment order.'
    });
  }
});



// Verify Razorpay Payment and Activate Premium
app.post('/api/payment/verify', authenticateToken, async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature
  } = req.body;

  try {
    if (!isMongoConnected || !mongoDb || !mongoClient) {
      return res.status(503).json({
        error: 'Payment service is temporarily unavailable.'
      });
    }

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        error: 'Payment verification details are missing.'
      });
    }

    // Find the pending payment belonging to the logged-in user
    const paymentRecord = await mongoDb.collection('payments').findOne({
      orderId: razorpay_order_id,
      userId: req.user.id
    });

    if (!paymentRecord) {
      return res.status(404).json({
        error: 'Payment order not found.'
      });
    }

    // Prevent duplicate activation
    if (paymentRecord.status === 'paid') {
      return res.json({
        success: true,
        message: 'Premium is already activated.'
      });
    }

    if (paymentRecord.status !== 'created') {
      return res.status(400).json({
        error: 'Payment cannot be verified in its current state.'
      });
    }

    // Verify Razorpay signature
    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    const signatureBuffer = Buffer.from(generatedSignature, 'hex');
    const receivedBuffer = Buffer.from(razorpay_signature, 'hex');

    if (
      signatureBuffer.length !== receivedBuffer.length ||
      !crypto.timingSafeEqual(signatureBuffer, receivedBuffer)
    ) {
      return res.status(400).json({
        error: 'Invalid payment signature.'
      });
    }

    // Fetch payment directly from Razorpay
    const razorpayPayment = await razorpay.payments.fetch(
      razorpay_payment_id
    );

    if (
      razorpayPayment.order_id !== razorpay_order_id ||
      razorpayPayment.status !== 'captured' ||
      razorpayPayment.amount !== paymentRecord.amount ||
      razorpayPayment.currency !== paymentRecord.currency
    ) {
      return res.status(400).json({
        error: 'Payment details could not be verified.'
      });
    }

    // Update payment and user inside a MongoDB transaction
    const session = mongoClient.startSession();

    try {
      await session.withTransaction(async () => {
        const paymentsCollection = mongoDb.collection('payments');
        const usersCollection = mongoDb.collection('users');

        const currentPayment = await paymentsCollection.findOne(
          {
            orderId: razorpay_order_id,
            userId: req.user.id,
            status: 'created'
          },
          { session }
        );

        if (!currentPayment) {
          throw new Error('PAYMENT_ALREADY_PROCESSED');
        }

        const currentUser = await usersCollection.findOne(
          { id: req.user.id },
          { session }
        );

        if (!currentUser) {
          throw new Error('USER_NOT_FOUND');
        }

        const now = new Date();
        const existingExpiry = currentUser.subscriptionExpiry
          ? new Date(currentUser.subscriptionExpiry)
          : null;

        const startDate =
          existingExpiry && existingExpiry > now
            ? existingExpiry
            : now;

        const expiryDate = new Date(
          startDate.getTime() +
          paymentRecord.durationDays * 24 * 60 * 60 * 1000
        );

        const paymentUpdate = await paymentsCollection.updateOne(
          {
            orderId: razorpay_order_id,
            userId: req.user.id,
            status: 'created'
          },
          {
            $set: {
              status: 'paid',
              paymentId: razorpay_payment_id,
              paidAt: now,
              updatedAt: now
            }
          },
          { session }
        );

        if (paymentUpdate.modifiedCount !== 1) {
          throw new Error('PAYMENT_ALREADY_PROCESSED');
        }

        await usersCollection.updateOne(
          { id: req.user.id },
          {
            $set: {
              subscriptionPlan: paymentRecord.plan,
              subscriptionExpiry: expiryDate
            }
          },
          { session }
        );
      });
    } finally {
      await session.endSession();
    }

    return res.json({
      success: true,
      message: 'Payment verified. Premium activated.'
    });

  } catch (err) {
    if (err.message === 'PAYMENT_ALREADY_PROCESSED') {
      return res.status(409).json({
        error: 'This payment has already been processed.'
      });
    }

    if (err.message === 'USER_NOT_FOUND') {
      return res.status(404).json({
        error: 'User account not found.'
      });
    }

    console.error('Payment verification error:', err);

    return res.status(500).json({
      error: 'Unable to verify payment.'
    });
  }
});



// ==========================================
// RAZORPAY WEBHOOK
// ==========================================

app.post('/api/payment/webhook', async (req, res) => {
  try {
    if (!isMongoConnected || !mongoDb || !mongoClient) {
      return res.status(503).json({ error: 'Database unavailable.' });
    }

    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
    const signature = req.headers['x-razorpay-signature'];

    if (!webhookSecret || !signature || !Buffer.isBuffer(req.body)) {
      return res.status(400).json({ error: 'Invalid webhook request.' });
    }

    // Verify signature using the original raw request body
    const expectedSignature = crypto
      .createHmac('sha256', webhookSecret)
      .update(req.body)
      .digest('hex');

    const expectedBuffer = Buffer.from(expectedSignature, 'hex');
    const receivedBuffer = Buffer.from(signature, 'hex');

    if (
      expectedBuffer.length !== receivedBuffer.length ||
      !crypto.timingSafeEqual(expectedBuffer, receivedBuffer)
    ) {
      return res.status(400).json({ error: 'Invalid webhook signature.' });
    }

    const event = JSON.parse(req.body.toString('utf8'));
    
    console.log('Razorpay webhook received:', event.event);

    // Handle successful captured payments only
    if (event.event !== 'payment.captured') {
      return res.status(200).json({ received: true });
    }

    const payment = event.payload?.payment?.entity;

    if (!payment || !payment.order_id || !payment.id) {
      return res.status(400).json({ error: 'Invalid payment event.' });
    }

    const paymentsCollection = mongoDb.collection('payments');
    const usersCollection = mongoDb.collection('users');

    const paymentRecord = await paymentsCollection.findOne({
      orderId: payment.order_id
    });

    if (!paymentRecord) {
      return res.status(404).json({ error: 'Payment order not found.' });
    }

    // Validate captured payment details
    if (
      payment.status !== 'captured' ||
      payment.amount !== paymentRecord.amount ||
      payment.currency !== paymentRecord.currency
    ) {
      return res.status(400).json({ error: 'Payment details mismatch.' });
    }

    // Already activated by webhook or checkout verification
    if (paymentRecord.status === 'paid') {
      return res.status(200).json({ received: true });
    }

    if (paymentRecord.status !== 'created') {
      return res.status(200).json({ received: true });
    }

    const session = mongoClient.startSession();

    try {
      await session.withTransaction(async () => {
        const currentPayment = await paymentsCollection.findOne(
          {
            orderId: payment.order_id,
            status: 'created'
          },
          { session }
        );

        if (!currentPayment) {
          return;
        }

        const currentUser = await usersCollection.findOne(
          { id: currentPayment.userId },
          { session }
        );

        if (!currentUser) {
          throw new Error('WEBHOOK_USER_NOT_FOUND');
        }

        const now = new Date();

        const existingExpiry = currentUser.subscriptionExpiry
          ? new Date(currentUser.subscriptionExpiry)
          : null;

        const startDate =
          existingExpiry && existingExpiry > now
            ? existingExpiry
            : now;

        const expiryDate = new Date(
          startDate.getTime() +
          currentPayment.durationDays * 24 * 60 * 60 * 1000
        );

        const result = await paymentsCollection.updateOne(
          {
            orderId: payment.order_id,
            status: 'created'
          },
          {
            $set: {
              status: 'paid',
              paymentId: payment.id,
              paidAt: now,
              updatedAt: now
            }
          },
          { session }
        );

        if (result.modifiedCount !== 1) {
          throw new Error('WEBHOOK_PAYMENT_ALREADY_PROCESSED');
        }

        await usersCollection.updateOne(
          { id: currentPayment.userId },
          {
            $set: {
              subscriptionPlan: currentPayment.plan,
              subscriptionExpiry: expiryDate
            }
          },
          { session }
        );
      });
     } finally {
      await session.endSession();
    }

    console.log(
      'Razorpay webhook processed successfully:',
      payment.id
    );

    return res.status(200).json({ received: true });

  } catch (err) {
    if (err.message === 'WEBHOOK_PAYMENT_ALREADY_PROCESSED') {
      return res.status(200).json({ received: true });
    }

    console.error('Razorpay webhook error:', err);

    return res.status(500).json({ error: 'Webhook processing failed.' });
  }
});



  // ==========================================
  // ASSESSMENT & QUESTION APIS
  // ==========================================

  // All 13 subjects with counts
  app.get('/api/subjects', (_req, res) => {
    const subjectsSummary = ALL_SUBJECTS.map((sub) => {
      const subQuestions = questionBank.filter((q) => q.subject === sub.name);
      return {
        ...sub,
        questionCount: subQuestions.length,
        difficultyCounts: {
          beginner: subQuestions.filter((q) => q.difficulty === 'beginner').length,
          intermediate: subQuestions.filter((q) => q.difficulty === 'intermediate').length,
          advanced: subQuestions.filter((q) => q.difficulty === 'advanced').length,
        },
      };
    });
    res.json({ subjects: subjectsSummary, totalQuestions: questionBank.length });
  });

  // Check student assessment access
app.get('/api/assessments/access', authenticateToken, async (req, res) => {
  try {
    if (!isMongoConnected || !mongoDb) {
      return res.status(503).json({
        error: 'Assessment access is temporarily unavailable. Please try again later.'
      });
    }

    const user = await mongoDb.collection('users').findOne({
      id: req.user.id
    });

    if (!user) {
      return res.status(404).json({
        error: 'Student account not found.'
      });
    }

    const now = new Date();

    const isPremium =
      user.subscriptionPlan !== 'free' &&
      user.subscriptionExpiry &&
      new Date(user.subscriptionExpiry) > now;

    if (isPremium) {
      return res.json({
        allowed: true,
        plan: 'premium',
        message: 'Unlimited assessment access available.'
      });
    }

    const windowStart = user.freeAssessmentWindowStart
      ? new Date(user.freeAssessmentWindowStart)
      : null;

    const withinWeeklyWindow =
      windowStart &&
      now.getTime() - windowStart.getTime() < 7 * 24 * 60 * 60 * 1000;

    const used = withinWeeklyWindow
      ? (user.freeAssessmentCount || 0)
      : 0;

    if (used >= 1) {
      return res.json({
        allowed: false,
        plan: 'free',
        message: 'Your free assessment has been used. Upgrade to Premium to continue.'
      });
    }

    return res.json({
      allowed: true,
      plan: 'free',
      remainingFreeAssessments: 1 - used,
      message: 'Your free assessment is available.'
    });

  } catch (err) {
    console.error('Assessment access check error:', err);
    res.status(500).json({
      error: 'Unable to verify assessment access.'
    });
  }
});

  // Query questions
  app.get('/api/questions', authenticateToken, (req, res) => {
    const { subject, topic, difficulty, type, limit, company, mode } = req.query;

    let filtered = [...questionBank];

    if (subject && subject !== 'all') {
      filtered = filtered.filter((q) => q.subject.toLowerCase() === String(subject).toLowerCase());
    }

    if (topic && topic !== 'all') {
      filtered = filtered.filter((q) => q.topic.toLowerCase() === String(topic).toLowerCase());
    }

    if (difficulty && difficulty !== 'all') {
      filtered = filtered.filter((q) => q.difficulty.toLowerCase() === String(difficulty).toLowerCase());
    }

    if (type && type !== 'all') {
      filtered = filtered.filter((q) => q.type.toLowerCase() === String(type).toLowerCase());
    }

    if (company && company !== 'all') {
      filtered = filtered.filter((q) =>
        q.companyTags && q.companyTags.some((tag) => tag.toLowerCase() === String(company).toLowerCase())
      );
    }

    if (mode === 'coding_debugging') {
      filtered = filtered.filter(
        (q) => q.subject === 'Coding and Debugging' || q.type === 'code_output' || q.type === 'debugging'
      );
    }

    filtered = filtered.sort(() => Math.random() - 0.5);

    if (limit) {
      const numLimit = parseInt(String(limit), 10);
      if (filtered.length < numLimit && subject && subject !== 'all') {
        const extraFromSubject = questionBank
          .filter((q) => q.subject.toLowerCase() === String(subject).toLowerCase() && !filtered.some((f) => f.id === q.id))
          .sort(() => Math.random() - 0.5);
        filtered = [...filtered, ...extraFromSubject];
      }
      filtered = filtered.slice(0, numLimit);
    }

    const safeQuestions = filtered.map((q) => {
  const {
    correctAnswer,
    explanation,
    ...questionWithoutAnswers
  } = q;

  return questionWithoutAnswers;
});

res.json({
  questions: safeQuestions,
  count: safeQuestions.length
});

});

  // Submit assessment (isolated to authenticated student)
  app.post('/api/assessments/submit', authenticateToken, async (req, res) => {
    try {
      const {
        mode,
        modeTitle,
        subject,
        topic,
        company,
        difficulty,
        timeSpentSeconds,
        answers,
        questions,
      } = req.body;

      if (!answers || !Array.isArray(answers) || !questions || !Array.isArray(questions)) {
        return res.status(400).json({ error: 'Answers and questions are required' });
      }

      const userId = req.user.id;
      const userName = req.user.name;

      let correctCount = 0;
      let incorrectCount = 0;
      let skippedCount = 0;

      const subjectStats = {};
      const topicStats = {};

      const trustedQuestions = questions.map((submittedQuestion) =>
  questionBank.find((q) => q.id === submittedQuestion.id)
);

if (
  trustedQuestions.some((q) => !q) ||
  new Set(questions.map((q) => q.id)).size !== questions.length
) {
  return res.status(400).json({
    error: 'Invalid or duplicate questions.'
  });
}

const processedAnswers = trustedQuestions.map((question) => {
  const ans = answers.find((a) => a.questionId === question.id);

  const selectedOption = ans?.selectedOption;
  const isSkipped = selectedOption === null || selectedOption === undefined;
  const isCorrect = !isSkipped && selectedOption === question.correctAnswer;

  if (isSkipped) skippedCount++;
  else if (isCorrect) correctCount++;
  else incorrectCount++;

  if (!subjectStats[question.subject]) {
    subjectStats[question.subject] = { total: 0, correct: 0 };
  }

  subjectStats[question.subject].total++;
  if (isCorrect) subjectStats[question.subject].correct++;

  if (!topicStats[question.topic]) {
    topicStats[question.topic] = {
      subject: question.subject,
      total: 0,
      correct: 0
    };
  }

  topicStats[question.topic].total++;
  if (isCorrect) topicStats[question.topic].correct++;

  return {
    questionId: question.id,
    selectedOption: isSkipped ? null : selectedOption,
    isCorrect,
    timeSpentSeconds: ans?.timeSpentSeconds || 0
  };
});

     const totalQuestions = trustedQuestions.length;
      const scorePercentage = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

      const subjectScores = Object.entries(subjectStats).map(([sub, stats]) => ({
        subject: sub,
        total: stats.total,
        correct: stats.correct,
        percentage: stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0,
      }));

      const topicScores = Object.entries(topicStats).map(([top, stats]) => ({
        topic: top,
        subject: stats.subject,
        total: stats.total,
        correct: stats.correct,
        percentage: stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0,
      }));

      const strongTopics = topicScores.filter((t) => t.percentage >= 65).map((t) => t.topic);
      const weakTopics = topicScores.filter((t) => t.percentage < 65).map((t) => t.topic);

      const recommendedTopics =
        weakTopics.length > 0 ? weakTopics : ['Dynamic Programming', 'System Design', 'Operating Systems'];

      const newAttempt = {
        id: `att-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        userId,
        userName,
        mode: mode || 'topic_practice',
        modeTitle: modeTitle || 'Assessment',
        subject: subject || 'Mixed',
        topic: topic || 'All Topics',
        company,
        difficulty,
        totalQuestions,
        correctCount,
        incorrectCount,
        skippedCount,
        scorePercentage,
        timeSpentSeconds: timeSpentSeconds || 0,
        date: new Date().toISOString(),
        subjectScores,
        topicScores,
        strongTopics,
        weakTopics,
        recommendedTopics,
        answers: processedAnswers,
        questionsSnapshot: trustedQuestions,
      };

     // Verify and reserve free assessment access
if (!isMongoConnected || !mongoDb) {
  return res.status(503).json({
    error: 'Assessment service is temporarily unavailable.'
  });
}

const usersCollection = mongoDb.collection('users');

const currentUser = await usersCollection.findOne({ id: userId });

if (!currentUser) {
  return res.status(404).json({
    error: 'Student account not found.'
  });
}

const now = new Date();

const isPremium =
  currentUser.subscriptionPlan !== 'free' &&
  currentUser.subscriptionExpiry &&
  new Date(currentUser.subscriptionExpiry) > now;

if (!isPremium) {
  const cutoff = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  // Start a new weekly window if the previous one expired
  const resetResult = await usersCollection.updateOne(
    {
      id: userId,
      $or: [
        { freeAssessmentWindowStart: { $exists: false } },
        { freeAssessmentWindowStart: null },
        { freeAssessmentWindowStart: { $lt: cutoff } }
      ]
    },
    {
      $set: {
        freeAssessmentWindowStart: now,
        freeAssessmentCount: 1
      }
    }
  );

  // Otherwise reserve the available assessment in the current window
  if (resetResult.matchedCount === 0) {
    const reserveResult = await usersCollection.updateOne(
      {
        id: userId,
        freeAssessmentWindowStart: { $gte: cutoff },
        freeAssessmentCount: { $lt: 1 }
      },
      {
        $inc: { freeAssessmentCount: 1 }
      }
    );

    if (reserveResult.matchedCount === 0) {
      return res.status(402).json({
        error: 'Your free assessment has been used. Please upgrade to Premium.'
      });
    }
  }
}
      assessmentAttempts.unshift(newAttempt);
      saveAttemptsToFile(assessmentAttempts);

      if (isMongoConnected && mongoDb) {
        mongoDb.collection('attempts').insertOne(newAttempt).catch(console.error);
      }

      // Update student profile summary in storage
      const userIdx = userAccounts.findIndex((u) => u.id === userId);
      let calculatedLevel = 'beginner';
      if (scorePercentage >= 75) calculatedLevel = 'advanced';
      else if (scorePercentage >= 45) calculatedLevel = 'intermediate';

      if (userIdx !== -1) {
        userAccounts[userIdx].lastAssessmentScore = scorePercentage;
        userAccounts[userIdx].readinessLevel = calculatedLevel;
        userAccounts[userIdx].updatedAt = new Date().toISOString();
        saveUsersToFile(userAccounts);

        if (isMongoConnected && mongoDb) {
          mongoDb
            .collection('users')
            .updateOne(
              { id: userId },
              { $set: { lastAssessmentScore: scorePercentage, readinessLevel: calculatedLevel } }
            )
            .catch(console.error);
        }
      }

      res.status(201).json({ attempt: newAttempt, success: true });
    } catch (err) {
      console.error('Error submitting assessment:', err);
      res.status(500).json({ error: err.message || 'Failed to submit assessment' });
    }
  });

  // Isolated student assessment history
  app.get('/api/assessments/history', authenticateToken, (req, res) => {
    let list = assessmentAttempts;

    if (!req.user.isAdmin) {
      list = list.filter((a) => a.userId === req.user.id);
    } else if (req.query.userId) {
      list = list.filter((a) => a.userId === String(req.query.userId));
    }

    const summaries = list.map((a) => ({
      id: a.id,
      mode: a.mode,
      modeTitle: a.modeTitle,
      subject: a.subject,
      topic: a.topic,
      company: a.company,
      totalQuestions: a.totalQuestions,
      correctCount: a.correctCount,
      scorePercentage: a.scorePercentage,
      timeSpentSeconds: a.timeSpentSeconds,
      date: a.date,
      strongCount: a.strongTopics ? a.strongTopics.length : 0,
      weakCount: a.weakTopics ? a.weakTopics.length : 0,
    }));

    res.json({ attempts: summaries });
  });

  // Single attempt detail
  app.get('/api/assessments/:id', authenticateToken, (req, res) => {
    const attempt = assessmentAttempts.find((a) => a.id === req.params.id);
    if (!attempt) {
      return res.status(404).json({ error: 'Attempt not found' });
    }

    if (!req.user.isAdmin && attempt.userId !== req.user.id) {
      return res.status(403).json({ error: 'Forbidden: You do not have permission to view this assessment.' });
    }

    res.json({ attempt });
  });

  // Weak area questions for student
  app.get('/api/questions/weak-areas', authenticateToken, (req, res) => {
    const userId = req.user.id;
    const limit = parseInt(String(req.query.limit || 10), 10);

    const userAttempts = assessmentAttempts.filter((a) => a.userId === userId);
    const weakTopicSet = new Set();

    userAttempts.forEach((att) => {
      if (att.topicScores) {
        att.topicScores.forEach((ts) => {
          if (ts.percentage < 65) {
            weakTopicSet.add(ts.topic);
          }
        });
      }
      if (att.weakTopics) {
        att.weakTopics.forEach((wt) => weakTopicSet.add(wt));
      }
    });

    const weakTopicsList = Array.from(weakTopicSet);
    let matchedQuestions = [];

    if (weakTopicsList.length > 0) {
      matchedQuestions = questionBank
        .filter((q) => weakTopicsList.some((wt) => wt.toLowerCase() === q.topic.toLowerCase()))
        .sort(() => Math.random() - 0.5);
    }

    if (matchedQuestions.length < limit) {
      const backfill = questionBank
        .filter((q) => !matchedQuestions.some((m) => m.id === q.id))
        .sort(() => Math.random() - 0.5);
      matchedQuestions = [...matchedQuestions, ...backfill].slice(0, limit);
    } else {
      matchedQuestions = matchedQuestions.slice(0, limit);
    }

    const safeQuestions = matchedQuestions.map((q) => {
  const {
    correctAnswer,
    explanation,
    ...questionWithoutAnswers
  } = q;

  return questionWithoutAnswers;
});

res.json({
  questions: safeQuestions,
  weakTopics: weakTopicsList.length > 0
    ? weakTopicsList
    : ['Binary Trees', 'Deadlocks', 'Pointers'],
});
  });

  // ==========================================
  // PLACEMENT REFERENCE DATA API
  // ==========================================
  app.get('/api/placement/data', (_req, res) => {
    res.json({
      roles: ALL_ROLES,
      skills: ALL_SKILLS,
      companies: companiesList,
      roadmaps: roadmapData,
      studyTips,
      resumeTips,
      githubTips,
      communicationTips,
      coreSubjects,
      placementRounds,
      codingPlatforms,
      mentorAnswers,
    });
  });

// ==========================================
// SUPER ADMIN: CREATE ADMIN ACCOUNT
// ==========================================
app.post(
  '/api/admin/create-admin',
  authenticateToken,
  requireSuperAdmin,
  async (req, res) => {
    try {

      if (!isMongoConnected || !mongoDb) {
  return res.status(503).json({
    error: 'Admin management is temporarily unavailable. Please try again later.'
  });
}
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({
          error: 'Name, email and password are required.'
        });

        
      }

      const cleanName = String(name).trim();
      const cleanEmail = String(email).trim().toLowerCase();

      if (cleanName.length < 2) {
        return res.status(400).json({
          error: 'Please enter a valid name.'
        });
      }

      if (
        password.length < 12 ||
        !/[a-zA-Z]/.test(password) ||
        !/[0-9]/.test(password)
      ) {
        return res.status(400).json({
          error: 'Password must contain at least 12 characters, letters and numbers.'
        });
      }

      const existingUser = await mongoDb.collection('users').findOne({
  email: cleanEmail
});

      if (existingUser) {
        return res.status(409).json({
          error: 'An account with this email already exists.'
        });
      }

      const newAdmin = {
        id: `admin-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        username: cleanEmail.split('@')[0],
        name: cleanName,
        email: cleanEmail,
        passwordHash: await bcrypt.hash(password, 12),
        role: 'Placement Administrator',
        isAdmin: true,
        isSuperAdmin: false,
        trackedSkills: ['All Technical Subjects', 'All Aptitude Modules'],
        readinessLevel: 'advanced',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      if (isMongoConnected && mongoDb) {
        await mongoDb.collection('users').insertOne(newAdmin);
      }

      userAccounts.push(newAdmin);
      saveUsersToFile(userAccounts);

      res.status(201).json({
        success: true,
        message: 'Admin account created successfully.',
        admin: {
          id: newAdmin.id,
          name: newAdmin.name,
          email: newAdmin.email,
          isAdmin: true,
          isSuperAdmin: false
        }
      });

    } catch (err) {
      console.error('Create admin error:', err);

      res.status(500).json({
        error: 'Failed to create admin account.'
      });
    }
  }
);

// ==========================================
// SUPER ADMIN: GET ALL ADMIN ACCOUNTS
// ==========================================
app.get(
  '/api/admin/list',
  authenticateToken,
  requireSuperAdmin,
  async (req, res) => {
    try {
      if (!isMongoConnected || !mongoDb) {
        return res.status(503).json({
          error: 'Admin list is temporarily unavailable.'
        });
      }

      const admins = await mongoDb.collection('users')
        .find(
          {
            isAdmin: true,
            isSuperAdmin: { $ne: true }
          },
          {
            projection: {
              _id: 0,
              id: 1,
              name: 1,
              email: 1,
              role: 1,
              isAdmin: 1,
              isSuperAdmin: 1,
              createdAt: 1
            }
          }
        )
        .toArray();

      res.json({
        success: true,
        count: admins.length,
        admins
      });

    } catch (err) {
      console.error('Admin list error:', err);

      res.status(500).json({
        error: 'Failed to fetch admin accounts.'
      });
    }
  }
);

  // ==========================================
  // ADMIN QUESTION BANK APIS
  // ==========================================
  app.post('/api/admin/questions', authenticateToken, requireAdmin, (req, res) => {
    try {
      const {
        subject,
        topic,
        difficulty,
        type,
        question,
        codeSnippet,
        options,
        correctAnswer,
        explanation,
        companyTags,
      } = req.body;

      if (!subject || !topic || !question || !options || options.length !== 4 || correctAnswer === undefined) {
        return res.status(400).json({ error: 'All question fields, 4 options, and correct answer are required.' });
      }

      const newQ = {
        id: `q-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        subject,
        topic,
        difficulty: difficulty || 'intermediate',
        type: type || 'conceptual',
        question: question.trim(),
        codeSnippet: codeSnippet ? codeSnippet.trim() : undefined,
        options: [options[0].trim(), options[1].trim(), options[2].trim(), options[3].trim()],
        correctAnswer: parseInt(correctAnswer, 10),
        explanation: explanation ? explanation.trim() : 'Correct answer explanation.',
        companyTags: Array.isArray(companyTags) ? companyTags : [],
      };

      questionBank.unshift(newQ);
      saveQuestionsToFile(questionBank);

      res.status(201).json({ question: newQ, success: true });
    } catch (err) {
      res.status(500).json({ error: err.message || 'Failed to add question' });
    }
  });

  app.put('/api/admin/questions/:id', authenticateToken, requireAdmin, (req, res) => {
    const qIndex = questionBank.findIndex((q) => q.id === req.params.id);
    if (qIndex === -1) {
      return res.status(404).json({ error: 'Question not found' });
    }

    const updated = { ...questionBank[qIndex], ...req.body, id: req.params.id };
    questionBank[qIndex] = updated;
    saveQuestionsToFile(questionBank);

    res.json({ question: updated, success: true });
  });

  app.delete('/api/admin/questions/:id', authenticateToken, requireAdmin, (req, res) => {
    const initialLen = questionBank.length;
    questionBank = questionBank.filter((q) => q.id !== req.params.id);
    if (questionBank.length === initialLen) {
      return res.status(404).json({ error: 'Question not found' });
    }
    saveQuestionsToFile(questionBank);
    res.json({ success: true, message: 'Question deleted successfully' });
  });

  // Fallback for HTML routing
  app.get('*', (req, res) => {
    if (req.path.startsWith('/api')) {
      return res.status(404).json({ error: 'API route not found' });
    }
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`SkillSync Server running at http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
