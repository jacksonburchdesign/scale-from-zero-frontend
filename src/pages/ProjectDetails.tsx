import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { collection, query, orderBy, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import WebhookSetup from '../components/WebhookSetup';
import TeamManagement from '../components/TeamManagement';
import { PaperPlaneRight, PencilSimple, Clock } from '@phosphor-icons/react';

interface Changelog {
  id: string;
  content: string;
  rawCommits?: string;
  status: 'draft' | 'published';
  createdAt: any;
}

interface ProjectData {
  members?: Record<string, string>;
  lastVercelDeploy?: any;
}

export default function ProjectDetails() {
  const { projectId } = useParams<{ projectId: string }>();
  const [changelogs, setChangelogs] = useState<Changelog[]>([]);
  const [projectData, setProjectData] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!projectId) return;

    // Fetch project data
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

  const handlePublish = async (changelogId: string) => {
    if (!projectId) return;
    try {
      const docRef = doc(db, 'projects', projectId, 'changelogs', changelogId);
      await updateDoc(docRef, {
        status: 'published'
      });
    } catch (error) {
      console.error('Failed to publish', error);
    }
  };

  if (loading) {
    return <div className="p-8 text-zinc-400">Loading project data...</div>;
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-50 mb-2">Project Updates</h1>
        <p className="text-zinc-400">Review your automated drafts and publish them to your audience.</p>
      </header>

      {/* Webhook Configuration Block */}
      {projectId && <WebhookSetup projectId={projectId} lastVercelDeploy={projectData?.lastVercelDeploy} />}
      
      {/* Team Management Block */}
      {projectId && projectData?.members && (
        <TeamManagement projectId={projectId} members={projectData.members} />
      )}

      <div className="mt-12">
        <h2 className="text-xl font-semibold text-zinc-50 mb-6">Changelog Timeline</h2>
        
        {changelogs.length === 0 ? (
          <div className="text-center p-12 bg-zinc-900 border border-zinc-800 rounded-xl border-dashed">
            <p className="text-zinc-400">No updates yet. Push code to your repository to generate a draft!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {changelogs.map((log) => (
              <div key={log.id} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 transition-all hover:border-zinc-700">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
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
                  </div>
                  
                  {log.status === 'draft' && (
                    <button 
                      onClick={() => handlePublish(log.id)}
                      className="bg-indigo-600 hover:bg-indigo-500 text-zinc-50 text-sm font-medium px-4 py-2 rounded-lg transition-colors focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    >
                      Publish Update
                    </button>
                  )}
                </div>

                <div className="prose prose-invert max-w-none">
                  <p className="text-zinc-300 leading-relaxed max-w-prose whitespace-pre-wrap">
                    {log.content}
                  </p>
                </div>
                
                {log.rawCommits && (
                  <div className="mt-6 pt-4 border-t border-zinc-800/50">
                    <p className="text-xs font-semibold text-zinc-500 mb-2 uppercase tracking-wider">Raw Commits (Internal)</p>
                    <code className="block bg-zinc-950 p-3 rounded-lg text-zinc-400 text-xs font-mono whitespace-pre-wrap">
                      {log.rawCommits}
                    </code>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
