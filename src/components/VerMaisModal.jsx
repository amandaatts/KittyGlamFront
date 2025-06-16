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
    return `${dia}/${mes}/${ano}`;
  };

  return (
    <div className="vermais-modal-overlay">
      <div className="vermais-modal-card" ref={modalRef}>
        <img src={kittyLogo} alt="Hello Kitty" className="vermais-kitty-icon" />

        <label className="vermais-modal-label">Especialidade:</label>
        <div className="vermais-modal-input">
          {consulta.especialidade === 'design-sobrancelha'
            ? 'Design sobrancelha'
            : consulta.especialidade}
        </div>

        <label className="vermais-modal-label">Data da consulta:</label>
        <div className="vermais-modal-input">
          {consulta.dataConsulta ? formatarData(consulta.dataConsulta) : 'Data não informada'}
        </div>

        <label className="vermais-modal-label">Profissional:</label>
        <div className="vermais-modal-input">
          {typeof consulta.profissional === 'object'
            ? consulta.profissional.nome || 'Nome não informado'
            : consulta.nomeProfissional || 'Nome não informado'}
        </div>

        <label className="vermais-modal-label">Paciente:</label>
        <div className="vermais-modal-input">
          {typeof consulta.paciente === 'object'
            ? consulta.paciente.nome || 'Nome não informado'
            : consulta.nomePaciente || 'Nome não informado'}
        </div>

        <button onClick={onClose} className="horarios-vermais-botao">Concluir</button>
      </div>
    </div>
  );
}
