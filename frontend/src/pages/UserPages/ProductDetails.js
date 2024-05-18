import { useEffect, useState } from 'react';
import { useParams, useOutletContext } from 'react-router-dom';
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
        <div className='details-container'>
            <button><Link className="link-to-home" to={'/'}>Back to Homepage</Link></button>
            <div className='upper-details'>
                <img className='indiv-image' src = {product.imageURL}></img>
                <h1>{product.name}</h1>
                <p>Stock: {product.stock}</p>
                <p>Type: {handleType(product.type)}</p>
                <button onClick={()=> addToCart({productId : product._id})} className="add_cart_button_indiv">Add To Cart</button>
            </div>

            <div className='description-container'>
                <p>{product.description}</p>
            </div>
        </div>
    )
    
}

export default ProductDetails