import { useState } from "react"

function DeleteProduct (props){
    const id = props.id
    const setShow = props.setShow
    const setFilter = props.setFilter
    const sorter = props.currentFilter

    const deleteProduct = (e) =>{
        fetch(`http://localhost:3001/unlist-product/${id}`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                
            },
            body: JSON.stringify({                   
                status: 2,
                stock: 0
            })
        }).then(response => response.text())
        .then(body => {
            console.log(body)
            setFilter(sorter)
            setShow()
    })
    }

    const cancelDelete = () => {
        setShow()
        setFilter(sorter)
    }

    return(
        <div className="flex flex-col text-center items-center leading-snug text-sm">
            <h3>Are you sure?</h3>
            <button className="rounded-2xl py-1 mb-1 border-fttGreen border transition hover:scale-115 hover:shadow-md hover:bg-green-800 hover:text-fttWhite w-10" onClick={deleteProduct}>Yes</button>
            <button className="rounded-2xl py-1 border-fttGreen border transition hover:scale-115 hover:shadow-md hover:bg-green-800 hover:text-fttWhite w-10" onClick={cancelDelete}>No</button>
        </div>
    )
}

export default DeleteProduct