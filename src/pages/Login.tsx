import { signInWithPopup } from 'firebase/auth';
import { auth, githubProvider } from '../lib/firebase';
import { GithubLogo } from '@phosphor-icons/react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  const handleGithubLogin = async () => {
    try {
      await signInWithPopup(auth, githubProvider);
      const returnUrl = sessionStorage.getItem('redirectAfterLogin');
      if (returnUrl) {
        sessionStorage.removeItem('redirectAfterLogin');
        navigate(returnUrl);
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-zinc-50 tracking-tight mb-2">ScaleFromZero</h1>
          <p className="text-zinc-400">Build in public. Showcase traction.</p>
        </div>
        
        <button
          onClick={handleGithubLogin}
          className="w-full flex items-center justify-center gap-3 bg-indigo-600 hover:bg-indigo-500 text-zinc-50 font-medium py-3 px-4 rounded-lg transition-colors focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        >
          <GithubLogo size={24} weight="fill" />
          Continue with GitHub
        </button>
      </div>
    </div>
  );
}
