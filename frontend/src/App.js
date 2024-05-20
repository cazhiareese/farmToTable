import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Root from './pages/UserPages/Root';
import Home from './pages/UserPages/Home';
import Cart from './pages/UserPages/Cart';
import Order from './pages/UserPages/Orders';
import ProductDetails from './pages/UserPages/ProductDetails'
import SignIn from './pages/AuthPages/SignIn.js';
import SignUp from './pages/AuthPages/SignUp.js';
import RootAdmin from './pages/AdminPages/RootAdmin.js';
import Dashboard from './pages/AdminPages/Dashboard.js';
import Account from './pages/AdminPages/Account.js';
import ActiveOrders from './pages/AdminPages/ActiveOrders.js';
import Inventory from './pages/AdminPages/Inventory.js';
import SalesReport from './pages/AdminPages/SalesReport.js';
import CreateListing from './pages/AdminPages/CreateListing.js';


const site_desc = {
       name : "Farm-To-Table",
       Logo : "./images/logo",
     }
     
//for authentication and security
const isUserSignedIn = !!localStorage.getItem('token')

function App() {
  return(
    <div>
      <Routes>
        <Route path='/' element={<Root desc={site_desc} />}>
          <Route index element={<Home desc = {site_desc}/>} />
          <Route path="orders/:id" element={<Order />} />
          <Route path="cart/:id" element={<Cart />} />
          <Route path="product/:id" element={<ProductDetails />} />
        </Route>
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        {
          isUserSignedIn ? (
          <Route path='/admin/' element={<RootAdmin />}>
            <Route index element={<Dashboard />} />
            <Route path='inventory' element={<Inventory />} />
            <Route path='active-orders' element={<ActiveOrders />} />
            <Route path='sales-report' element={<SalesReport />} />
            <Route path='active-accounts' element={<Account />} />
            <Route path='create-listing' element={<CreateListing />} />
          </Route>
          ) : (
          <Route path='/admin/' >
            <Route index element={<SignIn />} />
            <Route path='inventory' element={<SignIn />} />
            <Route path='active-orders' element={<SignIn />} />
            <Route path='sales-report' element={<SignIn />} />
            <Route path='active-accounts' element={<SignIn />} />
            <Route path='create-listing' element={<SignIn />} />
          </Route>
          )
        }
      </Routes>
    </div>
  )
}

export default App;