import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/HorariosProfissional.css';
import kittyLogo from '../assets/KittyLogo.png';
import homeIcon from '../assets/home-icon.png';
import menuIcon from '../assets/menu-icon.png';
import VerMaisModal from '../components/VerMaisModal';

export default function HorariosProfissional() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(true);
  const [modalAberto, setModalAberto] = useState(false);
  const [consultaSelecionada, setConsultaSelecionada] = useState(null);
  const [consultas, setConsultas] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/consultas')
      .then((res) => res.json())
      .then((data) => setConsultas(data))
      .catch((err) => console.error('Erro ao buscar consultas:', err));
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const cancelarConsulta = async (id) => {
    try {
      await fetch(`http://localhost:8080/consultas/${id}`, { method: 'DELETE' });
      setConsultas((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error('Erro ao cancelar consulta:', err);
    }
  };

  const abrirModalVerMais = (consulta) => {
    setConsultaSelecionada(consulta);
    setModalAberto(true);
  };

  const formatarData = (dataISO) => {
    if (!dataISO) return '';
    const [ano, mes, dia] = dataISO.split('-');
    return `${dia}/${mes}/${ano}`;
  };

  return (
    <div className="prof-container">
      <div className={`prof-sidebar ${menuOpen ? 'open' : 'closed'}`}>
        <div className="prof-menu-icon" onClick={toggleMenu}>
          <img src={menuIcon} alt="Menu" />
        </div>
        {menuOpen && (
          <div className="prof-home-icon" onClick={() => navigate('/profissional')}>
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

          {consultas.map((consulta) => (
            <div className="prof-consulta-card" key={consulta.id}>
              <div className="prof-consulta-dia">{consulta.dataConsulta?.split('-')[2]}</div>
              <div className="prof-consulta-info">
                <strong>
                  {consulta.especialidade === 'design-sobrancelha'
                    ? 'Design sobrancelha'
                    : consulta.especialidade}
                </strong>
                <span>{consulta.nomePaciente || 'Paciente não informado'}</span><br />
                <small>Data: {formatarData(consulta.dataConsulta)}</small>
              </div>
              <div className="prof-consulta-botoes">
                <button
                  className="prof-btn-vermais"
                  onClick={() => abrirModalVerMais(consulta)}
                >
                  Ver Mais
                </button>
                <button
                  className="prof-btn-cancelar"
                  onClick={() => cancelarConsulta(consulta.id)}
                >
                  Cancelar
                </button>
              </div>
            </div>
          ))}
        </div>

        <VerMaisModal
          isOpen={modalAberto}
          onClose={() => setModalAberto(false)}
          consulta={consultaSelecionada}
        />
      </div>
    </div>
  );
}
