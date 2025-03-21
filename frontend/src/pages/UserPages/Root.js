/**
 * This component sets up the main layout of the application, including the header with navigation links,
 * user authentication status, and a footer. It also manages the state for the item count in the cart
 */

import { Outlet, Link } from 'react-router-dom';
import { useState } from 'react';
import css from '../../style/output.css';
import cart from '../../icons/header_cart.png';
import logo from '../../images/ftt_logo.png';
import footerimg from '../../images/footer_pic.png';

export default function Root(props) {
  const userId= props.user;

  const [count, setCount] = useState(0);

    //for authentication and security 
    const isUserSignedIn = !!localStorage.getItem('token');
  
    //function for logging out user
    const handleSignOut = () => {
      localStorage.removeItem('token');
      window.location='/sign-in'
    }

    return (
      <div className= 'font-Roboto'>
        <div className = "flex justify-between items-center lg:flex-row md:flex-col sm:flex-col bg-fttGreen w-full min-h-20 lg:px-32 py-4 md:px-32 sm:px-12" id="customer-nav">
        <img className = "w-60" src={logo}></img>
        <div className="items-center align w-6/12"><nav >
          <ul  className="flex justify-between w-full" >
            <li className="text-fttBg hover:text-fttWhite"><Link className="link" to={'/'}>Homepage</Link></li>
            <li className="text-fttBg hover:text-fttWhite"><Link className="link" to={`/orders/${userId}`}>Orders</Link></li>
            <li className="text-fttBg hover:text-fttWhite"><Link className="link" onClick={handleSignOut}>Sign Out</Link></li>
            <li className="hover:animate- text-fttBg hover:text-fttWhite"><Link className="link" to={`cart/`}>
            <img className='w-7 h-7 mr-1 inline-block' src={cart} id='header_cart'>
              </img><p className="inline-block">{count}</p></Link></li>
          </ul>
        </nav></div>
        </div>
        
        {/* Pass updateTotalItems as a prop */}
        <Outlet context={[userId, count,setCount]} />
        <div className='bg-fttGreen w-full min-h-20 flex justify-between items-center'>
        <div className='items-center'>
          <img className="w-80 h-full inline-block" src={footerimg}></img>
          <img className="h-8 inline-block" src={logo}></img>
        </div>
        <div className='text-fttShadow pr-48 text-left'>
          <p className='font-medium'>Contact us</p>
          <p>Send gcash</p>
        </div>
        </div>
      </div>
    )
  }