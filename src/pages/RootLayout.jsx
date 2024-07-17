import { Link, Outlet } from "react-router-dom"

export default function RootLayout() {
    return (
        <div id="root">
            <header>
                <Link to="/" className="logo">Seu Estoque</Link>
                <nav>
                    <Link to="/">Início</Link>
                    <Link to="/items">Itens</Link>
                </nav>
            </header>
            <div>
                <Outlet />
            </div>
            <footer>
                Feito com React
            </footer>
        </div>
    )
}