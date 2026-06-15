export interface Course {
  id: string;
  title: string;
  slug: string;
  classLevel: string;
  description: string;
  duration: string;
  syllabus: string[];
  resourcesCount: number;
  enrolledStudents: number;
}

export type MaterialCategory = 'Notes' | 'Assignments' | 'Practicals' | 'Question Papers' | 'Model Questions' | 'Past Papers' | 'Board Questions' | 'Numericals' | 'Model Sets';

export interface StudyMaterial {
  id: string;
  title: string;
  classLevel: 'Class 9' | 'Class 10' | 'Class 11' | 'Class 12' | 'Programming';
  category: MaterialCategory;
  fileName: string;
  fileSize: string;
  downloadCount: number;
  uploadedAt: string;
  fileUrl: string; // fallback preview URL or placeholder
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  date: string;
  isPinned: boolean;
  category: 'General' | 'Exam' | 'Assignment' | 'Event';
}

export interface GalleryItem {
  id: string;
  url: string;
  title: string;
  category: 'Workshops' | 'Classroom' | 'Achievements' | 'Activities';
  type: 'image' | 'video';
  thumbnail?: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  username: string;
  role: 'student';
  classLevel: 'Class 9' | 'Class 10' | 'Class 11' | 'Class 12';
  rollNumber: string;
  attendance: number; // percentage
  examResults: {
    subject: string;
    marksObtained: number;
    totalMarks: number;
    grade: string;
  }[];
  assignmentsTrack: {
    id: string;
    title: string;
    status: 'Pending' | 'Submitted' | 'Graded';
    dueDate: string;
    score?: string;
  }[];
}

export interface Admin {
  username: string;
  name: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: string;
}
