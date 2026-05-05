import { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuthStore } from '../store/authStore';
import { CircleNotch, CheckCircle, WarningCircle } from '@phosphor-icons/react';

export default function GitHubCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { projectId: routeProjectId } = useParams<{ projectId: string }>();
  const { user } = useAuthStore();
  
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    async function processInstallation() {
      try {
        const installationId = searchParams.get('installation_id');
        // setup_action is passed by GitHub but we only need installation_id
        const stateProjectId = searchParams.get('state'); // In case the Setup URL is global and projectId is passed via state

        const targetProjectId = routeProjectId || stateProjectId;

        if (!installationId) {
          throw new Error('Missing installation_id in URL parameters.');
        }

        if (!targetProjectId) {
          throw new Error('Could not determine the target Project ID. Make sure to pass the state parameter when installing.');
        }

        if (!user) {
          throw new Error('You must be logged in to connect a GitHub repository.');
        }

        // Verify project ownership
        const projectRef = doc(db, 'projects', targetProjectId);
        const projectSnap = await getDoc(projectRef);

        if (!projectSnap.exists()) {
          throw new Error('Project not found.');
        }

        if (projectSnap.data().ownerId !== user.uid) {
          throw new Error('You do not have permission to modify this project.');
        }

        // Update project with installation ID
        await updateDoc(projectRef, {
          installationId: parseInt(installationId, 10),
          // We don't automatically add repos to connectedRepos here because the user
          // needs to explicitly map which repos belong to this project in the UI.
        });

        setStatus('success');
        
        // Redirect back to project configuration after a short delay
        setTimeout(() => {
          navigate(`/project/${targetProjectId}`);
        }, 2000);

      } catch (err: any) {
        setStatus('error');
        setErrorMessage(err.message || 'An unknown error occurred.');
      }
    }

    processInstallation();
  }, [searchParams, routeProjectId, navigate, user]);

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 max-w-md w-full text-center space-y-4 shadow-xl">
        {status === 'loading' && (
          <>
            <div className="flex justify-center mb-6">
              <CircleNotch size={48} className="text-[var(--theme-primary)] animate-spin" />
            </div>
            <h2 className="text-xl font-bold text-zinc-50">Connecting GitHub...</h2>
            <p className="text-sm text-zinc-400">Please wait while we securely link your repository.</p>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="flex justify-center mb-6">
              <CheckCircle size={48} className="text-emerald-400" weight="fill" />
            </div>
            <h2 className="text-xl font-bold text-zinc-50">Successfully Connected!</h2>
            <p className="text-sm text-zinc-400">Your GitHub App installation was successful. Redirecting you back to your project...</p>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="flex justify-center mb-6">
              <WarningCircle size={48} className="text-red-400" weight="fill" />
            </div>
            <h2 className="text-xl font-bold text-zinc-50">Connection Failed</h2>
            <p className="text-sm text-red-400/80 bg-red-400/10 p-3 rounded-lg border border-red-400/20">{errorMessage}</p>
            <button 
              onClick={() => navigate('/dashboard')}
              className="mt-6 w-full py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-50 font-medium rounded-lg transition-colors"
            >
              Return to Dashboard
            </button>
          </>
        )}
      </div>
    </div>
  );
}
