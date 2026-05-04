import { Link } from 'react-router-dom';

export default function Signup() {
  return (
    <div className="flex flex-col items-center justify-center px-4 pt-40 pb-24">
      <div className="w-full max-w-md bg-zinc-900/30 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-none">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-zinc-50 tracking-tight mb-2">Create an Account</h1>
          <p className="text-zinc-400">Join ScaleFromZero to start building in public.</p>
        </div>
        
        <p className="text-center text-zinc-400 mb-6">Signup onboarding flow coming soon...</p>
        
        <div className="text-center text-sm text-zinc-500">
          Already have an account?{' '}
          <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-medium">
            Log in here
          </Link>
        </div>
      </div>
    </div>
  );
}
