import { Outlet,Link } from 'react-router-dom';
import { useState } from 'react';
import './design.css'

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
 function RootAdmin (){
  const [countPending, setCountPending] = useState(0);
  const [countCompleted, setCountCompleted] = useState(0);
  const [countListings, setCountListings] = useState(0);
  const [countUsers, setCountUsers] = useState(0)
    return (
    <div className='container-fluid'>
        <div id="header">
        <nav>
          <ul className="nav_link">
            <li className="nav_link"><Link className="link" to={'/admin'}>Dashboard</Link></li>
            <li className="nav_link"><Link className="link" to={`/admin/inventory`}>Inventory</Link></li>
            <li className="nav_link"><Link className="link" to={'/admin/active-orders'}>Orders</Link></li>
            <li className="nav_link"><Link className="link" to={`/admin/sales-report`}>Sales Report</Link></li>
            <li className="nav_link"><Link className="link" to={`/admin/active-accounts`}>User Account</Link></li>
          </ul>
        </nav>
        </div>
        <div>
        </div>
        <Outlet context={[setCountPending, setCountCompleted, setCountListings, setCountUsers, countPending, countCompleted, countListings, countUsers]} />
        
      </div>
    )
}

export default RootAdmin