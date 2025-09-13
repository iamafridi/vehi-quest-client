import { Helmet } from 'react-helmet-async'
import useAuth from '../../../hooks/useAuth'
import { useQuery } from '@tanstack/react-query'
import { getAdminBookings } from '../../../api/bookings'
import Loader from '../../../components/Shared/Loader'
import EmptyState from '../../../components/Shared/EmptyState'
import TableRow from '../../../components/Dashboard/TableRows/TableRows'
// import TableRow from '../../../components/Dashboard/TableRows/TableRow'

const AdminManageBookings = () => {
    const { user, loading } = useAuth()
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

    if (isLoading) return <Loader />

    return (
        <>
            <Helmet>
                <title>Manage Bookings</title>
            </Helmet>

            {bookings && bookings.length > 0 ? (
                <div className="container mx-auto px-4 sm:px-8">
                    <div className="py-8">
                        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">

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
                                                Action
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {bookings.map((booking) => (
                                            <TableRow
                                                key={booking._id}
                                                booking={booking}
                                                refetch={refetch}
                                                isAdmin={true} // ensures Update button shows
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
                    message="No bookings found yet!"
                    address="/"
                    label="Go Back"
                />
            )}
        </>
    )
}

export default AdminManageBookings



// import { Helmet } from 'react-helmet-async'
// import useAuth from '../../../hooks/useAuth'
// import { useQuery } from '@tanstack/react-query'
// import { getAdminBookings, getHostBookings } from '../../../api/bookings'
// import Loader from '../../../components/Shared/Loader'

// import EmptyState from '../../../components/Shared/EmptyState'
// import TableRow from '../../../components/Dashboard/TableRows/TableRows'

// const AdminManageBookings = () => {
//     const { user, loading } = useAuth()
//     const {
//         data: bookings = [],
//         isLoading,
//         refetch,
//     } = useQuery({
//         queryKey: ['admin-bookings'],
//         queryFn: async () => {
//             const res = await getAdminBookings()
//             return res?.data || []
//         },
//     })

//     console.log(bookings)
//     if (isLoading) return <Loader />

//     return (
//         <>
//             <Helmet>
//                 <title>Manage Bookings</title>
//             </Helmet>
//             {bookings && Array.isArray(bookings) && bookings.length > 0 ? (
//                 <div className='container mx-auto px-4 sm:px-8'>
//                     <div className='py-8'>
//                         <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
//                             <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
//                                 <table className='min-w-full leading-normal'>
//                                     <thead>
//                                         <tr>
//                                             <th
//                                                 scope='col'
//                                                 className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
//                                             >
//                                                 Title
//                                             </th>
//                                             <th
//                                                 scope='col'
//                                                 className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
//                                             >
//                                                 Guest Info
//                                             </th>
//                                             <th
//                                                 scope='col'
//                                                 className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
//                                             >
//                                                 Price
//                                             </th>
//                                             <th
//                                                 scope='col'
//                                                 className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
//                                             >
//                                                 From
//                                             </th>
//                                             <th
//                                                 scope='col'
//                                                 className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
//                                             >
//                                                 To
//                                             </th>
//                                             <th
//                                                 scope='col'
//                                                 className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
//                                             >
//                                                 Action
//                                             </th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         {/* Table row data */}{' '}
//                                         {bookings &&
//                                             bookings.map(booking => (
//                                                 <TableRow key={booking._id} booking={booking}
//                                                     refetch={refetch} isAdmin={true} />
//                                             ))}
//                                     </tbody>
//                                 </table>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             ) : (
//                 <EmptyState
//                     message='No one booked your vehicle yet, you will find deals soon!'
//                     address='/'
//                     label='Go Back'
//                 />
//             )}
//         </>
//     )
// }

// export default AdminManageBookings