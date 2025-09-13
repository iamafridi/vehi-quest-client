import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import toast from 'react-hot-toast'
import { updateBooking as updateBookingApi } from '../../api/bookings'

const UpdateBookingModal = ({ isOpen, setIsEditModalOpen, refetch, booking, id }) => {
    const [loading, setLoading] = useState(false)
    const [bookingData, setBookingData] = useState({
        from: booking.from,
        to: booking.to,
        price: booking.price,
        status: booking.status || 'pending',
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!id) return

        try {
            setLoading(true)
            await updateBookingApi(id, bookingData)
            toast.success('Booking updated successfully!')
            refetch()
            setIsEditModalOpen(false)
        } catch (error) {
            console.error('Update failed:', error)
            toast.error(error?.message || 'Failed to update booking')
        } finally {
            setLoading(false)
        }
    }

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog
                as="div"
                className="relative z-10"
                onClose={() => setIsEditModalOpen(false)}
            >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium text-center leading-6 text-gray-900"
                                >
                                    Update Booking
                                </Dialog.Title>

                                {/* FORM */}
                                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            From Date
                                        </label>
                                        <input
                                            type="date"
                                            value={bookingData.from?.slice(0, 10)}
                                            onChange={(e) =>
                                                setBookingData({ ...bookingData, from: e.target.value })
                                            }
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            To Date
                                        </label>
                                        <input
                                            type="date"
                                            value={bookingData.to?.slice(0, 10)}
                                            onChange={(e) =>
                                                setBookingData({ ...bookingData, to: e.target.value })
                                            }
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Price
                                        </label>
                                        <input
                                            type="number"
                                            value={bookingData.price}
                                            onChange={(e) =>
                                                setBookingData({ ...bookingData, price: e.target.value })
                                            }
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Status
                                        </label>
                                        <select
                                            value={bookingData.status}
                                            onChange={(e) =>
                                                setBookingData({ ...bookingData, status: e.target.value })
                                            }
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="confirmed">Confirmed</option>
                                            <option value="cancelled">Cancelled</option>
                                        </select>
                                    </div>

                                    <div className="mt-6 flex justify-end gap-2">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
                                            onClick={() => setIsEditModalOpen(false)}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                                        >
                                            {loading ? 'Saving...' : 'Save'}
                                        </button>
                                    </div>
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default UpdateBookingModal
