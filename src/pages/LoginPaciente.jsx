import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/LoginProfissional.css';
import helloKittyImg from '../assets/helloKitty.png';

export default function LoginPaciente() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !senha) {
      setErro('Por favor, preencha email e senha');
      return;
    }

    setErro('');
    try {
      const response = await fetch('http://localhost:8080/api/pacientes/login', {  
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha }),
      });

      if (response.ok) {
        const data = await response.json();  // pega os dados do paciente logado
        localStorage.setItem('usuarioLogado', JSON.stringify(data));  // salva no localStorage
        navigate('/paciente');  // navega para a página do paciente
      } else {
        const data = await response.text();
        setErro(data || 'Email ou senha inválidos');
      }
    } catch (error) {
      setErro('Erro ao conectar com o servidor');
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
