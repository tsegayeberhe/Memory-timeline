import React, { useEffect, useState } from 'react';
import './EventForm.css';
import { useEventContext } from '../../context/EventContext';

const defaultDraft = {
  title: '',
  date: '',
  category: '',
  description: '',
};

export default function EventForm() {
  const { addEvent, closeModal, selectedEvent, updateEvent } = useEventContext();
  const [draft, setDraft] = useState(defaultDraft);

  useEffect(() => {
    if (selectedEvent) {
      setDraft(selectedEvent);
    } else {
      setDraft(defaultDraft);
    }
  }, [selectedEvent]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDraft((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const completed = {
      ...draft,
      date: draft.date || new Date().toISOString().slice(0, 10),
      category: draft.category.trim() || 'General',
    };

    if (selectedEvent) {
      updateEvent(selectedEvent.id, completed);
    } else {
      addEvent(completed);
    }

    closeModal();
  };

  return (
    <form className="event-form" onSubmit={handleSubmit}>
      <h2>{selectedEvent ? 'Edit memory' : 'Add memory'}</h2>
      <label htmlFor="title">Title</label>
      <input
        id="title"
        name="title"
        value={draft.title}
        onChange={handleChange}
        placeholder="Memory title"
        required
      />

      <label htmlFor="date">Date</label>
      <input
        id="date"
        name="date"
        type="date"
        value={draft.date}
        onChange={handleChange}
        required
      />

      <label htmlFor="category">Category</label>
      <input
        id="category"
        name="category"
        value={draft.category}
        onChange={handleChange}
        placeholder="e.g., Personal, Work, Travel"
      />

      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        name="description"
        value={draft.description}
        onChange={handleChange}
        placeholder="Add more context about this memory"
      />

      <div className="event-form__actions">
        <button type="button" className="secondary" onClick={closeModal}>
          Cancel
        </button>
        <button type="submit" className="primary">
          {selectedEvent ? 'Save' : 'Add'}
        </button>
      </div>
    </form>
  );
}
