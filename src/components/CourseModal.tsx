import React, { useState } from 'react';
import { X, Calendar, GraduationCap, CheckSquare, DownloadCloud, AlertCircle, Sparkles, BookOpen } from 'lucide-react';
import { Course } from '../types';

interface CourseModalProps {
  course: Course;
  onClose: () => void;
  onEnroll: (courseTitle: string, fullName: string, classLevel: string) => void;
  isLoggedIn: boolean;
  studentName?: string;
}

export default function CourseModal({ course, onClose, onEnroll, isLoggedIn, studentName }: CourseModalProps) {
  const [fullName, setFullName] = useState(studentName || '');
  const [contactEmail, setContactEmail] = useState('');
  const [gradeClass, setGradeClass] = useState(course.classLevel !== 'Programming' ? course.classLevel : 'Class 11');
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) return;

    onEnroll(course.title, fullName, gradeClass);
    setIsSubmitSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div 
        className="w-full max-w-2xl bg-[#051124] rounded-2xl border border-white/10 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        id="course-detail-modal"
      >
        {/* Header decoration */}
        <div className="p-6 bg-gradient-to-r from-brand-blue to-slate-950 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-brand-gold to-yellow-600 flex items-center justify-center shadow">
              <GraduationCap className="w-6 h-6 text-slate-950" />
            </div>
            <div>
              <span className="text-[10px] font-mono tracking-wider font-bold text-brand-gold uppercase bg-brand-gold/10 px-2 py-0.5 rounded">
                Syllabus & Registration
              </span>
              <h3 className="text-lg font-black font-display text-white mt-0.5">
                {course.title}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Summary stats */}
          <div className="grid grid-cols-3 gap-3 bg-white/5 p-4 rounded-xl border border-white/5">
            <div className="text-center">
              <span className="text-[10px] font-mono uppercase text-slate-400 block">Duration</span>
              <span className="text-xs font-bold text-white flex items-center justify-center gap-1 mt-1">
                <Calendar className="w-3.5 h-3.5 text-brand-gold" />
                {course.duration}
              </span>
            </div>
            <div className="text-center border-x border-white/10">
              <span className="text-[10px] font-mono uppercase text-slate-400 block">Enrollment</span>
              <span className="text-xs font-bold text-brand-gold block mt-1">
                {course.enrolledStudents} Registered
              </span>
            </div>
            <div className="text-center">
              <span className="text-[10px] font-mono uppercase text-slate-400 block">Study Materials</span>
              <span className="text-xs font-bold text-white flex items-center justify-center gap-1 mt-1">
                <BookOpen className="w-3.5 h-3.5 text-blue-400" />
                {course.resourcesCount} files
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-widest font-mono text-brand-gold">Overview Description:</h4>
            <p className="text-sm text-slate-300 leading-relaxed bg-white/5 p-4 rounded-xl border border-white/5">
              {course.description}
            </p>
          </div>

          {/* Chapters Accordion list */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-widest font-mono text-white flex items-center gap-1.5">
              <CheckSquare className="w-4 h-4 text-brand-gold" />
              Syllabus Outline:
            </h4>
            <div className="space-y-2">
              {course.syllabus.map((chapter, idx) => (
                <div 
                  key={idx} 
                  className="flex items-start gap-3 bg-slate-900 border border-white/5 hover:border-brand-gold/20 p-3 rounded-lg transition-colors"
                >
                  <span className="w-5 h-5 rounded bg-brand-gold/10 text-brand-gold font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="text-xs text-slate-200 font-semibold">{chapter}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Registration Sub Form */}
          <div className="border-t border-white/10 pt-6">
            {!isSubmitSuccess ? (
              <form onSubmit={handleSubmit} className="space-y-4 bg-slate-900 p-5 rounded-xl border border-white/10">
                <div className="flex items-center gap-2 mb-2 text-brand-gold">
                  <Sparkles className="w-4 h-4" />
                  <h4 className="text-sm font-bold font-display uppercase tracking-tight">Request Enrollment / Join Batches:</h4>
                </div>
                <p className="text-xs text-slate-400 mb-3 block">
                  Fill in your details below. Mukesh Sir will verify your roll number or student registration parameters and allocate your classroom batch timings.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-mono uppercase text-slate-300 block mb-1 font-bold">Your Name:</label>
                    <input
                      type="text"
                      className="w-full bg-slate-950 focus:bg-[#020b17] border border-white/10 focus:border-brand-gold/50 rounded-lg p-2 text-xs text-white"
                      placeholder="e.g. Aman Sharma"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-mono uppercase text-slate-300 block mb-1 font-bold">Contact Email:</label>
                    <input
                      type="email"
                      className="w-full bg-slate-950 focus:bg-[#020b17] border border-white/10 focus:border-brand-gold/50 rounded-lg p-2 text-xs text-white"
                      placeholder="email@example.com"
                      required
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-mono uppercase text-slate-300 block mb-1 font-bold">Your Class Level:</label>
                    <select
                      className="w-full bg-slate-950 border border-white/10 focus:border-brand-gold/50 rounded-lg p-2 text-xs text-white"
                      value={gradeClass}
                      onChange={(e) => setGradeClass(e.target.value)}
                    >
                      <option value="Class 9">Class 9 Computer</option>
                      <option value="Class 10">Class 10 Computer App</option>
                      <option value="Class 11">Class 11 Computer Science</option>
                      <option value="Class 12">Class 12 Computer Science</option>
                      <option value="Programming">Programming Enthusiast</option>
                    </select>
                  </div>
                  <div className="flex items-end">
                    <button
                      type="submit"
                      className="w-full bg-brand-gold hover:bg-amber-500 text-slate-950 font-bold p-2.5 rounded-lg text-xs tracking-tight transition-all uppercase"
                      id="course-modal-submit"
                    >
                      Process Free Registration
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              <div 
                className="bg-emerald-500/10 border border-emerald-500/30 p-5 rounded-xl text-center space-y-3"
                id="enroll-success-banner"
              >
                <div className="w-10 h-10 rounded-full bg-emerald-500 text-slate-950 font-bold flex items-center justify-center mx-auto">
                  ✓
                </div>
                <div>
                  <h4 className="text-sm font-bold text-emerald-400">Perfectly Registered, {fullName}!</h4>
                  <p className="text-xs text-slate-300 mt-1">
                    Your request for <b>{course.title}</b> is submitted. Mukesh Sir will synchronize this enrollment onto your official Student Dashboard soon!
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="px-5 py-2 bg-slate-950 hover:bg-slate-900 text-white font-mono text-xs rounded-lg transition-colors border border-white/10"
                >
                  Return to portal
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Footer info stamp */}
        <div className="p-4 bg-slate-900 border-t border-white/10 flex items-center gap-2 text-xs text-slate-400 px-6">
          <AlertCircle className="w-4 h-4 text-brand-gold shrink-0" />
          <span>Need help choosing a batch? Ask advice using the AI Study Assistant button below.</span>
        </div>
      </div>
    </div>
  );
}
