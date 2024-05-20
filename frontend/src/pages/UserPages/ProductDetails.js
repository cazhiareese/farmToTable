import { useEffect, useState } from 'react';
import { useParams, useOutletContext } from 'react-router-dom';
import cart from '../../icons/view_product_cart.png';
import stock from '../../icons/view_product_stock.png';
import ptype from '../../icons/view_product_type.png';
import arrow from '../../icons/view_product_arrow.png';
import { Link } from 'react-router-dom';

function ProductDetails (){
    let productId = useParams();
    const [userId, count, setCount] = useOutletContext();
    const [pushCart, setCart] = useState([]);
    const [totalItems, setVal] = useState(0);
    const [product, setProduct] = useState({})

    useEffect (() =>{
        let url = `http://localhost:3001/getProduct/${productId.id}`
        fetch(url)
            .then(response => response.json())
            .then(body => {
               setProduct(body)
               console.log(body)
            })  
            
    }, [])

    useEffect(() =>{
        fetchCart()
    }, [pushCart])

    useEffect(() =>{
        setCount(totalItems)
    }, [totalItems])

    function fetchCart (){
        let url = `http://localhost:3001/getCart/` + userId
        fetch(url)
            .then(response => response.json())
            .then(body => {
               setCart(body.cart)
               countItems(body.cart)
            })
        }

    function countItems(cart) {
        let newTotal = 0;
        cart.map((prod) => {
            newTotal += prod.qty;
        })
        setVal(newTotal)
    }

    function handleCartChange(cart){

        console.log(cart)
        fetch('http://localhost:3001/updateCart',
        {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            //   add tayo dito ng authenticator token
            },
            body: JSON.stringify({ 
                    // authenticator dapat ang ipapasa ko ha
                    userId: '6638db055b73b79302282273',
                    cart: cart

            })
        }).then(response => response.text())
                .then(body => {
                    console.log(body)
        })
    }

    function addToCart (prod)
    {       
        let i = 0;
        let found = false;
        for (let j = 0; j < pushCart.length; j++) {
            if (pushCart[j].productId === prod.productId) {
                found = true;
                i= j;
            break;
        }
        }       
        if (!found)
        {
            setCart( (pushCart) =>{
                const newCart = [...pushCart, {...prod, qty : 1}]
               
                handleCartChange(newCart)
                return newCart
            })

        }else
        {              
            setCart((pushCart) =>{
                const updateCart = [...pushCart];
                updateCart[i]  =  { ...updateCart[i], qty: updateCart[i].qty + 1}
                // console.log(updateCart)
                handleCartChange(updateCart)
                return updateCart
            })
        }

        
    }

    function handleType(type) {
        if (type === 1){
            return 'Crop'
        }else if (type === 2){
            return 'Poultry'
        }
    }

    return(
        <div className='bg-fttBg font-Roboto text-fttGreen flex flex-col items-center min-h-screen' >
            <div className='flex flex-col w-3/4 '>

                <button className='hover:shadow-md group bg-fttWhite border shadow text-sm  w-52 h-10 my-6 rounded-full'>
                <p className='inline-block'><img  className= 'ease-out delay-150 group-hover:-translate-x-1 inline-block h-4 mr-3' src={arrow}></img></p><Link className="link-to-home" to={'/'}>Back to Homepage</Link></button>

                <div className='w-full flex bg-fttWhite p-7 rounded-md shadow-md '>
                    <div><img className='object-cover mb-2 rounded-md h-96 w-96 float-left' src = {product.imageURL}></img></div>
                        <div className = 'flex pl-10 justify-center flex-col' >
                        <h1 className='text-2xl font-semibold'>{product.name}</h1>
                        <p className='text-3xl font-semibold'> PHP {product.price}</p>
                        <button className="transition ease-in-out duration-300 hover:bg-green-800 hover:shadow-lg  bg-fttGreen py-2 my-8 px-6 rounded-full flex items-center" onClick={()=> addToCart({productId : product._id})}>
                        <img className= "w-6 mr-2 inline-block" src={cart}></img><p className='text-fttWhite inline-block'>Add To Cart</p></button>
                        <p className='inline-block font-medium'><img className= "w-6 inline-block mr-2" src={stock}></img> Stock: {product.stock}</p>
                        <p className='inline-block font-medium'><img className= "w-6 inline-block mr-2" src={ptype}></img>Type: {handleType(product.type)}</p>
                        </div> 
                </div>
                
                <p className='mt-10 ml-3'>Product Description</p>
                <div className='mt-3 w-full flex bg-fttWhite p-7 rounded-y-md shadow-md border-t-fttGreen border-t-4 rounded-br-md rounded-bl-md mb-28'>
                <p>{product.description}</p>
                 </div> 

                
                 
            </div>
        </div>
    )
    
}

export default ProductDetails