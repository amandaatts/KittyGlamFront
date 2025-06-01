import React, { useState, useEffect, useRef } from 'react';
import './styles/MarcarModal.css';
import kittyLogo from '../assets/KittyLogo.png';
import calendarIcon from '../assets/calendario.png';

export default function MarcarModal({ isOpen, onClose, onSubmit }) {
  const [especialidade, setEspecialidade] = useState('');
  const [dataConsulta, setDataConsulta] = useState('');
  const [profissional, setProfissional] = useState('');
  const [paciente, setPaciente] = useState('');

  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setEspecialidade('');
      setDataConsulta('');
      setProfissional('');
      setPaciente('');
    }
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
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleConcluir = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit({
        especialidade,
        data: dataConsulta,
        profissional,
        paciente
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="marcar-modal-overlay">
      <div className="marcar-modal-card" ref={modalRef}>
        <img src={kittyLogo} alt="Hello Kitty" className="marcar-kitty-icon" />
        <form className="marcar-modal-form" onSubmit={handleConcluir}>
          <label className="marcar-modal-label">Especialidade:</label>
          <select
            value={especialidade}
            onChange={(e) => setEspecialidade(e.target.value)}
            className="marcar-modal-input"
            required
          >
            <option value="" disabled>Selecione…</option>
            <option value="design-sobrancelha">Design sobrancelha</option>
            <option value="manicure">Manicure</option>
            <option value="alongamento-cilios">Alongamento de cílios</option>
            <option value="lash-lifting">Lash lifting</option>
            <option value="pedicure">Pedicure</option>
          </select>

          <label className="marcar-modal-label">Data da consulta:</label>
          <div className="marcar-input-with-icon">
            <input
              type="date"
              id="marcar-dataConsulta"   
              value={dataConsulta}
              onChange={(e) => setDataConsulta(e.target.value)}
              className="marcar-modal-input"
              required
            />
            <img
              src={calendarIcon}
              alt="Abrir calendário"
              className="marcar-calendar-icon"
              onClick={() => document.querySelector('#marcar-dataConsulta')?.showPicker?.()}
              tabIndex="0"
            />
          </div>

          <label className="marcar-modal-label">Profissional:</label>
          <input
            type="text"
            placeholder="Nome do profissional"
            value={profissional}
            onChange={(e) => setProfissional(e.target.value)}
            className="marcar-modal-input"
            required
          />

          <label className="marcar-modal-label">Paciente:</label>
          <input
            type="text"
            placeholder="Nome do paciente"
            value={paciente}
            onChange={(e) => setPaciente(e.target.value)}
            className="marcar-modal-input"
            required
          />

          <button type="submit" className="marcar-btn-concluir">Concluir</button>
        </form>
      </div>
    </div>
  );
}
