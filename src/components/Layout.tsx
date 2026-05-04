import { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuthStore } from '../store/authStore';
import { auth } from '../lib/firebase';
import { signOut } from 'firebase/auth';
import { SignOut, Plus, GlobeHemisphereWest, GitBranch } from '@phosphor-icons/react';
import ProjectModal from './ProjectModal';

interface Project {
  id: string;
  projectName: string;
}

export default function Layout() {
  const { user } = useAuthStore();
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const location = useLocation();

  useEffect(() => {
    if (!user) return;
    
    const q = query(
      collection(db, 'projects'),
      where('ownerId', '==', user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const projs: Project[] = [];
      snapshot.forEach((doc) => {
        projs.push({ id: doc.id, projectName: doc.data().projectName } as Project);
      });
      setProjects(projs);
    });

    return () => unsubscribe();
  }, [user]);

  const handleSignOut = () => {
    signOut(auth);
  };

  return (
    <div className="flex h-screen w-full">
      {/* Sidebar */}
      <aside className="w-64 border-r border-zinc-800 bg-zinc-950 p-6 flex flex-col">
        <Link to="/dashboard" className="flex items-center gap-3 mb-10 group">
          <img src="/sfz-logo.svg" className="w-8 h-8 object-contain transition-transform group-hover:scale-105" alt="SFZ Logo" />
          <span className="font-bold text-xl tracking-tight text-zinc-50">ScaleFromZero</span>
        </Link>

        <div className="flex-1 overflow-y-auto pr-2 flex flex-col gap-1">
          <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3 px-2">Your Projects</p>
          {projects.map((p) => {
            const isActive = location.pathname.includes(`/project/${p.id}`);
            return (
              <Link 
                key={p.id} 
                to={`/project/${p.id}`} 
                className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors font-medium text-sm ${
                  isActive 
                    ? 'bg-purple-600 text-zinc-50 shadow-sm' 
                    : 'text-zinc-400 hover:text-zinc-50 hover:bg-zinc-900 border border-transparent'
                }`}
              >
                <GitBranch size={16} weight={isActive ? "bold" : "regular"} />
                <span className="truncate">{p.projectName}</span>
              </Link>
            );
          })}

          <button 
            onClick={() => setIsProjectModalOpen(true)}
            className="flex items-center text-zinc-400 hover:text-zinc-50 hover:bg-zinc-900 px-3 py-2 rounded-md transition-colors font-medium text-sm mt-2 border border-transparent border-dashed hover:border-zinc-700"
          >
            <span className="flex items-center gap-2"><Plus size={16} /> New Project</span>
          </button>
        </div>

        {user && (
          <div className="mt-auto border-t border-zinc-800 pt-6 flex flex-col gap-6">
            <Link to="/" className="flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-50 transition-colors px-2">
              <GlobeHemisphereWest size={16} />
              Return to Site
            </Link>
            
            <div className="flex items-center justify-between px-2">
              <Link to="/settings" className="flex items-center gap-3 group" title="User Settings">
                <img src={user.photoURL || ''} alt="Avatar" className="w-8 h-8 rounded-full border border-zinc-800 group-hover:border-purple-500 transition-colors" />
                <div className="flex flex-col text-sm">
                  <span className="font-medium text-zinc-50 max-w-[120px] truncate group-hover:text-purple-400 transition-colors">{user.displayName}</span>
                </div>
              </Link>
              <button onClick={handleSignOut} className="text-zinc-500 hover:text-zinc-50 transition-colors p-1" title="Sign Out">
                <SignOut size={18} />
              </button>
            </div>
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
