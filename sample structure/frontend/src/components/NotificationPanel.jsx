import { useEffect } from 'react';
import { formatDate } from '../lib/utils.js';

const NotificationPanel = ({ notifications, onMarkAll, onClose }) => {
  useEffect(() => {
    if (notifications.length > 0) {
      const unreadCount = notifications.filter((item) => !item.isRead).length;
      if (unreadCount > 0) {
        onMarkAll();
      }
    }
  }, [notifications, onMarkAll]);

  return (
    <div className="fixed inset-x-0 top-16 z-40 mx-auto w-full max-w-md rounded-3xl border border-base-200 bg-base-100/95 p-4 shadow-2xl backdrop-blur-lg sm:right-6 sm:ml-auto sm:mr-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">Notifications</h3>
        <button type="button" className="btn btn-ghost btn-xs" onClick={onClose}>
          Close
        </button>
      </div>
      <div className="mt-3 max-h-80 space-y-3 overflow-y-auto pr-1">
        {notifications.length === 0 && (
          <p className="text-sm text-base-content/60">No notifications yet. You’re all caught up!</p>
        )}
        {notifications.map((item) => (
          <article
            key={item._id}
            className="fade-in rounded-2xl border border-base-200/60 bg-base-200/40 p-3 transition hover:border-primary/40"
          >
            <div className="flex items-center justify-between">
              <span className="badge badge-sm capitalize">{item.type?.toLowerCase()}</span>
              <time className="text-xs text-base-content/60">{formatDate(item.createdAt)}</time>
            </div>
            <h4 className="mt-2 text-sm font-semibold">{item.title}</h4>
            <p className="mt-1 text-sm text-base-content/70">{item.message}</p>
          </article>
        ))}
      </div>
    </div>
  );
};

export default NotificationPanel;
