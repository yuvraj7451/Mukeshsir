import React from 'react';
import { Sparkles, Code, Mail, Phone, MapPin, GraduationCap, Github, Linkedin, Eye, Download } from 'lucide-react';

interface FooterProps {
  setCurrentPage: (page: string) => void;
  isDarkMode: boolean;
  totalDownloads: number;
}

export default function Footer({ setCurrentPage, isDarkMode, totalDownloads }: FooterProps) {
  return (
    <footer className={`border-t font-sans transition-all duration-300 ${
      isDarkMode 
        ? 'bg-slate-950 border-slate-900 text-slate-400' 
        : 'bg-slate-900 border-slate-800 text-slate-300'
    }`} id="footer">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8" id="footer-grid">
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentPage('home')} id="footer-brand">
              <div className="w-9 h-9 rounded-lg bg-brand-gold flex items-center justify-center">
                <Code className="w-5 h-5 text-slate-950" />
              </div>
              <span className="font-display font-bold text-lg text-white">
                Mukesh CS <span className="text-brand-gold">Academy</span>
              </span>
            </div>
            <p className="text-xs leading-relaxed">
              Helping students master programming, logic structures, and digital systems. Learning coding made simple, clear and practical for Class 9-12 and university aspirants.
            </p>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono bg-slate-800 text-brand-gold px-2.5 py-1 rounded-full border border-slate-750 flex items-center gap-1">
                <Download className="w-3.5 h-3.5 text-brand-gold" />
                {totalDownloads} Materials Downloaded
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4 font-display">
            <h4 className="text-sm font-bold text-white uppercase tracking-widest border-l-2 border-brand-gold pl-2">
              Explore Pages
            </h4>
            <ul className="space-y-2 text-xs">
              {[
                { id: 'about', label: 'About Teacher' },
                { id: 'courses', label: 'All Courses' },
                { id: 'materials', label: 'Study Notes & Practicals' },
                { id: 'notices', label: 'Notice Board' },
                { id: 'gallery', label: 'Activity Gallery' },
                { id: 'contact', label: 'Get in Touch' },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => setCurrentPage(link.id)}
                    className="hover:text-brand-gold transition-colors flex items-center gap-1.5"
                  >
                    <GraduationCap className="w-3.5 h-3.5 text-slate-500" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Core Classes */}
          <div className="space-y-4 font-display">
            <h4 className="text-sm font-bold text-white uppercase tracking-widest border-l-2 border-brand-gold pl-2">
              Syllabus Guides
            </h4>
            <ul className="space-y-2 text-xs">
              {[
                { id: 'courses', label: 'Class 9 CS Foundation' },
                { id: 'courses', label: 'Class 10 Web Foundations' },
                { id: 'courses', label: 'Class 11 Python Logic' },
                { id: 'courses', label: 'Class 12 Advanced Python & SQL' },
                { id: 'courses', label: 'C Programming Masterclass' },
              ].map((course, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => setCurrentPage('courses')}
                    className="hover:text-brand-gold transition-colors flex items-center gap-1.5"
                  >
                    <Code className="w-3.5 h-3.5 text-brand-gold-hover" />
                    {course.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-widest border-l-2 border-brand-gold pl-2">
              Official Hub
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-gold mt-0.5 shrink-0" />
                <span>Shree Durga Model Secondary School, Nepal</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-gold shrink-0" />
                <a href="mailto:mukeshydv2048@gmail.com" className="hover:text-white transition-colors">
                  mukeshydv2048@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-gold shrink-0" />
                <a href="tel:+9779818319614" className="hover:text-white transition-colors">
                  +977 9818319614
                </a>
              </li>
            </ul>
            <div className="flex gap-2 pt-1" id="footer-socials">
              <span className="text-[10px] font-mono tracking-widest uppercase block text-slate-500 mb-1">CONNECT WITH SIR:</span>
              <div className="flex gap-2">
                <a href="#" className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors"><Linkedin className="w-4 h-4" /></a>
                <a href="#" className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors"><Github className="w-4 h-4" /></a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright segment */}
        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4" id="footer-bottom">
          <p className="text-[11px] font-mono tracking-tight">
            &copy; {new Date().getFullYear()} Mukesh CS Academy. Built with React, Tailwind & Gemini SDK. All Rights Reserved.
          </p>
          <div className="flex items-center gap-2 text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span className="text-slate-500 text-[11px] font-mono">Status: Connected to Server Core</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
