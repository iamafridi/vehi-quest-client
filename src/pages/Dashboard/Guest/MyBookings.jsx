import { Helmet } from 'react-helmet-async'
import useAuth from '../../../hooks/useAuth'
import { useQuery } from '@tanstack/react-query'
import { getBookings } from '../../../api/bookings'
import Loader from '../../../components/Shared/Loader'
import EmptyState from '../../../components/Shared/EmptyState'
import TableRow from '../../../components/Dashboard/TableRows/TableRows'

const MyBookings = () => {
    const { user, loading } = useAuth()

    const {
        data: bookings = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ['bookings', user?.email],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            const res = await getBookings(user?.email);
            return res?.data || [];
        },
    });

    if (isLoading) return <Loader />

    return (
        <>
            <Helmet>
                <title>My Bookings</title>
            </Helmet>
            {bookings && Array.isArray(bookings) && bookings.length > 0 ? (
                <div className='container mx-auto px-4 sm:px-8'>
                    <div className='py-8'>
                        <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
                            <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
                                <table className='min-w-full leading-normal'>
                                    {/* Extra Large Desktop Headers (1536px+) */}
                                    <thead className="hidden 2xl:table-header-group">
                                        <tr>
                                            <th scope='col' className='px-4 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
                                                Vehicle
                                            </th>
                                            <th scope='col' className='px-4 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
                                                Host
                                            </th>
                                            <th scope='col' className='px-4 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
                                                Guest
                                            </th>
                                            <th scope='col' className='px-4 py-3 bg-white border-b border-gray-200 text-gray-800 text-center text-sm uppercase font-normal'>
                                                Price
                                            </th>
                                            <th scope='col' className='px-4 py-3 bg-white border-b border-gray-200 text-gray-800 text-center text-sm uppercase font-normal'>
                                                From
                                            </th>
                                            <th scope='col' className='px-4 py-3 bg-white border-b border-gray-200 text-gray-800 text-center text-sm uppercase font-normal'>
                                                To
                                            </th>
                                            <th scope='col' className='px-4 py-3 bg-white border-b border-gray-200 text-gray-800 text-center text-sm uppercase font-normal'>
                                                Status
                                            </th>
                                            <th scope='col' className='px-4 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>

                                    {/* Large Desktop Headers (1280px - 1535px) */}
                                    <thead className="hidden xl:table-header-group 2xl:hidden">
                                        <tr>
                                            <th scope='col' className='px-3 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
                                                Vehicle
                                            </th>
                                            <th scope='col' className='px-3 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
                                                Host
                                            </th>
                                            <th scope='col' className='px-3 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
                                                Guest
                                            </th>
                                            <th scope='col' className='px-3 py-3 bg-white border-b border-gray-200 text-gray-800 text-center text-sm uppercase font-normal'>
                                                Price
                                            </th>
                                            <th scope='col' className='px-3 py-3 bg-white border-b border-gray-200 text-gray-800 text-center text-sm uppercase font-normal'>
                                                Dates
                                            </th>
                                            <th scope='col' className='px-3 py-3 bg-white border-b border-gray-200 text-gray-800 text-center text-sm uppercase font-normal'>
                                                Status
                                            </th>
                                            <th scope='col' className='px-3 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>

                                    {/* Medium Desktop Headers (1024px - 1279px) */}
                                    <thead className="hidden lg:table-header-group xl:hidden">
                                        <tr>
                                            <th scope='col' className='w-40 px-3 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
                                                Vehicle
                                            </th>
                                            <th scope='col' className='w-32 px-3 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
                                                Host
                                            </th>
                                            <th scope='col' className='w-32 px-3 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal'>
                                                Guest
                                            </th>
                                            <th scope='col' className='w-24 px-3 py-3 bg-white border-b border-gray-200 text-gray-800 text-center text-sm uppercase font-normal'>
                                                Dates
                                            </th>
                                            <th scope='col' className='px-3 py-3 bg-white border-b border-gray-200 text-gray-800 text-center text-sm uppercase font-normal'>
                                                Status & Actions
                                            </th>
                                        </tr>
                                    </thead>

                                    {/* Tablet and Mobile - No headers needed as they use card layouts */}

                                    <tbody>
                                        {bookings &&
                                            bookings.map(booking => (
                                                <TableRow
                                                    key={booking._id}
                                                    booking={booking}
                                                    refetch={refetch}
                                                />
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <EmptyState
                    message='No booking data available.'
                    address='/'
                    label='Browse vehicles'
                />
            )}
        </>
    )
}

export default MyBookings;