import React, { useMemo } from 'react';
import './Heatmap.css';
import { useEventContext } from '../../context/EventContext';
import { buildTimelineKey } from '../../utils/dateHelpers';

const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default function Heatmap() {
  const { filteredEvents } = useEventContext();

  const monthCounts = useMemo(() => {
    const counts = monthLabels.map(() => 0);
    filteredEvents.forEach((event) => {
      const [year, month] = buildTimelineKey(event.date).split('-');
      counts[Number(month) - 1] += 1;
    });
    return counts;
  }, [filteredEvents]);

  return (
    <section className="heatmap-panel">
      <div className="heatmap-header">
        <h3>Monthly memory heatmap</h3>
        <span>{filteredEvents.length} memories</span>
      </div>
      <div className="heatmap-grid">
        {monthLabels.map((label, index) => {
          const count = monthCounts[index];
          const intensity = Math.min(count * 12 + 12, 100);
          return (
            <div
              key={label}
              className="heatmap-cell"
              style={{ background: `rgba(124, 93, 248, ${0.1 + intensity / 200})` }}
            >
              <span>{label}</span>
              <strong>{count}</strong>
            </div>
          );
        })}
      </div>
    </section>
  );
}
