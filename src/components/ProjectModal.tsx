import { useState } from 'react';
import { X } from '@phosphor-icons/react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuthStore } from '../store/authStore';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({ isOpen, onClose }: ProjectModalProps) {
  const { user } = useAuthStore();
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [githubRepoFullName, setGithubRepoFullName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'projects'), {
        projectName,
        description,
        githubRepoFullName,
        ownerId: user.uid,
        members: {
          [user.uid]: 'owner'
        },
        createdAt: new Date()
      });
      console.log('Project created');
      
      // Reset form
      setProjectName('');
      setDescription('');
      setGithubRepoFullName('');
      onClose();
    } catch (error) {
      console.error('Error creating project:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-zinc-800">
          <h2 className="text-xl font-semibold text-zinc-50 tracking-tight">New Project</h2>
          <button onClick={onClose} className="text-zinc-400 hover:text-zinc-50 transition-colors focus:outline-none">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="projectName" className="text-sm font-medium text-zinc-300">
              Project Name
            </label>
            <input
              id="projectName"
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="e.g. Acme SaaS"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-zinc-50 placeholder-zinc-600 focus:ring-2 focus:ring-purple-500 focus:outline-none transition-shadow"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="githubRepo" className="text-sm font-medium text-zinc-300">
              GitHub Repository (owner/repo)
            </label>
            <input
              id="githubRepo"
              type="text"
              value={githubRepoFullName}
              onChange={(e) => setGithubRepoFullName(e.target.value)}
              placeholder="e.g. octocat/Hello-World"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-zinc-50 placeholder-zinc-600 focus:ring-2 focus:ring-purple-500 focus:outline-none transition-shadow font-mono text-sm"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="description" className="text-sm font-medium text-zinc-300">
              Short Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="A brief overview of your product..."
              rows={3}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-zinc-50 placeholder-zinc-600 focus:ring-2 focus:ring-purple-500 focus:outline-none transition-shadow resize-none"
            />
          </div>

          <div className="mt-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-lg text-zinc-400 hover:text-zinc-50 font-medium transition-colors focus:outline-none"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-purple-600 hover:bg-purple-500 disabled:bg-purple-600/50 text-zinc-50 px-5 py-2.5 rounded-lg font-medium transition-colors focus:ring-2 focus:ring-purple-500 focus:outline-none"
            >
              {isSubmitting ? 'Creating...' : 'Create Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
