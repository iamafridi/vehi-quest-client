import { Helmet } from 'react-helmet-async'
import useAuth from '../../../hooks/useAuth'
import { useQuery } from '@tanstack/react-query'
import { getAdminBookings } from '../../../api/bookings'
import Loader from '../../../components/Shared/Loader'
import EmptyState from '../../../components/Shared/EmptyState'
import TableRow from '../../../components/Dashboard/TableRows/TableRows'
import { useState } from 'react'

const AdminManageBookings = () => {
    const { user, loading } = useAuth()
    const [refreshState, setRefreshState] = useState('idle') // idle, refreshing, refreshed

    // Query to fetch bookings
    const {
        data: bookings = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ['admin-bookings'],
        queryFn: async () => {
            const res = await getAdminBookings()
            return res?.data || []
        },
    })

    // Refresh Button Logic
    const handleRefresh = async () => {
        setRefreshState('refreshing')
        try {
            await refetch()
            setRefreshState('refreshed')
            setTimeout(() => setRefreshState('idle'), 2000)
        } catch (error) {
            setRefreshState('idle')
        }
    }

    const getRefreshButtonContent = () => {
        switch (refreshState) {
            case 'refreshing':
                return { text: 'Refreshing...', icon: 'animate-spin', disabled: true }
            case 'refreshed':
                return { text: 'Refreshed', icon: '', disabled: false }
            default:
                return { text: 'Refresh', icon: '', disabled: false }
        }
    }

    const buttonContent = getRefreshButtonContent()

    if (isLoading) return <Loader />

    return (
        <>
            <Helmet>
                <title>Manage Bookings - Admin</title>
            </Helmet>

            <div className="container mx-auto px-4 sm:px-8">
                <div className="py-8">
                    <div className="flex flex-col sm:flex-row justify-between items-center">
                        <div>
                            <h2 className="text-2xl mb-1 font-semibold leading-tight">
                                Manage Bookings
                            </h2>
                            <p className="mb-2 tracking-wider text-sm text-gray-700/90">
                                Manage all bookings here, update or cancel easily
                            </p>
                            {/* Refresh Button */}
                            <button
                                onClick={handleRefresh}
                                disabled={buttonContent.disabled}
                                className={`inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-full text-gray-100 bg-blue-950 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 ${refreshState === 'refreshed'
                                    ? 'border-green-300 bg-green-50 text-green-700'
                                    : ''
                                    }`}
                            >
                                <svg
                                    className={`w-4 h-4 mr-2 ${buttonContent.icon}`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    {refreshState === 'refreshed' ? (
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M5 13l4 4L19 7"
                                        />
                                    ) : (
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                        />
                                    )}
                                </svg>
                                {buttonContent.text}
                            </button>
                        </div>

                        {/* Total Count */}
                        <p className="tracking-wider border border-l-[10px] animated-border-3 rounded-se-full rounded-ee-full px-4 py-[6px] mt-4 sm:mt-0">
                            Total Bookings : {bookings.length}
                        </p>
                    </div>

                    {bookings && bookings.length > 0 ? (
                        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                            <div className="inline-block min-w-full shadow rounded-lg animated-border-3 border overflow-hidden">
                                <table className="min-w-full leading-normal">
                                    {/* Desktop Header */}
                                    <thead className="hidden md:table-header-group">
                                        <tr>
                                            <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                                                Vehicle
                                            </th>
                                            <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                                                Host
                                            </th>
                                            <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                                                Guest
                                            </th>
                                            <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                                                Price
                                            </th>
                                            <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                                                From
                                            </th>
                                            <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                                                To
                                            </th>
                                            <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                                                Status
                                            </th>
                                            <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {bookings.map((booking) => (
                                            <TableRow
                                                key={booking._id}
                                                booking={booking}
                                                refetch={refetch}
                                                isAdmin={true}
                                            />
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ) : (
                        <EmptyState
                            message="No bookings found!"
                            address="/"
                            label="Go Back"
                        />
                    )}
                </div>
            </div>
        </>
    )
}

export default AdminManageBookings
