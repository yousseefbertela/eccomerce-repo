import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import Sidebar from './Sidebar.jsx';
import NotificationPanel from './NotificationPanel.jsx';
import Logo from './Logo.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useUI } from '../context/UIContext.jsx';
import {
  fetchNotificationsRequest,
  markAllNotificationsRequest,
} from '../lib/api.js';

const ProtectedLayout = () => {
  const { user, initializing, refreshProfile } = useAuth();
  const { closeSidebar } = useUI();
  const location = useLocation();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [showPanel, setShowPanel] = useState(false);

  useEffect(() => {
    closeSidebar();
  }, [location.pathname, closeSidebar]);

  useEffect(() => {
    if (!initializing && !user) {
      navigate('/auth', { replace: true });
    }
  }, [initializing, user, navigate]);

  useEffect(() => {
    if (!user) return;
    
    const loadNotifications = async () => {
      try {
        const data = await fetchNotificationsRequest({ onlyUnread: false });
        setNotifications(data.notifications || []);
        await refreshProfile();
      } catch (error) {
        console.error('Failed to load notifications', error);
      }
    };

    loadNotifications();
  }, [user?._id]); // Only depend on user ID, not refreshProfile function

  if (initializing) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-base-100 via-base-200 to-base-300 animate-fade-in">
        <div className="text-center space-y-4">
          <div className="animate-bounce-subtle">
            <Logo />
          </div>
          <span className="loading loading-dots loading-lg text-primary animate-pulse" />
          <p className="text-base-content/60 animate-fade-in">Initializing ANGAL AZIZ SYSTEM...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const handleNotificationsClick = () => {
    setShowPanel((prev) => !prev);
  };

  const handleMarkAll = async () => {
    try {
      await markAllNotificationsRequest();
      setNotifications((prev) => prev.map((item) => ({ ...item, isRead: true })));
      await refreshProfile();
    } catch (error) {
      console.error('Failed to mark notifications', error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-base-100 via-base-200 to-base-100 animate-fade-in">
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5 pointer-events-none"></div>
      <Sidebar />
      <div className="flex-1 lg:pl-64 relative">
        <Navbar onNotificationsClick={handleNotificationsClick} />
        <main className="mx-auto w-full max-w-7xl px-4 pb-16 page-transition">
          <Outlet context={{ notifications, setNotifications }} />
        </main>
      </div>
      {showPanel && (
        <div className="animate-slide-in">
          <NotificationPanel
            notifications={notifications}
            onClose={() => setShowPanel(false)}
            onMarkAll={handleMarkAll}
          />
        </div>
      )}
    </div>
  );
};

export default ProtectedLayout;
