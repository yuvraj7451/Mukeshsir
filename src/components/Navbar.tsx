import React, { useState } from 'react';
import { Menu, X, Code, BookOpen, GraduationCap, Bell, Image as ImageIcon, Phone, User, LogOut, Moon, Sun, LayoutDashboard } from 'lucide-react';
import { Student } from '../types';

interface NavbarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
  loggedInUser: { role: 'student' | 'admin'; data: any } | null;
  handleLogout: () => void;
}

export default function Navbar({
  currentPage,
  setCurrentPage,
  isDarkMode,
  setIsDarkMode,
  loggedInUser,
  handleLogout,
}: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Code },
    { id: 'about', label: 'About', icon: User },
    { id: 'courses', label: 'Courses', icon: GraduationCap },
    { id: 'materials', label: 'Study Materials', icon: BookOpen },
    { id: 'notices', label: 'Notice Board', icon: Bell },
    { id: 'gallery', label: 'Gallery', icon: ImageIcon },
    { id: 'contact', label: 'Contact', icon: Phone },
  ];

  const handleNavClick = (pageId: string) => {
    setCurrentPage(pageId);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`sticky top-0 z-50 backdrop-blur-md border-b transition-all duration-300 ${
      isDarkMode 
        ? 'bg-slate-900/90 border-slate-800 text-slate-100' 
        : 'bg-white/90 border-slate-200 text-slate-800'
    }`} id="navbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo Brand */}
          <div 
            onClick={() => handleNavClick('home')} 
            className="flex items-center gap-2 cursor-pointer group"
            id="nav-logo"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-blue to-blue-800 flex items-center justify-center border border-brand-gold/30 shadow-md">
              <Code className="w-5 h-5 text-brand-gold animate-pulse" />
            </div>
            <div>
              <span className={`font-display font-bold text-lg tracking-tight transition-colors ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}>
                Mukesh CS <span className="text-brand-gold">Academy</span>
              </span>
              <p className="text-[10px] uppercase font-mono tracking-widest text-slate-400 -mt-1 font-semibold">
                Coding Made Simple
              </p>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center space-x-1" id="nav-items-desktop">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? isDarkMode
                        ? 'bg-slate-800 text-brand-gold border border-brand-gold/20'
                        : 'bg-indigo-50 text-brand-blue border border-indigo-100'
                      : isDarkMode
                        ? 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                  id={`nav-link-${item.id}`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-brand-gold' : 'text-slate-400'}`} />
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Actions & Login Status */}
          <div className="hidden lg:flex items-center gap-3" id="nav-actions">
            {/* Dark Mode button */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-lg transition-colors ${
                isDarkMode ? 'hover:bg-slate-800 text-brand-gold' : 'hover:bg-slate-100 text-slate-500'
              }`}
              title={isDarkMode ? 'Light Mode' : 'Dark Mode'}
              id="theme-toggler"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Auth Block */}
            {loggedInUser ? (
              <div className="flex items-center gap-2 border-l pl-3 border-slate-700/30">
                <button
                  onClick={() => handleNavClick(loggedInUser.role === 'admin' ? 'admin' : 'login')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider font-mono border transition-all ${
                    loggedInUser.role === 'admin'
                      ? 'bg-amber-500/10 text-amber-500 border-amber-500/30'
                      : 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                  }`}
                  id="navbar-dashboard-btn"
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  {loggedInUser.role === 'admin' ? 'Admin Portal' : 'Student Panel'}
                </button>
                <div className="text-right">
                  <p className="text-xs font-semibold leading-3 uppercase tracking-tight max-w-[120px] truncate">
                    {loggedInUser.role === 'admin' ? 'Mukesh Sir' : loggedInUser.data.name}
                  </p>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-500 transition-colors"
                  title="Logout"
                  id="navbar-logout-btn"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleNavClick('login')}
                className="flex items-center gap-2 bg-gradient-to-r from-brand-blue to-blue-900 border border-brand-gold/30 hover:border-brand-gold text-white px-5 py-2.5 rounded-lg text-sm font-semibold shadow-md hover:shadow-brand-gold/10 transition-all font-display"
                id="navbar-login-btn"
              >
                <User className="w-4 h-4 text-brand-gold" />
                Student Login
              </button>
            )}
          </div>

          {/* Mobile Buttons */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-lg transition-colors ${
                isDarkMode ? 'text-brand-gold' : 'text-slate-500'
              }`}
              id="theme-toggler-mobile"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-lg ${
                isDarkMode ? 'text-white' : 'text-slate-800'
              }`}
              id="mobile-menu-toggle"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className={`lg:hidden border-t px-4 pt-2 pb-6 space-y-2 font-display ${
          isDarkMode ? 'bg-slate-900 bg-opacity-95 border-slate-850' : 'bg-white border-slate-100'
        }`} id="mobile-drawer">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-base font-semibold transition-all ${
                  isActive
                    ? isDarkMode
                      ? 'bg-slate-800 text-brand-gold'
                      : 'bg-indigo-50 text-brand-blue'
                    : isDarkMode
                      ? 'text-slate-300 hover:bg-slate-800/40'
                      : 'text-slate-600 hover:bg-slate-100'
                }`}
                id={`nav-link-mobile-${item.id}`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-brand-gold' : 'text-slate-400'}`} />
                {item.label}
              </button>
            );
          })}

          <div className="border-t border-slate-700/20 pt-4 mt-2">
            {loggedInUser ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3 px-4 py-2">
                  <div className="w-8 h-8 rounded-full bg-brand-gold text-slate-950 font-bold flex items-center justify-center font-mono text-sm leading-none">
                    {loggedInUser.role === 'admin' ? 'M' : loggedInUser.data.name[0]}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold leading-tight uppercase tracking-tight">
                      {loggedInUser.role === 'admin' ? 'Mukesh Sir' : loggedInUser.data.name}
                    </h4>
                    <p className="text-[10px] uppercase font-mono text-slate-500">
                      {loggedInUser.role === 'admin' ? 'Admin Portal' : `${loggedInUser.data.classLevel} - Roll ${loggedInUser.data.rollNumber.split('-')[2]}`}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 px-2">
                  <button
                    onClick={() => handleNavClick(loggedInUser.role === 'admin' ? 'admin' : 'login')}
                    className="flex justify-center items-center gap-2 py-2.5 rounded-xl bg-brand-blue border border-brand-gold/30 text-white text-xs font-bold font-mono"
                    id="mobile-drawer-dashboard"
                  >
                    <LayoutDashboard className="w-3.5 h-3.5" />
                    Dashboard
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex justify-center items-center gap-2 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-500 text-xs font-bold font-mono"
                    id="mobile-drawer-logout"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Log Out
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => handleNavClick('login')}
                className="w-full justify-center flex items-center gap-2 bg-gradient-to-r from-brand-blue to-blue-900 border border-brand-gold/30 text-white py-3 px-4 rounded-xl text-sm font-bold tracking-tight shadow-md"
                id="mobile-drawer-login"
              >
                <User className="w-4 h-4 text-brand-gold" />
                Student Login Portal
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
