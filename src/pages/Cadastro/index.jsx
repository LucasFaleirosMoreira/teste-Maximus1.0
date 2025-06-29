import './style.css'
import { Link } from  'react-router-dom'
import React, { useState } from 'react';
import { adicionarUsuario, cadastrarUsuario } from '../../assets/dataBases/func.js';

function Cadastro() {

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [cpf, setCPF] = useState('');
  const [data, setData] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const cadastroRealizado = cadastrarUsuario(nome, email, senha, data)

    if(cadastroRealizado){
      alert("Cadastro realizado com sucesso!");
      adicionarUsuario(nome, cpf, email, senha, data);
    }else{
      alert("E-mail já cadastrado!!");
    }

  }


  return (
      <div className='container'>
          <form action="" onSubmit={handleSubmit}className='formInicial'>
            <h1>Cadastrar-se</h1>
            <input type="text" placeholder='Nome' value={nome} onChange={(e) => setNome(e.target.value)}/>
            <input type="text" placeholder='CPF' value={cpf} onChange={(e) => setCPF(e.target.value)}/>
            <input type="email" placeholder='E-mail' value={email} onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" placeholder='Senha' value={senha} onChange={(e) => setSenha(e.target.value)}/>
            <input type="text" placeholder='Data de nascimento' value={data} onChange={(e) => setData(e.target.value)}/>
            <button type='submit'>Cadastrar</button>

            <h4 className='aqui'>Já possui uma conta? Entre clicando <Link to='/'>aqui</Link></h4>
          </form>

      </div>


  )
}

export default Cadastro
