import { Link } from "react-router-dom";

const Card = ({ vehicle }) => {
    // Function to truncate description to a fixed length
    const truncateDescription = (text, maxLength = 50) => {
        if (!text) return '';
        return text.length > maxLength
            ? text.substring(0, maxLength).trim() + '...'
            : text;
    };

    return (
        <Link
            to={`/vehicle/${vehicle?._id}`}
            className='block cursor-pointer group w-full'
        >
            <div className='flex flex-col gap-3 w-full h-full'>
                {/* Image Container */}
                <div className='
                    aspect-square 
                    w-full 
                    relative 
                    overflow-hidden 
                    rounded-xl
                    bg-gray-100
                '>
                    <img
                        className='
                            object-cover 
                            h-full 
                            w-full 
                            group-hover:scale-110 
                            transition-transform
                            duration-300
                            ease-in-out
                        '
                        src={vehicle?.image}
                        alt={`${vehicle?.location} vehicle`}
                        loading="lazy"
                    />

                    {/* Optional overlay for future features */}
                    <div className='
                        absolute
                        top-3
                        right-3
                        opacity-0
                        group-hover:opacity-100
                        transition-opacity
                        duration-200
                    '>
                        {/* Add heart icon or other features here */}
                    </div>
                </div>

                {/* Content Container */}
                <div className='flex flex-col gap-2 flex-1'>
                    {/* Location */}
                    <div className='
                        font-semibold 
                        text-base
                        sm:text-lg 
                        text-gray-900
                        truncate
                    '>
                        {vehicle?.location}
                    </div>

                    {/* Description with fixed length */}
                    <div className='
                        font-light 
                        text-neutral-500
                        text-sm
                        sm:text-base
                        leading-relaxed
                        min-h-[4rem]
                        sm:min-h-[4.5rem]
                    '>
                        <div className='mb-1'>
                            {truncateDescription(vehicle?.description)}
                        </div>
                        <div className='flex flex-col gap-0.5 text-xs sm:text-sm'>
                            <span className="font-semibold text-gray-700">
                                {vehicle?.seats} seater
                            </span>
                            <span className="text-neutral-400">
                                Host: {vehicle?.host?.name}
                            </span>
                        </div>
                    </div>

                    {/* Price */}
                    <div className='
                        flex 
                        flex-row 
                        items-center 
                        gap-1
                        mt-auto
                    '>
                        <div className='
                            font-semibold 
                            text-base
                            sm:text-lg
                            text-gray-900
                        '>
                            ${vehicle?.price}
                        </div>
                        <div className='
                            font-light 
                            text-neutral-500
                            text-sm
                            sm:text-base
                        '>
                            /night
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default Card;