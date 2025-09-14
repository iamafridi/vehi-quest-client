import React, { memo } from "react";
import { Link } from "react-router-dom";

const Card = memo(({ vehicle, priority = false }) => {
    // Function to truncate description to a fixed length
    const truncateDescription = (text, maxLength = 50) => {
        if (!text) return '';
        return text.length > maxLength
            ? text.substring(0, maxLength).trim() + '...'
            : text;
    };

    // Function to format booked dates for display
    const formatBookedDates = (dates) => {
        if (!dates || dates.length === 0) return [];

        // Sort dates and format them
        const sortedDates = dates
            .map(date => new Date(date))
            .sort((a, b) => a - b)
            .map(date => date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric'
            }));

        return sortedDates;
    };

    // Function to check if vehicle should be marked as sold out
    const checkSoldOutStatus = (vehicle) => {
        // Check explicit soldOut flag
        if (vehicle?.soldOut) return true;

        // Check if all upcoming dates are booked (optional logic)
        // You can customize this based on your business logic
        const bookedDates = vehicle?.bookedDates || [];
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // If more than 30 days are booked in advance, consider it sold out
        const futureBookedDates = bookedDates.filter(dateStr => {
            const bookDate = new Date(dateStr);
            return bookDate >= today;
        });

        // Customize this threshold based on your needs
        return futureBookedDates.length > 30;
    };

    if (!vehicle) {
        return (
            <div className="aspect-square w-full bg-gray-100 rounded-xl animate-pulse">
                <div className="h-full w-full bg-gray-200 rounded-xl"></div>
            </div>
        );
    }

    // Safe fallback values
    const vehicleId = vehicle._id;
    const vehicleLocation = vehicle.location || 'Unknown Location';
    const vehicleImage = vehicle.image || '/placeholder-vehicle.jpg';
    const vehicleDescription = vehicle.description || 'No description available';
    const vehicleSeats = vehicle.seats || 'N/A';
    const hostName = vehicle.host?.name || 'Unknown Host';
    const vehiclePrice = vehicle.price || '0';

    // Booking related
    const isSoldOut = checkSoldOutStatus(vehicle);
    const bookedDates = vehicle?.bookedDates || [];
    const formattedBookedDates = formatBookedDates(bookedDates);

    // Calculate availability status
    const availabilityStatus = () => {
        if (isSoldOut) return 'Sold Out';
        if (bookedDates.length > 0) {
            const availableDays = 30 - bookedDates.filter(dateStr => {
                const bookDate = new Date(dateStr);
                const today = new Date();
                const futureDate = new Date();
                futureDate.setDate(today.getDate() + 30);
                return bookDate >= today && bookDate <= futureDate;
            }).length;
            return `${availableDays} days available`;
        }
        return 'Fully Available';
    };

    if (!vehicleId) return null;

    return (
        <Link
            to={`/vehicle/${vehicleId}`}
            className={`
                relative block cursor-pointer group w-full  
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-xl
                ${isSoldOut ? 'cursor-not-allowed pointer-events-none' : 'hover:shadow-lg transition-shadow duration-300'}
            `}
            aria-label={`View details for ${vehicleLocation} vehicle`}
        >
            <div className="flex flex-col gap-2 w-full h-full">
                {/* Image Container */}
                <div className="
                    aspect-square 
                    w-full 
                    relative 
                    overflow-hidden 
                    rounded-xl
                    bg-gray-100
                ">
                    <img
                        className={`
                            object-cover 
                            h-full 
                            w-full 
                            group-hover:scale-110 
                            transition-transform
                            duration-300
                            ease-in-out
                            ${isSoldOut ? 'grayscale opacity-75' : ''}
                        `}
                        src={vehicleImage}
                        alt={`${vehicleLocation} vehicle`}
                        loading={priority ? "eager" : "lazy"}
                        decoding={priority ? "sync" : "async"}
                        onError={(e) => {
                            e.target.src = '/placeholder-vehicle.jpg';
                        }}
                    />

                    {/* Sold Out Badge */}
                    {isSoldOut && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                            <span className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg transform rotate-12">
                                SOLD OUT
                            </span>
                        </div>
                    )}

                    {/* Availability Badge for available vehicles */}
                    {!isSoldOut && bookedDates.length > 0 && (
                        <span className="absolute top-3 right-3 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                            Partially Booked
                        </span>
                    )}

                    {/* Fully Available Badge */}
                    {!isSoldOut && bookedDates.length === 0 && (
                        <span className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                            Available
                        </span>
                    )}
                </div>

                {/* Content Container */}
                <div className="flex flex-col px-2 font-[font1] gap-2 flex-1">
                    {/* Location */}
                    <div className={`
                        font-semibold 
                        text-base
                        sm:text-lg 
                        truncate
                        ${isSoldOut ? 'text-gray-500' : 'text-gray-900'}
                    `}>
                        {vehicleLocation}
                    </div>

                    {/* Description */}
                    <div className={`
                        font-light 
                        text-sm
                        sm:text-base
                        leading-relaxed
                        min-h-[4rem]
                        sm:min-h-[4.5rem]
                        ${isSoldOut ? 'text-gray-400' : 'text-neutral-500'}
                    `}>
                        <div className="mb-1">
                            {truncateDescription(vehicleDescription)}
                        </div>
                        <div className="flex flex-col gap-0.5 text-xs sm:text-sm">
                            <span className={`font-semibold ${isSoldOut ? 'text-gray-500' : 'text-gray-700'}`}>
                                {vehicleSeats} seater
                            </span>
                            <span className={`${isSoldOut ? 'text-gray-400' : 'text-neutral-400'}`}>
                                Host: {hostName}
                            </span>
                        </div>

                        {/* Availability Status */}
                        <div className={`mt-2 text-xs font-medium ${isSoldOut ? 'text-red-500' :
                            bookedDates.length > 0 ? 'text-yellow-600' : 'text-green-600'
                            }`}>
                            {availabilityStatus()}
                        </div>

                        {/* Booked Dates */}
                        {!isSoldOut && formattedBookedDates.length > 0 && (
                            <div className="mt-1 text-xs">
                                <p className="text-red-500 font-medium">Booked dates:</p>
                                <p className="text-red-400">
                                    {formattedBookedDates.slice(0, 4).join(", ")}
                                    {formattedBookedDates.length > 4 && ` +${formattedBookedDates.length - 4} more`}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Price */}
                    <div className={`
                        flex 
                        flex-row 
                        items-center 
                        gap-1
                        mt-auto
                        ${isSoldOut ? 'opacity-60' : ''}
                    `}>
                        <div className={`
                            font-semibold 
                            text-base
                            sm:text-lg
                            ${isSoldOut ? 'text-gray-500 line-through' : 'text-gray-900'}
                        `}>
                            ${vehiclePrice}
                        </div>
                        <div className={`
                            font-light 
                            text-sm
                            sm:text-base
                            ${isSoldOut ? 'text-gray-400' : 'text-neutral-500'}
                        `}>
                            /night
                        </div>
                    </div>

                    {/* Status Badge - Now just for display */}
                    {isSoldOut ? (
                        <div className="mt-2 w-full px-4 py-2 rounded-lg text-center font-medium bg-red-500 text-white">
                            Sold Out - Unavailable
                        </div>
                    ) : (
                        <div className="mt-2 w-full px-4 py-2 text-center font-medium bg-gradient-to-r from-gray-900 to-black rounded-full text-white">
                            {bookedDates.length > 0 ? 'Check Available Dates' : 'Book Now'}
                        </div>
                    )}
                </div>
            </div>
        </Link>
    );
});

Card.displayName = 'Card';

export default Card;