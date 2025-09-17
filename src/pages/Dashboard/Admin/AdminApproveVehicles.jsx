import { Helmet } from 'react-helmet-async'
import { useQuery, useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import {
    getPendingVehicles,
    approveVehicle,
    updateVehicleByAdmin,
    softDeleteVehicle
} from '../../../api/vehicles'
import Loader from '../../../components/Shared/Loader'
import EmptyState from '../../../components/Shared/EmptyState'
import VehicleTableRow from '../../../components/Dashboard/TableRows/VehicleTableRow'

const AdminApproveVehicles = () => {
    const [refreshState, setRefreshState] = useState('idle') // idle, refreshing, refreshed

    const {
        data: vehicles = [],
        isLoading,
        refetch,
        error
    } = useQuery({
        queryKey: ['pending-vehicles'],
        queryFn: async () => {
            const res = await getPendingVehicles()
            return res?.data || []
        },
    })

    // Approve vehicle mutation
    const approveMutation = useMutation({
        mutationFn: approveVehicle,
        onSuccess: () => {
            toast.success('Vehicle approved successfully!')
            refetch()
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || 'Failed to approve vehicle')
        },
    })

    // Update vehicle mutation
    const updateMutation = useMutation({
        mutationFn: ({ id, data }) => updateVehicleByAdmin(id, data),
        onSuccess: () => {
            toast.success('Vehicle updated successfully!')
            refetch()
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || 'Failed to update vehicle')
        },
    })

    // Delete vehicle mutation
    const deleteMutation = useMutation({
        mutationFn: softDeleteVehicle,
        onSuccess: () => {
            toast.success('Vehicle deleted successfully!')
            refetch()
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || 'Failed to delete vehicle')
        },
    })

    const handleApproveVehicle = (id) => {
        approveMutation.mutate(id)
    }

    const handleUpdateVehicle = (id, data) => {
        updateMutation.mutate({ id, data })
    }

    const handleDeleteVehicle = (id) => {
        if (window.confirm('Are you sure you want to delete this vehicle?')) {
            deleteMutation.mutate(id)
        }
    }

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
                <title>Approve Vehicles - Admin</title>
            </Helmet>

            <div className="container mx-auto px-4 sm:px-8">
                <div className="py-8">
                    <div className="flex flex-col sm:flex-row justify-between items-center">
                        <div>
                            <h2 className="text-2xl mb-1 font-semibold leading-tight">
                                Vehicles Awaiting Approval
                            </h2>
                            <p className="mb-2 tracking-wider text-sm text-gray-700/90">
                                Review pending vehicles and approve, edit, or delete them
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

                        {/* Total Vehicles */}
                        <div className="flex items-center gap-3 mt-4 sm:mt-0">
                            <p className="tracking-wider border border-l-[10px] animated-border-3 rounded-se-full rounded-ee-full px-4 py-[6px]">
                                Pending Vehicles : {vehicles.length}
                            </p>
                        </div>
                    </div>

                    {vehicles && vehicles.length > 0 ? (
                        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                            <div className="inline-block min-w-full shadow rounded-lg animated-border-3 border overflow-hidden">
                                <table className="min-w-full leading-normal">
                                    <thead className="hidden md:table-header-group">
                                        <tr>
                                            <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                                                Vehicle
                                            </th>
                                            <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                                                Host
                                            </th>
                                            <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                                                Category
                                            </th>
                                            <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                                                Price
                                            </th>
                                            <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                                                Location
                                            </th>
                                            <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                                                Status
                                            </th>
                                            <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                                                Added On
                                            </th>
                                            <th className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800 text-left text-sm uppercase font-normal">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {vehicles.map((vehicle) => (
                                            <VehicleTableRow
                                                key={vehicle._id}
                                                vehicle={vehicle}
                                                onApprove={handleApproveVehicle}
                                                onUpdate={handleUpdateVehicle}
                                                onDelete={handleDeleteVehicle}
                                                isAdmin={true}
                                                isPending={true}
                                            />
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ) : (
                        <EmptyState
                            message="No pending vehicles found!"
                            address="/admin/manage-vehicles"
                            label="Manage Vehicles"
                        />
                    )}
                </div>
            </div>
        </>
    )
}

export default AdminApproveVehicles
