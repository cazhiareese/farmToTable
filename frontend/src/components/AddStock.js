import { useState } from "react"

function AddStock (props) {
    const id = props.id
    const setShow = props.setShow
    const stock = props.stock
    const setFilter = props.setFilter
    const sorter = props.currentFilter
    const [stockNew, setStock] = useState(stock)

    const handleAddStock = (e) => {
        e.preventDefault()
        fetch(`http://localhost:3001/edit-stock/${id}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                    
                },
                body: JSON.stringify({                   
                    stock : stockNew
                })
            }).then(response => response.text())
            .then(body => {
                console.log(body)
                setFilter(sorter)
                setShow()
        })
    }
    return(
        <div className='w-full'>
        <h3>Add Stock</h3>
        <div >
            <form className="create-product" onSubmit={handleAddStock}>
            <label for="stock"> Stock: </label>
            <input type='number' id='stock' required value={stockNew} onChange={(e) => setStock(parseInt(e.target.value))}/>
            <button type="submit">Confirm</button>
            </form>
        </div>
        </div>
    )
}

export default AddStock