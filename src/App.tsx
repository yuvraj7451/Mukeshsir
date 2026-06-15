import React, { useState, useEffect } from 'react';
import { 
  Sparkles, Code, GraduationCap, BookOpen, Bell, Image as ImageIcon, Phone, User, 
  MapPin, Mail, MessageCircle, ArrowUp, Send, CheckCircle2, AlertCircle, Plus, Trash, 
  Edit, Trash2, Shield, Search, Filter, Book, FileText, Calendar, Award, CheckCircle, 
  Percent, ArrowUpRight, HelpCircle, LogOut, TrendingUp, Download, Eye, LayoutDashboard, UserX, UserPlus, FileUp, Info, X
} from 'lucide-react';

import { Course, StudyMaterial, Notice, GalleryItem, Student } from './types';
import { initialCourses, initialMaterials, initialNotices, initialGallery, initialStudents } from './data';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AIChat from './components/AIChat';
import PDFViewerModal from './components/PDFViewerModal';
import CourseModal from './components/CourseModal';
import AdminPanel from './components/AdminPanel';

export default function App() {
  // Page states
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  // Database Memory States (persisted via localStorage)
  const [courses, setCourses] = useState<Course[]>(() => {
    const saved = localStorage.getItem('academy_courses');
    return saved ? JSON.parse(saved) : initialCourses;
  });

  const [materials, setMaterials] = useState<StudyMaterial[]>(() => {
    const saved = localStorage.getItem('academy_materials');
    return saved ? JSON.parse(saved) : initialMaterials;
  });

  const [notices, setNotices] = useState<Notice[]>(() => {
    const saved = localStorage.getItem('academy_notices');
    return saved ? JSON.parse(saved) : initialNotices;
  });

  const [gallery, setGallery] = useState<GalleryItem[]>(() => {
    const saved = localStorage.getItem('academy_gallery');
    return saved ? JSON.parse(saved) : initialGallery;
  });

  const [students, setStudents] = useState<Student[]>(() => {
    const saved = localStorage.getItem('academy_students');
    return saved ? JSON.parse(saved) : initialStudents;
  });

  // Global visitor stats counter for analytics representation
  const [websiteVisitors, setWebsiteVisitors] = useState<number>(() => {
    const saved = localStorage.getItem('academy_visitors');
    const count = saved ? parseInt(saved) : 8420;
    return count;
  });

  // Track state persistence
  useEffect(() => {
    localStorage.setItem('academy_courses', JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem('academy_materials', JSON.stringify(materials));
  }, [materials]);

  useEffect(() => {
    localStorage.setItem('academy_notices', JSON.stringify(notices));
  }, [notices]);

  useEffect(() => {
    localStorage.setItem('academy_gallery', JSON.stringify(gallery));
  }, [gallery]);

  useEffect(() => {
    localStorage.setItem('academy_students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    // Basic increment on page mount
    const nextVal = websiteVisitors + 1;
    setWebsiteVisitors(nextVal);
    localStorage.setItem('academy_visitors', nextVal.toString());
  }, []);

  // Authentication states
  // Preset admin: user 'admin' pass 'admin'
  // Preset students: user 'student1' / 'student2', pass 'student'
  const [loggedInUser, setLoggedInUser] = useState<{ role: 'student' | 'admin'; data: any } | null>(() => {
    const saved = localStorage.getItem('academy_logged_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Handlers
  const handleLogout = () => {
    setLoggedInUser(null);
    localStorage.removeItem('academy_logged_user');
    setCurrentPage('home');
  };

  const saveLoginSession = (role: 'student' | 'admin', data: any) => {
    const session = { role, data };
    setLoggedInUser(session);
    localStorage.setItem('academy_logged_user', JSON.stringify(session));
  };

  // Interaction Modal States
  const [selectedPDF, setSelectedPDF] = useState<StudyMaterial | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [activeGalleryType, setActiveGalleryType] = useState<string>('All');
  const [lightboxImage, setLightboxImage] = useState<GalleryItem | null>(null);

  // Success Feedbacks Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // PDF Download Incrementer
  const incrementDownload = (id: string) => {
    setMaterials((prev) =>
      prev.map((mat) => {
        if (mat.id === id) {
          showToast(`Successfully downloaded: ${mat.fileName}`);
          return { ...mat, downloadCount: mat.downloadCount + 1 };
        }
        return mat;
      })
    );
  };

  // Enroll handler from CourseModal
  const handleEnroll = (courseTitle: string, studentName: string, classLevel: string) => {
    // Generate new mock student if not logged in
    const randomRoll = Math.floor(Math.random() * 9000) + 1000;
    const newStud: Student = {
      id: 'student_' + Math.random().toString(36).substring(2, 9),
      name: studentName,
      email: `${studentName.toLowerCase().replace(/\s+/g, '')}@example.com`,
      username: `student_${randomRoll}`,
      role: 'student',
      classLevel: classLevel as any,
      rollNumber: `${classLevel === 'Class 12' ? '12' : '11'}-CS-${randomRoll}`,
      attendance: 94,
      examResults: [
        { subject: courseTitle, marksObtained: 85, totalMarks: 100, grade: 'A' }
      ],
      assignmentsTrack: [
        { id: 'assign_init', title: `${courseTitle} Kickoff Assignment`, status: 'Submitted', dueDate: '2026-06-30' }
      ]
    };

    setStudents(prev => [...prev, newStud]);
    
    // Automatically update enrollment metric in course list
    setCourses(prev =>
      prev.map(c => {
        if (c.title === courseTitle) {
          return { ...c, enrolledStudents: c.enrolledStudents + 1 };
        }
        return c;
      })
    );

    // Save as current session
    saveLoginSession('student', newStud);
    showToast(`Successfully enrolled in ${courseTitle}! Welcome aboard!`);
  };

  // Back to top button
  const [showScrollTop, setShowScrollTop] = useState(false);
  useEffect(() => {
    const checkScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Search and Filter states for Study Materials
  const [materialSearch, setMaterialSearch] = useState('');
  const [materialClassFilter, setMaterialClassFilter] = useState('All');
  const [materialCategoryFilter, setMaterialCategoryFilter] = useState('All');

  const filteredMaterials = materials.filter((m) => {
    const matchesSearch = m.title.toLowerCase().includes(materialSearch.toLowerCase()) || 
                          m.fileName.toLowerCase().includes(materialSearch.toLowerCase());
    const matchesClass = materialClassFilter === 'All' || m.classLevel === materialClassFilter;
    const matchesCat = materialCategoryFilter === 'All' || m.category === materialCategoryFilter;
    return matchesSearch && matchesClass && matchesCat;
  });

  // Calculate sum of downloads for stats representation
  const absoluteDownloadsCount = materials.reduce((sum, item) => sum + item.downloadCount, 0);

  // Custom Testimonials array
  const testimonials = [
    {
      name: "Rohan Shrestha",
      role: "Class 12 Computer Science Student",
      text: "Mukesh Sir makes complicated memory structures look like a piece of cake. His dry-runs for pointer addresses on the blackboard solved all my board exam anxiety!",
      avatarBg: "bg-blue-500"
    },
    {
      name: "Sujata Koirala",
      role: "Class 10 Web Development Student",
      text: "The web bootcamp was incredible! I created standard CSS grids and simple layouts from scratch. Sir reviews each portfolio code personally to fix styling errors.",
      avatarBg: "bg-amber-500"
    },
    {
      name: "Abhishek Roy",
      role: "AI Study Club Participant",
      text: "Mukesh Yadav sir's notes on advanced Python and MySQL joins are so well summarized. I didn't need any additional textbook references to secure an A+ grade.",
      avatarBg: "bg-emerald-500"
    }
  ];
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);

  // Forms states
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginRole, setLoginRole] = useState<'student' | 'admin'>('student');
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regUsername, setRegUsername] = useState('');
  const [regClass, setRegClass] = useState<'Class 9' | 'Class 10' | 'Class 11' | 'Class 12'>('Class 12');
  const [regRoll, setRegRoll] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  // Reset password state simulated
  const [resetUsername, setResetUsername] = useState('');
  const [showResetBlock, setShowResetBlock] = useState(false);

  // Admin section input states
  // 1. Notice Creator State
  const [newNoticeTitle, setNewNoticeTitle] = useState('');
  const [newNoticeContent, setNewNoticeContent] = useState('');
  const [newNoticeCategory, setNewNoticeCategory] = useState<'General' | 'Exam' | 'Assignment' | 'Event'>('General');
  const [newNoticePinned, setNewNoticePinned] = useState(false);

  // 2. Material Upload States
  const [newMatTitle, setNewMatTitle] = useState('');
  const [newMatClass, setNewMatClass] = useState<'Class 9' | 'Class 10' | 'Class 11' | 'Class 12' | 'Programming'>('Class 12');
  const [newMatCategory, setNewMatCategory] = useState<any>('Notes');
  const [newMatFileName, setNewMatFileName] = useState('');
  const [newMatSize, setNewMatSize] = useState('1.5 MB');

  // 3. Gallery states
  const [newGalTitle, setNewGalTitle] = useState('');
  const [newGalCategory, setNewGalCategory] = useState<'Workshops' | 'Classroom' | 'Achievements' | 'Activities'>('Workshops');
  const [newGalUrl, setNewGalUrl] = useState('');

  // 4. Student Management grades editing
  const [editingStudentId, setEditingStudentId] = useState<string | null>(null);
  const [editedGrade, setEditedGrade] = useState('');

  // 5. Course management
  const [newCourseTitle, setNewCourseTitle] = useState('');
  const [newCourseDesc, setNewCourseDesc] = useState('');
  const [newCourseDuration, setNewCourseDuration] = useState('1 Year academic');
  const [newCourseClass, setNewCourseClass] = useState('Class 11');

  // Contact form submission state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactMsg, setContactMsg] = useState('');
  const [contactSuccess, setContactSuccess] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSuccess(true);
    showToast("Thank you for your message! Mukesh Sir will reply directly.");
    setContactName('');
    setContactEmail('');
    setContactPhone('');
    setContactMsg('');
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginRole === 'admin') {
      if (loginUsername.toLowerCase() === 'admin' && loginPassword === 'admin') {
        saveLoginSession('admin', { name: "Mukesh Kumar Yadav", username: "admin" });
        setCurrentPage('admin');
        showToast("Admin access authenticated. Welcome back, Sir!");
      } else {
        showToast("Invalid Admin Name or Security Password parameters.");
      }
    } else {
      // Find matching student
      const match = students.find(s => s.username === loginUsername);
      if (match) {
        saveLoginSession('student', match);
        setCurrentPage('login'); // loads student dashboard panel
        showToast(`Welcome back, ${match.name}!`);
      } else {
        // Try to match student preset placeholder
        if (loginUsername === 'student1' || loginUsername === 'student2') {
          const matchPreset = students.find(s => s.username === loginUsername);
          if (matchPreset) {
            saveLoginSession('student', matchPreset);
            setCurrentPage('login');
            showToast(`Welcome back, ${matchPreset.name}!`);
            return;
          }
        }
        showToast("Student profile not found. Please register or check preset guide!");
      }
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName || !regUsername) {
      showToast("Please provide legal name and custom username");
      return;
    }

    // Check duplicate
    if (students.some(s => s.username === regUsername)) {
      showToast("Username already registered!");
      return;
    }

    const randomRoll = Math.floor(Math.random() * 800) + 100;
    const newStud: Student = {
      id: 'stud_' + Date.now(),
      name: regName,
      email: regEmail || `${regUsername}@academy.com`,
      username: regUsername,
      role: 'student',
      classLevel: regClass,
      rollNumber: `CS-${regClass.replace('Class ', '')}-${randomRoll}`,
      attendance: 100,
      examResults: [
        { subject: "Introductory Theory & Code", marksObtained: 0, totalMarks: 100, grade: "Pending" }
      ],
      assignmentsTrack: [
        { id: 'a_init', title: "Welcome Assessment Sheet", status: "Pending", dueDate: "2026-06-30" }
      ]
    };

    setStudents(prev => [...prev, newStud]);
    saveLoginSession('student', newStud);
    setIsRegistering(false);
    setCurrentPage('login'); // directly view dashboard
    showToast(`Registration completed, ${regName}! Welcome to the class!`);
  };

  // Admin Management Handlers
  const handleAddNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoticeTitle || !newNoticeContent) {
      showToast("Please fill in notice title & key announcements.");
      return;
    }
    const newAnn: Notice = {
      id: 'notice_' + Date.now(),
      title: newNoticeTitle,
      content: newNoticeContent,
      date: new Date().toISOString().split('T')[0],
      isPinned: newNoticePinned,
      category: newNoticeCategory
    };

    setNotices(prev => [newAnn, ...prev]);
    setNewNoticeTitle('');
    setNewNoticeContent('');
    setNewNoticePinned(false);
    showToast("Notice published live successfully!");
  };

  const handleDeleteNotice = (id: string) => {
    setNotices(prev => prev.filter(n => n.id !== id));
    showToast("Notice deleted.");
  };

  const togglePinNotice = (id: string) => {
    setNotices(prev => prev.map(n => n.id === id ? { ...n, isPinned: !n.isPinned } : n));
    showToast("Notice pin status updated.");
  };

  const handleUploadMaterial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMatTitle || !newMatFileName) {
      showToast("Material Title and File parameters are strictly required.");
      return;
    }

    const newObj: StudyMaterial = {
      id: 'mat_' + Date.now(),
      title: newMatTitle,
      classLevel: newMatClass,
      category: newMatCategory,
      fileName: newMatFileName.endsWith('.pdf') || newMatFileName.endsWith('.docx') ? newMatFileName : `${newMatFileName}.pdf`,
      fileSize: newMatSize || '2.0 MB',
      downloadCount: 0,
      uploadedAt: new Date().toISOString().split('T')[0],
      fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
    };

    setMaterials(prev => [newObj, ...prev]);
    setNewMatTitle('');
    setNewMatFileName('');
    showToast("Material package uploaded to curriculum database!");
  };

  const handleDeleteMaterial = (id: string) => {
    setMaterials(prev => prev.filter(m => m.id !== id));
    showToast("Curriculum file deleted.");
  };

  const handleAddGallery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGalTitle || !newGalUrl) {
      showToast("Title and accurate image link are required.");
      return;
    }

    const newItem: GalleryItem = {
      id: 'gal_' + Date.now(),
      url: newGalUrl,
      title: newGalTitle,
      category: newGalCategory,
      type: 'image'
    };

    setGallery(prev => [newItem, ...prev]);
    setNewGalTitle('');
    setNewGalUrl('');
    showToast("Gallery event photo published!");
  };

  const handleDeleteGallery = (id: string) => {
    setGallery(prev => prev.filter(g => g.id !== id));
    showToast("Gallery item removed.");
  };

  const handleUpdateStudentGrade = (studentId: string, subjectName: string) => {
    if (!editedGrade.trim()) return;
    setStudents(prev =>
      prev.map(s => {
        if (s.id === studentId) {
          const updatedResults = s.examResults.map(res => {
            if (res.subject === subjectName || s.examResults.length === 1) {
              return { ...res, grade: editedGrade, marksObtained: parseInt(editedGrade) || 80 };
            }
            return res;
          });
          return { ...s, examResults: updatedResults };
        }
        return s;
      })
    );
    setEditingStudentId(null);
    setEditedGrade('');
    showToast("Grade score updated in local state!");
  };

  const handleAddCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCourseTitle || !newCourseDesc) {
      showToast("Please provide Course Title & Description.");
      return;
    }

    const newC: Course = {
      id: 'course_' + Date.now(),
      title: newCourseTitle,
      slug: newCourseTitle.toLowerCase().replace(/\s+/g, '-'),
      classLevel: newCourseClass,
      description: newCourseDesc,
      duration: newCourseDuration || '1 Year',
      syllabus: [
        'Chapter 1: Dynamic logic overview',
        'Chapter 2: Algorithms complexity evaluation',
        'Chapter 3: Interactive projects walkthrough'
      ],
      resourcesCount: 5,
      enrolledStudents: 10
    };

    setCourses(prev => [...prev, newC]);
    setNewCourseTitle('');
    setNewCourseDesc('');
    showToast("New academy Course curriculum registered!");
  };

  const handleDeleteCourse = (id: string) => {
    setCourses(prev => prev.filter(c => c.id !== id));
    showToast("Course removed.");
  };

  // Helper arrays for filtering
  const classesList = ['All', 'Class 9', 'Class 10', 'Class 11', 'Class 12', 'Programming'];
  const categoriesList = ['All', 'Notes', 'Assignments', 'Practicals', 'Question Papers', 'Model Questions', 'Board Questions', 'Numericals'];

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 relative ${
      isDarkMode ? 'bg-[#051124] text-white' : 'bg-slate-50 text-slate-900'
    }`}>
      {/* Visual background lights for Modern aesthetics */}
      <div className="absolute top-[-100px] right-[-100px] w-[35rem] h-[35rem] bg-[#D4AF37]/5 opacity-60 blur-[130px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[20%] left-[-150px] w-[30rem] h-[30rem] bg-indigo-500/5 opacity-50 blur-[120px] rounded-full pointer-events-none"></div>

      {/* Dynamic Toast Feedback overlay */}
      {toastMessage && (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 bg-brand-gold border border-amber-600 text-slate-950 font-bold px-6 py-3.5 rounded-full shadow-2xl flex items-center gap-2 text-xs uppercase font-mono animate-bounce tracking-wide shrink-0">
          <Sparkles className="w-4 h-4 text-slate-950 animate-spin" />
          {toastMessage}
        </div>
      )}

      {/* Simple Ticker Notice Banner at the very top of whole application */}
      <div className="bg-gradient-to-r from-red-600 via-amber-600 to-red-600 text-white font-mono text-[11px] font-bold py-2 px-4 flex items-center justify-between border-b border-white/10 z-50 relative overflow-hidden">
        <div className="flex items-center gap-2 shrink-0">
          <span className="bg-white text-red-600 px-2 py-0.5 rounded font-bold uppercase tracking-widest text-[9px] animate-pulse">FLASH NEWS</span>
          <span className="hidden sm:inline">|</span>
        </div>
        <div className="w-full mx-6 overflow-hidden relative h-4">
          <p className="animate-pulse flex gap-6 whitespace-nowrap absolute">
            <span>&bull; Class 12 Practical Preps scheduled – submit project logs latest by Sunday!</span>
            <span>&bull; C Masterclass syntax modules unlocked.</span>
            <span>&bull; Registered users can debug code snippets live using Mukesh Sir's Doubt Solver AI Sidebar!</span>
          </p>
        </div>
        <button 
          onClick={() => setCurrentPage('notices')} 
          className="underline font-sans text-[10px] shrink-0 font-extrabold uppercase hover:text-amber-200"
        >
          View Notice Board &rarr;
        </button>
      </div>

      {/* Styled Navbar */}
      <Navbar 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        isDarkMode={isDarkMode} 
        setIsDarkMode={setIsDarkMode}
        loggedInUser={loggedInUser}
        handleLogout={handleLogout}
      />

      {/* SUB-PAGES ROUTING VIEWPORTS */}
      <div className="relative pb-16">

        {/***********************************************
         * 1. HOME SCREEN VIEW
         ***********************************************/}
        {currentPage === 'home' && (
          <div className="animate-fadeIn">
            {/* Main Interactive Hero Columns */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center" id="hero-block">
              {/* Left Column: Core pitch */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-white/5 border border-white/10 text-brand-gold text-xs font-bold tracking-widest uppercase font-mono shadow-inner">
                  <Sparkles className="w-3.5 h-3.5 text-brand-gold animate-bounce" />
                  Educator Portfolio of Mukesh Kumar Yadav
                </div>
                
                <h1 className="text-4xl sm:text-6xl font-black font-display tracking-tight leading-tight">
                  Learning Coding <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold via-amber-400 to-yellow-600">
                    Made Simple.
                  </span>
                </h1>

                <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-xl font-sans">
                  "Helping students master technology, programming, database structuring and complex computational problem-solving through a structured CBSE-aligned academic approach."
                </p>

                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    onClick={() => setCurrentPage('courses')}
                    className="px-6 py-3.5 bg-brand-gold text-slate-950 font-black rounded-xl shadow-lg hover:shadow-brand-gold/20 flex items-center justify-center gap-2 text-xs tracking-wider uppercase transition-all duration-300 hover:scale-103"
                    id="hero-cta-courses"
                  >
                    View Courses
                    <GraduationCap className="w-4 h-4 text-slate-950" />
                  </button>
                  <button
                    onClick={() => setCurrentPage('materials')}
                    className="px-6 py-3.5 bg-white/5 border border-white/10 hover:border-brand-gold/30 rounded-xl font-bold flex items-center justify-center gap-2 text-xs uppercase tracking-wider text-white transition-colors"
                    id="hero-cta-notes"
                  >
                    Download Notes
                    <BookOpen className="w-4 h-4 text-brand-gold" />
                  </button>
                  <button
                    onClick={() => setCurrentPage('contact')}
                    className="px-6 py-3.5 bg-slate-900 border border-indigo-900/40 text-blue-400 hover:text-white rounded-xl text-xs uppercase tracking-wider hover:bg-brand-blue/30 transition-colors shrink-0"
                    id="hero-cta-contact"
                  >
                    Contact Me
                  </button>
                </div>

                {/* Animated Statistics blocks */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-8" id="stats-grid">
                  {[
                    { value: "10+ Years", label: "Educator Experience" },
                    { value: "500+", label: "Students Taught" },
                    { value: `${materials.length * 10}+`, label: "Study Materials" },
                    { value: "95%+", label: "Student Success Rate" },
                  ].map((stat, idx) => (
                    <div 
                      key={idx} 
                      className={`p-4 rounded-xl border transition-all ${
                        isDarkMode ? 'bg-white/5 border-white/10 hover:border-brand-gold/20' : 'bg-white border-slate-200'
                      }`}
                    >
                      <div className="text-xl sm:text-2xl font-black text-brand-gold tracking-tight">{stat.value}</div>
                      <div className="text-[9px] sm:text-[10px] text-slate-400 uppercase tracking-widest font-mono mt-1 leading-normal font-bold">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Hero interactive pane */}
              <div className="lg:col-span-5 space-y-6">
                {/* Embedded Glassmorphic Notice board preview */}
                <div className="p-6 bg-gradient-to-br from-[#0c1f36] to-slate-950 border border-white/10 rounded-[2rem] shadow-2xl space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display font-medium flex items-center gap-2 text-sm sm:text-base text-white">
                      <span className="w-2.5 h-2.5 bg-red-650 rounded-full animate-ping"></span>
                      Notice Board Snippet
                    </h3>
                    <button 
                      onClick={() => setCurrentPage('notices')} 
                      className="text-xs text-brand-gold font-bold tracking-tight uppercase hover:underline"
                    >
                      VIEW ALL &rarr;
                    </button>
                  </div>

                  <div className="space-y-2.5">
                    {notices.slice(0, 3).map((n) => (
                      <div 
                        key={n.id} 
                        className="p-3 bg-white/5 rounded-xl border-l-4 border-brand-gold hover:bg-white/10 transition-colors"
                      >
                        <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                          <span>{n.date}</span>
                          <span className="text-[9px] uppercase font-bold text-brand-gold">{n.category}</span>
                        </div>
                        <h4 className="text-xs font-semibold text-white mt-1 line-clamp-1">{n.title}</h4>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Popular syllabus pathways preview cards */}
                <div className="grid grid-cols-2 gap-4">
                  <div 
                    onClick={() => setCurrentPage('courses')}
                    className="p-4 bg-white/5 hover:bg-brand-gold/10 border border-white/10 hover:border-brand-gold/30 rounded-2xl cursor-pointer transition-all duration-300"
                  >
                    <div className="w-9 h-9 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center mb-3">
                      <Code className="w-5 h-5 text-brand-gold" />
                    </div>
                    <span className="text-[9px] uppercase font-mono font-bold text-slate-400 block">Class 12</span>
                    <h4 className="text-xs font-bold text-white mt-0.5">Advanced Python</h4>
                  </div>

                  <div 
                    onClick={() => setCurrentPage('courses')}
                    className="p-4 bg-white/5 hover:bg-brand-gold/10 border border-white/10 hover:border-brand-gold/30 rounded-2xl cursor-pointer transition-all duration-300"
                  >
                    <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-3">
                      <TrendingUp className="w-5 h-5 text-brand-gold" />
                    </div>
                    <span className="text-[9px] uppercase font-mono font-bold text-slate-400 block">System Prep</span>
                    <h4 className="text-xs font-bold text-white mt-0.5">C & Data Structures</h4>
                  </div>
                </div>

                {/* Micro Tease widget to open Chat widget */}
                <div 
                  onClick={() => {
                    const el = document.getElementById('ai-floating-trigger');
                    if (el) el.click();
                  }}
                  className="p-4 bg-brand-gold/10 border border-brand-gold/30 rounded-xl flex items-center justify-between cursor-pointer hover:bg-brand-gold/20 transition-all shadow"
                >
                  <div className="flex items-center gap-2 text-xs">
                    <div className="w-7 h-7 rounded-full bg-brand-gold text-slate-950 flex items-center justify-center font-bold">
                      AI
                    </div>
                    <span className="font-semibold text-brand-gold">Have an assignment doubt?</span>
                  </div>
                  <span className="text-[10px] font-mono tracking-wider font-extrabold text-brand-gold flex items-center gap-1">
                    ASK SIR'S AI <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>

            {/* Popular Class curriculum block */}
            <div className="py-16 bg-slate-950/40 border-y border-white/5">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center space-y-2 mb-10">
                  <span className="text-xs uppercase font-mono tracking-widest text-[#D4AF37] font-bold block">Academic Portals</span>
                  <h2 className="text-2xl sm:text-3xl font-black font-display text-white">Popular Education Batches</h2>
                  <p className="text-xs text-slate-400 max-w-md mx-auto">Explore structured classroom chapters aligned perfectly to board guidelines and computer certificates.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="popular-curriculum">
                  {courses.slice(1, 4).map((c) => (
                    <div 
                      key={c.id}
                      className="bg-[#051124] border border-white/10 rounded-2xl p-6 relative group hover:border-[#D4AF37]/40 transition-colors"
                    >
                      <span className="text-[9px] font-mono uppercase bg-brand-gold/10 border border-brand-gold/20 text-brand-gold px-2 py-0.5 rounded font-black absolute top-5 right-5">
                        {c.classLevel}
                      </span>
                      <h3 className="text-base font-bold text-white mt-1">{c.title}</h3>
                      <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">{c.description}</p>
                      
                      <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-300">
                        <span className="font-mono text-[11px]">{c.duration}</span>
                        <button 
                          onClick={() => {
                            setSelectedCourse(c);
                          }}
                          className="text-brand-gold font-bold flex items-center gap-1 hover:underline"
                        >
                          Explore Syllabus &rarr;
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Testimonials section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <div className="bg-gradient-to-r from-brand-blue to-slate-950 rounded-3xl border border-white/10 p-8 sm:p-12 relative overflow-hidden">
                <div className="max-w-xl relative z-10 space-y-4">
                  <span className="text-xs font-mono uppercase text-brand-gold tracking-widest font-black block">STUDENT SUCCESS</span>
                  <h2 className="text-2xl sm:text-3xl font-black font-display text-white">What code learners are saying:</h2>
                  
                  <div className="space-y-4 font-sans text-slate-300 text-sm leading-relaxed pt-2">
                    <p className="italic">
                      "{testimonials[activeTestimonialIdx].text}"
                    </p>
                    <div>
                      <h4 className="font-black text-white font-display text-base tracking-tight">{testimonials[activeTestimonialIdx].name}</h4>
                      <p className="text-xs text-brand-gold font-mono uppercase tracking-wider">{testimonials[activeTestimonialIdx].role}</p>
                    </div>
                  </div>

                  {/* Nav dot metrics */}
                  <div className="flex gap-2 pt-4">
                    {testimonials.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveTestimonialIdx(idx)}
                        className={`w-2.5 h-2.5 rounded-full transition-all ${
                          idx === activeTestimonialIdx ? 'bg-brand-gold w-6' : 'bg-slate-700 hover:bg-slate-500'
                        }`}
                        aria-label={`Testimonial page ${idx}`}
                      ></button>
                    ))}
                  </div>
                </div>

                {/* Abstract graphic stamp backing */}
                <div className="absolute right-0 bottom-0 opacity-10 font-mono text-[110px] font-bold text-brand-gold select-none pointer-events-none pr-12 translate-y-6 hidden lg:block">
                  CS CODE
                </div>
              </div>
            </div>

          </div>
        )}


        {/***********************************************
         * 2. ABOUT SCREEN VIEW
         ***********************************************/}
        {currentPage === 'about' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 animate-fadeIn">
            <div className="text-center space-y-2">
              <span className="text-xs uppercase font-mono tracking-widest text-[#D4AF37] font-bold block">Biographical Profile</span>
              <h1 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight">Mukesh Kumar Yadav</h1>
              <p className="text-xs text-slate-400 max-w-md mx-auto">Computer Science Teacher, Algorithm Mentor, and web technology developer.</p>
            </div>

            {/* Bio Columns */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Graphic left sidebar */}
              <div className="lg:col-span-4 bg-slate-950/60 p-6 rounded-2xl border border-white/10 space-y-6 text-center">
                {/* Simulated portrait avatar placeholder with gold border */}
                <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-brand-blue to-brand-gold mx-auto p-1 flex items-center justify-center text-4xl font-extrabold text-slate-950">
                  MKY
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-white">Mukesh K. Yadav</h3>
                  <p className="text-xs text-brand-gold font-semibold uppercase font-mono">Senior Computer Science Faculty</p>
                </div>

                <div className="border-t border-white/5 pt-4 space-y-2.5 text-xs text-slate-300 text-left">
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-mono">Affiliation:</span>
                    <span className="font-bold">CS Academy Hub</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-mono">Specialization:</span>
                    <span className="font-bold">Systems C & python modules</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-mono">Office Hours:</span>
                    <span className="font-bold">Monday - Friday</span>
                  </div>
                </div>

                <button 
                  onClick={() => setCurrentPage('contact')} 
                  className="w-full bg-brand-gold hover:bg-amber-500 text-slate-950 font-black p-3.5 rounded-xl text-xs uppercase tracking-wider"
                >
                  Contact Classroom Office
                </button>
              </div>

              {/* Core Timeline and Progress blocks */}
              <div className="lg:col-span-8 space-y-8">
                {/* Biography card */}
                <div className="bg-white/5 p-6 rounded-2xl border border-white/10 space-y-4">
                  <h3 className="text-lg font-bold font-display text-white border-b border-white/5 pb-2">Professional Biography</h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    With over a decade of continuous pedagogical experience, Mukesh Kumar Yadav sir has been key in structuring secondary board curriculums in Information Communication and Computer Science. He is dedicated to transforming complex logic sequences (such as arrays sorting, pointer arithmetic, binary search dry-runs) into visual, step-by-step logic maps.
                  </p>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Under his academic supervision, hundreds of Class 9, 10, 11, and 12 pupils successfully achieved A+ scores. He organizes rigorous weekend programming bootcamps in Python scripting and custom responsive HTML/CSS designs ensuring absolute career readiness.
                  </p>
                </div>

                {/* Progress skills dashboard */}
                <div className="bg-white/5 p-6 rounded-2xl border border-white/10 space-y-4" id="skills-progress">
                  <h3 className="text-lg font-bold font-display text-white border-b border-white/5 pb-2">Key Skills Index Level</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { skill: "Python & Loop Invariants", val: "98%" },
                      { skill: "C Programming & Pointer Offsets", val: "94%" },
                      { skill: "Relational DBs (MySQL & SQL)", val: "92%" },
                      { skill: "Web Tech (HTML5, CSS3, & JS)", val: "96%" },
                      { skill: "Boolean Logic & Logic Circuit Maps", val: "95%" },
                      { skill: "CBSE & Term evaluation Prep coaching", val: "99%" },
                    ].map((item, idx) => (
                      <div key={idx} className="space-y-1.5">
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-bold text-slate-200">{item.skill}</span>
                          <span className="font-mono text-brand-gold">{item.val}</span>
                        </div>
                        <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden border border-white/5">
                          <div 
                            className="bg-gradient-to-r from-brand-gold to-yellow-500 h-full transition-all duration-1000"
                            style={{ width: item.val }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* timelines qualification */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* academic timeline */}
                  <div className="bg-white/5 p-6 rounded-2xl border border-white/10 space-y-4">
                    <h3 className="text-sm font-bold font-mono text-[#D4AF37] uppercase tracking-wider">Qualifications Timeline</h3>
                    <div className="space-y-4 border-l border-white/10 pl-4 relative text-xs">
                      <div>
                        <span className="font-mono text-brand-gold font-bold">2016 - 2018</span>
                        <h4 className="font-bold text-white mt-1">Master of Science in Computer Sci (M.Sc. CS)</h4>
                        <p className="text-slate-400 mt-0.5 font-mono">First Class distinction - Advanced Algorithms specialization.</p>
                      </div>
                      <div>
                        <span className="font-mono text-brand-gold font-bold">2012 - 2016</span>
                        <h4 className="font-bold text-white mt-1">Bachelor in Computer Applications (BCA)</h4>
                        <p className="text-slate-400 mt-0.5">Systems automation engineering degree with coding honors.</p>
                      </div>
                    </div>
                  </div>

                  {/* certifications list */}
                  <div className="bg-white/5 p-6 rounded-2xl border border-white/10 space-y-4">
                    <h3 className="text-sm font-bold font-mono text-[#D4AF37] uppercase tracking-wider">Certifications & Vision</h3>
                    <div className="space-y-3 text-xs leading-relaxed">
                      <div className="flex gap-2 items-start text-slate-300">
                        <span className="text-brand-gold font-mono font-bold shrink-0">[✓]</span>
                        <span>Oracle Certified Professional Java EE platform developer.</span>
                      </div>
                      <div className="flex gap-2 items-start text-slate-300">
                        <span className="text-brand-gold font-mono font-bold shrink-0">[✓]</span>
                        <span>Advanced Python Educator & Data Science structures certificate.</span>
                      </div>
                      <div className="p-3 bg-brand-gold/5 border border-brand-gold/10 rounded-lg">
                        <h4 className="font-bold text-brand-gold font-display text-xs">OUR MISSION:</h4>
                        <p className="text-[11px] text-slate-400 mt-1 leading-normal">
                          Empowering student minds with pure problem-identification capability on computers so that logic creation becomes natural and lifelong.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}


        {/***********************************************
         * 3. COURSES SCREEN VIEW
         ***********************************************/}
        {currentPage === 'courses' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 animate-fadeIn">
            <div className="text-center space-y-2">
              <span className="text-xs uppercase font-mono tracking-widest text-[#D4AF37] font-bold block">Academic Syllabus Pathways</span>
              <h1 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight">All Courses & Bootcamps</h1>
              <p className="text-xs text-slate-400 max-w-md mx-auto">Explore structured classroom materials. Each module comes with downloadable PDFs, boards, and questions.</p>
            </div>

            {/* Courses grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="courses-grid-view">
              {courses.map((c) => (
                <div 
                  key={c.id} 
                  className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden flex flex-col justify-between group hover:border-[#D4AF37]/40 transition-colors"
                >
                  <div className="p-6 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="bg-brand-gold/10 text-brand-gold border border-brand-gold/30 px-3 py-1 rounded-full text-[10px] font-mono uppercase font-bold">
                        {c.classLevel}
                      </span>
                      <span className="text-slate-500 text-[11px] font-mono">{c.duration}</span>
                    </div>

                    <h3 className="font-display font-black text-white text-base leading-tight">
                      {c.title}
                    </h3>

                    <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                      {c.description}
                    </p>

                    <div className="space-y-1 pt-2">
                      <span className="text-[10px] uppercase font-mono text-slate-500 block font-bold">Preview Syllabus Topics:</span>
                      <div className="space-y-1">
                        {c.syllabus.slice(0, 3).map((item, id) => (
                          <div key={id} className="text-[11px] text-slate-300 truncate">
                            &bull; {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-900 border-t border-white/5 flex items-center justify-between">
                    <span className="text-xs text-brand-gold font-mono">{c.enrolledStudents} Registered</span>
                    <button
                      onClick={() => {
                        setSelectedCourse(c);
                      }}
                      className="px-4 py-2 bg-brand-gold text-slate-950 font-bold hover:bg-amber-500 rounded-lg text-xs tracking-tight uppercase"
                    >
                      Syllabus Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}


        {/***********************************************
         * 4. STUDY MATERIALS SCREEN VIEW
         ***********************************************/}
        {currentPage === 'materials' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 animate-fadeIn">
            <div className="text-center space-y-2">
              <span className="text-xs uppercase font-mono tracking-widest text-[#D4AF37] font-bold block">Academics Curriculum</span>
              <h1 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight">Study Notes & Assignments</h1>
              <p className="text-xs text-slate-400 max-w-md mx-auto">Download verified chapter notes, practical sheets, numerics, and CBSE board sets curated by Mukesh Sir.</p>
            </div>

            {/* Filter controls and Search bar */}
            <div className="p-5 bg-white/5 border border-white/10 rounded-2xl grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              {/* Search */}
              <div className="relative md:col-span-5">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search file name, topic code, Python keywords..."
                  value={materialSearch}
                  onChange={(e) => setMaterialSearch(e.target.value)}
                  className="w-full bg-slate-950 border border-white/10 focus:border-brand-gold/50 focus:outline-none rounded-xl pl-10 pr-4 py-2.5 text-xs text-white"
                  id="material-search-input"
                />
              </div>

              {/* Class Filter */}
              <div className="md:col-span-3 flex items-center gap-2">
                <span className="text-[10px] uppercase font-mono text-slate-400 font-bold shrink-0 hidden sm:inline">CLASS:</span>
                <select
                  value={materialClassFilter}
                  onChange={(e) => setMaterialClassFilter(e.target.value)}
                  className="w-full bg-slate-950 border border-white/10 focus:border-brand-gold/50 rounded-xl p-2.5 text-xs text-white cursor-pointer"
                >
                  {classesList.map((cl, i) => (
                    <option key={i} value={cl}>{cl}</option>
                  ))}
                </select>
              </div>

              {/* Category Filter */}
              <div className="md:col-span-3 flex items-center gap-2">
                <span className="text-[10px] uppercase font-mono text-slate-400 font-bold shrink-0 hidden sm:inline">CAT:</span>
                <select
                  value={materialCategoryFilter}
                  onChange={(e) => setMaterialCategoryFilter(e.target.value)}
                  className="w-full bg-slate-950 border border-white/10 focus:border-[#D4AF37]/50 rounded-xl p-2.5 text-xs text-white cursor-pointer"
                >
                  {categoriesList.map((cat, i) => (
                    <option key={i} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Reset button */}
              <div className="md:col-span-1 text-center">
                <button
                  onClick={() => {
                    setMaterialSearch('');
                    setMaterialClassFilter('All');
                    setMaterialCategoryFilter('All');
                  }}
                  className="text-xs text-[#D4AF37] hover:underline"
                >
                  Clear All
                </button>
              </div>
            </div>

            {/* List materials */}
            <div className="space-y-4" id="materials-list-view">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>Matching Results ({filteredMaterials.length})</span>
                <span>Sum Downloads Tracker: {absoluteDownloadsCount}</span>
              </div>

              {filteredMaterials.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredMaterials.map((mat) => (
                    <div 
                      key={mat.id} 
                      className="bg-white/5 hover:bg-white/10 border border-white/10 p-5 rounded-2xl flex items-start gap-4 transition-all duration-200"
                    >
                      <div className="w-12 h-12 rounded-xl bg-brand-gold/10 text-brand-gold flex items-center justify-center shrink-0">
                        <FileText className="w-6 h-6" />
                      </div>
                      
                      <div className="flex-1 space-y-1.5 min-w-0">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="text-[9px] font-mono tracking-wider font-bold bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-brand-gold uppercase px-2 py-0.5 rounded">
                            {mat.classLevel}
                          </span>
                          <span className="text-[9px] font-mono tracking-wider font-bold bg-blue-950 text-blue-300 border border-blue-900/40 uppercase px-2 py-0.5 rounded">
                            {mat.category}
                          </span>
                        </div>
                        
                        <h3 className="font-display font-medium text-xs sm:text-sm text-white truncate max-w-full">
                          {mat.title}
                        </h3>

                        <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono pt-1">
                          <span>Updated: {mat.uploadedAt || '2026-06-01'}</span>
                          <span>Downloads: <b className="text-brand-gold">{mat.downloadCount}</b></span>
                        </div>

                        <div className="pt-2 flex items-center gap-2">
                          <button
                            onClick={() => {
                              setSelectedPDF(mat);
                            }}
                            className="text-[11px] font-bold bg-brand-gold hover:bg-amber-500 text-slate-950 px-3.5 py-1.5 rounded-lg flex items-center gap-1 transition-all uppercase tracking-tight"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            Open PDF Preview
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white/5 border border-white/10 p-12 text-center rounded-2xl space-y-3">
                  <BookOpen className="w-12 h-12 text-slate-400 mx-auto" />
                  <h3 className="text-base font-bold text-slate-300">No matching curriculum elements found.</h3>
                  <p className="text-xs text-slate-400">Try cleaning search queries or switching filters.</p>
                </div>
              )}
            </div>
          </div>
        )}


        {/***********************************************
         * 5. NOTICE BOARD SCREEN VIEW
         ***********************************************/}
        {currentPage === 'notices' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 animate-fadeIn">
            <div className="text-center space-y-2">
              <span className="text-xs uppercase font-mono tracking-widest text-[#D4AF37] font-bold block">Classroom updates</span>
              <h1 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight">Official Notice Board</h1>
              <p className="text-xs text-slate-400 max-w-md mx-auto">Verify exam date guidelines, lab session schedules, and urgent batch evaluations published directly from Mukesh Sir.</p>
            </div>

            {/* Pinned Announcement row */}
            {notices.some(n => n.isPinned) && (
              <div className="space-y-3">
                <span className="text-[10px] font-mono uppercase text-red-500 font-black tracking-widest block animate-pulse flex items-center gap-1">
                  <span className="w-2.5 h-2.5 bg-red-650 rounded-full"></span>
                  HIGHEST PRIORITY ANNOUNCEMENTS:
                </span>
                
                <div className="grid grid-cols-1 gap-4">
                  {notices.filter(n => n.isPinned).map((pin) => (
                    <div 
                      key={pin.id} 
                      className="p-6 bg-gradient-to-r from-slate-950 via-[#10233c] to-slate-950 border-2 border-brand-gold rounded-2xl relative shadow-2xl"
                    >
                      <span className="bg-brand-gold text-slate-950 font-mono uppercase font-black text-[9px] px-2.5 py-0.5 rounded absolute -top-2.5 left-6 shadow">
                        PINNED PRIORITY
                      </span>
                      <div className="flex justify-between items-center text-xs text-slate-400 font-mono mb-2">
                        <span>Published Date: {pin.date}</span>
                        <span className="bg-[#D4AF37]/20 border border-[#D4AF37]/50 text-brand-gold px-2 py-0.5 rounded uppercase font-bold text-[9px]">
                          {pin.category}
                        </span>
                      </div>
                      <h3 className="font-display font-black text-white text-base max-w-xl sm:max-w-3xl">
                        {pin.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-300 mt-2.5 leading-relaxed">
                        {pin.content}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* General Scrolling Ticker Notice Lists */}
            <div className="space-y-4">
              <span className="text-[10px] font-mono uppercase text-slate-400 font-extrabold tracking-widest block/5 border-b border-white/5 pb-2">CLASSROOM RECORD NOTICE TIMELINE:</span>
              
              <div className="space-y-4">
                {notices.filter(n => !n.isPinned).map((n) => (
                  <div 
                    key={n.id} 
                    className="p-5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition-colors"
                  >
                    <div className="flex justify-between items-center text-xs text-slate-400 font-mono mb-2">
                      <span>Date: {n.date}</span>
                      <span className="bg-slate-800 text-slate-300 border border-white/10 px-2 py-0.5 rounded uppercase text-[9px] font-bold">
                        {n.category}
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-white text-sm sm:text-base leading-snug">
                      {n.title}
                    </h3>
                    <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                      {n.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}


        {/***********************************************
         * 6. GALLERY SCREEN VIEW
         ***********************************************/}
        {currentPage === 'gallery' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 animate-fadeIn">
            <div className="text-center space-y-2">
              <span className="text-xs uppercase font-mono tracking-widest text-[#D4AF37] font-bold block">Digital Event Record</span>
              <h1 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight">Academy Photo Gallery</h1>
              <p className="text-xs text-slate-400 max-w-md mx-auto">Snapshots from our computer research lab workshops, classroom activities, student hackathons, and medals.</p>
            </div>

            {/* Gallery Category Selection */}
            <div className="flex flex-wrap justify-center gap-2" id="gallery-capsules">
              {['All', 'Workshops', 'Classroom', 'Achievements', 'Activities'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveGalleryType(cat)}
                  className={`px-4.5 py-2 rounded-full text-xs font-mono font-bold uppercase transition-all tracking-wide ${
                    activeGalleryType === cat
                      ? 'bg-brand-gold text-[#051124]'
                      : 'bg-white/5 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Photo Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" id="gallery-visual-grid">
              {gallery
                .filter((item) => activeGalleryType === 'All' || item.category === activeGalleryType)
                .map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setLightboxImage(item)}
                    className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-brand-gold/5 transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <div className="relative aspect-video bg-slate-950 overflow-hidden">
                      <img
                        src={item.url}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                        <span className="text-[11px] font-mono tracking-wide text-brand-gold uppercase font-bold">
                          Click to View Lightbox
                        </span>
                      </div>
                    </div>
                    <div className="p-4 space-y-1">
                      <span className="text-[9px] uppercase font-mono tracking-wider font-bold text-brand-gold">
                        {item.category}
                      </span>
                      <h4 className="font-display font-medium text-xs text-white leading-normal line-clamp-2">
                        {item.title}
                      </h4>
                    </div>
                  </div>
                ))}
            </div>

            {/* Lightbox Modal overlay view */}
            {lightboxImage && (
              <div 
                className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur flex items-center justify-center p-4"
                onClick={() => setLightboxImage(null)}
              >
                <div 
                  className="w-full max-w-3xl bg-[#051124]/50 border border-white/10 rounded-xl overflow-hidden shadow-2xl relative"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => setLightboxImage(null)}
                    className="absolute top-4 right-4 bg-slate-950 text-white p-2 rounded-full border border-white/10 hover:bg-white/10 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <div className="aspect-video w-full bg-black">
                    <img
                      src={lightboxImage.url}
                      alt={lightboxImage.title}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="p-5 bg-slate-950/90 border-t border-white/10 text-center space-y-1">
                    <span className="text-xs font-mono uppercase text-[#D4AF37] font-bold">
                      {lightboxImage.category} Photo Record
                    </span>
                    <h3 className="font-display font-bold text-sm sm:text-base text-white">
                      {lightboxImage.title}
                    </h3>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}


        {/***********************************************
         * 7. LOGIN & REGISTRATION / STUDENT DASHBOARD
         ***********************************************/}
        {currentPage === 'login' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fadeIn">
            
            {/* If user is ALREADY logged in as student, display the Student Dashboard */}
            {loggedInUser && loggedInUser.role === 'student' ? (
              <div className="space-y-8" id="student-portal-area">
                {/* Hero profile segment */}
                <div className="p-6 bg-gradient-to-r from-brand-blue to-slate-950 border border-white/10 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4 text-center sm:text-left flex-col sm:flex-row">
                    <div className="w-16 h-16 rounded-full bg-brand-gold text-slate-950 font-black flex items-center justify-center font-mono text-xl uppercase shadow">
                      {loggedInUser.data.name[0]}
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-brand-gold py-0.5 px-2 bg-brand-gold/10 rounded inline-block">
                        Student Account Active
                      </span>
                      <h2 className="text-xl sm:text-2xl font-black font-display text-white mt-1">
                        Howdy, {loggedInUser.data.name}!
                      </h2>
                      <p className="text-xs text-slate-400 font-mono mt-0.5">
                        Class: <b>{loggedInUser.data.classLevel}</b> &bull; Roll: <b>{loggedInUser.data.rollNumber}</b>
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/30 px-4 py-2 rounded-xl text-xs font-bold font-mono tracking-tight transition-all"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                </div>

                {/* Dashboard layout widgets Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  
                  {/* Left block: Grades + attendance tracking */}
                  <div className="lg:col-span-4 space-y-6">
                    {/* Attendance ring widget */}
                    <div className="p-6 bg-white/5 border border-white/10 rounded-2xl space-y-4 text-center">
                      <h3 className="text-xs font-bold font-mono text-[#D4AF37] uppercase tracking-wider text-left">
                        Academic Attendance Level
                      </h3>

                      <div className="w-28 h-28 rounded-full border-4 border-brand-gold/20 flex flex-col items-center justify-center mx-auto relative">
                        {/* Dynamic Attendance percent styling */}
                        <span className="text-2xl font-extrabold text-white">{loggedInUser.data.attendance}%</span>
                        <span className="text-[9px] uppercase font-mono text-slate-400 mt-0.5">Satisfactory</span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-normal">
                        Regular attendance guarantees high score allocations. Attendance threshold is audited by class staff weekly.
                      </p>
                    </div>

                    {/* exam card */}
                    <div className="p-6 bg-white/5 border border-white/10 rounded-2xl space-y-4">
                      <h3 className="text-xs font-bold font-mono text-[#D4AF37] uppercase tracking-wider">
                        Official Exam Performance
                      </h3>
                      <div className="space-y-3">
                        {loggedInUser.data.examResults.map((e: any, i: number) => (
                          <div key={i} className="bg-slate-950 p-3 rounded-lg border border-white/5 flex justify-between items-center">
                            <div>
                              <h4 className="text-xs font-bold text-white max-w-[160px] truncate">{e.subject}</h4>
                              <p className="text-[10px] text-slate-500 font-mono">{e.marksObtained}/{e.totalMarks} Points</p>
                            </div>
                            <span className="font-mono text-xs font-extrabold bg-[#D4AF37]/10 text-brand-gold border border-[#D4AF37]/30 px-2.5 py-1 rounded uppercase">
                              GRADE {e.grade}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right block: Assigned notes and homework checklist */}
                  <div className="lg:col-span-8 space-y-6">
                    {/* assignments checker */}
                    <div className="p-6 bg-white/5 border border-white/10 rounded-2xl space-y-4">
                      <h3 className="text-xs font-bold font-mono text-[#D4AF37] uppercase tracking-wider">
                        Assigned Homework / Project Tracker
                      </h3>

                      <div className="space-y-3">
                        {loggedInUser.data.assignmentsTrack.map((assign: any) => (
                          <div 
                            key={assign.id} 
                            className="p-4 bg-slate-950 border border-white/5 hover:border-white/10 rounded-xl flex flex-wrap items-center justify-between gap-3 text-xs"
                          >
                            <div>
                              <h4 className="font-bold text-slate-200">{assign.title}</h4>
                              <p className="text-[10px] text-slate-400 font-mono mt-0.5">Due parameter: {assign.dueDate}</p>
                            </div>

                            <div className="flex items-center gap-2">
                              {assign.score && (
                                <span className="font-mono text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/20">
                                  Marked: {assign.score}
                                </span>
                              )}
                              <span className={`px-2.5 py-1 rounded font-mono text-[10px] font-bold uppercase ${
                                assign.status === 'Graded'
                                  ? 'bg-emerald-500/10 text-emerald-400'
                                  : assign.status === 'Submitted'
                                    ? 'bg-blue-500/10 text-blue-300'
                                    : 'bg-amber-500/15 text-brand-gold animate-pulse'
                              }`}>
                                {assign.status}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Quick recommended learning notes pathway */}
                    <div className="bg-brand-gold/5 p-6 rounded-2xl border border-brand-gold/20 space-y-3">
                      <div className="flex items-center gap-2 text-brand-gold">
                        <BookOpen className="w-5 h-5" />
                        <h4 className="font-display font-medium text-sm sm:text-base text-white">Recommended Class Materials:</h4>
                      </div>
                      <p className="text-xs text-slate-300">
                        Mukesh Sir compiled dedicated test preparation files matching your <b>{loggedInUser.data.classLevel}</b> specifications. Visit the materials hub to obtain immediate downloads!
                      </p>
                      <button
                        onClick={() => {
                          setMaterialClassFilter(loggedInUser.data.classLevel);
                          setCurrentPage('materials');
                        }}
                        className="text-xs font-bold text-[#D4AF37] underline block"
                      >
                        Access My Class Materials &rarr;
                      </button>
                    </div>

                  </div>
                </div>
              </div>
            ) : (
              /* If NOT logged in, show Sign In + SignUp UI portal */
              <div className="max-w-md mx-auto bg-gradient-to-br from-[#0c1f36] to-slate-950 p-6 sm:p-8 rounded-[2rem] border border-white/10 shadow-2xl space-y-6">
                
                <div className="text-center space-y-1">
                  <div className="w-12 h-12 bg-brand-gold text-slate-950 font-black rounded-2xl flex items-center justify-center mx-auto text-xl shadow">
                    CS
                  </div>
                  <h2 className="text-lg sm:text-xl font-black font-display text-white mt-3">
                    {isRegistering ? 'Create Student Profile' : 'Student & Admin Login'}
                  </h2>
                  <p className="text-xs text-slate-400 leading-normal">
                    {isRegistering 
                      ? 'Register in moments to lock in your curriculum scores.' 
                      : 'Sign in to access study history dashboard.'}
                  </p>
                </div>

                {/* Simulated reset password success panel toggle */}
                {showResetBlock ? (
                  <div className="space-y-4 bg-slate-950 p-4 rounded-xl border border-white/15">
                    <h3 className="text-xs font-bold font-mono text-brand-gold uppercase">Password Recovery System</h3>
                    <p className="text-[11px] text-slate-300">Enter your registered Student Username to dispatch an authorization code link.</p>
                    <input
                      type="text"
                      className="w-full bg-slate-900 border border-white/10 rounded p-2 text-xs text-white"
                      placeholder="Username (e.g. student1)"
                      value={resetUsername}
                      onChange={(e) => setResetUsername(e.target.value)}
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          showToast(`Simulated code recovery sent for ${resetUsername || 'User'}! Check school mail.`);
                          setShowResetBlock(false);
                        }}
                        className="bg-brand-gold text-slate-950 font-bold px-4 py-1.5 rounded text-xs"
                      >
                        Send Reset Code
                      </button>
                      <button
                        onClick={() => setShowResetBlock(false)}
                        className="text-slate-400 hover:text-white text-xs font-mono"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : null}

                {/* Main Auth tab buttons to toggle loginRole or custom registration */}
                {!isRegistering ? (
                  <form onSubmit={handleLoginSubmit} className="space-y-4">
                    {/* Role toggle */}
                    <div className="grid grid-cols-2 gap-2 bg-slate-950 p-1 rounded-xl border border-white/5">
                      <button
                        type="button"
                        onClick={() => setLoginRole('student')}
                        className={`py-2 text-xs font-bold font-mono rounded-lg transition-all ${
                          loginRole === 'student' ? 'bg-[#D4AF37] text-slate-950' : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        STUDENT PORTAL
                      </button>
                      <button
                        type="button"
                        onClick={() => setLoginRole('admin')}
                        className={`py-2 text-xs font-bold font-mono rounded-lg transition-all ${
                          loginRole === 'admin' ? 'bg-[#D4AF37] text-slate-950' : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        ADMIN SYSTEM
                      </button>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="text-[10px] font-mono uppercase text-slate-400 block mb-1 font-bold">Username / Login ID:</label>
                        <input
                          type="text"
                          required
                          className="w-full bg-slate-950 focus:bg-[#020b17] border border-white/10 focus:border-brand-gold/50 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-0"
                          placeholder={loginRole === 'admin' ? 'e.g. admin' : 'e.g. student1'}
                          value={loginUsername}
                          onChange={(e) => setLoginUsername(e.target.value)}
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-mono uppercase text-slate-400 block mb-1 font-bold">Security Password:</label>
                        <input
                          type="password"
                          required
                          className="w-full bg-slate-950 focus:bg-[#020b17] border border-white/10 focus:border-brand-gold/50 rounded-xl p-3 text-xs text-white placeholder-slate-550 focus:outline-none"
                          placeholder={loginRole === 'admin' ? 'admin' : 'student / password'}
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] pt-1">
                      <button 
                        type="button" 
                        onClick={() => setShowResetBlock(true)}
                        className="text-brand-gold hover:underline font-mono"
                      >
                        Forgot password?
                      </button>
                      
                      <button
                        type="button"
                        onClick={() => setIsRegistering(true)}
                        className="text-slate-300 hover:text-white font-bold"
                      >
                        No profile? Register profile
                      </button>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-brand-gold hover:bg-amber-500 text-slate-950 font-black p-3.5 rounded-xl uppercase text-xs tracking-wider transition-all"
                    >
                      Authenticate Access
                    </button>

                    {/* Pre-loaded logins help indicator */}
                    <div className="p-3 bg-white/5 rounded-xl border border-white/5 text-[10px] text-slate-400 leading-normal space-y-1">
                      <p className="font-bold text-brand-gold uppercase tracking-wider font-mono flex items-center gap-1">
                        <Info className="w-3.5 h-3.5" /> Preset Log-ins (No registration needed!):
                      </p>
                      <ul className="list-disc list-inside space-y-0.5 text-slate-300 font-mono">
                        <li>Admin portal: User <code className="text-white font-bold">admin</code> | Pass <code className="text-white font-bold">admin</code></li>
                        <li>Student panel: User <code className="text-white font-bold">student1</code> | Pass <code className="text-white font-bold">student</code></li>
                      </ul>
                    </div>
                  </form>
                ) : (
                  /* Create Student Registration Profile form */
                  <form onSubmit={handleRegisterSubmit} className="space-y-4">
                    <div className="space-y-3">
                      <div>
                        <label className="text-[10px] font-mono uppercase text-slate-400 block mb-1 font-bold">Your Full Name:</label>
                        <input
                          type="text"
                          required
                          className="w-full bg-slate-950 border border-white/10 focus:border-brand-gold/50 rounded-xl p-3 text-xs text-white focus:outline-none"
                          placeholder="e.g. Priyanka Patel"
                          value={regName}
                          onChange={(e) => setRegName(e.target.value)}
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-mono uppercase text-slate-400 block mb-1 font-bold">Username ID (lowercase):</label>
                        <input
                          type="text"
                          required
                          className="w-full bg-slate-950 border border-white/10 focus:border-brand-gold/50 rounded-xl p-3 text-xs text-white focus:outline-none"
                          placeholder="e.g. priyanka12"
                          value={regUsername}
                          onChange={(e) => setRegUsername(e.target.value.toLowerCase().trim())}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[10px] font-mono uppercase text-slate-400 block mb-1 font-bold">Class Level:</label>
                          <select
                            className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-xs text-white cursor-pointer focus:outline-none"
                            value={regClass}
                            onChange={(e: any) => setRegClass(e.target.value)}
                          >
                            <option value="Class 9">Class 9 Computer</option>
                            <option value="Class 10">Class 10 Computer App</option>
                            <option value="Class 11">Class 11 Computer Science</option>
                            <option value="Class 12">Class 12 Computer Science</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-[10px] font-mono uppercase text-slate-400 block mb-1 font-bold">Email Address:</label>
                          <input
                            type="email"
                            className="w-full bg-slate-950 border border-white/10 focus:border-brand-gold/50 rounded-xl p-3 text-xs text-white focus:outline-none"
                            placeholder="priyanka@example.com"
                            value={regEmail}
                            onChange={(e) => setRegEmail(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center text-xs">
                      <button
                        type="button"
                        onClick={() => setIsRegistering(false)}
                        className="text-brand-gold hover:underline"
                      >
                        Already have a profile? Sign In
                      </button>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-brand-gold hover:bg-amber-500 text-slate-950 font-black p-3.5 rounded-xl uppercase text-xs tracking-wider transition-all"
                    >
                      Complete Registration
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>
        )}


        {/***********************************************
         * 8. CONTACT PAGE VIEW
         ***********************************************/}
        {currentPage === 'contact' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 animate-fadeIn">
            <div className="text-center space-y-2">
              <span className="text-xs uppercase font-mono tracking-widest text-[#D4AF37] font-bold block">Classroom office</span>
              <h1 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight">Send Mukesh Sir a Message</h1>
              <p className="text-xs text-slate-400 max-w-md mx-auto">Send academic curriculum queries, registration validation requests, or general advisory guidelines.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left column info items + simulated Google Maps */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Simulated Google Maps layout block */}
                <div className="p-6 bg-slate-950 rounded-2xl border border-white/10 space-y-4">
                  <h3 className="text-xs font-bold font-mono text-[#D4AF37] uppercase tracking-wider flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-brand-gold" />
                    Academy Location Map
                  </h3>

                  {/* Visual simulated map landscape */}
                  <div className="w-full h-48 bg-slate-900 border border-white/5 rounded-xl overflow-hidden relative flex flex-col items-center justify-center p-4">
                    <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:16px_16px]"></div>
                    <div className="absolute w-2.5 h-2.5 bg-red-650 rounded-full animate-ping"></div>
                    <div className="absolute w-4.5 h-4.5 bg-red-600 rounded-full border-2 border-white flex items-center justify-center shadow">
                      <span className="text-[8px] font-black leading-none text-white font-mono">M</span>
                    </div>

                    <div className="absolute bottom-3 left-3 bg-slate-950/90 border border-white/10 px-2.5 py-1.5 rounded text-[10px] font-mono text-slate-400">
                      Janakpur - Kathmandu Path, Nepal
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-400 leading-normal">
                    Shree Durga Model Secondary School, Nepal.
                  </p>
                </div>

                {/* Instant connection CTA buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <a 
                    href="tel:+9779818319614" 
                    className="p-3 bg-white/5 hover:bg-brand-gold/10 border border-white/10 rounded-xl flex flex-col items-center justify-center text-center group transition-all"
                  >
                    <Phone className="w-5 h-5 text-brand-gold group-hover:scale-105 transition-transform" />
                    <span className="text-[10px] uppercase font-mono tracking-wider font-bold mt-2">Call Direct</span>
                  </a>
                  <a 
                    href="https://wa.me/9779818319614" 
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 bg-white/5 hover:bg-brand-gold/10 border border-white/10 rounded-xl flex flex-col items-center justify-center text-center group transition-all"
                  >
                    <MessageCircle className="w-5 h-5 text-brand-gold group-hover:scale-105 transition-transform" />
                    <span className="text-[10px] uppercase font-mono tracking-wider font-bold mt-2">WhatsApp</span>
                  </a>
                  <a 
                    href="mailto:mukeshydv2048@gmail.com" 
                    className="p-3 bg-white/5 hover:bg-brand-gold/10 border border-white/10 rounded-xl flex flex-col items-center justify-center text-center group transition-all"
                  >
                    <Mail className="w-5 h-5 text-brand-gold group-hover:scale-105 transition-transform" />
                    <span className="text-[10px] uppercase font-mono tracking-wider font-bold mt-2">Email Mail</span>
                  </a>
                </div>

              </div>

              {/* Right column Form */}
              <div className="lg:col-span-7 bg-[#0c1f36]/40 p-6 sm:p-8 rounded-[2rem] border border-white/10">
                {!contactSuccess ? (
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <h3 className="font-display font-medium text-base text-white">Curriculum Doubt Query Box</h3>
                    <p className="text-xs text-slate-450 leading-normal">
                      Are you preparing for Class 12 CS boards? Ask about homework sheets or physical lab batches.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-mono uppercase text-slate-350 block mb-1">Your Legal Name:</label>
                        <input
                          type="text"
                          required
                          value={contactName}
                          onChange={(e) => setContactName(e.target.value)}
                          className="w-full bg-[#051124] border border-white/10 focus:border-brand-gold/50 rounded-xl p-3 text-xs text-white focus:outline-none"
                          placeholder="e.g. Aman Sharma"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-mono uppercase text-slate-350 block mb-1">Email Coordinates:</label>
                        <input
                          type="email"
                          required
                          value={contactEmail}
                          onChange={(e) => setContactEmail(e.target.value)}
                          className="w-full bg-[#051124] border border-white/10 focus:border-brand-gold/50 rounded-xl p-3 text-xs text-white focus:outline-none"
                          placeholder="aman@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-mono uppercase text-slate-350 block mb-1 font-bold">Contact Phone Number:</label>
                      <input
                        type="text"
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        className="w-full bg-[#051124] border border-white/10 focus:border-brand-gold/50 rounded-xl p-3 text-xs text-white focus:outline-none"
                        placeholder="e.g. +977 9812..."
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-mono uppercase text-slate-350 block mb-1 font-bold">Brief Explanation / message:</label>
                      <textarea
                        required
                        rows={4}
                        value={contactMsg}
                        onChange={(e) => setContactMsg(e.target.value)}
                        className="w-full bg-[#051124] border border-white/10 focus:border-brand-gold/50 rounded-xl p-3 text-xs text-white focus:outline-none"
                        placeholder="Write details of queries or boards preparation guidelines..."
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#D4AF37] hover:bg-amber-500 text-[#051124] font-black p-3.5 rounded-xl uppercase text-xs tracking-wider transition-all"
                    >
                      Send Message
                    </button>
                  </form>
                ) : (
                  <div className="p-8 text-center space-y-4">
                    <div className="w-12 h-12 bg-emerald-500 text-slate-950 font-black rounded-full flex items-center justify-center mx-auto">
                      ✓
                    </div>
                    <h3 className="text-base font-bold text-white uppercase tracking-tight">Message Dispatched!</h3>
                    <p className="text-xs text-slate-300">
                      Thank you. We have saved your message in Mukesh Sir's mail folder. He will analyze your query and notify your registered inbox.
                    </p>
                    <button
                      onClick={() => setContactSuccess(false)}
                      className="px-5 py-2 bg-slate-950 hover:bg-slate-900 border border-white/10 text-white rounded font-mono text-xs"
                    >
                      Send another query
                    </button>
                  </div>
                )}
              </div>

            </div>
          </div>
        )}


        {/***********************************************
         * 9. ADMIN DASHBOARD SCREEN VIEW
         ***********************************************/}
        {currentPage === 'admin' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 animate-fadeIn" id="admin-viewports">
            
            {/* Verify admin block */}
            {loggedInUser && loggedInUser.role === 'admin' ? (
              <AdminPanel
                materials={materials}
                setMaterials={setMaterials}
                notices={notices}
                setNotices={setNotices}
                courses={courses}
                setCourses={setCourses}
                gallery={gallery}
                setGallery={setGallery}
                students={students}
                setStudents={setStudents}
                websiteVisitors={websiteVisitors}
                setWebsiteVisitors={setWebsiteVisitors}
                handleLogout={handleLogout}
              />
            ) : (
              /* If NOT logged in as admin, redirect display */
              <div className="max-w-md mx-auto text-center space-y-6 bg-slate-950/60 p-8 rounded-2xl border border-white/10">
                <Shield className="w-12 h-12 text-red-500 mx-auto animate-pulse" />
                <h3 className="text-lg font-bold text-white uppercase">Admin Portal Unauthorized</h3>
                <p className="text-xs text-slate-400 leading-normal">
                  Access restricted to computer faculty members and administrators. Please authenticate credentials on Student & Faculty Login Page.
                </p>
                <div className="flex gap-2 justify-center">
                  <button
                    onClick={() => {
                      setLoginRole('admin');
                      setCurrentPage('login');
                    }}
                    className="p-3 bg-[#D4AF37] hover:bg-amber-550 text-[#051124] font-bold text-xs uppercase tracking-wider rounded-xl"
                  >
                    Authenticate Admin Access
                  </button>
                  <button
                    onClick={() => setCurrentPage('home')}
                    className="p-3 bg-white/5 hover:bg-white/10 text-slate-350 text-xs font-mono rounded-xl border border-white/10"
                  >
                    Return Home
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

      </div>

      {/* Floating back to top widget */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-[110px] right-6 z-40 bg-slate-900 border border-[#D4AF37]/50 text-brand-gold p-3 rounded-full hover:bg-brand-gold hover:text-[#051124] transition-all shadow-md transform hover:scale-105"
          id="back-to-top"
          title="Back to top"
        >
          <ArrowUp className="w-4.5 h-4.5" />
        </button>
      )}

      {/* Floating WhatsApp Quick-help static bubble */}
      <a
        href="https://wa.me/9779818319614"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 left-6 z-40 bg-[#25d366] text-white p-3.5 rounded-full shadow-lg hover:bg-emerald-600 transition-all transform hover:scale-105 flex items-center gap-2 border border-emerald-500 group"
        id="whatsapp-bubble"
      >
        <MessageCircle className="w-5 h-5 text-white animate-bounce" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 text-[11px] font-mono font-bold uppercase shrink-0 whitespace-nowrap">
          WhatsApp Sir
        </span>
      </a>

      {/* Embedded interactive custom AI studies chat drawer */}
      <AIChat isDarkMode={isDarkMode} />

      {/* Interactive rendering of PDF preview file modal overlay */}
      {selectedPDF && (
        <PDFViewerModal 
          material={selectedPDF} 
          onClose={() => setSelectedPDF(null)}
          onDownloadIncrement={incrementDownload}
        />
      )}

      {/* Interactive rendering of Course Details & registration modal */}
      {selectedCourse && (
        <CourseModal 
          course={selectedCourse} 
          onClose={() => setSelectedCourse(null)}
          onEnroll={handleEnroll}
          isLoggedIn={!!loggedInUser}
          studentName={loggedInUser?.role === 'student' ? loggedInUser.data.name : ''}
        />
      )}

      {/* Clean Aesthetic Footer */}
      <Footer 
        setCurrentPage={setCurrentPage} 
        isDarkMode={isDarkMode}
        totalDownloads={absoluteDownloadsCount}
      />
    </div>
  );
}
