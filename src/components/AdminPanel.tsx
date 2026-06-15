import React, { useState, useEffect, useRef } from 'react';
import { 
  BarChart, BookOpen, Bell, Image as ImageIcon, Phone, User, 
  MapPin, Mail, MessageCircle, ArrowUp, Send, CheckCircle2, AlertCircle, Plus, Trash, 
  Edit, Trash2, Shield, Search, Filter, Book, FileText, Calendar, Award, CheckCircle, 
  Percent, ArrowUpRight, HelpCircle, LogOut, TrendingUp, Download, Eye, LayoutDashboard, 
  UserX, UserPlus, FileUp, Info, X, ChevronRight, Settings, Check, Clock, ListChecks, 
  Flame, HelpCircle as QuizIcon, FileSpreadsheet, Lock, Sparkles, Sliders, Play
} from 'lucide-react';
import { Chart } from 'chart.js/auto';
import { Course, StudyMaterial, Notice, GalleryItem, Student } from '../types';

interface AdminPanelProps {
  materials: StudyMaterial[];
  setMaterials: React.Dispatch<React.SetStateAction<StudyMaterial[]>>;
  notices: Notice[];
  setNotices: React.Dispatch<React.SetStateAction<Notice[]>>;
  courses: Course[];
  setCourses: React.Dispatch<React.SetStateAction<Course[]>>;
  gallery: GalleryItem[];
  setGallery: React.Dispatch<React.SetStateAction<GalleryItem[]>>;
  students: Student[];
  setStudents: React.Dispatch<React.SetStateAction<Student[]>>;
  websiteVisitors: number;
  setWebsiteVisitors: React.Dispatch<React.SetStateAction<number>>;
  handleLogout: () => void;
}

// Simulated active admin panel audits and custom logs
initialAuditLogs();

function initialAuditLogs() {
  const saved = localStorage.getItem('academy_audit_logs');
  if (!saved) {
    const logs = [
      { id: '1', date: '2026-06-15 10:12 AM', action: 'Uploaded study guide', user: 'Admin (Mukesh Sir)', target: 'Class 12 - SQL Joins' },
      { id: '2', date: '2026-06-14 04:30 PM', action: 'Pinned public notice', user: 'Admin (Mukesh Sir)', target: 'Flask Workshop Registration' },
      { id: '3', date: '2026-06-13 01:15 PM', action: 'Enrolled new student', user: 'Self-Enroll System', target: 'Priyanka Patel (Class 10)' }
    ];
    localStorage.setItem('academy_audit_logs', JSON.stringify(logs));
  }
}

export default function AdminPanel({
  materials,
  setMaterials,
  notices,
  setNotices,
  courses,
  setCourses,
  gallery,
  setGallery,
  students,
  setStudents,
  websiteVisitors,
  setWebsiteVisitors,
  handleLogout
}: AdminPanelProps) {
  // Sidebar Tabs Navigation
  type AdminTab = 'dashboard' | 'materials' | 'notices' | 'courses' | 'students' | 'assignments' | 'quizzes' | 'gallery' | 'results' | 'settings';
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');

  // Custom visual feedback modal (SweetAlert style)
  const [customAlert, setCustomAlert] = useState<{ show: boolean; title: string; message: string; type: 'success' | 'warning' | 'danger' | 'info'; actionLabel?: string; onAction?: () => void } | null>(null);
  
  const showAlert = (title: string, message: string, type: 'success' | 'warning' | 'danger' | 'info' = 'success', actionLabel?: string, onAction?: () => void) => {
    setCustomAlert({ show: true, title, message, type, actionLabel, onAction });
  };

  const showToast = (message: string) => {
    showAlert('System Notification', message, 'info');
  };

  // State Persistence for Audit log
  const [auditLogs, setAuditLogs] = useState<any[]>(() => {
    const saved = localStorage.getItem('academy_audit_logs');
    return saved ? JSON.parse(saved) : [];
  });

  const appendAuditLog = (action: string, target: string) => {
    const now = new Date();
    const formattedDate = `${now.toISOString().split('T')[0]} ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    const newLog = {
      id: Math.random().toString(),
      date: formattedDate,
      action,
      user: 'Admin (Mukesh Sir)',
      target
    };
    const nextLogs = [newLog, ...auditLogs].slice(0, 50); // limit to recent 50 logs
    setAuditLogs(nextLogs);
    localStorage.setItem('academy_audit_logs', JSON.stringify(nextLogs));
  };

  // State for Website configuration adjustments
  const [siteSettings, setSiteSettings] = useState<any>(() => {
    const saved = localStorage.getItem('academy_site_settings');
    return saved ? JSON.parse(saved) : {
      logoText: 'Mukesh CS Academy',
      bannerTitle: 'Shree Durga Model Secondary School',
      bannerSub: 'Empowering Next-Generation Innovators via Deep Technical Competence',
      contactMail: 'mukeshydv2048@gmail.com',
      contactPhone: '+977 9818319614',
      facebookLink: 'https://facebook.com',
      youtubeLink: 'https://youtube.com',
      enableQuizModule: true,
      enableAIChat: true,
      enableCourses: true
    };
  });

  useEffect(() => {
    localStorage.setItem('academy_site_settings', JSON.stringify(siteSettings));
  }, [siteSettings]);

  // Assignments Administration Data
  const [assignments, setAssignments] = useState<any[]>(() => {
    const saved = localStorage.getItem('admin_assignments');
    return saved ? JSON.parse(saved) : [
      { id: 'asm1', title: 'Python File Input/Output Basics', classLevel: 'Class 12', dueDate: '2026-06-25', totalMarks: 100, submissionsCount: 2, status: 'Active' },
      { id: 'asm2', title: 'Database schema architecture query project', classLevel: 'Class 12', dueDate: '2026-06-29', totalMarks: 50, submissionsCount: 1, status: 'Active' },
      { id: 'asm3', title: 'Interactive Multi-Page Web Layout', classLevel: 'Class 10', dueDate: '2026-06-20', totalMarks: 100, submissionsCount: 1, status: 'Active' }
    ];
  });

  useEffect(() => {
    localStorage.setItem('admin_assignments', JSON.stringify(assignments));
  }, [assignments]);

  // Quizzes Administration Data
  const [quizzes, setQuizzes] = useState<any[]>(() => {
    const saved = localStorage.getItem('admin_quizzes');
    return saved ? JSON.parse(saved) : [
      { id: 'qz1', title: 'HTML Semantic Elements Quiz', classLevel: 'Class 10', timeLimitMin: 15, questionCount: 5, active: true },
      { id: 'qz2', title: 'Core Python structures & operators test', classLevel: 'Class 11', timeLimitMin: 20, questionCount: 4, active: true },
      { id: 'qz3', title: 'RDBMS relational algebra rules', classLevel: 'Class 12', timeLimitMin: 25, questionCount: 5, active: true }
    ];
  });

  useEffect(() => {
    localStorage.setItem('admin_quizzes', JSON.stringify(quizzes));
  }, [quizzes]);

  // Track of results upload
  const [resultsSheet, setResultsSheet] = useState<any[]>(() => {
    const saved = localStorage.getItem('admin_results_sheet');
    return saved ? JSON.parse(saved) : [
      { studentName: 'Aman Sharma', exam: 'Term 1 Final Exam', classLevel: 'Class 12', rollNumber: '12-CS-4512', score: 92, grade: 'A+', publishDate: '2026-06-12' },
      { studentName: 'Priyanka Patel', exam: 'Half-Yearly Test', classLevel: 'Class 10', rollNumber: '10-CS-3918', score: 85, grade: 'A', publishDate: '2026-06-02' }
    ];
  });

  useEffect(() => {
    localStorage.setItem('admin_results_sheet', JSON.stringify(resultsSheet));
  }, [resultsSheet]);

  // Chart References
  const chartRef1 = useRef<HTMLCanvasElement | null>(null);
  const chartRef2 = useRef<HTMLCanvasElement | null>(null);
  const chartInstance1 = useRef<Chart | null>(null);
  const chartInstance2 = useRef<Chart | null>(null);

  // Initialize Analytics Charts (Destroy existing before rebuild to avoid canvas errors)
  useEffect(() => {
    if (activeTab === 'dashboard') {
      // Small timeout to allow canvas element to completely mount in DOM
      const timer = setTimeout(() => {
        if (chartRef1.current) {
          if (chartInstance1.current) {
            chartInstance1.current.destroy();
          }
          // Visitor & Downloads Trend Monthly
          chartInstance1.current = new Chart(chartRef1.current, {
            type: 'line',
            data: {
              labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
              datasets: [
                {
                  label: 'Visitor Visits (Hits)',
                  data: [5400, 6100, 6800, 7200, 8100, websiteVisitors],
                  borderColor: '#D4AF37',
                  backgroundColor: 'rgba(212, 175, 55, 0.1)',
                  fill: true,
                  tension: 0.35,
                  pointBackgroundColor: '#fff',
                  borderWidth: 2.5
                },
                {
                  label: 'Resource Downloads',
                  data: [1200, 1500, 2100, 1850, 2400, 3100],
                  borderColor: '#42a5f5',
                  backgroundColor: 'rgba(66, 165, 245, 0.05)',
                  fill: true,
                  tension: 0.3,
                  pointBackgroundColor: '#42a5f5',
                  borderWidth: 2
                }
              ]
            },
            options: {
              responsive: true,
              plugins: {
                legend: { labels: { color: 'rgba(255, 255, 255, 0.7)', font: { size: 10 } } }
              },
              scales: {
                y: { grid: { color: 'rgba(255, 255, 255, 0.06)' }, ticks: { color: 'rgba(255, 255, 255, 0.6)', font: { size: 10 } } },
                x: { grid: { color: 'rgba(255, 255, 255, 0.06)' }, ticks: { color: 'rgba(255, 255, 255, 0.6)', font: { size: 10 } } }
              }
            }
          });
        }

        if (chartRef2.current) {
          if (chartInstance2.current) {
            chartInstance2.current.destroy();
          }
          // Popular Materials Download Analytics
          const topMaterials = [...materials].sort((a,b) => b.downloadCount - a.downloadCount).slice(0, 5);
          const labels = topMaterials.map(m => m.fileName.length > 20 ? m.fileName.substring(0, 15) + '..' : m.fileName);
          const counts = topMaterials.map(m => m.downloadCount);

          chartInstance2.current = new Chart(chartRef2.current, {
            type: 'bar',
            data: {
              labels: labels.length > 0 ? labels : ['Advanced Python', 'HTML Semantic', 'C Pointers', 'Networking Guide', 'SQL Board Prep'],
              datasets: [{
                label: 'Total Downloads count',
                data: counts.length > 0 ? counts : [610, 450, 412, 310, 290],
                backgroundColor: [
                  'rgba(212, 175, 55, 0.85)',
                  'rgba(66, 165, 245, 0.85)',
                  'rgba(76, 175, 80, 0.85)',
                  'rgba(244, 67, 54, 0.85)',
                  'rgba(156, 39, 176, 0.85)'
                ],
                borderWidth: 0,
                borderRadius: 4
              }]
            },
            options: {
              responsive: true,
              plugins: {
                legend: { display: false }
              },
              scales: {
                y: { grid: { color: 'rgba(255, 255, 255, 0.06)' }, ticks: { color: 'rgba(255, 255, 255, 0.6)', font: { size: 10 } } },
                x: { grid: { display: false }, ticks: { color: 'rgba(255, 255, 255, 0.6)', font: { size: 10 } } }
              }
            }
          });
        }
      }, 100);

      return () => {
        clearTimeout(timer);
        if (chartInstance1.current) chartInstance1.current.destroy();
        if (chartInstance2.current) chartInstance2.current.destroy();
      };
    }
  }, [activeTab, websiteVisitors, materials]);

  // Aggregate stats
  const totalStudents = students.length;
  const totalDownloads = materials.reduce((sum, mat) => sum + mat.downloadCount, 0);
  const totalMaterials = materials.length;
  const totalNotices = notices.length;
  const totalCourses = courses.length;
  const totalGallery = gallery.length;

  // Recent Action Log list
  const recentActivitiesList = auditLogs.slice(0, 5);

  // -----------------------------------------------------
  // 1. MATERIAL CRUD STATES
  // -----------------------------------------------------
  const [searchQueryMat, setSearchQueryMat] = useState('');
  const [classFilterMat, setClassFilterMat] = useState('All');
  const [isUploadingMat, setIsUploadingMat] = useState(false);
  const [editingMatId, setEditingMatId] = useState<string | null>(null);

  // Form Fields
  const [matTitle, setMatTitle] = useState('');
  const [matClass, setMatClass] = useState<'Class 9' | 'Class 10' | 'Class 11' | 'Class 12' | 'Programming'>('Class 12');
  const [matCategory, setMatCategory] = useState<any>('Notes');
  const [matFileName, setMatFileName] = useState('');
  const [matFileSize, setMatFileSize] = useState('');
  const [matIsFeatured, setMatIsFeatured] = useState(false);

  const handleCreateOrEditMaterial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!matTitle || !matFileName) {
      showAlert('Incomplete Fields', 'Please complete title and filename indicators.', 'warning');
      return;
    }

    if (editingMatId) {
      // Edit
      setMaterials(prev => prev.map(m => {
        if (m.id === editingMatId) {
          return {
            ...m,
            title: matTitle,
            classLevel: matClass,
            category: matCategory,
            fileName: matFileName,
            fileSize: matFileSize || '1.5 MB'
          };
        }
        return m;
      }));
      appendAuditLog('Modified Study Material', matTitle);
      showAlert('Material Updated', `Successfully optimized structural records for: ${matTitle}`, 'success');
      setEditingMatId(null);
    } else {
      // Create
      const newMat: StudyMaterial = {
        id: 'mat_' + Math.random().toString(36).substring(2, 9),
        title: matTitle,
        classLevel: matClass,
        category: matCategory,
        fileName: matFileName,
        fileSize: matFileSize || '1.5 MB',
        downloadCount: 0,
        uploadedAt: new Date().toISOString().split('T')[0],
        fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
      };
      setMaterials(prev => [newMat, ...prev]);
      appendAuditLog('Uploaded Study Material', matTitle);
      showAlert('Material Added', `Published secure educational file: ${matTitle}`, 'success');
    }

    // Reset Fields
    setMatTitle('');
    setMatFileName('');
    setMatFileSize('');
    setIsUploadingMat(false);
  };

  const startEditMaterial = (m: StudyMaterial) => {
    setEditingMatId(m.id);
    setMatTitle(m.title);
    setMatClass(m.classLevel);
    setMatCategory(m.category);
    setMatFileName(m.fileName);
    setMatFileSize(m.fileSize);
    setIsUploadingMat(true);
  };

  const deleteMaterialConfirm = (m: StudyMaterial) => {
    showAlert('Confirm deletion?', `Are you sure you want to permanently delete: ${m.title}? This action is irreversible.`, 'danger', 'Confirm Delete', () => {
      setMaterials(prev => prev.filter(item => item.id !== m.id));
      appendAuditLog('Removed Study Material', m.title);
      setCustomAlert(null);
    });
  };

  // -----------------------------------------------------
  // 2. NOTICE BOARD CRUD STATES
  // -----------------------------------------------------
  const [editingNoticeId, setEditingNoticeId] = useState<string | null>(null);
  const [isAddingNotice, setIsAddingNotice] = useState(false);

  const [noticeTitle, setNoticeTitle] = useState('');
  const [noticeContent, setNoticeContent] = useState('');
  const [noticeCategory, setNoticeCategory] = useState<'General' | 'Exam' | 'Assignment' | 'Event'>('General');
  const [noticePinned, setNoticePinned] = useState(false);
  const [noticeSchedule, setNoticeSchedule] = useState('');
  const [noticeExpiry, setNoticeExpiry] = useState('');

  const handleCreateOrEditNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noticeTitle || !noticeContent) {
      showAlert('Missing parameters', 'Please write a descriptive headline title and body context.', 'warning');
      return;
    }

    if (editingNoticeId) {
      setNotices(prev => prev.map(n => {
        if (n.id === editingNoticeId) {
          return {
            ...n,
            title: noticeTitle,
            content: noticeContent,
            category: noticeCategory,
            isPinned: noticePinned
          };
        }
        return n;
      }));
      appendAuditLog('Updated Announcement Pin', noticeTitle);
      showAlert('Notice Optimized', 'Successfully refreshed active system notice data.', 'success');
      setEditingNoticeId(null);
    } else {
      const newNotice: Notice = {
        id: 'not_' + Math.random().toString(36).substring(2, 9),
        title: noticeTitle,
        content: noticeContent,
        date: noticeSchedule || new Date().toISOString().split('T')[0],
        isPinned: noticePinned,
        category: noticeCategory
      };
      setNotices(prev => [newNotice, ...prev]);
      appendAuditLog('Deployed Notice', noticeTitle);
      showAlert('Notice Live', 'Dispatched new notice broadcast on student dashboards!', 'success');
    }

    setNoticeTitle('');
    setNoticeContent('');
    setNoticePinned(false);
    setNoticeSchedule('');
    setNoticeExpiry('');
    setIsAddingNotice(false);
  };

  const startEditNotice = (n: Notice) => {
    setEditingNoticeId(n.id);
    setNoticeTitle(n.title);
    setNoticeContent(n.content);
    setNoticeCategory(n.category);
    setNoticePinned(n.isPinned);
    setIsAddingNotice(true);
  };

  const deleteNoticeConfirm = (n: Notice) => {
    showAlert('Confirm deletion?', `Remove the following bulletin board notice item: "${n.title}"?`, 'danger', 'Confirm Delete', () => {
      setNotices(prev => prev.filter(item => item.id !== n.id));
      appendAuditLog('Deleted Public Notice', n.title);
      setCustomAlert(null);
    });
  };

  // -----------------------------------------------------
  // 3. COURSE MANAGER MODULE
  // -----------------------------------------------------
  const [isAddingCourse, setIsAddingCourse] = useState(false);
  const [editingCourseId, setEditingCourseId] = useState<string | null>(null);

  const [courseTitle, setCourseTitle] = useState('');
  const [courseClass, setCourseClass] = useState('Class 12');
  const [courseDuration, setCourseDuration] = useState('8 Weeks Intensive');
  const [courseDesc, setCourseDesc] = useState('');
  const [courseStatus, setCourseStatus] = useState<'Active' | 'Draft' | 'Archived'>('Active');
  const [courseThumbnail, setCourseThumbnail] = useState('https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=400&auto=format&fit=crop');
  const [courseSyllabusInput, setCourseSyllabusInput] = useState('');

  const handleCreateOrEditCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseTitle || !courseDesc) {
      showAlert('Prerequisites Missing', 'Please provide title and core course description.', 'warning');
      return;
    }

    const syllabusArray = courseSyllabusInput 
      ? courseSyllabusInput.split('\n').filter(line => line.trim().length > 0) 
      : ['Week 1: Foundations', 'Week 2: Interactive Labs', 'Week 3: Final Assessments'];

    if (editingCourseId) {
      setCourses(prev => prev.map(c => {
        if (c.id === editingCourseId) {
          return {
            ...c,
            title: courseTitle,
            classLevel: courseClass,
            duration: courseDuration,
            description: courseDesc,
            syllabus: syllabusArray
          };
        }
        return c;
      }));
      appendAuditLog('Restructured Curriculum Pathway', courseTitle);
      showAlert('Course Updated', 'Successfully modified syllabus tracks and duration settings.', 'success');
      setEditingCourseId(null);
    } else {
      const newCourse: Course = {
        id: 'crs_' + Math.random().toString(36).substring(2, 9),
        title: courseTitle,
        slug: courseTitle.toLowerCase().replace(/\s+/g, '-'),
        classLevel: courseClass,
        description: courseDesc,
        duration: courseDuration,
        syllabus: syllabusArray,
        resourcesCount: Math.floor(Math.random() * 15) + 5,
        enrolledStudents: 0
      };
      setCourses(prev => [...prev, newCourse]);
      appendAuditLog('Registered Academy Course', courseTitle);
      showAlert('Course Created', 'Published new learning curriculum successfully.', 'success');
    }

    setCourseTitle('');
    setCourseDesc('');
    setCourseDuration('8 Weeks Intensive');
    setCourseSyllabusInput('');
    setIsAddingCourse(false);
  };

  const startEditCourse = (c: Course) => {
    setEditingCourseId(c.id);
    setCourseTitle(c.title);
    setCourseClass(c.classLevel);
    setCourseDuration(c.duration);
    setCourseDesc(c.description);
    setCourseSyllabusInput(c.syllabus.join('\n'));
    setIsAddingCourse(true);
  };

  const deleteCourseConfirm = (c: Course) => {
    showAlert('Delete structural course?', `Are you sure you want to remove the course pipeline of: ${c.title}? All enrollments will terminate.`, 'danger', 'Delete Course', () => {
      setCourses(prev => prev.filter(item => item.id !== c.id));
      appendAuditLog('Withdrew Course offering', c.title);
      setCustomAlert(null);
    });
  };

  // -----------------------------------------------------
  // 4. STUDENT RECORDS REGISTRY
  // -----------------------------------------------------
  const [isAddingStudent, setIsAddingStudent] = useState(false);
  const [editingStudentId, setEditingStudentId] = useState<string | null>(null);

  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [studentPhone, setStudentPhone] = useState('');
  const [studentClass, setStudentClass] = useState<'Class 9' | 'Class 10' | 'Class 11' | 'Class 12'>('Class 12');
  const [studentRoll, setStudentRoll] = useState('');
  const [studentAttendance, setStudentAttendance] = useState(90);
  const [studentIsActive, setStudentIsActive] = useState(true);

  const handleCreateOrEditStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName || !studentEmail) {
      showAlert('Name and Email required', 'Provide credential properties to instantiate secure authorization parameters.', 'warning');
      return;
    }

    if (editingStudentId) {
      setStudents(prev => prev.map(s => {
        if (s.id === editingStudentId) {
          return {
            ...s,
            name: studentName,
            email: studentEmail,
            classLevel: studentClass,
            rollNumber: studentRoll || s.rollNumber,
            attendance: studentAttendance
          };
        }
        return s;
      }));
      appendAuditLog('Updated Profile properties', studentName);
      showAlert('Pupil metrics updated', `Modified statistics portfolio for ${studentName}.`, 'success');
      setEditingStudentId(null);
    } else {
      const classShort = studentClass === 'Class 12' ? '12' : studentClass === 'Class 11' ? '11' : studentClass === 'Class 10' ? '10' : '9';
      const randomCount = Math.floor(Math.random() * 9000) + 1000;
      const defaultRoll = `${classShort}-CS-${randomCount}`;

      const newStudent: Student = {
        id: 'stud_' + Math.random().toString(36).substring(2, 9),
        name: studentName,
        email: studentEmail,
        username: 'student_' + randomCount,
        role: 'student',
        classLevel: studentClass,
        rollNumber: studentRoll || defaultRoll,
        attendance: studentAttendance || 100,
        examResults: [
          { subject: 'Computer Applications', marksObtained: 80, totalMarks: 100, grade: 'B+' },
          { subject: 'Weekly Lab Evaluation', marksObtained: 46, totalMarks: 50, grade: 'A+' }
        ],
        assignmentsTrack: []
      };
      setStudents(prev => [...prev, newStudent]);
      appendAuditLog('Registered Student Matriculation', studentName);
      showAlert('Student Provisioned', `Authorized credential profile: username is ${newStudent.username}, password is student`, 'success');
    }

    setStudentName('');
    setStudentEmail('');
    setStudentPhone('');
    setStudentRoll('');
    setStudentAttendance(90);
    setIsAddingStudent(false);
  };

  const startEditStudent = (s: Student) => {
    setEditingStudentId(s.id);
    setStudentName(s.name);
    setStudentEmail(s.email);
    setStudentClass(s.classLevel);
    setStudentRoll(s.rollNumber);
    setStudentAttendance(s.attendance);
    setIsAddingStudent(true);
  };

  const deleteStudentConfirm = (s: Student) => {
    showAlert('Expel pupil record?', `Are you sure you want to revoke system clearance permissions for: ${s.name}?`, 'danger', 'Revoke Student', () => {
      setStudents(prev => prev.filter(item => item.id !== s.id));
      appendAuditLog('Expelled Pupil Credentials', s.name);
      setCustomAlert(null);
    });
  };

  const resetStudentPassword = (s: Student) => {
    showAlert('Reset Password?', `Overwrite account password parameter back to original preset 'student' for security diagnostics?`, 'info', 'Confirm Reset', () => {
      appendAuditLog('Injected Credentials Override', s.name);
      showAlert('Password Reset', `Security variables for ${s.name} set back to generic fallback successfully.`, 'success');
    });
  };

  // -----------------------------------------------------
  // 5. ASSIGNMENTS DISPATCH TAB
  // -----------------------------------------------------
  const [isCreatingAsg, setIsCreatingAsg] = useState(false);
  const [asgTitle, setAsgTitle] = useState('');
  const [asgClass, setAsgClass] = useState('Class 12');
  const [asgDueDate, setAsgDueDate] = useState('2026-06-30');
  const [asgMaxMarks, setAsgMaxMarks] = useState(100);

  const handleCreateAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!asgTitle) return;
    const newAsg = {
      id: 'asg_' + Math.random().toString(),
      title: asgTitle,
      classLevel: asgClass,
      dueDate: asgDueDate,
      totalMarks: asgMaxMarks,
      submissionsCount: 0,
      status: 'Active'
    };
    const nextArr = [...assignments, newAsg];
    setAssignments(nextArr);
    appendAuditLog('Assigned Homework Practical', asgTitle);
    showAlert('Homework Uploaded', `Assignment dispatched successfully to all ${asgClass} profiles.`, 'success');
    setAsgTitle('');
    setIsCreatingAsg(false);
  };

  const removeAssignment = (id: string, title: string) => {
    showAlert('Revoke Task?', `Delete assignment "${title}"?`, 'danger', 'Revoke Assignment', () => {
      setAssignments(prev => prev.filter(a => a.id !== id));
      appendAuditLog('Withdrew Homework Assignment', title);
      setCustomAlert(null);
    });
  };

  // -----------------------------------------------------
  // 6. ONLINE QUIZ GENERATOR TAB
  // -----------------------------------------------------
  const [isCreatingQuiz, setIsCreatingQuiz] = useState(false);
  const [qzTitle, setQzTitle] = useState('');
  const [qzClass, setQzClass] = useState('Class 12');
  const [qzMinutes, setQzMinutes] = useState(20);
  const [qzQuestionsPrompt, setQzQuestionsPrompt] = useState('1. Define Python dictionary syntax?\n2. What does RDBMS stand for?\n3. Explain relational schema mappings?');

  const handleCreateQuiz = (e: React.FormEvent) => {
    e.preventDefault();
    if (!qzTitle) return;
    const newQuiz = {
      id: 'qz_' + Math.random().toString(),
      title: qzTitle,
      classLevel: qzClass,
      timeLimitMin: qzMinutes,
      questionCount: qzQuestionsPrompt.split('\n').length || 3,
      active: true
    };
    setQuizzes([...quizzes, newQuiz]);
    appendAuditLog('Authorized MCQ Exam Schema', qzTitle);
    showAlert('Quiz Online', `Dispatched automated interactive test to: ${qzClass} student portals!`, 'success');
    setQzTitle('');
    setIsCreatingQuiz(false);
  };

  // -----------------------------------------------------
  // 7. ACTIVITY GALLERY CONFIG
  // -----------------------------------------------------
  const [galUrl, setGalUrl] = useState('');
  const [galTitle, setGalTitle] = useState('');
  const [galCat, setGalCat] = useState<'Workshops' | 'Classroom' | 'Achievements' | 'Activities'>('Activities');
  const [galType, setGalType] = useState<'image' | 'video'>('image');

  const handleCreateGalleryItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!galTitle || !galUrl) return;

    const newMedia: GalleryItem = {
      id: 'gal_' + Math.random().toString(36).substring(2, 9),
      url: galUrl,
      title: galTitle,
      category: galCat,
      type: galType
    };

    setGallery(prev => [...prev, newMedia]);
    appendAuditLog('Published Graphic media asset', galTitle);
    showAlert('Image Added', 'Activity uploaded successfully with responsive lazy load optimizations.', 'success');
    setGalTitle('');
    setGalUrl('');
  };

  // -----------------------------------------------------
  // 8. ACADEMIC REPORT CARD GENERATION
  // -----------------------------------------------------
  const [repName, setRepName] = useState('');
  const [repExam, setRepExam] = useState('Weekly CS Theory Mock Evaluation');
  const [repScore, setRepScore] = useState(88);
  const [repRoll, setRepRoll] = useState('12-CS-4512');
  const [repClass, setRepClass] = useState('Class 12');

  const handlePublishResult = (e: React.FormEvent) => {
    e.preventDefault();
    if (!repName || !repRoll) return;

    let calGrade = 'A';
    if (repScore >= 90) calGrade = 'A+';
    else if (repScore >= 80) calGrade = 'A';
    else if (repScore >= 70) calGrade = 'B+';
    else if (repScore >= 60) calGrade = 'B';
    else calGrade = 'C';

    const newResult = {
      studentName: repName,
      exam: repExam,
      classLevel: repClass,
      rollNumber: repRoll,
      score: Number(repScore),
      grade: calGrade,
      publishDate: new Date().toISOString().split('T')[0]
    };

    setResultsSheet([newResult, ...resultsSheet]);
    appendAuditLog('Authorized Grade report card card', repName);
    showAlert('Exam report dispatched', `Dispatched report details: Grade is ${calGrade}`, 'success');
    setRepName('');
  };

  // Render Section Selector Helper
  return (
    <div className="bg-slate-950 border border-slate-900 rounded-3xl overflow-hidden shadow-2xl relative" id="admin-dashboard-root">
      
      {/* Dynamic SweetAlert Alert Mockup overlay */}
      {customAlert && customAlert.show && (
        <div className="fixed inset-0 bg-slate-950/85 z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-[#0b1424] border border-brand-gold/30 rounded-2xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <div className="flex items-center gap-3">
              {customAlert.type === 'success' && <CheckCircle2 className="w-8 h-8 text-emerald-500 shrink-0" />}
              {customAlert.type === 'warning' && <AlertCircle className="w-8 h-8 text-amber-500 shrink-0" />}
              {customAlert.type === 'danger' && <UserX className="w-8 h-8 text-red-500 shrink-0" />}
              {customAlert.type === 'info' && <Info className="w-8 h-8 text-blue-400 shrink-0" />}
              <h4 className="text-base font-black text-white uppercase font-display tracking-tight">{customAlert.title}</h4>
            </div>
            
            <p className="text-xs text-slate-300 leading-relaxed font-mono">
              {customAlert.message}
            </p>

            <div className="flex gap-2 justify-end pt-2">
              <button
                onClick={() => setCustomAlert(null)}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 text-slate-300 rounded-xl text-xs font-mono border border-white/10 transition-colors"
              >
                Close
              </button>
              {customAlert.onAction && (
                <button
                  onClick={customAlert.onAction}
                  className={`px-4 py-2 rounded-xl text-xs font-bold text-slate-950 font-mono transition-colors ${
                    customAlert.type === 'danger' ? 'bg-red-500 hover:bg-red-650 text-white' : 'bg-brand-gold hover:bg-amber-500'
                  }`}
                >
                  {customAlert.actionLabel || 'Confirm'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main Container Layer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[50rem]">
        
        {/* Sidebar Component segments for Admin System Control Panel */}
        <div className="lg:col-span-3 bg-[#070e19] border-r border-slate-900 flex flex-col p-5 space-y-6">
          <div className="flex items-center gap-2 pb-5 border-b border-white/5">
            <div className="p-2.5 bg-brand-gold/20 rounded-xl">
              <Shield className="w-5 h-5 text-brand-gold" />
            </div>
            <div>
              <h3 className="font-bold font-display text-xs text-white uppercase tracking-wider">Faculty Console</h3>
              <p className="text-[9px] font-mono text-emerald-450 text-brand-gold">Authorised Agent: Mukesh Yadav</p>
            </div>
          </div>

          {/* Nav Items Link Stack */}
          <nav className="flex-1 space-y-1">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center justify-between p-3 rounded-xl transition-all font-mono text-xs ${
                activeTab === 'dashboard' ? 'bg-brand-gold/15 text-brand-gold font-bold border-l-4 border-brand-gold' : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <span className="flex items-center gap-2">
                <LayoutDashboard className="w-4 h-4" />
                Overview Dashboard
              </span>
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            </button>

            <button
              onClick={() => setActiveTab('materials')}
              className={`w-full flex items-center justify-between p-3 rounded-xl transition-all font-mono text-xs ${
                activeTab === 'materials' ? 'bg-brand-gold/15 text-brand-gold font-bold border-l-4 border-brand-gold' : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <span className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Study Files CRUD ({totalMaterials})
              </span>
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            </button>

            <button
              onClick={() => setActiveTab('notices')}
              className={`w-full flex items-center justify-between p-3 rounded-xl transition-all font-mono text-xs ${
                activeTab === 'notices' ? 'bg-brand-gold/15 text-brand-gold font-bold border-l-4 border-brand-gold' : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <span className="flex items-center gap-2">
                <Bell className="w-4 h-4" />
                Notice Bulletins ({totalNotices})
              </span>
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            </button>

            <button
              onClick={() => setActiveTab('courses')}
              className={`w-full flex items-center justify-between p-3 rounded-xl transition-all font-mono text-xs ${
                activeTab === 'courses' ? 'bg-brand-gold/15 text-brand-gold font-bold border-l-4 border-brand-gold' : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <span className="flex items-center gap-2">
                <Book className="w-4 h-4" />
                Syllabus & Courses ({totalCourses})
              </span>
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            </button>

            <button
              onClick={() => setActiveTab('students')}
              className={`w-full flex items-center justify-between p-3 rounded-xl transition-all font-mono text-xs ${
                activeTab === 'students' ? 'bg-brand-gold/15 text-brand-gold font-bold border-l-4 border-brand-gold' : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <span className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Student Database ({totalStudents})
              </span>
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            </button>

            <button
              onClick={() => setActiveTab('assignments')}
              className={`w-full flex items-center justify-between p-3 rounded-xl transition-all font-mono text-xs ${
                activeTab === 'assignments' ? 'bg-brand-gold/15 text-brand-gold font-bold border-l-4 border-brand-gold' : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <span className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Assignments Dispatch
              </span>
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            </button>

            <button
              onClick={() => setActiveTab('quizzes')}
              className={`w-full flex items-center justify-between p-3 rounded-xl transition-all font-mono text-xs ${
                activeTab === 'quizzes' ? 'bg-brand-gold/15 text-brand-gold font-bold border-l-4 border-brand-gold' : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <span className="flex items-center gap-2">
                <ListChecks className="w-4 h-4" />
                Interactive Quizzes
              </span>
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            </button>

            <button
              onClick={() => setActiveTab('gallery')}
              className={`w-full flex items-center justify-between p-3 rounded-xl transition-all font-mono text-xs ${
                activeTab === 'gallery' ? 'bg-brand-gold/15 text-brand-gold font-bold border-l-4 border-brand-gold' : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <span className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4" />
                Media Gallery ({totalGallery})
              </span>
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            </button>

            <button
              onClick={() => setActiveTab('results')}
              className={`w-full flex items-center justify-between p-3 rounded-xl transition-all font-mono text-xs ${
                activeTab === 'results' ? 'bg-brand-gold/15 text-brand-gold font-bold border-l-4 border-brand-gold' : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <span className="flex items-center gap-2">
                <Award className="w-4 h-4" />
                Exam Result Cards
              </span>
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center justify-between p-3 rounded-xl transition-all font-mono text-xs ${
                activeTab === 'settings' ? 'bg-brand-gold/15 text-brand-gold font-bold border-l-4 border-brand-gold' : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <span className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Website Core Settings
              </span>
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
            </button>
          </nav>

          {/* Secure Logout Segment */}
          <div className="pt-2 border-t border-white/5">
            <button
              onClick={() => {
                showAlert('End session?', 'Confirm that you wish to close this authorized admin viewport.', 'warning', 'Logout Session', handleLogout);
              }}
              className="w-full flex items-center gap-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 p-2.5 rounded-xl border border-red-500/10 text-xs font-mono font-bold transition-all justify-center"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sever admin session
            </button>
          </div>
        </div>

        {/* Dynamic Display Layout Container */}
        <div className="lg:col-span-9 p-6 sm:p-8 space-y-6 bg-slate-950 overflow-y-auto">
          
          {/* Header title strip of selected view tabs */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-white/5 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-black font-display text-white uppercase tracking-tight flex items-center gap-2">
                <span className="text-brand-gold">■</span> 
                {activeTab === 'dashboard' && 'Executive System Status'}
                {activeTab === 'materials' && 'Material Management Hub'}
                {activeTab === 'notices' && 'Notice Bulletin Board'}
                {activeTab === 'courses' && 'Academy Syllabus Portfolios'}
                {activeTab === 'students' && 'Authorized Pupils Registry'}
                {activeTab === 'assignments' && 'Assignments Dispatcher'}
                {activeTab === 'quizzes' && 'Interactive MCQ Generator'}
                {activeTab === 'gallery' && 'Graphic Media Gallery'}
                {activeTab === 'results' && 'Pupil Grade Publications'}
                {activeTab === 'settings' && 'Custom Site Configuration'}
              </h2>
              <p className="text-xs text-slate-400 font-mono mt-0.5">Authorized control portal for computerized curriculum systems.</p>
            </div>

            {/* Quick utility stats display */}
            <div className="bg-[#0c1626] border border-white/5 px-4 py-2 rounded-xl text-[11px] font-mono text-slate-400 shrink-0">
              Session Live Code: <span className="text-emerald-500 font-bold">● ONLINE</span>
            </div>
          </div>

          {/* =========================================================
              TAB: EXECUTIVE OVERVIEW DASHBOARD
              ========================================================= */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* Aggregated Quick Metrics cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 bg-slate-900 border border-white/5 rounded-2xl relative overflow-hidden">
                  <span className="text-[10px] font-mono text-slate-500 uppercase block font-bold">Total Pupils DB</span>
                  <span className="text-2xl font-black text-white block mt-1">{totalStudents}</span>
                  <div className="flex items-center gap-1.5 mt-2 text-[10px] text-brand-gold font-mono">
                    <UserPlus className="w-3.5 h-3.5 shrink-0" />
                    <span>Real-time admissions logs</span>
                  </div>
                </div>

                <div className="p-4 bg-slate-900 border border-white/5 rounded-2xl relative overflow-hidden">
                  <span className="text-[10px] font-mono text-slate-500 uppercase block font-bold">Material Files Count</span>
                  <span className="text-2xl font-black text-white block mt-1">{totalMaterials}</span>
                  <div className="flex items-center gap-1.5 mt-2 text-[10px] text-brand-gold font-mono">
                    <BookOpen className="w-3.5 h-3.5 shrink-0" />
                    <span>PDF / DOCX files loaded</span>
                  </div>
                </div>

                <div className="p-4 bg-slate-900 border border-white/5 rounded-2xl relative overflow-hidden">
                  <span className="text-[10px] font-mono text-slate-500 uppercase block font-bold">Curriculum Downloads</span>
                  <span className="text-2xl font-black text-brand-gold block mt-1">{totalDownloads}</span>
                  <div className="flex items-center gap-1.5 mt-2 text-[10px] text-emerald-400 font-mono">
                    <Download className="w-3.5 h-3.5 shrink-0" />
                    <span>Active student clicks</span>
                  </div>
                </div>

                <div className="p-4 bg-slate-900 border border-white/5 rounded-2xl relative overflow-hidden">
                  <span className="text-[10px] font-mono text-slate-500 uppercase block font-bold">System Hits Count</span>
                  <span className="text-2xl font-black text-white block mt-1">{websiteVisitors}</span>
                  <div className="flex items-center gap-1.5 mt-2 text-[10px] text-blue-400 font-mono">
                    <TrendingUp className="w-3.5 h-3.5 shrink-0" />
                    <span>Dynamic hit tracking index</span>
                  </div>
                </div>
              </div>

              {/* Chart.js Analytics Segment */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="p-5 bg-slate-900/60 rounded-2xl border border-white/10 space-y-3">
                  <h4 className="text-xs font-bold font-mono uppercase text-slate-300 flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4 text-brand-gold" />
                    Visitor Traffic & Resource Extraction Trend
                  </h4>
                  <div className="relative h-60 w-full flex items-center justify-center">
                    <canvas ref={chartRef1} className="w-full h-full max-h-[240px]"></canvas>
                  </div>
                </div>

                <div className="p-5 bg-slate-900/60 rounded-2xl border border-white/10 space-y-3">
                  <h4 className="text-xs font-bold font-mono uppercase text-slate-300 flex items-center gap-1.5">
                    <BarChart className="w-4 h-4 text-brand-gold" />
                    Most Demanded Syllabus Assets
                  </h4>
                  <div className="relative h-60 w-full flex items-center justify-center">
                    <canvas ref={chartRef2} className="w-full h-full max-h-[240px]"></canvas>
                  </div>
                </div>
              </div>

              {/* Recent Active Audit Logging logs & Popular Views metrics */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Recent Activities with dynamic status logs */}
                <div className="lg:col-span-12 p-5 bg-slate-900/40 rounded-2xl border border-white/5 space-y-3">
                  <div className="flex items-center justify-between border-b border-white/5 pb-2">
                    <h4 className="text-xs font-mono uppercase font-bold text-white flex items-center gap-2">
                      <Clock className="w-4 h-4 text-brand-gold" />
                      Recent Admin Operations Audit Trace
                    </h4>
                    <span className="text-[10px] font-mono text-slate-500">Authorized session activities logging</span>
                  </div>

                  <div className="space-y-2">
                    {recentActivitiesList.map((log) => (
                      <div key={log.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 bg-slate-950/60 border border-white/5 rounded-xl gap-2 text-xs font-mono">
                        <div className="flex items-center gap-2.5">
                          <div className="w-2 h-2 rounded-full bg-brand-gold animate-ping"></div>
                          <span className="text-slate-300 font-bold">{log.action}:</span>
                          <span className="text-amber-300">{log.target}</span>
                        </div>
                        <div className="flex items-center gap-3 text-[11px] text-slate-400">
                          <span>User: {log.user}</span>
                          <span className="text-slate-500">{log.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* =========================================================
              TAB: MATERIAL MANAGEMENT CRUD
              ========================================================= */}
          {activeTab === 'materials' && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* Toolbar Actions */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-900/40 p-4 rounded-2xl border border-white/5">
                <div className="flex flex-1 gap-2">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                    <input
                      type="text"
                      className="w-full bg-slate-950 border border-white/10 rounded-xl py-2 pl-9 pr-4 text-xs text-white uppercase tracking-wider focus:outline-none focus:border-brand-gold"
                      placeholder="Search items by name"
                      value={searchQueryMat}
                      onChange={(e) => setSearchQueryMat(e.target.value)}
                    />
                  </div>

                  <select
                    className="bg-slate-950 border border-white/10 text-xs rounded-xl px-3 text-white"
                    value={classFilterMat}
                    onChange={(e) => setClassFilterMat(e.target.value)}
                  >
                    <option value="All">All classes</option>
                    <option value="Class 9">Class 9</option>
                    <option value="Class 10">Class 10</option>
                    <option value="Class 11">Class 11</option>
                    <option value="Class 12">Class 12</option>
                    <option value="Programming">Programming</option>
                  </select>
                </div>

                <button
                  onClick={() => {
                    setEditingMatId(null);
                    setMatTitle('');
                    setMatFileName('');
                    setMatFileSize('');
                    setIsUploadingMat(!isUploadingMat);
                  }}
                  className="flex items-center justify-center gap-1.5 bg-brand-gold hover:bg-amber-500 text-slate-950 text-xs font-bold font-mono py-2.5 px-4 rounded-xl transition-all"
                >
                  {isUploadingMat ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  {isUploadingMat ? 'Close form' : 'Publish novel document'}
                </button>
              </div>

              {/* Uploading Material Form panel */}
              {isUploadingMat && (
                <form onSubmit={handleCreateOrEditMaterial} className="p-5 bg-slate-900 border border-brand-gold/30 rounded-2xl space-y-4 animate-fadeIn">
                  <h3 className="text-xs font-bold font-mono tracking-widest text-[#D4AF37] uppercase">
                    {editingMatId ? 'Optimise study material coordinates' : 'Deploy academic document file'}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-mono text-slate-400 block mb-1">Title display description:</label>
                      <input
                        type="text"
                        required
                        className="w-full bg-slate-950 border border-white/10 p-2.5 rounded-lg text-xs text-white"
                        placeholder="e.g. Chapter 4 database SQL subqueries solutions"
                        value={matTitle}
                        onChange={(e) => setMatTitle(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-mono text-slate-400 block mb-1 font-bold">Material category classification:</label>
                      <select
                        className="w-full bg-slate-950 border border-white/10 p-2.5 rounded-lg text-xs text-white"
                        value={matCategory}
                        onChange={(e: any) => setMatCategory(e.target.value)}
                      >
                        <option value="Notes">Notes (PDF)</option>
                        <option value="Assignments">Assignments</option>
                        <option value="Practicals">Practical Manual</option>
                        <option value="Question Papers">Past Question Papers</option>
                        <option value="Model Sets">Model Sets</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-[10px] font-mono text-slate-400 block mb-1">Target Academic Class:</label>
                      <select
                        className="w-full bg-slate-950 border border-white/10 p-2.5 rounded-lg text-xs text-white"
                        value={matClass}
                        onChange={(e: any) => setMatClass(e.target.value)}
                      >
                        <option value="Class 9">Class 9 Computer</option>
                        <option value="Class 10">Class 10 Applications</option>
                        <option value="Class 11">Class 11 Science</option>
                        <option value="Class 12">Class 12 Science</option>
                        <option value="Programming">Programming modules</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] font-mono text-slate-400 block mb-1">Simulated filename:</label>
                      <input
                        type="text"
                        required
                        className="w-full bg-slate-950 border border-white/10 p-2.5 rounded-lg text-xs text-white"
                        placeholder="Class12_Notes_SQL.pdf"
                        value={matFileName}
                        onChange={(e) => setMatFileName(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-mono text-slate-400 block mb-1">Simulated File size:</label>
                      <input
                        type="text"
                        className="w-full bg-slate-950 border border-white/10 p-2.5 rounded-lg text-xs text-white"
                        placeholder="e.g. 1.8 MB"
                        value={matFileSize}
                        onChange={(e) => setMatFileSize(e.target.value)}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-brand-gold hover:bg-amber-500 text-slate-950 font-black text-xs uppercase p-3 rounded-xl tracking-widest transition-all"
                  >
                    {editingMatId ? 'Finalise record edit actions' : 'Upload document and deploy on board'}
                  </button>
                </form>
              )}

              {/* Data Table representing uploaded educational materials */}
              <div className="bg-slate-900 border border-white/5 rounded-2xl overflow-hidden">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-white/5 border-b border-white/5 text-[10px] font-mono text-slate-400 uppercase">
                      <th className="p-4 font-bold">Document Title</th>
                      <th className="p-4 font-bold">Class Level</th>
                      <th className="p-4 font-bold">Category Category</th>
                      <th className="p-4 font-bold">File Specifications</th>
                      <th className="p-4 font-bold text-center">Downloads Extract</th>
                      <th className="p-4 font-bold text-right">Administrative operations</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {materials
                      .filter(m => {
                        const matchesSearch = m.title.toLowerCase().includes(searchQueryMat.toLowerCase());
                        const matchesClass = classFilterMat === 'All' || m.classLevel === classFilterMat;
                        return matchesSearch && matchesClass;
                      })
                      .map((m) => (
                        <tr key={m.id} className="hover:bg-white/5 transition-colors">
                          <td className="p-4">
                            <span className="block font-semibold text-white">{m.title}</span>
                            <span className="block text-[10px] font-mono text-slate-500 mt-0.5">{m.fileName}</span>
                          </td>
                          <td className="p-4">
                            <span className="px-2 py-0.5 bg-brand-gold/10 text-brand-gold rounded text-[10px] font-mono">{m.classLevel}</span>
                          </td>
                          <td className="p-4">
                            <span className="text-slate-300 font-mono">{m.category}</span>
                          </td>
                          <td className="p-4 text-slate-400 font-mono text-[11px]">{m.fileSize}</td>
                          <td className="p-4 text-center font-bold text-white font-mono">{m.downloadCount} downloads</td>
                          <td className="p-4 text-right">
                            <div className="flex items-center justify-end gap-2 text-slate-400">
                              <button
                                onClick={() => startEditMaterial(m)}
                                className="p-1.5 hover:text-white bg-white/5 rounded hover:bg-white/10"
                                title="Edit Material"
                              >
                                <Edit className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => deleteMaterialConfirm(m)}
                                className="p-1.5 text-red-400 hover:text-white bg-red-500/10 hover:bg-red-500/25 rounded"
                                title="Delete Material"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* =========================================================
              TAB: NOTICE BOARD CRUD
              ========================================================= */}
          {activeTab === 'notices' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">Active bulletin announcements deployed: {totalNotices}</span>
                <button
                  onClick={() => {
                    setEditingNoticeId(null);
                    setNoticeTitle('');
                    setNoticeContent('');
                    setIsAddingNotice(!isAddingNotice);
                  }}
                  className="flex items-center gap-1.5 bg-brand-gold hover:bg-amber-500 text-slate-950 text-xs font-bold font-mono py-2 px-3 rounded-xl transition-all"
                >
                  {isAddingNotice ? <X className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  {isAddingNotice ? 'Close Form' : 'Publish New Notice Item'}
                </button>
              </div>

              {isAddingNotice && (
                <form onSubmit={handleCreateOrEditNotice} className="p-5 bg-slate-900 border border-brand-gold/30 rounded-2xl space-y-4 animate-fadeIn">
                  <h4 className="text-xs font-bold font-mono text-brand-gold uppercase">
                    {editingNoticeId ? 'Edit Existing bulletin Board entry' : 'Publish novel bulletin notice'}
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2">
                      <label className="text-[10px] font-mono text-slate-400 block mb-1">Notice Headline:</label>
                      <input
                        type="text"
                        required
                        className="w-full bg-slate-950 border border-white/10 p-2.5 rounded-lg text-xs text-white"
                        placeholder="e.g. Half-yearly practical evaluation board schema"
                        value={noticeTitle}
                        onChange={(e) => setNoticeTitle(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-mono text-slate-400 block mb-1">Classification Type:</label>
                      <select
                        className="w-full bg-slate-950 border border-white/10 p-2.5 rounded-lg text-xs text-white"
                        value={noticeCategory}
                        onChange={(e: any) => setNoticeCategory(e.target.value)}
                      >
                        <option value="General">General announcement</option>
                        <option value="Exam">Exam Schedule</option>
                        <option value="Assignment">Assignment Notice</option>
                        <option value="Event">Academy Event</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-mono text-slate-400 block mb-1 font-bold">Body content description:</label>
                    <textarea
                      required
                      rows={4}
                      className="w-full bg-slate-950 border border-white/10 p-2.5 rounded-lg text-xs text-white"
                      placeholder="Details including schedule timings, prerequisites file structures..."
                      value={noticeContent}
                      onChange={(e) => setNoticeContent(e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-[10px] font-mono text-slate-400 block mb-1">Publication Date:</label>
                      <input
                        type="date"
                        className="w-full bg-slate-950 border border-white/10 p-2.5 rounded-lg text-xs text-slate-300 font-mono"
                        value={noticeSchedule}
                        onChange={(e) => setNoticeSchedule(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-mono text-slate-400 block mb-1">Expiry Dismissal Date:</label>
                      <input
                        type="date"
                        className="w-full bg-slate-950 border border-white/10 p-2.5 rounded-lg text-xs text-slate-300 font-mono"
                        value={noticeExpiry}
                        onChange={(e) => setNoticeExpiry(e.target.value)}
                      />
                    </div>
                    <div className="flex items-center pt-5 pl-2">
                      <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer select-none font-mono">
                        <input
                          type="checkbox"
                          checked={noticePinned}
                          onChange={(e) => setNoticePinned(e.target.checked)}
                          className="w-4 h-4 bg-slate-950 border border-white/10 accent-brand-gold rounded"
                        />
                        Pin priority top bulletin
                      </label>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-brand-gold hover:bg-amber-500 text-slate-950 text-xs font-black uppercase p-3 rounded-xl tracking-widest"
                  >
                    {editingNoticeId ? 'Save broadcast enhancements' : 'Deploy board announcement'}
                  </button>
                </form>
              )}

              <div className="space-y-3">
                {notices.map((n) => (
                  <div key={n.id} className="p-4 bg-slate-900 border border-white/5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-2">
                        {n.isPinned && (
                          <span className="bg-brand-gold text-slate-950 text-[9px] font-black tracking-widest px-1.5 py-0.5 rounded font-mono uppercase">
                            PINNED
                          </span>
                        )}
                        <span className="text-[10px] font-mono uppercase bg-slate-800 text-slate-400 px-2 py-0.5 rounded">
                          {n.category}
                        </span>
                        <span className="text-[10px] font-mono text-slate-500">{n.date}</span>
                      </div>
                      <h4 className="text-sm font-bold text-white">{n.title}</h4>
                      <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed font-mono">{n.content}</p>
                    </div>

                    <div className="flex gap-2 shrink-0 self-end sm:self-center">
                      <button
                        onClick={() => startEditNotice(n)}
                        className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-white rounded-lg text-xs font-mono"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteNoticeConfirm(n)}
                        className="px-3 py-1.5 bg-red-500/10 hover:bg-red-550 hover:text-white text-red-400 rounded-lg text-xs font-mono"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =========================================================
              TAB: COURSES MODULE
              ========================================================= */}
          {activeTab === 'courses' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">Total educational pathways: {totalCourses}</span>
                <button
                  onClick={() => {
                    setEditingCourseId(null);
                    setCourseTitle('');
                    setCourseDesc('');
                    setIsAddingCourse(!isAddingCourse);
                  }}
                  className="flex items-center gap-1 bg-brand-gold hover:bg-amber-500 text-slate-950 text-xs font-bold font-mono py-2 px-3 rounded-xl"
                >
                  {isAddingCourse ? <X className="w-4.5 h-4.5" /> : <Plus className="w-4.5 h-4.5" />}
                  {isAddingCourse ? 'Hide registration panel' : 'Add curriculum profile'}
                </button>
              </div>

              {isAddingCourse && (
                <form onSubmit={handleCreateOrEditCourse} className="p-5 bg-slate-900 border border-brand-gold/30 rounded-2xl space-y-4">
                  <h4 className="text-xs font-bold font-mono uppercase text-brand-gold">
                    {editingCourseId ? 'Optimize academy level course config' : 'Register Academy Course pipeline'}
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-mono text-slate-400 block mb-1">Course Title:</label>
                      <input
                        type="text"
                        required
                        className="w-full bg-slate-950 border border-white/10 p-2.5 rounded-lg text-xs text-white shadow-inner"
                        placeholder="e.g. Node Express backend software engineer fundamentals"
                        value={courseTitle}
                        onChange={(e) => setCourseTitle(e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] font-mono text-slate-400 block mb-1">Duration limits:</label>
                        <input
                          type="text"
                          required
                          className="w-full bg-slate-950 border border-white/10 p-2.5 rounded-lg text-xs text-white"
                          placeholder="e.g. 10 Weeks bootcamp"
                          value={courseDuration}
                          onChange={(e) => setCourseDuration(e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-mono text-slate-400 block mb-1">Classroom bracket:</label>
                        <select
                          className="w-full bg-slate-950 border border-white/10 p-2.5 rounded-lg text-xs text-white"
                          value={courseClass}
                          onChange={(e) => setCourseClass(e.target.value)}
                        >
                          <option value="Class 9">Class 9 Computer</option>
                          <option value="Class 10">Class 10 Apps</option>
                          <option value="Class 11">Class 11 Python</option>
                          <option value="Class 12">Class 12 Advanced</option>
                          <option value="Programming">Programming Essentials</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-mono text-slate-400 block mb-1">Brief Description:</label>
                    <textarea
                      required
                      rows={2}
                      className="w-full bg-slate-950 border border-white/10 p-2.5 rounded-lg text-xs text-white"
                      placeholder="Explain objectives, goals..."
                      value={courseDesc}
                      onChange={(e) => setCourseDesc(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono text-slate-400 block mb-1 uppercase font-bold">Comprehensive syllabus timeline modules (one syllabus block per line):</label>
                    <textarea
                      rows={5}
                      className="w-full bg-slate-950 border border-white/10 p-2.5 rounded-lg text-xs text-brand-gold font-mono"
                      placeholder="Week 1: Foundations of Database Structures&#10;Week 2: Advanced Outer & Inner JOINS queries&#10;Week 3: Practical database Normalization drills"
                      value={courseSyllabusInput}
                      onChange={(e) => setCourseSyllabusInput(e.target.value)}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-brand-gold hover:bg-amber-500 text-slate-950 text-xs font-black p-3.5 rounded-xl uppercase tracking-widest"
                  >
                    {editingCourseId ? 'Save Course Improvements' : 'Add Course Live'}
                  </button>
                </form>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {courses.map((course) => (
                  <div key={course.id} className="p-4 bg-slate-900 border border-white/5 rounded-2xl flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-mono bg-[#D4AF37]/10 text-[#D4AF37] px-2 py-0.5 rounded uppercase">
                          {course.classLevel}
                        </span>
                        <span className="text-[10px] font-mono text-slate-500">{course.duration}</span>
                      </div>
                      <h4 className="text-sm font-bold text-white leading-snug">{course.title}</h4>
                      <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed font-mono">{course.description}</p>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-white/5">
                      <div className="text-[10px] text-slate-500 font-mono flex justify-between">
                        <span>Syllabus Parts: {course.syllabus.length} Weeks</span>
                        <span>Active Scholars: {course.enrolledStudents} registered</span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => startEditCourse(course)}
                          className="flex-1 bg-white/5 hover:bg-white/10 text-white py-1.5 rounded-lg text-xs font-mono text-center"
                        >
                          Details Config
                        </button>
                        <button
                          onClick={() => deleteCourseConfirm(course)}
                          className="px-3 bg-red-400/10 hover:bg-red-500 text-red-500 hover:text-white rounded-lg text-xs"
                          title="Revoke Course registration"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =========================================================
              TAB: STUDENT RECORDS MANAGEMENT
              ========================================================= */}
          {activeTab === 'students' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">Total monitored students: {totalStudents}</span>
                <button
                  onClick={() => {
                    setEditingStudentId(null);
                    setStudentName('');
                    setStudentEmail('');
                    setStudentRoll('');
                    setIsAddingStudent(!isAddingStudent);
                  }}
                  className="flex items-center gap-1 bg-brand-gold hover:bg-amber-500 text-slate-950 text-xs font-bold font-mono py-2 px-3 rounded-xl"
                >
                  {isAddingStudent ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  {isAddingStudent ? 'Discard form' : 'Register New Student Profile'}
                </button>
              </div>

              {isAddingStudent && (
                <form onSubmit={handleCreateOrEditStudent} className="p-5 bg-slate-900 border border-brand-gold/30 rounded-2xl space-y-4">
                  <h4 className="text-xs font-bold font-mono uppercase text-brand-gold">
                    {editingStudentId ? 'Refine student academic data' : 'Enroll novel pupil profile'}
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-mono text-slate-400 block mb-1">Full Student Name:</label>
                      <input
                        type="text"
                        required
                        className="w-full bg-slate-950 border border-white/10 p-2.5 rounded-lg text-xs text-white"
                        placeholder="e.g. Ramesh Kumar Yadav"
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-mono text-slate-400 block mb-1 font-bold">Email Registration Address:</label>
                      <input
                        type="email"
                        required
                        className="w-full bg-slate-950 border border-white/10 p-2.5 rounded-lg text-xs text-white"
                        placeholder="ramesh@durga.edu.np"
                        value={studentEmail}
                        onChange={(e) => setStudentEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-[10px] font-mono text-slate-400 block mb-1">Standard Academic Class:</label>
                      <select
                        className="w-full bg-slate-950 border border-white/10 p-2.5 rounded-lg text-xs text-white"
                        value={studentClass}
                        onChange={(e: any) => setStudentClass(e.target.value)}
                      >
                        <option value="Class 9">Class 9 Computer Sci</option>
                        <option value="Class 10">Class 10 Applications</option>
                        <option value="Class 11">Class 11 Python Course</option>
                        <option value="Class 12">Class 12 Board Prep</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] font-mono text-slate-400 block mb-1">Standard Roll Number (Optional):</label>
                      <input
                        type="text"
                        className="w-full bg-slate-950 border border-white/10 p-2.5 rounded-lg text-xs text-white"
                        placeholder="e.g. 12-CS-4512"
                        value={studentRoll}
                        onChange={(e) => setStudentRoll(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-mono text-slate-400 block mb-1">Overall Attendance percentage (%):</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        className="w-full bg-slate-950 border border-white/10 p-2.5 rounded-lg text-xs text-white"
                        value={studentAttendance}
                        onChange={(e) => setStudentAttendance(Number(e.target.value))}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-brand-gold hover:bg-amber-500 text-slate-950 text-xs font-black uppercase p-3 rounded-xl"
                  >
                    {editingStudentId ? 'Finalize profile modifications' : 'Complete enrollment credential dispatch'}
                  </button>
                </form>
              )}

              {/* Grid representation list of students with actions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {students.map((student) => (
                  <div key={student.id} className="p-4 bg-slate-900 border border-white/5 rounded-2xl space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-white uppercase text-xs">{student.name}</h4>
                        <span className="text-[10px] font-mono text-slate-500 block">{student.email}</span>
                      </div>
                      <span className="text-[9px] font-mono bg-[#D4AF37]/15 text-[#D4AF37] border border-brand-gold/30 px-2 py-0.5 rounded">
                        {student.classLevel} &bull; Roll: {student.rollNumber}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center text-[11px] font-mono border-t border-b border-white/5 py-2.5">
                      <div>
                        <span className="text-slate-500 block text-[9px] uppercase">Attendance</span>
                        <span className="text-white font-bold">{student.attendance}%</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[9px] uppercase font-bold">Enrolled ID</span>
                        <span className="text-slate-300 font-bold max-w-[80px] truncate block mx-auto">{student.username}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[9px] uppercase font-bold">Module Clearance</span>
                        <span className="text-brand-gold font-bold">Approved</span>
                      </div>
                    </div>

                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={() => startEditStudent(student)}
                        className="px-2.5 py-1.5 bg-white/5 hover:bg-white/10 text-white rounded text-[10px] font-mono"
                        title="Edit Details"
                      >
                        Edit Profile
                      </button>
                      <button
                        onClick={() => resetStudentPassword(student)}
                        className="px-2.5 py-1.5 bg-blue-500/10 hover:bg-blue-500/25 text-blue-400 rounded text-[10px] font-mono"
                        title="Reset Account Password"
                      >
                        Reset PW
                      </button>
                      <button
                        onClick={() => deleteStudentConfirm(student)}
                        className="px-2.5 py-1.5 bg-red-400/10 hover:bg-red-500 text-red-500 hover:text-white rounded text-[10px] font-mono"
                        title="Deactivate Scholar clearance"
                      >
                        Revoke Profile
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =========================================================
              TAB: ASSIGNMENT DISPATCH TAB
              ========================================================= */}
          {activeTab === 'assignments' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">Total assigned homework models: {assignments.length}</span>
                <button
                  onClick={() => setIsCreatingAsg(!isCreatingAsg)}
                  className="flex items-center gap-1 bg-brand-gold hover:bg-amber-500 text-slate-950 text-xs font-bold font-mono py-2 px-3 rounded-xl"
                >
                  {isCreatingAsg ? 'Close Editor' : 'Dispatch Homework Assignment'}
                </button>
              </div>

              {isCreatingAsg && (
                <form onSubmit={handleCreateAssignment} className="p-5 bg-slate-900 border border-brand-gold/20 rounded-2xl space-y-4">
                  <h4 className="text-xs font-mono uppercase text-brand-gold font-bold">Deploy Assignment Instructions</h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-mono text-slate-400 block mb-1">Homework Assignment Title:</label>
                      <input
                        type="text"
                        required
                        className="w-full bg-slate-950 border border-white/10 p-2.5 rounded-lg text-xs text-white"
                        placeholder="e.g. Big-O Algorithmic complexity numericals"
                        value={asgTitle}
                        onChange={(e) => setAsgTitle(e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="col-span-1">
                        <label className="text-[10px] font-mono text-slate-400 block mb-1 font-bold">Class level:</label>
                        <select
                          className="w-full bg-slate-950 border border-white/10 p-2.5 rounded-lg text-xs text-white"
                          value={asgClass}
                          onChange={(e) => setAsgClass(e.target.value)}
                        >
                          <option value="Class 9">9</option>
                          <option value="Class 10">10</option>
                          <option value="Class 11">11</option>
                          <option value="Class 12">12</option>
                        </select>
                      </div>
                      <div className="col-span-1">
                        <label className="text-[10px] font-mono text-slate-400 block mb-1">Max Score points:</label>
                        <input
                          type="number"
                          className="w-full bg-slate-950 border border-white/10 p-2.5 rounded-lg text-xs text-white"
                          value={asgMaxMarks}
                          onChange={(e) => setAsgMaxMarks(Number(e.target.value))}
                        />
                      </div>
                      <div className="col-span-1">
                        <label className="text-[10px] font-mono text-slate-400 block mb-1">Due Date:</label>
                        <input
                          type="date"
                          className="w-full bg-slate-950 border border-white/10 p-2 text-xs text-white text-brand-gold rounded-lg font-mono"
                          value={asgDueDate}
                          onChange={(e) => setAsgDueDate(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#D4AF37] hover:bg-amber-500 text-slate-950 text-xs font-black p-3 rounded-xl uppercase tracking-widest"
                  >
                    Publish assignment metrics
                  </button>
                </form>
              )}

              <div className="bg-slate-900 border border-white/5 rounded-2xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-white/5 text-[10px] font-mono text-slate-400 uppercase">
                    <tr>
                      <th className="p-4">Assigned Homework Project</th>
                      <th className="p-4">Standard Level</th>
                      <th className="p-4">Due Date Limit</th>
                      <th className="p-4 text-center">Score Marks Weight</th>
                      <th className="p-4 text-center">Submissions Count</th>
                      <th className="p-4 text-right">Clearance Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {assignments.map(a => (
                      <tr key={a.id} className="hover:bg-white/5 transition-colors">
                        <td className="p-4 font-bold text-white">{a.title}</td>
                        <td className="p-4">
                          <span className="bg-brand-gold/10 text-brand-gold px-2 py-0.5 rounded text-[10px] font-mono">{a.classLevel}</span>
                        </td>
                        <td className="p-4 text-slate-300 font-mono">{a.dueDate}</td>
                        <td className="p-4 text-center text-slate-400 font-mono">{a.totalMarks} Marks</td>
                        <td className="p-4 text-center text-emerald-400 font-mono font-bold">{a.submissionsCount} Submits</td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => removeAssignment(a.id, a.title)}
                            className="p-1 text-red-500 hover:text-white hover:bg-red-500/20 rounded"
                            title="Withdraw homework assignment description file"
                          >
                            <Trash className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* =========================================================
              TAB: ONLINE QUIZ MANAGEMENT
              ========================================================= */}
          {activeTab === 'quizzes' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">Total Interactive MCQ exams published: {quizzes.length}</span>
                <button
                  onClick={() => setIsCreatingQuiz(!isCreatingQuiz)}
                  className="flex items-center gap-1 bg-brand-gold hover:bg-amber-500 text-slate-950 text-xs font-bold font-mono py-2 px-3 rounded-xl"
                >
                  {isCreatingQuiz ? 'Close Generator' : 'Disrupt New Quiz test'}
                </button>
              </div>

              {isCreatingQuiz && (
                <form onSubmit={handleCreateQuiz} className="p-4 bg-slate-900 border border-brand-gold/20 rounded-xl space-y-4">
                  <h4 className="text-xs font-mono uppercase text-brand-gold font-bold">Auto Evaluated MCQ Quiz designer</h4>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2">
                      <label className="text-[10px] font-mono text-slate-400 block mb-1">Quiz Topic Name:</label>
                      <input
                        type="text"
                        required
                        className="w-full bg-slate-950 border border-white/10 p-2.5 rounded-lg text-xs text-white"
                        placeholder="e.g. Python collection types quiz"
                        value={qzTitle}
                        onChange={(e) => setQzTitle(e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] font-mono text-slate-400 block mb-1 font-bold">Standard Class:</label>
                        <select
                          className="w-full bg-slate-950 border border-white/10 p-2.5 rounded-lg text-xs text-white select-none"
                          value={qzClass}
                          onChange={(e) => setQzClass(e.target.value)}
                        >
                          <option value="Class 9">9</option>
                          <option value="Class 10">10</option>
                          <option value="Class 11">11</option>
                          <option value="Class 12">12</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[10px] font-mono text-slate-400 block mb-1">Time limits (min):</label>
                        <input
                          type="number"
                          className="w-full bg-slate-950 border border-white/10 p-2.5 rounded-lg text-xs text-white"
                          value={qzMinutes}
                          onChange={(e) => setQzMinutes(Number(e.target.value))}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-mono text-slate-400 block mb-1 uppercase font-bold">Incorporate MCQ Questions (one query statement prompt block per line):</label>
                    <textarea
                      rows={4}
                      className="w-full bg-slate-950 border border-white/10 p-2.5 rounded-lg text-xs text-brand-gold font-mono"
                      value={qzQuestionsPrompt}
                      onChange={(e) => setQzQuestionsPrompt(e.target.value)}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#D4AF37] hover:bg-amber-500 text-slate-950 text-xs font-black p-3 rounded-xl uppercase tracking-widest"
                  >
                    Dispatch MCQ test and live publish
                  </button>
                </form>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {quizzes.map(q => (
                  <div key={q.id} className="p-4 bg-slate-900 border border-white/5 rounded-2xl relative space-y-3 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center text-[10px] font-mono text-slate-500">
                        <span>{q.classLevel}</span>
                        <span>{q.timeLimitMin} Minutes Limit</span>
                      </div>
                      <h4 className="text-sm font-bold text-white mt-2 mb-1">{q.title}</h4>
                      <span className="text-[10px] font-mono text-brand-gold bg-[#D4AF37]/10 px-2 py-0.5 rounded">
                        {q.questionCount} Questions Compiled
                      </span>
                    </div>

                    <div className="flex gap-2 pt-2 border-t border-white/5 items-center justify-between">
                      <span className="text-[10px] font-mono text-emerald-450 text-[#D4AF37]">ClearanceStatus: DISPATCHED</span>
                      <button
                        onClick={() => {
                          setQuizzes(quizzes.filter(item => item.id !== q.id));
                          appendAuditLog('Removed Exam MCQ template', q.title);
                          showToast('Archived Quiz template file');
                        }}
                        className="p-1 px-2.5 bg-red-400/10 hover:bg-red-500 text-red-500 hover:text-white rounded text-[10px] font-mono"
                      >
                        Revoke Live
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =========================================================
              TAB: WEBCAM GALLERY SETTINGS
              ========================================================= */}
          {activeTab === 'gallery' && (
            <div className="space-y-6 animate-fadeIn">
              <form onSubmit={handleCreateGalleryItem} className="p-5 bg-slate-900 border border-white/5 rounded-2xl space-y-4">
                <h4 className="text-xs font-mono uppercase text-brand-gold font-bold">Publish photograph asset on academic landing slideshow</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-mono text-slate-400 block mb-1">Image URL parameter:</label>
                    <input
                      type="text"
                      required
                      className="w-full bg-slate-950 border border-white/10 p-2.5 rounded-lg text-xs text-white"
                      placeholder="e.g. https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2"
                      value={galUrl}
                      onChange={(e) => setGalUrl(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono text-slate-400 block mb-1">Alternative Photo caption caption:</label>
                    <input
                      type="text"
                      required
                      className="w-full bg-slate-950 border border-white/10 p-2.5 rounded-lg text-xs text-white"
                      placeholder="Students analyzing database loops with Mukesh Sir"
                      value={galTitle}
                      onChange={(e) => setGalTitle(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-mono text-slate-400 block mb-1 font-bold">Event Category:</label>
                    <select
                      className="w-full bg-slate-950 border border-white/10 p-2.5 rounded-lg text-xs text-white"
                      value={galCat}
                      onChange={(e: any) => setGalCat(e.target.value)}
                    >
                      <option value="Workshops">Workshops seminar</option>
                      <option value="Classroom">Classroom Lab work</option>
                      <option value="Achievements">Achievements Prize won</option>
                      <option value="Activities">General CS Club activity</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-mono text-slate-400 block mb-1">Media Type format:</label>
                    <select
                      className="w-full bg-slate-950 border border-white/10 p-2.5 rounded-lg text-xs text-white"
                      value={galType}
                      onChange={(e: any) => setGalType(e.target.value)}
                    >
                      <option value="image">Still Graphic Photograph (JPG/PNG)</option>
                      <option value="video">Dynamic Video sequence (MP4)</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-brand-gold hover:bg-amber-500 text-slate-950 text-xs font-black py-3 rounded-xl uppercase tracking-wider"
                >
                  Upload media asset live
                </button>
              </form>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {gallery.map(g => (
                  <div key={g.id} className="bg-slate-900 border border-white/5 rounded-xl overflow-hidden relative group">
                    <img src={g.url} alt={g.title} className="w-full h-24 object-cover group-hover:scale-105 transition-transform duration-300 referrer-no" referrerPolicy="no-referrer" />
                    <div className="p-2 space-y-1">
                      <span className="text-[9px] font-mono text-slate-500 uppercase">{g.category}</span>
                      <h4 className="text-[10px] font-bold text-white truncate leading-tight">{g.title}</h4>
                      <button
                        onClick={() => {
                          setGallery(gallery.filter(item => item.id !== g.id));
                          appendAuditLog('Removed media item from view', g.title);
                          showToast('Archived gallery files from storage');
                        }}
                        className="w-full bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white py-1 rounded text-[9px] font-mono mt-1"
                      >
                        Remove Asset
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =========================================================
              TAB: RESULTS FILE LOADS & REPORT CARDS
              ========================================================= */}
          {activeTab === 'results' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fadeIn">
                
                {/* Form to insert grades */}
                <form onSubmit={handlePublishResult} className="lg:col-span-5 p-5 bg-slate-900 border border-white/5 rounded-2xl space-y-4 h-fit">
                  <h4 className="text-xs font-mono uppercase text-brand-gold font-black">Publish exam Grade report cards</h4>

                  <div>
                    <label className="text-[10px] font-mono text-slate-400 block mb-1">Student Complete Name:</label>
                    <input
                      type="text"
                      required
                      className="w-full bg-slate-950 border border-white/10 p-2.5 rounded-lg text-xs text-white"
                      placeholder="e.g. Priyanka Patel"
                      value={repName}
                      onChange={(e) => setRepName(e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] font-mono text-slate-400 block mb-1">Academic Class Level:</label>
                      <select
                        className="w-full bg-slate-950 border border-white/10 p-2 mt-0.5 text-xs text-white rounded-lg"
                        value={repClass}
                        onChange={(e) => setRepClass(e.target.value)}
                      >
                        <option value="Class 9">Class 9</option>
                        <option value="Class 10">Class 10</option>
                        <option value="Class 11">Class 11</option>
                        <option value="Class 12">Class 12</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] font-mono text-slate-400 block mb-1">Roll identifier:</label>
                      <input
                        type="text"
                        required
                        className="w-full bg-slate-950 border border-white/10 p-2.5 rounded-lg text-xs text-white"
                        placeholder="e.g. 10-CS-3918"
                        value={repRoll}
                        onChange={(e) => setRepRoll(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] font-mono text-slate-400 block mb-1 uppercase font-bold">MarksObtained Score (Out of 100):</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        className="w-full bg-slate-950 border border-white/10 p-2.5 rounded-lg text-xs text-white font-mono text-brand-gold"
                        value={repScore}
                        onChange={(e) => setRepScore(Number(e.target.value))}
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-mono text-slate-400 block mb-1">Exam Stage Target:</label>
                      <input
                        type="text"
                        className="w-full bg-slate-950 border border-white/10 p-2.5 rounded-lg text-xs text-white"
                        value={repExam}
                        onChange={(e) => setRepExam(e.target.value)}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#D4AF37] hover:bg-amber-500 text-slate-950 text-xs font-black p-3.5 rounded-xl uppercase tracking-wider"
                  >
                    Generate & Dispatch grade report
                  </button>
                </form>

                {/* Published results table list */}
                <div className="lg:col-span-7 bg-slate-900/60 p-5 rounded-2xl border border-white/5 space-y-4">
                  <h4 className="text-xs font-mono uppercase text-slate-300 font-bold border-b border-white/5 pb-2">Active report card records</h4>
                  
                  <div className="space-y-3 max-h-[30rem] overflow-y-auto pr-1">
                    {resultsSheet.map((res, i) => (
                      <div key={i} className="p-4 bg-slate-950 rounded-xl space-y-2 border border-white/5 flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-bold text-white text-xs uppercase">{res.studentName}</h4>
                            <span className="text-[10px] text-slate-500 font-mono">Exam: {res.exam}</span>
                          </div>
                          <span className={`text-xs font-mono font-bold px-3 py-1 rounded-lg ${
                            res.grade.includes('+') ? 'bg-emerald-500/10 text-emerald-400' : 'bg-brand-gold/10 text-brand-gold'
                          }`}>
                            Score {res.score} &bull; Grade {res.grade}
                          </span>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[10px] font-mono text-slate-400">
                          <span>Roll: {res.rollNumber} &bull; {res.classLevel}</span>
                          <span>Published Date: {res.publishDate}</span>
                        </div>

                        <button
                          onClick={() => {
                            showAlert(`Report card generated`, `EXPORT_SCHEDULER: Beautiful PDF template coordinates of result sheet compiled for ${res.studentName}. Report download initialized successfully.`, 'info');
                          }}
                          className="w-full mt-1.5 p-2 bg-white/5 hover:bg-white/10 text-slate-300 rounded text-[10px] font-mono text-center block transition-colors"
                        >
                          Export Beautiful Report Card PDF
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* =========================================================
              TAB: SITE SETTINGS ADJUSTMENTS
              ========================================================= */}
          {activeTab === 'settings' && (
            <div className="space-y-6 animate-fadeIn">
              <form onSubmit={(e) => {
                e.preventDefault();
                appendAuditLog('Optimised system configuration preferences', 'Variables Panel');
                showAlert('Properties Saved', 'Successfully integrated modular settings. Interface features loaded.', 'success');
              }} className="p-6 bg-slate-900 border border-white/5 rounded-3xl space-y-6">
                
                <h3 className="text-xs font-bold font-mono text-brand-gold uppercase tracking-widest border-b border-white/5 pb-2">
                  Interactive Site Features Controls
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-b border-white/5 pb-6">
                  <div className="p-3 bg-slate-950 rounded-xl border border-white/5 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-white font-mono block">AI Chat Assistance</span>
                      <span className="text-[10px] text-slate-500 block">Deploy floating helper AI</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={siteSettings.enableAIChat}
                      onChange={(e) => setSiteSettings({ ...siteSettings, enableAIChat: e.target.checked })}
                      className="w-5 h-5 accent-brand-gold bg-slate-900"
                    />
                  </div>

                  <div className="p-3 bg-slate-950 rounded-xl border border-white/5 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-white font-mono block">Automated Quiz Exam</span>
                      <span className="text-[10px] text-slate-500 block">MCQ modules for homework</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={siteSettings.enableQuizModule}
                      onChange={(e) => setSiteSettings({...siteSettings, enableQuizModule: e.target.checked })}
                      className="w-5 h-5 accent-brand-gold bg-slate-900"
                    />
                  </div>

                  <div className="p-3 bg-[#0a111a] rounded-xl border border-white/5 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-white font-mono block">Courses Registrations</span>
                      <span className="text-[10px] text-slate-500 block">Self-enrollment pipelines</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={siteSettings.enableCourses}
                      onChange={(e) => setSiteSettings({...siteSettings, enableCourses: e.target.checked })}
                      className="w-5 h-5 accent-brand-gold bg-slate-05"
                    />
                  </div>
                </div>

                <h3 className="text-xs font-bold font-mono text-brand-gold uppercase tracking-widest pt-2">
                  Corporate Core branding
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-mono text-slate-400 block mb-1">Corporate Header Logo text:</label>
                    <input
                      type="text"
                      className="w-full bg-slate-950 border border-white/10 p-2.5 rounded-lg text-xs text-white"
                      value={siteSettings.logoText}
                      onChange={(e) => setSiteSettings({...siteSettings, logoText: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono text-slate-400 block mb-1">School Academic Banner title:</label>
                    <input
                      type="text"
                      className="w-full bg-slate-950 border border-white/10 p-2.5 rounded-lg text-xs text-white"
                      value={siteSettings.bannerTitle}
                      onChange={(e) => setSiteSettings({...siteSettings, bannerTitle: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-mono text-slate-400 block mb-1">Landing display tagline:</label>
                  <input
                    type="text"
                    className="w-full bg-slate-950 border border-white/10 p-2.5 rounded-lg text-xs text-white"
                    value={siteSettings.bannerSub}
                    onChange={(e) => setSiteSettings({...siteSettings, bannerSub: e.target.value})}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="text-[10px] font-mono text-slate-400 block mb-1">Official Contact Mail Address:</label>
                    <input
                      type="email"
                      className="w-full bg-slate-950 border border-white/10 p-2.5 rounded-lg text-xs text-white"
                      value={siteSettings.contactMail}
                      onChange={(e) => setSiteSettings({...siteSettings, contactMail: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono text-slate-400 block mb-1 font-bold">Contact Hotline Phone:</label>
                    <input
                      type="text"
                      className="w-full bg-slate-950 border border-white/10 p-2.5 rounded-lg text-xs text-white"
                      value={siteSettings.contactPhone}
                      onChange={(e) => setSiteSettings({...siteSettings, contactPhone: e.target.value})}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-brand-gold hover:bg-amber-500 text-slate-950 font-black text-xs p-3 rounded-xl uppercase tracking-widest transition-all"
                >
                  Save configuration preference coordinates
                </button>
              </form>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
