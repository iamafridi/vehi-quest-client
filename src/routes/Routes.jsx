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
import MyListings from '../pages/Dashboard/Host/MyListings'
import HostRoute from './HostRoute'
import AdminRoute from './AdminRoute'
import ManageUser from '../pages/Dashboard/Admin/ManageUser'
import Profile from '../pages/Dashboard/Common/Profile'
import MyBookings from '../pages/Dashboard/Guest/MyBookings'
import ManageBookings from '../pages/Dashboard/Host/ManageBookings'
import Statistics from '../pages/Dashboard/Common/Statistics'
import AddVehicle from '../pages/Dashboard/Host/AddVehicle'
import AdminManageBookings from '../pages/Dashboard/Admin/AdminManageBookings'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/vehicle/:id',
        element: (
          <PrivateRoute>
            <VehicleDetails />
          </PrivateRoute>
        ),
        loader: ({ params }) => getVehicle(params.id)
      }
    ],
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <SignUp />
  },
  {
    path: '/dashboard',
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <Statistics />
      },
      // Host routes
      {
        path: 'add-vehicle',
        element: (
          <HostRoute>
            <AddVehicle />
          </HostRoute>
        )
      },
      {
        path: 'my-listings',
        element: (
          <HostRoute>
            <MyListings />
          </HostRoute>
        )
      },
      {
        path: 'manage-bookings',
        element: (
          <HostRoute>
            <ManageBookings />
          </HostRoute>
        )
      },
      // Admin routes
      {
        path: 'manage-users',
        element: (
          <AdminRoute>
            <ManageUser />
          </AdminRoute>
        )
      },
      {
        path: 'admin-manage-booking',
        element: (
          <AdminRoute>
            <AdminManageBookings />
          </AdminRoute>
        )

      },
      // Common routes (accessible to all authenticated users)
      {
        path: 'profile',
        element: <Profile />
      },
      {
        path: 'my-bookings',
        element: <MyBookings />
      }
    ]
  }
])