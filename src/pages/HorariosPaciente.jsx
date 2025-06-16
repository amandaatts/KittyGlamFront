import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/HorariosPaciente.css';
import kittyLogo from '../assets/KittyLogo.png';
import homeIcon from '../assets/home-icon.png';
import menuIcon from '../assets/menu-icon.png';
import RemarcarModal from '../components/RemarcarModal';

export default function LoginPaciente() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(true);
  const [modalAberto, setModalAberto] = useState(false);
  const [consultaSelecionada, setConsultaSelecionada] = useState(null);
  const [consultas, setConsultas] = useState([]);
  const [filtroEspecialidade, setFiltroEspecialidade] = useState('');
  const [filtroProfissional, setFiltroProfissional] = useState('');
  const [filtroData, setFiltroData] = useState('');

  const pacienteId = localStorage.getItem('pacienteId');

  useEffect(() => {
    if (!pacienteId) {
      alert("Você precisa estar logado como paciente.");
      navigate('/login');
      return;
    }

    fetch(`http://localhost:8080/consultas/paciente/${pacienteId}`)
      .then((res) => {
        if (!res.ok) throw new Error('Erro ao buscar consultas');
        return res.json();
      })
      .then((data) => setConsultas(data))
      .catch((err) => console.error('Erro ao buscar consultas:', err));
  }, [pacienteId, navigate]);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const cancelarConsulta = async (id) => {
    try {
      await fetch(`http://localhost:8080/consultas/${id}`, { method: 'DELETE' });
      setConsultas((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error('Erro ao cancelar consulta:', err);
      alert('Erro ao cancelar consulta.');
    }
  };

  const abrirModalRemarcar = (consulta) => {
    setConsultaSelecionada(consulta);
    setModalAberto(true);
  };

  const confirmarRemarcacao = async (novaData) => {
    try {
      const atualizada = { ...consultaSelecionada, dataConsulta: novaData };
      const response = await fetch(`http://localhost:8080/consultas/${atualizada.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(atualizada),
      });

      if (response.ok) {
        setConsultas((prev) =>
          prev.map((c) => (c.id === atualizada.id ? atualizada : c))
        );
        setModalAberto(false);
      } else {
        alert("Erro ao remarcar.");
      }
    } catch (err) {
      console.error("Erro ao remarcar:", err);
      alert("Erro ao remarcar consulta.");
    }
  };

  const formatarData = (dataISO) => {
    try {
      const [ano, mes, diaComHora] = dataISO.split('-');
      const dia = diaComHora.split('T')[0];
      return `${dia}-${mes}-${ano}`;
    } catch {
      return 'Data inválida';
    }
  };

  const capitalizarPalavras = (texto) =>
    texto
      ?.replace(/-/g, ' ')
      .split(' ')
      .map(p => p.charAt(0).toUpperCase() + p.slice(1))
      .join(' ') || '';

  const consultasFiltradas = consultas.filter((consulta) => {
    const matchEspecialidade = (consulta.especialidade || '')
      .toLowerCase()
      .includes(filtroEspecialidade.toLowerCase());

    const matchProfissional = (consulta.nomeProfissional || '')
      .toLowerCase()
      .includes(filtroProfissional.toLowerCase());

    const matchData = filtroData === '' || consulta.dataConsulta === filtroData;

    return matchEspecialidade && matchProfissional && matchData;
  });

  return (
    <div className="paciente-container">
      <div className={`paciente-sidebar ${menuOpen ? 'open' : 'closed'}`}>
        <div className="paciente-menu-icon" onClick={toggleMenu}>
          <img src={menuIcon} alt="Menu" />
        </div>
        {menuOpen && (
          <div className="paciente-home-icon" onClick={() => navigate('/paciente')}>
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

          <div className="paciente-filtros-container">
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

          {consultasFiltradas.length === 0 ? (
            <p className="paciente-sem-consultas">Nenhuma consulta encontrada com esses filtros.</p>
          ) : (
            consultasFiltradas.map((consulta) => (
              <div className="paciente-consulta-card" key={consulta.id}>
                <div className="paciente-consulta-dia">
                  {consulta.dataConsulta?.split('-')[2]?.split('T')[0] || '??'}
                </div>
                <div className="paciente-consulta-info">
                  <strong>
                    {capitalizarPalavras(consulta.especialidade) || 'Sem especialidade'}
                  </strong>
                  <span>{consulta.nomeProfissional || 'Profissional não definido'}</span><br />
                  <small>
                    Data: {consulta.dataConsulta ? formatarData(consulta.dataConsulta) : 'Data não definida'}
                  </small>
                </div>
                <div className="paciente-consulta-botoes">
                  <button
                    className="paciente-btn-remarcar"
                    onClick={() => abrirModalRemarcar(consulta)}
                  >
                    Remarcar
                  </button>
                  <button
                    className="paciente-btn-cancelar"
                    onClick={() => cancelarConsulta(consulta.id)}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            ))
          )}
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
