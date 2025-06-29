import './style.css';
import { Link } from  'react-router-dom';
import { adicionarProduto, listarProdutos, removerProduto, exportarProdutos } from '../../assets/dataBases/func';
import React, { useState } from 'react';

function Produtos() {

        const [produtos, setProdutos] = useState(listarProdutos());
        const [novoNome, setNovoNome] = useState('');
        const [novoPreco, setNovoPreco] = useState('');
        const [novoEstoque, setNovoEstoque] = useState('');
        const [editandoId, setEditandoId] = useState(null);
        
    
        const handleAdicionar = () => {
            if (!novoNome || !novoPreco || !novoEstoque) {
                alert("Preencha todos os campos!");
                return;
            }
    
            const novoId = produtos.length > 0 ? produtos[produtos.length - 1].id + 1 : 1;
            const novoProduto = {id: novoId, nome: novoNome, preco: novoPreco, estoque: novoEstoque};
    
            adicionarProduto(novoNome, novoPreco, novoEstoque);
            setProdutos([...produtos, novoProduto]);
            setNovoNome('');
            setNovoPreco('');
            setNovoEstoque('');
    
        }
    
    
        const handleRemover = (id) => {
            removerProduto(id);
            setProdutos(listarProdutos());
        };
    
    
        const handleEditar = (produto) => {
            setNovoNome(produto.nome);
            setNovoPreco(produto.preco);
            setNovoEstoque(produto.estoque);
            setEditandoId(produto.id); 
        };
    
        const handleSalvarEdicao = () => {
                if (!novoNome || !novoPreco || !novoEstoque) {
                    alert("Preencha todos os campos!");
                    return;
                }
    
                const produtos = listarProdutos();
                const atualizados = produtos.map((p) =>
                    p.id === editandoId ? { ...p, nome: novoNome, preco: novoPreco, estoque: novoEstoque } : p
                );
    
                localStorage.setItem('produtos', JSON.stringify(atualizados));
                setProdutos(atualizados);
                setNovoNome('');
                setNovoPreco('');
                setNovoEstoque('');
                setEditandoId(null);
        };
    
    
        const handleCancelarEdicao = () => {
            setNovoNome('');
            setNovoPreco('');
            setNovoEstoque('');
            setEditandoId(null);
        };


    return (
        <div className='body'>
                <div className='barraLateral'>
                    <button><img src='src/assets/barraLateral.png' className="iconLateral"></img></button>
                        <div>
                            <Link to='/Home'> <img src="src/assets/homeIcon.png" className='iconLateral'></img></Link> <h4 className='estendido'>Início</h4>
                            <Link to='/clientes'><img src='src/assets/clienteIcon.png' className='iconLateral'/></Link><h4 className='estendido'>Clientes</h4>
                            <Link to='/produtos'><img src='src/assets/produtosIcon.png' className='iconLateral' alt='' /></Link><h4 className='estendido'>Produtos</h4>
                            <Link to='/pedidos'><img src='src/assets/pedidosIcon.png' className='iconLateral' alt='' /></Link><h4 className='estendido'>Pedidos</h4>

                        </div>
                    
                </div>

                <div className='tabela'>
                    <div className='titulo'> 
                        <h1>Produtos</h1>
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
                            placeholder="Preço" 
                            value={novoPreco} 
                            onChange={(e) => setNovoPreco(e.target.value)} 
                        />
                        <input 
                            type="text" 
                            placeholder="Estoque" 
                            value={novoEstoque} 
                            onChange={(e) => setNovoEstoque(e.target.value)} 
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
                                <th>Preço unitário</th>
                                <th>Estoque</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                                {produtos.map((produto) => (
                                <tr key={produto.id}>
                                    <td>{produto.id}</td>
                                    <td>{produto.nome}</td>
                                    <td>R${produto.preco}</td>
                                    <td>{produto.estoque}</td>
                                    <td>
                                        <button className='botoesLateral' type='submit' title='editar' onClick={() => handleEditar(produto)}><img src="src/assets/editarIcon.png"></img></button>
                                        <button className='botoesLateral' type='submit' title='remover' onClick={() => handleRemover(produto.id)}><img src="src/assets/lixoIcon.png"></img></button>
                                    </td>
                             </tr>))}
                        </tbody>
                    </table>
                    <button className='adicionar' onClick={() => exportarProdutos(produtos)}>
                        Exportar para Excel
                    </button>
                </div>
            
        </div>
    )
}


export default Produtos