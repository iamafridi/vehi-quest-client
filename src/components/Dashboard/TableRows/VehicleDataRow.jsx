import React from 'react';

const VehicleDataRow = ({ vehicle, deleteVehicle, updateVehicle }) => {
  // Format date safely
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? 'N/A' : date.toLocaleDateString();
  };

  return (
    <tr>
      {/* Vehicle Info */}
      <td className="px-5 py-5 bg-white text-sm">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <img
              alt="vehicle"
              src={vehicle?.image || '/placeholder-car.jpg'}
              className="mx-auto object-cover rounded h-10 w-15"
            />
          </div>
          <div className="ml-3">
            <p className="text-gray-900 font-semibold">
              {vehicle?.title || 'No Title'}
            </p>
            <p className="text-gray-600 text-sm">
              {vehicle?.category || 'No Category'}
            </p>
          </div>
        </div>
      </td>

      {/* Location */}
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        {vehicle?.location || 'No Location'}
      </td>

      {/* Price */}
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm font-semibold">
        ${vehicle?.price || 0}/day
      </td>

      {/* From */}
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        {formatDate(vehicle?.from)}
      </td>

      {/* To */}
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        {formatDate(vehicle?.to)}
      </td>

      {/* Delete Button */}
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <button
          onClick={deleteVehicle}
          className="px-3 py-1 font-semibold text-red-900 bg-red-200 rounded-full hover:bg-red-300 transition-colors"
        >
          Delete
        </button>
      </td>

      {/* Update Button */}
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <button
          onClick={updateVehicle}
          className="px-3 py-1 font-semibold text-green-900 bg-green-200 rounded-full hover:bg-green-300 transition-colors"
        >
          Update
        </button>
      </td>
    </tr>
  );
};

export default VehicleDataRow;

// import React from 'react';

// const VehicleDataRow = ({ vehicle, deleteVehicle, updateVehicle }) => {
//   // Format date safely
//   const formatDate = (dateString) => {
//     if (!dateString) return 'N/A';
//     const date = new Date(dateString);
//     return isNaN(date.getTime()) ? 'N/A' : date.toLocaleDateString();
//   };

//   return (
//     <tr>
//       {/* Vehicle Info */}
//       <td className="px-5 py-5  bg-white text-sm">
//         <div className="flex items-center">
//           <div className="flex-shrink-0">
//             <img
//               alt="vehicle"
//               src={vehicle?.image || '/placeholder-car.jpg'}
//               className="mx-auto object-cover rounded h-10 w-15"
//             />
//           </div>
//           <div className="ml-3">
//             <p className="text-gray-900 font-semibold">
//               {vehicle?.title || 'No Title'}
//             </p>
//             <p className="text-gray-600 text-sm">
//               {vehicle?.category || 'No Category'}
//             </p>
//           </div>
//         </div>
//       </td>

//       {/* Location */}
//       <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
//         {vehicle?.location || 'No Location'}
//       </td>

//       {/* Price */}
//       <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm font-semibold">
//         ${vehicle?.price || 0}/day
//       </td>

//       {/* From */}
//       <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
//         {formatDate(vehicle?.from)}
//       </td>

//       {/* To */}
//       <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
//         {formatDate(vehicle?.to)}
//       </td>

//       {/* Delete Button */}
//       <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
//         <button
//           onClick={deleteVehicle}
//           className="px-3 py-1 font-semibold text-red-900 bg-red-200 rounded-full hover:bg-red-300 transition-colors"
//         >
//           Delete
//         </button>
//       </td>

//       {/* Update Button */}
//       <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
//         <button
//           onClick={updateVehicle}
//           className="px-3 py-1 font-semibold text-green-900 bg-green-200 rounded-full hover:bg-green-300 transition-colors"
//         >
//           Update
//         </button>
//       </td>
//     </tr>
//   );
// };

// export default VehicleDataRow;


// import React, { useState } from 'react';
// import toast from 'react-hot-toast'

// const VehicleDataRow = ({ vehicle, refetch, deleteVehicle, updateVehicle, showToast }) => {
//   const [isDeleting, setIsDeleting] = useState(false);
//   const [isUpdating, setIsUpdating] = useState(false);
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
//   const [showUpdateForm, setShowUpdateForm] = useState(false);

//   const [updateData, setUpdateData] = useState({
//     title: vehicle?.title || '',
//     location: vehicle?.location || '',
//     price: vehicle?.price || '',
//     from: vehicle?.from || '',
//     to: vehicle?.to || ''
//   });

//   // Format date safely
//   const formatDate = (dateString) => {
//     if (!dateString) return 'N/A';
//     const date = new Date(dateString);
//     return isNaN(date.getTime()) ? 'N/A' : date.toLocaleDateString();
//   };

//   // Delete handler
//   const handleDelete = async () => {
//     if (!vehicle?._id) {
//       showToast('Vehicle ID is missing', 'error');
//       return;
//     }

//     setIsDeleting(true);
//     try {
//       await deleteVehicle(vehicle._id);
//       showToast('Vehicle deleted successfully!', 'success');
//       setShowDeleteConfirm(false);
//       refetch();
//     } catch (error) {
//       showToast(error?.message || 'Failed to delete vehicle', 'error');
//     } finally {
//       setIsDeleting(false);
//     }
//   };

//   // Update handler
//   const handleUpdateSubmit = async (e) => {
//     e.preventDefault();
//     if (!vehicle?._id) {
//       showToast('Vehicle ID is missing', 'error');
//       return;
//     }

//     setIsUpdating(true);
//     try {
//       await updateVehicle(vehicle._id, updateData);
//       showToast('Vehicle updated successfully!', 'success');
//       setShowUpdateForm(false);
//       refetch();
//     } catch (error) {
//       showToast(error?.message || 'Failed to update vehicle', 'error');
//     } finally {
//       setIsUpdating(false);
//     }
//   };

//   // Input change handler
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUpdateData((prev) => ({ ...prev, [name]: value }));
//   };

//   return (
//     <>
//       {/* Vehicle Row */}
//       <tr>
//         <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
//           <div className="flex items-center">
//             <div className="flex-shrink-0">
//               <img
//                 alt="vehicle"
//                 src={vehicle?.image || '/placeholder-car.jpg'}
//                 className="mx-auto object-cover rounded h-10 w-15"
//               />
//             </div>
//             <div className="ml-3">
//               <p className="text-gray-900 font-semibold">{vehicle?.title || 'No Title'}</p>
//               <p className="text-gray-600 text-sm">{vehicle?.category || 'No Category'}</p>
//             </div>
//           </div>
//         </td>

//         <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
//           <p className="text-gray-900">{vehicle?.location || 'No Location'}</p>
//         </td>

//         <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm font-semibold">
//           ${vehicle?.price || 0}/day
//         </td>

//         <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
//           {formatDate(vehicle?.from)}
//         </td>

//         <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
//           {formatDate(vehicle?.to)}
//         </td>

//         {/* Delete Button */}
//         <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
//           <button
//             onClick={() => setShowDeleteConfirm(true)}
//             disabled={isDeleting}
//             className="relative px-3 py-1 font-semibold text-red-900 leading-tight"
//           >
//             <span className="absolute inset-0 bg-red-200 opacity-50 rounded-full"></span>
//             <span className="relative">{isDeleting ? 'Deleting...' : 'Delete'}</span>
//           </button>
//         </td>

//         {/* Update Button */}
//         <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
//           <button
//             onClick={() => setShowUpdateForm(true)}
//             disabled={isUpdating}
//             className="relative px-3 py-1 font-semibold text-green-900 leading-tight hover:bg-green-100 transition-colors"
//           >
//             <span className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
//             <span className="relative">{isUpdating ? 'Updating...' : 'Update'}</span>
//           </button>
//         </td>
//       </tr>

//       {/* Update Form Row */}
//       {showUpdateForm && (
//         <tr>
//           <td colSpan={7} className="px-5 py-5 border-b border-gray-200 bg-blue-50">
//             <form onSubmit={handleUpdateSubmit} className="space-y-3">
//               <div className="text-sm font-semibold text-gray-700 mb-3">
//                 Update Vehicle: {vehicle?.title}
//               </div>
//               <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
//                 <input
//                   type="text"
//                   name="title"
//                   value={updateData.title}
//                   onChange={handleInputChange}
//                   placeholder="Title"
//                   className="px-2 py-1 border rounded text-sm"
//                   required
//                 />
//                 <input
//                   type="text"
//                   name="location"
//                   value={updateData.location}
//                   onChange={handleInputChange}
//                   placeholder="Location"
//                   className="px-2 py-1 border rounded text-sm"
//                   required
//                 />
//                 <input
//                   type="number"
//                   name="price"
//                   value={updateData.price}
//                   onChange={handleInputChange}
//                   placeholder="Price"
//                   className="px-2 py-1 border rounded text-sm"
//                   required
//                 />
//                 <input
//                   type="date"
//                   name="from"
//                   value={updateData.from}
//                   onChange={handleInputChange}
//                   className="px-2 py-1 border rounded text-sm"
//                   required
//                 />
//                 <input
//                   type="date"
//                   name="to"
//                   value={updateData.to}
//                   onChange={handleInputChange}
//                   className="px-2 py-1 border rounded text-sm"
//                   required
//                 />
//               </div>
//               <div className="flex space-x-2">
//                 <button
//                   type="submit"
//                   disabled={isUpdating}
//                   className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-green-300 transition-colors"
//                 >
//                   {isUpdating ? 'Saving...' : 'Save Changes'}
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setShowUpdateForm(false);
//                     setUpdateData({
//                       title: vehicle?.title || '',
//                       location: vehicle?.location || '',
//                       price: vehicle?.price || '',
//                       from: vehicle?.from || '',
//                       to: vehicle?.to || ''
//                     });
//                   }}
//                   className="px-3 py-1 text-sm bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </td>
//         </tr>
//       )}

//       {/* Delete Confirmation Row */}
//       {showDeleteConfirm && (
//         <tr>
//           <td colSpan={7} className="px-5 py-5 border-b border-gray-200 bg-gray-50">
//             <div className="flex items-center justify-between">
//               <div className="text-sm text-gray-700">
//                 Are you sure you want to delete "{vehicle?.title || 'this vehicle'}"? This action
//                 cannot be undone.
//               </div>
//               <div className="flex space-x-2">
//                 <button
//                   onClick={() => setShowDeleteConfirm(false)}
//                   className="px-3 py-1 text-sm bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleDelete}
//                   disabled={isDeleting}
//                   className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-red-300 transition-colors"
//                 >
//                   {isDeleting ? 'Deleting...' : 'Delete'}
//                 </button>
//               </div>
//             </div>
//           </td>
//         </tr>
//       )}
//     </>
//   );
// };

// export default VehicleDataRow;
