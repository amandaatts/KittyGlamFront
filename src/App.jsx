import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';

import Escolha from './pages/Escolha.jsx';
import LoginPaciente from './pages/LoginPaciente.jsx';
import LoginProfissional from './pages/LoginProfissional.jsx';
import CadastroPaciente from './pages/CadastroPaciente.jsx';
import CadastroProfissional from './pages/CadastroProfissional.jsx';
import Paciente from './pages/Paciente.jsx';
import Profissional from './pages/Profissional.jsx';
import HorariosPaciente from './pages/HorariosPaciente.jsx';
import HorariosProfissional from './pages/HorariosProfissional.jsx'; // ✅ NOVO
import MarcarModal from './components/MarcarModal.jsx';

function App() {
  const [consultas, setConsultas] = useState([
    { data: '2024-06-25', especialidade: 'Alongamento de cílios', profissional: 'Amanda', paciente: 'Maria' },
    { data: '2024-06-30', especialidade: 'Design de sobrancelha', profissional: 'Laís', paciente: 'Maria' },
    { data: '2024-07-10', especialidade: 'Manicure', profissional: 'Ana', paciente: 'Maria' }
  ]);

  const [modalMarcarAberto, setModalMarcarAberto] = useState(false);

  const adicionarConsulta = (novaConsulta) => {
    setConsultas(prevConsultas => [...prevConsultas, novaConsulta]);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Escolha />} />
        <Route path="/login-profissional" element={<LoginProfissional />} />
        <Route path="/cadastro-profissional" element={<CadastroProfissional />} />
        <Route path="/login-paciente" element={<LoginPaciente />} />
        <Route path="/login" element={<LoginPaciente />} /> {/* ✅ NOVA ROTA ADICIONADA */}
        <Route path="/cadastro-paciente" element={<CadastroPaciente />} />
        <Route path="/paciente" element={<Paciente />} />
        <Route path="/profissional" element={<Profissional />} />
        <Route
          path="/horarios-paciente"
          element={
            <HorariosPaciente
              consultas={consultas}
              setConsultas={setConsultas}
              abrirModalMarcar={() => setModalMarcarAberto(true)}
            />
          }
        />
        <Route
          path="/horarios-profissional"
          element={
            <HorariosProfissional
              consultas={consultas}
              setConsultas={setConsultas}
            />
          }
        />
      </Routes>

      <MarcarModal
        isOpen={modalMarcarAberto}
        onClose={() => setModalMarcarAberto(false)}
        onSubmit={(novaConsulta) => {
          adicionarConsulta(novaConsulta);
          setModalMarcarAberto(false);
        }}
      />
    </BrowserRouter>
  );
}

export default App;
