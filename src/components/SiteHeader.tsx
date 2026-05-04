import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { List, X } from '@phosphor-icons/react';

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Drawer Backdrop */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-zinc-950/80 backdrop-blur-sm z-[60]"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Drawer Menu */}
      <div className={`fixed top-0 left-0 h-full w-72 bg-zinc-950 border-r border-zinc-800 shadow-2xl z-[70] transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 flex flex-col h-full">

          {/* Drawer Header */}
          <div className="flex justify-between items-center mb-10">
            <div className="flex items-center gap-2">
              <img src="/sfz-logo.svg" className="w-8 h-8 object-contain" alt="SFZ Logo" />
              <span className="text-zinc-50 font-extrabold text-lg tracking-tight">ScaleFromZero</span>
            </div>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 -mr-2 text-zinc-400 hover:text-zinc-50 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Drawer Links */}
          <div className="flex flex-col gap-2 flex-1">
            <Link to="/features" onClick={() => setIsMenuOpen(false)} className="px-4 py-4 rounded-xl text-lg font-medium text-zinc-300 hover:bg-zinc-900 hover:text-zinc-50 transition-colors">Features</Link>
            <Link to="/how-it-works" onClick={() => setIsMenuOpen(false)} className="px-4 py-4 rounded-xl text-lg font-medium text-zinc-300 hover:bg-zinc-900 hover:text-zinc-50 transition-colors">How it Works</Link>
            <Link to="/login" onClick={() => setIsMenuOpen(false)} className="px-4 py-4 rounded-xl text-lg font-medium text-zinc-300 hover:bg-zinc-900 hover:text-zinc-50 transition-colors">Log In</Link>
          </div>

          {/* Drawer Footer */}
          <div className="pt-6 border-t border-zinc-800">
            <Link
              to="/login"
              onClick={() => setIsMenuOpen(false)}
              className="flex justify-center items-center w-full bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-4 rounded-xl text-base font-semibold transition-all"
            >
              Start Building
            </Link>
          </div>

        </div>
      </div>

      {/* Navigation Bar */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800 py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-3 items-center relative">

          {/* Left: Hamburger Menu */}
          <div className="flex justify-start">
            <button
              onClick={() => setIsMenuOpen(true)}
              className="p-2 -ml-2 text-zinc-400 hover:text-zinc-50 transition-colors"
            >
              <List size={28} />
            </button>
          </div>

          {/* Center: Logo */}
          <div className="flex justify-center items-center">
            <Link to="/" className="text-zinc-50 font-extrabold text-2xl tracking-tight flex items-center gap-2">
              <img src="/sfz-logo.svg" className="w-10 h-10 object-contain" alt="SFZ Logo" />
              <span className="hidden sm:inline">ScaleFromZero</span>
            </Link>
          </div>

          {/* Right: CTA */}
          <div className="flex justify-end items-center">
            <Link
              to="/login"
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 md:px-5 py-2 md:py-2.5 rounded-lg text-xs md:text-sm font-semibold transition-all"
            >
              Start Building
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
