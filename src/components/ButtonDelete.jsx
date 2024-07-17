import { useContext } from "react"
import { StockContext } from "../contexts/StockContext"
import { useNavigate } from "react-router-dom"

export default function ButtonDelete({ itemName, itemId }) {
    const { deleteItem } = useContext(StockContext)
    const navigate = useNavigate()

    const handleDelete = () => {
        if (confirm(`Deseja mesmo excluir ${itemName}?`)) {
            deleteItem(itemId)
            navigate("/items")
        }
    }

    return (
        <button 
            className="button is-danger is-small"
            onClick={handleDelete}
        >
            Excluir
        </button>
    )
}
