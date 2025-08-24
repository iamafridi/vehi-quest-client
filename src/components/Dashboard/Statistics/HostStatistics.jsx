import { Calendar } from 'react-date-range'
import { FaDollarSign } from 'react-icons/fa'
import { BsFillCartPlusFill, BsFillHouseDoorFill } from 'react-icons/bs'
import { GiPlayerTime } from 'react-icons/gi'
import SalesLineChart from './SalesLineChart'
import { formatDistanceToNow } from 'date-fns'
import { useQuery } from '@tanstack/react-query'
import Loader from '../../Shared/Loader'
import { getHostStat } from '../../../api/utils'

const HostStatistics = () => {
  const { data: statData = {}, isLoading, error } = useQuery({
    queryKey: ['hostStatData'],
    queryFn: async () => await getHostStat(),
  })

  if (isLoading) return <Loader />

  // Handle error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-2">Failed to load statistics</p>
          <p className="text-gray-500">Please try refreshing the page</p>
        </div>
      </div>
    )
  }

  // Helper function to format host since date safely
  const formatHostSince = (dateString) => {
    if (!dateString) return 'N/A'
    try {
      const date = new Date(dateString)
      if (isNaN(date.getTime())) return 'N/A'
      return formatDistanceToNow(date) + ' ago'
    } catch (error) {
      console.error('Error formatting host since date:', error)
      return 'N/A'
    }
  }

  // Destructure with defaults
  const {
    totalSale = 0,
    bookingCount = 0,
    vehicleCount = 0,
    hostSince = null,
    chartData = []
  } = statData

  return (
    <div>
      <div className='mt-12'>
        {/* Small cards */}
        <div className='mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {/* Sales Card */}
          <div className='relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md'>
            <div
              className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-orange-600 to-orange-400 text-white shadow-orange-500/40`}
            >
              <FaDollarSign className='w-6 h-6 text-white' />
            </div>
            <div className='p-4 text-right'>
              <p className='block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600'>
                Total Sales
              </p>
              <h4 className='block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900'>
                ${typeof totalSale === 'number' ? totalSale.toFixed(2) : '0.00'}
              </h4>
            </div>
          </div>

          {/* Total Bookings */}
          <div className='relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md'>
            <div
              className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-blue-600 to-blue-400 text-white shadow-blue-500/40`}
            >
              <BsFillCartPlusFill className='w-6 h-6 text-white' />
            </div>
            <div className='p-4 text-right'>
              <p className='block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600'>
                Total Bookings
              </p>
              <h4 className='block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900'>
                {bookingCount || 0}
              </h4>
            </div>
          </div>

          {/* Total Vehicles */}
          <div className='relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md'>
            <div
              className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-pink-600 to-pink-400 text-white shadow-pink-500/40`}
            >
              <BsFillHouseDoorFill className='w-6 h-6 text-white' />
            </div>
            <div className='p-4 text-right'>
              <p className='block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600'>
                Total Vehicles
              </p>
              <h4 className='block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900'>
                {vehicleCount || 0}
              </h4>
            </div>
          </div>

          {/* Host Since Card */}
          <div className='relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md'>
            <div
              className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-green-600 to-green-400 text-white shadow-green-500/40`}
            >
              <GiPlayerTime className='w-6 h-6 text-white' />
            </div>
            <div className='p-4 text-right'>
              <p className='block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600'>
                Host Since
              </p>
              <h4 className='block antialiased tracking-normal font-sans text-xl font-semibold leading-snug text-blue-gray-900'>
                {formatHostSince(hostSince)}
              </h4>
            </div>
          </div>
        </div>

        <div className='mb-4 grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3'>
          {/* Total Sales Graph */}
          <div className='relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden xl:col-span-2'>
            {chartData && chartData.length > 0 ? (
              <SalesLineChart data={chartData} />
            ) : (
              <div className="flex items-center justify-center h-64">
                <p className="text-gray-500">No chart data available</p>
              </div>
            )}
          </div>

          {/* Calendar */}
          <div className='relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden'>
            <Calendar color='#F43F5E' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HostStatistics

// import { Calendar } from 'react-date-range'
// import { FaDollarSign } from 'react-icons/fa'
// import { BsFillCartPlusFill, BsFillHouseDoorFill } from 'react-icons/bs'
// import { GiPlayerTime } from 'react-icons/gi'
// import SalesLineChart from './SalesLineChart'
// import { formatDistanceToNow } from 'date-fns'
// import { useQuery } from '@tanstack/react-query'
// import Loader from '../../Shared/Loader'
// import { getHostStat } from '../../../api/utils'
// const HostStatistics = () => {
//   const { data: statData = [], isLoading } = useQuery({
//     queryKey: ['statData'],
//     queryFn: async () => await getHostStat(),
//   })
//   if (isLoading) return <Loader />
//   return (
//     <div>
//       <div className='mt-12'>
//         {/* small cards */}
//         <div className='mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
//           {/* Sales Card */}
//           <div className='relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md'>
//             <div
//               className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-orange-600 to-orange-400 text-white shadow-orange-500/40`}
//             >
//               <FaDollarSign className='w-6 h-6 text-white' />
//             </div>
//             <div className='p-4 text-right'>
//               <p className='block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600'>
//                 Total Sales
//               </p>
//               <h4 className='block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900'>
//                 ${statData?.totalSale}
//               </h4>
//             </div>
//           </div>

//           {/* Total Bookings */}
//           <div className='relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md'>
//             <div
//               className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-blue-600 to-blue-400 text-white shadow-blue-500/40`}
//             >
//               <BsFillCartPlusFill className='w-6 h-6 text-white' />
//             </div>
//             <div className='p-4 text-right'>
//               <p className='block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600'>
//                 Total Bookings
//               </p>
//               <h4 className='block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900'>
//                 {statData?.bookingCount}
//               </h4>
//             </div>
//           </div>
//           {/* Total Vehicles */}
//           <div className='relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md'>
//             <div
//               className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-pink-600 to-pink-400 text-white shadow-pink-500/40`}
//             >
//               <BsFillHouseDoorFill className='w-6 h-6 text-white' />
//             </div>
//             <div className='p-4 text-right'>
//               <p className='block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600'>
//                 Total Vehicles
//               </p>
//               <h4 className='block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900'>
//                 {statData?.vehicleCount}
//               </h4>
//             </div>
//           </div>

//           {/* Users Card */}
//           <div className='relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md'>
//             <div
//               className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-green-600 to-green-400 text-white shadow-green-500/40`}
//             >
//               <GiPlayerTime className='w-6 h-6 text-white' />
//             </div>
//             <div className='p-4 text-right'>
//               <p className='block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600'>
//                 Host Since...
//               </p>
//               <h4 className='block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900'>
//                 {statData?.hostSince &&
//                   formatDistanceToNow(new Date(statData.hostSince))}
//               </h4>
//             </div>
//           </div>
//         </div>

//         <div className='mb-4 grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3'>
//           {/* Total Sales Graph */}
//           <div className='relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden xl:col-span-2'>
//             <SalesLineChart data={statData?.chartData} />
//           </div>
//           {/* Calender */}
//           <div className='relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md overflow-hidden'>
//             <Calendar color='#F43F5E' />
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default HostStatistics