export default function Documentation() {
  return (
    <div className="max-w-4xl mx-auto px-6 pt-40 pb-24">
      <div className="bg-zinc-900/30 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-3xl">
        <h1 className="text-4xl font-extrabold text-zinc-50 mb-6 tracking-tight">Documentation</h1>
        <p className="text-xl text-zinc-400 mb-12">Learn how to integrate your repositories and maximize your Builder Score.</p>
        
        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Quick Start</h2>
            <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-6 font-mono text-sm text-zinc-300">
              <p className="text-zinc-500 mb-2"># 1. Connect your GitHub account via OAuth</p>
              <p className="mb-4">Navigate to Dashboard {'>'} Connect</p>
              
              <p className="text-zinc-500 mb-2"># 2. Select repositories to track</p>
              <p className="mb-4">ScaleFromZero automatically installs the required webhooks.</p>
              
              <p className="text-zinc-500 mb-2"># 3. Push code normally</p>
              <p>git commit -m "feat: added new payment gateway"</p>
              <p>git push origin main</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">How the AI Works</h2>
            <p className="text-zinc-300 leading-relaxed">
              When a webhook fires on a push event, ScaleFromZero intercepts the commit messages and diff metadata. We pass this context to Google's Vertex AI to translate highly technical jargon ("fixed race condition in auth worker") into professional product updates ("Improved login stability for all users").
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Writing Good Commits</h2>
            <p className="text-zinc-300 leading-relaxed mb-4">
              While our AI is powerful, it relies on accurate context. We strongly recommend using Conventional Commits for the best translation results.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-zinc-300">
              <li><strong>feat:</strong> Triggers a "New Feature" changelog entry.</li>
              <li><strong>fix:</strong> Triggers an "Improvement" or "Bug Fix" entry.</li>
              <li><strong>chore/refactor:</strong> Typically aggregated into a "Performance & Maintenance" weekly summary to avoid spamming your public feed.</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
