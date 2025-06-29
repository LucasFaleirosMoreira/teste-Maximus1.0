const chave = 'usuarios';
const chaveProdutos = 'produtos';
const chavePedidos = 'pedidos';

export function listarUsuarios() {
    const dados = localStorage.getItem(chave);
    if (dados){
        return JSON.parse(dados);
    }else {
        return [];
    }
}

export function listarProdutos(){
    const dados = localStorage.getItem(chaveProdutos);
    if (dados){
        return JSON.parse(dados);
    }else {
        return [];
    }
}

export function adicionarProduto(nome, valor, estoque) {
    const produtos = listarProdutos();
    const novoId = produtos.length > 0 ? produtos[produtos.length - 1].id + 1 : 1;

    produtos.push({ id: novoId, nome, valor, estoque });
    localStorage.setItem('produtos', JSON.stringify(produtos));
}

export function removerProduto(id) {
    const produtos = listarProdutos();
    const listaAtualizada = produtos.filter((p) => p.id !== id);
    localStorage.setItem(chaveProdutos, JSON.stringify(listaAtualizada));
}

export function adicionarUsuario(nome, cpf, email, senha, data) {
    const usuarios = listarUsuarios();
    const novoId = usuarios.length > 0 ? usuarios[usuarios.length - 1].id + 1 : 1;

    usuarios.push({ id: novoId, nome, cpf, email, senha, data });
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
}



export function removerUsuario(id) {
    const usuarios = listarUsuarios();
    const listaAtualizada = usuarios.filter((u) => u.id !== id);
    localStorage.setItem(chave, JSON.stringify(listaAtualizada));
}


export function validarEmail(email) {
    const usuarios = listarUsuarios();
    return usuarios.some((u) => u.email === email);
}

export function cadastrarUsuario(nome, email, senha) {
    const usuarios = listarUsuarios();

    return !usuarios.some((u) => u.email === email);
}

export function validarLogin(email, senha) {
    const usuarios = listarUsuarios();
    return usuarios.find((u) => u.email === email && u.senha === senha);
}


export function listarPedidos() {
    const dados = localStorage.getItem(chavePedidos);
    return dados ? JSON.parse(dados) : [];
}

export function adicionarPedido(cliente, produto, quantidade, preco) {
    const pedidos = listarPedidos();

    const novoPedido = {
        id: pedidos.length > 0 ? pedidos[pedidos.length - 1].id + 1 : 1,
        cliente,
        produto,
        quantidade: Number(quantidade),
        preco,
        precoTotal: Number(quantidade) * Number(preco),
        data: new Date().toISOString(),
    };

    pedidos.push(novoPedido);
    localStorage.setItem(chavePedidos, JSON.stringify(pedidos));
}


export function removerPedido(id) {
    const pedidos = listarPedidos();
    const atualizados = pedidos.filter((p) => p.id !== id);
    localStorage.setItem(chavePedidos, JSON.stringify(atualizados));
}


import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export function exportarUsuarios(usuarios) {

  const worksheet = XLSX.utils.json_to_sheet(usuarios);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Usuários');

  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
  saveAs(data, 'usuarios.xlsx');
}

export function exportarPedidos(pedidos) {
  const worksheet = XLSX.utils.json_to_sheet(pedidos);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Pedidos');

  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
  saveAs(data, 'pedidos.xlsx');
}

export function exportarProdutos(produtos) {
  const worksheet = XLSX.utils.json_to_sheet(produtos);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Produtos');
  
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
  saveAs(data, 'produtos.xlsx');
}