import React, { useState, useEffect } from 'react';
import { X, Download, FileText, CheckCircle2, ChevronLeft, ChevronRight, Eye, ZoomIn, ZoomOut, AlertCircle } from 'lucide-react';
import { StudyMaterial } from '../types';

interface PDFViewerModalProps {
  material: StudyMaterial;
  onClose: () => void;
  onDownloadIncrement: (id: string) => void;
}

export default function PDFViewerModal({ material, onClose, onDownloadIncrement }: PDFViewerModalProps) {
  const [downloadProgress, setDownloadProgress] = useState(-1);
  const [currentPage, setCurrentPage] = useState(1);
  const [zoom, setZoom] = useState(100);
  const totalPages = 5;

  const handleDownload = () => {
    if (downloadProgress !== -1) return;
    
    setDownloadProgress(0);
    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          onDownloadIncrement(material.id);
          
          // Trigger real browser download of the dummy PDF
          const link = document.createElement('a');
          link.href = material.fileUrl;
          link.setAttribute('download', material.fileName);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  // Generate simulated page content based on material metadata
  const getPageSnippet = (page: number) => {
    switch (page) {
      case 1:
        return {
          title: `SECTION 1: INTRODUCTION & GENERAL SYLLABUS ALIGNMENT`,
          content: `This syllabus document covers complete chapter-wise evaluations prepared directly by Mukesh Kumar Yadav CS Academy.
- Lesson Core Objectives: Develop syntactic knowledge & structural layout skills.
- Targeted Level: ${material.classLevel} (${material.category})
- Expected Practical weightage: 30% to 70% of absolute board weightage.
------------------------------------------------------------------------
Make sure to review basic variables, loop invariant conditions, and stack memory offsets before attempting review sheets.`,
          warning: "Warning: Unlicensed redistribution without written academy consent is strictly prohibited."
        };
      case 2:
        return {
          title: `SECTION 2: SOLVED MCQ DRILLS & PREVIOUS YEAR TERM EVALS`,
          content: `Question 1: Which of the following is correct regarding memory overhead in standard compilers?
A) C lists occupy contiguous stack slots.
B) SQL schemas enforce primary-key logical unique mappings.
C) HTML is an object reference type.
D) All of the above.
Answer Key: B — SQL schemas guarantee relational uniqueness constraints.`,
          warning: "Check Board Code guidelines updated on Mukesh CS Academy notice board."
        };
      case 3:
        return {
          title: `SECTION 3: ALGORITHMIC PARADIGMS & DRY RUN BOARDS`,
          content: `Let's dry-run standard linear search complexity formulas:
# Complex Python Syntax
def search_element(list_ref, target_ref):
    for offset_idx, item in enumerate(list_ref):
        if item == target_ref:
            return offset_idx
    return -1
   
Dry-run case: list_ref = [10, 20, 30] | target_ref = 30
Output: Found at index location 2 in O(N) linear iteration speed.`,
          warning: "Recommended: Copy other code practice templates from Lab files."
        };
      case 4:
        return {
          title: `SECTION 4: EXPECTED NUMERICAL ASSIGNMENTS`,
          content: `Task 1: Draw binary lookup decision trees containing terminal integers [45, 12, 18, 90, 102]. Determine the maximal search depth.
Task 2: Construct full SQL tables for student tracking and write select statements joining results with attendance records.`,
          warning: "Deadline: Submit physical submissions to Mukesh Sir during labs next week."
        };
      default:
        return {
          title: `SECTION 5: GLOSSARY AND FORMULA INDEX`,
          content: `- Big O: Systemic measure of runtime scaling performance.
- Database Keys: Primary, Foreign, Candidate keys.
- Semantic HTML: Tags like <article>, <section>, and <nav> ensuring perfect responsive layout trees.
------------------------------------------------------------------------
End of materials list. For any doubts, ask the AI Study Assistant floating on your dashboard right now!`,
          warning: "Support Mail: mukeshydv2048@gmail.com"
        };
    }
  };

  const currentSnippet = getPageSnippet(currentPage);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div 
        className="w-full max-w-4xl bg-[#051124] rounded-2xl border border-white/10 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        id="pdf-viewer-modal"
      >
        {/* Top Header */}
        <div className="p-4 bg-slate-900 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-brand-gold/10 text-brand-gold flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold truncate max-w-xs sm:max-w-md text-white font-display">
                {material.title}
              </h3>
              <p className="text-[10px] text-slate-400 font-mono">
                {material.classLevel} &bull; {material.category} &bull; Size: {material.fileSize}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            id="pdf-close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Bar / Controls */}
        <div className="bg-slate-900/60 px-4 py-2 border-b border-white/5 flex flex-wrap gap-4 items-center justify-between text-xs text-slate-300">
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded bg-slate-800 disabled:opacity-30 hover:bg-slate-750 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-mono px-3">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded bg-slate-800 disabled:opacity-30 hover:bg-slate-755 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Zoom settings */}
          <div className="flex items-center gap-2">
            <button onClick={() => setZoom(z => Math.max(75, z - 25))} className="p-1.5 rounded hover:bg-white/5" title="Zoom Out"><ZoomOut className="w-4 h-4" /></button>
            <span className="font-mono text-[11px] bg-slate-800 px-2 py-0.5 rounded text-brand-gold">{zoom}%</span>
            <button onClick={() => setZoom(z => Math.min(150, z + 25))} className="p-1.5 rounded hover:bg-white/5" title="Zoom In"><ZoomIn className="w-4 h-4" /></button>
          </div>

          {/* Download trigger */}
          <div>
            {downloadProgress === -1 ? (
              <button
                onClick={handleDownload}
                className="flex items-center gap-1.5 bg-brand-gold hover:bg-amber-500 text-slate-950 font-bold px-4 py-1.5 rounded-lg transition-all"
                id="pdf-download-btn"
              >
                <Download className="w-3.5 h-3.5" />
                Download PDF
              </button>
            ) : downloadProgress < 100 ? (
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] text-brand-gold">{downloadProgress}%</span>
                <div className="w-24 bg-slate-800 h-2 rounded overflow-hidden border border-white/5">
                  <div
                    className="bg-gradient-to-r from-brand-gold to-amber-400 h-full transition-all duration-200"
                    style={{ width: `${downloadProgress}%` }}
                  ></div>
                </div>
              </div>
            ) : (
              <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <CheckCircle2 className="w-4 h-4" /> Dowloaded Successfully!
              </span>
            )}
          </div>
        </div>

        {/* Page Content View Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 bg-[#020b17] flex justify-center">
          <div
            className="w-full bg-[#051124] border border-white/10 rounded-xl max-w-2xl p-6 md:p-8 shadow-inner transition-all transform duration-300"
            style={{ fontSize: `${zoom / 100}em` }}
          >
            {/* Header Stamp */}
            <div className="border-b-2 border-brand-gold/20 pb-4 mb-6 flex justify-between items-start">
              <div>
                <span className="text-[9px] uppercase tracking-widest text-[#D4AF37] font-bold font-mono">Mukesh Kumar Yadav &bull; CS Academy Stamp</span>
                <h4 className="font-display font-black text-white text-sm uppercase md:text-base mt-1">
                  {currentSnippet.title}
                </h4>
              </div>
              <span className="text-[10px] font-mono bg-indigo-950 text-indigo-300 border border-indigo-700/50 px-2 py-0.5 rounded">
                PAGE {currentPage}
              </span>
            </div>

            {/* Document body simulating clean paper lines */}
            <div className="font-mono text-slate-300 text-xs leading-relaxed space-y-4 whitespace-pre-wrap select-none border-l-2 border-[#D4AF37]/30 pl-4">
              {currentSnippet.content}
            </div>

            {/* Footnote stamp */}
            <div className="mt-8 border-t border-white/10 pt-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-amber-500/80 text-[10px]">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span className="max-w-[280px] sm:max-w-md truncate font-mono">{currentSnippet.warning}</span>
              </div>
              <span className="text-[10px] font-mono text-slate-500">Secured Document PDF</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-900 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400">
          <span>Downloaded {material.downloadCount} times previously by classmates.</span>
          <div className="flex items-center gap-3">
            <span className="text-[11px] text-brand-gold font-mono">&bull; 100% Virus & Safe Scan Approved</span>
          </div>
        </div>
      </div>
    </div>
  );
}
