import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { useAuthStore } from '../store/authStore';
import { CheckCircle, XCircle, Spinner } from '@phosphor-icons/react';

export default function InviteAccept() {
  const { token } = useParams<{ token: string }>();
  const { user, loading: authLoading } = useAuthStore();
  const navigate = useNavigate();
  
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  const [errorMessage, setErrorMessage] = useState('');
  const [projectName, setProjectName] = useState('');

  useEffect(() => {
    // If not authenticated, redirect to login with return path
    if (!authLoading && !user) {
      // In a real app, you might want to save the redirect URL to sessionStorage
      sessionStorage.setItem('redirectAfterLogin', `/invite/${token}`);
      navigate('/login');
      return;
    }

    if (user && token && status === 'verifying') {
      const accept = async () => {
        try {
          const functions = getFunctions();
          const acceptInviteFn = httpsCallable(functions, 'acceptInvite');
          const result = await acceptInviteFn({ token });
          const { projectId, projectName } = result.data as any;
          
          setProjectName(projectName);
          setStatus('success');
          
          // Redirect to project after 3 seconds
          setTimeout(() => {
            navigate(`/project/${projectId}`);
          }, 3000);
        } catch (error: any) {
          console.error('Failed to accept invite:', error);
          setErrorMessage(error.message || 'Invalid or expired invite link.');
          setStatus('error');
        }
      };
      
      accept();
    }
  }, [user, authLoading, token, navigate, status]);

  if (authLoading) return <div className="h-screen w-full bg-zinc-950 flex items-center justify-center text-zinc-50">Loading...</div>;

  return (
    <div className="h-screen w-full bg-zinc-950 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl text-center">
        {status === 'verifying' && (
          <div className="flex flex-col items-center">
            <Spinner size={48} className="text-purple-500 animate-spin mb-6" />
            <h2 className="text-2xl font-bold text-zinc-50 mb-2">Verifying Invite</h2>
            <p className="text-zinc-400">Please wait while we secure your access...</p>
          </div>
        )}

        {status === 'success' && (
          <div className="flex flex-col items-center">
            <CheckCircle size={64} className="text-emerald-400 mb-6" weight="fill" />
            <h2 className="text-2xl font-bold text-zinc-50 mb-2">You're In!</h2>
            <p className="text-zinc-400 mb-6">
              You've successfully joined <strong>{projectName || 'the project'}</strong> as a contributor.
            </p>
            <p className="text-sm text-zinc-500">Redirecting to the dashboard...</p>
          </div>
        )}

        {status === 'error' && (
          <div className="flex flex-col items-center">
            <XCircle size={64} className="text-red-500 mb-6" weight="fill" />
            <h2 className="text-2xl font-bold text-zinc-50 mb-2">Invite Failed</h2>
            <p className="text-zinc-400 mb-8">{errorMessage}</p>
            <button 
              onClick={() => navigate('/dashboard')}
              className="bg-zinc-800 hover:bg-zinc-700 text-zinc-50 px-6 py-2.5 rounded-lg font-medium transition-colors"
            >
              Return to Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
