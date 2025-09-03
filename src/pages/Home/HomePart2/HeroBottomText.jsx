import { Link, useNavigate } from 'react-router-dom'

const HomeBottomText = () => {
    return (
        <div className='font-[font2] flex-shrink-0 flex flex-col items-center gap-2 sm:gap-8 md:gap-5'>
            {/* Description Text - Now properly positioned above buttons */}
            <p className='w-full rounded-2xl p-2 backdrop-blur-md max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl font-[font1] text-xs sm:text-sm md:text-base lg:text-lg leading-tight sm:leading-relaxed text-center px-4'>
                VehiQuest connects vehicle owners with adventurous renters across the globe. From sleek sports cars to spacious vans, find your perfect ride for any journey. Whether you're hosting your vehicle or seeking your next adventure, we make every mile memorable with secure payments and seamless booking.
            </p>

            {/* Navigation Buttons */}
            <div className='flex items-center justify-center gap-2 sm:gap-4 md:gap-6 flex-wrap'>
                <div className='border-2 backdrop-blur-md lg:border-3 hover:border-[#D3FD50] hover:text-[#D3FD50] transition-colors duration-300 h-24 sm:h-32 md:h-36 lg:h-44 flex items-center px-4 sm:px-6 md:px-10 lg:px-14 border-white rounded-full uppercase mb-4 sm:mb-0'>
                    <Link className='text-[4.5vw] sm:text-[3.8vw] md:text-[3.2vw] lg:text-[4.5vw] xl:text-[3.2vw] mt-2 sm:mt-3 md:mt-4 lg:mt-6 whitespace-nowrap' to='/login'>
                        Book Now
                    </Link>
                </div>
                <div className='border-2 backdrop-blur-md lg:border-3 hover:border-[#D3FD50] hover:text-[#D3FD50] transition-colors duration-300 h-24 sm:h-32 md:h-36 lg:h-44 flex items-center px-4 sm:px-6 md:px-10 lg:px-14 border-white rounded-full uppercase mb-4 sm:mb-0'>
                    <Link className='text-[4.5vw] sm:text-[3.8vw] md:text-[3.2vw] lg:text-[4.5vw] xl:text-[3.2vw] mt-2 sm:mt-3 md:mt-4 lg:mt-6 whitespace-nowrap' to='/dashboard'>
                        Host Now
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default HomeBottomText