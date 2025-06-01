import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/HorariosPaciente.css';
import kittyLogo from '../assets/KittyLogo.png';
import homeIcon from '../assets/home-icon.png';
import menuIcon from '../assets/menu-icon.png';
import RemarcarModal from '../components/RemarcarModal';

export default function HorariosPaciente({ consultas, setConsultas }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(true);
  const [modalAberto, setModalAberto] = useState(false);
  const [consultaSelecionada, setConsultaSelecionada] = useState(null);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const cancelarConsulta = (index) => {
    const novaLista = consultas.filter((_, i) => i !== index);
    setConsultas(novaLista);
  };

  const abrirModalRemarcar = (index) => {
    setConsultaSelecionada(index);
    setModalAberto(true);
  };

  const confirmarRemarcacao = (novaData) => {
    const atualizadas = [...consultas];
    atualizadas[consultaSelecionada].data = novaData;
    setConsultas(atualizadas);
    setModalAberto(false);
  };

  const formatarData = (dataISO) => {
    const [ano, mes, dia] = dataISO.split('-');
    return `${dia}-${mes}-${ano}`;
  };

  return (
    <div className="paciente-container">
      <div className={`paciente-sidebar ${menuOpen ? 'open' : 'closed'}`}>
        <div className="paciente-menu-icon" onClick={toggleMenu} style={{ cursor: 'pointer' }}>
          <img src={menuIcon} alt="Menu" />
        </div>
        {menuOpen && (
          <div className="paciente-home-icon" onClick={() => navigate('/paciente')} style={{ cursor: 'pointer' }}>
            <img src={homeIcon} alt="Home" />
          </div>
        )}
      </div>

      <div className="paciente-main-content">
        <header className="paciente-header">
          <div className="paciente-logo-container">
            <img src={kittyLogo} alt="KittyGlam Logo" className="paciente-kitty-logo" />
          </div>
        </header>

        <div className="paciente-divider"></div>

        <div className="paciente-consultas-container">
          <h2 className="paciente-consultas-title">Minhas Consultas</h2>
          {consultas.map((consulta, index) => (
            <div className="paciente-consulta-card" key={index}>
              <div className="paciente-consulta-dia">{consulta.data.split('-')[2]}</div>
              <div className="paciente-consulta-info">
                <strong>{consulta.especialidade}</strong>
                <span>{consulta.profissional}</span><br />
                <small>Data: {formatarData(consulta.data)}</small>
              </div>
              <div className="paciente-consulta-botoes">
                <button className="paciente-btn-remarcar" onClick={() => abrirModalRemarcar(index)}>Remarcar</button>
                <button className="paciente-btn-cancelar" onClick={() => cancelarConsulta(index)}>Cancelar</button>
              </div>
            </div>
          ))}
        </div>

        <RemarcarModal
          isOpen={modalAberto}
          onClose={() => setModalAberto(false)}
          onSubmit={confirmarRemarcacao}
        />
      </div>
    </div>
  );
}
