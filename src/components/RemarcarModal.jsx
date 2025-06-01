import React, { useEffect, useRef, useState } from 'react';
import './styles/RemarcarModal.css';
import kittyLogo from '../assets/KittyLogo.png';
import calendarIcon from '../assets/calendario.png';

export default function RemarcarModal({ isOpen, onClose, onSubmit }) {
  const [data, setData] = useState('');
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) setData('');
  }, [isOpen]);

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(data);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="remarcar-modal-overlay">
      <div className="remarcar-modal-card" ref={modalRef}>
        <img src={kittyLogo} alt="KittyGlam" className="remarcar-kitty-icon" />
        <form className="remarcar-modal-form" onSubmit={handleSubmit}>
          <label htmlFor="remarcar-data" className="remarcar-modal-label">
            Data da consulta:
          </label>
          <div className="remarcar-input-with-icon">
            <input
              type="date"
              id="remarcar-data"
              value={data}
              onChange={(e) => setData(e.target.value)}
              className="remarcar-modal-input"
              required
              onClick={() => document.getElementById('remarcar-data').showPicker?.()}
            />
            <img
              src={calendarIcon}
              alt="Abrir calendário"
              className="remarcar-calendar-icon"
              onClick={() => document.getElementById('remarcar-data').showPicker?.()}
              tabIndex="0"
            />
          </div>
          <button type="submit" className="remarcar-btn-concluir">Concluir</button>
        </form>
      </div>
    </div>
  );
}
