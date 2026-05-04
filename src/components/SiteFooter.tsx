import { Link } from 'react-router-dom';

export default function SiteFooter() {
  return (
    <footer className="py-24 bg-transparent relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-16">
          
          {/* Brand Column */}
          <div className="md:col-span-5 md:pr-12">
            <div className="flex items-center gap-3 mb-6">
              <img src="/sfz-logo.svg" className="w-10 h-10 object-contain" alt="SFZ Logo" />
              <span className="text-zinc-50 font-extrabold text-2xl tracking-tight">ScaleFromZero</span>
            </div>
            <p className="text-zinc-400 leading-relaxed max-w-sm">
              The builder portfolio for those who push code. Automatically translate your technical commits into professional, public-facing updates that investors and audiences actually understand.
            </p>
          </div>

          {/* Links Columns */}
          <div className="md:col-span-2">
            <h4 className="text-white font-semibold mb-6">Product</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link to="/features" className="text-zinc-400 hover:text-indigo-400 transition-colors">Features</Link></li>
              <li><Link to="/how-it-works" className="text-zinc-400 hover:text-indigo-400 transition-colors">How it works</Link></li>
              <li><Link to="/pricing" className="text-zinc-400 hover:text-indigo-400 transition-colors">Pricing</Link></li>
              <li><Link to="/login" className="text-zinc-400 hover:text-indigo-400 transition-colors">Log In</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-white font-semibold mb-6">Resources</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link to="/docs" className="text-zinc-400 hover:text-indigo-400 transition-colors">Documentation</Link></li>
              <li><Link to="/changelog" className="text-zinc-400 hover:text-indigo-400 transition-colors">Changelog</Link></li>
              <li><Link to="/builder-score" className="text-zinc-400 hover:text-indigo-400 transition-colors">Builder Score</Link></li>
              <li><Link to="/blog" className="text-zinc-400 hover:text-indigo-400 transition-colors">Blog</Link></li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-white font-semibold mb-6">Legal</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link to="/privacy" className="text-zinc-400 hover:text-indigo-400 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-zinc-400 hover:text-indigo-400 transition-colors">Terms of Service</Link></li>
              <li><Link to="/acceptable-use" className="text-zinc-400 hover:text-indigo-400 transition-colors">Acceptable Use</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-zinc-500 text-sm font-medium">
            {new Date().getFullYear()} ScaleFromZero. All rights reserved.
          </p>
          <p className="text-zinc-500 text-sm font-medium">
            Created by: <a href="https://jacksonburch.cloud/scalefromzero" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 transition-colors">Jackson Burch</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
