import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/HorariosProfissional.css';
import kittyLogo from '../assets/KittyLogo.png';
import homeIcon from '../assets/home-icon.png';
import menuIcon from '../assets/menu-icon.png';
import VerMaisModal from '../components/VerMaisModal';

export default function HorariosProfissional({ consultas, setConsultas }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(true);
  const [modalAberto, setModalAberto] = useState(false);
  const [consultaSelecionada, setConsultaSelecionada] = useState(null);

  const [filtroEspecialidade, setFiltroEspecialidade] = useState('');
  const [filtroProfissional, setFiltroProfissional] = useState('');
  const [filtroData, setFiltroData] = useState('');

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const cancelarConsulta = (index) => {
    const novaLista = consultas.filter((_, i) => i !== index);
    setConsultas(novaLista);
  };

  const abrirModalVerMais = (index) => {
    setConsultaSelecionada(index);
    setModalAberto(true);
  };

  const formatarData = (dataISO) => {
    const [ano, mes, dia] = dataISO.split('-');
    return `${dia}-${mes}-${ano}`;
  };

  // ✅ Correção aqui: uso direto de consulta.profissional como string
  const consultasFiltradas = consultas.filter((consulta) => {
    const matchEspecialidade = consulta.especialidade
      .toLowerCase()
      .includes(filtroEspecialidade.toLowerCase());

    const matchProfissional = (consulta.profissional || '')
      .toLowerCase()
      .includes(filtroProfissional.toLowerCase());

    const matchData = filtroData === '' || consulta.data === filtroData;

    return matchEspecialidade && matchProfissional && matchData;
  });

  return (
    <div className="prof-container">
      <div className={`prof-sidebar ${menuOpen ? 'open' : 'closed'}`}>
        <div className="prof-menu-icon" onClick={toggleMenu} style={{ cursor: 'pointer' }}>
          <img src={menuIcon} alt="Menu" />
        </div>
        {menuOpen && (
          <div className="prof-home-icon" onClick={() => navigate('/profissional')} style={{ cursor: 'pointer' }}>
            <img src={homeIcon} alt="Home" />
          </div>
        )}
      </div>

      <div className="prof-main-content">
        <header className="prof-header">
          <div className="prof-logo-container">
            <img src={kittyLogo} alt="KittyGlam Logo" className="prof-kitty-logo" />
          </div>
        </header>

        <div className="prof-divider"></div>

        <div className="prof-consultas-container">
          <h2 className="prof-consultas-title">Minhas Consultas</h2>

          {/* 🔍 Barra de Pesquisa */}
          <div className="prof-filtros-container">
            <input
              type="text"
              placeholder="Filtrar por especialidade"
              value={filtroEspecialidade}
              onChange={(e) => setFiltroEspecialidade(e.target.value)}
            />
            <input
              type="text"
              placeholder="Filtrar por profissional"
              value={filtroProfissional}
              onChange={(e) => setFiltroProfissional(e.target.value)}
            />
            <input
              type="date"
              value={filtroData}
              onChange={(e) => setFiltroData(e.target.value)}
            />
          </div>

          {consultasFiltradas.map((consulta, index) => (
            <div className="prof-consulta-card" key={index}>
              <div className="prof-consulta-dia">{consulta.data.split('-')[2]}</div>
              <div className="prof-consulta-info">
                <strong>{consulta.especialidade}</strong>
                <span>{consulta.paciente}</span><br />
                <small>Data: {formatarData(consulta.data)}</small>
              </div>
              <div className="prof-consulta-botoes">
                <button className="prof-btn-vermais" onClick={() => abrirModalVerMais(index)}>Ver Mais</button>
                <button className="prof-btn-cancelar" onClick={() => cancelarConsulta(index)}>Cancelar</button>
              </div>
            </div>
          ))}
        </div>

        <VerMaisModal
          isOpen={modalAberto}
          onClose={() => setModalAberto(false)}
          consulta={consultas[consultaSelecionada]}
        />
      </div>
    </div>
  );
}
