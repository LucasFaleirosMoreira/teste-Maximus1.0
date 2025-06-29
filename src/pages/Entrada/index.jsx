import './style.css';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className='body'>
            <div className='barraLateral'>
                <button>
                    <img src='src/assets/barraLateral.png' className='iconLateral' alt='' />
                </button>
                <div>
                    <Link to='/Home'> <img src="src/assets/homeIcon.png" className='iconLateral'></img></Link> <h4 className='estendido'>Início</h4>
                    <Link to='/clientes'><img src='src/assets/clienteIcon.png' className='iconLateral'/></Link><h4 className='estendido'>Clientes</h4>
                    <Link to='/produtos'><img src='src/assets/produtosIcon.png' className='iconLateral' alt='' /></Link><h4 className='estendido'>Produtos</h4>
                    <Link to='/pedidos'><img src='src/assets/pedidosIcon.png' className='iconLateral' alt='' /></Link><h4 className='estendido'>Pedidos</h4>

                </div>
            </div>

            <div className='entrada'>
                <h1>Bem-vindo ao Sistema</h1>
                <p>Utilize o menu lateral para navegar.</p>
            </div>
        </div>
    );
}

export default Home;
