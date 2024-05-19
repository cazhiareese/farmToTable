import { Outlet,Link } from 'react-router-dom';
import '../../Styling/design.css';
 function RootAdmin (){

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
        <Outlet  />
        
      </div>
    )
}

export default RootAdmin