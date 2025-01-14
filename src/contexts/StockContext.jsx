import { createContext, useState } from "react";

export const StockContext = createContext({})

export function StockContextProvider({ children }){
    const [items, setItems] = useState(() => {
        const storedItems = localStorage.getItem('items-stock')
        if(!storedItems) return []
        const items = JSON.parse(storedItems)
        items.forEach((item) => { /* no array, createdAt e updatedAt vai estar em string, entao so estou mudando p data novamente */
            item.createdAt = new Date(item.createdAt)
            item.updatedAt = new Date(item.updatedAt)
        });
        return items 
    })

    const addItem = (item) => {
        setItems(currentState => {
            const updatedItems = [item, ...currentState]
            localStorage.setItem('items-stock', JSON.stringify(updatedItems))
            return updatedItems
        })
    }

    const deleteItem = (itemId) => {
        setItems(currentState => {
            const updatedItems = currentState.filter(item => item.id !== itemId)
            localStorage.setItem('items-stock', JSON.stringify(updatedItems))
            return updatedItems
        })
    }

    const getItem = (itemId) => {
        return items.find(item => item.id === +itemId)
    }

    const updateItem = (itemId, newAttributes) => {
        setItems(currentState => {
            const index = currentState.findIndex(item => item.id === +itemId)
            const updatedItems = [...currentState]
            Object.assign(updatedItems[index], newAttributes, { updatedAt: new Date() })
            localStorage.setItem('items-stock', JSON.stringify(updatedItems))
            return updatedItems
        })
    }

    const stock = {
        items,
        addItem,
        deleteItem,
        getItem,
        updateItem
    }

    return(
        <StockContext.Provider value={stock}>
            { children }
        </StockContext.Provider>
    )
}