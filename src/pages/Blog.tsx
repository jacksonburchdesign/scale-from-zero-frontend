export default function Blog() {
  return (
    <div className="max-w-7xl mx-auto px-6 pt-40 pb-24">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-5xl md:text-6xl font-extrabold text-zinc-50 tracking-tight mb-6">Build in Public</h1>
        <p className="text-xl text-zinc-400">
          Insights, engineering deep-dives, and transparency reports from the ScaleFromZero team.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {[1, 2, 3].map((item) => (
          <div key={item} className="bg-zinc-900/30 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden group cursor-pointer">
            <div className="h-48 bg-zinc-800 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <img src="/block.svg" className="w-16 h-16 opacity-50 group-hover:scale-110 transition-transform duration-500" alt="" />
              </div>
            </div>
            <div className="p-8">
              <div className="flex gap-2 mb-4">
                <span className="text-indigo-400 text-xs font-bold uppercase tracking-wider">Engineering</span>
              </div>
              <h2 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors">How we use Vertex AI to parse complex git histories</h2>
              <p className="text-zinc-400 text-sm line-clamp-3">
                Translating raw developer logs into investor-ready updates requires more than just a simple LLM prompt. Here is a deep dive into our pipeline.
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
