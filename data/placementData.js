const ALL_SKILLS = ["DSA", "Aptitude", "Core CS", "Communication"];
const ALL_ROLES = [
  "Software Engineer",
  "Data Analyst",
  "Web Developer",
  "System Engineer",
  "Full Stack Developer"
];
const initialQuestions = [
  // DSA questions
  {
    id: 1,
    topic: "DSA",
    question: "What is the time complexity of binary search?",
    options: ["O(n)", "O(log n)", "O(n\xB2)", "O(n log n)"],
    correct: 1
  },
  {
    id: 2,
    topic: "DSA",
    question: "Which data structure uses LIFO order?",
    options: ["Queue", "Stack", "Array", "Linked List"],
    correct: 1
  },
  // Aptitude questions
  {
    id: 3,
    topic: "Aptitude",
    question: "A train travels 300 km in 5 hours. What is its speed?",
    options: ["50 km/h", "60 km/h", "70 km/h", "80 km/h"],
    correct: 1
  },
  {
    id: 4,
    topic: "Aptitude",
    question: "What is 20% of 350?",
    options: ["60", "65", "70", "75"],
    correct: 2
  },
  // Core CS questions
  {
    id: 5,
    topic: "Core CS",
    question: "What does ACID stand for in DBMS?",
    options: [
      "Access Control Integrity Design",
      "Atomicity Consistency Isolation Durability",
      "Array Cursor Index Data",
      "None of these"
    ],
    correct: 1
  },
  {
    id: 6,
    topic: "Core CS",
    question: "Which OSI layer is responsible for routing?",
    options: ["Data Link", "Transport", "Network", "Session"],
    correct: 2
  },
  // Communication questions
  {
    id: 7,
    topic: "Communication",
    question: "Which sentence is correctly punctuated?",
    options: [
      "Its a great day.",
      "It's a great day.",
      "Its' a great day.",
      "It is, a great day."
    ],
    correct: 1
  },
  {
    id: 8,
    topic: "Communication",
    question: '"Each of the employees have submitted." \u2014 What is the error?',
    options: [
      "No error",
      "employees \u2192 employee",
      "have \u2192 has",
      "submitted \u2192 submits"
    ],
    correct: 2
  }
];
const roadmapData = {
  beginner: [
    {
      title: "Learn Programming Basics",
      time: "Weeks 1-3",
      status: "current",
      desc: "Pick Python or Java. Learn loops, functions, and OOP basics.",
      tags: ["Python.org", "W3Schools", "2 hrs/day"]
    },
    {
      title: "Study Core CS Subjects",
      time: "Weeks 4-6",
      status: "current",
      desc: "Cover OS, DBMS, CN basics. Use Neso Academy on YouTube.",
      tags: ["Neso Academy", "GFG", "1 hr/day"]
    },
    {
      title: "Start Easy DSA Problems",
      time: "Weeks 7-10",
      status: "upcoming",
      desc: "Arrays, strings, basic sorting. Solve 3 easy LeetCode problems daily.",
      tags: ["LeetCode Easy", "Love Babbar 450", "CS50"]
    },
    {
      title: "Aptitude and Verbal Practice",
      time: "Weeks 11-14",
      status: "upcoming",
      desc: "30 minutes of aptitude daily. IndiaBix mock tests twice a week.",
      tags: ["IndiaBix", "R.S. Aggarwal", "The Hindu"]
    },
    {
      title: "Apply to Service Companies",
      time: "Placement",
      status: "locked",
      desc: "Target TCS, Wipro, Infosys. Register on TalentNext and InfyTQ early.",
      tags: ["TalentNext", "InfyTQ", "CoCubes"]
    }
  ],
  intermediate: [
    {
      title: "DSA at Medium Level",
      time: "Weeks 1-4",
      status: "current",
      desc: "Trees, graphs, DP, greedy. Solve 100+ LeetCode problems.",
      tags: ["Striver SDE Sheet", "LeetCode Medium", "Codeforces"]
    },
    {
      title: "Learn System Design Basics",
      time: "Weeks 5-7",
      status: "current",
      desc: "Load balancers, caching, API design. Design a URL shortener.",
      tags: ["Gaurav Sen YT", "Educative.io", "Grokking SD"]
    },
    {
      title: "Do Mock Interviews",
      time: "Weeks 8-10",
      status: "current",
      desc: "Do 10+ mock interviews. Use Pramp for free practice sessions.",
      tags: ["Pramp.com", "InterviewBit", "Mock weekly"]
    },
    {
      title: "Make 2-3 Projects",
      time: "Weeks 9-12",
      status: "upcoming",
      desc: "Build full-stack or DSA projects. Push everything to GitHub.",
      tags: ["GitHub", "Vercel", "Portfolio"]
    },
    {
      title: "Apply to Mid Level Companies",
      time: "Placement",
      status: "locked",
      desc: "Target Cognizant, Capgemini, Accenture, Zoho, Freshworks.",
      tags: ["LinkedIn", "HackerEarth", "Referrals"]
    }
  ],
  advanced: [
    {
      title: "Hard Problems + Contests",
      time: "Weeks 1-3",
      status: "current",
      desc: "LeetCode Hard, Codeforces Div.1. Segment trees, Tries, Advanced DP.",
      tags: ["LeetCode Hard", "Codeforces", "USACO"]
    },
    {
      title: "Advanced System Design",
      time: "Weeks 4-6",
      status: "current",
      desc: "Design Twitter, YouTube, WhatsApp. HLD + LLD with design patterns.",
      tags: ["ByteByteGo", "Donne Martin", "Exponent"]
    },
    {
      title: "Behavioural Interview Prep",
      time: "Weeks 5-7",
      status: "current",
      desc: "15 STAR stories. Study Amazon Leadership Principles.",
      tags: ["STAR Method", "Amazon LPs", "Glassdoor"]
    },
    {
      title: "Company Specific Prep",
      time: "Weeks 7-9",
      status: "current",
      desc: "Study each company's past questions, tech blogs, and job descriptions.",
      tags: ["LeetCode Tags", "Glassdoor", "Tech Blogs"]
    },
    {
      title: "Apply to Top Companies",
      time: "Placement",
      status: "locked",
      desc: "Apply to Amazon, Flipkart, Microsoft, Google. Use referrals.",
      tags: ["LinkedIn", "Referrals", "Campus Hiring"]
    }
  ]
};
const companiesList = {
  beginner: {
    service: [
      {
        name: "TCS",
        role: "System Engineer",
        salary: "3.6 - 4.5 LPA",
        info: "Largest IT services company in India. Comprehensive training program for freshers."
      },
      {
        name: "Wipro",
        role: "Project Engineer",
        salary: "3.5 - 4.5 LPA",
        info: "Solid entry level foundation. Diverse client domains and strong mentorship."
      },
      {
        name: "Infosys",
        role: "Systems Engineer",
        salary: "3.6 - 4.5 LPA",
        info: "World-class Mysore campus training before project allocation. Active campus drives."
      },
      {
        name: "HCLTech",
        role: "Graduate Engineer",
        salary: "3.5 - 4.0 LPA",
        info: "Aptitude and communication-focused hiring rounds with steady learning curve."
      }
    ],
    product: []
  },
  intermediate: {
    service: [
      {
        name: "Cognizant",
        role: "Programmer Analyst",
        salary: "4.0 - 5.5 LPA",
        info: "Strong presence in BFSI and healthcare IT with clear technical growth tracks."
      },
      {
        name: "Capgemini",
        role: "Analyst",
        salary: "3.8 - 5.0 LPA",
        info: "Global firm offering international exposure and modern tech stacks."
      },
      {
        name: "Accenture",
        role: "Associate Software Engineer",
        salary: "4.5 - 5.5 LPA",
        info: "Great exposure to enterprise consulting, cloud architectures, and digital solutions."
      }
    ],
    product: [
      {
        name: "Zoho",
        role: "Software Developer",
        salary: "5.0 - 8.0 LPA",
        info: "High-focus on problem-solving, clean code, and zero dependency on degrees."
      },
      {
        name: "Freshworks",
        role: "Associate Engineer",
        salary: "8.0 - 12.0 LPA",
        info: "Leading SaaS unicorn with great engineering culture and competitive entry pay."
      }
    ]
  },
  advanced: {
    service: [
      {
        name: "TCS Digital",
        role: "Digital Engineer",
        salary: "7.0 - 9.0 LPA",
        info: "Premium track of TCS focused on cloud computing, AI/ML, and modern architectures."
      },
      {
        name: "Infosys DSE",
        role: "Digital Specialist Engineer",
        salary: "9.5 - 12.0 LPA",
        info: "High-performance specialist engineering track with advanced technical interview bars."
      }
    ],
    product: [
      {
        name: "Amazon",
        role: "SDE-I",
        salary: "30 - 45 LPA",
        info: "Rigorous DSA + Leadership Principles assessment. Leading new grad compensation."
      },
      {
        name: "Flipkart",
        role: "SDE-1",
        salary: "25 - 38 LPA",
        info: "Top Indian e-commerce technology leader with high scale and fast promotion cycles."
      },
      {
        name: "Microsoft",
        role: "Software Engineer",
        salary: "40 - 60 LPA",
        info: "Outstanding work-life balance, strong focus on algorithms and system architecture."
      },
      {
        name: "Google",
        role: "Software Engineer",
        salary: "50 - 80 LPA",
        info: "Highest technical bar, 5 interview rounds, industry-leading compensation and culture."
      }
    ]
  }
};
const mentorAnswers = {
  dsa: {
    beginner: "For DSA at beginner level, start with Arrays, Strings, and basic recursion. Solve 3 easy LeetCode problems every day. Don't jump to hard graphs or DP yet. Follow the Love Babbar 450 sheet or Striver's A-Z sheet. Stay consistent for 4 weeks.",
    intermediate: "At intermediate level, concentrate on Binary Trees, Binary Search Trees, Graphs, and Dynamic Programming. These appear in ~70% of tech interviews. Solve 2 medium LeetCode problems daily, attend weekend contests, and practice writing clean code on a whiteboard or Google Doc.",
    advanced: "At advanced level, tackle LeetCode Hard and Codeforces Div. 2 rounds. Master Segment Trees, Trie, Disjoint Set Union (DSU), and multi-dimensional DP. Target company-specific tagged questions (e.g. Amazon, Google, Meta) and practice explaining your thought process out loud."
  },
  aptitude: {
    beginner: "Practice 30 minutes daily on IndiaBix. Focus on Percentages, Ratios & Proportions, Time-Speed-Distance, and Number Systems. These topics account for over 75% of campus aptitude assessments.",
    intermediate: "Focus on speed and shortcut techniques. Solve questions under 60 seconds each. Take timed section mocks on CoCubes, AMCAT, and PrepInsta every weekend. Analyze every wrong answer and maintain an error log.",
    advanced: "Your quantitative foundations are solid. Now tune into company-specific formats. For example, Amazon and Goldman Sachs use specific critical thinking questions. Target 90%+ accuracy under strict time limits."
  },
  company: {
    beginner: "Target established service companies like TCS, Wipro, Infosys, and HCLTech. Register early on platforms like InfyTQ and TalentNext. Their rounds follow: Aptitude Test \u2192 Technical Interview \u2192 HR. Master basic DSA and clear aptitude to secure your first offer.",
    intermediate: "You are ready for Cognizant GenC Next, Accenture, Capgemini, Zoho, and Freshworks. Apply to 8-10 companies in parallel. Reach out to college alumni on LinkedIn for employee referrals to boost resume shortlisting.",
    advanced: "Target tier-1 product companies: Amazon, Flipkart, Microsoft, Adobe, and Google. You need crisp DSA problem solving, low-level design basics, and solid behavioural preparation. Leverage LinkedIn referrals and off-campus hiring contests."
  },
  resume: {
    beginner: "Keep your resume strictly to 1 page. Include education, 2-3 genuine projects with live links or GitHub repos, and verified technical skills. Quantify details: instead of 'built a website', write 'developed a responsive web app used by 60+ students'. Use clean ATS templates like Jake's Resume on Overleaf.",
    intermediate: "Highlight 2 full-stack or systems projects with live URLs, GitHub repositories, and architectural notes. Start each bullet point with strong action verbs (Architected, Engineered, Optimized). Mention your LeetCode or competitive programming profile with problem counts.",
    advanced: 'Emphasize scale, real-world impact, open-source contributions, and hackathon wins. Detail performance metrics (e.g. "reduced DB query latency by 35% through caching"). Customize keywords for each role so the resume passes ATS scans with a 90%+ match.'
  },
  hr: {
    beginner: "Prepare a crisp 60-second 'Tell me about yourself' pitch covering your background, technical interests, and projects. Prepare honest responses for 'What are your strengths and weaknesses' and 'Why this company?'. Research the company's recent news for 20 minutes before the call.",
    intermediate: "Use the STAR framework (Situation, Task, Action, Result) for all behavioral questions. Prepare 6-8 concrete stories regarding team conflicts, handling tight deadlines, and learning a new framework on the fly. Record your answers on video to evaluate clarity and body language.",
    advanced: "Executive and senior HR rounds assess leadership traits, ownership, and cultural alignment. Study Amazon's 16 Leadership Principles. When discussing compensation, research accurate market ranges on Glassdoor and Levels.fyi."
  },
  general: {
    beginner: "Consistency beats intensity. Dedicate 2-3 hours daily: 1 hour on DSA, 45 minutes on Core CS (OS/DBMS), and 30 minutes on Aptitude. Review your progress every Sunday and adjust.",
    intermediate: "To make the leap to top-tier offers, identify your single weakest domain and spend a 2-week sprint fixing it. Pair up with a peer for weekly mock interviews and system explanation practice.",
    advanced: "You are in prime shape for placements. The deciding factor at your level is how clearly you communicate your thought process while coding under pressure. Practice explaining trade-offs and edge cases."
  }
};
const studyTips = {
  DSA: {
    beginner: "Revise Arrays, Strings, and basic sorting algorithms. Solve 3 easy LeetCode problems daily. Start with the Love Babbar 450 sheet.",
    intermediate: "Focus on Trees, Graphs, and Dynamic Programming. Follow Striver's SDE Sheet. Aim for 150+ solved problems across patterns.",
    advanced: "Practice LeetCode Hard problems. Study company-specific tags and review complex problem patterns."
  },
  Aptitude: {
    beginner: "Practice 30 minutes on IndiaBix daily. Focus on Percentages, Ratios, and Time-Speed-Distance.",
    intermediate: "Take timed mock tests on CoCubes. Aim for a 60-second turnaround per question with 80%+ accuracy.",
    advanced: "Practice advanced verbal and data interpretation. Review company-specific patterns on PrepInsta."
  },
  "Core CS": {
    beginner: "Watch Neso Academy or Gate Smashers playlists for OS, DBMS, and CN. Write short summary cheat-sheets.",
    intermediate: "Deepen knowledge on ACID properties, TCP/IP vs OSI, process scheduling, and SQL query optimization.",
    advanced: "Study virtual memory internals, distributed database consistency models, and network socket protocols."
  },
  Communication: {
    beginner: "Practice your 60-second 'About Me' introduction daily. Read technical blogs or editorial columns to expand vocabulary.",
    intermediate: "Formulate 10 STAR stories. Practice speaking on standard group discussion topics for 2 minutes without hesitation.",
    advanced: "Work on communicating complex architectural decisions clearly and concisely under pressure."
  }
};
const githubTips = [
  {
    title: "Write a comprehensive README",
    text: "Every project should clearly explain what it solves, tech stack, installation steps, and live demo screenshots."
  },
  {
    title: "Commit with clean messages",
    text: 'Frequent, descriptive commits (e.g. "feat: add JWT auth middleware") reflect professional coding habits.'
  },
  {
    title: "Pin your top 4-6 repositories",
    text: "Keep your best work front and center with tags, topics, and deployed URLs linked."
  },
  {
    title: "Create a GitHub Profile README",
    text: "Introduce yourself, list your primary languages/tools, and show live project badges. Recruiters notice this."
  }
];
const resumeTips = [
  {
    title: "Single page rule",
    text: "For freshers and undergraduates, keep your resume strictly 1 page using an ATS-optimized format like Jake's Resume."
  },
  {
    title: "Quantify achievements",
    text: 'Always back up statements with metrics: "Reduced page load time by 32%" rather than "Improved speed".'
  },
  {
    title: "Detail the tech stack for each project",
    text: "Specify languages, databases, libraries, and deployment platforms used in every project entry."
  },
  {
    title: "Align with target job descriptions",
    text: "Include relevant keywords found in the company role description to clear automated ATS screening."
  },
  {
    title: "Verified links only",
    text: "Include clickable, tested links to your GitHub profile, LinkedIn, and personal portfolio or LeetCode."
  }
];
const communicationTips = [
  {
    title: "Master the 60-second introduction",
    text: "Introduce your education, strongest technical skills, favorite projects, and what excites you about the company."
  },
  {
    title: "Use the STAR format",
    text: "Structure answers around Situation, Task, Action, and Result for behavioral and scenario questions."
  },
  {
    title: "Pause before answering",
    text: "Taking a 3-5 second pause to organize your thoughts before speaking demonstrates composure and maturity."
  },
  {
    title: "Ask insightful closing questions",
    text: `When asked "Do you have any questions?", inquire about the team's current tech challenges or the onboarding roadmap.`
  },
  {
    title: "Follow up politely",
    text: "Send a concise thank-you note or email within 24 hours expressing your enthusiasm for the position."
  }
];
const coreSubjects = [
  {
    title: "Data Structures & Algorithms",
    abbr: "DSA",
    topics: "Arrays, Linked Lists, Trees, Graphs, Sorting, Dynamic Programming, Recursion, Hashing, Heaps, Tries",
    keyFocus: "Time & Space Complexity, Problem Solving"
  },
  {
    title: "Operating Systems",
    abbr: "OS",
    topics: "Processes, Threads, CPU Scheduling, Memory Management, Deadlocks, Paging, Virtual Memory, File Systems",
    keyFocus: "Concurrency, Synchronization, System Calls"
  },
  {
    title: "Database Management Systems",
    abbr: "DBMS",
    topics: "SQL Queries, Normalization (1NF to BCNF), ACID Properties, ER Diagrams, Indexing (B-Trees), Transactions",
    keyFocus: "Query Optimization, Data Integrity, Joins"
  },
  {
    title: "Computer Networks",
    abbr: "CN",
    topics: "OSI Model, TCP/IP Protocol Suite, HTTP/HTTPS, DNS, Subnetting, Routing Algorithms, Firewalls, WebSockets",
    keyFocus: "Transport Layer, Handshakes, Latency"
  },
  {
    title: "Object-Oriented Programming",
    abbr: "OOPs",
    topics: "Encapsulation, Abstraction, Inheritance, Polymorphism, Interfaces, SOLID Principles, Design Patterns",
    keyFocus: "Modular Architecture, Code Reusability"
  },
  {
    title: "System Design Fundamentals",
    abbr: "SysDesign",
    topics: "High-Level Design, Low-Level Design, Load Balancers, Caching (Redis), Microservices, Database Sharding, Scalability",
    keyFocus: "Trade-offs, Availability vs Consistency (CAP)"
  }
];
const placementRounds = [
  {
    step: "01",
    title: "Aptitude & Online Assessment",
    desc: "Quantitative ability, logical reasoning, and verbal proficiency. Time-bound evaluation where accuracy and speed determine shortlisting.",
    preparation: "Solve 20 problems daily on IndiaBix or PrepInsta; practice elimination strategies."
  },
  {
    step: "02",
    title: "Coding Assessment Round",
    desc: "2 to 3 coding problems in 60 to 90 minutes. Emphasizes clean code, optimal time/space complexity, and passing all corner test cases.",
    preparation: "Practice on LeetCode and HackerRank; understand constraints to determine optimal Big-O."
  },
  {
    step: "03",
    title: "Technical Interview (Rounds 1 & 2)",
    desc: "Live coding, data structure discussions, Core CS theory (OS, DBMS, Networks), and in-depth walkthrough of your resume projects.",
    preparation: "Be ready to code on a shared editor without auto-complete; explain your approach out loud before typing."
  },
  {
    step: "04",
    title: "HR & Managerial Round",
    desc: "Evaluation of cultural fit, communication skills, career aspirations, problem-solving mindset, and behavioral competencies.",
    preparation: "Use STAR format stories; review company values; prepare genuine questions for the interviewer."
  }
];
const codingPlatforms = [
  {
    name: "LeetCode",
    tag: "Interview Standard",
    desc: "Best platform for coding interview preparation. Focus on company-tagged questions and medium-level problem sets.",
    highlight: "Aim for 100+ Mediums"
  },
  {
    name: "HackerRank",
    tag: "Foundations & Certs",
    desc: "Great for learning fundamentals, language certifications (Java/Python/SQL), and widely used for initial campus test rounds.",
    highlight: "Earn Topic Badges"
  },
  {
    name: "CodeStudio / Striver SDE",
    tag: "Structured Sheets",
    desc: "Topic-wise curated DSA sheets with company-specific interview archives. Excellent structure for 3-month preparation.",
    highlight: "Follow SDE Sheet"
  },
  {
    name: "GeeksforGeeks",
    tag: "Theory + Practice",
    desc: "Comprehensive repository of Core CS concepts, interview experiences, company archives, and practice problems.",
    highlight: "Ideal for Core CS"
  },
  {
    name: "InterviewBit",
    tag: "Timed Simulations",
    desc: "Structured track with timed mock interviews and company-wise prep stages simulating real hiring test conditions.",
    highlight: "Timed Assessments"
  },
  {
    name: "Codeforces",
    tag: "Competitive Edge",
    desc: "Rapid contest problem-solving under pressure. Builds elite problem recognition and fast algorithm implementation.",
    highlight: "Weekly Contests"
  }
];
export {
  ALL_ROLES,
  ALL_SKILLS,
  codingPlatforms,
  communicationTips,
  companiesList,
  coreSubjects,
  githubTips,
  initialQuestions,
  mentorAnswers,
  placementRounds,
  resumeTips,
  roadmapData,
  studyTips
};
