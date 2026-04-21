import React from 'react';
import './InsightsPanel.css';
import { useEventContext } from '../../context/EventContext';

export default function InsightsPanel() {
  const { insights } = useEventContext();

  return (
    <section className="insights-panel">
      <div className="insight-card">
        <p>Total memories</p>
        <strong>{insights.total}</strong>
      </div>
      <div className="insight-card">
        <p>Earliest memory</p>
        <strong>{insights.earliest || '-'} </strong>
      </div>
      <div className="insight-card">
        <p>Latest memory</p>
        <strong>{insights.latest || '-'} </strong>
      </div>
      <div className="insight-card insight-card--expanded">
        <p>By category</p>
        <div className="category-list">
          {Object.entries(insights.categoryTotals).map(([category, count]) => (
            <div key={category} className="category-item">
              <span>{category}</span>
              <strong>{count}</strong>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
