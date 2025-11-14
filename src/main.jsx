import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from './components/Root/Root.jsx';
import Home from './components/Home/Home.jsx';
import AllProperties from './pages/AllProperties.jsx';
import AddProperties from './pages/AddProperties.jsx';
import MyProperties from './pages/MyProperties.jsx';
import Login from './components/Login/Login.jsx';
import Register from './components/Register/Register.jsx';
import MyRatings from './pages/MyRatings.jsx';
import AuthProvider from './contexts/AuthProvider.jsx';
import PrivateRoute from './Routes/PrivateRoute.jsx';
import ErrorPage from './components/ErrorPage/ErrorPage.jsx';
import Properties from './pages/Properties.jsx';
import FeaturedProperties from './pages/FeaturedProperties.jsx';
import PropertiesDetails from './pages/PropertiesDetails.jsx';


// Vercel-এর স্থায়ী ডোমেইন ব্যবহার করা হচ্ছে, যা 401 Unauthorized ত্রুটি দূর করবে।
const API_BASE_URL = 'https://home-nest-server-sand.vercel.app';

export const propertiesLoader = async ({ request }) => {

  const url = new URL(request.url);
  const searchString = url.search;


  let apiUrl = `${API_BASE_URL}/properties`;


  if (searchString) {
    apiUrl = `${apiUrl}${searchString}`;
  }

  console.log("API URL for properties (Sort & Search):", apiUrl);

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch properties with sorting/searching.');
    }
    return await response.json();
  } catch (error) {
    console.error("Error in propertiesLoader:", error);
    return [];
  }
};

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
        loader: propertiesLoader,
        Component: AllProperties
      },
      {
        path: 'propertiesDetails/:id',
        loader: ({ params }) => fetch(`${API_BASE_URL}/properties/${params.id}`),
        element: <PrivateRoute>
          <PropertiesDetails></PropertiesDetails>
        </PrivateRoute>
      },

      {
        path: '/addProperties',
        element: <PrivateRoute>
          <AddProperties></AddProperties>
        </PrivateRoute>
      },

      {
        path: '/myProperties',
        element: <PrivateRoute>
          <MyProperties></MyProperties>
        </PrivateRoute>
      },

      {
        path: '/myRatings',
        element: <PrivateRoute>
          <MyRatings></MyRatings>
        </PrivateRoute>
      },

      {
        path: '/login',
        Component: Login
      },
      {
        path: '/register',
        Component: Register
      },
      {
        path: "*",
        element: <ErrorPage></ErrorPage>,
        handle: { hideLayout: true },
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