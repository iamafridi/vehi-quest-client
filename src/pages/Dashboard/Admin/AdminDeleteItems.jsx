import { Helmet } from 'react-helmet-async'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState, Fragment } from 'react'
import { toast } from 'react-hot-toast'
import { format } from 'date-fns'
import {
    getAdminVehicles,
    restoreVehicle,
    permanentDeleteVehicle
} from '../../../api/vehicles'
import {
    getDeletedBookings,
    restoreBooking,
    permanentDeleteBooking
} from '../../../api/bookings'
import Loader from '../../../components/Shared/Loader'
import EmptyState from '../../../components/Shared/EmptyState'
import { Dialog, Transition } from '@headlessui/react'

const AdminDeletedItems = () => {
    const [activeTab, setActiveTab] = useState('vehicles')
    const queryClient = useQueryClient()

    // State for confirmation modal
    const [confirmModal, setConfirmModal] = useState({
        isOpen: false,
        type: null, // 'restoreVehicle', 'deleteVehicle', 'restoreBooking', 'deleteBooking'
        id: null,
        title: '',
        message: '',
        confirmText: '',
        variant: 'warning' // 'warning', 'danger', 'info'
    })

    // Fetch deleted vehicles
    const {
        data: deletedVehicles = [],
        isLoading: vehiclesLoading,
        refetch: refetchVehicles,
    } = useQuery({
        queryKey: ['admin-deleted-vehicles'],
        queryFn: async () => {
            const res = await getAdminVehicles('deleted')
            return res?.data || []
        },
    })

    // Fetch deleted bookings
    const {
        data: deletedBookings = [],
        isLoading: bookingsLoading,
        refetch: refetchBookings,
    } = useQuery({
        queryKey: ['admin-deleted-bookings'],
        queryFn: async () => {
            const res = await getDeletedBookings()
            return res?.data || []
        },
    })

    // Vehicle mutations
    const restoreVehicleMutation = useMutation({
        mutationFn: restoreVehicle,
        onSuccess: () => {
            toast.success('Vehicle restored successfully!')
            refetchVehicles()
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || 'Failed to restore vehicle')
        },
    })

    const permanentDeleteVehicleMutation = useMutation({
        mutationFn: permanentDeleteVehicle,
        onSuccess: () => {
            toast.success('Vehicle permanently deleted!')
            refetchVehicles()
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || 'Failed to permanently delete vehicle')
        },
    })

    // Booking mutations
    const restoreBookingMutation = useMutation({
        mutationFn: restoreBooking,
        onSuccess: () => {
            toast.success('Booking restored successfully!')
            refetchBookings()
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || 'Failed to restore booking')
        },
    })

    const permanentDeleteBookingMutation = useMutation({
        mutationFn: permanentDeleteBooking,
        onSuccess: () => {
            toast.success('Booking permanently deleted!')
            refetchBookings()
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || 'Failed to permanently delete booking')
        },
    })

    // Confirmation Modal Handler
    const handleConfirmAction = () => {
        const { type, id } = confirmModal
        setConfirmModal(prev => ({ ...prev, isOpen: false }))

        switch (type) {
            case 'restoreVehicle':
                restoreVehicleMutation.mutate(id)
                break
            case 'deleteVehicle':
                permanentDeleteVehicleMutation.mutate(id)
                break
            case 'restoreBooking':
                restoreBookingMutation.mutate(id)
                break
            case 'deleteBooking':
                permanentDeleteBookingMutation.mutate(id)
                break
            default:
                break
        }
    }

    // Handlers to open modal
    const handleRestoreVehicle = (id, title = "this vehicle") => {
        setConfirmModal({
            isOpen: true,
            type: 'restoreVehicle',
            id,
            title: 'Restore Vehicle?',
            message: `Are you sure you want to restore ${title}? It will become active again in the system.`,
            confirmText: 'Yes, Restore',
            variant: 'info'
        })
    }

    const handlePermanentDeleteVehicle = (id, title = "this vehicle") => {
        setConfirmModal({
            isOpen: true,
            type: 'deleteVehicle',
            id,
            title: 'Permanently Delete Vehicle?',
            message: `Are you sure you want to PERMANENTLY delete ${title}? This action cannot be undone! All data will be lost.`,
            confirmText: 'Yes, Delete Forever',
            variant: 'danger'
        })
    }

    const handleRestoreBooking = (id, title = "this booking") => {
        setConfirmModal({
            isOpen: true,
            type: 'restoreBooking',
            id,
            title: 'Restore Booking?',
            message: `Are you sure you want to restore ${title}? The guest will be notified and the dates will become unavailable again.`,
            confirmText: 'Yes, Restore',
            variant: 'info'
        })
    }

    const handlePermanentDeleteBooking = (id, title = "this booking") => {
        setConfirmModal({
            isOpen: true,
            type: 'deleteBooking',
            id,
            title: 'Permanently Delete Booking?',
            message: `Are you sure you want to PERMANENTLY delete ${title}? This cannot be undone.`,
            confirmText: 'Yes, Delete Forever',
            variant: 'danger'
        })
    }

    if (vehiclesLoading || bookingsLoading) return <Loader />

    const VehicleCard = ({ vehicle }) => (
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex items-start space-x-4">
                <img
                    src={vehicle.image}
                    alt={vehicle.title}
                    className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                />
                <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{vehicle.title}</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                        <div>
                            <span className="font-medium">Host:</span> {vehicle.host?.name}
                        </div>
                        <div>
                            <span className="font-medium">Price:</span> ${vehicle.price}
                        </div>
                        <div>
                            <span className="font-medium">Category:</span> {vehicle.category}
                        </div>
                        <div>
                            <span className="font-medium">Location:</span> {vehicle.location}
                        </div>
                        <div>
                            <span className="font-medium">Deleted:</span>
                            {vehicle.deletedAt ? format(new Date(vehicle.deletedAt), 'PP') : 'N/A'}
                        </div>
                        <div>
                            <span className="font-medium">Deleted by:</span> {vehicle.deletedBy}
                        </div>
                    </div>
                    <div className="flex space-x-3">
                        <button
                            onClick={() => handleRestoreVehicle(vehicle._id, vehicle.title)}
                            disabled={restoreVehicleMutation.isLoading}
                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium disabled:opacity-50"
                        >
                            {restoreVehicleMutation.isLoading ? 'Restoring...' : 'Restore'}
                        </button>
                        <button
                            onClick={() => handlePermanentDeleteVehicle(vehicle._id, vehicle.title)}
                            disabled={permanentDeleteVehicleMutation.isLoading}
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium disabled:opacity-50"
                        >
                            {permanentDeleteVehicleMutation.isLoading ? 'Deleting...' : 'Delete Forever'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )

    const BookingCard = ({ booking }) => (
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{booking.vehicleTitle || 'Vehicle Booking'}</h3>
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                    <div>
                        <span className="font-medium">Guest:</span> {booking.guest?.name}
                    </div>
                    <div>
                        <span className="font-medium">Email:</span> {booking.guest?.email}
                    </div>
                    <div>
                        <span className="font-medium">Host:</span> {booking.host}
                    </div>
                    <div>
                        <span className="font-medium">Price:</span> ${booking.price}
                    </div>
                    <div>
                        <span className="font-medium">From:</span>
                        {booking.from ? format(new Date(booking.from), 'PP') : 'N/A'}
                    </div>
                    <div>
                        <span className="font-medium">To:</span>
                        {booking.to ? format(new Date(booking.to), 'PP') : 'N/A'}
                    </div>
                    <div>
                        <span className="font-medium">Status:</span>
                        <span className={`ml-2 px-2 py-1 rounded-full text-xs ${booking.status === 'cancelled'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-gray-100 text-gray-800'
                            }`}>
                            {booking.status || 'Unknown'}
                        </span>
                    </div>
                    <div>
                        <span className="font-medium">Transaction:</span> {booking.transactionId}
                    </div>
                </div>
                {booking.deletedAt && (
                    <div className="text-sm text-gray-600 mb-4">
                        <div><span className="font-medium">Deleted:</span> {format(new Date(booking.deletedAt), 'PP')}</div>
                        <div><span className="font-medium">Deleted by:</span> {booking.deletedBy}</div>
                    </div>
                )}
                <div className="flex space-x-3">
                    <button
                        onClick={() => handleRestoreBooking(booking._id, `"${booking.vehicleTitle}" booking`)}
                        disabled={restoreBookingMutation.isLoading}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium disabled:opacity-50"
                    >
                        {restoreBookingMutation.isLoading ? 'Restoring...' : 'Restore'}
                    </button>
                    <button
                        onClick={() => handlePermanentDeleteBooking(booking._id, `"${booking.vehicleTitle}" booking`)}
                        disabled={permanentDeleteBookingMutation.isLoading}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium disabled:opacity-50"
                    >
                        {permanentDeleteBookingMutation.isLoading ? 'Deleting...' : 'Delete Forever'}
                    </button>
                </div>
            </div>
        </div>
    )

    return (
        <>
            <Helmet>
                <title>Deleted Items - Admin</title>
            </Helmet>

            <div className="container mx-auto px-4 sm:px-8">
                <div className="py-8">
                    <h2 className="text-2xl font-semibold leading-tight mb-6">
                        Deleted Items Management
                    </h2>

                    {/* Tab Navigation */}
                    <div className="flex space-x-1 mb-6">
                        <button
                            onClick={() => setActiveTab('vehicles')}
                            className={`px-6 py-3 rounded-lg font-medium transition-colors ${activeTab === 'vehicles'
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            Deleted Vehicles ({deletedVehicles.length})
                        </button>
                        <button
                            onClick={() => setActiveTab('bookings')}
                            className={`px-6 py-3 rounded-lg font-medium transition-colors ${activeTab === 'bookings'
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            Cancelled Bookings ({deletedBookings.length})
                        </button>
                    </div>

                    {/* Tab Content */}
                    {activeTab === 'vehicles' ? (
                        deletedVehicles.length > 0 ? (
                            <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
                                {deletedVehicles.map((vehicle) => (
                                    <VehicleCard key={vehicle._id} vehicle={vehicle} />
                                ))}
                            </div>
                        ) : (
                            <EmptyState
                                message="No deleted vehicles found!"
                                address="/admin/manage-vehicles"
                                label="Manage Vehicles"
                            />
                        )
                    ) : (
                        deletedBookings.length > 0 ? (
                            <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
                                {deletedBookings.map((booking) => (
                                    <BookingCard key={booking._id} booking={booking} />
                                ))}
                            </div>
                        ) : (
                            <EmptyState
                                message="No cancelled bookings found!"
                                address="/admin/manage-bookings"
                                label="Manage Bookings"
                            />
                        )
                    )}
                </div>
            </div>
        </>
    );
}

export default AdminDeletedItems