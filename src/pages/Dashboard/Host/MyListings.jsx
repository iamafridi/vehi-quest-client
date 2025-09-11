import { Helmet } from 'react-helmet-async'
import useAuth from '../../../hooks/useAuth'
import VehicleDataRow from '../../../components/Dashboard/TableRows/VehicleDataRow'
import { deleteVehicle, getHostVehicles, updateVehicle } from '../../../api/vehicles'
import EmptyState from '../../../components/Shared/EmptyState'
import { useQuery } from '@tanstack/react-query'
import Loader from '../../../components/Shared/Loader'
import { useState } from 'react'
import DeleteModal from '../../../components/Modal/DeleteModal'
import UpdateVehicleModal from '../../../components/Modal/UpdateVehicleModal'

const MyListings = () => {
    const { user, loading } = useAuth()
    const [clicked, setClicked] = useState(false)

    // 🔹 Modal states
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)
    const [isUpdateOpen, setIsUpdateOpen] = useState(false)
    const [selectedVehicle, setSelectedVehicle] = useState(null)

    // Delete vehicle function
    // const deleteVehicle = async (vehicleId, refetch) => {
    //     try {
    //         const response = await fetch(`http://localhost:5000/vehicles/${vehicleId}`, {
    //             method: 'DELETE',
    //             credentials: 'include',
    //             headers: { 'Content-Type': 'application/json' },
    //         })

    //         if (!response.ok) {
    //             const errorData = await response.json().catch(() => ({ message: 'Unknown error' }))
    //             throw new Error(errorData.message || `Failed to delete vehicle (${response.status})`)
    //         }

    //         await response.json()
    //         refetch()
    //     } catch (error) {
    //         console.error('Error deleting vehicle:', error)
    //         throw error
    //     }
    // }

    // Update vehicle function
    // const updateVehicle = async (vehicleId, vehicleData, refetch) => {
    //     try {
    //         const response = await fetch(`http://localhost:5000/vehicles/${vehicleId}`, {
    //             method: 'PUT',
    //             credentials: 'include',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify(vehicleData),
    //         })

    //         if (!response.ok) {
    //             const errorData = await response.json().catch(() => ({ message: 'Unknown error' }))
    //             throw new Error(errorData.message || `Failed to update vehicle (${response.status})`)
    //         }

    //         await response.json()
    //         refetch()
    //     } catch (error) {
    //         console.error('Error updating vehicle:', error)
    //         throw error
    //     }
    // }

    const {
        refetch,
        data: vehicles = [],
        isLoading,
        error,
        isError,
    } = useQuery({
        queryKey: ['vehicles', user?.email],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            try {
                return await getHostVehicles(user?.email)
            } catch (error) {
                console.error('API Error:', error)
                throw error
            }
        },
        retry: 2,
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
    })

    // Loading state
    if (loading || isLoading) {
        return <Loader />
    }

    // Error state
    if (isError) {
        return (
            <>
                <Helmet>
                    <title>My Listings | Dashboard</title>
                </Helmet>
                <div className="container mx-auto px-4 sm:px-8">
                    <div className="py-8">
                        <div className="bg-red-50 border border-red-200 rounded-md p-4">
                            <h3 className="text-sm font-medium text-red-800">Error Loading Vehicles</h3>
                            <p className="mt-2 text-sm text-red-700">
                                {error?.message || 'Something went wrong while loading your vehicles.'}
                            </p>
                            <button
                                onClick={() => refetch()}
                                className="mt-4 bg-red-100 hover:bg-red-200 text-red-800 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                            >
                                Try Again
                            </button>
                        </div>
                    </div>
                </div>
            </>
        )
    }

    // Not logged in
    if (!user) {
        return (
            <>
                <Helmet>
                    <title>My Listings | Dashboard</title>
                </Helmet>
                <EmptyState
                    message="Please log in to view your vehicle listings"
                    address="/login"
                    label="Go to Login"
                />
            </>
        )
    }

    return (
        <>
            <Helmet>
                <title>My Listings | Dashboard</title>
            </Helmet>

            {Array.isArray(vehicles) && vehicles.length > 0 ? (
                <div className="container mx-auto sm:px-8">
                    <div className="py-4">
                        {/* Header */}
                        <div className="mb-4 font-[font2]">
                            <h1 className="text-2xl font-semibold text-gray-900">My Vehicle Listings</h1>
                            <p className="mt-1 text-sm font-[font1] tracking-wide text-gray-600">
                                Manage your vehicle listings and track their performance
                            </p>
                        </div>

                        {/* Refresh + Summary Row */}
                        <div className="mb-4 flex items-center justify-between">
                            {/* Refresh Button */}
                            <button
                                onClick={() => {
                                    setClicked(true)
                                    refetch()
                                    setTimeout(() => setClicked(false), 1500)
                                }}
                                disabled={isLoading}
                                className="bg-blue-900/90 font-[font1] tracking-wider hover:bg-red-900/70 
               disabled:bg-blue-300 text-white px-4 py-2 rounded-md text-sm 
               font-medium transition-colors duration-200"
                            >
                                {isLoading ? 'Refreshing...' : clicked ? 'Refreshed' : 'Refresh'}
                            </button>

                            {/* Summary */}
                            <div className="text-sm font-[font1] tracking-wider bg-blue-900/90 text-gray-100 border-l-[18px] animated-border-3 p-2 rounded-e-full">
                                Showing {vehicles.length} vehicle{vehicles.length !== 1 ? 's' : ''}
                            </div>
                        </div>


                        {/* Table */}
                        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                            <div className="inline-block min-w-full shadow rounded-lg border overflow-hidden">
                                <table className="min-w-full leading-normal">
                                    <thead>
                                        <tr className="font-[font1]">
                                            <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">Title</th>
                                            <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">Location</th>
                                            <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">Price</th>
                                            <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">From</th>
                                            <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">To</th>
                                            <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">Delete</th>
                                            <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">Update</th>
                                        </tr>
                                    </thead>
                                    <tbody className="font-[font2] uppercase">
                                        {vehicles.map((vehicle, index) => (
                                            <VehicleDataRow
                                                key={vehicle._id || `vehicle-${index}`}
                                                vehicle={vehicle}
                                                refetch={refetch}
                                                deleteVehicle={() => {
                                                    setSelectedVehicle(vehicle)
                                                    setIsDeleteOpen(true)
                                                }}
                                                updateVehicle={() => {
                                                    setSelectedVehicle(vehicle)
                                                    setIsUpdateOpen(true)
                                                }}
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
                    message="Add at least a vehicle before coming here 🥴"
                    address="/dashboard/add-vehicle"
                    label="Add Vehicles"
                />
            )}

            {/* 🔹 Delete Modal */}
            {selectedVehicle && (
                <DeleteModal
                    isOpen={isDeleteOpen}
                    closeModal={() => setIsDeleteOpen(false)}
                    id={selectedVehicle._id}
                    modalHandler={async (id) => {
                        await deleteVehicle(id, refetch)
                        setIsDeleteOpen(false)
                    }}
                />
            )}

            {/* 🔹 Update Modal */}
            {selectedVehicle && (
                <UpdateVehicleModal
                    isOpen={isUpdateOpen}
                    setIsEditModalOpen={setIsUpdateOpen}
                    refetch={refetch}
                    vehicle={selectedVehicle}
                    id={selectedVehicle._id}
                    updateVehicle={updateVehicle}
                />
            )}
        </>
    )
}

export default MyListings


// import { Helmet } from 'react-helmet-async'
// import useAuth from '../../../hooks/useAuth'
// import VehicleDataRow from '../../../components/Dashboard/TableRows/VehicleDataRow'
// import { getHostVehicles } from '../../../api/vehicles'
// import EmptyState from '../../../components/Shared/EmptyState'
// import { useQuery } from '@tanstack/react-query'
// import Loader from '../../../components/Shared/Loader'
// import { useState } from 'react'

// const MyListings = () => {
//     const { user, loading } = useAuth()

//     const [clicked, setClicked] = useState(false);

//     // Delete vehicle function
//     const deleteVehicle = async (vehicleId, refetch) => {
//         try {
//             const response = await fetch(`http://localhost:5000/vehicles/${vehicleId}`, {
//                 method: 'DELETE',
//                 credentials: 'include',
//                 headers: { 'Content-Type': 'application/json' },
//             })

//             if (!response.ok) {
//                 const errorData = await response.json().catch(() => ({ message: 'Unknown error' }))
//                 throw new Error(errorData.message || `Failed to delete vehicle (${response.status})`)
//             }

//             await response.json()
//             refetch() // 🔄 auto refresh after delete
//         } catch (error) {
//             console.error('Error deleting vehicle:', error)
//             throw error
//         }
//     }

//     // Update vehicle function
//     const updateVehicle = async (vehicleId, vehicleData, refetch) => {
//         try {
//             const response = await fetch(`http://localhost:5000/vehicles/${vehicleId}`, {
//                 method: 'PUT',
//                 credentials: 'include',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(vehicleData), // ✅ only updates when user gives data
//             })

//             if (!response.ok) {
//                 const errorData = await response.json().catch(() => ({ message: 'Unknown error' }))
//                 throw new Error(errorData.message || `Failed to update vehicle (${response.status})`)
//             }

//             await response.json()
//             refetch() // 🔄 auto refresh after update
//         } catch (error) {
//             console.error('Error updating vehicle:', error)
//             throw error
//         }
//     }
//     // const {
//     //     refetch,
//     //     data: vehicles = [],
//     //     isLoading,
//     //     error,
//     //     isError,
//     // } = useQuery({
//     //     queryKey: ['vehicles', user?.email],
//     //     enabled: !loading && !!user?.email,
//     //     queryFn: () => getHostVehicles(user?.email),
//     //     retry: 2,
//     //     staleTime: 5 * 60 * 1000,
//     //     refetchOnWindowFocus: false,
//     // })

//     const {
//         refetch,
//         data: vehicles = [],
//         isLoading,
//         error,
//         isError,
//     } = useQuery({
//         queryKey: ['vehicles', user?.email],
//         enabled: !loading && !!user?.email,
//         queryFn: async () => {
//             try {
//                 return await getHostVehicles(user?.email)
//             } catch (error) {
//                 console.error('API Error:', error)
//                 throw error
//             }
//         },
//         retry: 2,
//         staleTime: 5 * 60 * 1000,
//         refetchOnWindowFocus: false,
//     })

//     // Loading state
//     if (loading || isLoading) {
//         return <Loader />
//     }

//     // Error state
//     if (isError) {
//         return (
//             <>
//                 <Helmet>
//                     <title>My Listings | Dashboard</title>
//                 </Helmet>
//                 <div className="container mx-auto px-4 sm:px-8">
//                     <div className="py-8">
//                         <div className="bg-red-50 border border-red-200 rounded-md p-4">
//                             <h3 className="text-sm font-medium text-red-800">Error Loading Vehicles</h3>
//                             <p className="mt-2 text-sm text-red-700">
//                                 {error?.message || 'Something went wrong while loading your vehicles.'}
//                             </p>
//                             <button
//                                 onClick={() => refetch()}
//                                 className="mt-4 bg-red-100 hover:bg-red-200 text-red-800 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
//                             >
//                                 Try Again
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </>
//         )
//     }

//     // Not logged in
//     if (!user) {
//         return (
//             <>
//                 <Helmet>
//                     <title>My Listings | Dashboard</title>
//                 </Helmet>
//                 <EmptyState
//                     message="Please log in to view your vehicle listings"
//                     address="/login"
//                     label="Go to Login"
//                 />
//             </>
//         )
//     }

//     return (
//         <>
//             <Helmet>
//                 <title>My Listings | Dashboard</title>
//             </Helmet>

//             {Array.isArray(vehicles) && vehicles.length > 0 ? (
//                 <div className="container mx-auto  sm:px-8">
//                     <div className="py-4">
//                         {/* Header */}
//                         <div className="mb-4 font-[font2]">
//                             <h1 className="text-2xl font-semibold text-gray-900">My Vehicle Listings</h1>
//                             <p className="mt-1 text-sm font-[font1] tracking-wide text-gray-600">
//                                 Manage your vehicle listings and track their performance
//                             </p>
//                         </div>

//                         {/* Refresh button (kept as you wanted) */}
//                         <div className="mb-1">
//                             <button
//                                 onClick={() => {
//                                     setClicked(true);            // show feedback
//                                     refetch();                   // refresh data
//                                     setTimeout(() => setClicked(false), 1500); // reset text after 1.5s
//                                 }}
//                                 disabled={isLoading}
//                                 className="bg-blue-900/90 font-[font1] tracking-wider hover:bg-red-900/70 disabled:bg-blue-300 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
//                             >
//                                 {isLoading ? 'Refreshing...' : clicked ? 'Refreshed' : 'Refresh'}
//                             </button>
//                         </div>

//                         {/* Table */}
//                         <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto ">
//                             <div className="inline-block min-w-full shadow rounded-lg animated-border-3 border overflow-hidden ">
//                                 <table className="min-w-full leading-normal">
//                                     <thead>
//                                         <tr className='font-[font1]'>
//                                             <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">Title</th>
//                                             <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">Location</th>
//                                             <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">Price</th>
//                                             <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">From</th>
//                                             <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">To</th>
//                                             <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">Delete</th>
//                                             <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">Update</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody className='font-[font2] uppercase'>
//                                         {vehicles.map((vehicle, index) => (
//                                             <VehicleDataRow
//                                                 key={vehicle._id || `vehicle-${index}`}
//                                                 vehicle={vehicle}
//                                                 refetch={refetch}
//                                                 deleteVehicle={(id) => deleteVehicle(id, refetch)}
//                                                 updateVehicle={(id, data) => updateVehicle(id, data, refetch)}
//                                             />
//                                         ))}
//                                     </tbody>
//                                 </table>
//                             </div>
//                         </div>

//                         {/* Summary */}
//                         <div className="mt-4 text-sm text-gray-600 border-l-4 p-3 animated-border-3 rounded-xl">
//                             Showing {vehicles.length} vehicle{vehicles.length !== 1 ? 's' : ''}
//                         </div>
//                     </div>
//                 </div>
//             ) : (
//                 <EmptyState
//                     message="Add at least a vehicle before coming here 🥴"
//                     address="/dashboard/add-vehicle"
//                     label="Add Vehicles"
//                 />
//             )}
//         </>
//     )
// }

// export default MyListings
