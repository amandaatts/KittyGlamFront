import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/LoginProfissional.css';
import helloKittyImg from '../assets/helloKitty.png';

// ✅ Nome corrigido para bater com a rota no App.jsx
export default function LoginProfissional() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && senha) {
      setErro('');
      // ✅ Corrigido para redirecionar para a rota correta
      navigate('/profissional');
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
              onClick={() => navigate('/cadastro-profissional')}
              style={{ cursor: 'pointer' }}
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
