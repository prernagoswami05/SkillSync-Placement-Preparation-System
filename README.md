# SkillSync – Placement Preparation System 🚀

**Prepare Smarter. Assess Better. Get Placement Ready.**

SkillSync is a web-based placement preparation platform designed to help students improve their technical skills, practice assessments, track performance, and prepare for campus placement opportunities.

🌐 **Live Demo:** [Visit SkillSync](https://skillsync-placement-preparation-system.onrender.com)

---

## 📌 About the Project

SkillSync provides students with a centralized platform for placement preparation. It combines technical assessments, mock tests, performance tracking, preparation resources, and placement guidance in one application.

The platform also includes a dedicated administrator portal for managing assessment questions and maintaining the question bank.

The main objective of SkillSync is to make placement preparation more structured, accessible, and effective for students.

## ✨ Features

### 👨‍🎓 Student Module

- Student registration and login.
- Personalized placement preparation dashboard.
- Technical and aptitude assessment practice.
- Topic-wise practice tests.
- Mock assessments.
- Performance reports and score analysis.
- Assessment attempt history.
- Preparation roadmap.
- Placement mentor resources.
- Company suggestions.
- Placement guidance.

### 🛠️ Administrator Module

- Dedicated administrator login.
- Administrator dashboard.
- Question bank management.
- Add new assessment questions.
- Delete existing questions.
- Subject-wise question organization.
- Difficulty-based question management.

### 🔐 Authentication & Security

- Password hashing using bcrypt.
- JWT-based authentication.
- Role-based administrator authorization.
- MongoDB database integration.
- Environment variables for sensitive configuration.
- Separate Super Admin and normal Admin privileges.

## 🧰 Technology Stack

| Technology | Purpose |
|---|---|
| HTML5 | Frontend structure |
| CSS3 | Styling and responsive design |
| JavaScript | Frontend functionality |
| Node.js | Backend runtime |
| Express.js | Backend framework and REST APIs |
| MongoDB Atlas | Cloud database |
| MongoDB Node.js Driver | Database connectivity |
| JSON Web Token (JWT) | Authentication |
| Bcrypt.js | Password hashing |
| Git | Version control |
| GitHub | Source code management |
| Render | Application deployment |

## 🌐 Live Application

**Visit the deployed application:**

[https://skillsync-placement-preparation-system.onrender.com](https://skillsync-placement-preparation-system.onrender.com)

The application is deployed using Render and connected to MongoDB Atlas.

*Note: The free hosting service may take some time to respond after a period of inactivity.*

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
├── README.md
├── index.html
├── package.json
├── package-lock.json
└── server.js
```

## ⚙️ Installation & Setup

Follow these steps to run the project on your local machine.

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

Create a `.env` file in the root directory and add the following configuration:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_random_secret
SUPER_ADMIN_EMAIL=your_super_admin_email
SUPER_ADMIN_PASSWORD=your_super_admin_password
```

Replace the placeholder values with your own credentials.

**Important:** Never upload your actual `.env` file, database connection string, or passwords to GitHub.

### 5. Start the Development Server

```bash
npm run dev
```

Alternatively, run:

```bash
node server.js
```

### 6. Open the Application

**Live Application:**

https://skillsync-placement-preparation-system.onrender.com

**Local Development:**

After starting the server, open:

```text
http://localhost:3000
```

## 🗄️ Database

SkillSync uses **MongoDB Atlas** as its cloud database.

The database is used to store:

- User account information.
- Assessment questions.
- Student assessment attempts.
- Application-related data.

Database credentials are configured through environment variables to keep sensitive information separate from the source code.

## 🚀 Deployment

The application is deployed on **Render**.

Deployment workflow:

1. Develop the application locally.
2. Push source code to GitHub.
3. Connect the GitHub repository to Render.
4. Create a Node.js Web Service.
5. Configure the build command:

```bash
npm install
```

6. Configure the start command:

```bash
node server.js
```

7. Add the required environment variables.
8. Deploy the application.

**Live URL:**  
https://skillsync-placement-preparation-system.onrender.com

## 🔮 Future Improvements

The following improvements are planned for future development:

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

If you find this project useful, consider giving the repository a ⭐ on GitHub.

---

<p align="center">

**SkillSync – Prepare Smarter. Assess Better. Get Placement Ready.** 🚀

</p>
