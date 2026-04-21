import React, { useEffect, useState } from 'react';
import './App.css';
import { EventProvider, useEventContext } from './context/EventContext';
import SearchBar from './components/SearchBar/SearchBar';
import FilterBar from './components/FilterBar/FilterBar';
import InsightsPanel from './components/InsightsPanel/InsightsPanel';
import Heatmap from './components/Heatmap/Heatmap';
import Timeline from './components/Timeline/Timeline';
import Modal from './components/Modal/Modal';
import EventForm from './components/EventForm/EventForm';

function AppContent() {
  const { openModal } = useEventContext();
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const storedTheme = window.localStorage.getItem('memory-timeline-theme');
    if (storedTheme) {
      setTheme(storedTheme);
    } else if (window.matchMedia) {
      setTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    }
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem('memory-timeline-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme((current) => (current === 'light' ? 'dark' : 'light'));
  const themeLabel = theme === 'light' ? 'Dark mode' : 'Light mode';

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">Memory Timeline</p>
          <h1>Capture life’s moments visually.</h1>
          <p className="app-copy">
            Add memories, filter by category, and explore insights over time.
          </p>
        </div>
        <div className="header-actions">
          <button type="button" className="theme-toggle" onClick={toggleTheme}>
            {themeLabel}
          </button>
          <button type="button" className="add-memory" onClick={() => openModal()}>
            + New memory
          </button>
        </div>
      </header>

      <div className="toolbar-grid">
        <SearchBar />
        <FilterBar />
      </div>

      <section className="overview-grid">
        <InsightsPanel />
        <Heatmap />
      </section>

      <section>
        <div className="section-header">
          <h2>Timeline</h2>
          <p>Chronological memory list with quick edit and delete controls.</p>
        </div>
        <Timeline />
      </section>

      <Modal>
        <EventForm />
      </Modal>
    </div>
  );
}

export default function App() {
  return (
    <EventProvider>
      <AppContent />
    </EventProvider>
  );
}
