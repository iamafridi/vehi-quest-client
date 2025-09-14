import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useState } from 'react'
import { getAllUsers } from '../../../api/auth'
import UserDataRow from '../../../components/Dashboard/TableRows/UserDataRow'

const ManageUsers = () => {
  const [refreshState, setRefreshState] = useState('idle') // idle, refreshing, refreshed

  const { data, refetch, isLoading, isError, error } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await getAllUsers()
      return Array.isArray(res) ? res : res?.data || []
    },
  })

  const users = data || []

  const handleRefresh = async () => {
    setRefreshState('refreshing')
    try {
      await refetch()
      setRefreshState('refreshed')
      // Reset to idle after 2 seconds
      setTimeout(() => {
        setRefreshState('idle')
      }, 2000)
    } catch (error) {
      setRefreshState('idle')
    }
  }

  const getRefreshButtonContent = () => {
    switch (refreshState) {
      case 'refreshing':
        return {
          text: 'Refreshing...',
          icon: 'animate-spin',
          disabled: true
        }
      case 'refreshed':
        return {
          text: 'Refreshed',
          icon: '',
          disabled: false
        }
      default:
        return {
          text: 'Refresh',
          icon: '',
          disabled: false
        }
    }
  }

  const buttonContent = getRefreshButtonContent()

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            <span className="ml-3 text-gray-600">Loading users...</span>
          </div>
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div className="text-center py-12">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
              <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Failed to load users</h3>
            <p className="text-gray-500 mb-4">{error?.message || 'Something went wrong'}</p>
            <button
              onClick={handleRefresh}
              disabled={buttonContent.disabled}
              className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white transition-all duration-200 ${refreshState === 'refreshed'
                ? 'bg-green-600 hover:bg-green-700'
                : 'bg-indigo-600 hover:bg-indigo-700'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <svg
                className={`w-4 h-4 mr-2 ${buttonContent.icon}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {refreshState === 'refreshed' ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                )}
              </svg>
              {refreshState === 'refreshing' ? 'Retrying...' : refreshState === 'refreshed' ? 'Refreshed' : 'Try Again'}
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>Manage Users | Admin : Vehiquest </title>
      </Helmet>
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-4">
          {/* Header Section */}
          <div className="mb-2">
            <h1 className="text-2xl font-[font2] font-bold text-gray-900">Manage Users</h1>
            <div className=" flex items-center mt-4 justify-between gap-8">
              <p className="text-sm font-[font1] tracking-wide border-2 border-b-blue-950 rounded-full px-4 py-1 text-gray-500">
                Total users: <span className="font-medium">{users.length}</span>
              </p>
              <button
                onClick={handleRefresh}
                disabled={buttonContent.disabled}
                className={`inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-full text-gray-100 bg-blue-950 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 ${refreshState === 'refreshed' ? 'border-green-300 bg-green-50 text-green-700' : ''
                  }`}
              >
                <svg
                  className={`w-4 h-4 mr-2 ${buttonContent.icon}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {refreshState === 'refreshed' ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  )}
                </svg>
                {buttonContent.text}
              </button>
            </div>
          </div>

          {/* Table Section */}
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow-sm rounded-lg overflow-hidden border border-gray-200">
              <table className="min-w-full leading-normal">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 border-b border-gray-200 text-gray-800 text-justify text-xs uppercase font-semibold tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-4 border-b border-gray-200 text-gray-800 text-justify text-xs uppercase font-semibold tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-4 border-b border-gray-200 text-gray-800 text-justify text-xs uppercase font-semibold tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 border-b border-gray-200 text-gray-800 text-justify text-xs uppercase font-semibold tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.length > 0 ? (
                    users.map(user => (
                      <UserDataRow key={user._id || user.email} user={user} refetch={refetch} />
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="px-6 py-12 text-center">
                        <div className="flex flex-col items-center">
                          <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                          </svg>
                          <h3 className="text-lg font-medium text-gray-900 mb-1">No users found</h3>
                          <p className="text-gray-500">There are no users to display at this time.</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ManageUsers