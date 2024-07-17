import { Outlet, Link, useLocation } from "react-router-dom";

export default function ItemsLayout() {
    let location = useLocation();

    return (
        <main>
            <h1>Itens do estoque</h1>
            <div className="tabs">
                <Link
                    to="/items"
                    className={`tab ${location.pathname === "/items" ? "active" : ""}`}
                >
                    Todos os itens
                </Link>
                <Link
                    to="/items/new"
                    className={`tab ${location.pathname === "/items/new" ? "active" : ""}`}
                >
                    Adicionar um item
                </Link>
            </div>
            <Outlet />
        </main>
    );
}
