import React from 'react';
import './FilterBar.css';
import { useEventContext } from '../../context/EventContext';

export default function FilterBar() {
  const { categories, categoryFilter, setCategoryFilter } = useEventContext();

  return (
    <div className="filter-bar">
      <label htmlFor="category-filter">Category</label>
      <select
        id="category-filter"
        value={categoryFilter}
        onChange={(e) => setCategoryFilter(e.target.value)}
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
}
