import { useParams, useOutletContext } from 'react-router-dom';
import { useEffect, useState } from 'react';

import CheckOutForm from '../../components/checkOutForm';
import { Link } from 'react-router-dom';

function Cart({updateTotalItems}) {

    // let userId = useParams();

    const [userId, count, setCount] = useOutletContext();
    const [pushCart, setCart] = useState([]);
    const [totalItems, setVal] = useState(0);
    const [selectedList, setSelected] = useState([])

    const [newCart, setNew] = useState([])

    useEffect(() => {
        let url = `http://localhost:3001/getCart/${userId}`
        fetch(url)
            .then(response => response.json())
            .then(body => {
               setCart(body.cart)
                countItems(body.cart)
            })  
            
    }, [])

    useEffect(() =>{
        setCount(totalItems)
    }, [totalItems])

    useEffect(() => {
        handleNew(pushCart);
    }, [pushCart])
 

    function handleNew(cartChange){
        Promise.all(cartChange.map(added => {
            let url = `http://localhost:3001/getProduct/${added.productId}`;
            return fetch(url)
                .then(response => response.json())
                .then(body => ({
                    imageURL: body.imageURL,
                    productId: body._id,
                    name: body.name,
                    price: body.price,
                    qty: added.qty
                }));
        })).then(updatedCart => {
            setNew(updatedCart);    
        });
    }

    function handleCartChange(cart) {
        fetch('http://localhost:3001/updateCart',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                    //   add tayo dito ng authenticator token
                },
                body: JSON.stringify({                   // authenticator dapat ang ipapasa ko ha
                    userId: userId,
                    cart: cart
                })
            }).then(response => response.text())
            .then(body => {
                console.log(body)

            })
    }

    function removeFromCart(id) {
        let i = 0
        for (let j = 0; j < pushCart.length; j++) {
            if (pushCart[j].productId === id) {
                i = j
                break;
            }
        }
        setCart((currentCart) => {
            const updateCart = [...currentCart];

            for (let x = 0; x < selectedList.length; x++){
                if (updateCart[i].productId === selectedList[x].productId){
                    const selectedRemove = [...selectedList];
                    selectedRemove.splice(x,1)
                    setSelected(selectedRemove)
                }
            }
            updateCart.splice(i, 1)
            countItems(updateCart)
            handleCartChange(updateCart)
            handleNew(updateCart)
            return updateCart
        })
    }

    function handleQuantity(id, num) {
        
        let i = 0
        for (let j = 0; j < pushCart.length; j++) {
            if (pushCart[j].productId === id) {
                i = j
                break;
            }
        }

        setCart((currentCart) => {
            let updateCart = [...currentCart];
            let gotRemoved = false;
            updateCart[i] = { ...updateCart[i], qty: updateCart[i].qty + num };


            
            if (updateCart[i].qty === 0) {    
                for (let x = 0; x<selectedList.length; x++){
                    if(updateCart[i].productId === selectedList[x].productId){
                        let selectRemove = [...selectedList]
                        selectRemove = selectRemove.filter((item) => item.productId !== updateCart[i].productId)
                        setSelected(selectRemove)
                    }
                }
                updateCart = updateCart.filter((item, index) => index !== i);
                gotRemoved = true
            }
           
            if (!gotRemoved){
            for (let x = 0; x<selectedList.length; x++){
                if(updateCart[i].productId === selectedList[x].productId){
                    handleSelectChange(x, updateCart[i])
                    break   
                }
            }}

            countItems(updateCart)
            handleNew(updateCart)
            handleCartChange(updateCart)
            return updateCart
        })
    }

    function handleSelectChange(x, itemUpdated){
        console.log('enterThis?')
        let updateSelect = [...selectedList]
        let updator = {}
        for (let j = 0; j<newCart.length; j++){
            if(newCart[j].productId === itemUpdated.productId){
                console.log(newCart[j].productId)
                updator = {...newCart[j], qty: itemUpdated.qty}
                console.log(updator)
            }
        }

        updateSelect[x] = {...updateSelect[x], qty : updator.qty}
        setSelected(updateSelect)
    }

    function countItems(cart) {
        let newTotal = 0;
        cart.map((prod) => {
            newTotal += prod.qty;
        })
        setVal(newTotal)
    }

    const handleSelect = (event) => {
        const { value, checked } = event.target;
        
        console.log(value)
        if (checked) {
          let checkedObject = {}

        newCart.forEach((prod) => {
            if (prod.productId === value){
                checkedObject = prod
            }
        })
        console.log(checkedObject)
            
          setSelected([...selectedList, checkedObject]);
        } else {
          
          setSelected(selectedList.filter(item => item.productId !== value));
        }
      }

    function handlePrice (price, qty){
        return (price * qty)
    }

    return (
        <div className='render-this'>
        { totalItems !== 0 ?
        <div className='cart-page'>
            <div className='cart-container'>

                
            <h1>Shopping Cart (Total Items : {totalItems})</h1>

            <div className="cart-items">
            {
            newCart.map((prod)=> {
                return(
                    <div key={prod.productId} className="added-product">
                        {/* pa-uncomment nalang di ko ma-style eh basta ayan haha */}
                        {/* <img src = {prod.imageURL}></img>  */}
                        <input type='checkbox' 
                        onChange={handleSelect}
                         value={prod.productId} ></input>


                        <div className="cart-name">
                        <h2>{prod.name}</h2>
                        </div>

                        <div className="cart-price">
                        <p>&#8369; {prod.price}</p>
                        </div>
                        {/* Handle quantity depending on button clicked by user */}
                        <div className="cart-qty">
                        <button onClick={()=>handleQuantity(prod.productId,-1)}>-</button>
                        <p>Qty: {prod.qty} </p>
                
                        <button onClick={()=> handleQuantity(prod.productId,1)}>+</button>
                        </div>

                        <p>Total Price:{handlePrice(prod.price, prod.qty)}</p>
                        {/* Remove an item regardless of quantity */}
                        <div className="remove">
                        <button onClick={() => removeFromCart(prod.productId)}>Remove From Cart</button>
                        </div>
                    </div>
                )
            })
            }
            </div>
            <button><Link className="link-to-home" to={'/'}>Back to Homepage</Link></button>


            </div>

            <div className= "checkOut-container">
                <CheckOutForm list_selected={selectedList} state_selected={setSelected} cart={pushCart} cart_state = {setCart} setVal = {setVal} userId ={userId}/>
            </div> 

            
            
        </div> : <div className='empty-cart'> <h1>Empty Cart! Shop more!</h1></div>

        }

        </div>
    )

}

export default Cart