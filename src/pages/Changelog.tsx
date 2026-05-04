export default function Changelog() {
  const updates = [
    {
      version: "v1.2.0",
      date: "May 3, 2026",
      title: "Introduced Custom Domains & Team Analytics",
      description: "You can now connect your own custom domain to your public builder portfolio. Additionally, Pro teams can now aggregate their Builder Scores across all members."
    },
    {
      version: "v1.1.5",
      date: "April 28, 2026",
      title: "Enhanced Vertex AI Translations",
      description: "We've upgraded our prompt architecture to better understand complex backend architecture changes, resulting in much cleaner public updates for infrastructure work."
    },
    {
      version: "v1.0.0",
      date: "April 15, 2026",
      title: "Public Launch",
      description: "ScaleFromZero is officially live! Connect your GitHub, start pushing code, and let the world see what you're building."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 pt-40 pb-24">
      <h1 className="text-4xl md:text-5xl font-extrabold text-zinc-50 mb-6 tracking-tight">Changelog</h1>
      <p className="text-xl text-zinc-400 mb-16">See exactly how we're scaling from zero, generated automatically from our own commits.</p>
      
      <div className="space-y-8">
        {updates.map((update, idx) => (
          <div key={idx} className="bg-zinc-900/30 backdrop-blur-xl border border-white/10 p-8 rounded-3xl relative">
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
              <span className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-3 py-1 rounded-full text-sm font-bold w-fit">
                {update.version}
              </span>
              <span className="text-zinc-500 text-sm font-medium">{update.date}</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">{update.title}</h2>
            <p className="text-zinc-300 leading-relaxed">{update.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
