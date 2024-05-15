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


const site_desc = {
  name : "Farm-To-Table",
  Logo : "./images/logo",
}
const router = createBrowserRouter([
  { path: '/', element: <Root desc = {site_desc}/>, children: [
    { path: '/', element: <Home desc = {site_desc}/> },
    { path: '/orders', element: <Order />},
    { path: '/cart', element: <Cart /> },
    { path:'/product:id', element:<ProductDetails />}
  ]}
])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>
);


