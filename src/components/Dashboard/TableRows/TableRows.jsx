import { format } from 'date-fns';
import { useState } from 'react';
import toast from 'react-hot-toast';
import axiosSecure from '../../../api';
import DeleteModal from '../../Modal/DeleteModal';
import UpdateBookingModal from '../../Modal/UpdateBookingModal';

const TableRow = ({ booking, refetch, isAdmin = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Open/close delete modal
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  // Safely get guest info
  const guest = booking.guest || {};
  const guestImage = guest.image || '/placeholder-user.jpg';
  const guestName = guest.name || 'Guest';
  const guestEmail = guest.email || '';

  // Handle host name and email - it might be just an email string or an object
  let hostName = 'Host';
  let hostEmail = '';

  if (typeof booking.host === 'string') {
    // If host is just an email
    hostEmail = booking.host;
    hostName = booking.host.split('@')[0] || booking.host;
  } else if (booking.host?.name) {
    // If host is an object with name property
    hostName = booking.host.name;
    hostEmail = booking.host.email || '';
  } else if (booking.vehicle?.host?.name) {
    // If host info is nested in vehicle
    hostName = booking.vehicle.host.name;
    hostEmail = booking.vehicle.host.email || '';
  } else if (booking.vehicle?.host?.email) {
    // If vehicle host is just email
    hostEmail = booking.vehicle.host.email;
    hostName = booking.vehicle.host.email.split('@')[0] || booking.vehicle.host.email;
  }

  // Handler for deleting booking
  const modalHandler = async (id) => {
    try {
      const res = await axiosSecure.delete(`/bookings/${id}`);
      if (res.data?.deletedCount > 0) {
        toast.success('Booking cancelled successfully');
        refetch();
      } else {
        toast.error('Failed to cancel booking');
      }
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong');
    } finally {
      closeModal();
    }
  };

  return (
    <>
      {/* Extra Large Desktop (1536px+) - Full layout */}
      <tr className="hidden 2xl:table-row">
        {/* Vehicle */}
        <td className="px-4 py-4 border-b border-gray-200 bg-white text-sm">
          <div className="flex items-center gap-3">
            <img
              alt="vehicle"
              src={booking?.image || '/placeholder-vehicle.jpg'}
              className="h-12 w-16 rounded-lg object-cover flex-shrink-0"
            />
            <div className="min-w-0 flex-1">
              <p className="text-gray-900 font-medium line-clamp-2 break-words max-w-[200px]">
                {booking?.title || 'Vehicle Name'}
              </p>
            </div>
          </div>
        </td>

        {/* Host */}
        <td className="px-4 py-4 border-b border-gray-200 bg-white text-sm">
          <div className="min-w-0 flex-1 max-w-[180px]">
            <p className="text-gray-900 font-medium truncate">{hostName}</p>
            <p className="text-gray-500 text-xs truncate">{hostEmail}</p>
          </div>
        </td>

        {/* Guest - Fixed alignment */}
        <td className="px-4 py-4 border-b border-gray-200 bg-white text-sm">
          <div className="flex items-center gap-3">
            <img
              alt="guest"
              src={guestImage}
              className="h-10 w-10 rounded-full object-cover flex-shrink-0"
            />
            <div className="min-w-0 flex-1 max-w-[180px]">
              <p className="text-gray-900 font-medium truncate">{guestName}</p>
              <p className="text-gray-500 text-xs truncate">{guestEmail}</p>
            </div>
          </div>
        </td>

        {/* Price */}
        <td className="px-4 py-4 border-b border-gray-200 bg-white text-sm text-center">
          <span className="font-semibold text-green-600">${booking?.price || 0}</span>
        </td>

        {/* From Date */}
        <td className="px-4 py-4 border-b border-gray-200 bg-white text-sm text-center">
          <div className="space-y-1">
            <p className="font-medium">
              {booking?.from ? format(new Date(booking.from), 'MMM dd') : '-'}
            </p>
            <p className="text-xs text-gray-500">
              {booking?.from ? format(new Date(booking.from), 'yyyy') : ''}
            </p>
          </div>
        </td>

        {/* To Date */}
        <td className="px-4 py-4 border-b border-gray-200 bg-white text-sm text-center">
          <div className="space-y-1">
            <p className="font-medium">
              {booking?.to ? format(new Date(booking.to), 'MMM dd') : '-'}
            </p>
            <p className="text-xs text-gray-500">
              {booking?.to ? format(new Date(booking.to), 'yyyy') : ''}
            </p>
          </div>
        </td>

        {/* Status */}
        <td className="px-4 py-4 border-b border-gray-200 bg-white text-sm text-center">
          <span
            className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${booking?.status === 'confirmed'
              ? 'bg-green-100 text-green-800'
              : booking?.status === 'pending'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-red-100 text-red-800'
              }`}
          >
            {booking?.status || 'pending'}
          </span>
        </td>

        {/* Actions */}
        <td className="px-4 py-4 border-b border-gray-200 bg-white text-sm">
          <div className="flex items-center gap-2">
            <button
              onClick={openModal}
              className="px-3 py-1 text-red-700 font-semibold bg-red-100 hover:bg-red-200 rounded-md transition-colors"
            >
              Cancel
            </button>
            {isAdmin && (
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="px-3 py-1 text-blue-700 font-semibold bg-blue-100 hover:bg-blue-200 rounded-md transition-colors"
              >
                Update
              </button>
            )}
          </div>
        </td>
      </tr>

      {/* Large Desktop (1280px - 1535px) - Fixed guest alignment */}
      <tr className="hidden xl:table-row 2xl:hidden">
        {/* Vehicle */}
        <td className="px-3 py-4 border-b border-gray-200 bg-white text-sm">
          <div className="flex items-center gap-3">
            <img
              alt="vehicle"
              src={booking?.image || '/placeholder-vehicle.jpg'}
              className="h-10 w-14 rounded object-cover flex-shrink-0"
            />
            <div className="min-w-0 flex-1">
              <p className="text-gray-900 font-medium text-sm line-clamp-2 max-w-[150px]">
                {booking?.title || 'Vehicle'}
              </p>
            </div>
          </div>
        </td>

        {/* Host */}
        <td className="px-3 py-4 border-b border-gray-200 bg-white text-sm">
          <div className="min-w-0 max-w-[130px]">
            <p className="text-gray-900 font-medium text-sm truncate">{hostName}</p>
            <p className="text-gray-500 text-xs truncate">{hostEmail}</p>
          </div>
        </td>

        {/* Guest - Fixed alignment */}
        <td className="px-3 py-4 border-b border-gray-200 bg-white text-sm">
          <div className="flex items-center gap-2">
            <img
              alt="guest"
              src={guestImage}
              className="h-8 w-8 rounded-full object-cover flex-shrink-0"
            />
            <div className="min-w-0 flex-1 max-w-[120px]">
              <p className="text-gray-900 font-medium text-sm truncate">{guestName}</p>
              <p className="text-gray-500 text-xs truncate">{guestEmail}</p>
            </div>
          </div>
        </td>

        {/* Price */}
        <td className="px-3 py-4 border-b border-gray-200 bg-white text-sm text-center">
          <span className="font-semibold text-green-600">${booking?.price || 0}</span>
        </td>

        {/* Dates combined */}
        <td className="px-3 py-4 border-b border-gray-200 bg-white text-sm text-center">
          <div className="space-y-1">
            <div className="text-xs text-gray-600">
              <p className="font-medium">{booking?.from ? format(new Date(booking.from), 'MM/dd/yy') : '-'}</p>
              <p className="text-gray-400">to</p>
              <p className="font-medium">{booking?.to ? format(new Date(booking.to), 'MM/dd/yy') : '-'}</p>
            </div>
          </div>
        </td>

        {/* Status */}
        <td className="px-3 py-4 border-b border-gray-200 bg-white text-sm text-center">
          <span
            className={`px-2 py-1 inline-flex text-xs font-semibold rounded-full ${booking?.status === 'confirmed'
              ? 'bg-green-100 text-green-800'
              : booking?.status === 'pending'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-red-100 text-red-800'
              }`}
          >
            {booking?.status || 'pending'}
          </span>
        </td>

        {/* Actions */}
        <td className="px-3 py-4 border-b border-gray-200 bg-white text-sm">
          <div className="flex flex-col gap-1">
            <button
              onClick={openModal}
              className="px-2 py-1 text-xs text-red-700 font-semibold bg-red-100 hover:bg-red-200 rounded transition-colors"
            >
              Cancel
            </button>
            {isAdmin && (
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="px-2 py-1 text-xs text-blue-700 font-semibold bg-blue-100 hover:bg-blue-200 rounded transition-colors"
              >
                Update
              </button>
            )}
          </div>
        </td>
      </tr>

      {/* Medium Desktop (1024px - 1279px) - Fixed guest alignment */}
      <tr className="hidden lg:table-row xl:hidden">
        {/* Vehicle + Price */}
        <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">
          <div className="flex items-center gap-2">
            <img
              alt="vehicle"
              src={booking?.image || '/placeholder-vehicle.jpg'}
              className="h-10 w-12 rounded object-cover flex-shrink-0"
            />
            <div className="min-w-0 flex-1">
              <p className="text-gray-900 font-medium text-sm line-clamp-1 max-w-[120px]">
                {booking?.title || 'Vehicle'}
              </p>
              <p className="text-green-600 font-semibold text-sm">${booking?.price || 0}</p>
            </div>
          </div>
        </td>

        {/* Host */}
        <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">
          <div className="min-w-0 max-w-[110px]">
            <p className="text-gray-900 font-medium text-sm truncate">{hostName}</p>
            <p className="text-gray-500 text-xs truncate">{hostEmail}</p>
          </div>
        </td>

        {/* Guest - Fixed alignment */}
        <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm">
          <div className="flex items-center gap-2">
            <img
              alt="guest"
              src={guestImage}
              className="h-7 w-7 rounded-full object-cover flex-shrink-0"
            />
            <div className="min-w-0 flex-1 max-w-[100px]">
              <p className="text-gray-900 font-medium text-sm truncate">{guestName}</p>
              <p className="text-gray-500 text-xs truncate">{guestEmail}</p>
            </div>
          </div>
        </td>

        {/* Dates */}
        <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm text-center">
          <div className="space-y-1">
            <p className="text-xs font-medium">{booking?.from ? format(new Date(booking.from), 'MM/dd') : '-'}</p>
            <p className="text-xs text-gray-400">to</p>
            <p className="text-xs font-medium">{booking?.to ? format(new Date(booking.to), 'MM/dd') : '-'}</p>
          </div>
        </td>

        {/* Status + Actions */}
        <td className="px-3 py-3 border-b border-gray-200 bg-white text-sm text-center">
          <div className="space-y-2">
            <span
              className={`px-2 py-1 inline-flex text-xs font-semibold rounded-full ${booking?.status === 'confirmed'
                ? 'bg-green-100 text-green-800'
                : booking?.status === 'pending'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-red-100 text-red-800'
                }`}
            >
              {booking?.status || 'pending'}
            </span>
            <div className="flex flex-col gap-1">
              <button
                onClick={openModal}
                className="px-2 py-1 text-xs text-red-700 font-semibold bg-red-100 hover:bg-red-200 rounded transition-colors"
              >
                Cancel
              </button>
              {isAdmin && (
                <button
                  onClick={() => setIsEditModalOpen(true)}
                  className="px-2 py-1 text-xs text-blue-700 font-semibold bg-blue-100 hover:bg-blue-200 rounded transition-colors"
                >
                  Update
                </button>
              )}
            </div>
          </div>
        </td>
      </tr>

      {/* Tablet (768px - 1023px) - Fixed guest section alignment */}
      <tr className="hidden md:table-row lg:hidden">
        <td colSpan="8" className="px-4 py-4 border-b border-gray-200 bg-white">
          <div className="flex items-center gap-4">
            {/* Vehicle Info */}
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <img
                alt="vehicle"
                src={booking?.image || '/placeholder-vehicle.jpg'}
                className="h-12 w-16 rounded object-cover flex-shrink-0"
              />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-900 line-clamp-1">
                  {booking?.title || 'Vehicle'}
                </p>
                <p className="text-lg font-semibold text-green-600">${booking?.price || 0}</p>
              </div>
            </div>

            {/* Host Info */}
            <div className="min-w-0 flex-shrink-0 w-32">
              <div className="text-center">
                <p className="text-xs text-gray-500 uppercase tracking-wide">Host</p>
                <p className="text-sm font-medium text-gray-900 truncate">{hostName}</p>
                <p className="text-xs text-gray-500 truncate">{hostEmail}</p>
              </div>
            </div>

            {/* Guest Info - Fixed alignment */}
            <div className="min-w-0 flex-shrink-0 w-36">
              <div className="text-center">
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Guest</p>
                <div className="flex items-center justify-center gap-2">
                  <img
                    alt="guest"
                    src={guestImage}
                    className="h-8 w-8 rounded-full object-cover flex-shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900 truncate">{guestName}</p>
                    <p className="text-xs text-gray-500 truncate">{guestEmail}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Status, Dates & Actions */}
            <div className="flex-shrink-0 text-right">
              <div className="space-y-2">
                <span
                  className={`px-2 py-1 inline-flex text-xs font-semibold rounded-full ${booking?.status === 'confirmed'
                    ? 'bg-green-100 text-green-800'
                    : booking?.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                    }`}
                >
                  {booking?.status || 'pending'}
                </span>
                <div className="text-xs text-gray-600">
                  <p>{booking?.from ? format(new Date(booking.from), 'MM/dd/yy') : '-'}</p>
                  <p>to</p>
                  <p>{booking?.to ? format(new Date(booking.to), 'MM/dd/yy') : '-'}</p>
                </div>
                <div className="flex gap-1 justify-end">
                  <button
                    onClick={openModal}
                    className="px-2 py-1 text-xs text-red-700 font-semibold bg-red-100 hover:bg-red-200 rounded transition-colors"
                  >
                    Cancel
                  </button>
                  {isAdmin && (
                    <button
                      onClick={() => setIsEditModalOpen(true)}
                      className="px-2 py-1 text-xs text-blue-700 font-semibold bg-blue-100 hover:bg-blue-200 rounded transition-colors"
                    >
                      Update
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </td>
      </tr>

      {/* Mobile (up to 767px) - Guest section alignment fixed */}
      <tr className="md:hidden border-b border-gray-200">
        <td colSpan="8" className="px-4 py-4">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 space-y-4">
            {/* Header with Vehicle and Status */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <img
                  alt="vehicle"
                  src={booking?.image || '/placeholder-vehicle.jpg'}
                  className="h-16 w-20 rounded-lg object-cover flex-shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-gray-900 text-base line-clamp-2">
                    {booking?.title || 'Vehicle Name'}
                  </h3>
                  <p className="text-lg font-bold text-green-600 mt-1">
                    ${booking?.price || 0}
                  </p>
                </div>
              </div>
              <span
                className={`px-3 py-1 text-xs font-semibold rounded-full flex-shrink-0 ${booking?.status === 'confirmed'
                  ? 'bg-green-100 text-green-800'
                  : booking?.status === 'pending'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
                  }`}
              >
                {booking?.status || 'pending'}
              </span>
            </div>

            {/* Host Information */}
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-xs uppercase tracking-wide text-gray-500 font-medium mb-2">Host</p>
              <p className="font-semibold text-gray-900">{hostName}</p>
              <p className="text-sm text-gray-600 break-all">{hostEmail}</p>
            </div>

            {/* Guest Information - Fixed alignment */}
            <div className="bg-blue-50 rounded-lg p-3">
              <p className="text-xs uppercase tracking-wide text-gray-500 font-medium mb-2">Guest</p>
              <div className="flex items-center gap-3">
                <img
                  alt="guest"
                  src={guestImage}
                  className="h-12 w-12 rounded-full object-cover flex-shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-gray-900">{guestName}</p>
                  <p className="text-sm text-gray-600 break-all">{guestEmail}</p>
                </div>
              </div>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-xs uppercase tracking-wide text-gray-500 font-medium">From</p>
                <p className="font-semibold text-gray-900 mt-1">
                  {booking?.from ? format(new Date(booking.from), 'MMM dd, yyyy') : '-'}
                </p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-xs uppercase tracking-wide text-gray-500 font-medium">To</p>
                <p className="font-semibold text-gray-900 mt-1">
                  {booking?.to ? format(new Date(booking.to), 'MMM dd, yyyy') : '-'}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={openModal}
                className="flex-1 px-4 py-2 text-red-700 font-semibold bg-red-100 hover:bg-red-200 rounded-lg transition-colors"
              >
                Cancel Booking
              </button>
              {isAdmin && (
                <button
                  onClick={() => setIsEditModalOpen(true)}
                  className="flex-1 px-4 py-2 text-blue-700 font-semibold bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors"
                >
                  Update Booking
                </button>
              )}
            </div>
          </div>
        </td>
      </tr>

      {/* Delete Modal */}
      <DeleteModal
        modalHandler={modalHandler}
        closeModal={closeModal}
        isOpen={isOpen}
        id={booking._id}
      />

      {/* Update Modal */}
      <UpdateBookingModal
        isOpen={isEditModalOpen}
        setIsEditModalOpen={setIsEditModalOpen}
        booking={booking}
        id={booking._id}
        refetch={refetch}
      />
    </>
  );
};

export default TableRow;