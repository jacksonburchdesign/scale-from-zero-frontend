export default function HowItWorks() {
  return (
    <div className="max-w-4xl mx-auto px-6 pt-40 pb-24">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-5xl md:text-6xl font-extrabold text-zinc-50 tracking-tight mb-6">How it Works</h1>
        <p className="text-xl text-zinc-400">
          From git push to public portfolio in three seamless steps.
        </p>
      </div>

      <div className="space-y-12">
        <div className="bg-zinc-900/30 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-3xl flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-shrink-0 w-20 h-20 bg-zinc-800 border border-zinc-700 rounded-2xl flex items-center justify-center text-3xl font-extrabold text-zinc-50">
            1
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white mb-3">Connect Your Repositories</h2>
            <p className="text-zinc-400 leading-relaxed">
              Log in with GitHub and select the projects you want to track. We automatically configure the necessary webhooks—no manual setup required. Your source code remains perfectly secure; we only read the commit metadata.
            </p>
          </div>
        </div>

        <div className="bg-zinc-900/30 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-3xl flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-shrink-0 w-20 h-20 bg-zinc-800 border border-zinc-700 rounded-2xl flex items-center justify-center text-3xl font-extrabold text-zinc-50">
            2
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white mb-3">Push Code Normally</h2>
            <p className="text-zinc-400 leading-relaxed">
              Keep building exactly how you always have. Every time you push to your main branch, ScaleFromZero intercepts the commit messages in the background. No need to change your workflow or context-switch to write updates.
            </p>
          </div>
        </div>

        <div className="bg-zinc-900/30 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-3xl flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-shrink-0 w-20 h-20 bg-purple-600 border border-purple-500 rounded-2xl flex items-center justify-center text-3xl font-extrabold text-white">
            3
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white mb-3">Vertex AI Translates</h2>
            <p className="text-zinc-400 leading-relaxed">
              Our advanced AI models instantly translate your technical jargon into a polished, public-facing changelog entry. Your profile is automatically updated, keeping your audience and investors in the loop with zero effort.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
