import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Calendar, Filter } from 'lucide-react';

const categories = ['All', 'Hackathon', 'Fest', 'Workshop', 'Seminar', 'Meetup'];

const EventFilterBar = ({ onFilter }) => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');

  const apply = () => {
    onFilter({ query, category: category === 'All' ? '' : category });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="-mt-8 mx-auto max-w-6xl px-4"
    >
      <div className="w-full rounded-2xl bg-white/70 dark:bg-neutral-900/70 backdrop-blur-md border border-white/30 dark:border-neutral-800/70 shadow-sm p-3">
        <div className="flex flex-col sm:flex-row gap-3 items-stretch">
          <div className="flex items-center gap-2 flex-1 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 px-3">
            <Search size={18} className="text-neutral-500" />
            <input
              aria-label="Search events"
              placeholder="Search events, organizers, tags..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent py-2 outline-none text-neutral-800 dark:text-neutral-100 placeholder:text-neutral-400"
              onKeyDown={(e) => e.key === 'Enter' && apply()}
            />
          </div>

          <div className="flex gap-2 overflow-x-auto hide-scrollbar">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`whitespace-nowrap inline-flex items-center gap-2 px-3 py-2 rounded-full border text-sm transition ${
                  category === c
                    ? 'bg-blue-600 text-white border-blue-600 shadow'
                    : 'bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-700'
                }`}
                aria-pressed={category === c}
              >
                {c === 'All' ? <Filter size={16} /> : <Calendar size={16} />}
                {c}
              </button>
            ))}
            <button
              onClick={apply}
              className="ml-auto sm:ml-0 px-4 py-2 rounded-xl bg-emerald-400 text-emerald-900 font-medium shadow hover:shadow-md"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EventFilterBar;
