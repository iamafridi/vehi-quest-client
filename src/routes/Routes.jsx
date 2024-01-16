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
import HostRoute from './HostRoute'
import AdminRoute from './AdminRoute'
import ManageUser from '../pages/Dashboard/Admin/ManageUser'
import Profile from '../pages/Dashboard/Common/Profile'
import MyBookings from '../pages/Dashboard/Guest/MyBookings'
import ManageBookings from '../pages/Dashboard/Host/ManageBookings'

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
    element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
    children: [
      {
        path: 'add-vehicle',
        element: <PrivateRoute> <HostRoute><AddVehicle /></HostRoute></PrivateRoute>
      },
      {
        path: 'my-listings',
        element: <PrivateRoute><HostRoute><MyListings /></HostRoute></PrivateRoute>
      },
      // ***Admin***
      {
        path: 'manage-users',
        element: <PrivateRoute>
          <AdminRoute>
            <ManageUser />
          </AdminRoute>
        </PrivateRoute>
      },
      // Common
      {
        path: 'profile',
        element: <PrivateRoute><Profile /></PrivateRoute>
      },
      {
        path: 'my-bookings',
        element: <PrivateRoute><MyBookings /></PrivateRoute>
      },

      // Host route
      {
        path: 'manage-bookings',
        element: <HostRoute><ManageBookings /></HostRoute>
      }

    ]
  }
])
