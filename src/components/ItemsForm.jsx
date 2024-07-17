import { useContext, useRef, useState } from "react"
import StockItem from "../entities/StockItem"
import { StockContext } from "../contexts/StockContext"
import { useNavigate } from "react-router-dom"

/*esse componente serve tanto p adicionar, como p atualizar*/
export default function ItemsForm({ itemToUpdate }) {
    const defaultItem = {
        name: "",
        description: "",
        quantity: 0,
        price: 0,
        category: ""
    }

    const CATEGORIES = [
        "eletrodomesticos",
        "eletronicos",
        "informatica",
        "entretenimento",
        "acessorios"
    ]

    const [item, setItem] = useState(itemToUpdate ? itemToUpdate : defaultItem)
    const { addItem, updateItem } = useContext(StockContext)
    const inputRef = useRef(null)
    const navigate = useNavigate()

    /*funcao p ***atualizar*** estados de forma generica*/
    const handleChange = ((ev) => {
        setItem(currentState => {
            return {
                ...currentState,
                [ev.target.name]: ev.target.value
                /*o input que disparou o evento tem name="username" e value="John",
                o estado se torna { ...currentState, username: "John" } */
            }
        })
    })

    const handleSubmit = (ev) => {
        ev.preventDefault()
        try {
            if (itemToUpdate) {
                updateItem(itemToUpdate.id, item)
                alert("o item foi atualizado.")
                navigate("/items")
            } else {
                const newItem = new StockItem(item) /*item q esta no estado*/
                addItem(newItem)
                alert("item cadastrado com sucesso.")
                setItem(defaultItem)
                inputRef.current.focus()
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="row">
                <div>
                    <label htmlFor="name">Nome</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        ref={inputRef}
                        value={item.name}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="quantity">Quantidade</label>
                    <input
                        type="number"
                        name="quantity"
                        id="quantity"
                        required
                        min={0}
                        step={1}
                        value={item.quantity}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="price">Preço</label>
                    <input
                        type="number"
                        name="price"
                        id="price"
                        required
                        min={0.00}
                        step={0.01}
                        value={item.price}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="category">Categoria</label>
                    <select
                        name="category"
                        id="category"
                        required
                        value={item.category}
                        onChange={handleChange}
                    >
                        <option disabled value="">Selecione uma categoria...</option>
                        {CATEGORIES.map((category) => (
                            <option
                                key={category}
                                value={category}
                                defaultChecked={item.category === category}
                            >
                                {category}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="form-control">
                <label htmlFor="description">Descrição</label>
                <textarea
                    name="description"
                    id="description"
                    required
                    rows={6}
                    value={item.description}
                    onChange={handleChange}
                ></textarea>
            </div>
            <button className="button is-primary is-large">
                Salvar
            </button>
        </form>
    )
}