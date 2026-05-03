import { useState } from 'react';
import { Copy, CheckCircle, WarningCircle, CheckCircle as CheckIcon } from '@phosphor-icons/react';

interface WebhookSetupProps {
  projectId: string;
  lastVercelDeploy?: any;
}

export default function WebhookSetup({ projectId, lastVercelDeploy }: WebhookSetupProps) {
  const [copiedGithub, setCopiedGithub] = useState(false);
  const [copiedVercel, setCopiedVercel] = useState(false);
  
  // In a real app, you'd fetch the deployed region/project ID dynamically from config
  const githubWebhookUrl = `https://us-central1-scale-from-zero.cloudfunctions.net/githubWebhook`;
  const vercelWebhookUrl = `https://us-central1-scale-from-zero.cloudfunctions.net/vercelWebhook?projectId=${projectId}`;

  const copyToClipboard = (url: string, type: 'github' | 'vercel') => {
    navigator.clipboard.writeText(url);
    if (type === 'github') {
      setCopiedGithub(true);
      setTimeout(() => setCopiedGithub(false), 2000);
    } else {
      setCopiedVercel(true);
      setTimeout(() => setCopiedVercel(false), 2000);
    }
  };

  const isVercelConnected = !!lastVercelDeploy;

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mt-8 space-y-8">
      {/* GitHub Webhook */}
      <div>
        <h3 className="text-lg font-semibold text-zinc-50 mb-2">Automate with GitHub Webhooks</h3>
        <p className="text-zinc-400 text-sm mb-4">
          Add this URL to your GitHub repository settings under <strong>Settings &gt; Webhooks</strong>. 
          Select "application/json" and send only "Push" events.
        </p>
        
        <div className="flex items-center gap-3 bg-zinc-950 border border-zinc-800 rounded-lg p-3">
          <code className="flex-1 text-sm text-zinc-300 font-mono truncate px-2">
            {githubWebhookUrl}
          </code>
          <button
            onClick={() => copyToClipboard(githubWebhookUrl, 'github')}
            className="flex items-center justify-center p-2 rounded-md hover:bg-zinc-800 text-zinc-400 hover:text-zinc-50 transition-colors"
            title="Copy GitHub URL"
          >
            {copiedGithub ? <CheckCircle size={20} className="text-emerald-400" weight="fill" /> : <Copy size={20} />}
          </button>
        </div>
        
        <div className="mt-2 text-xs text-zinc-500">
          <p>Ensure you set the Webhook Secret to match your Firebase Secret Manager configuration.</p>
        </div>
      </div>

      <div className="border-t border-zinc-800"></div>

      {/* Vercel Webhook */}
      <div>
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
            onClick={() => copyToClipboard(vercelWebhookUrl, 'vercel')}
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
