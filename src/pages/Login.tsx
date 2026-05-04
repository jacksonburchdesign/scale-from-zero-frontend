import { useState } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, githubProvider } from '../lib/firebase';
import { GithubLogo } from '@phosphor-icons/react';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleGithubLogin = async () => {
    try {
      await signInWithPopup(auth, githubProvider);
      const returnUrl = sessionStorage.getItem('redirectAfterLogin');
      if (returnUrl) {
        sessionStorage.removeItem('redirectAfterLogin');
        navigate(returnUrl);
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Implementation placeholder for email/password auth
    console.log('Email login not yet implemented');
  };

  return (
    <div className="flex flex-col items-center justify-center px-4 pt-40 pb-24">
      <div className="w-full max-w-md bg-zinc-900/30 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-none">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-zinc-50 tracking-tight mb-2">ScaleFromZero</h1>
          <p className="text-zinc-400">Log in to your account</p>
        </div>
        
        <button
          onClick={handleGithubLogin}
          className="w-full flex items-center justify-center gap-3 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-50 font-medium py-3 px-4 rounded-lg transition-colors focus:ring-2 focus:ring-zinc-500 focus:outline-none mb-6"
        >
          <GithubLogo size={24} weight="fill" />
          Continue with GitHub
        </button>

        <div className="relative flex py-2 items-center mb-6">
          <div className="flex-grow border-t border-zinc-800"></div>
          <span className="flex-shrink-0 mx-4 text-zinc-500 text-sm">or</span>
          <div className="flex-grow border-t border-zinc-800"></div>
        </div>

        <form onSubmit={handleEmailLogin} className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1">Email address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-zinc-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-zinc-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-500 text-zinc-50 font-medium py-3 px-4 rounded-lg transition-colors focus:ring-2 focus:ring-purple-500 focus:outline-none"
          >
            Log In
          </button>
        </form>

        <div className="text-center text-sm text-zinc-500">
          Don't have an account?{' '}
          <Link to="/signup" className="text-purple-400 hover:text-purple-300 font-medium">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
