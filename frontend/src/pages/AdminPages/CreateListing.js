import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

function CreateListing () {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [type, setType] = useState(0)
    const [stock, setStock] = useState(0)
    const [price, setPrice] = useState(0)
    const [imageURL, setImageURL] = useState('')
    const navigate = useNavigate()

    const handleNewProduct = (e) =>{
        e.preventDefault()
        const product ={name, description, type, stock, price, imageURL}
        console.log(product)
        fetch('http://localhost:3001/add-product', {
            method: 'POST',
            body: JSON.stringify(product),
            headers:{
                'Content-type':'application/json'
            }
        }).then( () => {
            setName('')
            setDescription('')
            setType(0)
            setStock(0)
            setPrice(0)
            setImageURL(0)
            navigate('/admin/inventory')
        })
        }
    

    return (
        <div className='create-container'>
            <h1>Create Listing</h1>

            <div className='form'></div>
            <form className="create-product" onSubmit={handleNewProduct}>

                <label for="pname">Product Name: </label>
                <input type='text' id='pname 'required value={name} onChange={(e) => setName(e.target.value)}/>

                <label for="desc">Description: </label>
                <input type='text' id='desc' required value={description} onChange={(e) => setDescription(e.target.value)}/>

                <label for="type">Type: </label>
                <select name="type" id = "type" value={type} onChange={(e) => setType (parseInt(e.target.value))}>
                    <option value="1">Crop</option>
                    <option value="2">Poultry</option>
                </select>
                <label for="stock"> Stock: </label>
                <input type='number' id='stock' required value={stock} onChange={(e) => setStock(parseInt(e.target.value))}/>

                <label for="price"> Pricet: </label>
                <input type='number' id='price' required value={price} onChange={(e) => setPrice(parseFloat(e.target.value))}/>


                <label for="url">Image URL: </label>
                <input type='text' id='url' required value={imageURL} onChange={(e) => setImageURL(e.target.value)}/>


                <button type='submit'>Create New Product</button>
            </form>
        </div>
    )
}

export default CreateListing