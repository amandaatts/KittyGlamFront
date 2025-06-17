import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/LoginProfissional.css';
import helloKittyImg from '../assets/helloKitty.png';

export default function LoginProfissional() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email && senha) {
      setErro('');

      try {
        const response = await fetch('http://localhost:8080/api/profissionais/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, senha })
        });

        if (response.ok) {
          const data = await response.json();

          // Salva o id do profissional no localStorage
          localStorage.setItem('profissionalId', data.id);

          navigate('/profissional');
        } else {
          let errorMsg = 'Credenciais inválidas';
          try {
            const errorData = await response.json();
            if (errorData.message) {
              errorMsg = errorData.message;
            }
          } catch {
            // mantém a mensagem padrão
          }
          setErro(errorMsg);
        }
      } catch (error) {
        setErro('Erro ao conectar com o servidor');
      }
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
