import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { getAllUsers } from '../../../api/auth'
import UserDataRow from '../../../components/Dashboard/TableRows/UserDataRow'

const ManageUsers = () => {
  const { data, refetch, isLoading, isError } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await getAllUsers()
      // Make sure to return an array
      // Adjust this based on your API response
      return Array.isArray(res) ? res : res?.data || []
    },
  })

  const users = data || []

  if (isLoading) {
    return <div className="text-center py-10">Loading users...</div>
  }

  if (isError) {
    return <div className="text-center py-10 text-red-500">Failed to load users.</div>
  }

  return (
    <>
      <Helmet>
        <title>Manage Users</title>
      </Helmet>
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                      Email
                    </th>
                    <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                      Role
                    </th>
                    <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                      Status
                    </th>
                    <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.length > 0 ? (
                    users.map(user => (
                      <UserDataRow key={user._id} user={user} refetch={refetch} />
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="text-center py-4">
                        No users found.
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
