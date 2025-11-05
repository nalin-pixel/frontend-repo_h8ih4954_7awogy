import React from 'react';
import { Calendar, User } from 'lucide-react';

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/60 dark:bg-neutral-900/60 border-b border-white/20 dark:border-neutral-800/50">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
            <Calendar size={20} />
          </div>
          <span className="font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
            Campus Vibes
          </span>
        </div>
        <nav className="flex items-center gap-3">
          <a href="#discover" className="text-sm text-neutral-700 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400 transition">Discover</a>
          <a href="#events" className="text-sm text-neutral-700 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400 transition">Events</a>
          <button className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-600 text-white text-sm shadow hover:shadow-md transition">
            <User size={16} />
            Me
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
