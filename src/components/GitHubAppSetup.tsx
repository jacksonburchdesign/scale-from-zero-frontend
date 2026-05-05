import { useState } from 'react';
import { CheckCircle, WarningCircle, GithubLogo, Plus } from '@phosphor-icons/react';
import type { ProjectData } from '../pages/ProjectDetails';

interface GitHubAppSetupProps {
  projectId: string;
  projectData: ProjectData;
  onUpdate: (field: string, value: any) => void;
}

export default function GitHubAppSetup({ projectId, projectData, onUpdate }: GitHubAppSetupProps) {
  const [newRepo, setNewRepo] = useState('');
  
  const isConnected = !!projectData?.installationId;
  const connectedRepos = projectData?.connectedRepos || [];
  
  // Also migrate legacy githubRepoFullName if it exists
  if (projectData?.githubRepoFullName && !connectedRepos.includes(projectData.githubRepoFullName)) {
    connectedRepos.push(projectData.githubRepoFullName);
  }

  const appSlug = import.meta.env.VITE_GITHUB_APP_SLUG || 'scale-from-zero';
  const installUrl = `https://github.com/apps/${appSlug}/installations/new?state=${projectId}`;

  const handleAddRepo = () => {
    if (!newRepo.trim()) return;
    const formattedRepo = newRepo.trim();
    if (!connectedRepos.includes(formattedRepo)) {
      onUpdate('connectedRepos', [...connectedRepos, formattedRepo]);
    }
    setNewRepo('');
  };

  const handleRemoveRepo = (repoToRemove: string) => {
    onUpdate('connectedRepos', connectedRepos.filter((r: string) => r !== repoToRemove));
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-6">
      <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
        <div>
          <h3 className="text-lg font-semibold text-zinc-50 flex items-center gap-2">
            <GithubLogo weight="fill" className="text-zinc-50" />
            GitHub Integration
          </h3>
          <p className="text-sm text-zinc-400 mt-1">
            Connect our official GitHub App to automate your project's changelog.
          </p>
        </div>
        <div className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded border ${isConnected ? 'bg-emerald-400/10 text-emerald-400 border-emerald-400/20' : 'bg-amber-500/10 text-amber-500 border-amber-500/20'}`}>
          {isConnected ? (
            <><CheckCircle weight="bold" /> Connected</>
          ) : (
            <><WarningCircle weight="bold" /> Pending</>
          )}
        </div>
      </div>

      {!isConnected ? (
        <div className="flex flex-col items-center justify-center py-8 px-4 text-center bg-zinc-950 border border-zinc-800 border-dashed rounded-xl">
          <GithubLogo size={48} weight="duotone" className="text-zinc-600 mb-4" />
          <h4 className="text-zinc-50 font-medium mb-2">No GitHub Account Connected</h4>
          <p className="text-sm text-zinc-400 mb-6 max-w-sm">
            Authorize ScaleFromZero to access your repositories and automatically draft AI-powered changelogs whenever you push code.
          </p>
          <a
            href={installUrl}
            className="flex items-center gap-2 bg-zinc-50 text-zinc-950 hover:bg-zinc-200 px-6 py-2.5 rounded-lg font-semibold transition-colors text-sm"
          >
            <GithubLogo weight="fill" size={18} />
            Connect GitHub Repository
          </a>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-zinc-50 mb-1">Connected Repositories</h4>
            <p className="text-xs text-zinc-400 mb-3">
              Add the `owner/repo` path for any repositories associated with this project. We'll listen for pushes to these repositories.
            </p>
          </div>
          
          <div className="space-y-2">
            {connectedRepos.map((repo: string) => (
              <div key={repo} className="flex items-center justify-between bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3">
                <span className="font-mono text-sm text-zinc-300">{repo}</span>
                <button
                  onClick={() => handleRemoveRepo(repo)}
                  className="text-zinc-500 hover:text-red-400 text-xs font-medium transition-colors"
                >
                  Remove
                </button>
              </div>
            ))}
            
            {connectedRepos.length === 0 && (
              <p className="text-sm text-zinc-500 italic py-2">No repositories mapped yet.</p>
            )}
          </div>

          <div className="flex gap-2 pt-2">
            <input
              type="text"
              value={newRepo}
              onChange={(e) => setNewRepo(e.target.value)}
              placeholder="e.g. octocat/Hello-World"
              className="flex-1 bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2 text-sm text-zinc-50 placeholder-zinc-600 focus:outline-none focus:border-zinc-700"
              onKeyDown={(e) => e.key === 'Enter' && handleAddRepo()}
            />
            <button
              onClick={handleAddRepo}
              disabled={!newRepo.trim()}
              className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 text-zinc-50 px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-zinc-700"
            >
              <Plus weight="bold" />
              Add Repo
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
