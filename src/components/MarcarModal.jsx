import React, { useState, useEffect, useRef } from "react";
import kittyLogo from "../assets/KittyLogo.png";
import calendarIcon from "../assets/calendario.png";
import "./styles/MarcarModal.css";

export default function MarcarModal({ isOpen, onClose }) {
  const [especialidade, setEspecialidade] = useState("");
  const [dataConsulta, setDataConsulta] = useState("");
  const [profissionalId, setProfissionalId] = useState("");
  const [profissionaisFiltrados, setProfissionaisFiltrados] = useState([]);
  const [paciente, setPaciente] = useState({ id: "", nome: "" });

  const modalRef = useRef(null);

  // Função para buscar profissionais por especialidade (reutilizável)
  function buscarProfissionais(espec) {
    if (espec) {
      fetch(
        `http://localhost:8080/consultas/profissionais-por-especialidade?especialidade=${espec}`
      )
        .then((res) => {
          if (!res.ok) throw new Error("Erro na resposta do servidor");
          return res.json();
        })
        .then((data) => setProfissionaisFiltrados(data))
        .catch((err) => {
          console.error("Erro ao buscar profissionais:", err);
          setProfissionaisFiltrados([]);
        });
    } else {
      setProfissionaisFiltrados([]);
    }
  }

  // Fechar modal clicando fora
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Resetar campos e pegar paciente do localStorage quando abrir modal
  useEffect(() => {
    if (isOpen) {
      setEspecialidade("");
      setDataConsulta("");
      setProfissionalId("");
      setProfissionaisFiltrados([]);
      try {
        const userStr = localStorage.getItem("usuarioLogado");
        if (userStr) {
          let user = JSON.parse(userStr);
          if (typeof user === "string") user = JSON.parse(user);
          if (user && user.id && user.nome) {
            setPaciente({ id: user.id, nome: user.nome });
          }
        }
      } catch (err) {
        console.error("Erro ao ler paciente do localStorage:", err);
      }
    }
  }, [isOpen]);

  // Sempre que especialidade muda, buscar profissionais
  useEffect(() => {
    buscarProfissionais(especialidade);
    // Também resetar o profissional selecionado para evitar inconsistencia
    setProfissionalId("");
  }, [especialidade]);

  // Enviar dados para backend para salvar consulta
  async function handleConcluir(e) {
    e.preventDefault();

    if (!dataConsulta || !profissionalId || !paciente.id) {
      alert("Preencha todos os campos.");
      return;
    }

    try {
      const novaConsulta = {
        dataConsulta,
        profissionalId,
        pacienteId: paciente.id,
      };

      const response = await fetch("http://localhost:8080/consultas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novaConsulta),
      });

      if (response.ok) {
        alert("Consulta marcada com sucesso!");

        // Atualizar a lista de profissionais para refletir qualquer mudança, se necessário
        buscarProfissionais(especialidade);

        onClose(); // Fecha o modal após salvar
      } else {
        alert("Erro ao marcar consulta.");
      }
    } catch (error) {
      console.error("Erro ao marcar consulta:", error);
      alert("Erro ao conectar com o servidor.");
    }
  }

  if (!isOpen) return null;

  return (
    <div className="marcar-modal-overlay">
      <div className="marcar-modal-card" ref={modalRef}>
        <img src={kittyLogo} alt="Hello Kitty" className="marcar-kitty-icon" />
        <form className="marcar-modal-form" onSubmit={handleConcluir}>
          <label className="marcar-modal-label">Especialidade:</label>
          <select
            value={especialidade}
            onChange={(e) => setEspecialidade(e.target.value)}
            className="marcar-modal-input"
            required
          >
            <option value="" disabled>
              Selecione…
            </option>
            <option value="design-sobrancelha">Design sobrancelha</option>
            <option value="manicure">Manicure</option>
            <option value="alongamento-cilios">Alongamento de cílios</option>
            <option value="lash-lifting">Lash lifting</option>
            <option value="pedicure">Pedicure</option>
          </select>

          <label className="marcar-modal-label">Data da consulta:</label>
          <div className="marcar-input-with-icon">
            <input
              type="date"
              id="marcar-dataConsulta"
              value={dataConsulta}
              onChange={(e) => setDataConsulta(e.target.value)}
              className="marcar-modal-input"
              required
            />
            <img
              src={calendarIcon}
              alt="Abrir calendário"
              className="marcar-calendar-icon"
              onClick={() =>
                document.querySelector("#marcar-dataConsulta")?.showPicker?.()
              }
              tabIndex={0}
            />
          </div>

          <label className="marcar-modal-label">Profissional:</label>
          <select
            value={profissionalId}
            onChange={(e) => setProfissionalId(e.target.value)}
            className="marcar-modal-input"
            required
          >
            <option value="" disabled>
              Selecione…
            </option>
            {profissionaisFiltrados.map((prof) => (
              <option key={prof.id} value={prof.id}>
                {prof.nome}
              </option>
            ))}
          </select>

          <label className="marcar-modal-label">Paciente:</label>
          <input
            type="text"
            value={paciente.nome}
            readOnly
            className="marcar-modal-input"
          />

          <button type="submit" className="marcar-btn-concluir">
            Concluir
          </button>
        </form>
      </div>
    </div>
  );
}
