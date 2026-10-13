import React, { useState } from 'react';
import { useRouter, Link } from '../../context/RouterContext';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useBooking } from '../../context/BookingContext';
import { StorageService } from '../../lib/storage';
import { useToast } from '../../context/ToastContext';
import { 
  LayoutDashboard, 
  Calendar, 
  FileText, 
  Pill, 
  UserCircle, 
  Bell, 
  PlusCircle, 
  LogOut, 
  Sun, 
  Moon, 
  RefreshCw, 
  Activity, 
  Menu, 
  X,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeTab?: 'overview' | 'appointments' | 'records' | 'prescriptions' | 'profile' | 'notifications';
  title?: string;
  subtitle?: string;
  actionButton?: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ 
  children, 
  activeTab = 'overview',
  title,
  subtitle,
  actionButton 
}) => {
  const { path, navigate } = useRouter();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { openBooking } = useBooking();
  const { toast } = useToast();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const notifications = StorageService.getNotifications();
  const unreadCount = notifications.filter(n => !n.read).length;

  const sidebarItems = [
    { id: 'overview', label: 'Overview', to: '/dashboard', icon: LayoutDashboard },
    { id: 'appointments', label: 'Appointments', to: '/dashboard/appointments', icon: Calendar },
    { id: 'records', label: 'Medical Records', to: '/dashboard/records', icon: FileText },
    { id: 'prescriptions', label: 'Prescriptions', to: '/dashboard/prescriptions', icon: Pill },
    { id: 'profile', label: 'Patient Profile', to: '/dashboard/profile', icon: UserCircle },
    { id: 'notifications', label: 'Notifications', to: '/dashboard/notifications', icon: Bell, badge: unreadCount },
  ];

  const handleReset = () => {
    StorageService.resetDemoData();
    toast('Data Restored', 'Demo database restored to default seed state.', 'info');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex transition-colors">
      
      {/* Desktop Sidebar (260px) */}
      <aside className="hidden lg:flex w-64 flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0">
        
        {/* Brand Lockup */}
        <div className="h-16 px-6 flex items-center justify-between border-b border-slate-200 dark:border-slate-800">
          <Link to="/" className="flex items-center gap-2.5 font-bold text-slate-900 dark:text-white">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-sm">
              <Activity className="w-5 h-5" />
            </div>
            <span className="text-base tracking-tight">HealthConnect</span>
          </Link>
        </div>

        {/* Quick Booking Action */}
        <div className="p-4">
          <button
            onClick={() => openBooking()}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Book Appointment</span>
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-3 space-y-1">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <Link
                key={item.id}
                to={item.to}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && item.badge > 0 ? (
                  <span className="px-1.5 py-0.5 text-[10px] font-bold bg-blue-600 text-white rounded-full">
                    {item.badge}
                  </span>
                ) : null}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer Controls */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
          
          {/* Demo Reset Button */}
          <button
            onClick={handleReset}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 bg-slate-100 dark:bg-slate-800 rounded-lg transition-colors"
            title="Reset appointments and records to default baseline"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Demo Data</span>
          </button>

          {/* User Profile Summary */}
          <div className="pt-2 flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-semibold text-xs flex items-center justify-center shrink-0">
                {user?.avatarInitials || 'AR'}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-slate-900 dark:text-white truncate">{user?.name || 'Alex Rivera'}</p>
                <p className="text-[10px] text-slate-400 truncate">Demo Patient</p>
              </div>
            </div>
            <button
              onClick={logout}
              className="p-1.5 text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
              title="Sign Out"
              aria-label="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Drawer Sidebar */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div 
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="relative w-64 bg-white dark:bg-slate-900 h-full flex flex-col z-10 border-r border-slate-200 dark:border-slate-800">
            <div className="h-16 px-6 flex items-center justify-between border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2.5 font-bold text-slate-900 dark:text-white">
                <Activity className="w-5 h-5 text-blue-600" />
                <span className="text-base tracking-tight">HealthConnect</span>
              </div>
              <button 
                onClick={() => setMobileSidebarOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setMobileSidebarOpen(false);
                      navigate(item.to);
                    }}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-medium transition-colors ${
                      isActive
                        ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-semibold'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && item.badge > 0 ? (
                      <span className="px-1.5 py-0.5 text-[10px] font-bold bg-blue-600 text-white rounded-full">
                        {item.badge}
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </nav>

            <div className="p-4 border-t border-slate-200 dark:border-slate-800">
              <button
                onClick={() => {
                  setMobileSidebarOpen(false);
                  logout();
                }}
                className="w-full flex items-center gap-2 py-2 px-3 text-xs font-medium text-red-600 dark:text-red-400"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header / Breadcrumb Bar */}
        <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 sm:px-6 flex items-center justify-between gap-4 sticky top-0 z-20">
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Open sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
            
            {/* Contextual Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 truncate">
              <Link to="/" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                Portal
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <Link to="/dashboard" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                Dashboard
              </Link>
              {activeTab !== 'overview' && (
                <>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="text-slate-900 dark:text-white font-medium capitalize truncate">
                    {activeTab}
                  </span>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* View Public Site */}
            <Link
              to="/"
              className="hidden sm:flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <span>Public Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            {/* Notifications Shortcut */}
            <Link
              to="/dashboard/notifications"
              className="relative p-2 rounded-lg text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="View notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-600"></span>
              )}
            </Link>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </header>

        {/* Page Content Viewport */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {/* Header row if provided */}
          {(title || actionButton) && (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                {title && (
                  <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                    {title}
                  </h1>
                )}
                {subtitle && (
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                    {subtitle}
                  </p>
                )}
              </div>
              {actionButton && <div>{actionButton}</div>}
            </div>
          )}

          {children}
        </main>
      </div>
    </div>
  );
};
