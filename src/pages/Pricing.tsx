import { Check } from '@phosphor-icons/react';

export default function Pricing() {
  return (
    <div className="max-w-7xl mx-auto px-6 pt-40 pb-24">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-5xl md:text-6xl font-extrabold text-zinc-50 tracking-tight mb-6">Simple, transparent pricing</h1>
        <p className="text-xl text-zinc-400">
          Start building your public reputation for free. Upgrade when you need team collaboration and advanced AI features.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Free Tier */}
        <div className="bg-zinc-900/30 backdrop-blur-xl border border-white/10 p-10 rounded-3xl flex flex-col">
          <h2 className="text-2xl font-bold text-zinc-50 mb-2">Individual Builder</h2>
          <p className="text-zinc-400 mb-6">Perfect for solo developers shipping side projects.</p>
          <div className="mb-8">
            <span className="text-5xl font-extrabold text-white">$0</span>
            <span className="text-zinc-500"> / forever</span>
          </div>
          
          <ul className="space-y-4 mb-10 flex-1">
            <li className="flex items-center gap-3 text-zinc-300">
              <Check size={20} className="text-purple-500" weight="bold" />
              <span>1 connected GitHub account</span>
            </li>
            <li className="flex items-center gap-3 text-zinc-300">
              <Check size={20} className="text-purple-500" weight="bold" />
              <span>Unlimited public changelogs</span>
            </li>
            <li className="flex items-center gap-3 text-zinc-300">
              <Check size={20} className="text-purple-500" weight="bold" />
              <span>Basic Vertex AI commit translations</span>
            </li>
            <li className="flex items-center gap-3 text-zinc-300">
              <Check size={20} className="text-purple-500" weight="bold" />
              <span>Standard Builder Score</span>
            </li>
          </ul>
          
          <button className="w-full py-4 rounded-xl font-bold text-zinc-50 bg-zinc-800 hover:bg-zinc-700 transition-colors">
            Get Started
          </button>
        </div>

        {/* Pro Tier */}
        <div className="bg-purple-600/10 backdrop-blur-xl border border-purple-500/30 p-10 rounded-3xl flex flex-col relative">
          <div className="absolute top-0 right-8 -translate-y-1/2 bg-purple-500 text-white px-4 py-1 rounded-full text-sm font-bold tracking-wide">
            RECOMMENDED
          </div>
          <h2 className="text-2xl font-bold text-zinc-50 mb-2">Pro Team</h2>
          <p className="text-zinc-400 mb-6">For startups and agencies building in public together.</p>
          <div className="mb-8">
            <span className="text-5xl font-extrabold text-white">$29</span>
            <span className="text-zinc-500"> / month</span>
          </div>
          
          <ul className="space-y-4 mb-10 flex-1">
            <li className="flex items-center gap-3 text-zinc-300">
              <Check size={20} className="text-purple-400" weight="bold" />
              <span>Unlimited GitHub accounts</span>
            </li>
            <li className="flex items-center gap-3 text-zinc-300">
              <Check size={20} className="text-purple-400" weight="bold" />
              <span>Custom domain support</span>
            </li>
            <li className="flex items-center gap-3 text-zinc-300">
              <Check size={20} className="text-purple-400" weight="bold" />
              <span>Advanced AI tone customization</span>
            </li>
            <li className="flex items-center gap-3 text-zinc-300">
              <Check size={20} className="text-purple-400" weight="bold" />
              <span>Team Builder Score analytics</span>
            </li>
          </ul>
          
          <button className="w-full py-4 rounded-xl font-bold text-white bg-purple-600 hover:bg-purple-500 transition-colors">
            Upgrade to Pro
          </button>
        </div>
      </div>
    </div>
  );
}
