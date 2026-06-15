import { Course, StudyMaterial, Notice, GalleryItem, Student } from './types';

export const initialCourses: Course[] = [
  {
    id: 'c1',
    title: 'Class 9 Computer Science',
    slug: 'class-9-computer',
    classLevel: 'Class 9',
    description: 'Foundations of Computer Science, Computer Hardware, Software, and introduction to computer logic & Office tools.',
    duration: '1 Year Academic Course',
    syllabus: [
      'Chapter 1: Basics of Computer Systems',
      'Chapter 2: Types of Hardware & Operating Systems',
      'Chapter 3: Introduction to MS Paint, Word, & Excel',
      'Chapter 4: Basic HTML Design Foundations',
      'Chapter 5: Ethics & Cyber Security'
    ],
    resourcesCount: 12,
    enrolledStudents: 124
  },
  {
    id: 'c2',
    title: 'Class 10 Computer App',
    slug: 'class-10-computer',
    classLevel: 'Class 10',
    description: 'Comprehensive study of HTML/CSS web layout, spreadsheet formulas, database introductory concepts, and scratch programming.',
    duration: '1 Year Academic Course',
    syllabus: [
      'Chapter 1: Intermediate HTML and Web Layouts',
      'Chapter 2: Introduction to Cascading Style Sheets (CSS)',
      'Chapter 3: Database Concepts & Elementary SQL',
      'Chapter 4: Programming Logic with Block Scratch',
      'Chapter 5: Digital Safety and Information Communication'
    ],
    resourcesCount: 15,
    enrolledStudents: 145
  },
  {
    id: 'c3',
    title: 'Class 11 Computer Science',
    slug: 'class-11-computer-science',
    classLevel: 'Class 11',
    description: 'Core concepts of Python, data representation, binary logic, algorithms, control flow, functions, lists, and tuples.',
    duration: '1 Year Academic Course',
    syllabus: [
      'Chapter 1: Computer Systems Architecture & Binary Logic',
      'Chapter 2: Introduction to Python Programming Basics',
      'Chapter 3: Control Flow (Conditional and Loops)',
      'Chapter 4: Modular Programming with Functions',
      'Chapter 5: Data Structures (Strings, Lists, Tuples, Dictionaries)'
    ],
    resourcesCount: 22,
    enrolledStudents: 98
  },
  {
    id: 'c4',
    title: 'Class 12 Computer Science',
    slug: 'class-12-computer-science',
    classLevel: 'Class 12',
    description: 'Advanced Python with File Handling, Data Structures, Relational Database Management Systems (RDBMS & SQL), and Networks.',
    duration: '1 Year Academic Course',
    syllabus: [
      'Chapter 1: Advanced Python and File I/O (TXT, CSV, Binary)',
      'Chapter 2: Advanced Data Structures (Stacks & Queues)',
      'Chapter 3: Computer Networks & Internet Architecture Protocols',
      'Chapter 4: Database Management Systems and SQL Queries (DDL, DML)',
      'Chapter 5: Project Work, Case Studies & Cybersecurity'
    ],
    resourcesCount: 28,
    enrolledStudents: 112
  },
  {
    id: 'c5',
    title: 'C Programming Masterclass',
    slug: 'c-programming',
    classLevel: 'Programming',
    description: 'Learn system-level programming with C. Cover variables, pointers, dynamic memory allocation, and algorithmic structures.',
    duration: '8 Weeks Intensive',
    syllabus: [
      'Week 1: Fundamentals of C, Variables, and Syntax',
      'Week 2: Conditionals, Switch, and Loop Constructs',
      'Week 3: Functions, Recursion, and Variable Scopes',
      'Week 4: Single and Multi-Dimensional Arrays',
      'Week 5: Pointers, Memory Addresses, and Memory Allocation',
      'Week 6: Structures, Unions, and Bitfields',
      'Week 7: File Operations and Debugging Tools',
      'Week 8: Capstone Data Structures Project (Linked List)'
    ],
    resourcesCount: 18,
    enrolledStudents: 180
  },
  {
    id: 'c6',
    title: 'Python Programming Essentials',
    slug: 'python-programming',
    classLevel: 'Programming',
    description: 'Go from scratch to building complete scripts, scraping websites, processing files, and working with APIs using Python.',
    duration: '10 Weeks Intensive',
    syllabus: [
      'Week 1: Python Setup, CLI, Variables, and Arithmetic',
      'Week 2: Conditional Statements and While/For Loops',
      'Week 3: Collection types (Lists, Sets, Tuples, Dicts)',
      'Week 4: Designing Custom Functions and Lambda expressions',
      'Week 5: File Handling and Regular Expressions',
      'Week 6: Object-Oriented Programming (OOP) in Python',
      'Week 7: Standard Library (math, os, sys, datetime, requests)',
      'Week 8: Connecting to SQLite/MySQL databases',
      'Week 9: Web Scraping with Beautiful Soup',
      'Week 10: Final Guided Capstone API Developer project'
    ],
    resourcesCount: 20,
    enrolledStudents: 220
  },
  {
    id: 'c7',
    title: 'Modern Web Development',
    slug: 'web-development',
    classLevel: 'Programming',
    description: 'Build premium responsive modern websites using modern HTML5, CSS3, Flexbox/Grid, and JavaScript fundamentals.',
    duration: '12 Weeks Bootcamp',
    syllabus: [
      'Week 1-3: Advanced semantic HTML5 and modern layout CSS3',
      'Week 4-5: Responsive grids, Flexbox, media queries, and Tailwind',
      'Week 6-8: JavaScript Fundamentals (DOM manipulation, events, array methods)',
      'Week 9-10: Asynchronous JavaScript (Promises, async/await, API fetching)',
      'Week 11: Deployment with netlify/GitHub, Git workflow',
      'Week 12: Final interactive client-side dashboard project'
    ],
    resourcesCount: 16,
    enrolledStudents: 290
  }
];

export const initialMaterials: StudyMaterial[] = [
  // Class 9
  {
    id: 'm1',
    title: 'Class 9 Chapter 1 Notes: Computer Systems Overview',
    classLevel: 'Class 9',
    category: 'Notes',
    fileName: 'Class9_CS_Ch1_Basics.pdf',
    fileSize: '2.4 MB',
    downloadCount: 184,
    uploadedAt: '2026-05-10',
    fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
  },
  {
    id: 'm2',
    title: 'Class 9 Assignment 1: Input & Output Devices Practical Practice',
    classLevel: 'Class 9',
    category: 'Assignments',
    fileName: 'Class9_CS_Assign1_IO.docx',
    fileSize: '720 KB',
    downloadCount: 54,
    uploadedAt: '2026-05-18',
    fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
  },
  {
    id: 'm3',
    title: 'Class 9 Keyboard & Paint Practical Lab Manual',
    classLevel: 'Class 9',
    category: 'Practicals',
    fileName: 'Class9_CS_Lab_Manual_Paint.pdf',
    fileSize: '1.8 MB',
    downloadCount: 78,
    uploadedAt: '2026-04-12',
    fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
  },
  // Class 10
  {
    id: 'm4',
    title: 'Class 10 HTML5 Semantic Elements Cheat Sheet',
    classLevel: 'Class 10',
    category: 'Notes',
    fileName: 'Class10_HTML5_CheatSheet.pdf',
    fileSize: '1.2 MB',
    downloadCount: 224,
    uploadedAt: '2026-05-02',
    fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
  },
  {
    id: 'm5',
    title: 'Class 10 CSS Flexbox & Web Form Assignment',
    classLevel: 'Class 10',
    category: 'Assignments',
    fileName: 'Class10_CSS_Flexbox_Assign.pdf',
    fileSize: '950 KB',
    downloadCount: 112,
    uploadedAt: '2026-05-15',
    fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
  },
  {
    id: 'm6',
    title: 'Class 10 Past Term Board Questions on CSS & HTML',
    classLevel: 'Class 10',
    category: 'Question Papers',
    fileName: 'Class10_HTML_CSS_PastBoardQuestions.pdf',
    fileSize: '3.1 MB',
    downloadCount: 290,
    uploadedAt: '2026-04-20',
    fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
  },
  // Class 11
  {
    id: 'm7',
    title: 'Class 11 Introduction to Python Syntax & Data Types',
    classLevel: 'Class 11',
    category: 'Notes',
    fileName: 'Class11_Python_IntroNotes.pdf',
    fileSize: '3.4 MB',
    downloadCount: 450,
    uploadedAt: '2026-03-10',
    fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
  },
  {
    id: 'm8',
    title: 'Class 11 Lab Sheet 4: Nested Loops and Patterns in Python',
    classLevel: 'Class 11',
    category: 'Practicals',
    fileName: 'Class11_LabSheet4_Loops.pdf',
    fileSize: '1.1 MB',
    downloadCount: 210,
    uploadedAt: '2026-04-05',
    fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
  },
  {
    id: 'm9',
    title: 'Class 11 Model Term-1 Question Paper, 2026 Edition',
    classLevel: 'Class 11',
    category: 'Model Questions',
    fileName: 'Class11_CS_ModelExam_Term1.pdf',
    fileSize: '2.2 MB',
    downloadCount: 180,
    uploadedAt: '2026-05-30',
    fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
  },
  // Class 12
  {
    id: 'm10',
    title: 'Class 12 Chapter 1: Advanced Python File Handling Notes',
    classLevel: 'Class 12',
    category: 'Notes',
    fileName: 'Class12_CS_FileHandling_Complete.pdf',
    fileSize: '4.2 MB',
    downloadCount: 610,
    uploadedAt: '2026-02-18',
    fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
  },
  {
    id: 'm11',
    title: 'Class 12 Networking Protocols (TCP/IP, HTTP, DNS) Interactive Notes',
    classLevel: 'Class 12',
    category: 'Notes',
    fileName: 'Class12_Networking_Guide.pdf',
    fileSize: '2.8 MB',
    downloadCount: 412,
    uploadedAt: '2026-03-24',
    fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
  },
  {
    id: 'm12',
    title: 'Class 12 Structured Query Language (SQL) Advanced Practice Set',
    classLevel: 'Class 12',
    category: 'Board Questions',
    fileName: 'Class12_SQL_Joins_BoardPrep.pdf',
    fileSize: '1.9 MB',
    downloadCount: 520,
    uploadedAt: '2026-04-28',
    fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
  },
  {
    id: 'm13',
    title: 'Class 12 Computational Complexity & Big-O Numericals Classwork',
    classLevel: 'Class 12',
    category: 'Numericals',
    fileName: 'Class12_BigO_Complexity_Solved.pdf',
    fileSize: '1.5 MB',
    downloadCount: 310,
    uploadedAt: '2026-05-12',
    fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
  },
  // Programming
  {
    id: 'm14',
    title: 'Introduction to Pointers & Dynamic Memory in C Programming',
    classLevel: 'Programming',
    category: 'Notes',
    fileName: 'C_Pointers_DynamicMemory.pdf',
    fileSize: '2.9 MB',
    downloadCount: 880,
    uploadedAt: '2026-01-15',
    fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
  },
  {
    id: 'm15',
    title: 'Python Object Oriented Class & Inheritance Lab exercises',
    classLevel: 'Programming',
    category: 'Practicals',
    fileName: 'Python_OOP_HandsOn.pdf',
    fileSize: '1.4 MB',
    downloadCount: 712,
    uploadedAt: '2026-02-10',
    fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
  }
];

export const initialNotices: Notice[] = [
  {
    id: 'n1',
    title: 'Class 12 CBSE Board Practical Exam Date Schedule Released',
    content: 'All class 12 students are instructed that Computer Science Board Practicals are scheduled from January 12, 2027 to January 18, 2027. Bring complete printed project files and final signatures logic. Standard batch breakdown will be updated tomorrow.',
    date: '2026-06-12',
    isPinned: true,
    category: 'Exam'
  },
  {
    id: 'n2',
    title: 'Python Programming Workshop - Flask Web Dev & API Design',
    content: 'We are organizing an absolute hands-on workshop on Flask Web Development and API creation this coming Saturday. Open to all Class 11 & 12 students plus programming aspirants. Seat reservation required on student dashboard.',
    date: '2026-06-14',
    isPinned: true,
    category: 'Event'
  },
  {
    id: 'n3',
    title: 'Class 10 Compulsory Web Layout Project Submission Deadline',
    content: 'Final Submission for Class 10 HTML + CSS web designs portfolio is on or before June 25, 2026. Submit files using student panel or default flash drives in Lab 2 during remedial classes. Grade points count for Board evaluations.',
    date: '2026-06-08',
    isPinned: false,
    category: 'Assignment'
  },
  {
    id: 'n4',
    title: 'National Coding Olympiad 2026 - Registrations Open!',
    content: 'Students from all classes are invited to register for the National Coding Olympiad. Selected teams will receive offline coaching workshops from Mukesh Kumar Yadav sir directly! Last day for online team entry is June 30.',
    date: '2026-06-05',
    isPinned: false,
    category: 'General'
  }
];

export const initialGallery: GalleryItem[] = [
  {
    id: 'g1',
    url: 'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?q=80&w=600&auto=format&fit=crop',
    title: 'Mukesh Sir explaining Python Algorithms during Saturday workshop',
    category: 'Workshops',
    type: 'image'
  },
  {
    id: 'g2',
    url: 'https://images.unsplash.com/photo-1548345680-f5475ea5df84?q=80&w=600&auto=format&fit=crop',
    title: 'Interactive Web Development Lab session with Class 10',
    category: 'Classroom',
    type: 'image'
  },
  {
    id: 'g3',
    url: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=600&auto=format&fit=crop',
    title: 'Code Hackathon 2026 Championship Trophy Winner Ceremony',
    category: 'Achievements',
    type: 'image'
  },
  {
    id: 'g4',
    url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=600&auto=format&fit=crop',
    title: 'Group Photo: Computer Science Club Batch 2026 Orientation',
    category: 'Activities',
    type: 'image'
  },
  {
    id: 'g5',
    url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop',
    title: 'Students designing digital logic circuits with breadboards',
    category: 'Activities',
    type: 'image'
  },
  {
    id: 'g6',
    url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600&auto=format&fit=crop',
    title: 'Weekly revision seminar on Data Structures & C pointers',
    category: 'Workshops',
    type: 'image'
  }
];

export const initialStudents: Student[] = [
  {
    id: 's1',
    name: 'Aman Sharma',
    email: 'aman.sharma@example.com',
    username: 'student1',
    role: 'student',
    classLevel: 'Class 12',
    rollNumber: '12-CS-4512',
    attendance: 92,
    examResults: [
      { subject: 'Computer Science (Theory)', marksObtained: 68, totalMarks: 70, grade: 'A+' },
      { subject: 'Computer Science (Practical)', marksObtained: 30, totalMarks: 30, grade: 'A+' },
      { subject: 'Term 1 Test', marksObtained: 94, totalMarks: 100, grade: 'A+' }
    ],
    assignmentsTrack: [
      { id: 'a1', title: 'Python File Handling Practical Output', status: 'Graded', dueDate: '2026-06-10', score: '10/10' },
      { id: 'a2', title: 'SQL Joins & Table Schema Design', status: 'Submitted', dueDate: '2026-06-20' },
      { id: 'a3', title: 'TCP/IP Protocol Stack Diagram', status: 'Pending', dueDate: '2026-06-25' }
    ]
  },
  {
    id: 's2',
    name: 'Priyanka Patel',
    email: 'priyanka@example.com',
    username: 'student2',
    role: 'student',
    classLevel: 'Class 10',
    rollNumber: '10-CS-3918',
    attendance: 88,
    examResults: [
      { subject: 'Computer Applications', marksObtained: 85, totalMarks: 100, grade: 'A' },
      { subject: 'Half-Yearly Test', marksObtained: 90, totalMarks: 100, grade: 'A+' }
    ],
    assignmentsTrack: [
      { id: 'a4', title: 'HTML Layout with flexbox layout', status: 'Graded', dueDate: '2026-06-02', score: '9/10' },
      { id: 'a5', title: 'CSS Animations and Navigation Menu', status: 'Pending', dueDate: '2026-06-18' }
    ]
  }
];
