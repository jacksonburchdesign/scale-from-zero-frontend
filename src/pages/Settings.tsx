import { useAuthStore } from '../store/authStore';
import { User, Key, Bell, ShieldCheck } from '@phosphor-icons/react';

export default function Settings() {
  const { user } = useAuthStore();

  return (
    <div className="p-8 max-w-4xl mx-auto pb-24">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-50 mb-2">User Settings</h1>
        <p className="text-zinc-400">Manage your profile, connected accounts, and preferences.</p>
      </header>

      <div className="space-y-6">
        {/* Profile Section */}
        <section className="bg-zinc-900 border border-zinc-800 rounded-xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <User size={24} className="text-purple-400" weight="duotone" />
            <h2 className="text-xl font-semibold text-zinc-50">Profile Information</h2>
          </div>
          
          <div className="flex items-center gap-6 mb-8">
            <img src={user?.photoURL || ''} alt="Avatar" className="w-20 h-20 rounded-full border-2 border-zinc-800" />
            <div>
              <p className="text-lg font-medium text-zinc-50">{user?.displayName}</p>
              <p className="text-zinc-400">{user?.email}</p>
            </div>
          </div>
          
          <div className="space-y-4 max-w-md">
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-1">Display Name</label>
              <input type="text" disabled value={user?.displayName || ''} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-zinc-50 opacity-50 cursor-not-allowed" />
              <p className="text-xs text-zinc-500 mt-1">Managed by GitHub.</p>
            </div>
          </div>
        </section>

        {/* Integrations Section */}
        <section className="bg-zinc-900 border border-zinc-800 rounded-xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <Key size={24} className="text-purple-400" weight="duotone" />
            <h2 className="text-xl font-semibold text-zinc-50">Integrations</h2>
          </div>
          
          <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center">
                <i className="ph-fill ph-github-logo text-xl text-zinc-50"></i>
              </div>
              <div>
                <p className="font-medium text-zinc-50">GitHub</p>
                <p className="text-sm text-zinc-400">Connected</p>
              </div>
            </div>
            <span className="text-emerald-400 text-sm font-medium bg-emerald-400/10 px-3 py-1 rounded-full border border-emerald-400/20">Active</span>
          </div>
        </section>

        {/* Notifications Placeholder */}
        <section className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 opacity-50">
          <div className="flex items-center gap-3 mb-6">
            <Bell size={24} className="text-zinc-400" weight="duotone" />
            <h2 className="text-xl font-semibold text-zinc-50">Notifications</h2>
          </div>
          <p className="text-zinc-400 text-sm">Notification preferences coming soon.</p>
        </section>

        {/* Security Placeholder */}
        <section className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 opacity-50">
          <div className="flex items-center gap-3 mb-6">
            <ShieldCheck size={24} className="text-zinc-400" weight="duotone" />
            <h2 className="text-xl font-semibold text-zinc-50">Security</h2>
          </div>
          <p className="text-zinc-400 text-sm">Security settings coming soon.</p>
        </section>
      </div>
    </div>
  );
}
