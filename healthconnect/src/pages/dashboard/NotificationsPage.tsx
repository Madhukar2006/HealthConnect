import React, { useState, useEffect } from 'react';
import { useRouter, Link } from '../../context/RouterContext';
import { StorageService } from '../../lib/storage';
import { useToast } from '../../context/ToastContext';
import { NotificationItem } from '../../types';
import { 
  Bell, 
  CheckCheck, 
  Trash2, 
  Calendar, 
  FileText, 
  Pill, 
  Info, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

export const NotificationsPage: React.FC = () => {
  const { navigate } = useRouter();
  const { toast } = useToast();
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const loadData = () => {
    setNotifications(StorageService.getNotifications());
  };

  useEffect(() => {
    loadData();
    const handleUpdate = () => loadData();
    window.addEventListener('healthconnect:storage-updated', handleUpdate);
    return () => window.removeEventListener('healthconnect:storage-updated', handleUpdate);
  }, []);

  const handleMarkRead = (id: string) => {
    StorageService.markNotificationRead(id);
    loadData();
  };

  const handleMarkAllRead = () => {
    StorageService.markAllNotificationsRead();
    loadData();
    toast('Notifications Updated', 'All messages marked as read.', 'info');
  };

  const handleClearAll = () => {
    if (confirm('Clear all notifications?')) {
      StorageService.clearNotifications();
      loadData();
      toast('Notifications Cleared', 'All alerts have been cleared.', 'info');
    }
  };

  const filtered = notifications.filter(n => {
    if (typeFilter === 'all') return true;
    return n.type === typeFilter;
  });

  const getIcon = (type: string) => {
    switch (type) {
      case 'appointment': return Calendar;
      case 'record': return FileText;
      case 'prescription': return Pill;
      default: return Info;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl">
          {(['all', 'appointment', 'record', 'prescription', 'system'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setTypeFilter(tab)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg capitalize transition-colors ${
                typeFilter === tab
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Global Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleMarkAllRead}
            className="py-1.5 px-3 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-1.5 transition-colors"
          >
            <CheckCheck className="w-3.5 h-3.5 text-blue-600" />
            <span>Mark All Read</span>
          </button>
          <button
            onClick={handleClearAll}
            className="py-1.5 px-3 text-xs font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg flex items-center gap-1.5 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear All</span>
          </button>
        </div>

      </div>

      {/* Notifications List */}
      {filtered.length > 0 ? (
        <div className="space-y-3">
          {filtered.map((item) => {
            const Icon = getIcon(item.type);

            return (
              <div
                key={item.id}
                onClick={() => {
                  if (!item.read) handleMarkRead(item.id);
                  if (item.actionUrl) navigate(item.actionUrl);
                }}
                className={`p-4 rounded-xl border transition-all flex items-start gap-4 cursor-pointer ${
                  item.read
                    ? 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 opacity-80'
                    : 'bg-blue-50/40 dark:bg-blue-950/30 border-blue-200 dark:border-blue-900 shadow-xs'
                }`}
              >
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                  item.read
                    ? 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                    : 'bg-blue-600 text-white shadow-xs'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className={`text-xs font-bold ${item.read ? 'text-slate-800 dark:text-slate-200' : 'text-blue-950 dark:text-blue-100'}`}>
                      {item.title}
                    </h3>
                    <span className="text-[10px] font-mono text-slate-400 shrink-0">
                      {item.date}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                    {item.message}
                  </p>
                </div>

                {!item.read && (
                  <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0 mt-1.5" title="Unread" />
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-12 text-center rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
          <Bell className="w-8 h-8 text-slate-300 mx-auto" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">No Notifications</h3>
          <p className="text-xs text-slate-500">Your notifications tray is currently clear.</p>
        </div>
      )}

    </div>
  );
};
