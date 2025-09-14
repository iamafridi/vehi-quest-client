import { Dialog, Transition } from '@headlessui/react'
import { Elements } from '@stripe/react-stripe-js'
import { format } from 'date-fns'
import { Fragment } from 'react'
import CheckoutForm from '../Form/CheckoutForm'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK)

const BookingModal = ({ closeModal, isOpen, bookingInfo }) => {
    // Calculate price per day for display
    const pricePerDay = bookingInfo.totalDays > 0 ? bookingInfo.price / bookingInfo.totalDays : 0;

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as='div' className='relative z-10' onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter='ease-out duration-300'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='ease-in duration-200'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                >
                    <div className='fixed inset-0 bg-black bg-opacity-25' />
                </Transition.Child>

                <div className='fixed inset-0 overflow-y-auto'>
                    <div className='flex min-h-full items-center justify-center p-4 text-center'>
                        <Transition.Child
                            as={Fragment}
                            enter='ease-out duration-300'
                            enterFrom='opacity-0 scale-95'
                            enterTo='opacity-100 scale-100'
                            leave='ease-in duration-200'
                            leaveFrom='opacity-100 scale-100'
                            leaveTo='opacity-0 scale-95'
                        >
                            <Dialog.Panel className='w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                                <Dialog.Title
                                    as='h3'
                                    className='text-lg font-medium text-center leading-6 text-gray-900 mb-4'
                                >
                                    Review Info Before Reserve
                                </Dialog.Title>

                                {/* Vehicle Image */}
                                {bookingInfo.image && (
                                    <div className='mb-4'>
                                        <img
                                            src={bookingInfo.image}
                                            alt={bookingInfo.title}
                                            className='w-full h-32 object-cover rounded-lg'
                                        />
                                    </div>
                                )}

                                {/* Booking Details */}
                                <div className='space-y-3 mb-6'>
                                    <div className='border-b pb-2'>
                                        <h4 className='font-semibold text-gray-900'>Vehicle Details</h4>
                                        <p className='text-sm text-gray-600 mt-1'>
                                            <span className='font-medium'>Vehicle:</span> {bookingInfo.title}
                                        </p>
                                        <p className='text-sm text-gray-600'>
                                            <span className='font-medium'>Location:</span> {bookingInfo.location}
                                        </p>
                                    </div>

                                    <div className='border-b pb-2'>
                                        <h4 className='font-semibold text-gray-900'>Guest Information</h4>
                                        <div className='flex items-center gap-2 mt-1'>
                                            {bookingInfo.guest.image && (
                                                <img
                                                    src={bookingInfo.guest.image}
                                                    alt={bookingInfo.guest.name}
                                                    className='w-6 h-6 rounded-full'
                                                />
                                            )}
                                            <p className='text-sm text-gray-600'>
                                                <span className='font-medium'>Guest:</span> {bookingInfo.guest.name}
                                            </p>
                                        </div>
                                        <p className='text-sm text-gray-600'>
                                            <span className='font-medium'>Email:</span> {bookingInfo.guest.email}
                                        </p>
                                    </div>

                                    <div className='border-b pb-2'>
                                        <h4 className='font-semibold text-gray-900'>Booking Period</h4>
                                        <p className='text-sm text-gray-600 mt-1'>
                                            <span className='font-medium'>From:</span> {format(new Date(bookingInfo.from), 'PPP')}
                                        </p>
                                        <p className='text-sm text-gray-600'>
                                            <span className='font-medium'>To:</span> {format(new Date(bookingInfo.to), 'PPP')}
                                        </p>
                                        <p className='text-sm text-gray-600'>
                                            <span className='font-medium'>Duration:</span> {bookingInfo.totalDays} day{bookingInfo.totalDays > 1 ? 's' : ''}
                                        </p>
                                    </div>

                                    {/* Selected Dates Summary */}
                                    {bookingInfo.dates && bookingInfo.dates.length > 0 && (
                                        <div className='border-b pb-2'>
                                            <h4 className='font-semibold text-gray-900'>Selected Dates</h4>
                                            <div className='mt-1 max-h-20 overflow-y-auto'>
                                                <div className='flex flex-wrap gap-1'>
                                                    {bookingInfo.dates.slice(0, 10).map((date, index) => (
                                                        <span
                                                            key={index}
                                                            className='text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded'
                                                        >
                                                            {format(new Date(date), 'MMM dd')}
                                                        </span>
                                                    ))}
                                                    {bookingInfo.dates.length > 10 && (
                                                        <span className='text-xs text-gray-500'>
                                                            +{bookingInfo.dates.length - 10} more
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Price Breakdown */}
                                    <div className='bg-gray-50 p-3 rounded-lg'>
                                        <h4 className='font-semibold text-gray-900 mb-2'>Price Breakdown</h4>
                                        <div className='space-y-1 text-sm'>
                                            <div className='flex justify-between'>
                                                <span>${Math.round(pricePerDay)} × {bookingInfo.totalDays} day{bookingInfo.totalDays > 1 ? 's' : ''}</span>
                                                <span>${bookingInfo.price}</span>
                                            </div>
                                            <div className='border-t pt-1 font-semibold flex justify-between'>
                                                <span>Total Price:</span>
                                                <span>${bookingInfo.price}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <hr className='mb-4' />

                                {/* Card data form */}
                                <div>
                                    <h4 className='font-semibold text-gray-900 mb-3'>Payment Details</h4>
                                    <Elements stripe={stripePromise}>
                                        <CheckoutForm
                                            closeModal={closeModal}
                                            bookingInfo={bookingInfo}
                                        />
                                    </Elements>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default BookingModal;