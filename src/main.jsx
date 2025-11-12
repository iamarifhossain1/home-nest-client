import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Root from './components/Root/Root.jsx';
import Home from './components/Home/Home.jsx';
import AllProperties from './pages/AllProperties.jsx';
import AddProperties from './pages/AddProperties.jsx';
import MyProperties from './pages/MyProperties.jsx';
import Login from './components/Login/Login.jsx';
import Register from './components/Register/Register.jsx';
import MyRatings from './pages/MyRatings.jsx';
import AuthProvider from './contexts/AuthProvider.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        Component: Home
      },

      {
        path: '/allProperties',
        Component: AllProperties
      },

      {
        path: '/addProperties',
        Component: AddProperties
      },

      {
        path: '/myProperties',
        Component: MyProperties
      },

      {
        path: '/myRatings',
        Component: MyRatings
      },

      {
        path: '/login',
        Component: Login
      },
      {
        path: '/register',
        Component: Register
      }

    ]

  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  </StrictMode>,
)
