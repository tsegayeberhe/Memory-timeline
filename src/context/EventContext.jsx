import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { loadEvents, saveEvents } from '../utils/storage';
import { formatDateForInput } from '../utils/dateHelpers';

const EventContext = createContext();

const defaultEvents = [
  {
    id: '1',
    title: 'First memory',
    date: '2025-08-15',
    category: 'Personal',
    description: 'A meaningful moment that started the timeline.',
  },
  {
    id: '2',
    title: 'Learning React',
    date: '2025-11-01',
    category: 'Work',
    description: 'Began building memory-timeline with React components.',
  },
];

export function EventProvider({ children }) {
  const [events, setEvents] = useState(() => {
    const persisted = loadEvents();
    return persisted && persisted.length ? persisted : defaultEvents;
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    saveEvents(events);
  }, [events]);

  const categories = useMemo(() => {
    const categorySet = new Set(events.map((event) => event.category));
    return ['All', ...Array.from(categorySet).sort()];
  }, [events]);

  const filteredEvents = useMemo(() => {
    return events
      .filter((event) => {
        const matchesCategory = categoryFilter === 'All' || event.category === categoryFilter;
        const matchesSearch = [event.title, event.description, event.category]
          .join(' ')
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [categoryFilter, events, searchQuery]);

  const addEvent = (eventData) => {
    const event = {
      id: Date.now().toString(),
      ...eventData,
    };
    setEvents((prev) => [...prev, event]);
  };

  const updateEvent = (eventId, eventData) => {
    setEvents((prev) => prev.map((item) => (item.id === eventId ? { ...item, ...eventData } : item)));
  };

  const removeEvent = (eventId) => {
    setEvents((prev) => prev.filter((item) => item.id !== eventId));
  };

  const openModal = (event = null) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedEvent(null);
    setIsModalOpen(false);
  };

  const insights = useMemo(() => {
    if (!events.length) {
      return {
        total: 0,
        categoryTotals: {},
        earliest: null,
        latest: null,
      };
    }

    const categoryTotals = events.reduce((acc, event) => {
      acc[event.category] = (acc[event.category] || 0) + 1;
      return acc;
    }, {});

    const sortedDates = [...events].map((event) => new Date(event.date)).sort((a, b) => a - b);

    return {
      total: events.length,
      categoryTotals,
      earliest: formatDateForInput(sortedDates[0].toISOString().slice(0, 10)),
      latest: formatDateForInput(sortedDates[sortedDates.length - 1].toISOString().slice(0, 10)),
    };
  }, [events]);

  return (
    <EventContext.Provider
      value={{
        categoryFilter,
        categories,
        closeModal,
        insights,
        isModalOpen,
        openModal,
        filteredEvents,
        removeEvent,
        searchQuery,
        selectedEvent,
        setCategoryFilter,
        setSearchQuery,
        addEvent,
        updateEvent,
      }}
    >
      {children}
    </EventContext.Provider>
  );
}

export function useEventContext() {
  return useContext(EventContext);
}
