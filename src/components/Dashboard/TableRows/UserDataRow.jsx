import { useState } from 'react'
import { toast } from 'react-hot-toast'
import UpdateUserModal from '../../Modal/UpdateUserModal'
import { updateRole } from '../../../api/auth'

const UserDataRow = ({ user, refetch }) => {
    const [isOpen, setIsOpen] = useState(false)

    const modalHandler = async role => {
        try {
            const data = await updateRole({ name: user?.displayName, image: user?.photoURL, email: user?.email, role })
            console.log(data)
            refetch()
            toast.success('User role updated!')
        } catch (err) {
            console.log(err)
            toast.error(err.message)
        } finally {
            setIsOpen(false)
        }
    }

    const getRoleBadgeColor = (role) => {
        switch (role?.toLowerCase()) {
            case 'admin':
                return 'bg-red-100 text-red-800 border-red-200'
            case 'moderator':
                return 'bg-purple-100 text-purple-800 border-purple-200'
            case 'user':
                return 'bg-blue-100 text-blue-800 border-blue-200'
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200'
        }
    }

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'verified':
                return 'text-green-600 bg-green-50'
            case 'pending':
                return 'text-yellow-600 bg-yellow-50'
            case 'suspended':
                return 'text-red-600 bg-red-50'
            default:
                return 'text-gray-600 bg-gray-50'
        }
    }

    return (
        <tr className="hover:bg-gray-50 transition-colors duration-200">
            {/* User Info */}
            <td className='px-6 py-4 border-b border-gray-200 bg-white'>
                <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                        {user?.image ? (
                            <img
                                className="h-10 w-10 rounded-full object-cover ring-2 ring-gray-200"
                                src={user.image}
                                alt="User avatar"
                                onError={(e) => {
                                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.email || 'User')}&background=6366f1&color=fff`
                                }}
                            />
                        ) : (
                            <div className="h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center">
                                <span className="text-sm font-medium text-white">
                                    {user?.email?.charAt(0)?.toUpperCase() || 'U'}
                                </span>
                            </div>
                        )}
                    </div>
                    <div className="min-w-0 flex-1">
                        <p className="text-sm text-gray-500 truncate">
                            {user?.email || 'No email provided'}
                        </p>
                    </div>
                </div>
            </td>

            {/* Role */}
            <td className='px-6 py-4 border-b border-gray-200 bg-white'>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getRoleBadgeColor(user?.role)}`}>
                    {user?.role?.toUpperCase() || 'UNKNOWN'}
                </span>
            </td>

            {/* Status */}
            <td className='px-6 py-4 border-b border-gray-200 bg-white'>
                {user?.status ? (
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                        <span className={`w-2 h-2 rounded-full mr-2 ${user.status === 'Verified' ? 'bg-green-400' :
                            user.status === 'Pending' ? 'bg-yellow-400' : 'bg-red-400'
                            }`}></span>
                        {user.status}
                    </span>
                ) : (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-gray-600 bg-gray-100">
                        <span className="w-2 h-2 rounded-full mr-2 bg-gray-400"></span>
                        Unavailable
                    </span>
                )}
            </td>

            {/* Actions */}
            <td className='px-6 py-4 border-b border-gray-200 bg-white'>
                <button
                    onClick={() => setIsOpen(true)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full cursor-pointer text-white bg-blue-950 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:animated-border-3 shadow-sm"
                >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Update Role
                </button>

                {/* Modal */}
                <UpdateUserModal
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    user={user}
                    modalHandler={modalHandler}
                />
            </td>
        </tr>
    )
}

export default UserDataRow