// src/pages/Escolha.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Escolha.css';
import profissionalIcon from '../assets/profissionalBtn.png';
import pacienteIcon from '../assets/pacienteBtn.png';

const Escolha = () => {
  const navigate = useNavigate();

  return (
    <div className="pagina-escolha">
      <h1>Você é....</h1>

      <div className="botoes">
        <button onClick={() => navigate('/login-profissional')} className="botao">
          <img src={profissionalIcon} alt="Profissional" />
          <p>Profissional</p>
        </button>

        <button onClick={() => navigate('/login-paciente')} className="botao">
          <img src={pacienteIcon} alt="Paciente" />
          <p>Paciente</p>
        </button>
      </div>
    </div>
  );
};

export default Escolha;
