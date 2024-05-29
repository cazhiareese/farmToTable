/**
 * This component fetches the user's orders based on their status (pending, confirmed, canceled)
 * and allows the user to cancel pending orders. It handles state management for order details and
 * dynamically updates the display based on user interactions.
 */

import { useEffect, useState } from 'react';
import { useParams, useOutletContext } from 'react-router-dom';
import { Link } from 'react-router-dom';
import cart from '../../icons/orders_cart.png';
import arrow from '../../icons/view_product_arrow.png';

function Order (){
    const token = localStorage.getItem('token');
    const [userId, count, setCount] = useOutletContext();
    // let userId = useParams();
    const [orderList, setOrders] = useState([]) 

    const [status, setStatus] = useState(0)

    const [orderDeets, setDisplay] = useState([])

    useEffect(() => {
        getUserOrders(0)
    }, [])

    function getUserOrders (status) {
        let url = `http://localhost:3001/getOrder/?status=${status}`
        fetch(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }})
            .then(response => response.json())
            .then(body => {
               setOrders(body)
               displayOrders(body)
        })   
    }

    const displayOrders = async (orders) =>{
        if (orders.length === 0){
            setDisplay([])
            return
        }

        const details = await Promise.all(orders.map(async (order) => {
            const orderSpecs = await Promise.all(order.productCheckedOut.map(async (added) => {
                const url = `http://localhost:3001/getProduct/${added.productId}`;
                const response = await fetch(url);
                const body = await response.json();
                return {
                    imageURL: body.imageURL,
                    productId: body._id,
                    name: body.name,
                    price: body.price,
                    qty: added.qty
                };
            }));
    
            return {
                orderId: order._id,
                status: order.status,
                orders: orderSpecs,
                price: order.price
            };
        }));

        setDisplay(details);
    }

    function handleCancel(orderId,statusChange) {
        fetch(`http://localhost:3001/updateOrder/${orderId}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({                   // authenticator dapat ang ipapasa ko ha
                    // customerId: userId,
                    status: statusChange
                })
            }).then(response => response.text())
            .then(body => {
                //console.log(body)
                getUserOrders(status)
        })
    }


 return (
        <div className='bg-fttBg flex flex-col items-center text-fttGreen font-Roboto min-h-screen'>
            <div className='w-3/4 bg-fttWhite shadow my-4 rounded-md mb-32'>
            <button className='group ml-12 mt-6 hover:shadow py-2 px-4 rounded-full'>
                <img className='ease-in-out delay-150 group-hover:-translate-x-1 inline-block h-4 mr-2' src={arrow}></img><Link className="link-to-home" to={'/'}>Back to Homepage</Link></button>
            <h1 className='font-black text-2xl my-6 ml-16 '><img className='inline-block w-10 mr-2' src={cart}></img>Your Orders</h1>

            <button className="active-btn w-28 mr-4 ml-12" id="pending-btn"  onClick={()=> {
                setStatus(0);
                getUserOrders(0);
                document.querySelector('.active-btn')?.classList.remove("active-btn");
                document.getElementById('pending-btn').classList.add("active-btn");
            }}>Pending</button>
            <button className=" w-28 mx-4" id="confirmed-btn" onClick={() => {
                setStatus(1);
                getUserOrders(1)
                document.querySelector('.active-btn')?.classList.remove("active-btn");
                document.getElementById('confirmed-btn').classList.add("active-btn");
                }}>Confirmed</button>
            <button className="w-28 mx-4 " id="canceled-btn" onClick={() => {setStatus(2);
                getUserOrders(2)
                document.querySelector('.active-btn')?.classList.remove("active-btn");
                document.getElementById('canceled-btn').classList.add("active-btn");
            }}>Canceled</button>
            <div className='border-t border-x-fttShadow flex flex-col items-center pb-6'>
                {
                    orderDeets.map((items)=>{
                        return(
                            <div key={items.orderId} className='border border-fttShadow w-2/4 p-6 shadow rounded-md my-4' >
                                <h5 className='text-sm'>Order Tracker: {items.orderId} </h5>
                                <h5 className='inline-block'>Order Total: <p className='font-semibold inline-block'>PHP {items.price}</p></h5>
                                {
                                items.orders.map((prod) =>{
                                    return(
                                        <div key={prod.productId} className='leading-tight my-4'>
                                        <img className="float-left w-20 mr-4 h-20 object-cover rounded" src = {prod.imageURL}></img> 
                                        <h3 className='font-medium'>{prod.name}</h3>     
                                        <p>Quantity: {prod.qty}</p>
                                        <p>Unit Price: {prod.price}</p>
                                        <p className='inline-block'>Total Item Price: <h1 className='inline-block font-medium'>{prod.price * prod.qty}</h1></p>
                                        </div>
                                    )
                                })
                                }
                                <div >{items.status !== 0 ? <div className='empty-div'></div>: <button className='hover:shadow-md  bg-fttGreen text-sm hover:bg-green-800 font-light text-fttWhite py-2 px-6 rounded-full flex items-center float-right' onClick={() => handleCancel(items.orderId, 2)}>Cancel Order</button>}</div>
                            </div>
                        );  
                    })
                }

            </div>
            
            </div>
        </div>
    )
}

export default Order