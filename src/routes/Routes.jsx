import { createBrowserRouter } from 'react-router-dom'
import Main from '../layouts/Main'
import Home from '../pages/Home/Home'
import ErrorPage from '../pages/ErrorPage'
import Login from '../pages/Login/Login'
import SignUp from '../pages/SignUp/SignUp'
import VehicleDetails from '../pages/VehicleDetails/VehicleDetails'
import PrivateRoute from './PrivateRoute'
import { getVehicle } from '../api/vehicles'
import DashboardLayout from '../layouts/DashboardLayout'
import AddVehicle from '../pages/Dashboard/Host/AddRoom'
import MyListings from '../pages/Dashboard/Host/MyListings'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      }, {
        path: '/vehicle/:id',
        element: (<PrivateRoute><VehicleDetails></VehicleDetails></PrivateRoute>
        ),
        loader: ({ params }) => getVehicle(params.id)

      }
    ],
  },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <SignUp /> },
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      {
        path: 'add-vehicle',
        element: <AddVehicle />
      },
      {
        path: 'my-listings',
        element: <MyListings />
      }
    ]
  }
])
