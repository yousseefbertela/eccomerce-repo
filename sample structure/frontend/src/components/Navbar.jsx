import { Bell, LogOut, Menu, Sun, Moon } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { useUI } from '../context/UIContext.jsx';
import { useTheme } from '../context/ThemeContext.jsx';
import Logo from './Logo.jsx';
import { classNames } from '../lib/utils.js';

const Navbar = ({ onNotificationsClick }) => {
  const { user, logout } = useAuth();
  const { toggleSidebar } = useUI();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 glass-effect animate-slide-in">
      <div className="mx-auto flex h-16 w-full items-center justify-between px-4 shadow-elevated">
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="btn btn-ghost btn-sm lg:hidden btn-enhanced focus-enhanced"
            onClick={toggleSidebar}
          >
            <Menu className="h-4 w-4" />
          </button>
          <Logo compact />
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            className="btn btn-ghost btn-sm btn-enhanced focus-enhanced"
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
          </button>
          <button
            type="button"
            onClick={onNotificationsClick}
            className={classNames(
              'btn btn-ghost btn-sm relative btn-enhanced focus-enhanced',
              user?.unreadCount ? 'text-warning animate-pulse' : 'text-base-content/80'
            )}
          >
            <Bell className="h-4 w-4" />
            {user?.unreadCount ? (
              <span className="badge badge-warning badge-xs absolute -top-1 -right-1 animate-bounce-subtle">
                {Math.min(user.unreadCount, 9)}
              </span>
            ) : null}
          </button>
          <div className="hidden items-end text-right text-sm leading-tight md:flex">
            <div className="flex flex-col">
              <span className="font-semibold text-base-content">{user?.name}</span>
              <span className={classNames(
                "text-xs font-medium",
                user?.role === 'boss' ? 'text-primary' : 'text-secondary'
              )}>
                {user?.role === 'boss' ? '👑 Boss' : '👤 Staff'}
              </span>
            </div>
          </div>
          <button 
            type="button" 
            className="btn btn-primary btn-sm btn-enhanced focus-enhanced" 
            onClick={logout}
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden md:inline">Sign out</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
