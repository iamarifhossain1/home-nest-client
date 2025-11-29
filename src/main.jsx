import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

import Home from './components/Home/Home.jsx';
import Root from './Root/Root.jsx';
import AllProducts from './components/AllProducts/AllProducts.jsx';
import AuthProvider from './contexts/AuthProvider.jsx';
import Login from './components/Login/Login.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: 'allProduct',
        Component: AllProducts,
      },
      {
        path: '/login',
        Component: Login,
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  </StrictMode>,
)
