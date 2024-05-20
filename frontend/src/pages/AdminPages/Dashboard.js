
import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router';
import {Link} from 'react-router-dom';
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
        <div className='dash-board-container'>
            <h1>Dashboard</h1>
            <div className="period-selector">
                <select value={selectedPeriod}
                                    onChange={e => {
                                        setPeriod(e.target.value)
                                        handleOptionChange(e.target.value)
                                    }}>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="annual">Annual</option>
                </select>
            </div>

            <div className='total-product'>
                <h1>{totalProduct}</h1>
                <h3>Total Products Sold</h3>

            </div>

            <div className='total-sales'>
                <h1>PHP {totalSales}</h1>
                <h3>Total Sales</h3>
            </div>

            <div className='Orders'>
                <Link to='/admin/active-orders'><button>Go to Orders</button></Link>
                <h1>Orders</h1>
                <p>Pending: {countPending}</p>
                <p>Completed: {countCompleted}</p>
            </div>

            <div className='listings'>
                <Link to='/admin/inventory'><button>Go to Inventory</button></Link>
                <h1>Listings</h1>
                <p>Active</p>
                <p>{countListings}</p>
                <Link to='/admin/create-listing'><button>Create a Listing</button></Link>
            </div>

            <div className='listings'>
                <Link to='/admin/active-accounts'><button>Go to Users</button></Link>
                <h1>Registered Users</h1>
                <h3>{countUsers}</h3>
            </div>

            <div className='listings'>
                <Link to='/admin/sales-report'><button>Go to Sales Report</button></Link>
                <h1>View Sales Report</h1>              
            </div>

        </div>
    )
}