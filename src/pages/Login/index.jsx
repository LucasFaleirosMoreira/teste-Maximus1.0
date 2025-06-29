import { validarLogin } from '../../assets/dataBases/func'
import './style.css'
import { Link } from  'react-router-dom'
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const usuarioValido = validarLogin(email, senha)

        if(usuarioValido){
            alert("Login realizado com sucesso!!");
            navigate('/Home');
        }else{
            alert("Email ou senha incorretos!! Tente novamente");
        }
    };

    return (
        <div className='container'>
            <form action="" onSubmit={handleSubmit} className='formInicial'>
                <h1>Bem-Vindo!</h1>
                <input type="email" placeholder='E-mail' value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" placeholder='Senha' value={senha} onChange={(e) => setSenha(e.target.value)}/>
                <button type='submit'>ENTRAR</button>

                <h4 className='aqui'>Ainda não possui uma conta? Cadastre-se clicando <Link to='/cadastro'>aqui</Link></h4>
            </form>


        </div>
    )
} 


export default Login