import { Outlet,Link } from 'react-router-dom';
import { useState } from 'react';
import '../../Styling/design.css';
import cart from '../../icons/header_cart.png';
import logo from '../../images/ftt_logo.png';
import footerimg from '../../images/footer_pic.png';

export default function Root() {

  const userId= "6638db055b73b79302282273";

  const [count, setCount] = useState(0);


    return (
      <div className='container-fluid'>
        <div id="header">
        <img src={logo} id='logo'></img>
        <nav>
          <ul className="nav_link">
            <li className="nav_link"><Link className="link" to={'/'}>Homepage</Link></li>
            <li className="nav_link"><Link className="link" to={`/orders/${userId}`}>Orders</Link></li>
            <li className="nav_link"><Link className="link" to={'/about-us'}>About</Link></li>
            <li className="nav_link"><Link className="link" to={`cart/${userId}`}><img src={cart} id='header_cart'></img>{count}</Link></li>
          </ul>
        </nav>
        </div>
        
        {/* Pass updateTotalItems as a prop */}
        <Outlet context={[userId, count,setCount]} />

        <div id="footer">
        <img src={footerimg} id="footerbg"></img><img src={logo} id='logo_footer'></img>
        </div>
      </div>
    )
  }