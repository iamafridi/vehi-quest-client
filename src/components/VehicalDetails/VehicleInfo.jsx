/* eslint-disable react/prop-types */
const VehicleInfo = ({ vehicle }) => {
  const bookedDates = vehicle?.bookedDates || [];
  const isSoldOut = vehicle?.soldOut || false;

  // Calculate availability statistics
  const getAvailabilityStats = () => {
    if (isSoldOut) return { status: 'Sold Out', color: 'text-red-600', bgColor: 'bg-red-50' };

    if (bookedDates.length === 0) {
      return { status: 'Fully Available', color: 'text-green-600', bgColor: 'bg-green-50' };
    }

    // Calculate future bookings (next 30 days)
    const today = new Date();
    const futureDate = new Date();
    futureDate.setDate(today.getDate() + 30);

    const futureBookings = bookedDates.filter(dateStr => {
      const bookDate = new Date(dateStr);
      return bookDate >= today && bookDate <= futureDate;
    });

    const availableDays = 30 - futureBookings.length;

    if (availableDays > 20) {
      return {
        status: `Mostly Available (${availableDays}/30 days)`,
        color: 'text-green-600',
        bgColor: 'bg-green-50'
      };
    } else if (availableDays > 10) {
      return {
        status: `Partially Available (${availableDays}/30 days)`,
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-50'
      };
    } else {
      return {
        status: `Limited Availability (${availableDays}/30 days)`,
        color: 'text-orange-600',
        bgColor: 'bg-orange-50'
      };
    }
  };

  const availabilityStats = getAvailabilityStats();

  // Format upcoming booked dates for display
  const getUpcomingBookedDates = () => {
    if (bookedDates.length === 0) return [];

    const today = new Date();
    const upcomingDates = bookedDates
      .map(dateStr => new Date(dateStr))
      .filter(date => date >= today)
      .sort((a, b) => a - b)
      .slice(0, 5)
      .map(date => date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined
      }));

    return upcomingDates;
  };

  const upcomingBookedDates = getUpcomingBookedDates();

  return (
    <div className='col-span-4 flex flex-col gap-8'>
      {/* Host Information */}
      <div className='flex flex-col gap-2'>
        <div className='text-xl font-semibold flex flex-row items-center gap-2'>
          <div>Hosted by {vehicle?.host?.name}</div>
          <img
            className='rounded-full'
            height='30'
            width='30'
            alt='Avatar'
            src={vehicle?.host?.image}
          />
        </div>

        <div className='flex flex-row items-center gap-4 font-light text-neutral-500'>
          <div>{vehicle?.guests || vehicle?.seats} {vehicle?.seats ? 'seats' : 'guests'}</div>
          <div>{vehicle?.category || 'Vehicle'}</div>
          {vehicle?.year && <div>{vehicle.year}</div>}
        </div>
      </div>

      <hr />

      {/* Availability Status */}
      <div className='flex flex-col gap-3'>
        <h3 className='text-lg font-semibold'>Availability Status</h3>

        <div className={`p-4 rounded-lg ${availabilityStats.bgColor}`}>
          <div className={`font-semibold ${availabilityStats.color} mb-2`}>
            {availabilityStats.status}
          </div>

          {isSoldOut && (
            <p className='text-red-600 text-sm'>
              This vehicle is currently sold out and unavailable for booking.
            </p>
          )}

          {!isSoldOut && bookedDates.length > 0 && (
            <div className='text-sm text-gray-700'>
              <p className='mb-2'>
                Total booked days: {bookedDates.length}
              </p>

              {upcomingBookedDates.length > 0 && (
                <div>
                  <p className='font-medium text-gray-800 mb-1'>Next unavailable dates:</p>
                  <p className='text-gray-600'>
                    {upcomingBookedDates.join(', ')}
                    {bookedDates.filter(dateStr => new Date(dateStr) >= new Date()).length > 5 &&
                      ` +${bookedDates.filter(dateStr => new Date(dateStr) >= new Date()).length - 5} more`
                    }
                  </p>
                </div>
              )}
            </div>
          )}

          {!isSoldOut && bookedDates.length === 0 && (
            <p className='text-green-600 text-sm'>
              This vehicle is fully available for booking on any dates.
            </p>
          )}
        </div>
      </div>

      <hr />

      {/* Vehicle Description */}
      <div className='flex flex-col gap-3'>
        <h3 className='text-lg font-semibold'>About this vehicle</h3>
        <div className='text-lg font-light text-neutral-500 leading-relaxed'>
          {vehicle?.description}
        </div>
      </div>

      <hr />

      {/* Vehicle Features/Specifications */}
      {(vehicle?.features || vehicle?.specs) && (
        <>
          <div className='flex flex-col gap-3'>
            <h3 className='text-lg font-semibold'>Features & Specifications</h3>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              {vehicle?.features && (
                <div>
                  <h4 className='font-medium text-gray-800 mb-2'>Features</h4>
                  <ul className='text-sm text-gray-600 space-y-1'>
                    {vehicle.features.map((feature, index) => (
                      <li key={index} className='flex items-center gap-2'>
                        <span className='w-2 h-2 bg-blue-500 rounded-full'></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {vehicle?.specs && (
                <div>
                  <h4 className='font-medium text-gray-800 mb-2'>Specifications</h4>
                  <div className='text-sm text-gray-600 space-y-1'>
                    {Object.entries(vehicle.specs).map(([key, value]) => (
                      <div key={key} className='flex justify-between'>
                        <span className='capitalize'>{key.replace(/([A-Z])/g, ' $1')}:</span>
                        <span className='font-medium'>{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          <hr />
        </>
      )}

      {/* Booking Policy - FIXED ENCODING */}
      <div className='flex flex-col gap-3'>
        <h3 className='text-lg font-semibold'>Booking Policy</h3>
        <div className='text-sm text-gray-600 space-y-2'>
          <p>• Bookings must be made at least 24 hours in advance</p>
          <p>• Cancellation allowed up to 48 hours before start date</p>
          <p>• Valid driver's license required</p>
          <p>• Security deposit may be required</p>
          {isSoldOut && (
            <p className='text-red-600 font-medium'>• This vehicle is currently sold out</p>
          )}
        </div>
      </div>

      <hr />
    </div>
  )
}

export default VehicleInfo;