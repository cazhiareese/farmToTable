import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
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
import EditProduct from './pages/AdminPages/EditProduct.js';

const site_desc = {
  name : "Farm-To-Table",
  Logo : "./images/logo",
}

//for authentication and security
const isUserSignedIn = !!localStorage.getItem('token')

const router = createBrowserRouter([
  { path: '/', element: <Root desc = {site_desc}/>, children: [
    { path: '/', element: <Home desc = {site_desc}/> },
    { path: '/orders/:id', element: <Order />},
    { path: '/cart/:id', element: <Cart /> },
    { path:'/product/:id', element:<ProductDetails />}
  ],
  },
  {path: '/sign-in', element: <SignIn />},
  {path: '/sign-up', element: <SignUp />},

  { path: '/admin', element: <RootAdmin />, children:[
    {path: '/admin', element: <Dashboard />},
    {path: '/admin/inventory', element: <Inventory />},
    {path:'/admin/active-orders', element: <ActiveOrders />},
    {path: '/admin/sales-report', element: <SalesReport />},
    {path: '/admin/active-accounts', element: <Account />},
    {path: '/admin/create-listing', element: <CreateListing />},
    {path: '/admin/edit-product/:id', element: <EditProduct />}
  ]}
])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>
);
