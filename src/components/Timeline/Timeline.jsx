import React from 'react';
import './Timeline.css';
import TimelineItem from './TimelineItem';
import { useEventContext } from '../../context/EventContext';

export default function Timeline() {
  const { filteredEvents, openModal, removeEvent } = useEventContext();

  if (!filteredEvents.length) {
    return <div className="timeline-empty">No matching memories yet. Try a different filter or add one.</div>;
  }

  return (
    <div className="timeline-list">
      {filteredEvents.map((event) => (
        <TimelineItem
          key={event.id}
          event={event}
          onEdit={() => openModal(event)}
          onDelete={() => removeEvent(event.id)}
        />
      ))}
    </div>
  );
}
