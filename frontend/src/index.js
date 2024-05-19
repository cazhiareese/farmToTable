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


