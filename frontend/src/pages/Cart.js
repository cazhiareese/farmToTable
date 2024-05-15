import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Cart (){

    let userId = useParams();

    const [pushCart, setCart] = useState([]);
    const [totalItems, setVal] = useState(0);
    const [prodDeets, setDetails] = useState([]);
  
    useEffect(() => {    
        let url = `http://localhost:3001/getCart/${userId.id}`
        console.log(userId);
        console.log(typeof userId)
        fetch(url)
          .then(response => response.json())
          .then(body => {
            setCart(body.cart)
            console.log(body.cart)
        })

        
    },[])

    function handleCartChange(cart){
        fetch('http://localhost:3001/updateCart',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        //   add tayo dito ng authenticator token
        },
        body: JSON.stringify({ 
                // authenticator dapat ang ipapasa ko ha
                userId: userId.id,
            cart : cart
        })
      }).then(response => response.text())
            .then(body => {
                console.log(body)
      })
    }

    function removeFromCart (id){
        let i = 0
        for (let j = 0; j < pushCart.length; j++) {
            if (pushCart[j].id === id) {
                i = j              
                break;
            }
        }

        setCart((currentCart) =>{
            const updateCart = [...currentCart];
            updateCart.splice(i, 1)
            countItems(updateCart)
            handleCartChange(updateCart)
            return updateCart
        })
    }

    // handles quantity depending on increment or decrement chosen by user
    function handleQuantity(id, num){
        let i = 0
        for (let j = 0; j < pushCart.length; j++) {
            if (pushCart[j].id === id) {
                i = j
                break;
            }
        }

        setCart((currentCart) =>{
            const updateCart = [...currentCart];
            updateCart[i]  =  { ...updateCart[i], qty: updateCart[i].qty + num};
            if (updateCart[i].qty === 0){
                removeFromCart(updateCart[i].id)
            }
            countItems(updateCart)
            handleCartChange(updateCart)
            return updateCart
        })
    }


    function countItems(cart){
        console.log(cart)
        let newTotal = 0;
        cart.map((prod) =>{
            newTotal += prod.qty;
        })
        setVal(newTotal)
    }

    function getProduct(id){
        const productId = id
        let url = 'http://localhost:3001/getProduct/'+productId
        fetch(url).then(response => response.json())
        .then(body => {
          setDetails((prodDeets) => 
            {
                const newDetails = [...prodDeets, {id: body._id, name: body.name, price: body.price}]
                console.log(newDetails)
                return newDetails
            }
          )
          
      })

      console.log(prodDeets)

    }

    return(
        <div className='cart-page'>
            <h1>Shopping Cart (Total Items : {totalItems})</h1>

            <div className="cart-items">

           
            {
            pushCart.map((prod)=> {
                return(
                    <div key={prod.id} className="added-product">

                        {/* {getProduct(prod.productId)} */}

                        {prodDeets.map(product => (
                            <div key={product.id}>
                            <h3>{product.name}</h3>
                            <p>Price: {product.price}</p>
                            </div>
                        ))}
                        {/* Handle quantity depending on button clicked by user */}
                        <div className="cart-qty">
                        <button onClick={()=>handleQuantity(prod.id,-1)}>-</button>
                        <p>Qty: {prod.qty} </p>
                
                        <button onClick={()=> handleQuantity(prod.id,1)}>+</button>
                        </div>
                        {/* Remove an item regardless of quantity */}
                        <div className="remove">
                        <button onClick={() => removeFromCart(prod.id)}>Remove From Cart</button>
                        </div>
                    </div>
                )
            })
            }
            </div>
        </div>
    )

}

export default Cart