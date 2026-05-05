import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { httpsCallable } from 'firebase/functions';
import { db, functions } from '../lib/firebase';
import WebhookSetup from '../components/WebhookSetup';
import TeamManagement from '../components/TeamManagement';
import { PaperPlaneRight, PencilSimple, Clock, GithubLogo, TwitterLogo, LinkedinLogo, Globe, DiscordLogo, Link as LinkIcon, Plus, Trash, Check, X, Sparkle } from '@phosphor-icons/react';
import EditableField from '../components/EditableField';
import ImageUpload from '../components/ImageUpload';
import DailyCommitStack from '../components/DailyCommitStack';
import ReactMarkdown from 'react-markdown';

interface Changelog {
  id: string;
  status: 'draft' | 'published' | 'raw-commit';
  createdAt: any;
  technicalSummary?: string;
  nonTechnicalSummary?: string;
  themeCategory?: string;
  rawCommit?: string;
  deploymentUrl?: string;
  vercelStatus?: string;
  content?: string;
  rawCommits?: string;
}

export interface SocialLink {
  type: string;
  url: string;
}

export interface ProjectData {
  projectName?: string;
  description?: string;
  members?: Record<string, string>;
  lastVercelDeploy?: any;
  headerImageUrl?: string;
  logoUrl?: string;
  techStack?: string;
  technicalSummary?: string;
  skillsUtilized?: string; // Stored as comma separated "Skill:Percentage"
  problemStatement?: string;
  solutionStatement?: string;
  executiveSummary?: string;
  socialLinks?: SocialLink[];
  publicProfileConfig?: {
    hideCoverImage?: boolean;
    primaryColor?: string;
  };
  githubRepoFullName?: string; // Legacy
  connectedRepos?: string[];
  installationId?: number;
}

function ChangelogCard({ log, onPublish, onDelete, onRegenerate, showPublishButton = true, mode = 'non-technical' }: { log: Changelog, onPublish: (id: string) => void, onDelete?: (id: string) => void, onRegenerate?: (id: string) => void, showPublishButton?: boolean, mode?: 'technical' | 'non-technical' }) {
  const renderThemeIcon = (theme: string | undefined) => {
    switch (theme) {
      case 'Feature': return '✨ Feature';
      case 'Fix': return '🐛 Bug Fix';
      case 'Polish': return '💅 Polish';
      case 'Infra': return '🏗️ Infra';
      case 'Security': return '🔒 Security';
      default: return '📝 Update';
    }
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 transition-all hover:border-zinc-700">
      <div className="flex justify-between items-start mb-4">
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-3">
            {log.status === 'draft' ? (
              <span className="flex items-center gap-1.5 bg-yellow-500/10 text-yellow-500 text-xs font-semibold px-2.5 py-1 rounded border border-yellow-500/20">
                <PencilSimple weight="bold" /> Draft Review
              </span>
            ) : (
              <span className="flex items-center gap-1.5 bg-emerald-400/10 text-emerald-400 text-xs font-semibold px-2.5 py-1 rounded border border-emerald-400/20">
                <PaperPlaneRight weight="bold" /> Published
              </span>
            )}
            <span className="flex items-center gap-1 text-xs text-zinc-500 font-mono">
              <Clock size={14} /> 
              {log.createdAt?.toDate ? log.createdAt.toDate().toLocaleDateString() : 'Just now'}
            </span>
            {log.themeCategory && (
              <span className="flex items-center gap-1 text-xs text-zinc-300 font-medium px-2 py-1 bg-zinc-800/80 rounded border border-zinc-700/50">
                {renderThemeIcon(log.themeCategory)}
              </span>
            )}
          </div>
          {log.deploymentUrl && (
            <div className="flex items-center gap-2 text-xs">
              <span className="bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded border border-blue-500/20 font-medium">
                Vercel {log.vercelStatus || 'Deployed'}
              </span>
              <a href={`https://${log.deploymentUrl}`} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-purple-400 underline decoration-zinc-700 underline-offset-2">
                {log.deploymentUrl}
              </a>
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-2 ml-4 flex-shrink-0">
          {onRegenerate && (log.rawCommit || log.rawCommits) && (
            <button 
              onClick={() => onRegenerate(log.id)}
              className="p-2 text-zinc-500 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400/50"
              title="Regenerate AI Summary"
            >
              <Sparkle size={20} />
            </button>
          )}
          {onDelete && (
            <button 
              onClick={() => onDelete(log.id)}
              className="p-2 text-zinc-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-400/50"
              title="Delete draft"
            >
              <Trash size={20} />
            </button>
          )}
          {showPublishButton && log.status === 'draft' && (
            <button 
              onClick={() => onPublish(log.id)}
              className="bg-purple-600 hover:bg-purple-500 text-zinc-50 text-sm font-medium px-4 py-2 rounded-lg transition-colors focus:ring-2 focus:ring-purple-500 focus:outline-none"
            >
              Publish Update
            </button>
          )}
        </div>
      </div>

      {(log.technicalSummary || log.nonTechnicalSummary) ? (
        <div className="mt-6">
          <div className="prose prose-invert prose-sm max-w-none prose-p:text-zinc-300 prose-headings:text-zinc-100 prose-a:text-purple-400 prose-strong:text-zinc-200">
            <ReactMarkdown>
              {mode === 'technical' ? (log.technicalSummary || '') : (log.nonTechnicalSummary || '')}
            </ReactMarkdown>
          </div>
        </div>
      ) : (
        <div className="prose prose-invert max-w-none mt-4">
          <p className="text-zinc-300 leading-relaxed max-w-prose whitespace-pre-wrap">
            {log.content}
          </p>
        </div>
      )}
      
      {(log.rawCommit || log.rawCommits) && mode === 'technical' && (
        <div className="mt-6 pt-4 border-t border-zinc-800/50">
          <p className="text-xs font-semibold text-zinc-500 mb-2 uppercase tracking-wider">Raw Commit (Internal)</p>
          <code className="block bg-zinc-950 p-3 rounded-lg text-zinc-400 text-xs font-mono whitespace-pre-wrap border border-zinc-800/50">
            {log.rawCommit || log.rawCommits}
          </code>
        </div>
      )}
    </div>
  );
}

// Helper to parse "React:80, Firebase:20"
function parseSkills(skillsString?: string) {
  if (!skillsString) return [];
  return skillsString.split(',').map(s => {
    const [name, pct] = s.split(':');
    return { name: name?.trim() || 'Unknown', percentage: parseInt(pct?.trim() || '50', 10) };
  });
}

const LINK_TYPES = [
  { id: 'website', label: 'Website', icon: Globe },
  { id: 'github', label: 'GitHub', icon: GithubLogo },
  { id: 'twitter', label: 'Twitter/X', icon: TwitterLogo },
  { id: 'linkedin', label: 'LinkedIn', icon: LinkedinLogo },
  { id: 'discord', label: 'Discord', icon: DiscordLogo },
  { id: 'other', label: 'Other', icon: LinkIcon }
];

const ensureAbsoluteUrl = (url: string) => {
  if (!url) return '#';
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  return `https://${url}`;
};

function CustomSelect({ value, onChange, options }: { value: string, onChange: (val: string) => void, options: any[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find(o => o.id === value) || options[0];
  const Icon = selectedOption.icon;

  return (
    <div className="relative flex-shrink-0 w-[140px]">
      <button 
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between bg-zinc-950 border border-zinc-800 text-zinc-300 text-sm rounded-lg px-3 py-2 hover:bg-zinc-900 transition-colors focus:ring-1 focus:ring-purple-500 outline-none"
      >
        <div className="flex items-center gap-2">
          <Icon size={14} className="text-zinc-500" />
          <span className="truncate">{selectedOption.label}</span>
        </div>
        <svg className="w-3 h-3 text-zinc-500 flex-shrink-0 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
      </button>
      
      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full left-0 mt-1 w-full bg-zinc-900/90 backdrop-blur-xl border border-zinc-700/50 rounded-lg shadow-2xl z-20 py-1 overflow-hidden">
            {options.map(option => {
              const OptIcon = option.icon;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => { onChange(option.id); setIsOpen(false); }}
                  className={`w-full flex items-center gap-2 px-3 py-2 text-sm transition-colors ${value === option.id ? 'bg-purple-500/10 text-purple-400' : 'text-zinc-300 hover:bg-zinc-800 hover:text-zinc-50'}`}
                >
                  <OptIcon size={14} className={value === option.id ? 'text-purple-400' : 'text-zinc-500'} />
                  <span className="truncate">{option.label}</span>
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

function SocialLinksEditor({ links = [], onSave }: { links?: SocialLink[], onSave: (links: SocialLink[]) => void }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draftLinks, setDraftLinks] = useState<SocialLink[]>(links);

  // Sync draftLinks when links prop changes and not editing
  useEffect(() => {
    if (!isEditing) {
      setDraftLinks(links);
    }
  }, [links, isEditing]);

  const handleSave = () => {
    // filter out empty URLs
    const validLinks = draftLinks.filter(l => l.url.trim() !== '');
    onSave(validLinks);
    setIsEditing(false);
  };

  const addLink = () => {
    setDraftLinks([...draftLinks, { type: 'website', url: '' }]);
  };

  const removeLink = (index: number) => {
    setDraftLinks(draftLinks.filter((_, i) => i !== index));
  };

  const updateLink = (index: number, field: 'type' | 'url', value: string) => {
    const newLinks = [...draftLinks];
    newLinks[index] = { ...newLinks[index], [field]: value };
    setDraftLinks(newLinks);
  };

  if (isEditing) {
    return (
      <div className="space-y-4">
        {draftLinks.map((link, i) => {
          return (
            <div key={i} className="flex items-center gap-2 w-full">
              <CustomSelect 
                value={link.type} 
                onChange={(val) => updateLink(i, 'type', val)} 
                options={LINK_TYPES} 
              />
              <input 
                type="url" 
                value={link.url}
                onChange={(e) => updateLink(i, 'url', e.target.value)}
                placeholder="https://"
                className="flex-1 min-w-0 bg-zinc-950 border border-zinc-800 text-zinc-300 text-sm rounded-lg px-3 py-2 focus:ring-1 focus:ring-purple-500 outline-none"
              />
              <button onClick={() => removeLink(i)} className="flex-shrink-0 p-2 text-zinc-500 hover:text-red-400 transition-colors bg-zinc-950 border border-zinc-800 rounded-lg">
                <Trash size={16} />
              </button>
            </div>
          );
        })}
        
        <button onClick={addLink} className="flex items-center gap-2 text-xs font-medium text-zinc-400 hover:text-purple-400 transition-colors">
          <Plus size={14} /> Add Link
        </button>

        <div className="flex gap-2 justify-end pt-2 border-t border-zinc-800/50">
          <button onClick={() => { setDraftLinks(links); setIsEditing(false); }} className="p-1.5 text-zinc-500 hover:text-zinc-300 transition-colors">
            <X size={16} />
          </button>
          <button onClick={handleSave} className="p-1.5 text-emerald-500 hover:text-emerald-400 bg-emerald-500/10 rounded transition-colors">
            <Check size={16} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative">
      <button 
        onClick={() => setIsEditing(true)}
        className="absolute -top-2 -right-2 p-1.5 bg-zinc-800/80 text-zinc-400 hover:text-zinc-50 rounded-md opacity-0 group-hover:opacity-100 transition-opacity z-10 border border-zinc-700/50 shadow-sm"
      >
        <PencilSimple size={14} weight="bold" />
      </button>
      
      {links.length === 0 ? (
        <div className="text-sm text-zinc-600 italic">No project links added yet.</div>
      ) : (
        <div className="space-y-3">
          {links.map((link, i) => {
            const linkType = LINK_TYPES.find(t => t.id === link.type) || LINK_TYPES[5];
            const Icon = linkType.icon;
            return (
              <a 
                key={i} 
                href={ensureAbsoluteUrl(link.url)} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-zinc-300 hover:text-purple-400 transition-colors"
              >
                <Icon size={16} className="text-zinc-500" />
                {linkType.label}
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function ProjectDetails() {
  const { projectId } = useParams<{ projectId: string }>();
  const [changelogs, setChangelogs] = useState<Changelog[]>([]);
  const [projectData, setProjectData] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isCompiling, setIsCompiling] = useState(false);
  const [isGeneratingProfile, setIsGeneratingProfile] = useState(false);
  
  const [mainTab, setMainTab] = useState<'profile' | 'configure'>('profile');
  const [profileTab, setProfileTab] = useState<'technical' | 'non-technical'>('non-technical');

  useEffect(() => {
    if (!projectId) return;

    const unsubscribeProject = onSnapshot(doc(db, 'projects', projectId), (docSnap) => {
      if (docSnap.exists()) {
        setProjectData(docSnap.data() as ProjectData);
      }
    });

    const q = query(
      collection(db, 'projects', projectId, 'changelogs'),
      orderBy('createdAt', 'desc')
    );

    const unsubscribeChangelogs = onSnapshot(q, (snapshot) => {
      const logs: Changelog[] = [];
      snapshot.forEach((doc) => {
        logs.push({ id: doc.id, ...doc.data() } as Changelog);
      });
      setChangelogs(logs);
      setLoading(false);
    });

    return () => {
      unsubscribeProject();
      unsubscribeChangelogs();
    };
  }, [projectId]);

  const handleUpdateProject = async (field: string, value: any) => {
    if (!projectId) return;
    try {
      // Handle nested fields like publicProfileConfig.primaryColor
      if (field.includes('.')) {
        const [parent, child] = field.split('.');
        const currentParentObj = (projectData as any)[parent] || {};
        await updateDoc(doc(db, 'projects', projectId), {
          [parent]: {
            ...currentParentObj,
            [child]: value
          }
        });
      } else {
        await updateDoc(doc(db, 'projects', projectId), {
          [field]: value
        });
      }
    } catch (error) {
      console.error('Failed to update project data', error);
    }
  };

  const handlePublish = async (changelogId: string) => {
    if (!projectId) return;
    try {
      await updateDoc(doc(db, 'projects', projectId, 'changelogs', changelogId), {
        status: 'published'
      });
    } catch (error) {
      console.error('Failed to publish', error);
    }
  };

  const handleDeleteChangelog = async (changelogId: string) => {
    if (!projectId) return;
    try {
      await deleteDoc(doc(db, 'projects', projectId, 'changelogs', changelogId));
    } catch (error) {
      console.error('Failed to delete changelog', error);
    }
  };

  const handleCompileDailyDrafts = async () => {
    if (!projectId) return;
    setIsCompiling(true);
    try {
      const compileDailyChangelog = httpsCallable(functions, 'compileDailyChangelog');
      await compileDailyChangelog({ projectId });
    } catch (error) {
      console.error('Failed to compile daily drafts:', error);
    } finally {
      setIsCompiling(false);
    }
  };

  const handleGenerateProfile = async () => {
    if (!projectId || !projectData?.githubRepoFullName) return;
    setIsGeneratingProfile(true);
    try {
      const generateProjectProfile = httpsCallable(functions, 'generateProjectProfile');
      await generateProjectProfile({ projectId });
    } catch (error) {
      console.error('Failed to generate project profile:', error);
    } finally {
      setIsGeneratingProfile(false);
    }
  };

  const handleGenerateDailyChangelog = async (changelogIds: string[]) => {
    if (!projectId) return;
    try {
      const generateDailyChangelog = httpsCallable(functions, 'generateDailyChangelog');
      await generateDailyChangelog({ projectId, changelogIds });
    } catch (error) {
      console.error('Failed to generate daily changelog:', error);
      throw error;
    }
  };

  const handleRegenerateChangelog = async (changelogId: string) => {
    if (!projectId) return;
    try {
      const regenerateChangelog = httpsCallable(functions, 'regenerateChangelog');
      await regenerateChangelog({ projectId, changelogId });
    } catch (error) {
      console.error('Failed to regenerate changelog:', error);
      alert('Failed to regenerate changelog. Check console for details.');
    }
  };

  if (loading) {
    return <div className="p-8 text-zinc-400">Loading project data...</div>;
  }

  const technicalChangelogs = changelogs.filter(log => log.status !== 'raw-commit' && (log.technicalSummary || log.content));
  const nonTechnicalChangelogs = changelogs.filter(log => log.status !== 'raw-commit' && (log.nonTechnicalSummary || log.content));

  const rawCommits = changelogs.filter(log => log.status === 'raw-commit');
  const groupedRawCommits = rawCommits.reduce((acc, log) => {
    if (!log.createdAt?.toDate) return acc;
    const dateStr = log.createdAt.toDate().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    if (!acc[dateStr]) acc[dateStr] = [];
    acc[dateStr].push(log);
    return acc;
  }, {} as Record<string, any[]>);

  return (
    <div 
      className="w-full pt-8 pb-24" 
      style={{ '--theme-primary': projectData?.publicProfileConfig?.primaryColor || '#4F46E5' } as React.CSSProperties}
    >
      <header className="mb-0 text-center border-b border-zinc-800 pb-8 px-8">
        <h1 className="text-5xl font-bold tracking-tight text-zinc-50">
          {projectData?.projectName || 'Project'}
        </h1>
      </header>

      {/* Main Tabs (Full Width Joined Buttons) */}
      <div className="flex w-full mb-10 border-b border-zinc-800 shadow-sm">
        <button 
          onClick={() => setMainTab('profile')}
          className={`flex-1 py-5 text-base font-semibold transition-colors border-r border-zinc-800 ${mainTab === 'profile' ? 'bg-[var(--theme-primary)] text-zinc-50' : 'bg-zinc-950 text-zinc-400 hover:text-zinc-50 hover:bg-zinc-900/50'}`}
        >
          Public Profile
        </button>
        <button 
          onClick={() => setMainTab('configure')}
          className={`flex-1 py-5 text-base font-semibold transition-colors ${mainTab === 'configure' ? 'bg-[var(--theme-primary)] text-zinc-50' : 'bg-zinc-950 text-zinc-400 hover:text-zinc-50 hover:bg-zinc-900/50'}`}
        >
          Configure
        </button>
      </div>

      {mainTab === 'configure' && (
        <div className="max-w-4xl mx-auto space-y-12 px-8">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 space-y-6">
            <div className="border-b border-zinc-800 pb-4">
              <h2 className="text-xl font-bold text-zinc-50">Public Profile Customization</h2>
              <p className="text-sm text-zinc-400 mt-1">Control how your project looks to the public.</p>
            </div>
            
            <div className="space-y-6">
              {/* Hide Cover Image Toggle */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-zinc-50">Hide Cover Image</h3>
                  <p className="text-sm text-zinc-400 mt-0.5">Remove the large banner at the top of your public profile.</p>
                </div>
                <button 
                  onClick={() => handleUpdateProject('publicProfileConfig.hideCoverImage', !projectData?.publicProfileConfig?.hideCoverImage)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${projectData?.publicProfileConfig?.hideCoverImage ? 'bg-[var(--theme-primary)]' : 'bg-zinc-700'}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${projectData?.publicProfileConfig?.hideCoverImage ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>

              {/* Theme Color Selection */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-zinc-50">Theme Color</h3>
                  <p className="text-sm text-zinc-400 mt-0.5">Choose a primary accent color for your project.</p>
                </div>
                <div className="flex items-center gap-3">
                  <input 
                    type="text" 
                    value={projectData?.publicProfileConfig?.primaryColor || '#4F46E5'}
                    onChange={(e) => handleUpdateProject('publicProfileConfig.primaryColor', e.target.value)}
                    className="bg-zinc-950 border border-zinc-800 text-zinc-300 text-sm rounded-lg px-3 py-1.5 focus:ring-1 focus:ring-[var(--theme-primary)] outline-none w-24 text-center font-mono uppercase"
                    placeholder="#HEX"
                  />
                  <div className="relative w-8 h-8 rounded-full overflow-hidden border border-zinc-700 cursor-pointer">
                    <input 
                      type="color" 
                      value={projectData?.publicProfileConfig?.primaryColor || '#4F46E5'}
                      onChange={(e) => handleUpdateProject('publicProfileConfig.primaryColor', e.target.value)}
                      className="absolute -inset-2 w-12 h-12 cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Add Sections Placeholder */}
              <div className="pt-6 border-t border-zinc-800/50">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-zinc-50 text-zinc-500">Custom Sections</h3>
                    <p className="text-sm text-zinc-400 mt-0.5 text-zinc-600">Add custom sections to your public profile (Coming Soon).</p>
                  </div>
                  <button disabled className="px-4 py-2 bg-zinc-800 text-zinc-500 rounded-lg text-sm font-medium cursor-not-allowed">
                    Add Section
                  </button>
                </div>
              </div>
            </div>
          </div>


          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 space-y-6">
            <div className="border-b border-zinc-800 pb-4">
              <h2 className="text-xl font-bold text-zinc-50 flex items-center gap-2">
                <Sparkle weight="fill" className="text-[var(--theme-primary)]" />
                AI Automation
              </h2>
              <p className="text-sm text-zinc-400 mt-1">Automatically populate your public profile based on your connected GitHub repository.</p>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-zinc-50">Generate Profile Details</h3>
                <p className="text-sm text-zinc-400 mt-0.5">We will analyze your repository's README and code to intelligently fill out your executive summary, problem statement, technical summary, and tech stack.</p>
              </div>
              <button 
                onClick={handleGenerateProfile}
                disabled={!projectData?.githubRepoFullName || isGeneratingProfile}
                className="px-4 py-2 bg-[var(--theme-primary)] hover:opacity-90 border border-transparent rounded-lg text-sm font-semibold text-zinc-50 transition-all disabled:opacity-50 disabled:bg-zinc-800 disabled:border-zinc-700 whitespace-nowrap flex-shrink-0 ml-6"
              >
                {isGeneratingProfile ? 'Generating...' : 'Auto-Generate from GitHub'}
              </button>
            </div>
            {!projectData?.githubRepoFullName && (
              <p className="text-xs text-red-400">You must have a connected GitHub repository to use this feature.</p>
            )}
          </div>

          {projectId && <WebhookSetup projectId={projectId} projectData={projectData as ProjectData} onUpdate={handleUpdateProject} />}
          {projectId && projectData?.members && (
            <TeamManagement projectId={projectId} members={projectData.members} />
          )}
        </div>
      )}

      {mainTab === 'profile' && (
        <div className="w-full space-y-0">
          {/* Customizable Header Section */}
          <div className="w-full bg-zinc-950 pb-12 border-b border-zinc-800">
            {/* Banner */}
            {!projectData?.publicProfileConfig?.hideCoverImage && (
              <div className="relative w-full h-64 sm:h-80 bg-zinc-900 border-b border-zinc-800">
                <ImageUpload 
                  type="banner" 
                  projectId={projectId!} 
                  currentUrl={projectData?.headerImageUrl} 
                  onUpload={(url) => handleUpdateProject('headerImageUrl', url)}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            {/* Profile Info (Logo and Title) */}
            <div className={`relative px-8 max-w-7xl mx-auto flex flex-col ${projectData?.publicProfileConfig?.hideCoverImage ? 'pt-8' : ''}`}>
              {/* Logo */}
              <div className={`${projectData?.publicProfileConfig?.hideCoverImage ? 'relative w-32 h-32' : 'absolute -top-16 left-8 w-32 h-32'} rounded-full border-4 border-zinc-950 bg-zinc-900 shadow-xl z-10`}>
                <ImageUpload 
                  type="logo" 
                  projectId={projectId!} 
                  currentUrl={projectData?.logoUrl} 
                  onUpload={(url) => handleUpdateProject('logoUrl', url)}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              
              {/* Title Section */}
              <div className={projectData?.publicProfileConfig?.hideCoverImage ? 'mt-8' : 'mt-20'}>
                 <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                   <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-50">
                     {projectData?.projectName || 'Unnamed Project'}
                   </h2>
                   
                   {Array.isArray(projectData?.socialLinks) && projectData.socialLinks.length > 0 && (
                     <div className="flex items-center gap-3 mt-2">
                       {projectData.socialLinks.map((link, i) => {
                         const linkType = LINK_TYPES.find(t => t.id === link.type) || LINK_TYPES.find(t => t.id === 'other')!;
                         const Icon = linkType.icon;
                         return (
                           <a 
                             key={i} 
                             href={ensureAbsoluteUrl(link.url)} 
                             target="_blank" 
                             rel="noopener noreferrer"
                             className="text-zinc-50 bg-[var(--theme-primary)] hover:opacity-90 transition-all p-2.5 rounded-lg shadow-sm flex items-center justify-center"
                             title={linkType.label}
                           >
                             <Icon size={22} weight="bold" />
                           </a>
                         );
                       })}
                     </div>
                   )}
                 </div>
                 
                 {projectData?.description && (
                   <p className="text-zinc-400 mt-3 text-lg">
                     {projectData.description}
                   </p>
                 )}
              </div>
            </div>
          </div>
          
          {/* Sub Tabs for Public Profile */}
          <div className="flex w-full mb-12 border-b border-zinc-800 bg-zinc-950">
            <button 
              onClick={() => setProfileTab('non-technical')}
              className={`flex-1 py-5 text-base font-semibold transition-colors border-r border-zinc-800 ${profileTab === 'non-technical' ? 'bg-[var(--theme-primary)] text-zinc-50' : 'bg-zinc-950 text-zinc-400 hover:text-zinc-50 hover:bg-zinc-900/50'}`}
            >
              Non-Technical Details
            </button>
            <button 
              onClick={() => setProfileTab('technical')}
              className={`flex-1 py-5 text-base font-semibold transition-colors ${profileTab === 'technical' ? 'bg-[var(--theme-primary)] text-zinc-50' : 'bg-zinc-950 text-zinc-400 hover:text-zinc-50 hover:bg-zinc-900/50'}`}
            >
              Technical Details
            </button>
          </div>

          {/* Profile Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-8 max-w-7xl mx-auto pb-12">
            <div className="lg:col-span-2 space-y-8">
              {profileTab === 'non-technical' && (
                <>
                  <div className="bg-zinc-900/30 border border-zinc-800 rounded-xl p-8 backdrop-blur-xl">
                    <h3 className="text-xl font-semibold text-zinc-50 mb-4">Executive Summary</h3>
                    <EditableField 
                      value={projectData?.executiveSummary || ''} 
                      onSave={(val) => handleUpdateProject('executiveSummary', val)} 
                      placeholder="High-level summary of the product vision and goals..."
                      multiline
                      className="text-zinc-300"
                    />
                  </div>

                  <div className="bg-zinc-900/30 border border-zinc-800 rounded-xl p-8 backdrop-blur-xl">
                    <h3 className="text-xl font-semibold text-zinc-50 mb-4">Problem & Solution</h3>
                    <div className="mb-6">
                      <h4 className="text-sm font-medium text-zinc-500 mb-2 uppercase tracking-wider">The Problem</h4>
                      <EditableField 
                        value={projectData?.problemStatement || ''} 
                        onSave={(val) => handleUpdateProject('problemStatement', val)} 
                        placeholder="What problem does this project solve?"
                        multiline
                        className="text-zinc-300"
                      />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-zinc-500 mb-2 uppercase tracking-wider">The Solution</h4>
                      <EditableField 
                        value={projectData?.solutionStatement || ''} 
                        onSave={(val) => handleUpdateProject('solutionStatement', val)} 
                        placeholder="How does your project solve it?"
                        multiline
                        className="text-zinc-300"
                      />
                    </div>
                  </div>
                </>
              )}

              {profileTab === 'technical' && (
                <>
                  <div className="bg-zinc-900/30 border border-zinc-800 rounded-xl p-8 backdrop-blur-xl">
                    <h3 className="text-xl font-semibold text-zinc-50 mb-4">Technical Summary</h3>
                    <EditableField 
                      value={projectData?.technicalSummary || ''} 
                      onSave={(val) => handleUpdateProject('technicalSummary', val)} 
                      placeholder="Deep dive into the architecture, infrastructure, and technical design..."
                      multiline
                      className="text-zinc-300"
                    />
                  </div>
                </>
              )}

              {/* Changelog Timeline aligned to the selected tab */}
              <div className="mt-12">
                <div className="flex justify-between items-center mb-6 border-b border-zinc-800 pb-4">
                  <h3 className="text-2xl font-bold text-zinc-50">
                    {profileTab === 'technical' ? 'Technical Updates' : 'Product Updates'}
                  </h3>
                  {changelogs.some(log => log.status === 'draft') && (
                    <button
                      onClick={handleCompileDailyDrafts}
                      disabled={isCompiling}
                      className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-lg text-sm font-semibold text-zinc-50 transition-colors disabled:opacity-50"
                    >
                      {isCompiling ? 'Compiling...' : 'Compile Daily Drafts'}
                    </button>
                  )}
                </div>
                <div className="space-y-6">
                  {/* Render Daily Commit Stacks first */}
                  {Object.entries(groupedRawCommits).map(([dateStr, commits]) => (
                    <DailyCommitStack 
                      key={dateStr} 
                      dateString={dateStr} 
                      commits={commits as any} 
                      onGenerate={handleGenerateDailyChangelog} 
                    />
                  ))}

                  {/* Render Drafts and Published Changelogs */}
                  {(profileTab === 'technical' ? technicalChangelogs : nonTechnicalChangelogs).map(log => (
                    <ChangelogCard key={log.id} log={log} onPublish={handlePublish} onDelete={handleDeleteChangelog} onRegenerate={handleRegenerateChangelog} showPublishButton={true} mode={profileTab} />
                  ))}
                  
                  {changelogs.length === 0 && Object.keys(groupedRawCommits).length === 0 && (
                    <p className="text-zinc-500 italic">No updates available.</p>
                  )}
                </div>
              </div>
            </div>

            {/* Right Sidebar (Tech Stack & Skills or Social Links) */}
            <div className="lg:col-span-1 space-y-8">
              {profileTab === 'non-technical' && (
                <>
                  <div className="bg-zinc-900/30 border border-zinc-800 rounded-xl p-6 backdrop-blur-xl">
                    <h3 className="text-sm font-medium text-zinc-500 mb-4 uppercase tracking-wider">Project Links</h3>
                    <SocialLinksEditor 
                      links={Array.isArray(projectData?.socialLinks) ? projectData.socialLinks : []} 
                      onSave={(newLinks) => handleUpdateProject('socialLinks', newLinks as any)} 
                    />
                  </div>
                </>
              )}

              {profileTab === 'technical' && (
                <>
                  <div className="bg-zinc-900/30 border border-zinc-800 rounded-xl p-6 backdrop-blur-xl">
                    <h3 className="text-sm font-medium text-zinc-500 mb-4 uppercase tracking-wider">Tech Stack</h3>
                    <EditableField 
                      value={projectData?.techStack || ''} 
                      onSave={(val) => handleUpdateProject('techStack', val)} 
                      placeholder="e.g. React, Node, Firebase, GCP"
                      className="text-zinc-300 font-mono text-sm"
                    />
                  </div>

                  <div className="bg-zinc-900/30 border border-zinc-800 rounded-xl p-6 backdrop-blur-xl">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-sm font-medium text-zinc-500 uppercase tracking-wider">Skills Utilized</h3>
                    </div>
                    <div className="mb-4 text-xs text-zinc-500 bg-zinc-950 p-2 rounded">
                      <EditableField 
                        value={projectData?.skillsUtilized || ''} 
                        onSave={(val) => handleUpdateProject('skillsUtilized', val)} 
                        placeholder="e.g. React:80, TypeScript:70, GCP:40"
                      />
                    </div>
                    
                    <div className="space-y-4">
                      {parseSkills(projectData?.skillsUtilized).map((skill, i) => (
                        <div key={i}>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-zinc-300 font-medium">{skill.name}</span>
                            <span className="text-zinc-500">{skill.percentage}%</span>
                          </div>
                          <div className="w-full bg-zinc-950 rounded-full h-1.5">
                            <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: `${skill.percentage}%` }}></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
