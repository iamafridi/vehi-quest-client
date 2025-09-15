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

    if (isLoading) return <Loader />

    return (
        <>
            <Helmet>
                <title>Manage Vehicles - Admin</title>
            </Helmet>

            <div className="container mx-auto px-4 sm:px-8">
                <div className="py-8">
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
                        <h2 className="text-2xl font-semibold leading-tight">
                            Manage Vehicles ({vehicles.length})
                        </h2>

                        {/* Status Filter */}
                        <div className="mt-4 sm:mt-0">
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="active">Active Vehicles</option>
                                <option value="deleted">Deleted Vehicles</option>
                                <option value="cancelled">Cancelled Vehicles</option>
                            </select>
                        </div>
                    </div>

                    {vehicles && vehicles.length > 0 ? (
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