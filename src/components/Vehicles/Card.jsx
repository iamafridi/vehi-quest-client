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

    // Early return if vehicle is null/undefined
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

    // Don't render if essential data is missing
    if (!vehicleId) {
        return null;
    }

    return (
        <Link
            to={`/vehicle/${vehicleId}`}
            className="block cursor-pointer group w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-xl"
            aria-label={`View details for ${vehicleLocation} vehicle`}
        >
            <div className="flex flex-col gap-3 w-full h-full">
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
                        className="
                            object-cover 
                            h-full 
                            w-full 
                            group-hover:scale-110 
                            transition-transform
                            duration-300
                            ease-in-out
                        "
                        src={vehicleImage}
                        alt={`${vehicleLocation} vehicle`}
                        loading={priority ? "eager" : "lazy"}
                        decoding={priority ? "sync" : "async"}
                        onError={(e) => {
                            e.target.src = '/placeholder-vehicle.jpg';
                        }}
                    />

                    {/* Optional overlay for future features */}
                    <div className="
                        absolute
                        top-3
                        right-3
                        opacity-0
                        group-hover:opacity-100
                        transition-opacity
                        duration-200
                    ">
                        {/* Add heart icon or other features here */}
                    </div>
                </div>

                {/* Content Container */}
                <div className="flex flex-col gap-2 flex-1">
                    {/* Location */}
                    <div className="
                        font-semibold 
                        text-base
                        sm:text-lg 
                        text-gray-900
                        truncate
                    ">
                        {vehicleLocation}
                    </div>

                    {/* Description with fixed length */}
                    <div className="
                        font-light 
                        text-neutral-500
                        text-sm
                        sm:text-base
                        leading-relaxed
                        min-h-[4rem]
                        sm:min-h-[4.5rem]
                    ">
                        <div className="mb-1">
                            {truncateDescription(vehicleDescription)}
                        </div>
                        <div className="flex flex-col gap-0.5 text-xs sm:text-sm">
                            <span className="font-semibold text-gray-700">
                                {vehicleSeats} seater
                            </span>
                            <span className="text-neutral-400">
                                Host: {hostName}
                            </span>
                        </div>
                    </div>

                    {/* Price */}
                    <div className="
                        flex 
                        flex-row 
                        items-center 
                        gap-1
                        mt-auto
                    ">
                        <div className="
                            font-semibold 
                            text-base
                            sm:text-lg
                            text-gray-900
                        ">
                            ${vehiclePrice}
                        </div>
                        <div className="
                            font-light 
                            text-neutral-500
                            text-sm
                            sm:text-base
                        ">
                            /night
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
});

Card.displayName = 'Card';

export default Card;