import { useState } from 'react';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { Crown, PencilSimple, Link, Copy, CheckCircle } from '@phosphor-icons/react';

interface TeamManagementProps {
  projectId: string;
  members: Record<string, string>; // uid -> role
}

export default function TeamManagement({ projectId, members }: TeamManagementProps) {
  const [inviteToken, setInviteToken] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateInvite = async () => {
    setIsGenerating(true);
    try {
      const functions = getFunctions();
      const generateInviteFn = httpsCallable(functions, 'generateInvite');
      const result = await generateInviteFn({ projectId });
      const { token } = result.data as { token: string };
      setInviteToken(token);
    } catch (error) {
      console.error('Failed to generate invite:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyInviteLink = () => {
    if (!inviteToken) return;
    const inviteUrl = `${window.location.origin}/invite/${inviteToken}`;
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mt-8">
      <h3 className="text-lg font-semibold text-zinc-50 mb-4">Team Management</h3>
      
      <div className="space-y-3 mb-6">
        {Object.entries(members || {}).map(([uid, role]) => (
          <div key={uid} className="flex items-center justify-between p-3 bg-zinc-950 border border-zinc-800 rounded-lg">
            <span className="text-zinc-300 font-mono text-sm truncate">{uid}</span>
            <span className="flex items-center gap-1.5 px-2 py-1 bg-zinc-800 rounded text-xs font-medium text-zinc-400 capitalize border border-zinc-700">
              {role === 'owner' ? <Crown weight="fill" className="text-amber-400" /> : <PencilSimple weight="fill" className="text-zinc-400" />}
              {role}
            </span>
          </div>
        ))}
      </div>

      <div className="border-t border-zinc-800 pt-6">
        <h4 className="text-sm font-semibold text-zinc-50 mb-2">Invite Collaborators</h4>
        <p className="text-xs text-zinc-400 mb-4">Generate a unique invite link. Anyone with the link can join as a contributor.</p>
        
        {!inviteToken ? (
          <button
            onClick={generateInvite}
            disabled={isGenerating}
            className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 disabled:bg-zinc-800/50 text-zinc-50 px-4 py-2 rounded-lg font-medium transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <Link size={16} />
            {isGenerating ? 'Generating...' : 'Generate Invite Link'}
          </button>
        ) : (
          <div className="flex items-center gap-3 bg-zinc-950 border border-zinc-800 rounded-lg p-2">
            <code className="flex-1 text-sm text-emerald-400 font-mono truncate px-2">
              {window.location.origin}/invite/{inviteToken}
            </code>
            <button
              onClick={copyInviteLink}
              className="flex items-center justify-center p-2 rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-50 transition-colors"
              title="Copy Link"
            >
              {copied ? <CheckCircle size={18} className="text-emerald-400" weight="fill" /> : <Copy size={18} />}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
