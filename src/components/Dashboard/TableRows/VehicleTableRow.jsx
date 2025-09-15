import { useState } from 'react';
import { format } from 'date-fns';
import {
    restoreVehicle,
    permanentDeleteVehicle
} from '../../../api/vehicles';
import { toast } from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import UpdateVehicleModal from '../../Modal/UpdateVehicleModal';
import DeleteModal from '../../Modal/DeleteModal';

const VehicleTableRow = ({
    vehicle,
    onUpdate,
    onDelete,
    onApprove,
    isAdmin = false,
    statusFilter = 'active',
    isPending = false
}) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isRestoreModalOpen, setIsRestoreModalOpen] = useState(false); // New state for restore modal

    const queryClient = useQueryClient();

    // Restore vehicle mutation
    const restoreMutation = useMutation({
        mutationFn: restoreVehicle,
        onSuccess: () => {
            toast.success('Vehicle restored successfully!');
            queryClient.invalidateQueries(['admin-vehicles']);
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || 'Failed to restore vehicle');
        },
    });

    // Permanent delete mutation
    const permanentDeleteMutation = useMutation({
        mutationFn: permanentDeleteVehicle,
        onSuccess: () => {
            toast.success('Vehicle permanently deleted!');
            queryClient.invalidateQueries(['admin-vehicles']);
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || 'Failed to permanently delete vehicle');
        },
    });

    // Handler for soft delete (sends to trash)
    const handleDelete = () => {
        onDelete(vehicle._id);
        closeDeleteModal();
    };

    // Handler for permanent delete
    const handlePermanentDelete = () => {
        permanentDeleteMutation.mutate(vehicle._id);
        closeDeleteModal();
    };

    // Handler for restore
    const handleRestore = () => {
        restoreMutation.mutate(vehicle._id);
        closeRestoreModal();
    };

    // Open/close modals
    const openEditModal = () => setIsEditModalOpen(true);
    const closeEditModal = () => setIsEditModalOpen(false);

    const openDeleteModal = () => setIsDeleteModalOpen(true);
    const closeDeleteModal = () => setIsDeleteModalOpen(false);

    // New handlers for restore modal
    const openRestoreModal = () => setIsRestoreModalOpen(true);
    const closeRestoreModal = () => setIsRestoreModalOpen(false);


    const getStatusBadge = (vehicle) => {
        if (vehicle.isDeleted) {
            return <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">Deleted</span>;
        }
        if (vehicle.status === 'pending') {
            return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">Pending</span>;
        }
        if (vehicle.soldOut) {
            return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">Sold Out</span>;
        }
        if (vehicle.status === 'cancelled') {
            return <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">Cancelled</span>;
        }
        return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Active</span>;
    };

    return (
        <>
            {/* Desktop View */}
            <tr className="hidden md:table-row">
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div className="flex items-center">
                        <div className="flex-shrink-0 w-10 h-10">
                            <img
                                className="w-full h-full rounded-lg object-cover"
                                src={vehicle?.image}
                                alt={vehicle?.title}
                            />
                        </div>
                        <div className="ml-3">
                            <p className="text-gray-900 whitespace-no-wrap font-semibold">
                                {vehicle?.title}
                            </p>
                        </div>
                    </div>
                </td>

                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div className="text-gray-900 whitespace-no-wrap">
                        <p className="font-medium">{vehicle?.host?.name}</p>
                        <p className="text-gray-500 text-xs">{vehicle?.host?.email}</p>
                    </div>
                </td>

                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                        {vehicle?.category}
                    </span>
                </td>

                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap font-medium">
                        ${vehicle?.price}
                    </p>
                </td>

                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                        {vehicle?.location}
                    </p>
                </td>

                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {getStatusBadge(vehicle)}
                </td>

                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p className="text-gray-900 whitespace-no-wrap">
                        {vehicle?.createdAt ? format(new Date(vehicle.createdAt), 'PP') : 'N/A'}
                    </p>
                </td>

                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <div className="flex space-x-2">
                        {isPending ? (
                            // Actions for pending vehicles
                            <>
                                <button
                                    onClick={() => onApprove(vehicle._id)}
                                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded text-xs"
                                >
                                    Approve
                                </button>
                                <button
                                    onClick={openEditModal}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-xs"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={openDeleteModal}
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-xs"
                                >
                                    Delete
                                </button>
                            </>
                        ) : statusFilter === 'deleted' ? (
                            // Actions for deleted vehicles
                            <>
                                <button
                                    onClick={openRestoreModal}
                                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded text-xs disabled:opacity-50"
                                >
                                    Restore
                                </button>
                                <button
                                    onClick={openDeleteModal}
                                    className="bg-red-600 hover:bg-red-800 text-white font-bold py-1 px-3 rounded text-xs disabled:opacity-50"
                                >
                                    Delete Forever
                                </button>
                            </>
                        ) : (
                            // Actions for active vehicles
                            <>
                                <button
                                    onClick={openEditModal}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-xs"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={openDeleteModal}
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded text-xs"
                                >
                                    Delete
                                </button>
                            </>
                        )}
                    </div>
                </td>
            </tr>

            {/* Mobile View */}
            <tr className="md:hidden">
                <td colSpan="8" className="px-5 py-5 border-b border-gray-200 bg-white">
                    <div className="bg-white rounded-lg shadow-sm border p-4 space-y-3">
                        <div className="flex items-start space-x-3">
                            <img
                                className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                                src={vehicle?.image}
                                alt={vehicle?.title}
                            />
                            <div className="flex-1 min-w-0">
                                <h3 className="text-lg font-semibold text-gray-900 truncate">
                                    {vehicle?.title}
                                </h3>
                                <p className="text-sm text-gray-500">{vehicle?.category}</p>
                                <div className="mt-1">{getStatusBadge(vehicle)}</div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <span className="font-medium text-gray-600">Price:</span>
                                <span className="ml-1 text-gray-900">${vehicle?.price}</span>
                            </div>
                            <div>
                                <span className="font-medium text-gray-600">Location:</span>
                                <span className="ml-1 text-gray-900">{vehicle?.location}</span>
                            </div>
                            <div>
                                <span className="font-medium text-gray-600">Host:</span>
                                <span className="ml-1 text-gray-900">{vehicle?.host?.name}</span>
                            </div>
                            <div>
                                <span className="font-medium text-gray-600">Created:</span>
                                <span className="ml-1 text-gray-900">
                                    {vehicle?.createdAt ? format(new Date(vehicle.createdAt), 'PP') : 'N/A'}
                                </span>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2 pt-2">
                            {isPending ? (
                                <>
                                    <button
                                        onClick={() => onApprove(vehicle._id)}
                                        className="flex-1 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Approve
                                    </button>
                                    <button
                                        onClick={openEditModal}
                                        className="flex-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={openDeleteModal}
                                        className="flex-1 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Delete
                                    </button>
                                </>
                            ) : statusFilter === 'deleted' ? (
                                <>
                                    <button
                                        onClick={openRestoreModal}
                                        className="flex-1 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
                                    >
                                        Restore
                                    </button>
                                    <button
                                        onClick={openDeleteModal}
                                        className="flex-1 bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
                                    >
                                        Delete Forever
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        onClick={openEditModal}
                                        className="flex-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={openDeleteModal}
                                        className="flex-1 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Delete
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </td>
            </tr>

            {/* Update Vehicle Modal */}
            <UpdateVehicleModal
                isOpen={isEditModalOpen}
                setIsEditModalOpen={setIsEditModalOpen}
                vehicle={vehicle}
                id={vehicle._id}
                isAdmin={true}
                refetch={() => queryClient.invalidateQueries(['admin-vehicles', 'pending-vehicles'])}
            />

            {/* Delete Vehicle Modal */}
            <DeleteModal
                isOpen={isDeleteModalOpen}
                closeModal={closeDeleteModal}
                id={vehicle._id}
                modalHandler={statusFilter === 'deleted' ? handlePermanentDelete : handleDelete}
                message={
                    statusFilter === 'deleted'
                        ? 'Are you sure you want to PERMANENTLY delete this vehicle? This action cannot be undone!'
                        : 'Are you sure you want to delete this vehicle? It will be moved to the trash.'
                }
            />

            {/* Restore Vehicle Modal */}
            <DeleteModal
                isOpen={isRestoreModalOpen}
                closeModal={closeRestoreModal}
                id={vehicle._id}
                modalHandler={handleRestore}
                message="Are you sure you want to restore this vehicle?"
                isConfirmAction={true} // Add this prop to change the button text/color
            />
        </>
    );
};

export default VehicleTableRow;