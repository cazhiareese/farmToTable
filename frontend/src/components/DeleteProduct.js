import { useState } from "react"

function DeleteProduct (props){
    const id = props.id
    const setShow = props.setShow
    const setFilter = props.setFilter
    const sorter = props.currentFilter

    const deleteProduct = (e) =>{
        fetch(`http://localhost:3001/remove-product/${id}`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                
            },
            body: JSON.stringify({                   
                
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
        <div>
            <h3>Are you sure?</h3>
            <button onClick={deleteProduct}>Yes</button>
            <button onClick={cancelDelete}>No</button>
        </div>
    )
}

export default DeleteProduct