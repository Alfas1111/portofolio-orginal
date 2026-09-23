export const initialPortfolioData = {
  personal: {
    name: "MUHAMMED ALFAS",
    tagline: "BCA STUDENT • SOFTWARE ENGINEER • TECH ENTHUSIAST",
    headline: "I BUILD IDEAS INTO DIGITAL EXPERIENCES.",
    shortIntro: "I'm a BCA student passionate about software development, cloud computing, startups, and building innovative digital products.",
    profileImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
    imagePosition: { zoom: 1, x: 0, y: 0, rotate: 0 },
    aboutBio: "I am a Bachelor of Computer Applications (BCA) student with a drive for full-stack software development, cloud architecture, and entrepreneurial tech innovation. I enjoy breaking down complex problems into elegant code and transforming ambitious concepts into high-performance web applications.",
    college: "School of Computer Science & Applications",
    university: "Apex Institute of Technology",
    degree: "Bachelor of Computer Applications (BCA)",
    location: "Kerala & Bangalore, India",
    careerGoal: "To build impactful software products as a Software Engineer and eventually launch a successful tech startup.",
    interests: ["Full-Stack Engineering", "Cloud Computing", "SaaS Architecture", "AI Integration", "Open Source"],
    personalIntro: "Technology is more than my field of study — it's my creative playground where ideas become reality.",
    resumeUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    resumeFileName: "Muhammed_Alfas_BCA_SoftwareEngineer_Resume.pdf"
  },
  stats: {
    learningYears: "02+",
    projectsCount: "10+",
    certsCount: "05+",
    ideasCount: "∞"
  },
  skills: {
    Programming: [
      { name: "C", level: "Advanced", badge: "Core Logic" },
      { name: "Java", level: "Proficient", badge: "OOP & DSA" },
      { name: "Python", level: "Advanced", badge: "Scripting & AI" },
      { name: "JavaScript", level: "Expert", badge: "ES6+ Modern" }
    ],
    "Web Development": [
      { name: "HTML", level: "Expert", badge: "Semantic & SEO" },
      { name: "CSS", level: "Expert", badge: "Custom & Grid" },
      { name: "JavaScript", level: "Expert", badge: "Async & DOM" },
      { name: "React.js", level: "Advanced", badge: "SPA Architecture" },
      { name: "Node.js", level: "Proficient", badge: "RESTful APIs" }
    ],
    Database: [
      { name: "MySQL", level: "Advanced", badge: "Relational Queries" },
      { name: "MongoDB", level: "Proficient", badge: "NoSQL & Aggregations" }
    ],
    "Cloud & Tools": [
      { name: "AWS", level: "Intermediate", badge: "S3, EC2 & Cloud" },
      { name: "Git", level: "Advanced", badge: "Version Control" },
      { name: "GitHub", level: "Advanced", badge: "CI/CD & Actions" },
      { name: "VS Code", level: "Expert", badge: "Developer Workflow" }
    ]
  },
  projects: [
    {
      id: "p1",
      title: "Music Player Website",
      category: "Web Development",
      image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=900&auto=format&fit=crop",
      shortDescription: "An interactive music player website built using modern web technologies with a responsive interface and API integration.",
      fullDescription: "A full-featured web audio application with custom waveform visualizer, audio streaming controls, playlist creation, dark brutalist UI, and integration with Spotify API for live lyric syncing.",
      technologies: ["React", "JavaScript", "HTML5 Audio", "Tailwind CSS", "Web Audio API"],
      github: "https://github.com/example/music-player-app",
      demo: "https://example.com/music-player",
      date: "2024"
    },
    {
      id: "p2",
      title: "DevFlow Code Hub",
      category: "Full Stack",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=900&auto=format&fit=crop",
      shortDescription: "A real-time developer snippet repository and markdown documentation sharing platform.",
      fullDescription: "Empowers computer applications students to store code templates, test syntax, share gists with custom access tokens, and format documentation using an embedded live code editor.",
      technologies: ["React", "Node.js", "MongoDB", "Express", "Tailwind CSS"],
      github: "https://github.com/example/devflow-hub",
      demo: "https://example.com/devflow",
      date: "2024"
    },
    {
      id: "p3",
      title: "CloudVault AWS Storage",
      category: "Cloud & Security",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=900&auto=format&fit=crop",
      shortDescription: "Secure cloud document storage manager connected directly to AWS S3 buckets.",
      fullDescription: "Provides encrypted file uploading, presigned URL creation, folder organization, and direct streaming of video/audio assets backed by AWS IAM policies.",
      technologies: ["React", "AWS S3", "Node.js", "JavaScript", "JWT Auth"],
      github: "https://github.com/example/cloud-vault",
      demo: "https://example.com/cloudvault",
      date: "2024"
    },
    {
      id: "p4",
      title: "BCA Smart Study Portal",
      category: "Academic / College",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=900&auto=format&fit=crop",
      shortDescription: "All-in-one resource hub for BCA students featuring syllabus trackers, notes, and CGPA calculators.",
      fullDescription: "Built specifically to solve resource fragmentation for computer application students. Includes semester subject roadmaps, past examination papers, interactive CGPA predictor, and peer note sharing.",
      technologies: ["HTML5", "CSS3", "JavaScript", "LocalStorage", "Bootstrap"],
      github: "https://github.com/example/bca-study-portal",
      demo: "https://example.com/bca-portal",
      date: "2023"
    }
  ],
  education: [
    {
      id: "e1",
      degree: "Bachelor of Computer Applications (BCA)",
      institution: "School of Computer Science",
      university: "Apex Institute of Technology",
      years: "2023 – Present",
      grade: "CGPA: 9.2 / 10.0",
      subjects: "Data Structures & Algorithms, Object-Oriented Programming (Java), Web Development, Database Management Systems (MySQL), Operating Systems, Software Engineering.",
      achievements: "Ranked Department Top 5, Lead Organizer of Annual College Tech Fest 2024."
    },
    {
      id: "e2",
      degree: "Higher Secondary Certificate (10+2 Science)",
      institution: "Delhi Public School",
      university: "CBSE Board",
      years: "2021 – 2023",
      grade: "91.8%",
      subjects: "Physics, Mathematics, Chemistry, Computer Science (Python & SQL), English.",
      achievements: "School Computer Club Secretary, Winner of Inter-School Coding Sprint."
    }
  ],
  experience: [
    {
      id: "ex1",
      organization: "TechInnovate Software Solutions",
      position: "Full-Stack Development Intern",
      duration: "Jun 2024 – Aug 2024",
      description: "Collaborated with senior engineers to develop frontend components in React and optimize RESTful API endpoints in Node.js.",
      technologies: ["React", "JavaScript", "Node.js", "Git", "REST APIs"],
      achievements: "Improved web app page load speed by 35% through component code-splitting and asset optimization."
    },
    {
      id: "ex2",
      organization: "Self-Employed / Freelance",
      position: "Frontend Web Developer",
      duration: "2023 – Present",
      description: "Designed and implemented customized, high-contrast web interfaces for client startups and local SMBs.",
      technologies: ["HTML", "CSS", "JavaScript", "React", "Tailwind CSS"],
      achievements: "Delivered 6 client projects on schedule with 100% positive feedback rating."
    }
  ],
  experienceFallbackMessage: "Currently building experience through projects, internships, certifications and independent learning.",
  certifications: [
    {
      id: "c1",
      name: "AWS Certified Cloud Practitioner",
      organization: "Amazon Web Services (AWS)",
      date: "2024",
      credentialId: "AWS-CCP-9982031",
      image: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?q=80&w=600&auto=format&fit=crop",
      verifyLink: "https://aws.amazon.com/verification"
    },
    {
      id: "c2",
      name: "Meta Front-End Developer Specialization",
      organization: "Meta / Coursera",
      date: "2024",
      credentialId: "META-FE-7740192",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=600&auto=format&fit=crop",
      verifyLink: "https://coursera.org/verify"
    },
    {
      id: "c3",
      name: "Java Programming & Data Structures",
      organization: "Oracle / Udemy",
      date: "2023",
      credentialId: "UC-8819203-JAVA",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600&auto=format&fit=crop",
      verifyLink: "https://udemy.com/certificate"
    },
    {
      id: "c4",
      name: "MongoDB Database Developer",
      organization: "MongoDB University",
      date: "2023",
      credentialId: "MDB-DEV-2023-88",
      image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=600&auto=format&fit=crop",
      verifyLink: "https://university.mongodb.com"
    }
  ],
  achievements: [
    {
      id: "a1",
      title: "1st Winner — National Student Hackathon 2024",
      category: "Hackathon",
      description: "Designed and built an AI-assisted real-time collaborative code review portal in 24 hours competing against 40+ college teams.",
      date: "2024"
    },
    {
      id: "a2",
      title: "Academic Honor Roll — Top 3 in BCA Department",
      category: "Academic",
      description: "Awarded Certificate of Merit for consecutive semester GPA above 9.0 in Computer Applications.",
      date: "2023 - 2024"
    },
    {
      id: "a3",
      title: "Technical Lead — College Coding Club",
      category: "Leadership",
      description: "Mentored 120+ junior BCA students in Java fundamentals, Data Structures, and Git/GitHub workflows.",
      date: "2023 – Present"
    }
  ],
  startupIdeas: [
    {
      id: "i1",
      name: "DevFlow AI Workspace",
      problem: "Computer science and BCA students waste hours context-switching between notes, IDEs, code snippet managers, and study PDFs.",
      solution: "An integrated browser-based workstation that uses AI to organize code snippets, generate instant study flashcards from lecture PDFs, and auto-detect syntax errors.",
      concept: "Notion meets VS Code tailored specifically for computer science undergrads.",
      currentStage: "Prototyping MVP",
      futureVision: "Expand into a worldwide collaborative ecosystem for CS/IT universities and tech bootcamp students."
    },
    {
      id: "i2",
      name: "SkillBridge Micro-Internships",
      problem: "Early-stage college students struggle to get industry experience because companies prefer 3rd/4th year engineering students.",
      solution: "A micro-task platform where startups post 10-hour real project tasks (like fixing a React bug or writing a SQL query) that BCA/CS students can solve for verified credentials.",
      concept: "Upwork for college students backed by university skill verification.",
      currentStage: "Concept & Validation",
      futureVision: "Become the primary talent pipeline for early-stage tech founders hiring junior developers."
    }
  ],
  services: [
    {
      id: "s1",
      title: "Full-Stack Web App Development",
      description: "Custom, responsive web applications engineered with React, Node.js, and modern styling libraries built for speed and security."
    },
    {
      id: "s2",
      title: "MVP Development for Tech Startups",
      description: "Fast turn-around prototyping to turn product concepts into functional live websites ready for investor demos."
    },
    {
      id: "s3",
      title: "Cloud Infrastructure Setup (AWS)",
      description: "Deployment of web assets to AWS S3, CloudFront, EC2 instances, and DNS domain configuration."
    },
    {
      id: "s4",
      title: "UI/UX Code Refactoring",
      description: "Modernizing clunky, slow frontend codebase to sleek brutalist high-contrast responsive designs."
    }
  ],
  blog: [
    {
      id: "b1",
      title: "How I Mastered Data Structures in Java as a BCA Student",
      date: "Aug 12, 2024",
      readTime: "5 min read",
      summary: "My step-by-step roadmap to understanding Arrays, Linked Lists, Trees, and Graph algorithms with practical problem solving on LeetCode.",
      content: "When I started my BCA degree, Data Structures felt overwhelming. By committing to 2 problem sets daily in Java and visualizing memory allocation step by step, complex graph traversals became second nature..."
    },
    {
      id: "b2",
      title: "Building Modern Web Interfaces with High Contrast Brutalism",
      date: "Jul 28, 2024",
      readTime: "4 min read",
      summary: "Why yellow and black typography creates unforgettable visual impressions for developer portfolios.",
      content: "Generic gray-on-white websites blur together. Bold yellow background, sharp black borders, oversized headings, and micro-interactions command attention immediately..."
    }
  ],
  gallery: [
    {
      id: "g1",
      title: "Hackathon Victory Moment",
      category: "Hackathons",
      caption: "Winning 1st place with our team project at National Student Hackathon 2024.",
      url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: "g2",
      title: "Tech Workshop Speaker",
      category: "Tech Events",
      caption: "Conducting a hands-on React & Git workshop for 100+ first-year BCA students.",
      url: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: "g3",
      title: "Developer Setup & Workstation",
      category: "Workspace",
      caption: "Dual monitor setup where late-night code and startup ideas come alive.",
      url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: "g4",
      title: "Campus Tech Fest Team",
      category: "College Life",
      caption: "With the organizing committee of Apex University Tech Fest 2024.",
      url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop"
    }
  ],
  social: {
    linkedin: "https://linkedin.com/in/muhammed-alfas",
    github: "https://github.com/muhammed-alfas",
    instagram: "https://instagram.com/muhammed_alfas",
    facebook: "https://facebook.com/muhammed.alfas",
    twitter: "https://x.com/muhammed_alfas",
    email: "muhammed.alfas.dev@gmail.com"
  },
  ctaSection: {
    title: "HAVE AN IDEA? LET'S BUILD IT.",
    body: "I’m always interested in discovering new ideas, exploring startup opportunities, collaborating on innovative projects, and turning promising concepts into real products.",
    primaryBtnText: "LET'S BUILD SOMETHING →",
    secondaryBtn1Text: "SHARE AN IDEA",
    secondaryBtn2Text: "START A COLLABORATION",
    smallLinks: [
      "Startup / Founder Collaboration",
      "Technology Projects",
      "Innovation & Ideas",
      "Open to Opportunities"
    ],
    closingStatement: "IDEAS ARE ONLY THE BEGINNING. LET'S TURN THEM INTO SOMETHING REAL."
  }
};
