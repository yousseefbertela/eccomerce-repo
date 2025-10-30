import { FileText, Home, Users, BarChart3 } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useUI } from '../context/UIContext.jsx';
import Logo from './Logo.jsx';
import { classNames } from '../lib/utils.js';

const navItems = [
  { to: '/', label: 'Overview', icon: Home, roles: ['boss', 'staff'] },
  { to: '/files', label: 'Files', icon: FileText, roles: ['boss', 'staff'] },
  { to: '/approvals', label: 'Approvals', icon: Users, roles: ['boss'] },
  // { to: '/audit', label: 'User Activity', icon: BarChart3, roles: ['boss'] }, // Disabled - requires audit backend
];

const Sidebar = () => {
  const { user } = useAuth();
  const { isSidebarOpen } = useUI();

  return (
    <aside
      className={classNames(
        'fixed inset-y-0 left-0 z-30 w-64 transform border-r border-base-300 bg-base-200/90 p-4 backdrop-blur-xl transition-transform duration-300 lg:static lg:translate-x-0',
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      )}
    >
      <div className="flex flex-col gap-8">
        <Logo />
        <nav className="flex flex-col gap-1">
          {navItems
            .filter((item) => item.roles.includes(user?.role))
            .map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    classNames(
                      'flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300',
                      isActive
                        ? 'bg-primary/20 text-primary shadow-lg shadow-primary/20'
                        : 'text-base-content/70 hover:bg-base-300/60 hover:text-primary'
                    )
                  }
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
        </nav>
        <div className="mt-auto rounded-2xl bg-gradient-to-br from-primary/20 via-primary/5 to-transparent p-4 text-xs text-primary">
          <p className="font-semibold">Welcome to Angal</p>
          <p className="mt-1 text-base-content/70">
            Manage approvals, share files securely, and keep every staff member in sync.
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
