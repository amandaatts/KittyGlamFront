import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import helloKittyImg from '../assets/helloKitty.png';
import './styles/CadastroProfissional.css';

export default function CadastroProfissional() {
  const navigate = useNavigate();

  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [especialidade, setEspecialidade] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (nome && telefone && especialidade && email && senha) {
      setErro('');

      try {
        const response = await fetch('http://localhost:8080/api/profissionais', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            nome,
            telefone,
            especialidade,
            email,
            senha
            // dataNasc não está no front, então não envia
          })
        });

        if (response.ok) {
          navigate('/login-profissional');
        } else {
          const errorData = await response.json();
          setErro(errorData.message || 'Erro ao cadastrar profissional');
        }
      } catch (error) {
        setErro('Erro ao conectar com o servidor');
      }

    } else {
      setErro('Por favor, preencha todos os campos');
    }
  };

  return (
    <div className="cadastro-prof-bg">
      <div className="cadastro-prof-content">
        <form className="cadastro-prof-form" onSubmit={handleSubmit}>
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

          <label htmlFor="especialidade">Especialidade</label>
          <select
            id="especialidade"
            value={especialidade}
            onChange={(e) => setEspecialidade(e.target.value)}
          >
            <option value="" disabled>Selecione…</option>
            <option value="design-sobrancelha">Design sobrancelha</option>
            <option value="manicure">Manicure</option>
            <option value="alongamento-cilios">Alongamento de cílios</option>
            <option value="lash-lifting">Lash lifting</option>
            <option value="pedicure">Pedicure</option>
          </select>

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

          {erro && <p className="erro-prof">{erro}</p>}

          <button type="submit">Cadastrar</button>

          <div className="ja-tem-conta-prof-container">
            <Link to="/login-profissional" className="ja-tem-conta-prof-link">
              Já tem conta?
            </Link>
          </div>
        </form>

        <div className="kitty-prof-area">
          <img src={helloKittyImg} alt="Hello Kitty" />
        </div>
      </div>
    </div>
  );
}
