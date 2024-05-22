/**
 * Contains a React component for managing active orders. 
 * It fetches order data from the server based on their status (pending, confirmed, or canceled), 
 * displays the orders along with customer details, and allows the admin to change the status of orders.
 */

import { useEffect, useState } from 'react';
import { useParams, useOutletContext } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function ActiveOrders(){
   
    const [orderList, setOrders] = useState([]) 
    const [countCompleted, setCountCompleted] = useState(0)
    const [countPending, setCountPending] = useState(0)
    const [countCanceled, setCountCanceled] = useState(0)
    const [status, setStatus] = useState(0)

    const [orderDeets, setDisplay] = useState([])

    useEffect(() => {
        getUserOrders(status)
        // fetchOrderCount(status)
    }, [])

    useEffect(() =>{
        fetchOrderCount(status)
    }, [status])


    function fetchOrderCount(status){
        fetch(`http://localhost:3001/countOrder?status=${status}`)
        .then(response => response.json())
        .then(body =>{
            if (status === 0){
                setCountPending(body.count)
            }else if (status === 1){
                setCountCompleted(body.count)
            }else if (status === 2){
                setCountCanceled(body.count)
            }
        })
    }

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
        async function getOrderDetails(orders) {
            const details = [];
            for (const order of orders) {
                const orderSpecs = [];   
                for (const added of order.productCheckedOut) {
                    const url = `http://localhost:3001/getProduct/${added.productId}`;
                    const response = await fetch(url);
                    const body = await response.json();
                    orderSpecs.push({
                        imageURL: body.imageURL,
                        productId: body._id,
                        name: body.name,
                        price: body.price,
                        stock: body.stock,
                        qty: added.qty
                    });
                }
        
                details.push({
                        orderId: order._id,
                        customer: order.customerId,
                        status: order.status,
                        orders: orderSpecs,
                        price: order.price
                        });
            } 
            return details;
          }

          const details = await getOrderDetails(orders);

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
            if (statusChange === 1) {
                console.log(order)
                handleStockChange(order)
            }else{
                getUserOrders(status)
                fetchOrderCount(status)
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
                fetchOrderCount(status)
            })
        }))
        
    }

    return (
        <div className='bg-fttBg flex flex-col items-center w-full text-fttGreen font-Roboto min-h-screen'>
            <div className=' w-full h-full rounded-md'>
            <div className="mb-10 flex border-b border-fttGreen justify-center flex-col h-28">
                <h1 className=' ml-12 text-4xl font-medium mb-2'>Orders</h1>
            </div>

            <button className="active-btn w-28 mr-4 ml-12" id="pending-btn"  onClick={()=> {
                setStatus(0);
                getUserOrders(0);
                document.querySelector('.active-btn')?.classList.remove("active-btn");
                document.getElementById('pending-btn').classList.add("active-btn");
            }}>Pending {status === 0 && countPending}</button>
            <button className=" w-28 mx-4" id="confirmed-btn" onClick={() => {
                setStatus(1);
                getUserOrders(1)
                document.querySelector('.active-btn')?.classList.remove("active-btn");
                document.getElementById('confirmed-btn').classList.add("active-btn");
                }}>Confirmed {status === 1 && countCompleted}</button>
            <button className="w-28 mx-4 " id="canceled-btn" onClick={() => {setStatus(2);
                getUserOrders(2)
                document.querySelector('.active-btn')?.classList.remove("active-btn");
                document.getElementById('canceled-btn').classList.add("active-btn");
            }}>Canceled {status === 2 && countCanceled}</button>

            <div className='border-t border-slate-300 flex flex-col items-center pb-6'>

            {
                orderDeets.map((items)=>{
                    return(
                        <div key={items.orderId} className='border border-gray-300 w-2/4 p-6 shadow rounded-md my-4' >
                            <h5 className='text-sm'>Order Tracker: {items.orderId}</h5>
                            <h6 className=' font-medium'>Customer Name: {items.customerFirstName} {items.customerLastName}</h6>
                            {
                               items.orders.map((prod) =>{
                                return(
                                    <div key={prod.productId} className='leading-tight my-4'>
                                    <img className="float-left w-20 mr-4 h-20 object-cover rounded" src = {prod.imageURL}></img> 
                                    <h3 className=' font-medium'>{prod.name}</h3>
                                    <p>Count: {prod.qty}</p>
                                    <p>Unit Price: PHP {prod.price}</p>
                                    <p className=' font-medium'>Total Item Price: PHP {prod.price * prod.qty}</p>
                                    </div>
                                )
                               })
                            }

                            <p className=' font-bold'>Order Total: PHP {items.price}</p>
                            <div className='cancel-button'>{items.status !== 0 ? <div className='empty-div'></div>: <button className='hover:shadow-md  bg-fttGreen text-sm hover:bg-green-800 font-light text-fttWhite py-2 px-6 rounded-full flex items-center float-right' onClick={() => handleStatusChange(items, 2)}>Cancel Order</button>}</div>
                            <div className='confirm-button'>{items.status !== 0 ? <div className='empty-div'></div>: <button className='hover:shadow-md mr-1 bg-fttGreen text-sm hover:bg-green-800 font-light text-fttWhite py-2 px-6 rounded-full flex items-center float-right' onClick={() => handleStatusChange(items, 1)}>Confirm Order</button>}</div>
                            </div>
                    );    
                })

            }

            </div>
            
            </div>
        </div>
    )
    
}