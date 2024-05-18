import { useEffect, useState } from 'react';
import { useParams, useOutletContext } from 'react-router-dom';
import { Link } from 'react-router-dom';
function Order (){

    const [userId, count, setCount] = useOutletContext();
    // let userId = useParams();
    const [orderList, setOrders] = useState([]) 

    const [status, setStatus] = useState(0)

    const [orderDeets, setDisplay] = useState([])

    useEffect(() => {
        getUserOrders(0)
    }, [])


    function getUserOrders (status) {
        let url = `http://localhost:3001/getOrder/${userId}/?status=${status}`
        fetch(url)
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
                    'Content-Type': 'application/json'
                    //   add tayo dito ng authenticator token
                },
                body: JSON.stringify({                   // authenticator dapat ang ipapasa ko ha
                    customerId: userId,
                    status: statusChange
                })
            }).then(response => response.text())
            .then(body => {
                console.log(body)
                getUserOrders(status)
        })
    }


 return (
        <div className='orders-container'>
            <button><Link className="link-to-home" to={'/'}>Back to Homepage</Link></button>
            <h1>Your Orders</h1>

            <button onClick={()=> {
                setStatus(0);
                getUserOrders(0)
            }}>Pending</button>
            <button onClick={() => {
                setStatus(1);
                getUserOrders(1)
                }}>Confirmed</button>
            <button onClick={() => {setStatus(2);
                getUserOrders(2)
            }}>Canceled</button>

            {

                orderDeets.map((items)=>{
                    return(
                        <div key={items.orderId} className='indiv-orders'>
                            <h5>Order Tracker: {items.orderId}</h5>
                            {
                               items.orders.map((prod) =>{
                                return(
                                    <div key={prod.productId} className='details'>
                                    {/* <img src = {prod.imageURL}></img>  */}
                                    <h3>{prod.name}</h3>
                                    <p>Count: {prod.qty}</p>
                                    <p>Unit Price: {prod.price}</p>
                                    <p>Total Item Price: {prod.price * prod.qty}</p>
                                    </div>
                                )
                               })
                            }

                            <h5>Total Order Price: {items.price}</h5>

                            <div className='cancel-button'>{items.status !== 0 ? <div className='empty-div'></div>: <button onClick={() => handleCancel(items.orderId, 2)}>Cancel Order</button>}</div>
                        </div>
                    );

                    
                })

            }

        </div>
    )
    
}

export default Order