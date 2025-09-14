import { formatDistance } from "date-fns";
import Button from "../Button/Button";
import { useState, useEffect, useMemo } from "react";
import BookingModal from "../Modal/BookingModal";
import useAuth from "../../hooks/useAuth";
import Calendar from "./Calender"; // Make sure this path is correct

const VehicleReservation = ({ vehicle }) => {
    const { user } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    // Initialize with today's date and tomorrow for default selection
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const [value, setValue] = useState({
        startDate: today,
        endDate: tomorrow,
        key: 'selection',
    });

    const [selectedDates, setSelectedDates] = useState([]);
    const [isValidSelection, setIsValidSelection] = useState(true);
    const [validationMessage, setValidationMessage] = useState('');

    const closeModal = () => {
        setIsOpen(false);
    };

    // Get booked dates from vehicle
    const bookedDates = vehicle?.bookedDates || [];
    const isSoldOut = vehicle?.soldOut || false;

    // Calculate total days and price
    const totalDays = useMemo(() => {
        if (value.startDate && value.endDate) {
            const timeDiff = value.endDate.getTime() - value.startDate.getTime();
            return Math.max(1, Math.ceil(timeDiff / (1000 * 60 * 60 * 24)));
        }
        return 1;
    }, [value.startDate, value.endDate]);

    const totalPrice = totalDays * (vehicle?.price || 0);

    // Generate array of selected dates - FIXED VERSION
    useEffect(() => {
        if (value.startDate && value.endDate) {
            const dates = [];
            const currentDate = new Date(value.startDate);
            const endDate = new Date(value.endDate);

            // Fixed: Don't include the end date for overnight bookings
            while (currentDate < endDate) { // Changed from <= to <
                dates.push(new Date(currentDate).toISOString().split('T')[0]);
                currentDate.setDate(currentDate.getDate() + 1);
            }

            setSelectedDates(dates);

            // Check for conflicts with booked dates
            const hasConflict = dates.some(date => bookedDates.includes(date));

            if (hasConflict) {
                setIsValidSelection(false);
                setValidationMessage('Selected dates conflict with already booked dates');
            } else if (dates.length === 0) {
                setIsValidSelection(false);
                setValidationMessage('Please select at least one day');
            } else if (value.startDate >= value.endDate) {
                setIsValidSelection(false);
                setValidationMessage('End date must be after start date');
            } else {
                setIsValidSelection(true);
                setValidationMessage('');
            }
        }
    }, [value.startDate, value.endDate, bookedDates]);

    const handleDateChange = (ranges) => {
        setValue(ranges);
    };

    // Check if user can book this vehicle
    const canBook = useMemo(() => {
        if (!user) return false;
        if (vehicle?.host?.email === user.email) return false;
        if (isSoldOut) return false;
        if (!isValidSelection) return false;
        return true;
    }, [user, vehicle?.host?.email, isSoldOut, isValidSelection]);

    // Get booking button text and status
    const getBookingStatus = () => {
        if (!user) return { text: 'Login to Book', disabled: true };
        if (vehicle?.host?.email === user.email) return { text: 'Cannot Book Own Vehicle', disabled: true };
        if (isSoldOut) return { text: 'Sold Out - Unavailable', disabled: true };
        if (!isValidSelection) return { text: 'Select Valid Dates', disabled: true };
        return { text: 'Reserve Now', disabled: false };
    };

    const bookingStatus = getBookingStatus();

    const [bookingInfo, setBookingInfo] = useState({
        guest: {
            name: user?.displayName,
            email: user?.email,
            image: user?.photoURL,
        },
        host: vehicle?.host?.email,
        location: vehicle?.location,
        price: totalPrice,
        to: value.endDate,
        from: value.startDate,
        title: vehicle?.title,
        vehicleId: vehicle?._id,
        image: vehicle?.image,
        dates: selectedDates,
        totalDays: totalDays,
    });

    // Update booking info when values change
    useEffect(() => {
        setBookingInfo(prev => ({
            ...prev,
            price: totalPrice,
            to: value.endDate,
            from: value.startDate,
            dates: selectedDates,
            totalDays: totalDays,
        }));
    }, [totalPrice, value.endDate, value.startDate, selectedDates, totalDays]);

    return (
        <div className="rounded-xl border-[1px] border-blue-400 overflow-hidden bg-white">
            {/* Price Header */}
            <div className="flex items-center gap-1 p-4">
                <div className="text-2xl font-semibold">
                    ${vehicle?.price || 0}
                </div>
                <div className="font-light text-neutral-600">per day</div>
                {isSoldOut && (
                    <div className="ml-auto">
                        <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                            SOLD OUT
                        </span>
                    </div>
                )}
            </div>

            <hr />

            {/* Calendar Section - FIXED */}
            <div className="p-4">
                <div className="flex justify-center">
                    <Calendar
                        value={value}
                        onChange={handleDateChange}
                        bookedDates={bookedDates}
                        minDate={new Date()}
                    />
                </div>

                {/* Validation Message */}
                {validationMessage && (
                    <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-600 text-sm">{validationMessage}</p>
                    </div>
                )}

                {/* Selected Dates Summary */}
                {isValidSelection && selectedDates.length > 0 && (
                    <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-green-700 text-sm">
                            Selected: {totalDays} day{totalDays > 1 ? 's' : ''}
                            ({new Date(value.startDate).toLocaleDateString()} - {new Date(value.endDate).toLocaleDateString()})
                        </p>
                    </div>
                )}
            </div>

            <hr />

            {/* Booking Button */}
            <div className="p-4">
                <Button
                    disabled={bookingStatus.disabled}
                    onClick={() => setIsOpen(true)}
                    label={bookingStatus.text}
                    className={`w-full ${bookingStatus.disabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                />
            </div>

            <hr />

            {/* Price Breakdown - FIXED ENCODING */}
            <div className="p-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                    <div>${vehicle?.price || 0} × {totalDays} day{totalDays > 1 ? 's' : ''}</div>
                    <div>${totalPrice}</div>
                </div>

                <hr className="my-2" />

                <div className="flex items-center justify-between font-semibold text-lg">
                    <div>Total:</div>
                    <div>${totalPrice}</div>
                </div>
            </div>

            {/* Availability Info */}
            {bookedDates.length > 0 && (
                <div className="px-4 pb-4">
                    <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Availability Status:</p>
                        <p className="text-sm font-medium">
                            {bookedDates.length} day{bookedDates.length > 1 ? 's' : ''} already booked
                        </p>
                    </div>
                </div>
            )}

            {/* Booking Modal */}
            <BookingModal
                closeModal={closeModal}
                isOpen={isOpen}
                bookingInfo={bookingInfo}
            />
        </div>
    );
};

export default VehicleReservation;