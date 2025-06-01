import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/LoginProfissional.css'; // usa o mesmo CSS do profissional, sem problema
import helloKittyImg from '../assets/helloKitty.png';

export default function LoginPaciente() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && senha) {
      setErro('');
      navigate('/paciente'); // ✅ ALTERAÇÃO ÚNICA AQUI
    } else {
      setErro('Por favor, preencha email e senha');
    }
  };

  return (
    <div className="login-medico-container">
      <div className="login-medico-content">
        <div className="login-medico-box">
          <h1>Bem vindo</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />

            <button type="submit">Login</button>

            {erro && <p className="erro-msg-medico">{erro}</p>}

            <p
              className="no-account-medico"
              onClick={() => navigate('/cadastro-paciente')}
            >
              Não tem conta?
            </p>
          </form>
        </div>
        <div className="hello-kitty-img-medico">
          <img src={helloKittyImg} alt="Hello Kitty" />
        </div>
      </div>
    </div>
  );
}
