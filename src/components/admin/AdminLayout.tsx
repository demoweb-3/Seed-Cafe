import { useState } from 'react';
import { NavLink, Outlet, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import { LayoutDashboard, UtensilsCrossed, Images, BookOpen, Settings, LogOut, Menu, X, ExternalLink } from 'lucide-react';

const NAV_ITEMS = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/menu', label: 'Menu', icon: UtensilsCrossed, end: false },
  { to: '/admin/gallery', label: 'Gallery', icon: Images, end: false },
  { to: '/admin/story', label: 'Our Story', icon: BookOpen, end: false },
  { to: '/admin/settings', label: 'Café Settings', icon: Settings, end: false },
];

export default function AdminLayout() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-ivory-100 flex">
      {/* Sidebar — desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-ink-800 text-ivory-100 fixed inset-y-0 left-0 z-30">
        <div className="p-6 border-b border-ivory-100/10">
          <Link to="/admin" className="flex items-center gap-2.5">
            <span className="font-serif text-xl tracking-tighter text-ivory-50">Seed</span>
            <span className="font-serif text-xs tracking-[0.3em] uppercase text-golden-200 mt-0.5">Admin</span>
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-botanical-600 text-ivory-50'
                    : 'text-ivory-100/70 hover:bg-ivory-100/10 hover:text-ivory-50'
                }`
              }
            >
              <item.icon size={18} />
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t border-ivory-100/10 space-y-2">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-ivory-100/60 hover:text-ivory-50 hover:bg-ivory-100/10 transition-colors"
          >
            <ExternalLink size={16} />
            View Website
          </Link>
          <div className="px-4 py-2 text-xs text-ivory-100/40 truncate">{user?.email}</div>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-ivory-100/60 hover:text-red-300 hover:bg-red-500/10 transition-colors w-full"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-40">
          <div className="absolute inset-0 bg-ink-900/50" onClick={() => setSidebarOpen(false)} />
          <aside className="absolute inset-y-0 left-0 w-64 bg-ink-800 text-ivory-100 flex flex-col animate-fade-in">
            <div className="p-6 border-b border-ivory-100/10 flex items-center justify-between">
              <Link to="/admin" onClick={() => setSidebarOpen(false)} className="flex items-center gap-2.5">
                <span className="font-serif text-xl tracking-tighter text-ivory-50">Seed</span>
                <span className="font-serif text-xs tracking-[0.3em] uppercase text-golden-200 mt-0.5">Admin</span>
              </Link>
              <button onClick={() => setSidebarOpen(false)} className="text-ivory-100/60">
                <X size={20} />
              </button>
            </div>
            <nav className="flex-1 p-4 space-y-1">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-botanical-600 text-ivory-50'
                        : 'text-ivory-100/70 hover:bg-ivory-100/10 hover:text-ivory-50'
                    }`
                  }
                >
                  <item.icon size={18} />
                  {item.label}
                </NavLink>
              ))}
            </nav>
            <div className="p-4 border-t border-ivory-100/10 space-y-2">
              <Link
                to="/"
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-ivory-100/60 hover:text-ivory-50 hover:bg-ivory-100/10 transition-colors"
              >
                <ExternalLink size={16} />
                View Website
              </Link>
              <div className="px-4 py-2 text-xs text-ivory-100/40 truncate">{user?.email}</div>
              <button
                onClick={handleSignOut}
                className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-ivory-100/60 hover:text-red-300 hover:bg-red-500/10 transition-colors w-full"
              >
                <LogOut size={16} />
                Sign Out
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 md:ml-64">
        {/* Mobile top bar */}
        <header className="md:hidden sticky top-0 z-20 bg-ink-800 text-ivory-100 px-4 h-14 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(true)} className="text-ivory-100">
            <Menu size={22} />
          </button>
          <Link to="/admin" className="flex items-center gap-2">
            <span className="font-serif text-lg tracking-tighter text-ivory-50">Seed</span>
            <span className="font-serif text-[10px] tracking-[0.3em] uppercase text-golden-200">Admin</span>
          </Link>
          <div className="w-10" />
        </header>

        <main className="p-5 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
