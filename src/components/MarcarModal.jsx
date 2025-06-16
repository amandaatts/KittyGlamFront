import React, { useState, useEffect, useRef } from "react";
import kittyLogo from "../assets/KittyLogo.png";
import calendarIcon from "../assets/calendario.png";
import "./styles/MarcarModal.css";

export default function MarcarModal({ isOpen, onClose }) {
  const [especialidade, setEspecialidade] = useState("");
  const [dataConsulta, setDataConsulta] = useState("");
  const [profissional, setProfissional] = useState("");
  const [profissionaisFiltrados, setProfissionaisFiltrados] = useState([]);
  const [paciente, setPaciente] = useState({ id: "", nome: "" });

  const modalRef = useRef(null);

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

  useEffect(() => {
    if (isOpen) {
      setEspecialidade("");
      setDataConsulta("");
      setProfissional("");
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

  useEffect(() => {
    if (especialidade) {
      fetch(
        `http://localhost:8080/consultas/profissionais-por-especialidade?especialidade=${especialidade}`
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
  }, [especialidade]);

  async function handleConcluir(e) {
    e.preventDefault();

    if (!dataConsulta || !profissional || !paciente.id) {
      alert("Preencha todos os campos.");
      return;
    }

    try {
      // Busca consultas para evitar conflito de horários
      const res = await fetch("http://localhost:8080/consultas");
      if (!res.ok) throw new Error("Erro ao buscar consultas existentes");

      const consultasExistentes = await res.json();

      const existeConsultaMesmoProfissionalMesmoDia = consultasExistentes.some(
        (c) =>
          c.profissional.id === parseInt(profissional, 10) &&
          c.dataConsulta === dataConsulta
      );

      if (existeConsultaMesmoProfissionalMesmoDia) {
        alert("Esse profissional já possui uma consulta nessa data.");
        return;
      }

      const novaConsulta = {
        dataConsulta,
        profissionalId: profissional,
        pacienteId: paciente.id,
      };

      const response = await fetch("http://localhost:8080/consultas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novaConsulta),
      });

      if (response.ok) {
        alert("Consulta marcada com sucesso!");
        onClose();
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
            value={profissional}
            onChange={(e) => setProfissional(e.target.value)}
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
