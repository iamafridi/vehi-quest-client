import { AiOutlineMenu } from 'react-icons/ai'
import { FaCar, FaUser, FaSignOutAlt, FaSignInAlt, FaUserPlus, FaTachometerAlt, FaHome } from "react-icons/fa"
import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth'
import avatarImg from '../../../assets/images/placeholder.jpg'
import HostRequestModal from '../../Modal/HostRequestModal'
import { becomeHost } from '../../../api/auth'
import toast from 'react-hot-toast'
import useRole from '../../../hooks/useRole'

const MenuDropdown = () => {
  const { user, logOut } = useAuth()
  const [role] = useRole()
  const [isOpen, setIsOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const dropdownRef = useRef(null)
  const buttonRef = useRef(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
        buttonRef.current && !buttonRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Close dropdown on escape key
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey)
      return () => document.removeEventListener('keydown', handleEscapeKey)
    }
  }, [isOpen])

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const modalHandler = async () => {
    setIsLoading(true)
    try {
      const data = await becomeHost(user?.email)
      console.log(data)
      if (data.modifiedCount > 0) {
        toast.success('Success! Please wait for admin confirmation.')
      } else {
        toast.success('Please wait for admin approval ⏱️')
      }
    } catch (err) {
      console.log(err)
      toast.error('Something went wrong. Please try again.')
    } finally {
      setIsModalOpen(false)
      setIsLoading(false)
    }
  }

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleLinkClick = () => {
    setIsOpen(false)
  }

  const handleLogout = () => {
    logOut()
    setIsOpen(false)
    toast.success('Logged out successfully!')
  }

  return (
    <div className='relative'>
      <div className='flex flex-row items-center gap-2 sm:gap-3'>

        {/* Become A Host Button */}
        <div className='hidden md:block'>
          {(!user || !role || role === 'guest') && (
            <button
              disabled={!user || isLoading}
              onClick={() => setIsModalOpen(true)}
              className={`
                group relative overflow-hidden
                disabled:cursor-not-allowed disabled:opacity-50
                cursor-pointer hover:bg-blue-100 hover:border-blue-300
                py-2.5 px-4 text-sm font-semibold rounded-full
                transition-all duration-300 ease-in-out
                border border-gray-300 hover:shadow-md
                flex items-center gap-2
                ${!user
                  ? 'text-gray-500 bg-gray-100'
                  : 'text-gray-800 bg-white hover:text-blue-700'
                }
              `}
              aria-label="Become a host"
            >
              <span className="relative z-10">Host your Vehicle</span>
              <FaCar className={`
                transition-all duration-300 
                ${!user ? 'text-gray-400' : 'group-hover:scale-110 group-hover:text-blue-600'}
              `} />
            </button>
          )}
        </div>

        {/* Dropdown Button */}
        <button
          ref={buttonRef}
          onClick={toggleDropdown}
          className={`
            p-3 md:py-2 md:px-3 border border-neutral-300 bg-slate-50
            flex flex-row items-center gap-3 rounded-full 
            cursor-pointer hover:shadow-md hover:border-gray-400 hover:bg-gray-50
            transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1
            ${isOpen ? 'shadow-md bg-gray-100 border-gray-400' : ''}
          `}
          aria-expanded={isOpen}
          aria-haspopup="true"
          aria-label="User menu"
        >
          <AiOutlineMenu className={`
            transition-transform duration-200 text-gray-700
            ${isOpen ? 'rotate-90' : ''}
          `} />

          <div className='hidden md:block'>
            <div className="relative">
              <img
                className='rounded-full ring-2 ring-offset-1 ring-transparent hover:ring-blue-300 transition-all duration-200'
                referrerPolicy='no-referrer'
                src={user && user.photoURL ? user.photoURL : avatarImg}
                alt='User profile'
                height='32'
                width='32'
                loading="lazy"
              />
              {user && (
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
              )}
            </div>
          </div>
        </button>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Mobile Backdrop */}
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          <div
            ref={dropdownRef}
            className={`
              absolute right-0 top-14 z-50
              w-72 sm:w-80 md:w-64 lg:w-56
              bg-white rounded-2xl shadow-2xl border border-gray-200
              overflow-hidden transform transition-all duration-200 ease-out
              ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2'}
            `}
            role="menu"
            aria-orientation="vertical"
          >
            <div className='py-2'>

              {/* User Info Section */}
              {user && (
                <div className="px-4 py-3 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
                  <div className="flex items-center gap-3">
                    <img
                      className='rounded-full ring-2 ring-white'
                      src={user.photoURL || avatarImg}
                      alt='User profile'
                      height='40'
                      width='40'
                      loading="lazy"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        {user.displayName || 'User'}
                      </p>
                      <p className="text-xs text-gray-600 truncate">
                        {user.email}
                      </p>
                      {role && (
                        <span className="inline-block px-2 py-0.5 mt-1 text-xs font-medium bg-blue-200 text-blue-900 rounded-full capitalize">
                          {role}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Mobile Host Button */}
              <div className='block p-4 md:hidden'>
                {(!user || !role || role === 'guest') && (
                  <button
                    disabled={!user || isLoading}
                    onClick={() => {
                      setIsModalOpen(true)
                      setIsOpen(false)
                    }}
                    className='w-full text-left px-4 py-3 hover:bg-blue-100 transition-colors font-semibold text-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 rounded-lg'
                    role="menuitem"
                  >
                    <FaCar className="text-blue-600" />
                    Host your Vehicle
                  </button>
                )}
              </div>

              {/* Navigation Items */}
              <div className='flex flex-col'>

                {/* Mobile Home Link */}
                <Link
                  to='/'
                  onClick={handleLinkClick}
                  className='md:hidden px-4 py-3 hover:bg-gray-100 transition-colors font-medium text-gray-800 hover:text-gray-900 flex items-center gap-3 rounded-lg mx-2'
                  role="menuitem"
                >
                  <FaHome className="text-gray-600" />
                  Home
                </Link>

                {user ? (
                  <>
                    <Link
                      to='/dashboard'
                      onClick={handleLinkClick}
                      className='px-4 py-3 hover:bg-gray-100 transition-colors font-medium text-gray-800 hover:text-gray-900 flex items-center gap-3 rounded-lg mx-2'
                      role="menuitem"
                    >
                      <FaTachometerAlt className="text-gray-600" />
                      Dashboard
                    </Link>

                    <button
                      onClick={handleLogout}
                      className='w-full text-left px-4 py-3 hover:bg-red-100 transition-colors font-medium cursor-pointer text-red-700 hover:text-red-800 flex items-center gap-3 border-t border-gray-200 mt-2 rounded-lg mx-2'
                      role="menuitem"
                    >
                      <FaSignOutAlt className="text-red-600" />
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to='/login'
                      onClick={handleLinkClick}
                      className='px-4 py-3 hover:bg-blue-100 transition-colors font-medium text-blue-700 hover:text-blue-800 flex items-center gap-3 rounded-lg mx-2'
                      role="menuitem"
                    >
                      <FaSignInAlt className="text-blue-600" />
                      Login
                    </Link>

                    <Link
                      to='/signup'
                      onClick={handleLinkClick}
                      className='px-4 py-3 hover:bg-green-100 transition-colors font-medium text-green-700 hover:text-green-800 flex items-center gap-3 rounded-lg mx-2'
                      role="menuitem"
                    >
                      <FaUserPlus className="text-green-600" />
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      <HostRequestModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        modalHandler={modalHandler}
      />
    </div>
  )
}

export default MenuDropdown