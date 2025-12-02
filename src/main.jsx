import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

import Home from './components/Home/Home.jsx';
import Root from './Root/Root.jsx';
import AuthProvider from './contexts/AuthProvider.jsx';
import Login from './components/Login/Login.jsx';
import AllProperties from './AllProperties/AllProperties.jsx';
import Registration from './components/Registration/Registration.jsx';

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
        path: 'allProperties',
        Component: AllProperties,
      },
      {
        path: '/login',
        Component: Login,
      },
      {
        path: '/registration',
        Component: Registration
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
