import { Helmet } from 'react-helmet-async'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import {
    getAdminVehicles,
    updateVehicleByAdmin,
    softDeleteVehicle
} from '../../../api/vehicles'
import Loader from '../../../components/Shared/Loader'
import EmptyState from '../../../components/Shared/EmptyState'
import VehicleTableRow from '../../../components/Dashboard/TableRows/VehicleTableRow'

const AdminManageVehicles = () => {
    const [statusFilter, setStatusFilter] = useState('active')
    const [refreshState, setRefreshState] = useState('idle') // idle, refreshing, refreshed
    const queryClient = useQueryClient()

    const {
        data: vehicles = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ['admin-vehicles', statusFilter],
        queryFn: async () => {
            const res = await getAdminVehicles(statusFilter)
            return res?.data || []
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

    if (isLoading) return <Loader />

    return (
        <>
            <Helmet>
                <title>Manage Vehicles - Admin</title>
            </Helmet>

            <div className="container mx-auto px-4 sm:px-8">
                <div className="py-8">
                    <div className="flex flex-col sm:flex-row justify-between items-center ">
                        <div>
                            <h2 className="text-2xl mb-1 font-semibold leading-tight">
                                Manage Vehicles
                            </h2>
                            <p className=' mb-2 tracking-wider text-sm text-gray-700/90'> Manage all the vehicles form one place, edit, delete and check status</p>
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

                        {/* Actions Row */}
                        <div className="flex items-center  gap-3 mt-4 sm:mt-0">
                            {/* Status Filter */}
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="px-4 py-2 border-[1.5px] border-dashed animated-border-3 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="active">Active Vehicles</option>
                                <option value="deleted">Deleted Vehicles</option>
                                <option value="cancelled">Cancelled Vehicles</option>
                            </select>
                            <p className=' tracking-wider border border-l-[10px] animated-border-3 rounded-se-full rounded-ee-full px-4 py-[6px]'>Total Vehicle : {vehicles.length}</p>

                        </div>
                    </div>

                    {vehicles && vehicles.length > 0 ? (
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
                                                Created
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
                                                onUpdate={handleUpdateVehicle}
                                                onDelete={handleDeleteVehicle}
                                                isAdmin={true}
                                                statusFilter={statusFilter}
                                            />
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ) : (
                        <EmptyState
                            message={`No ${statusFilter} vehicles found!`}
                            address="/"
                            label="Go Back"
                        />
                    )}
                </div>
            </div>
        </>
    )
}

export default AdminManageVehicles
