import { useContext } from "react"
import ItemsForm from "../../components/ItemsForm"
import { StockContext } from "../../contexts/StockContext"
import { useParams } from "react-router-dom"

export default function UpdateItem(){
    const { getItem } = useContext(StockContext)
    const { id } = useParams()
    const item = getItem(id)

    return(
        <>
        <h2>Atualizar item</h2>
        <ItemsForm itemToUpdate={item}/>
        </>
    )
}