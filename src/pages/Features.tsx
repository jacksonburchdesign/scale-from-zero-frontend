import { Sparkle, ChartLineUp, Users } from '@phosphor-icons/react';

export default function Features() {
  return (
    <div className="max-w-7xl mx-auto px-6 pt-40 pb-24">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-5xl md:text-6xl font-extrabold text-zinc-50 tracking-tight mb-6">Ship faster. Look better.</h1>
        <p className="text-xl text-zinc-400">
          Everything you need to maintain a professional builder portfolio without wasting time on formatting or copywriting.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-zinc-900/30 backdrop-blur-xl border border-white/10 p-10 rounded-3xl flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-indigo-500/20 border border-indigo-500/30 rounded-2xl flex items-center justify-center mb-6">
            <Sparkle size={32} className="text-indigo-400" weight="duotone" />
          </div>
          <h3 className="text-2xl font-bold text-zinc-50 mb-4">AI Changelogs</h3>
          <p className="text-zinc-400 leading-relaxed">
            We use Google's Vertex AI to translate your raw, technical git commits into clean, public-facing product updates that investors and non-technical stakeholders can actually understand.
          </p>
        </div>

        <div className="bg-zinc-900/30 backdrop-blur-xl border border-white/10 p-10 rounded-3xl flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-indigo-500/20 border border-indigo-500/30 rounded-2xl flex items-center justify-center mb-6">
            <ChartLineUp size={32} className="text-indigo-400" weight="duotone" />
          </div>
          <h3 className="text-2xl font-bold text-zinc-50 mb-4">The Builder Score</h3>
          <p className="text-zinc-400 leading-relaxed">
            Gamify your shipping velocity. Our proprietary algorithm calculates your Builder Score based on consistency, commit impact, and project momentum.
          </p>
        </div>

        <div className="bg-zinc-900/30 backdrop-blur-xl border border-white/10 p-10 rounded-3xl flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-indigo-500/20 border border-indigo-500/30 rounded-2xl flex items-center justify-center mb-6">
            <Users size={32} className="text-indigo-400" weight="duotone" />
          </div>
          <h3 className="text-2xl font-bold text-zinc-50 mb-4">Team Collaboration</h3>
          <p className="text-zinc-400 leading-relaxed">
            Building a startup? Invite your co-founders and aggregate your team's output into a single, verified company changelog that proves your execution speed.
          </p>
        </div>
      </div>
    </div>
  );
}
