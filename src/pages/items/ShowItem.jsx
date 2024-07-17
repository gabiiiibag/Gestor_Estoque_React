import { useParams, Link } from "react-router-dom"
import { useContext } from "react"
import { StockContext } from "../../contexts/StockContext"
import ButtonDelete from "../../components/ButtonDelete"

export default function ShowItem() {
    const { getItem } = useContext(StockContext)
    const { id } = useParams()
    const item = getItem(id)

    return (
        <div className="item">
            <h2>{item.name}</h2>
            <Link to={`/items/${item.id}/update`} className="button is-small">Atualizar</Link>
            <ButtonDelete itemId={item.id} itemName={item.name} />
            <div className="row">
                <span>Categoria: {item.category}</span>
                <span>Quantidade em estoque: {item.quantity}</span>
                <span>Preço: R$ {item.price}</span>
            </div>
            <p>{item.description}</p>
            <div className="row">
                <p>Cadastrado em: {item.createdAt.toDateString()}</p>
                <p>Atualizado em: {item.updatedAt.toDateString()}</p>
            </div>
        </div>
    )
}