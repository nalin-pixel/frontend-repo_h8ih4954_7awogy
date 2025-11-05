import React from 'react';
import { motion } from 'framer-motion';

const HeroBanner = () => {
  return (
    <section id="discover" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 opacity-90" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative mx-auto max-w-6xl px-4 py-16 sm:py-20 text-white"
      >
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight drop-shadow-lg">
          Discover What’s Happening On Campus 🎉
        </h1>
        <p className="mt-3 max-w-2xl text-white/90">
          A playful blend of calendar, events, and notes — find your next hackathon, fest, or workshop.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <button className="px-4 py-2 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 transition border border-white/30">
            Browse Events
          </button>
          <button className="px-4 py-2 rounded-full bg-emerald-400 text-emerald-900 font-medium shadow-md hover:shadow-lg transition">
            Create Event
          </button>
        </div>
      </motion.div>
      <motion.div
        aria-hidden
        initial={{ y: 0 }}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute -bottom-16 right-0 w-[36rem] h-[36rem] rounded-full bg-white/20 blur-3xl"
      />
    </section>
  );
};

export default HeroBanner;
