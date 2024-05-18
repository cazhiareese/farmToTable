import { useEffect, useState } from "react";


function CheckOutForm(props){

    const selectedList = props.list_selected;
    const setSelected = props.state_selected;
    const userId = props.userId
    const pushCart = props.cart;
    const setCart = props.cart_state;
    const setValCart = props.setVal;

    const [totalItemsSelected, setValSelected] = useState(0);
    const[totalPrice, setTotal] = useState(0);


    useEffect (()=> {countItemsSelected(selectedList)
            handleTotalPrice(selectedList)
    })

    // handle individual price of each item selected
    function handlePrice (price, qty){
        return (price * qty)
    }

    // handle total order price of items selected for checkout
    function handleTotalPrice(selected){
        let total = 0
        selected.map((item) => {
            total += (item.qty * item.price)
        })

        setTotal(total)
    }
    
    // how many items are selected (issued for check out)
    function countItemsSelected(cart) {
        let newTotal = 0;
        cart.map(() => {
            newTotal += 1
        })
        setValSelected(newTotal)
    }

    // checkout when user clicks submit
    const handleCheckout= async (e) => {
        e.preventDefault()
        let updatePushCart = [...pushCart]

            const response = await
                fetch('http://localhost:3001/addOrder',
                {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                //   add tayo dito ng authenticator token
                },
                body: JSON.stringify({ 
                        productCheckedOut: pushCart.filter(item => selectedList.some(selected => selected.productId === item.productId)),
                        customerId: '6638db055b73b79302282273',
                        price: totalPrice

                })
                });

        const body = await response.text()
        console.log(body)   
        

        const updateCartResponse = await fetch(`http://localhost:3001/updateCart/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                // Add authenticator token if needed
            },
            body: JSON.stringify({
                userId: userId,
                cart: pushCart.filter(item => !selectedList.some(selected => selected.productId === item.productId))
            })
        });

        const cartChangeResponse = await updateCartResponse.text()
        console.log(cartChangeResponse)
        
        updatePushCart = pushCart.filter(item => !selectedList.some(selected => selected.productId === item.productId))
        setCart(updatePushCart);
        countItems(updatePushCart)
        setSelected([]);  
    }

    // handles count when item gets removed from cart due to checkout
    function countItems(cart) {
        let newTotal = 0;
        cart.map((prod) => {
            newTotal += prod.qty;
        })
        setValCart(newTotal)
    }
    // render
    return (
        <div className="checkout-details">
            <h1>Check out</h1>
            <p>(Total Items: {totalItemsSelected})</p>

        {
            selectedList.map((item) =>{
                return(
                    <div key= {item.productId} className="added-cards">
                        <h2>{item.name}</h2>
                        <p>Unit Price: {item.price}</p>
                        <p>Count: {item.qty}</p>
                        <p>Total Price:{handlePrice(item.price, item.qty)}</p>
                    </div>
                )
            })
        }

           
            <div className="for-CheckOut">
                <h3>Overall Price: {totalPrice}</h3>
                <form onSubmit={handleCheckout}>
                    <button disabled={selectedList.length === 0} type="submit">Proceed to checkout</button>
                </form>
            </div> 


        </div>
    )
}

export default CheckOutForm

