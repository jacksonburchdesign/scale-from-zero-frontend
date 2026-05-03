import { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { auth } from '../lib/firebase';
import { signOut } from 'firebase/auth';
import { RocketLaunch, SignOut, Plus } from '@phosphor-icons/react';
import ProjectModal from './ProjectModal';

export default function Layout() {
  const { user } = useAuthStore();
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  const handleSignOut = () => {
    signOut(auth);
  };

  return (
    <div className="flex h-screen w-full">
      {/* Sidebar */}
      <aside className="w-64 border-r border-zinc-800 bg-zinc-950 p-6 flex flex-col">
        <div className="flex items-center gap-3 mb-10 text-zinc-50">
          <RocketLaunch size={28} weight="duotone" className="text-indigo-500" />
          <span className="font-bold text-xl tracking-tight">ScaleFromZero</span>
        </div>

        <nav className="flex-1 flex flex-col gap-2">
          <Link to="/" className="text-zinc-400 hover:text-zinc-50 hover:bg-zinc-900 px-3 py-2 rounded-md transition-colors font-medium">
            Dashboard
          </Link>
          <button 
            onClick={() => setIsProjectModalOpen(true)}
            className="flex items-center justify-between text-zinc-50 bg-indigo-600 hover:bg-indigo-500 px-3 py-2 rounded-md transition-colors font-medium mt-4"
          >
            <span>New Project</span>
            <Plus size={16} weight="bold" />
          </button>
        </nav>

        {user && (
          <div className="mt-auto border-t border-zinc-800 pt-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={user.photoURL || ''} alt="Avatar" className="w-8 h-8 rounded-full border border-zinc-800" />
              <div className="flex flex-col text-sm">
                <span className="font-medium text-zinc-50 max-w-[120px] truncate">{user.displayName}</span>
              </div>
            </div>
            <button onClick={handleSignOut} className="text-zinc-400 hover:text-zinc-50" title="Sign Out">
              <SignOut size={20} />
            </button>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-zinc-950 overflow-y-auto">
        <Outlet />
      </main>

      <ProjectModal isOpen={isProjectModalOpen} onClose={() => setIsProjectModalOpen(false)} />
    </div>
  );
}
