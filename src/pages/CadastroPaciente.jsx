import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import helloKittyImg from '../assets/helloKitty.png';
import './styles/CadastroPaciente.css';

export default function Cadastro() {
  const navigate = useNavigate();
  
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nome && telefone && dataNascimento && email && senha) {
      setErro('');
      navigate('/login-paciente');
    } else {
      setErro('Por favor, preencha todos os campos');
    }
  };

  return (
    <div className="cadastro-bg">
      <div className="cadastro-content">
        <form className="cadastro-form" onSubmit={handleSubmit}>
          <h1>Cadastre-se</h1>

          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            id="nome"
            placeholder="Digite seu nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <label htmlFor="telefone">Telefone</label>
          <input
            type="tel"
            id="telefone"
            placeholder="(99) 99999-9999"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
          />

          <label htmlFor="dataNascimento">Data de Nascimento</label>
          <input
            type="date"
            id="dataNascimento"
            value={dataNascimento}
            onChange={(e) => setDataNascimento(e.target.value)}
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="exemplo@email.com"
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

          {erro && <p className="erro">{erro}</p>}

          <button type="submit">Cadastrar</button>

          <div className="ja-tem-conta-container">
            <Link to="/login-paciente" className="ja-tem-conta-link">
              Já tem conta?
            </Link>
          </div>
        </form>

        <div className="kitty-area">
          <img src={helloKittyImg} alt="Hello Kitty" />
        </div>
      </div>
    </div>
  );
}
