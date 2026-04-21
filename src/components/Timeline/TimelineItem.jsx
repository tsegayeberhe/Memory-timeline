import React from 'react';
import './Timeline.css';
import { formatDate } from '../../utils/dateHelpers';

export default function TimelineItem({ event, onEdit, onDelete }) {
  return (
    <article className="timeline-item">
      <div className="timeline-item__bubble" />
      <div className="timeline-item__content">
        <div className="timeline-item__header">
          <div>
            <p className="timeline-item__date">{formatDate(event.date)}</p>
            <h3>{event.title}</h3>
          </div>
          <span className="timeline-item__category">{event.category}</span>
        </div>
        <p>{event.description}</p>
        <div className="timeline-item__actions">
          <button type="button" onClick={onEdit}>
            Edit
          </button>
          <button type="button" className="danger" onClick={onDelete}>
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}
