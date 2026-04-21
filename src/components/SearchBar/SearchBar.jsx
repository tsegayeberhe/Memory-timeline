import React from 'react';
import './SearchBar.css';
import { useEventContext } from '../../context/EventContext';

export default function SearchBar() {
  const { searchQuery, setSearchQuery } = useEventContext();

  return (
    <div className="search-bar">
      <label htmlFor="search-input">Search memories</label>
      <input
        id="search-input"
        type="search"
        value={searchQuery}
        placeholder="Search title, category, description..."
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
}
