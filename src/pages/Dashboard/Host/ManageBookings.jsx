import { Helmet } from 'react-helmet-async'
import useAuth from '../../../hooks/useAuth'
import { useQuery } from '@tanstack/react-query'
import { getHostBookings } from '../../../api/bookings'
import Loader from '../../../components/Shared/Loader'

import EmptyState from '../../../components/Shared/EmptyState'
import TableRow from '../../../components/Dashboard/TableRows/TableRows'
import { useState } from 'react'

const ManageBookings = () => {
    const { user, loading } = useAuth()
    const [clicked, setClicked] = useState(false)
    const {
        data: bookings = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ['host-bookings', user?.email],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            const res = await getHostBookings(user?.email)
            return res?.data || []   //  array of bookings
        },
    })
    console.log(bookings)
    if (isLoading) return <Loader />

    return (
        <>
            <Helmet>
                <title>Manage Bookings</title>
            </Helmet>
            {bookings && Array.isArray(bookings) && bookings.length > 0 ? (
                <div className='container mx-auto px-4 sm:px-8'>
                    <div className='py-8'>
                        <div className='flex items-center justify-between'>

                            <div>
                                <h1 className='text-2xl mb-1 font-semibold text-gray-900'>Manage Bookings </h1>
                                <p className='mb-3 tracking-wider text-gray-700/90 text-sm'>Manage your bookings here , confirm or cancel booking in on place </p>
                                {/* Refresh Button */}
                                <button
                                    onClick={() => {
                                        setClicked(true)
                                        refetch()
                                        setTimeout(() => setClicked(false), 1500)
                                    }}
                                    disabled={isLoading}
                                    className="bg-blue-900/90  font-[font1] tracking-wider hover:bg-red-900/70 
               disabled:bg-blue-300 text-white px-4 py-2 rounded-md text-sm 
               font-medium transition-colors duration-200"
                                >
                                    {isLoading ? 'Refreshing...' : clicked ? 'Refreshed' : 'Refresh'}
                                </button>
                            </div>

                            <p className='font-[font1] tracking-wider border px-3 py-2 rounded-se-full rounded-ee-full border-l-[12px] animated-border-3'> Total Bookings :  {bookings.length}</p>




                        </div>

                        <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
                            <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
                                <table className='min-w-full leading-normal'>
                                    <thead>
                                        <tr>
                                            <th
                                                scope='col'
                                                className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                            >
                                                Title
                                            </th>
                                            <th
                                                scope='col'
                                                className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                            >
                                                Host Info
                                            </th>
                                            <th
                                                scope='col'
                                                className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                            >
                                                Guest Info
                                            </th>
                                            <th
                                                scope='col'
                                                className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                            >
                                                Price
                                            </th>
                                            <th
                                                scope='col'
                                                className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                            >
                                                From
                                            </th>
                                            <th
                                                scope='col'
                                                className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                            >
                                                To
                                            </th>
                                            <th
                                                scope='col'
                                                className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                            >
                                                Action
                                            </th>
                                            <th
                                                scope='col'
                                                className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                            >

                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* Table row data */}{' '}
                                        {bookings &&
                                            bookings.map(booking => (
                                                <TableRow key={booking._id} booking={booking}
                                                    refetch={refetch} />
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <EmptyState
                    message='No one booked your vehicle yet, you will find deals soon!'
                    address='/'
                    label='Go Back'
                />
            )}
        </>
    )
}

export default ManageBookings