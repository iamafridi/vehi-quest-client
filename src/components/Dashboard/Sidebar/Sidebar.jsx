import { useState } from 'react'
import ToggleBtn from '../../Button/ToggleBtn'
import { FiLogOut } from 'react-icons/fi'   // ✅ Better visible logout icon
import { FcSettings } from 'react-icons/fc'
import { AiOutlineBars } from 'react-icons/ai'
import { BsGraphUp } from 'react-icons/bs'
import useAuth from '../../../hooks/useAuth'
import useRole from '../../../hooks/useRole'
import Logo from '../../Shared/Logo'
import MenuItem from './MenuItem'
import HostMenu from '../Menu/HostMenu'
import GuestMenu from '../Menu/GuestMenu'
import AdminMenu from '../Menu/AdminMenu'

const Sidebar = () => {
  const { logOut } = useAuth()
  const [toggle, setToggle] = useState(false)
  const [isActive, setActive] = useState(false)
  const [role] = useRole()

  // Guest/host toggle
  const toggleHandler = event => {
    setToggle(event.target.checked)
  }

  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive)
  }

  return (
    <>
      {/* Small Screen Navbar */}
      <div className='bg-gray-900  text-gray-100 flex justify-between md:hidden'>
        <div>
          <div className='block cursor-pointer p-4 font-bold'>
            <Logo />
          </div>
        </div>

        <button
          onClick={handleToggle}
          className='mobile-menu-button p-4 focus:outline-none focus:bg-gray-200'
        >
          <AiOutlineBars className='h-5 w-5' />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-900 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${isActive && '-translate-x-full'
          }  md:translate-x-0 transition duration-200 ease-in-out`}
      >
        <div>
          <div>
            <div className='w-full hidden md:flex px-4 py-2 shadow-lg rounded-lg justify-center items-center bg-rose-200 mx-auto'>
              <Logo />
            </div>
          </div>

          {/* Nav Items */}
          <div className='flex flex-col justify-between flex-1 mt-6'>
            {/* If a user is host */}
            {role === 'host' && <ToggleBtn toggleHandler={toggleHandler} />}
            <nav>
              <MenuItem
                icon={BsGraphUp}
                label='Statistics'
                address='/dashboard'
              />

              {/* Host / Guest / Admin Menus */}
              {role === 'guest' && <GuestMenu />}
              {role === 'host' ? (toggle ? <HostMenu /> : <GuestMenu />) : ''}
              {role === 'admin' && <AdminMenu />}
            </nav>
          </div>
        </div>

        <div>
          <hr />

          <MenuItem
            icon={FcSettings}
            label='Home'
            address='/'
          />

          <MenuItem
            icon={FcSettings}
            label='Profile'
            address='/dashboard/profile'
          />

          {/* ✅ Fixed Logout */}
          <button
            onClick={logOut}
            className='flex w-full items-center px-4 py-2 mt-5 text-gray-100 hover:bg-gray-800 hover:text-red-400 transition-colors duration-300 transform rounded-lg'
          >
            <FiLogOut className='w-5 h-5 text-red-400' />
            <span className='mx-4 font-medium'>Logout</span>
          </button>
        </div>
      </div>
    </>
  )
}

export default Sidebar
