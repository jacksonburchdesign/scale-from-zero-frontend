import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RocketLaunch, GithubLogo, Sparkle, ChartLineUp, Users, ArrowRight, ArrowDown, ArrowLeft, ArrowUp } from '@phosphor-icons/react';

export default function Home() {
  const navigate = useNavigate();
  const [activeFeature, setActiveFeature] = useState<number | null>(null);

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <img src="/block.svg" className="absolute top-32 right-[10%] w-12 h-12 rotate-12 hidden md:block opacity-100 z-0" alt="Decorative Block" />

        <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-16 items-center">

          {/* Left Content */}
          <div className="max-w-2xl">
            <p className="text-zinc-400 font-medium italic tracking-wide mb-4">
              The public portfolio for elite builders
            </p>

            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
              Build in Public.<br />
              <span className="text-purple-600">
                Without the Friction.
              </span>
            </h1>

            <p className="text-lg md:text-xl text-zinc-400 mb-10 leading-relaxed max-w-xl">
              Connect your GitHub and Vercel. We use AI to automatically translate your technical commits into beautiful, investor-ready changelogs.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <button
                onClick={() => navigate('/login')}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-500 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all"
              >
                <GithubLogo size={24} weight="fill" />
                Continue with GitHub
              </button>
              <div className="flex items-center justify-center w-full sm:w-auto text-purple-600">
                <ArrowUp size={28} weight="bold" className="animate-bounce sm:hidden" />
                <ArrowLeft size={28} weight="bold" className="hidden sm:block animate-bounce-left" />
              </div>
            </div>
          </div>

          {/* Right Visual Mockup */}
          <div className="relative">

            <div className="relative bg-zinc-900/30 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl flex flex-col gap-6">

              {/* Terminal Snippet */}
              <div className="bg-zinc-950 rounded-xl border border-zinc-800/50 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-700"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-700"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-700"></div>
                </div>
                <div className="font-mono text-xs sm:text-sm text-zinc-400 space-y-1">
                  <div className="flex gap-2"><span className="text-purple-400">~</span><span>git commit -m "feat: migrate auth to postgres and add redis caching"</span></div>
                  <div className="flex gap-2"><span className="text-purple-400">~</span><span>git push origin main</span></div>
                </div>
              </div>

              {/* Transformation Arrow */}
              <div className="flex justify-center -my-2 relative z-10">
                <ArrowDown size={28} weight="bold" className="text-purple-600 drop-shadow-md" />
              </div>

              {/* Public Changelog Output */}
              <div className="bg-zinc-950 rounded-xl border border-purple-400/20 p-5 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-purple-400"></div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded bg-purple-400/10 text-purple-400 text-[10px] font-bold uppercase tracking-wider">Shipped</span>
                  <span className="text-xs text-zinc-500 font-mono">Just now</span>
                </div>
                <h3 className="text-zinc-50 font-semibold mb-2">Sign-in is now 10x faster ⚡️</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  We've completely overhauled our authentication infrastructure under the hood. Logging in is now lightning fast and significantly more reliable during traffic spikes.
                </p>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Social Proof Banner */}
      <section className="py-12 border-y border-zinc-900 bg-zinc-950/50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm font-medium text-zinc-500 mb-8 tracking-wide uppercase">Trusted by builders pushing code to</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-20 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="flex items-center gap-2 font-bold text-lg md:text-xl"><GithubLogo size={28} className="md:w-8 md:h-8" weight="fill" /> GitHub</div>
            <div className="flex items-center gap-2 font-bold text-lg md:text-xl"><svg width="28" height="28" className="md:w-8 md:h-8" viewBox="0 0 76 65" fill="currentColor"><path d="M37.5274 0L75.0548 65H0L37.5274 0Z" /></svg> Vercel</div>
            <div className="flex items-center gap-2 font-bold text-lg md:text-xl text-zinc-300">Linear</div>
            <div className="flex items-center gap-2 font-bold text-lg md:text-xl text-zinc-300">Firebase</div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-32 relative overflow-hidden">
        <img src="/block.svg" className="absolute top-24 left-[5%] w-10 h-10 -rotate-45 hidden md:block opacity-100 z-0" alt="Decorative Block" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">Ship faster. Look better.</h2>
            <p className="text-lg text-zinc-400">ScaleFromZero takes the busywork out of building in public. We automatically translate your hard work into a format that investors and non-technical fans can understand.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div 
              className="group perspective-[1000px] cursor-pointer"
              onClick={() => setActiveFeature(activeFeature === 1 ? null : 1)}
              onMouseEnter={() => setActiveFeature(1)}
              onMouseLeave={() => setActiveFeature(null)}
            >
              <div className={`relative w-full h-full transition-all duration-700 [transform-style:preserve-3d] ${activeFeature === 1 ? '[transform:rotateY(180deg)] -translate-y-2' : ''}`}>
                
                {/* Front */}
                <div className="relative w-full h-full [backface-visibility:hidden] bg-zinc-900/30 backdrop-blur-xl border border-white/10 rounded-2xl p-8 flex flex-col">
                  <div className="w-14 h-14 relative flex items-center justify-center mb-6 z-10 shrink-0">
                    <img src="/block.svg" className="absolute inset-0 w-full h-full object-contain -z-10 opacity-100" alt="" />
                    <Sparkle size={24} className="text-white" weight="bold" />
                  </div>
                  <h3 className="text-xl font-bold text-zinc-50 mb-3">Intelligent Changelog</h3>
                  <p className="text-zinc-400 leading-relaxed">
                    Powered by Google Vertex AI. We instantly translate your raw, technical git commits into beautiful, human-readable product updates.
                  </p>
                </div>

                {/* Back */}
                <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-purple-900/10 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-6 flex flex-col justify-center items-center text-center">
                  <div className="font-mono text-xs text-zinc-400 mb-4 bg-zinc-950/80 p-3 rounded-lg border border-white/5 w-full text-left overflow-hidden">
                    <span className="text-purple-400">git</span> commit -m "fix mem leak"
                  </div>
                  <ArrowDown size={20} className="text-purple-400 mb-4" weight="bold" />
                  <div className="text-sm font-medium text-zinc-200 bg-purple-600/20 p-4 rounded-xl border border-purple-500/20 w-full">
                    "System stability improved for smoother performance! 🚀"
                  </div>
                </div>

              </div>
            </div>

            {/* Feature 2 */}
            <div 
              className="group perspective-[1000px] cursor-pointer"
              onClick={() => setActiveFeature(activeFeature === 2 ? null : 2)}
              onMouseEnter={() => setActiveFeature(2)}
              onMouseLeave={() => setActiveFeature(null)}
            >
              <div className={`relative w-full h-full transition-all duration-700 [transform-style:preserve-3d] ${activeFeature === 2 ? '[transform:rotateY(180deg)] -translate-y-2' : ''}`}>
                
                {/* Front */}
                <div className="relative w-full h-full [backface-visibility:hidden] bg-zinc-900/30 backdrop-blur-xl border border-white/10 rounded-2xl p-8 flex flex-col">
                  <div className="w-14 h-14 relative flex items-center justify-center mb-6 z-10 shrink-0">
                    <img src="/block.svg" className="absolute inset-0 w-full h-full object-contain -z-10 opacity-100" alt="" />
                    <ChartLineUp size={24} className="text-white" weight="bold" />
                  </div>
                  <h3 className="text-xl font-bold text-zinc-50 mb-3">The Builder Portfolio</h3>
                  <p className="text-zinc-400 leading-relaxed">
                    Showcase your true velocity. We calculate your Builder Score and automatically verify your exact tech stack based on your repos.
                  </p>
                </div>

                {/* Back */}
                <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-purple-900/10 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-6 flex flex-col justify-center items-center">
                  <div className="text-5xl font-bold text-white mb-2 tracking-tight">98</div>
                  <div className="text-xs text-purple-400 uppercase tracking-widest font-bold mb-6">Builder Score</div>
                  
                  <div className="flex flex-wrap justify-center gap-2 mb-6">
                    <span className="px-3 py-1.5 rounded-lg bg-zinc-950/80 border border-white/5 text-xs text-zinc-300 font-medium">React</span>
                    <span className="px-3 py-1.5 rounded-lg bg-zinc-950/80 border border-white/5 text-xs text-zinc-300 font-medium">Go</span>
                    <span className="px-3 py-1.5 rounded-lg bg-zinc-950/80 border border-white/5 text-xs text-zinc-300 font-medium">Node</span>
                  </div>
                  <div className="text-xs text-zinc-400 font-mono">1,204 Verified Commits</div>
                </div>

              </div>
            </div>

            {/* Feature 3 */}
            <div 
              className="group perspective-[1000px] cursor-pointer"
              onClick={() => setActiveFeature(activeFeature === 3 ? null : 3)}
              onMouseEnter={() => setActiveFeature(3)}
              onMouseLeave={() => setActiveFeature(null)}
            >
              <div className={`relative w-full h-full transition-all duration-700 [transform-style:preserve-3d] ${activeFeature === 3 ? '[transform:rotateY(180deg)] -translate-y-2' : ''}`}>
                
                {/* Front */}
                <div className="relative w-full h-full [backface-visibility:hidden] bg-zinc-900/30 backdrop-blur-xl border border-white/10 rounded-2xl p-8 flex flex-col">
                  <div className="w-14 h-14 relative flex items-center justify-center mb-6 z-10 shrink-0">
                    <img src="/block.svg" className="absolute inset-0 w-full h-full object-contain -z-10 opacity-100" alt="" />
                    <Users size={24} className="text-white" weight="bold" />
                  </div>
                  <h3 className="text-xl font-bold text-zinc-50 mb-3">Frictionless Collaboration</h3>
                  <p className="text-zinc-400 leading-relaxed">
                    Building with a team? Invite contributors to your project with role-based access control. Everyone's work gets tracked and celebrated.
                  </p>
                </div>

                {/* Back */}
                <div className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-purple-900/10 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-6 flex flex-col justify-center">
                  <h4 className="text-sm font-bold text-purple-400 mb-4 text-center uppercase tracking-wider">Project Access</h4>
                  <div className="space-y-3 w-full">
                    <div className="flex items-center justify-between bg-zinc-950/80 p-3 rounded-lg border border-white/5">
                      <span className="text-sm text-zinc-200 flex items-center gap-2 font-medium">
                        <div className="w-6 h-6 rounded bg-purple-500 flex items-center justify-center text-xs text-white">J</div> jacks
                      </span>
                      <span className="text-xs text-purple-400 font-mono">Admin</span>
                    </div>
                    <div className="flex items-center justify-between bg-zinc-950/80 p-3 rounded-lg border border-white/5">
                      <span className="text-sm text-zinc-200 flex items-center gap-2 font-medium">
                        <div className="w-6 h-6 rounded bg-zinc-700 flex items-center justify-center text-xs text-white">A</div> alex
                      </span>
                      <span className="text-xs text-zinc-500 font-mono">Editor</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-24 border-t border-zinc-900 bg-zinc-950 relative overflow-hidden">
        <img src="/block.svg" className="absolute bottom-[30%] right-[8%] w-14 h-14 rotate-[30deg] hidden md:block opacity-100 z-0" alt="Decorative Block" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">How it works</h2>
            <p className="text-lg text-zinc-400">Zero extra effort. Just write code and push.</p>
          </div>

          <div className="max-w-4xl mx-auto space-y-16">

            {/* Step 1 */}
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center">
              <div className="flex-1 text-center md:text-right order-2 md:order-1">
                <h3 className="text-2xl font-bold text-zinc-50 mb-2">1. Push your code</h3>
                <p className="text-zinc-400">Commit and push to GitHub as you normally would. Our webhooks instantly detect your activity.</p>
              </div>
              <div className="w-16 h-16 shrink-0 relative flex items-center justify-center font-bold text-2xl text-white z-10 order-1 md:order-2 transition-transform duration-300 hover:scale-110">
                <img src="/block.svg" className="absolute inset-0 w-full h-full object-contain -z-10 opacity-100" alt="" />
                1
              </div>
              <div className="flex-1 w-full bg-zinc-900/30 backdrop-blur-xl border border-white/10 rounded-xl p-5 order-3 md:order-3">
                <div className="font-mono text-sm text-zinc-400">
                  <span className="text-purple-400">git</span> commit -m "fix memory leak in worker"
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center">
              <div className="flex-1 w-full bg-zinc-900/30 backdrop-blur-xl border border-white/10 rounded-xl p-5 border-t-2 md:border-t-0 md:border-l-2 border-purple-500 relative order-3 md:order-1">
                <div className="absolute top-2 right-2 flex gap-1">
                  <Sparkle size={16} className="text-purple-400" />
                </div>
                <div className="font-sans text-sm text-zinc-300 mt-2 md:mt-0">
                  <strong>AI Summary:</strong> Resolved an issue causing high memory usage in background tasks. System stability is improved.
                </div>
              </div>
              <div className="w-16 h-16 shrink-0 relative flex items-center justify-center font-bold text-2xl text-white z-10 order-1 md:order-2 transition-transform duration-300 hover:scale-110">
                <img src="/block.svg" className="absolute inset-0 w-full h-full object-contain -z-10 opacity-100" alt="" />
                2
              </div>
              <div className="flex-1 text-center md:text-left order-2 md:order-3">
                <h3 className="text-2xl font-bold text-zinc-50 mb-2">2. AI Drafts the Update</h3>
                <p className="text-zinc-400">Vertex AI parses the technical jargon and generates a professional, public-facing summary.</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center">
              <div className="flex-1 text-center md:text-right order-2 md:order-1">
                <h3 className="text-2xl font-bold text-zinc-50 mb-2">3. Publish to your Audience</h3>
                <p className="text-zinc-400">Review the draft, hit publish, and instantly update your portfolio and notify your followers.</p>
              </div>
              <div className="w-16 h-16 shrink-0 relative flex items-center justify-center font-bold text-2xl text-white z-10 order-1 md:order-2 transition-transform duration-300 hover:scale-110">
                <img src="/block.svg" className="absolute inset-0 w-full h-full object-contain -z-10 opacity-100" alt="" />
                3
              </div>
              <div className="flex-1 w-full bg-zinc-900/30 backdrop-blur-xl border border-white/10 rounded-xl p-5 flex items-center justify-center gap-3 text-zinc-300 font-medium order-3 md:order-3">
                <RocketLaunch size={24} weight="duotone" className="text-purple-400" />
                Update Shipped to Public Profile
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="py-32 relative overflow-hidden">

        {/* Background Building Blocks Pyramid */}
        <div className="absolute bottom-0 right-0 w-full h-full pointer-events-none hidden md:block z-0">
          <div className="absolute bottom-0 right-[-240px] w-[800px] h-[500px]">
            {/* Tumbling blocks on the left */}
            <img src="/block.svg" className="absolute bottom-16 right-[34rem] w-16 h-16 rotate-45" alt="" />
            <img src="/block.svg" className="absolute bottom-28 right-[30rem] w-16 h-16 -rotate-45" alt="" />
            <img src="/block.svg" className="absolute bottom-40 right-[26rem] w-16 h-16 rotate-6" alt="" />
            <img src="/block.svg" className="absolute bottom-20 right-[38rem] w-16 h-16 rotate-45" alt="" />

            {/* Pyramid Base (bottom row - 7 blocks) */}
            <img src="/block.svg" className="absolute bottom-[0px] right-[0px] w-16 h-16" alt="" />
            <img src="/block.svg" className="absolute bottom-[0px] right-[80px] w-16 h-16" alt="" />
            <img src="/block.svg" className="absolute bottom-[0px] right-[160px] w-16 h-16" alt="" />
            <img src="/block.svg" className="absolute bottom-[0px] right-[240px] w-16 h-16" alt="" />
            <img src="/block.svg" className="absolute bottom-[0px] right-[320px] w-16 h-16" alt="" />
            <img src="/block.svg" className="absolute bottom-[0px] right-[400px] w-16 h-16" alt="" />
            <img src="/block.svg" className="absolute bottom-[0px] right-[480px] w-16 h-16" alt="" />

            {/* Pyramid Row 2 (6 blocks) */}
            <img src="/block.svg" className="absolute bottom-[40px] right-[40px] w-16 h-16" alt="" />
            <img src="/block.svg" className="absolute bottom-[40px] right-[120px] w-16 h-16" alt="" />
            <img src="/block.svg" className="absolute bottom-[40px] right-[200px] w-16 h-16" alt="" />
            <img src="/block.svg" className="absolute bottom-[40px] right-[280px] w-16 h-16" alt="" />
            <img src="/block.svg" className="absolute bottom-[40px] right-[360px] w-16 h-16" alt="" />
            <img src="/block.svg" className="absolute bottom-[40px] right-[440px] w-16 h-16" alt="" />

            {/* Pyramid Row 3 (5 blocks) */}
            <img src="/block.svg" className="absolute bottom-[80px] right-[80px] w-16 h-16" alt="" />
            <img src="/block.svg" className="absolute bottom-[80px] right-[160px] w-16 h-16" alt="" />
            <img src="/block.svg" className="absolute bottom-[80px] right-[240px] w-16 h-16" alt="" />
            <img src="/block.svg" className="absolute bottom-[80px] right-[320px] w-16 h-16" alt="" />
            <img src="/block.svg" className="absolute bottom-[80px] right-[400px] w-16 h-16" alt="" />

            {/* Pyramid Row 4 (4 blocks) */}
            <img src="/block.svg" className="absolute bottom-[120px] right-[120px] w-16 h-16" alt="" />
            <img src="/block.svg" className="absolute bottom-[120px] right-[200px] w-16 h-16" alt="" />
            <img src="/block.svg" className="absolute bottom-[120px] right-[280px] w-16 h-16" alt="" />
            <img src="/block.svg" className="absolute bottom-[120px] right-[360px] w-16 h-16" alt="" />

            {/* Pyramid Row 5 (3 blocks) */}
            <img src="/block.svg" className="absolute bottom-[160px] right-[160px] w-16 h-16" alt="" />
            <img src="/block.svg" className="absolute bottom-[160px] right-[240px] w-16 h-16" alt="" />
            <img src="/block.svg" className="absolute bottom-[160px] right-[320px] w-16 h-16" alt="" />

            {/* Pyramid Row 6 (2 blocks) */}
            <img src="/block.svg" className="absolute bottom-[200px] right-[200px] w-16 h-16" alt="" />
            <img src="/block.svg" className="absolute bottom-[200px] right-[280px] w-16 h-16" alt="" />

            {/* Pyramid Top */}
            <img src="/block.svg" className="absolute bottom-[240px] right-[240px] w-16 h-16" alt="" />
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-8">Ready to scale your reputation?</h2>
          <p className="text-xl text-zinc-400 mb-10 max-w-2xl mx-auto">
            Stop letting your hard work hide in private repositories. Start building in public today.
          </p>
          <button
            onClick={() => navigate('/login')}
            className="inline-flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-500 text-white px-10 py-5 rounded-2xl text-xl font-bold transition-all hover:-translate-y-1"
          >
            Claim Your Profile
            <ArrowRight size={24} weight="bold" />
          </button>
        </div>
      </section>

    </>
  );
}
