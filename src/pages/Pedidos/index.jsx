import './style.css';
import { Link } from  'react-router-dom';
import { adicionarPedido, exportarPedidos, listarPedidos, removerPedido } from '../../assets/dataBases/func';
import React, { useState } from 'react';

function Pedidos() {

            const [pedidos, setPedidos] = useState(listarPedidos());
            const [novoNome, setNovoNome] = useState('');
            const [novoProduto, setNovoProduto] = useState('');
            const [novaQuantidade, setNovaQuantidade] = useState('');
            const [novoPreco, setNovoPreco] = useState('');
            const [novoPrecoTotal, setNovoPrecoTotal] = useState('');
            const [editandoId, setEditandoId] = useState(null);
            
        
            const handleAdicionar = () => {
                if (!novoNome || !novoProduto || !novaQuantidade || !novoPreco) {
                    alert("Preencha todos os campos!");
                    return;
                }
        
                const novoId = pedidos.length > 0 ? pedidos[pedidos.length - 1].id + 1 : 1;
                const precoTotalCalculado = Number(novaQuantidade) * Number(novoPreco);
                const novoPedido = {id: novoId, nome: novoNome, produto: novoProduto, quantidade: novaQuantidade, preco: novoPreco, precoTotal: precoTotalCalculado, data: new Date().toISOString()};
        
                adicionarPedido(novoNome, novoProduto, novaQuantidade, novoPreco, novoPrecoTotal);
                setPedidos([...pedidos, novoPedido]);
                setNovoNome('');
                setNovoProduto('');
                setNovaQuantidade('');
                setNovoPreco('');
                setNovoPrecoTotal('');
        
            }
        
        
            const handleRemover = (id) => {
                removerPedido(id);
                setPedidos(listarPedidos());
            };
        
        
            const handleEditar = (pedido) => {
                setNovoNome(pedido.nome);
                setNovoProduto(pedido.produto);
                setNovaQuantidade(pedido.quantidade);
                setNovoPreco(pedido.preco);
                setEditandoId(pedido.id); 
            };
        
            const handleSalvarEdicao = () => {
                    if (!novoNome || !novoProduto || !novaQuantidade || !novoPreco) {
                        alert("Preencha todos os campos!");
                        return;
                    }

                    const precoTotalCalculado = Number(novaQuantidade) * Number(novoPreco);
                    const pedidos = listarPedidos();
                    const atualizados = pedidos.map((p) =>
                        p.id === editandoId ? { ...p, nome: novoNome, produto: novoProduto, quantidade: novaQuantidade, preco: novoPreco, precoTotal: precoTotalCalculado, data: new Date().toISOString() } : p
                    );
        
                    localStorage.setItem('pedidos', JSON.stringify(atualizados));
                    setPedidos(atualizados);
                    setNovoNome('');
                    setNovoProduto('');
                    setNovaQuantidade('');
                    setNovoPreco('');
                    setNovoPrecoTotal('');
                    setEditandoId(null);
            };
        
        
            const handleCancelarEdicao = () => {
                setNovoNome('');
                setNovoProduto('');
                setNovaQuantidade('');
                setNovoPreco('');
                setNovoPrecoTotal('');
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
                        <h1>Pedidos</h1>
                    </div>

                    <div className='form-cliente'>
                        <input 
                            type="text" 
                            placeholder="Cliente" 
                            value={novoNome} 
                            onChange={(e) => setNovoNome(e.target.value)} 
                        />
                        <input 
                            type="text" 
                            placeholder="Produto" 
                            value={novoProduto} 
                            onChange={(e) => setNovoProduto(e.target.value)} 
                        />
                        <input 
                            type="text" 
                            placeholder="Quantidade" 
                            value={novaQuantidade} 
                            onChange={(e) => setNovaQuantidade(e.target.value)} 
                        />
                        <input 
                            type="text" 
                            placeholder="Preço" 
                            value={novoPreco} 
                            onChange={(e) => setNovoPreco(e.target.value)} 
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
                                <th>Cliente</th>
                                <th>Produto</th>
                                <th>Quantidade</th>
                                <th>Preço unitário</th>
                                <th>Preço total</th>
                                <th>Data</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                                {pedidos.map((pedido) => (
                                <tr key={pedido.id}>
                                    <td>{pedido.id}</td>
                                    <td>{pedido.nome}</td>
                                    <td>{pedido.produto}</td>
                                    <td>{pedido.quantidade}</td>
                                    <td>R${Number(pedido.preco).toFixed(2)}</td>
                                    <td>R${Number(pedido.precoTotal).toFixed(2)}</td>
                                    <td>{new Date(pedido.data).toLocaleDateString()}</td>
                                    <td>
                                        <button className='botoesLateral' type='submit' title='editar' onClick={() => handleEditar(pedido)}><img src="src/assets/editarIcon.png"></img></button>
                                        <button className='botoesLateral' type='submit' title='remover' onClick={() => handleRemover(pedido.id)}><img src="src/assets/lixoIcon.png"></img></button>
                                    </td>
                                    </tr>))}
                        </tbody>
                    </table>
                    <button className='adicionar' onClick={() => exportarPedidos(pedidos)}>
                        Exportar para Excel
                    </button>
                </div>
            
        </div>
    )
}


export default Pedidos