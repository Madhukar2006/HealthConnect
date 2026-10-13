import React, { useState } from 'react';
import { useRouter, Link } from '../../context/RouterContext';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useBooking } from '../../context/BookingContext';
import { 
  Activity, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  User, 
  LogOut, 
  CalendarCheck,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { path, navigate } = useRouter();
  const { user, isAuthenticated, logout, loginDemo } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { openBooking } = useBooking();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const isCurrent = (route: string) => {
    if (route === '/' && path === '/') return true;
    if (route !== '/' && path.startsWith(route)) return true;
    return false;
  };

  const navLinks = [
    { label: 'Overview', to: '/' },
    { label: 'Services', to: '/services' },
    { label: 'Doctors', to: '/doctors' },
    { label: 'About', to: '/about' },
    { label: 'Contact', to: '/contact' },
  ];

  const handleMobileNav = (to: string) => {
    setMobileMenuOpen(false);
    navigate(to);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Bar 3-Zone Contract */}
        <div className="flex items-center justify-between gap-8 h-16">
          
          {/* Zone 1: Brand Wordmark (Single clean element) */}
          <Link to="/" className="flex items-center gap-2.5 text-slate-900 dark:text-white font-bold text-lg tracking-tight whitespace-nowrap shrink-0 group">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-sm group-hover:bg-blue-700 transition-colors">
              <Activity className="w-5 h-5" />
            </div>
            <span>HealthConnect</span>
          </Link>

          {/* Zone 2: 4-5 Clean single-line text links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600 dark:text-slate-300">
            {navLinks.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`transition-colors whitespace-nowrap shrink-0 py-1 ${
                  isCurrent(item.to)
                    ? 'text-blue-600 dark:text-blue-400 font-semibold border-b-2 border-blue-600 dark:border-blue-400'
                    : 'hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Zone 3: Primary Action & Controls */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle visual theme"
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-left"
                  aria-expanded={userDropdownOpen}
                >
                  <div className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 font-semibold text-xs flex items-center justify-center">
                    {user?.avatarInitials || 'AR'}
                  </div>
                  <span className="hidden sm:inline text-xs font-semibold text-slate-800 dark:text-slate-200 max-w-[100px] truncate">
                    {user?.name || 'Dashboard'}
                  </span>
                </button>

                {userDropdownOpen && (
                  <div 
                    className="absolute right-0 mt-2 w-56 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-100"
                    onMouseLeave={() => setUserDropdownOpen(false)}
                  >
                    <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800">
                      <p className="text-xs font-semibold text-slate-900 dark:text-white truncate">{user?.name}</p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{user?.email}</p>
                      <div className="mt-1 flex items-center gap-1 text-[10px] text-blue-600 dark:text-blue-400 font-medium">
                        <ShieldCheck className="w-3 h-3" />
                        <span>Demo Mode Active</span>
                      </div>
                    </div>
                    <Link
                      to="/dashboard"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center justify-between px-4 py-2 text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                    >
                      <span>Patient Dashboard</span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                    </Link>
                    <Link
                      to="/dashboard/appointments"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center justify-between px-4 py-2 text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                    >
                      <span>My Appointments</span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                    </Link>
                    <Link
                      to="/dashboard/records"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center justify-between px-4 py-2 text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                    >
                      <span>Medical Records</span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                    </Link>
                    <Link
                      to="/dashboard/profile"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center justify-between px-4 py-2 text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                    >
                      <span>Profile & Settings</span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                    </Link>
                    <div className="border-t border-slate-100 dark:border-slate-800 my-1"></div>
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        logout();
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-xs text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors text-left"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  Log In
                </Link>
                <button
                  onClick={() => loginDemo('patient')}
                  className="hidden sm:inline-flex px-3 py-1.5 text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                >
                  Demo Sign In
                </button>
              </div>
            )}

            {/* Primary Action Button */}
            <button
              onClick={() => openBooking()}
              className="px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 rounded-lg shadow-sm transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5"
            >
              <CalendarCheck className="w-3.5 h-3.5" />
              <span>Book Visit</span>
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-3 pb-6 space-y-3">
          <div className="grid gap-1">
            {navLinks.map((item) => (
              <button
                key={item.to}
                onClick={() => handleMobileNav(item.to)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isCurrent(item.to)
                    ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 font-semibold'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
            {isAuthenticated ? (
              <button
                onClick={() => handleMobileNav('/dashboard')}
                className="w-full py-2.5 text-center text-sm font-medium text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 rounded-lg"
              >
                Open Patient Dashboard
              </button>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleMobileNav('/login')}
                  className="py-2.5 text-center text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 rounded-lg"
                >
                  Log In
                </button>
                <button
                  onClick={() => {
                    loginDemo('patient');
                    setMobileMenuOpen(false);
                    navigate('/dashboard');
                  }}
                  className="py-2.5 text-center text-xs font-semibold text-white bg-blue-600 rounded-lg"
                >
                  Demo Login
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
