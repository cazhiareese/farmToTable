import { Outlet,Link } from 'react-router-dom';

export default function Root() {

    const user_token = "1";

    return (
      <div className='container-fluid'>
        <nav>
          <ul>
            <li><Link to={'/'}>Homepage</Link></li>
            <li><Link to={'/orders'}>Orders</Link></li>
            <li><Link to={'/about-us'}>About</Link></li>
            <li><Link to={'/cart'}>Cart</Link></li>
          </ul>
        </nav>
        <Outlet/>
      </div>
    )
  }