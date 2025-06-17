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

  // Pega o ID do profissional logado no localStorage
  const profissionalId = Number(localStorage.getItem('profissionalId'));

  // URL base do backend (ajuste aqui se mudar de ambiente)
  const API_BASE_URL = 'http://localhost:8080';

  const baixarRelatorio = async () => {
    if (!profissionalId) {
      alert('Erro: ID do profissional não encontrado. Faça login novamente.');
      return;
    }
    try {
      const response = await fetch(`${API_BASE_URL}/relatorios/profissional/${profissionalId}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/pdf',
        },
      });

      if (!response.ok) throw new Error('Erro ao gerar o relatório');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `relatorio_profissional_${profissionalId}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      alert('Erro ao baixar relatório: ' + error.message);
    }
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
          <div className="profissional-card" onClick={baixarRelatorio} style={{ cursor: 'pointer' }}>
            <img src={relatoriosImg} alt="Relatórios" />
          </div>

          <div className="profissional-card" onClick={() => navigate('/horarios-profissional')} style={{ cursor: 'pointer' }}>
            <img src={horariosMarcadosImg} alt="Horários Marcados" />
          </div>

          <div
            className="profissional-card"
            onClick={() => window.open('https://www.google.com/maps/place/Sua+Clínica+Aqui', '_blank')}
            style={{ cursor: 'pointer' }}
          >
            <img src={localizacaoClinicaImg} alt="Localização da Clínica" />
          </div>

          <div
            className="profissional-card"
            onClick={() => window.open('https://wa.me/5599999999999', '_blank')}
            style={{ cursor: 'pointer' }}
          >
            <img src={faleConoscoImg} alt="Fale Conosco" />
          </div>
        </div>
      </div>
    </div>
  );
}
