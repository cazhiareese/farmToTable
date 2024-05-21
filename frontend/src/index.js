import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.js';
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
     <App />
  </BrowserRouter>
);

// const router = createBrowserRouter([
//   { path: '/', element: <Root desc = {site_desc}/>, children: [
//     { path: '/', element: <Home desc = {site_desc}/> },
//     { path: '/orders/:id', element: <Order />},
//     { path: '/cart/:id', element: <Cart /> },
//     { path:'/product/:id', element:<ProductDetails />}
//   ],
//   },
//   {path: '/sign-in', element: <SignIn />},
//   {path: '/sign-up', element: <SignUp />},

//   { path: '/admin', element: <RootAdmin />, children:[
//     {path: '/admin', element: <Dashboard />},
//     {path: '/admin/inventory', element: <Inventory />},
//     {path:'/admin/active-orders', element: <ActiveOrders />},
//     {path: '/admin/sales-report', element: <SalesReport />},
//     {path: '/admin/active-accounts', element: <Account />},
//     {path: '/admin/create-listing', element: <CreateListing />},
//     {path: '/admin/edit-product/:id', element: <EditProduct />}
//   ]}
// ])


// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//      <RouterProvider router={router} />
//   </React.StrictMode>
// );
