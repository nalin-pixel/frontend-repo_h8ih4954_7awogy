import React from 'react';

const Footer = () => {
  return (
    <footer className="mt-10 border-t border-neutral-200 dark:border-neutral-800">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-neutral-600 dark:text-neutral-400 flex items-center justify-between">
        <p>© {new Date().getFullYear()} Campus Vibes</p>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Privacy</a>
          <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Terms</a>
          <a href="#discover" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Back to top</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
