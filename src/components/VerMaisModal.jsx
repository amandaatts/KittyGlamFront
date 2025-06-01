import React, { useEffect, useRef } from 'react';
import './styles/VerMaisModal.css';
import kittyLogo from '../assets/KittyLogo.png';

export default function VerMaisModal({ isOpen, onClose, consulta }) {
  const modalRef = useRef(null);

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

  if (!isOpen || !consulta) return null;

  const formatarData = (dataISO) => {
    const [ano, mes, dia] = dataISO.split('-');
    return `${dia}/${mes}`;
  };

  return (
    <div className="vermais-modal-overlay">
      <div className="vermais-modal-card" ref={modalRef}>
        <img src={kittyLogo} alt="Hello Kitty" className="vermais-kitty-icon" />

        <label className="vermais-modal-label">Especialidade:</label>
        <div className="vermais-modal-input">{consulta.especialidade}</div>

        <label className="vermais-modal-label">Data da consulta:</label>
        <div className="vermais-modal-input">{formatarData(consulta.data)}</div>

        <label className="vermais-modal-label">Profissional:</label>
        <div className="vermais-modal-input">{consulta.profissional}</div>

        <label className="vermais-modal-label">Paciente:</label>
        <div className="vermais-modal-input">{consulta.paciente}</div>

        <button onClick={onClose} className="horarios-vermais-botao">Concluir</button>
      </div>
    </div>
  );
}
