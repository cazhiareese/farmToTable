import { useEffect, useState } from "react";
import summary from '../images/cart_summary.png';

function CheckOutForm(props){
    const token = props.token
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
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ 
                        productCheckedOut: pushCart.filter(item => selectedList.some(selected => selected.productId === item.productId)),
                        // customerId: '6638db055b73b79302282273',
                        price: totalPrice

                })
                });

        const body = await response.text()
        console.log(body)   
        

        const updateCartResponse = await fetch(`http://localhost:3001/updateCart/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                // userId: userId,
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
        <div className="w-full h-full flex flex-col justify-center items-center rounded-md  text-fttGreen font-Roboto">
            <img className="h-10" src={summary}></img>
            { totalItemsSelected !== 1 ? <p className="pl-12 mt-10 self-start">Selected {totalItemsSelected} items</p> 
            : <p className="pl-12 mt-10 self-start">Selected 1 item</p> }
            
            <div className="border-t w-3/4 flex flex-col justify-between ">
            {
                selectedList.map((item) =>{
                    return(
                        <div key= {item.productId} className=" flex flex-col px-4 py-2">
                            <div className="flex justify-between "> 
                            <h2 className=" inline-block font-medium">{item.name}</h2>
                            <p className="inline-block">PHP {item.price}</p>
                            <p>Qty: {item.qty}</p></div>
                            <p className="font-medium">Subtotal: PHP {handlePrice(item.price, item.qty)}</p>
                        </div>
                        
                    )
                })
            }
            </div>

           
            <div className="border-t w-3/4 flex flex-col max-h-fit" >
                <div className="flex justify-between">
                    <h3 className="font-black text-lg mt-4">TOTAL</h3> <h3 className="font-black text-lg mt-4">PHP {totalPrice}</h3>
                </div>
                <form onSubmit={handleCheckout}>
                    <button className = " w-full rounded-full py-4 text-sm hover:shadow-lg hover:bg-green-800 my-4 text-fttWhite bg-fttGreen" disabled={selectedList.length === 0} type="submit">Proceed to checkout</button>
                </form>
            </div> 


        </div>
    )
}

export default CheckOutForm

