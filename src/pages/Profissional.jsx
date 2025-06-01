// src/pages/Profissional.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Profissional.css';

import kittyLogo from '../assets/KittyLogo.png';
import homeIcon from '../assets/home-icon.png';
import menuIcon from '../assets/menu-icon.png';

import relatoriosImg from '../assets/relatorios.png'; 
import horariosMarcadosImg from '../assets/horarios-marcados.png';
import localizacaoClinicaImg from '../assets/localizacao-clinica.png';
import faleConoscoImg from '../assets/fale-conosco.png';

export default function Profissional() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = React.useState(true);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const baixarRelatorio = () => {
    const link = document.createElement('a');
    link.href = '/relatorio-consultas.pdf'; // Arquivo precisa estar na pasta public/
    link.download = 'relatorio-consultas.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="profissional-container">
      <div className={`profissional-sidebar ${menuOpen ? 'open' : 'closed'}`}>
        <div className="profissional-menu-icon" onClick={toggleMenu} style={{ cursor: 'pointer' }}>
          <img src={menuIcon} alt="Menu" />
        </div>
        {menuOpen && (
          <div className="profissional-home-icon" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
            <img src={homeIcon} alt="Home" />
          </div>
        )}
      </div>

      <div className="profissional-main-content">
        <header className="profissional-header">
          <div className="profissional-logo-container">
            <img src={kittyLogo} alt="KittyGlam Logo" className="profissional-kitty-logo" />
          </div>
        </header>

        <div className="profissional-divider"></div>

        <div className="profissional-cards-container">
          <div className="profissional-card" onClick={baixarRelatorio}>
            <img src={relatoriosImg} alt="Relatórios" />
          </div>

          <div className="profissional-card" onClick={() => navigate('/horarios-profissional')}>
            <img src={horariosMarcadosImg} alt="Horários Marcados" />
          </div>

          <div
            className="profissional-card"
            onClick={() => window.open('https://www.google.com/maps/place/Sua+Clínica+Aqui', '_blank')}
          >
            <img src={localizacaoClinicaImg} alt="Localização da Clínica" />
          </div>

          <div
            className="profissional-card"
            onClick={() => window.open('https://wa.me/5599999999999', '_blank')}
          >
            <img src={faleConoscoImg} alt="Fale Conosco" />
          </div>
        </div>
      </div>
    </div>
  );
}
