import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Paciente.css';
import kittyLogo from '../assets/KittyLogo.png';
import homeIcon from '../assets/home-icon.png';
import menuIcon from '../assets/menu-icon.png';

import marcarHorarioImg from '../assets/marcar-horario.png';
import horariosMarcadosImg from '../assets/horarios-marcados.png';
import localizacaoClinicaImg from '../assets/localizacao-clinica.png';
import faleConoscoImg from '../assets/fale-conosco.png';

import MarcarModal from '../components/MarcarModal';

export default function Paciente({ consultas, setConsultas }) {
  const [menuOpen, setMenuOpen] = useState(true);
  const [mostrarModal, setMostrarModal] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleNovaConsulta = (novaConsulta) => {
    setConsultas([...consultas, novaConsulta]);
    setMostrarModal(false);
    navigate('/horarios-paciente');
  };

  return (
    <div className="paciente-container">
      <div className={`sidebar ${menuOpen ? 'open' : 'closed'}`}>
        <div className="menu-icon" onClick={toggleMenu} style={{ cursor: 'pointer' }}>
          <img src={menuIcon} alt="Menu" />
        </div>
        {menuOpen && (
          <div className="home-icon" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
            <img src={homeIcon} alt="Home" />
          </div>
        )}
      </div>

      <div className="main-content">
        <header className="header">
          <div className="logo-container">
            <img src={kittyLogo} alt="KittyGlam Logo" className="kitty-logo" />
          </div>
        </header>

        <div className="divider"></div>

        <div className="cards-container">
          <div className="card" onClick={() => setMostrarModal(true)}>
            <img src={marcarHorarioImg} alt="Marcar Horário" />
          </div>

          <div className="card" onClick={() => navigate('/horarios-paciente')}>
            <img src={horariosMarcadosImg} alt="Horários Marcados" />
          </div>

          <div className="card" onClick={() => window.open('https://www.google.com/maps/place/Sua+Clínica+Aqui', '_blank')}>
            <img src={localizacaoClinicaImg} alt="Localização da Clínica" />
          </div>

          <div className="card" onClick={() => window.open('https://wa.me/5599999999999', '_blank')}>
            <img src={faleConoscoImg} alt="Fale Conosco" />
          </div>
        </div>
      </div>

      <MarcarModal
        isOpen={mostrarModal}
        onClose={() => setMostrarModal(false)}
        onSubmit={handleNovaConsulta}
      />
    </div>
  );
}
