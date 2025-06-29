import { adicionarUsuario, listarUsuarios, removerUsuario, exportarUsuarios } from '../../assets/dataBases/func';
import './style.css';
import { Link } from  'react-router-dom';
import React, { useState } from 'react';


function Clientes (){

    const [clientes, setClientes] = useState(listarUsuarios());
    const [novoNome, setNovoNome] = useState('');
    const [novoCPF, setNovoCPF] = useState('');
    const [novoEmail, setNovoEmail] = useState('');
    const [novaData, setNovaData] = useState('');
    const [editandoId, setEditandoId] = useState(null);
    

    const handleAdicionar = () => {
        if (!novoNome || !novoEmail || !novaData || !novoCPF) {
            alert("Preencha todos os campos!");
            return;
        }

        const novoId = clientes.length > 0 ? clientes[clientes.length - 1].id + 1 : 1;
        const novoCliente = {id: novoId, nome: novoNome, cpf: novoCPF, email: novoEmail, data: novaData};

        adicionarUsuario(novoNome, novoCPF, novoEmail, '123', novaData);
        setClientes([...clientes, novoCliente]);
        setNovoNome('');
        setNovoCPF('');
        setNovoEmail('');
        setNovaData('');

    }


    const handleRemover = (id) => {
        removerUsuario(id);
        setClientes(listarUsuarios());
    };


    const handleEditar = (cliente) => {
        setNovoNome(cliente.nome);
        setNovoCPF(cliente.cpf);
        setNovoEmail(cliente.email);
        setNovaData(cliente.data)
        setEditandoId(cliente.id); 
    };

    const handleSalvarEdicao = () => {
            if (!novoNome || !novoEmail ||!novaData || !novoCPF) {
                alert("Preencha todos os campos!");
                return;
            }

            const usuarios = listarUsuarios();
            const atualizados = usuarios.map((u) =>
                u.id === editandoId ? { ...u, nome: novoNome, cpf: novoCPF, email: novoEmail, data: novaData } : u
            );

            localStorage.setItem('usuarios', JSON.stringify(atualizados));
            setClientes(atualizados);
            setNovoNome('');
            setNovoCPF('');
            setNovoEmail('');
            setNovaData('');
            setEditandoId(null);
    };


    const handleCancelarEdicao = () => {
        setNovoNome('');
        setNovoCPF('');
        setNovoEmail('');
        setNovaData('');
        setEditandoId(null);
    };

    return (
        <div className='body'>
                <div className='barraLateral'>
                    <button><img src='src/assets/barraLateral.png' className="iconLateral"></img></button>
                        <div>
                            <Link to='/Home'> <img src="src/assets/homeIcon.png" className='iconLateral'></img></Link> <h4 className='estendido'>Início</h4>
                            <Link to='/clientes'><img src="src/assets/clienteIcon.png" className='iconLateral'></img></Link> <h4 className='estendido'>Clientes</h4>
                            <Link to='/produtos'><img src="src/assets/produtosIcon.png" className='iconLateral'></img></Link> <h4 className='estendido'>Produtos</h4>
                            <Link to='/pedidos'><img src="src/assets/pedidosIcon.png" className='iconLateral'></img></Link> <h4 className='estendido'>Pedidos</h4>

                        </div>
                    
                </div>


                <div className='tabela'>
                    <div className='titulo'> 
                        <h1>Clientes</h1>
                    </div>

                    <div className='form-cliente'>
                        <input 
                            type="text" 
                            placeholder="Nome" 
                            value={novoNome} 
                            onChange={(e) => setNovoNome(e.target.value)} 
                        />
                        <input 
                            type="text" 
                            placeholder="CPF" 
                            value={novoCPF} 
                            onChange={(e) => setNovoCPF(e.target.value)} 
                        />
                        <input 
                            type="email" 
                            placeholder="E-mail" 
                            value={novoEmail} 
                            onChange={(e) => setNovoEmail(e.target.value)} 
                        />
                        <input 
                            type="text" 
                            placeholder="Data de nascimento" 
                            value={novaData} 
                            onChange={(e) => setNovaData(e.target.value)} 
                        />
                        {editandoId ? (
                            <>
                                <button className='salvar' onClick={handleSalvarEdicao}>SALVAR EDIÇÃO</button>
                                <button className='cancelar' onClick={handleCancelarEdicao}>CANCELAR</button>
                            </>
                            ) : (
                            <button className='adicionar' onClick={handleAdicionar}>ADICIONAR</button>
                         )}
                    </div>
                    

                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nome</th>
                                <th>CPF</th>
                                <th>E-mail</th>
                                <th>Data Nascimento</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clientes.map((cliente) => (
                                <tr key={cliente.id}>
                                    <td>{cliente.id}</td>
                                    <td>{cliente.nome}</td>
                                    <td>{cliente.cpf}</td>
                                    <td>{cliente.email}</td>
                                    <td>{cliente.data}</td>
                                    <td>
                                        <button className='botoesLateral' type='submit' title='editar' onClick={() => handleEditar(cliente)}><img src="src/assets/editarIcon.png"></img></button>
                                        <button className='botoesLateral' type='submit' title='remover' onClick={() => handleRemover(cliente.id)}><img src="src/assets/lixoIcon.png"></img></button>
                                    </td>
                                </tr>))}
                        </tbody>                 
                    </table>
                    <button className='adicionar' onClick={() => exportarUsuarios(clientes)}>
                        Exportar para Excel
                    </button>
                </div>

                        
        </div>
    )


}



export default Clientes