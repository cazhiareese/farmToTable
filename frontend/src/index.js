import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import './index.css'
import Root from './pages/Root';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Order from './pages/Orders';
import ProductDetails from './pages/ProductDetails'
import SignIn from './pages/AuthPages/SignIn.js';
import SignUp from './pages/AuthPages/SignUp.js';

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
  {path: '/sign-up', element: <SignUp />}
])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>
);


