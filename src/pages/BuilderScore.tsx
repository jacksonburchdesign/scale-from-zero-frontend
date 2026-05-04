export default function BuilderScore() {
  return (
    <div className="max-w-4xl mx-auto px-6 pt-40 pb-24 text-center">
      <div className="bg-zinc-900/30 backdrop-blur-xl border border-white/10 p-8 md:p-16 rounded-3xl">
        <div className="w-24 h-24 bg-purple-500/20 border border-purple-500/30 rounded-2xl mx-auto mb-8 flex items-center justify-center text-4xl font-extrabold text-purple-400">
          98
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-zinc-50 mb-6 tracking-tight">The Builder Score</h1>
        <p className="text-xl text-zinc-400 mb-12 max-w-2xl mx-auto">
          Not all commits are created equal. The Builder Score is a proprietary metric that evaluates consistency, impact, and momentum.
        </p>
        
        <div className="grid md:grid-cols-3 gap-8 text-left">
          <div className="bg-zinc-950/50 border border-white/5 p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-white mb-3">Consistency</h3>
            <p className="text-zinc-400 text-sm">Shipping a small update every day is weighted higher than pushing a massive refactor once a month.</p>
          </div>
          <div className="bg-zinc-950/50 border border-white/5 p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-white mb-3">Impact</h3>
            <p className="text-zinc-400 text-sm">Our AI analyzes the semantic weight of your commits. Feature additions and critical bug fixes carry the most value.</p>
          </div>
          <div className="bg-zinc-950/50 border border-white/5 p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-white mb-3">Momentum</h3>
            <p className="text-zinc-400 text-sm">Streaks matter. The Builder Score acts as a trailing indicator of your engineering velocity over the last 90 days.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
