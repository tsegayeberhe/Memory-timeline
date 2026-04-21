import React from 'react';
import './Modal.css';
import { useEventContext } from '../../context/EventContext';

export default function Modal({ children }) {
  const { isModalOpen, closeModal } = useEventContext();

  if (!isModalOpen) {
    return null;
  }

  return (
    <div className="modal-backdrop" onClick={closeModal}>
      <div className="modal-content" onClick={(event) => event.stopPropagation()}>
        <button className="modal-close" onClick={closeModal}>
          ×
        </button>
        {children}
      </div>
    </div>
  );
}
