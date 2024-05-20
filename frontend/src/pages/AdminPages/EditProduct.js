import { useEffect, useState } from 'react';
import { useParams, useOutletContext } from 'react-router-dom';
import { Navigate, useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom';
import arrow from '../../icons/view_product_arrow.png';

function EditProduct (){
    let productId = useParams();
    const [product, setProduct] = useState({})
    const [name, setName] = useState("")
    const [description, setDescription] = useState('')
    const [type, setType] = useState('')
    const [stock, setStock] = useState('')
    const [price, setPrice] = useState('')
    const [imageURL, setImageURL] = useState('')
    const navigate = useNavigate()
    

    useEffect (() =>{
        let url = `http://localhost:3001/getProduct/${productId.id}`
        fetch(url)
            .then(response => response.json())
            .then(body => {
               setName(body.name)
               setDescription(body.description)
               setType(body.type)
               setStock(body.stock)
               setPrice(body.price)
               setImageURL(body.imageURL)
               console.log(body)
            })  
            
    }, [])


    const handleEditProduct = (e) =>{
        e.preventDefault()
       const product ={ name, description, type, stock, price, imageURL}
        console.log(product)
        fetch(`http://localhost:3001/edit-product/${productId.id}`, {
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

   

    

    return(
        <div className="bg-fttBg w-full text-fttGreen font-Roboto">
            <div className="shadow-md bg-fttWhite mb-10 flex justify-center flex-col h-28">
                <button className=' ml-4 group text-sm  w-52 h-10 rounded-full'>
                <p className='inline-block'><img  className= 'ease-out delay-150 group-hover:-translate-x-1 inline-block h-4 mr-3' src={arrow}></img></p><Link  to={'/admin/inventory'}>Back to inventory</Link></button>
                <h1 className=' ml-12 text-4xl font-medium mb-4'>Edit Listing</h1>
            </div>

            <form onSubmit={handleEditProduct}>
               <div className='bg-fttWhite w-3/4 mx-auto flex flex-col shadow px-28 py-6 mb-8 rounded-3xl'>
                    <label for="pname">Product Name: </label>
                    <input className='p-4 border-slate-300 rounded-lg border h-10 mb-4 focus:shadow-md' type='text' id='pname 'required value={name} onChange={(e) => setName(e.target.value)}/>

                    <label for="desc">Description: </label>
                    <input className='p-4 border-slate-300 rounded-lg border h-10 mb-4 focus:shadow-md' type='text' id='desc' required value={description} onChange={(e) => setDescription(e.target.value)}/>
                </div>
                
                <div className='bg-fttWhite w-3/4 mx-auto flex flex-col shadow px-28 py-6 mb-8 rounded-3xl'>
                    <label for="url">Image URL: </label>
                    <input className='p-4 border-slate-300 rounded-lg border h-10 mb-4 focus:shadow-md' type='text' id='url' required value={imageURL} onChange={(e) => setImageURL(e.target.value)} />
                </div>

                <div className='bg-fttWhite w-3/4 mx-auto flex flex-col shadow px-28 py-6 mb-8 rounded-3xl'>
                    <label for="type">Type: </label>
                    <select className='w-1/2 px-4 border-slate-300 rounded-lg border h-10 mb-4 focus:shadow-md'  name="type" id = "type" value={type} onChange={(e) => setType(parseInt(e.target.value))}>
                        <option value="1">Crop</option>
                        <option value="2">Poultry</option>
                    </select>
                    <label for="stock"> Stock: </label>
                    <input className='w-1/2 p-4 border-slate-300 rounded-lg border h-10 mb-4 focus:shadow-md' type='number' id='stock' required value={stock} onChange={(e) => setStock(parseInt(e.target.value))}/>

                    <label for="price"> Price: </label>
                    <input className='w-1/2 p-4 border-slate-300 rounded-lg border h-10 mb-4 focus:shadow-md' type='number' id='price' required value={price} onChange={(e) => setPrice(parseFloat(e.target.value))}/>
                </div>
               
                
                <div className='bg-fttWhite shadow flex justify-end pr-32 pt-4 w-full pb-10'>
                 <button className='bg-fttGreen py-3 px-8 ml-4 rounded-full text-fttWhite transition hover:scale-105 hover:bg-green-900 ease-out duration-150' type='submit'>Confirm</button>
                 <Link  to={'/admin/inventory'}><button className='bg-ftt White py-3 px-8 border-fttGreen border ml-4 rounded-full text-fttGreen transition hover:scale-105 ease-out duration-150' type='submit'>Cancel</button></Link>
                </div>
            </form>
                
                 
        </div>
    )
    
}

export default EditProduct