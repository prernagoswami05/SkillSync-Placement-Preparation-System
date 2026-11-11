// SkillSync Main Application Controller (Vanilla JavaScript)
import {
  apiGetMe,
  apiLogout,
  apiGetAssessmentHistory,
  apiGetAssessmentById,
  apiGetPlacementData,
  apiGetSubjects,
  apiGetQuestions,
  apiAddQuestion,
  apiUpdateQuestion,
  apiDeleteQuestion,
  apiGetAdmins,
} from './api.js';
import { AssessmentEngine } from './assessment.js';
import { PerformanceReportView } from './report.js';
import { showToast } from './toast.js';

let currentUser = null;
let placementData = null;
let assessmentEngine = null;
let currentAttempt = null;
let activeTab = 'dashboard';

document.addEventListener('DOMContentLoaded', async () => {
  // 1. Verify User Authentication
  try {
    currentUser = await apiGetMe();
    if (!currentUser || !currentUser.email) {
      window.location.href = '/login.html';
      return;
    }
  } catch {
    window.location.href = '/login.html';
    return;
  }

  // 2. Fetch Reference Placement Data
  try {
    placementData = await apiGetPlacementData();
  } catch (err) {
    console.warn('Placement reference data load error:', err);
  }

  // 3. Update User Header UI
  updateHeaderUI();

  // 4. Initialize Assessment Engine
  assessmentEngine = new AssessmentEngine({
    onComplete: (attempt) => {
      currentAttempt = attempt;
      showToast(`Assessment submitted! Score: ${attempt.scorePercentage}%`, 'success');
      switchTab('report');
    },
    onPracticeTopic: (topic) => {
      switchTab('assessment');
      assessmentEngine.startTest({ mode: 'topic_practice', topic });
    },
  });

  // 5. Setup Navigation Tabs
  setupNavigation();

  // 6. Setup Logout
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      apiLogout();
      showToast('Logged out successfully', 'info');
      setTimeout(() => {
        window.location.href = '/login.html';
      }, 400);
    });
  }

  // 7. Render initial tab (dashboard)
  switchTab('dashboard');

});
function updateHeaderUI() {
  const userNameEl = document.getElementById('header-user-name');
  const userRoleEl = document.getElementById('header-user-role');
  const userAvatarEl = document.getElementById('header-user-avatar');
  const targetRoleEl = document.getElementById('nav-target-role');
  const targetTierEl = document.getElementById('nav-target-tier');
  const adminBadgeEl = document.getElementById('header-admin-badge');
  const adminNavItem = document.getElementById('nav-admin-tab');
  const superAdminNavItem = document.getElementById('nav-super-admin-tab');

  if (userNameEl) userNameEl.textContent = currentUser.name;
  if (userRoleEl) userRoleEl.textContent = currentUser.role || 'Software Engineer';
  if (userAvatarEl) userAvatarEl.textContent = (currentUser.name || 'S').charAt(0).toUpperCase();
  if (targetRoleEl) targetRoleEl.textContent = currentUser.role || 'Software Engineer';
  if (targetTierEl) targetTierEl.textContent = (currentUser.readinessLevel || 'beginner').toUpperCase();

  const premiumBadge = document.getElementById('nav-premium-badge');

const isPremium =
  currentUser.subscriptionPlan &&
  currentUser.subscriptionPlan !== 'free' &&
  currentUser.subscriptionExpiry &&
  new Date(currentUser.subscriptionExpiry) > new Date();

if (premiumBadge) {
  premiumBadge.style.display = isPremium ? 'inline-block' : 'none';
}

  if (currentUser.isAdmin) {
    if (adminBadgeEl) adminBadgeEl.style.display = 'inline-block';
    if (adminNavItem) adminNavItem.style.display = 'inline-flex';
  } else {
    if (adminBadgeEl) adminBadgeEl.style.display = 'none';
    if (adminNavItem) adminNavItem.style.display = 'none';
  }

  if (superAdminNavItem) {
  superAdminNavItem.style.display =
    currentUser.isSuperAdmin === true ? 'inline-flex' : 'none';
}
}


function setupNavigation() {
  const nav = document.querySelector('.app-nav');

  if (nav) {
    nav.addEventListener('click', (e) => {
      const link = e.target.closest('.nav-link');

      if (!link || !nav.contains(link)) return;

      e.preventDefault();

      const tabId = link.getAttribute('data-tab');

      if (tabId) {
        switchTab(tabId);
      }
    });
  }

  const profileBtn = document.getElementById('header-profile-btn');

  if (profileBtn) {
    profileBtn.addEventListener('click', () => {
      switchTab('profile');
    });
  }
}



export function switchTab(tabId) {
  activeTab = tabId;

  // Update nav link active classes
  document.querySelectorAll('.nav-link').forEach((link) => {
    if (link.getAttribute('data-tab') === tabId) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Hide all sections
  document.querySelectorAll('.tab-section').forEach((sec) => {
    sec.style.display = 'none';
  });

  // Show active section
  const activeSec = document.getElementById(`section-${tabId}`);
  if (activeSec) {
    activeSec.style.display = 'block';
  }

  // Trigger tab-specific renders
  if (tabId === 'dashboard') renderDashboard();
  else if (tabId === 'profile') renderProfile();
  else if (tabId === 'assessment') assessmentEngine.render();
  else if (tabId === 'report') renderReport();
  else if (tabId === 'history') renderHistory();
  else if (tabId === 'mentor') renderMentor();
  else if (tabId === 'roadmap') renderRoadmap();
  else if (tabId === 'companies') renderCompanies();
  else if (tabId === 'guide') renderGuide();
  else if (tabId === 'admin_questions') renderAdminQuestions();

  else if (tabId === 'manage_admins') renderManageAdmins();
}

// ==========================================
// 1. DASHBOARD
// ==========================================
async function renderDashboard() {
  const container = document.getElementById('dashboard-content');
  if (!container) return;

  let history = [];
  try {
    history = await apiGetAssessmentHistory();
  } catch (err) {
    console.warn('History load error:', err);
  }

  const latestScore = currentUser.lastAssessmentScore !== undefined ? `${currentUser.lastAssessmentScore}%` : 'Not Tested';
  const tier = (currentUser.readinessLevel || 'beginner').toUpperCase();

const expiryDate = currentUser.subscriptionExpiry
  ? new Date(currentUser.subscriptionExpiry)
  : null;

const isPremium =
  currentUser.subscriptionPlan &&
  currentUser.subscriptionPlan !== 'free' &&
  expiryDate &&
  expiryDate > new Date();

const remainingDays = isPremium
  ? Math.ceil((expiryDate - new Date()) / (1000 * 60 * 60 * 24))
  : 0;

const formattedExpiry = expiryDate
  ? expiryDate.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  : 'N/A';

const planName = currentUser.subscriptionPlan === 'monthly'
  ? 'Premium Monthly'
  : currentUser.subscriptionPlan === 'quarterly'
    ? 'Premium Quarterly'
    : 'Free Plan';


  container.innerHTML = `


<!-- Premium Membership Card -->
<div class="card" style="margin-bottom: 1.5rem; border: 1px solid #a7f3d0; background: linear-gradient(135deg, #ecfdf5, #ffffff);">
  <div style="padding: 1.25rem;">
    <div style="font-size: 0.75rem; font-weight: 700; color: #047857;">
      PREMIUM MEMBERSHIP
    </div>
    <h3 style="color: #065f46; margin-top: 0.5rem;">
      ${isPremium ? planName : 'Free Plan'}
    </h3>
    <p style="color: #475569; margin-top: 0.5rem;">
      ${isPremium
        ? `Valid until: ${formattedExpiry} · ${remainingDays} days remaining`
        : 'Upgrade to Premium to unlock advanced features.'}
    </p>
    <strong style="color: ${isPremium ? '#047857' : '#64748b'};">
      ${isPremium ? '✓ ACTIVE' : 'FREE'}
    </strong>
    ${!isPremium ? `
      <p style="margin-top: 0.75rem;">
        <a href="/pricing.html" class="btn btn-primary btn-sm">Upgrade to Premium</a>
      </p>
    ` : ''}
  </div>
</div>

    <!-- Top Greeting Banner -->
    <div class="card" style="padding: 1.5rem; background: linear-gradient(to right, #ffffff, #f8fafc); border-left: 4px solid var(--primary); margin-bottom: 1.5rem;">
      <div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 1rem;">
        <div>
          <h2 style="font-size: 1.375rem; font-weight: 800;">Welcome back, ${currentUser.name}!</h2>
          <p style="font-size: 0.8125rem; color: var(--text-muted); margin-top: 0.25rem;">
            Targeting: <strong style="color: var(--text-main);">${currentUser.role}</strong> &bull; Student Account: <span style="font-family: var(--font-mono); font-size: 0.75rem;">${currentUser.email}</span>
          </p>
        </div>
        <div>
          <button type="button" id="dash-quick-test-btn" class="btn btn-primary" style="padding: 0.625rem 1.25rem;">
            <span>Start Practice Assessment</span> &rarr;
          </button>
        </div>
      </div>
    </div>

    <!-- 4 Stats Cards -->
    <div class="grid-cols-4" style="margin-bottom: 1.5rem;">
      <div class="stat-card">
        <div class="stat-icon">&#128218;</div>
        <div>
          <div class="stat-value">13</div>
          <div class="stat-label">Assessment Subjects</div>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon">&#10004;</div>
        <div>
          <div class="stat-value">208+</div>
          <div class="stat-label">Placement Bank Qs</div>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon">&#127919;</div>
        <div>
          <div class="stat-value">${latestScore}</div>
          <div class="stat-label">Latest Assessment</div>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon">&#128200;</div>
        <div>
          <div class="stat-value" style="font-size: 1.25rem;">${tier}</div>
          <div class="stat-label">Readiness Tier</div>
        </div>
      </div>
    </div>

    <!-- Quick Practice Shortcuts -->
    <div class="card" style="margin-bottom: 1.5rem;">
      <div class="card-header">
        <div>
          <div class="card-title">Quick Assessment Launchers</div>
          <div class="card-subtitle">Choose a practice mode to test your technical competency</div>
        </div>
      </div>

      <div class="grid-cols-3">
        <div style="border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 1.25rem; background: #ffffff;">
          <h4 style="font-size: 0.9375rem; margin-bottom: 0.25rem;">DSA &amp; Algorithms</h4>
          <p style="font-size: 0.75rem; color: var(--text-muted); margin-bottom: 1rem;">Arrays, Trees, Graphs, Dynamic Programming & Sorting.</p>
          <button type="button" class="btn btn-outline btn-sm quick-launch-btn" data-sub="Data Structures and Algorithms (DSA)">
            Practice DSA &rarr;
          </button>
        </div>

        <div style="border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 1.25rem; background: #ffffff;">
          <h4 style="font-size: 0.9375rem; margin-bottom: 0.25rem;">Core Computer Science</h4>
          <p style="font-size: 0.75rem; color: var(--text-muted); margin-bottom: 1rem;">DBMS Normalization, OS Deadlocks, & Networks.</p>
          <button type="button" class="btn btn-outline btn-sm quick-launch-btn" data-sub="Database Management Systems (DBMS)">
            Practice DBMS &rarr;
          </button>
        </div>

        <div style="border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 1.25rem; background: #ffffff;">
          <h4 style="font-size: 0.9375rem; margin-bottom: 0.25rem;">Full Placement Mock</h4>
          <p style="font-size: 0.75rem; color: var(--text-muted); margin-bottom: 1rem;">Timed 20-question test simulating company test rounds.</p>
          <button type="button" class="btn btn-primary btn-sm quick-mock-btn">
            Launch Mock &rarr;
          </button>
        </div>
      </div>
    </div>

    <!-- Recent Attempts Section -->
    <div class="card">
      <div class="card-header">
        <div>
          <div class="card-title">Recent Assessment Submissions</div>
          <div class="card-subtitle">Your isolated test records and diagnostic scores</div>
        </div>
        <button type="button" id="dash-view-all-history-btn" class="btn btn-outline btn-sm">View All History</button>
      </div>

      ${
        history.length > 0
          ? `
          <div class="table-responsive">
            <table class="custom-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Assessment Mode</th>
                  <th>Subject</th>
                  <th>Score %</th>
                  <th>Correct / Total</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                ${history
                  .slice(0, 5)
                  .map(
                    (att) => `
                  <tr>
                    <td>${new Date(att.date).toLocaleDateString()}</td>
                    <td><strong>${att.modeTitle || att.mode}</strong></td>
                    <td>${att.subject || 'Mixed'}</td>
                    <td>
                      <span class="badge-tag ${att.scorePercentage >= 75 ? 'badge-tier' : att.scorePercentage >= 45 ? 'badge-admin' : ''}" style="${att.scorePercentage < 45 ? 'background:#fef2f2; color:#991b1b; border:1px solid #fecaca;' : ''}">
                        ${att.scorePercentage}%
                      </span>
                    </td>
                    <td>${att.correctCount} / ${att.totalQuestions}</td>
                    <td>
                      <button type="button" class="btn btn-outline btn-sm review-attempt-btn" data-att-id="${att.id}">
                        Review Report
                      </button>
                    </td>
                  </tr>
                `
                  )
                  .join('')}
              </tbody>
            </table>
          </div>
        `
          : `
          <div style="text-align: center; padding: 2.5rem; color: var(--text-muted); font-size: 0.8125rem;">
            No assessments attempted yet. Click <strong>Start Practice Assessment</strong> to generate your first diagnostic report.
          </div>
        `
      }
    </div>
  `;

  // Bind Quick Buttons
  const startBtn = document.getElementById('dash-quick-test-btn');
  if (startBtn) {
    startBtn.addEventListener('click', () => switchTab('assessment'));
  }

  const viewAllBtn = document.getElementById('dash-view-all-history-btn');
  if (viewAllBtn) {
    viewAllBtn.addEventListener('click', () => switchTab('history'));
  }

  container.querySelectorAll('.quick-launch-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const sub = btn.getAttribute('data-sub');
      switchTab('assessment');
      assessmentEngine.startTest({ mode: 'topic_practice', subject: sub });
    });
  });

  const mockBtn = container.querySelector('.quick-mock-btn');
  if (mockBtn) {
    mockBtn.addEventListener('click', () => {
      switchTab('assessment');
      assessmentEngine.startTest({ mode: 'mock_test' });
    });
  }

  container.querySelectorAll('.review-attempt-btn').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const id = btn.getAttribute('data-att-id');
      try {
        const fullAtt = await apiGetAssessmentById(id);
        if (fullAtt) {
          currentAttempt = fullAtt;
          switchTab('report');
        }
      } catch (err) {
        showToast('Error loading report: ' + err.message, 'error');
      }
    });
  });
}


function renderProfile() {
  const container = document.getElementById('profile-content');
  if (!container || !currentUser) return;

  const expiryDate = currentUser.subscriptionExpiry
    ? new Date(currentUser.subscriptionExpiry)
    : null;

  const isPremium =
    currentUser.subscriptionPlan &&
    currentUser.subscriptionPlan !== 'free' &&
    expiryDate &&
    expiryDate > new Date();

  const remainingDays = isPremium
    ? Math.ceil((expiryDate - new Date()) / (1000 * 60 * 60 * 24))
    : 0;

  const planName = isPremium
    ? currentUser.subscriptionPlan.charAt(0).toUpperCase() +
      currentUser.subscriptionPlan.slice(1)
    : 'Free';

  const skills = Array.isArray(currentUser.trackedSkills)
    ? currentUser.trackedSkills
    : [];

  container.innerHTML = `
    <div class="profile-page">
      <h2>My Profile</h2>
      <p>Manage your personal information and placement progress.</p>

      <div class="profile-card">
        <h3>Personal Information</h3>
        <p><strong>Name:</strong> <span id="profile-name"></span></p>
        <p><strong>Username:</strong> <span id="profile-username"></span></p>
        <p><strong>Email:</strong> <span id="profile-email"></span></p>
        <p><strong>Role:</strong> <span id="profile-role"></span></p>
      </div>

      <div class="profile-card">
        <h3>Placement Progress</h3>
        <p><strong>Readiness Level:</strong> <span id="profile-readiness"></span></p>
        <p><strong>Last Assessment Score:</strong> <span id="profile-score"></span></p>
        <h4>Tracked Skills</h4>
        <ul id="profile-skills"></ul>
      </div>

      <div class="profile-card">
        <h3>Membership Details</h3>
        <p><strong>Current Plan:</strong> <span id="profile-plan"></span></p>
        <p><strong>Membership Status:</strong> <span id="profile-status"></span></p>
        <p><strong>Expiry Date:</strong> <span id="profile-expiry"></span></p>
        <p><strong>Days Remaining:</strong> <span id="profile-days"></span></p>
      </div>
    </div>
  `;

  document.getElementById('profile-name').textContent =
    currentUser.name || 'Not available';

  document.getElementById('profile-username').textContent =
    currentUser.username || 'Not available';

  document.getElementById('profile-email').textContent =
    currentUser.email || 'Not available';

  document.getElementById('profile-role').textContent =
    currentUser.role || 'Student';

  document.getElementById('profile-readiness').textContent =
    currentUser.readinessLevel || 'Beginner';

  document.getElementById('profile-score').textContent =
    currentUser.lastAssessmentScore ?? 'Not attempted';

  document.getElementById('profile-plan').textContent = planName;

  document.getElementById('profile-status').textContent =
    isPremium ? 'Premium Active' : 'Free Plan';

  document.getElementById('profile-expiry').textContent =
    isPremium ? expiryDate.toLocaleDateString('en-IN') : 'Not applicable';

  document.getElementById('profile-days').textContent =
    isPremium ? `${remainingDays} days` : '—';

  const skillsList = document.getElementById('profile-skills');

  if (skills.length > 0) {
    skills.forEach(skill => {
      const li = document.createElement('li');
      li.textContent = skill;
      skillsList.appendChild(li);
    });
  } else {
    skillsList.textContent = 'No skills added yet.';
  }
}

// ==========================================
// 2. PERFORMANCE REPORT
// ==========================================
function renderReport() {
  const reportView = new PerformanceReportView(currentAttempt, (topic) => {
    switchTab('assessment');
    assessmentEngine.startTest({ mode: 'topic_practice', topic });
  });
  reportView.render('report-content');
}

// ==========================================
// 3. ATTEMPT HISTORY
// ==========================================
async function renderHistory() {
  const container = document.getElementById('history-content');
  if (!container) return;

  container.innerHTML = `<div style="text-align: center; padding: 3rem;"><p>Loading attempt history...</p></div>`;

  try {
    const list = await apiGetAssessmentHistory();

    if (!list || list.length === 0) {
      container.innerHTML = `
        <div class="card" style="text-align: center; padding: 4rem;">
          <h3 style="font-size: 1.125rem; margin-bottom: 0.5rem;">No Assessment History Found</h3>
          <p style="font-size: 0.8125rem; color: var(--text-muted); margin-bottom: 1.25rem;">
            You have not attempted any tests yet. All your future tests will be recorded here with complete question-by-question diagnostic reviews.
          </p>
          <button type="button" id="history-start-test-btn" class="btn btn-primary">
            Start Your First Assessment
          </button>
        </div>
      `;
      const btn = document.getElementById('history-start-test-btn');
      if (btn) btn.addEventListener('click', () => switchTab('assessment'));
      return;
    }

    container.innerHTML = `
      <div class="card">
        <div class="card-header">
          <div>
            <div class="card-title">Placement Assessment History (${list.length} Attempt${list.length > 1 ? 's' : ''})</div>
            <div class="card-subtitle">Student tests are cryptographically isolated and strictly viewable by you</div>
          </div>
          <button type="button" id="history-new-test-btn" class="btn btn-primary btn-sm">Take New Test</button>
        </div>

        <div class="table-responsive">
          <table class="custom-table">
            <thead>
              <tr>
                <th>Date & Time</th>
                <th>Assessment Mode</th>
                <th>Subject / Topic</th>
                <th>Score %</th>
                <th>Correct</th>
                <th>Time Spent</th>
                <th>Strong / Weak</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              ${list
                .map((a) => {
                  const m = Math.floor((a.timeSpentSeconds || 0) / 60);
                  const s = (a.timeSpentSeconds || 0) % 60;
                  return `
                  <tr>
                    <td>${new Date(a.date).toLocaleDateString()} ${new Date(a.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                    <td><strong>${a.modeTitle || a.mode}</strong></td>
                    <td>${a.subject || 'Mixed'}</td>
                    <td>
                      <span class="badge-tag ${a.scorePercentage >= 75 ? 'badge-tier' : a.scorePercentage >= 45 ? 'badge-admin' : ''}" style="${a.scorePercentage < 45 ? 'background:#fef2f2; color:#991b1b; border:1px solid #fecaca;' : ''}">
                        ${a.scorePercentage}%
                      </span>
                    </td>
                    <td>${a.correctCount} / ${a.totalQuestions}</td>
                    <td>${m}m ${s}s</td>
                    <td>
                      <span style="color:#059669; font-weight:700;">+${a.strongCount || 0}</span> / 
                      <span style="color:#dc2626; font-weight:700;">-${a.weakCount || 0}</span>
                    </td>
                    <td>
                      <button type="button" class="btn btn-outline btn-sm history-review-btn" data-id="${a.id}">
                        Review Report
                      </button>
                    </td>
                  </tr>
                `;
                })
                .join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;

    const newBtn = document.getElementById('history-new-test-btn');
    if (newBtn) newBtn.addEventListener('click', () => switchTab('assessment'));

    container.querySelectorAll('.history-review-btn').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const id = btn.getAttribute('data-id');
        try {
          const attempt = await apiGetAssessmentById(id);
          if (attempt) {
            currentAttempt = attempt;
            switchTab('report');
          }
        } catch (err) {
          showToast('Failed to load review: ' + err.message, 'error');
        }
      });
    });
  } catch (err) {
    container.innerHTML = `<div class="alert alert-error">Failed to load history: ${err.message}</div>`;
  }
}

// ==========================================
// 4. PLACEMENT MENTOR
// ==========================================
function renderMentor() {
  const container = document.getElementById('mentor-content');
  if (!container || !placementData) return;

  container.innerHTML = `
    <div class="card" style="margin-bottom: 1.5rem;">
      <h2 style="font-size: 1.25rem; font-weight: 800; margin-bottom: 0.375rem;">Placement Mentor</h2>
      <p style="font-size: 0.8125rem; color: var(--text-muted); margin-bottom: 1.25rem;">
        Get tailored advice for your target role (${currentUser.role}) and current readiness tier (${(currentUser.readinessLevel || 'beginner').toUpperCase()}).
      </p>

      <div style="display: flex; gap: 0.5rem; margin-bottom: 1rem;">
        <input type="text" id="mentor-query-input" class="form-control" placeholder="Ask about DSA preparation, DBMS normalization, resume projects, or interview strategy...">
        <button type="button" id="mentor-ask-btn" class="btn btn-primary" style="white-space: nowrap;">Ask Mentor</button>
      </div>

      <!-- Quick Advice Chips -->
      <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1rem;">
        <button type="button" class="btn btn-outline btn-sm mentor-chip" data-q="dsa roadmap">DSA Strategy</button>
        <button type="button" class="btn btn-outline btn-sm mentor-chip" data-q="core cs">Core CS Preparation</button>
        <button type="button" class="btn btn-outline btn-sm mentor-chip" data-q="aptitude">Aptitude Tips</button>
        <button type="button" class="btn btn-outline btn-sm mentor-chip" data-q="resume">Resume Projects</button>
        <button type="button" class="btn btn-outline btn-sm mentor-chip" data-q="communication">HR &amp; Communication</button>
      </div>

      <div id="mentor-answer-box" class="card" style="background: var(--bg-main); border-color: var(--accent-border); display: none; padding: 1.25rem;">
        <div style="font-size: 0.75rem; font-weight: 700; color: var(--primary); text-transform: uppercase; margin-bottom: 0.5rem;">Mentor Recommendation</div>
        <div id="mentor-reply-text" style="font-size: 0.875rem; color: var(--text-main); line-height: 1.7;"></div>
      </div>
    </div>
  `;

  const input = document.getElementById('mentor-query-input');
  const askBtn = document.getElementById('mentor-ask-btn');
  const ansBox = document.getElementById('mentor-answer-box');
  const ansText = document.getElementById('mentor-reply-text');

  const answerQuery = (query) => {
    const q = query.toLowerCase();
    const tier = currentUser.readinessLevel || 'beginner';
    let topic = 'general';

    if (q.includes('dsa') || q.includes('algorithm') || q.includes('tree') || q.includes('graph') || q.includes('array')) {
      topic = 'dsa';
    } else if (q.includes('dbms') || q.includes('os') || q.includes('network') || q.includes('core')) {
      topic = 'coreCS';
    } else if (q.includes('aptitude') || q.includes('quant') || q.includes('reasoning')) {
      topic = 'aptitude';
    } else if (q.includes('resume') || q.includes('project')) {
      topic = 'resume';
    } else if (q.includes('hr') || q.includes('communication') || q.includes('interview')) {
      topic = 'communication';
    }

    const advice = placementData.mentorAnswers[topic]?.[tier] || placementData.mentorAnswers.general[tier];
    ansText.innerHTML = `
      <p style="margin-bottom: 0.75rem;"><strong>Hello ${currentUser.name}!</strong> ${advice}</p>
      <p style="font-size: 0.8125rem; color: var(--text-sub);">
        Since you are preparing for a <strong>${currentUser.role}</strong> position, prioritize consistency in problem-solving and mock interviews.
      </p>
    `;
    ansBox.style.display = 'block';
  };

  askBtn.addEventListener('click', () => {
    if (input.value.trim()) {
      answerQuery(input.value.trim());
    }
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && input.value.trim()) {
      answerQuery(input.value.trim());
    }
  });

  container.querySelectorAll('.mentor-chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      const q = chip.getAttribute('data-q');
      input.value = chip.textContent;
      answerQuery(q);
    });
  });
}

// ==========================================
// 5. PREPARATION ROADMAP
// ==========================================
let currentRoadmapLevel = 'beginner';

function renderRoadmap() {
  const container = document.getElementById('roadmap-content');
  if (!container || !placementData) return;

  const steps = placementData.roadmaps[currentRoadmapLevel] || [];

  container.innerHTML = `
    <div class="card" style="margin-bottom: 1.5rem;">
      <div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 1rem; margin-bottom: 1.25rem;">
        <div>
          <h2 style="font-size: 1.25rem; font-weight: 800;">Campus Placement Preparation Roadmap</h2>
          <p style="font-size: 0.8125rem; color: var(--text-muted);">Step-by-step milestone curriculum for engineering campus placements</p>
        </div>

        <!-- Level Filter Tabs -->
        <div style="display: flex; gap: 0.5rem;">
          <button type="button" class="btn btn-sm ${currentRoadmapLevel === 'beginner' ? 'btn-primary' : 'btn-outline'} rmap-lvl-btn" data-lvl="beginner">Beginner</button>
          <button type="button" class="btn btn-sm ${currentRoadmapLevel === 'intermediate' ? 'btn-primary' : 'btn-outline'} rmap-lvl-btn" data-lvl="intermediate">Intermediate</button>
          <button type="button" class="btn btn-sm ${currentRoadmapLevel === 'advanced' ? 'btn-primary' : 'btn-outline'} rmap-lvl-btn" data-lvl="advanced">Advanced</button>
        </div>
      </div>

      <div style="display: flex; flex-direction: column; gap: 1rem;">
        ${steps
          .map(
            (step, idx) => `
          <div style="border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 1.25rem; background: #ffffff; display: flex; gap: 1rem; align-items: flex-start;">
            <div style="width: 36px; height: 36px; border-radius: var(--radius-sm); background: var(--accent-light); color: var(--accent); display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 0.9375rem; shrink: 0;">
              ${idx + 1}
            </div>
            <div style="flex: 1;">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.25rem;">
                <h4 style="font-size: 0.9375rem; font-weight: 700;">${step.title}</h4>
                <span class="badge-tag" style="background: var(--bg-main); border: 1px solid var(--border); color: var(--text-sub);">${step.time}</span>
              </div>
              <p style="font-size: 0.8125rem; color: var(--text-sub); margin-bottom: 0.5rem;">${step.desc}</p>
              ${
                step.tags
                  ? `<div style="display: flex; flex-wrap: wrap; gap: 0.375rem;">
                      ${step.tags
                        .map(
                          (t) =>
                            `<span style="background: var(--bg-main); border: 1px solid var(--border); font-size: 0.6875rem; padding: 0.125rem 0.5rem; border-radius: 99px; color: var(--text-muted);">${t}</span>`
                        )
                        .join('')}
                     </div>`
                  : ''
              }
            </div>
          </div>
        `
          )
          .join('')}
      </div>
    </div>
  `;

  container.querySelectorAll('.rmap-lvl-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      currentRoadmapLevel = btn.getAttribute('data-lvl');
      renderRoadmap();
    });
  });
}

// ==========================================
// 6. COMPANY SUGGESTIONS
// ==========================================
let companyFilterTier = 'all';
let companyFilterType = 'all';

function extractAllCompanies(raw) {
  if (Array.isArray(raw)) return raw;
  if (!raw || typeof raw !== 'object') return [];

  const list = [];
  const tiers = ['beginner', 'intermediate', 'advanced'];

  tiers.forEach((tier) => {
    const tierGroup = raw[tier];
    if (tierGroup && typeof tierGroup === 'object') {
      ['service', 'product'].forEach((type) => {
        if (Array.isArray(tierGroup[type])) {
          tierGroup[type].forEach((co) => {
            list.push({
              ...co,
              tier: co.tier || tier,
              type: co.type || (type === 'service' ? 'Service-Based' : 'Product-Based'),
            });
          });
        }
      });
    }
  });

  Object.keys(raw).forEach((k) => {
    if (!tiers.includes(k) && Array.isArray(raw[k])) {
      raw[k].forEach((co) => list.push(co));
    }
  });

  return list;
}

function renderCompanies() {
  const container = document.getElementById('companies-content');
  if (!container || !placementData) return;

  const allCompanies = extractAllCompanies(placementData.companies);

  const filteredCompanies = allCompanies.filter((c) => {
    const matchTier = companyFilterTier === 'all' || (c.tier && c.tier.toLowerCase() === companyFilterTier.toLowerCase());
    const matchType = companyFilterType === 'all' || (c.type && c.type.toLowerCase().includes(companyFilterType.toLowerCase()));
    return matchTier && matchType;
  });

  container.innerHTML = `
    <div class="card" style="margin-bottom: 1.5rem;">
      <div class="card-header" style="flex-wrap: wrap; gap: 1rem;">
        <div>
          <h2 style="font-size: 1.25rem; font-weight: 800; margin-bottom: 0.375rem;">Company Placement Profiles &amp; Patterns</h2>
          <p style="font-size: 0.8125rem; color: var(--text-muted);">
            Explore campus hiring requirements, package bands, eligibility, and recruitment patterns for top companies.
          </p>
        </div>
        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center;">
          <select id="company-tier-filter" class="form-control" style="font-size: 0.75rem; padding: 0.375rem 0.625rem; width: auto;">
            <option value="all" ${companyFilterTier === 'all' ? 'selected' : ''}>All Tiers (${allCompanies.length})</option>
            <option value="beginner" ${companyFilterTier === 'beginner' ? 'selected' : ''}>Beginner Tier</option>
            <option value="intermediate" ${companyFilterTier === 'intermediate' ? 'selected' : ''}>Intermediate Tier</option>
            <option value="advanced" ${companyFilterTier === 'advanced' ? 'selected' : ''}>Advanced Tier</option>
          </select>
          <select id="company-type-filter" class="form-control" style="font-size: 0.75rem; padding: 0.375rem 0.625rem; width: auto;">
            <option value="all" ${companyFilterType === 'all' ? 'selected' : ''}>All Categories</option>
            <option value="service" ${companyFilterType === 'service' ? 'selected' : ''}>Service-Based</option>
            <option value="product" ${companyFilterType === 'product' ? 'selected' : ''}>Product-Based</option>
          </select>
        </div>
      </div>

      ${filteredCompanies.length === 0 ? `
        <div style="text-align: center; padding: 3rem 1rem; color: var(--text-muted); font-size: 0.875rem;">
          No company suggestions found matching your selected filters.
        </div>
      ` : `
        <div class="grid-cols-2">
          ${filteredCompanies
            .map(
              (c) => `
            <div style="border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 1.25rem; background: #ffffff; display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem;">
                  <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
                    <h3 style="font-size: 1.125rem; font-weight: 800; color: var(--primary); margin: 0;">${c.name}</h3>
                    ${c.tier ? `<span class="badge-tag" style="text-transform: capitalize; background: var(--bg-main); border: 1px solid var(--border); font-size: 0.6875rem;">${c.tier}</span>` : ''}
                    ${c.type ? `<span class="badge-tag" style="background: #eff6ff; color: #1d4ed8; border: 1px solid #bfdbfe; font-size: 0.6875rem;">${c.type}</span>` : ''}
                  </div>
                  ${c.salary ? `<span class="badge-tag" style="background: #ecfdf5; color: #047857; border: 1px solid #a7f3d0; font-weight: 700;">${c.salary}</span>` : ''}
                </div>

                <div style="font-size: 0.8125rem; font-weight: 600; color: var(--text-main); margin-bottom: 0.5rem;">
                  Role: <span style="color: var(--primary);">${c.role}</span>
                </div>

                ${c.eligibility || c.eligibilityCriteria ? `
                  <div style="font-size: 0.8125rem; margin-bottom: 0.5rem; line-height: 1.5;">
                    <strong style="color: var(--text-main);">Eligibility:</strong>
                    <span style="color: var(--text-sub); margin-left: 0.25rem;">${c.eligibility || c.eligibilityCriteria}</span>
                  </div>
                ` : ''}

                ${c.skills || c.skillsRequired ? `
                  <div style="font-size: 0.8125rem; margin-bottom: 0.5rem; line-height: 1.5;">
                    <strong style="color: var(--text-main);">Skills Required:</strong>
                    <span style="color: var(--text-sub); margin-left: 0.25rem;">${Array.isArray(c.skills || c.skillsRequired) ? (c.skills || c.skillsRequired).join(', ') : (c.skills || c.skillsRequired)}</span>
                  </div>
                ` : ''}

                ${c.preparation || c.guidance || c.prepGuidance ? `
                  <div style="font-size: 0.8125rem; margin-bottom: 0.625rem; background: var(--bg-main); padding: 0.625rem 0.875rem; border-radius: var(--radius-sm); border: 1px solid var(--border-light); line-height: 1.5;">
                    <strong style="color: var(--text-main);">Preparation Guidance:</strong>
                    <div style="color: var(--text-sub); font-size: 0.75rem; margin-top: 0.25rem;">${c.preparation || c.guidance || c.prepGuidance}</div>
                  </div>
                ` : ''}

                ${c.recruitment || c.recruitmentInfo ? `
                  <div style="font-size: 0.8125rem; margin-bottom: 0.75rem; line-height: 1.5;">
                    <strong style="color: var(--text-main);">Recruitment Information:</strong>
                    <span style="color: var(--text-sub); margin-left: 0.25rem;">${c.recruitment || c.recruitmentInfo}</span>
                  </div>
                ` : (c.info ? `
                  <p style="font-size: 0.8125rem; color: var(--text-sub); line-height: 1.6; margin-bottom: 0.875rem;">
                    ${c.info}
                  </p>
                ` : '')}
              </div>

              <div style="margin-top: 0.75rem; padding-top: 0.75rem; border-top: 1px solid var(--border-light);">
                <button type="button" class="btn btn-outline btn-sm company-practice-btn" data-company="${c.name}">
                  Practice ${c.name} Pattern &rarr;
                </button>
              </div>
            </div>
          `
            )
            .join('')}
        </div>
      `}
    </div>
  `;

  // Bind filter events
  const tierFilterEl = document.getElementById('company-tier-filter');
  if (tierFilterEl) {
    tierFilterEl.addEventListener('change', (e) => {
      companyFilterTier = e.target.value;
      renderCompanies();
    });
  }

  const typeFilterEl = document.getElementById('company-type-filter');
  if (typeFilterEl) {
    typeFilterEl.addEventListener('change', (e) => {
      companyFilterType = e.target.value;
      renderCompanies();
    });
  }

  // Bind Practice Buttons
  container.querySelectorAll('.company-practice-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const comp = btn.getAttribute('data-company');
      switchTab('assessment');
      assessmentEngine.startTest({ mode: 'company_pattern', company: comp });
    });
  });
}

// ==========================================
// 7. PLACEMENT GUIDE
// ==========================================
function formatGuideTip(item) {
  if (typeof item === 'string') {
    return `<li style="margin-bottom: 0.625rem;"><span style="color: var(--text-sub);">${item}</span></li>`;
  }
  if (item && typeof item === 'object') {
    const titlePart = item.title ? `<strong style="color: var(--text-main);">${item.title}:</strong> ` : '';
    const bodyPart = item.text || item.desc || item.tip || '';
    return `<li style="margin-bottom: 0.625rem;">${titlePart}<span style="color: var(--text-sub);">${bodyPart}</span></li>`;
  }
  return '';
}

function renderGuide() {
  const container = document.getElementById('guide-content');
  if (!container || !placementData) return;

  container.innerHTML = `
    <!-- Campus Placement Rounds Overview -->
    <div class="card" style="margin-bottom: 1.5rem;">
      <div class="card-header">
        <div>
          <div class="card-title">Placement Hiring Process Breakdown</div>
          <div class="card-subtitle">Standard 4-stage recruitment pipeline across top tech firms</div>
        </div>
      </div>

      <div class="grid-cols-2">
        ${(placementData.placementRounds || [])
          .map(
            (r) => `
          <div style="border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 1.25rem; background: #ffffff;">
            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
              <span class="badge-tag badge-tier">Round ${r.step}</span>
              <h4 style="font-size: 0.9375rem; font-weight: 700;">${r.title}</h4>
            </div>
            <p style="font-size: 0.8125rem; color: var(--text-sub); margin-bottom: 0.75rem;">${r.desc}</p>
            <div style="background: var(--bg-main); padding: 0.625rem 0.875rem; border-radius: var(--radius-sm); font-size: 0.75rem; border: 1px solid var(--border-light);">
              <strong>Strategy:</strong> ${r.preparation}
            </div>
          </div>
        `
          )
          .join('')}
      </div>
    </div>

    <!-- Coding Platforms to Target -->
    <div class="card" style="margin-bottom: 1.5rem;">
      <div class="card-header">
        <div>
          <div class="card-title">Recommended Coding &amp; Preparation Platforms</div>
          <div class="card-subtitle">Industry-standard resources for practicing algorithms and interview problems</div>
        </div>
      </div>

      <div class="grid-cols-3">
        ${(placementData.codingPlatforms || [])
          .map(
            (p) => `
          <div style="border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 1.25rem; background: #ffffff;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.375rem;">
              <h4 style="font-size: 0.9375rem; font-weight: 700;">${p.name}</h4>
              <span class="badge-tag" style="background: var(--bg-main); border: 1px solid var(--border); font-size: 0.625rem;">${p.tag}</span>
            </div>
            <p style="font-size: 0.75rem; color: var(--text-sub); margin-bottom: 0.75rem;">${p.desc}</p>
            <div style="font-size: 0.6875rem; font-weight: 700; color: var(--primary);">Goal: ${p.highlight}</div>
          </div>
        `
          )
          .join('')}
      </div>
    </div>

    <!-- Resume Best Practices & GitHub Standards -->
    <div class="grid-cols-2" style="margin-bottom: 1.5rem;">
      <div class="card">
        <div class="card-title" style="margin-bottom: 0.75rem;">Resume Best Practices</div>
        <ul style="font-size: 0.8125rem; line-height: 1.6; margin-left: 1.25rem; list-style-type: disc;">
          ${(placementData.resumeTips || []).map(formatGuideTip).join('')}
        </ul>
      </div>

      <div class="card">
        <div class="card-title" style="margin-bottom: 0.75rem;">GitHub &amp; Project Standards</div>
        <ul style="font-size: 0.8125rem; line-height: 1.6; margin-left: 1.25rem; list-style-type: disc;">
          ${(placementData.githubTips || []).map(formatGuideTip).join('')}
        </ul>
      </div>
    </div>

    ${placementData.communicationTips && placementData.communicationTips.length > 0 ? `
      <!-- Communication & HR Interview Guidelines -->
      <div class="card" style="margin-bottom: 1.5rem;">
        <div class="card-title" style="margin-bottom: 0.75rem;">Communication &amp; HR Interview Standards</div>
        <ul style="font-size: 0.8125rem; line-height: 1.6; margin-left: 1.25rem; list-style-type: disc;">
          ${placementData.communicationTips.map(formatGuideTip).join('')}
        </ul>
      </div>
    ` : ''}

    ${placementData.coreSubjects && placementData.coreSubjects.length > 0 ? `
      <!-- Core Computer Science Syllabus Reference -->
      <div class="card">
        <div class="card-header">
          <div>
            <div class="card-title">Core Computer Science Focus Areas</div>
            <div class="card-subtitle">Essential technical topics tested in campus hiring technical rounds</div>
          </div>
        </div>
        <div class="grid-cols-3">
          ${placementData.coreSubjects.map((sub) => `
            <div style="border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 1.25rem; background: #ffffff;">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem;">
                <h4 style="font-size: 0.875rem; font-weight: 700;">${sub.title}</h4>
                <span class="badge-tag" style="background: var(--bg-main); border: 1px solid var(--border); font-size: 0.625rem;">${sub.abbr}</span>
              </div>
              <p style="font-size: 0.75rem; color: var(--text-sub); margin-bottom: 0.625rem; line-height: 1.5;">${sub.topics}</p>
              <div style="font-size: 0.6875rem; font-weight: 600; color: var(--primary);">Key Focus: ${sub.keyFocus}</div>
            </div>
          `).join('')}
        </div>
      </div>
    ` : ''}
  `;
}

// ==========================================
// 8. ADMIN QUESTION BANK MANAGER
// ==========================================
let adminQuestionsList = [];
let adminFilterSubject = 'all';

async function renderAdminQuestions() {
  const container = document.getElementById('admin-questions-content');
  if (!container) return;

  if (!currentUser.isAdmin) {
    container.innerHTML = `<div class="alert alert-error">Access denied: Administrator privileges required.</div>`;
    return;
  }

  container.innerHTML = `<div style="text-align: center; padding: 3rem;"><p>Loading question bank...</p></div>`;

  try {
    const subjectsData = await apiGetSubjects();
    const questionsData = await apiGetQuestions({ limit: 100 });
    adminQuestionsList = questionsData.questions || [];

    container.innerHTML = `
      <div class="card">
        <div class="card-header">
          <div>
            <div class="card-title">Question Bank Administration</div>
            <div class="card-subtitle">Manage placement questions with real-time MongoDB / persistent document storage</div>
          </div>
          <button type="button" id="admin-add-question-btn" class="btn btn-primary btn-sm">
            + Add New Question
          </button>
        </div>

        <!-- Filter bar -->
        <div style="display: flex; gap: 0.75rem; margin-bottom: 1.25rem;">
          <select id="admin-subject-filter" class="form-control" style="max-width: 300px;">
            <option value="all">All Subjects (${adminQuestionsList.length} Questions)</option>
            ${(subjectsData.subjects || [])
              .map(
                (s) => `<option value="${s.name}" ${adminFilterSubject === s.name ? 'selected' : ''}>${s.name} (${s.questionCount})</option>`
              )
              .join('')}
          </select>
        </div>

        <div class="table-responsive">
          <table class="custom-table">
            <thead>
              <tr>
                <th style="width: 25%;">Subject &amp; Topic</th>
                <th style="width: 45%;">Question</th>
                <th style="width: 15%;">Difficulty</th>
                <th style="width: 15%;">Actions</th>
              </tr>
            </thead>
            <tbody>
              ${adminQuestionsList
                .filter((q) => adminFilterSubject === 'all' || q.subject === adminFilterSubject)
                .slice(0, 30)
                .map(
                  (q) => `
                <tr>
                  <td>
                    <strong>${q.subject}</strong><br>
                    <span style="font-size: 0.75rem; color: var(--text-muted);">${q.topic}</span>
                  </td>
                  <td>
                    <div style="font-weight: 600; color: var(--text-main);">${q.question}</div>
                    ${q.codeSnippet ? `<span class="badge-tag" style="background: #0f172a; color: #fff; font-family: var(--font-mono); font-size: 0.625rem;">Code Included</span>` : ''}
                  </td>
                  <td>
                    <span class="badge-tag" style="background: var(--bg-main); border: 1px solid var(--border);">${q.difficulty}</span>
                  </td>
                  <td>
                    <button type="button" class="btn btn-outline btn-sm admin-delete-btn" data-qid="${q.id}" style="color: #dc2626; border-color: #fecaca;">
                      Delete
                    </button>
                  </td>
                </tr>
              `
                )
                .join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;

    // Filter event
    const filterSelect = document.getElementById('admin-subject-filter');
    if (filterSelect) {
      filterSelect.addEventListener('change', (e) => {
        adminFilterSubject = e.target.value;
        renderAdminQuestions();
      });
    }

    // Add question modal button
    const addBtn = document.getElementById('admin-add-question-btn');
    if (addBtn) {
      addBtn.addEventListener('click', () => openAddQuestionModal(subjectsData.subjects || []));
    }

    // Delete buttons
    container.querySelectorAll('.admin-delete-btn').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const qid = btn.getAttribute('data-qid');
        if (confirm('Are you sure you want to delete this question?')) {
          try {
            await apiDeleteQuestion(qid);
            showToast('Question deleted successfully', 'success');
            renderAdminQuestions();
          } catch (err) {
            showToast('Failed to delete question: ' + err.message, 'error');
          }
        }
      });
    });
  } catch (err) {
    container.innerHTML = `<div class="alert alert-error">Error loading question bank: ${err.message}</div>`;
  }
}

// ==========================================
// 9. SUPER ADMIN - MANAGE ADMINISTRATORS
// ==========================================
async function renderManageAdmins() {
  const container = document.getElementById('manage-admins-content');
  if (!container) return;

  if (currentUser?.isSuperAdmin !== true) {
    container.innerHTML = `
      <div class="alert alert-error">
        Access denied: Super Administrator privileges required.
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div class="card">
      <div class="card-header">
        <div>
          <div class="card-title">Manage Administrators</div>
          <div class="card-subtitle">Create and view placement administrators.</div>
        </div>
      </div>
      <p>Loading administrators...</p>
    </div>
  `;

  try {
    const response = await apiGetAdmins();
    const admins = response.admins || [];

    container.innerHTML = `
      <div class="card">
        <div class="card-header">
          <div>
            <div class="card-title">Manage Administrators</div>
            <div class="card-subtitle">Total administrators: ${admins.length}</div>
          </div>
        </div>

        <div class="table-responsive">
          <table class="custom-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              ${admins.length ? admins.map(admin => `
                <tr>
                  <td>${admin.name || 'N/A'}</td>
                  <td>${admin.email}</td>
                  <td>${admin.role || 'Administrator'}</td>
                  <td>${admin.createdAt ? new Date(admin.createdAt).toLocaleDateString() : 'N/A'}</td>
                </tr>
              `).join('') : `
                <tr><td colspan="4">No administrators created yet.</td></tr>
              `}
            </tbody>
          </table>
        </div>
      </div>
    `;
  } catch (err) {
    container.innerHTML = `
      <div class="alert alert-error">
        Unable to load administrators: ${err.message}
      </div>
    `;
  }
}

function openAddQuestionModal(subjects) {
  const modal = document.getElementById('add-q-modal');
  if (!modal) return;

  const subSelect = document.getElementById('modal-q-subject');
  if (subSelect) {
    subSelect.innerHTML = subjects
      .map((s) => `<option value="${s.name}">${s.name}</option>`)
      .join('');
  }

  modal.style.display = 'flex';
}
