import { Helmet } from 'react-helmet-async'
import { useQuery, useMutation } from '@tanstack/react-query'
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
    const {
        data: vehicles = [],
        isLoading,
        refetch,
        error
    } = useQuery({
        queryKey: ['pending-vehicles'],
        queryFn: async () => {
            console.log('🔍 Fetching pending vehicles...');
            const res = await getPendingVehicles()
            console.log('📊 Pending vehicles response:', res);
            return res?.data || []
        },
    })

    // Debug: Log vehicles data
    console.log('🚗 Vehicles in component:', vehicles);
    console.log('📝 Vehicles length:', vehicles.length);
    console.log('⏳ Is loading:', isLoading);
    console.log('❌ Error:', error);

    // Approve vehicle mutation
    const approveMutation = useMutation({
        mutationFn: approveVehicle,
        onSuccess: () => {
            toast.success('Vehicle approved successfully!')
            refetch()
        },
        onError: (error) => {
            console.log('❌ Approve error:', error);
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
            console.log('❌ Update error:', error);
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
            console.log('❌ Delete error:', error);
            toast.error(error.response?.data?.message || 'Failed to delete vehicle')
        },
    })

    const handleApproveVehicle = (id) => {
        console.log('✅ Approving vehicle:', id);
        approveMutation.mutate(id)
    }

    const handleUpdateVehicle = (id, data) => {
        console.log('📝 Updating vehicle:', id, data);
        updateMutation.mutate({ id, data })
    }

    const handleDeleteVehicle = (id) => {
        if (window.confirm('Are you sure you want to delete this vehicle?')) {
            console.log('🗑️ Deleting vehicle:', id);
            deleteMutation.mutate(id)
        }
    }

    if (isLoading) return <Loader />

    return (
        <>
            <Helmet>
                <title>Approve Vehicles - Admin</title>
            </Helmet>

            <div className="container mx-auto px-4 sm:px-8">
                <div className="py-8">
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
                        <h2 className="text-2xl font-semibold leading-tight">
                            Vehicles Awaiting Approval ({vehicles.length})
                        </h2>

                        {/* Debug Info */}
                        <div className="text-sm text-gray-500 mt-2">
                            Debug: {isLoading ? 'Loading...' : `${vehicles.length} vehicles found`}
                            {error && <div className="text-red-500">Error: {error.message}</div>}
                        </div>
                    </div>

                    {vehicles && vehicles.length > 0 ? (
                        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                                <table className="min-w-full leading-normal">
                                    <thead className="hidden md:table-header-group">
                                        <tr>
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                Vehicle
                                            </th>
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                Host
                                            </th>
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                Category
                                            </th>
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                Price
                                            </th>
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                Location
                                            </th>
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                Added On
                                            </th>
                                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
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
                        <div>
                            <EmptyState
                                message="No pending vehicles found!"
                                address="/admin/manage-vehicles"
                                label="Manage Vehicles"
                            />

                            {/* Debug section */}
                            <div className="mt-4 p-4 bg-gray-100 rounded text-sm">
                                <h3 className="font-bold">Debug Info:</h3>
                                <p>Vehicles array: {JSON.stringify(vehicles)}</p>
                                <p>Is loading: {isLoading.toString()}</p>
                                <p>Error: {error?.message || 'None'}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default AdminApproveVehicles