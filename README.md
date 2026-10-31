# SkillSync – Placement Preparation System

**A comprehensive placement preparation platform designed to help students assess their technical skills, track performance, and prepare for placement opportunities.**

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen)](https://skillsync-placement-preparation-system.onrender.com)
[![Node.js](https://img.shields.io/badge/Node.js-20%2B-green)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-Backend-black)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-green)](https://www.mongodb.com/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

## 🌐 Live Demo

**Project URL:** https://skillsync-placement-preparation-system.onrender.com

## 📌 About the Project

SkillSync is a web-based placement preparation system developed to help students prepare for technical assessments and campus placement opportunities.

The platform provides assessment tools, performance tracking, preparation resources, and placement guidance in one place.

It also includes an administrator portal for managing placement assessment questions.

## ✨ Key Features

### 👨‍🎓 Student Module
- Student registration and login.
- Personalized placement preparation dashboard.
- Technical and aptitude assessment practice.
- Topic-wise practice and mock tests.
- Performance reports and score analysis.
- Assessment attempt history.
- Preparation roadmap.
- Placement mentor and guidance resources.
- Company suggestions and placement guide.

### 🛠️ Administrator Module
- Dedicated administrator login.
- Administrator dashboard.
- Question bank management.
- Add and delete assessment questions.
- Subject-wise question organization.
- Difficulty-based question management.

### 🔐 Authentication & Security
- Password hashing using bcrypt.
- JWT-based authentication.
- Role-based administrator authorization.
- MongoDB database integration.
- Environment-based configuration for sensitive credentials.

## 🧰 Tech Stack

| Technology | Purpose |
|---|---|
| HTML5 | Frontend structure |
| CSS3 | Styling and responsive layout |
| JavaScript | Frontend functionality |
| Node.js | Backend runtime |
| Express.js | Backend framework and APIs |
| MongoDB Atlas | Database |
| Mongoose / MongoDB Driver | Database integration, as configured |
| JWT | Authentication |
| Bcrypt.js | Password hashing |
| Render | Deployment |
| Git & GitHub | Version control |

## 📂 Project Structure

```text
SkillSync-Placement-Preparation-System/
│
├── data/
│   ├── placementData.js
│   ├── questionBank.js
│   └── questions.json
│
├── public/
│   ├── css/
│   │   └── style.css
│   │
│   ├── js/
│   │   ├── admin-login-page.js
│   │   ├── api.js
│   │   ├── app.js
│   │   ├── assessment.js
│   │   ├── login-page.js
│   │   ├── register-page.js
│   │   ├── report.js
│   │   └── toast.js
│   │
│   ├── admin-login.html
│   ├── index.html
│   ├── login.html
│   └── register.html
│
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── server.js
└── README.md
```

## ⚙️ Installation & Setup

Follow these steps to run SkillSync locally.

### 1. Clone the Repository

```bash
git clone https://github.com/prernagoswami05/SkillSync-Placement-Preparation-System.git
```

### 2. Navigate to the Project Directory

```bash
cd SkillSync-Placement-Preparation-System
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the root directory and configure the following variables:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_random_secret
SUPER_ADMIN_EMAIL=your_super_admin_email
SUPER_ADMIN_PASSWORD=your_super_admin_password
```

**Important:** Replace the placeholder values with your own credentials. Never upload your actual `.env` file or database credentials to GitHub.

### 5. Start the Development Server

```bash
npm run dev
```

Alternatively:

```bash
node server.js
```

### 6. Open the Application

```text
http://localhost:3000
```

## 🗄️ Database

SkillSync uses MongoDB Atlas for storing application data.

The database supports:
- User account information.
- Assessment questions.
- Student assessment attempts.
- Application-related data.

Database connection details are configured through environment variables.

## 🚀 Deployment

The application is deployed using **Render**.

Deployment workflow:

1. Push the project code to GitHub.
2. Connect the GitHub repository to Render.
3. Create a Node.js Web Service.
4. Configure the build command:

```bash
npm install
```

5. Configure the start command:

```bash
node server.js
```

6. Add the required environment variables.
7. Deploy the application.

**Live Application:** https://skillsync-placement-preparation-system.onrender.com

## 🔮 Future Improvements

- Dedicated Super Admin interface for managing administrator accounts.
- Admin account creation and deactivation interface.
- Advanced student performance analytics.
- Additional assessment categories.
- Improved placement recommendations.
- Enhanced user experience and accessibility.

## 👩‍💻 Author

**Prerna Goswami**

B.Tech – Computer Science and Engineering

GitHub: [@prernagoswami05](https://github.com/prernagoswami05)

## ⭐ Support

If you find this project useful, consider giving it a ⭐ on GitHub.

---

**SkillSync – Prepare Smarter. Assess Better. Get Placement Ready.**
