import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import EventFilterBar from './components/EventFilterBar';
import EventCard from './components/EventCard';

const seedEvents = [
  {
    id: 'e1',
    title: 'Campus Hackathon 2025',
    description: 'Build, collaborate, and launch innovative projects in 24 hours.',
    category: 'Hackathon',
    imageUrl: 'https://images.unsplash.com/photo-1551836022-4c4c79ecde51?q=80&w=1600&auto=format&fit=crop',
    organizer: { id: 'o1', name: 'Tech Club', avatarUrl: '' },
    location: 'Innovation Lab',
    start: new Date(Date.now() + 86400000).toISOString(),
    end: new Date(Date.now() + 2 * 86400000).toISOString(),
    tags: ['coding', 'teams'],
    rsvpCount: 126,
  },
  {
    id: 'e2',
    title: 'Autumn Arts Fest',
    description: 'A colorful celebration of music, dance, and visual arts.',
    category: 'Fest',
    imageUrl: 'https://images.unsplash.com/photo-1464375117522-1311d6a5b81a?q=80&w=1600&auto=format&fit=crop',
    organizer: { id: 'o2', name: 'Culture Society', avatarUrl: '' },
    location: 'Main Quad',
    start: new Date(Date.now() + 4 * 86400000).toISOString(),
    end: new Date(Date.now() + 5 * 86400000).toISOString(),
    tags: ['music', 'dance'],
    rsvpCount: 342,
  },
  {
    id: 'e3',
    title: 'UI/UX Workshop',
    description: 'Hands-on session on design systems and prototyping.',
    category: 'Workshop',
    imageUrl: 'https://images.unsplash.com/photo-1529336953121-ad3d4a5e5d47?q=80&w=1600&auto=format&fit=crop',
    organizer: { id: 'o3', name: 'Design Guild', avatarUrl: '' },
    location: 'Room 204, Design Block',
    start: new Date(Date.now() + 6 * 86400000).toISOString(),
    end: new Date(Date.now() + 6 * 86400000 + 2 * 3600000).toISOString(),
    tags: ['design', 'figma'],
    rsvpCount: 89,
  },
  {
    id: 'e4',
    title: 'Data Science Meetup',
    description: 'Lightning talks on ML, AI ethics, and MLOps best practices.',
    category: 'Meetup',
    imageUrl: 'https://images.unsplash.com/photo-1534759846116-57969eaaea6f?q=80&w=1600&auto=format&fit=crop',
    organizer: { id: 'o4', name: 'DS Society', avatarUrl: '' },
    location: 'Library Auditorium',
    start: new Date(Date.now() + 8 * 86400000).toISOString(),
    end: new Date(Date.now() + 8 * 86400000 + 3 * 3600000).toISOString(),
    tags: ['ml', 'ai'],
    rsvpCount: 210,
  },
];

const App = () => {
  const [events, setEvents] = useState([]);
  const [filters, setFilters] = useState({ query: '', category: '' });

  useEffect(() => {
    const stored = localStorage.getItem('events');
    if (!stored) {
      localStorage.setItem('events', JSON.stringify(seedEvents));
      setEvents(seedEvents);
    } else {
      try {
        setEvents(JSON.parse(stored));
      } catch {
        setEvents(seedEvents);
      }
    }
  }, []);

  const onToggleRsvp = (id, added) => {
    setEvents((prev) => {
      const updated = prev.map((e) =>
        e.id === id ? { ...e, rsvpCount: Math.max(0, e.rsvpCount + (added ? 1 : -1)) } : e
      );
      localStorage.setItem('events', JSON.stringify(updated));
      return updated;
    });
  };

  const filtered = useMemo(() => {
    return events.filter((e) => {
      const matchesCat = !filters.category || e.category === filters.category;
      const q = filters.query.trim().toLowerCase();
      const matchesQ = !q ||
        e.title.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q) ||
        e.organizer.name.toLowerCase().includes(q) ||
        (e.tags || []).some((t) => t.toLowerCase().includes(q));
      return matchesCat && matchesQ;
    });
  }, [events, filters]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F7F9FC] to-white dark:from-neutral-950 dark:to-neutral-900 text-neutral-900 dark:text-neutral-100">
      <Navbar />
      <HeroBanner />
      <div className="relative -mt-10">
        <EventFilterBar onFilter={setFilters} />
      </div>

      <main id="events" className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filtered.map((ev) => (
              <motion.div key={ev.id} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <EventCard event={ev} onToggleRsvp={onToggleRsvp} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-neutral-600 dark:text-neutral-400">
            No events found. Try adjusting filters.
          </div>
        )}
      </main>

      <footer className="mt-10 border-t border-neutral-200 dark:border-neutral-800">
        <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-neutral-600 dark:text-neutral-400">
          Built with React + Tailwind. Frontend-only mock app.
        </div>
      </footer>
    </div>
  );
};

export default App;
