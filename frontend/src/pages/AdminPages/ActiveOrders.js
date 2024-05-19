import { useEffect, useState } from 'react';
import { useParams, useOutletContext } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function ActiveOrders(){
   
    const [orderList, setOrders] = useState([]) 

    const [status, setStatus] = useState(0)

    const [orderDeets, setDisplay] = useState([])

    useEffect(() => {
        getUserOrders(status)
    }, [])

    function getUserOrders (status) {
        let url = `http://localhost:3001/orders/?status=${status}`
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
                    stock: body.stock,
                    qty: added.qty
                };
            }));
    
            return {
                orderId: order._id,
                customer: order.customerId,
                status: order.status,
                orders: orderSpecs,
                price: order.price
            };
        }));

        // setDisplay(details)
        setCustomerName(details);
    }

    const setCustomerName  = async (details) =>{
        if (details.length === 0){
            setDisplay([])
            return
        }

        const moreDetails = await Promise.all(details.map(async (general) => {
            const url = `http://localhost:3001/customer/${general.customer}`;
            const customerDetails = await fetch(url);
            const body = await customerDetails.json()
            return {
                orderId: general.orderId,
                customer: general.customer,
                status: general.status,
                orders: general.orders,
                price: general.price,
                customerFirstName: body.firstName,
                customerLastName: body.lastName
            }
        }));
        console.log(moreDetails)
        setDisplay(moreDetails)
    }


    function handleStatusChange(order, statusChange) {
        
        fetch(`http://localhost:3001/updateOrder/${order.orderId}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                    //   add tayo dito ng authenticator token
                },
                body: JSON.stringify({                   // authenticator dapat ang ipapasa ko ha
                    status: statusChange
                })
            }).then(response => response.text())
            .then(body => {
                console.log(body)
                
        }).then(() => {
            console.log('here?')
            if (statusChange === 1) {
                console.log(order)
                handleStockChange(order)
            }else{
                getUserOrders(status)
            }
        })
    }

    const handleStockChange = (order) =>{
        Promise.all(order.orders.map(async (edit) => {
        return fetch(`http://localhost:3001/edit-stock/${edit.productId}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                    
                },
                body: JSON.stringify({                   
                    stock : edit.stock - edit.qty
                })}).then(response => response.text())
                .then(body => {
                console.log(body)
                getUserOrders(status)
            })
        }))
        
    }

    return (
        <div className='orders-container'>
            <h1>Orders</h1>

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
                            <h6>Customer Name: {items.customerFirstName} {items.customerLastName}</h6>
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
                            <div className='cancel-button'>{items.status === 2 ? <div className='empty-div'></div>: <button onClick={() => handleStatusChange(items, 2)}>Cancel Order</button>}</div>
                            <div className='confirm-button'>{items.status !== 0 ? <div className='empty-div'></div>: <button onClick={() => handleStatusChange(items, 1)}>Confirm Order</button>}</div>
                            </div>
                    );    
                })

            }

        </div>
    )
    
}