import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, Heart } from 'lucide-react';

const formatDate = (iso) => new Date(iso).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' });

const EventCard = ({ event, onToggleRsvp }) => {
  const [isRsvped, setIsRsvped] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const rsvps = JSON.parse(localStorage.getItem('rsvps') || '[]');
    setIsRsvped(rsvps.includes(event.id));
  }, [event.id]);

  const toggle = () => {
    const rsvps = new Set(JSON.parse(localStorage.getItem('rsvps') || '[]'));
    if (rsvps.has(event.id)) {
      rsvps.delete(event.id);
      setIsRsvped(false);
      onToggleRsvp(event.id, false);
    } else {
      rsvps.add(event.id);
      setIsRsvped(true);
      onToggleRsvp(event.id, true);
    }
    localStorage.setItem('rsvps', JSON.stringify([...rsvps]));
  };

  return (
    <motion.article
      layout
      whileHover={{ y: -4 }}
      className="group rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm hover:shadow-md transition"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={event.imageUrl}
          alt={event.title}
          className={`w-full h-full object-cover transition duration-700 ${loaded ? 'blur-0 scale-100' : 'blur-lg scale-105'}`}
          onLoad={() => setLoaded(true)}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-2 left-2 inline-flex items-center gap-2 px-2 py-1 rounded-full text-xs bg-white/80 backdrop-blur-md text-neutral-800">
          {event.category}
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 line-clamp-1">{event.title}</h3>
        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300 line-clamp-2">{event.description}</p>
        <div className="mt-3 flex flex-wrap gap-3 text-sm text-neutral-700 dark:text-neutral-300">
          <div className="inline-flex items-center gap-1"><Calendar size={16} /> {formatDate(event.start)}</div>
          <div className="inline-flex items-center gap-1"><MapPin size={16} /> {event.location}</div>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="inline-flex items-center gap-1 text-sm text-neutral-600 dark:text-neutral-300">
            <Users size={16} /> {event.rsvpCount}
          </div>
          <button
            onClick={toggle}
            aria-pressed={isRsvped}
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition shadow ${
              isRsvped
                ? 'bg-emerald-400 text-emerald-900'
                : 'bg-blue-600 text-white hover:shadow-md'
            }`}
          >
            <Heart size={16} className={isRsvped ? 'fill-emerald-900 text-emerald-900' : ''} />
            {isRsvped ? 'RSVP’d' : 'RSVP'}
          </button>
        </div>
      </div>
    </motion.article>
  );
};

export default EventCard;
