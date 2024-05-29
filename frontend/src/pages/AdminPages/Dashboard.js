/**
 * This admin dashboard displays various metrics and provides links to different sections of the admin interface.
 */

import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router';
import {Link} from 'react-router-dom';
import dash from '../../images/dashboard.png';
import create from '../../icons/dashboard/d_create_listing.png';
import sold from '../../icons/dashboard/d_products_sold.png';
import order from '../../icons/dashboard/d_orders.png';
import inventory from '../../icons/dashboard/d_listings.png';
import users from '../../icons/dashboard/d_registered_users.png';
import report from '../../icons/dashboard/d_sales_report.png';

export default function Dashboard (){

    const [selectedPeriod, setPeriod] = useState('weekly');
    const [countListings, setListingCount] = useState(0);
    const [countUsers, setUserCount] = useState(0);
    const [countCompleted, setCountCompleted] = useState(0)
    const [countPending, setCountPending] = useState(0)
    const [salesReport, setReport] = useState([]);
    const [totalSales, setTotalSales] = useState(0)
    const [totalProduct, setTotalProduct] = useState(0)
    useEffect(() =>{
        handleOptionChange(selectedPeriod)
        fetchOrderCount(0)
        fetchOrderCount(1)
        fetch('http://localhost:3001/countListings')
            .then(response => response.json())
            .then(body =>{
                setListingCount(body.count)
            })

        fetch('http://localhost:3001/countUsers')
        .then(response => response.json())
        .then(body =>{
            setUserCount(body.count)
        })
        
        
    }, [])

    function fetchOrderCount(status){
        fetch(`http://localhost:3001/countOrder?status=${status}`)
        .then(response => response.json())
        .then(body =>{
            if (status === 0){
                setCountPending(body.count)
            }else if (status === 1){
                setCountCompleted(body.count)
            }
        })
    }

    function handleOptionChange(period) {
        let url = 'http://localhost:3001/salesreport?period='+period
        fetch(url)
          .then(response => response.json())
          .then(body => {
            setReport(body)
            handleTotalSales(body)
            
        })

    }

    function handleTotalSales (report) {
        let newTotal = 0
        let productSold = 0
        report.map((prod) => {
            newTotal += prod.totalSales;
            productSold += prod.totalQty
        })
        setTotalSales(newTotal)
        setTotalProduct(productSold)
        
    }

    return(
        <div className="bg-fttBg w-full h-screen font-Roboto text-fttGreen ">
            <div className='mx-auto w-4/5 mt-8 '>
            <div className='flex justify-between'>
                <img className='object-contain' src={dash}></img>
                <div className="period-selector">
                    <select className='inline text bg-fttBg py-3 px-4 rounded-3xl border border-fttGreen' value={selectedPeriod}
                                        onChange={e => {
                                            setPeriod(e.target.value)
                                            handleOptionChange(e.target.value)
                                        }}>
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                            <option value="annual">Annual</option>
                    </select>
                </div>
            </div>


            <div className='flex flex-col w-full mt-12'>

                <div className='flex w-full mb-10 justify-evenly h-40'> 
                    <div className='bg-fttWhite text-fttGreen w-4/5 h-full shadow flex m-1 items-center justify-center rounded-xl'>
                    <Link to='/admin/active-orders'><img className=' h-10 mr-3 float-left' src={sold}></img>
                        <div className='float-right text-center' ><h1 className=' font-bold text-3xl'>{totalProduct}</h1>
                        <h3 className=' text-lg block'>Products Sold</h3>
                            </div></Link>
                    </div>

                    <div className='bg-fttGreen text-fttWhite w-full h-full shadow flex m-1 flex-col items-center justify-center rounded-xl'>
                    <Link to='/admin/sales-report'><h1 className='font-bold text-3xl'>PHP {new Intl.NumberFormat().format(totalSales)}</h1>
                        <h3 className='block text-lg'>Total Sales</h3></Link>
                    </div>
                </div>
                
                <div className='flex'>
                    <div className='w-2/4 border bg-fttWhite px-10 py-4 m-1 justify-center rounded-3xl '><Link to='/admin/active-orders'>
                        <div className='flex w-full justify-between group'>
                        <h1 className='text-lg my-auto font-medium'><img className='inline-block mr-3' src={order}></img>Orders</h1>
                        <button> 
                            <svg className='fill-fttGreen w-8 ease-out group-hover:translate-x-1 ' stroke="currentColor" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M30 18L31.4142 16.5858L32.8284 18L31.4142 19.4142L30 18ZM7.5 20C6.39543 20 5.5 19.1046 5.5 18C5.5 16.8954 6.39543 16 7.5 16V20ZM22.4142 7.58579L31.4142 16.5858L28.5858 19.4142L19.5858 10.4142L22.4142 7.58579ZM31.4142 19.4142L22.4142 28.4142L19.5858 25.5858L28.5858 16.5858L31.4142 19.4142ZM30 20H7.5V16H30V20Z"/>
                            </svg></button></div>
                        <div className='mx-12'>
                             <p >Pending:{countPending}</p>
                             <p>Completed: {countCompleted}</p></div>
                        </Link>
                    </div>

                    <div className='w-2/4 border bg-fttWhite px-10 py-4 m-1 justify-center rounded-3xl '><Link to='/admin/inventory'>
                       <div className='flex w-full justify-between group'>
                       <h1 className='text-lg my-auto font-medium'><img className='inline-block mr-3' src={inventory}></img>Listings</h1>
                       <button> 
                           <svg className='fill-fttGreen w-8 ease-out group-hover:translate-x-1 ' stroke="currentColor" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                           <path d="M30 18L31.4142 16.5858L32.8284 18L31.4142 19.4142L30 18ZM7.5 20C6.39543 20 5.5 19.1046 5.5 18C5.5 16.8954 6.39543 16 7.5 16V20ZM22.4142 7.58579L31.4142 16.5858L28.5858 19.4142L19.5858 10.4142L22.4142 7.58579ZM31.4142 19.4142L22.4142 28.4142L19.5858 25.5858L28.5858 16.5858L31.4142 19.4142ZM30 20H7.5V16H30V20Z"/>
                           </svg></button></div>
                            <p className='mx-12'>Active: {countListings}</p> </Link>
                            <Link to='/admin/create-listing'><button className='bg-fttGreen float-right hover:bg-green-800 hover:shadow-md text-fttWhite text-sm rounded-full py-2 px-4'>Create a listing</button></Link>
                   </div>

                </div> 
                <div className='flex'>
                <div className='w-2/4 border bg-fttWhite px-10 py-4 m-1 justify-center rounded-3xl '><Link to='/admin/active-accounts'>
                       <div className='flex w-full justify-between group'>
                       <h1 className='text-lg my-auto font-medium'><img className='inline-block mr-3' src={users}></img>Registered Users</h1>
                       <button> 
                           <svg className='fill-fttGreen w-8 ease-out group-hover:translate-x-1 ' stroke="currentColor" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                           <path d="M30 18L31.4142 16.5858L32.8284 18L31.4142 19.4142L30 18ZM7.5 20C6.39543 20 5.5 19.1046 5.5 18C5.5 16.8954 6.39543 16 7.5 16V20ZM22.4142 7.58579L31.4142 16.5858L28.5858 19.4142L19.5858 10.4142L22.4142 7.58579ZM31.4142 19.4142L22.4142 28.4142L19.5858 25.5858L28.5858 16.5858L31.4142 19.4142ZM30 20H7.5V16H30V20Z"/>
                           </svg></button></div>
                            <p className='ml-20 font-bold text-xl'>{countUsers}</p> </Link>
                   </div>

                   <div className='w-2/4 border bg-fttWhite px-10 py-4 m-1 justify-center rounded-3xl '><Link to='/admin/sales-report'>
                       <div className='flex w-full justify-between group'>
                       <h1 className='text-lg my-auto font-medium'><img className='inline-block mr-3' src={report}></img>View Sales Report</h1>
                       <button> 
                           <svg className='fill-fttGreen w-8 ease-out group-hover:translate-x-1 ' stroke="currentColor" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                           <path d="M30 18L31.4142 16.5858L32.8284 18L31.4142 19.4142L30 18ZM7.5 20C6.39543 20 5.5 19.1046 5.5 18C5.5 16.8954 6.39543 16 7.5 16V20ZM22.4142 7.58579L31.4142 16.5858L28.5858 19.4142L19.5858 10.4142L22.4142 7.58579ZM31.4142 19.4142L22.4142 28.4142L19.5858 25.5858L28.5858 16.5858L31.4142 19.4142ZM30 20H7.5V16H30V20Z"/>
                           </svg></button></div> </Link>
                   </div>
                </div>    
            </div>
            
            </div>

           
            
            
            </div>
    )
}