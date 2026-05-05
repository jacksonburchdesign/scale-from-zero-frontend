import { useState } from 'react';
import { Copy, WarningCircle, CheckCircle, CheckCircle as CheckIcon } from '@phosphor-icons/react';
import GitHubAppSetup from './GitHubAppSetup';
import type { ProjectData } from '../pages/ProjectDetails';

interface WebhookSetupProps {
  projectId: string;
  projectData: ProjectData;
  onUpdate: (field: string, value: any) => void;
}

export default function WebhookSetup({ projectId, projectData, onUpdate }: WebhookSetupProps) {
  const [copiedVercel, setCopiedVercel] = useState(false);
  
  const vercelWebhookUrl = `https://us-central1-scale-from-zero.cloudfunctions.net/vercelWebhook?projectId=${projectId}`;

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedVercel(true);
    setTimeout(() => setCopiedVercel(false), 2000);
  };

  const isVercelConnected = !!projectData.lastVercelDeploy;

  return (
    <div className="space-y-8 mt-8">
      {/* GitHub App Setup */}
      <GitHubAppSetup projectId={projectId} projectData={projectData} onUpdate={onUpdate} />

      {/* Vercel Webhook */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-zinc-50">Automate Vercel Deployments</h3>
          <div className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded border ${isVercelConnected ? 'bg-emerald-400/10 text-emerald-400 border-emerald-400/20' : 'bg-amber-500/10 text-amber-500 border-amber-500/20'}`}>
            {isVercelConnected ? (
              <><CheckIcon weight="bold" /> Connected</>
            ) : (
              <><WarningCircle weight="bold" /> Pending Connection</>
            )}
          </div>
        </div>
        <p className="text-zinc-400 text-sm mb-4">
          Add this custom webhook URL to your Vercel project under <strong>Settings &gt; Webhooks</strong>. We'll automatically draft a changelog when a deployment succeeds.
        </p>
        
        <div className="flex items-center gap-3 bg-zinc-950 border border-zinc-800 rounded-lg p-3">
          <code className="flex-1 text-sm text-zinc-300 font-mono truncate px-2">
            {vercelWebhookUrl}
          </code>
          <button
            onClick={() => copyToClipboard(vercelWebhookUrl)}
            className="flex items-center justify-center p-2 rounded-md hover:bg-zinc-800 text-zinc-400 hover:text-zinc-50 transition-colors"
            title="Copy Vercel URL"
          >
            {copiedVercel ? <CheckCircle size={20} className="text-emerald-400" weight="fill" /> : <Copy size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
}
