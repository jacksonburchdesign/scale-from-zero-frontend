import { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';

interface Project {
  id: string;
  projectName: string;
  description: string;
  githubRepoFullName: string;
}

export default function Dashboard() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    if (!user) return;
    
    const q = query(
      collection(db, 'projects'),
      where('ownerId', '==', user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const projs: Project[] = [];
      snapshot.forEach((doc) => {
        projs.push({ id: doc.id, ...doc.data() } as Project);
      });
      setProjects(projs);
    });

    return () => unsubscribe();
  }, [user]);

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-50">Dashboard</h1>
        <p className="text-zinc-400 mt-2">Track your projects and ship updates.</p>
      </header>

      {projects.length === 0 ? (
        <div className="text-center p-12 bg-zinc-900 border border-zinc-800 rounded-xl border-dashed">
          <p className="text-zinc-400">You don't have any projects yet. Create one to get started!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div 
              key={project.id}
              onClick={() => navigate(`/project/${project.id}`)}
              className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-zinc-700 transition-colors cursor-pointer flex flex-col h-full"
            >
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold text-zinc-50">{project.projectName}</h2>
              </div>
              <p className="text-zinc-400 text-sm mb-6 flex-1">
                {project.description || 'No description provided.'}
              </p>
              <div className="text-xs text-zinc-500 font-mono truncate">
                {project.githubRepoFullName}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
