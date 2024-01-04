/* eslint-disable react/prop-types */
const VehicleInfo = ({ vehicle }) => {
    return (
      <div className='col-span-4 flex flex-col gap-8'>
        <div className='flex flex-col gap-2'>
          <div
            className='
                  text-xl 
                  font-semibold 
                  flex 
                  flex-row 
                  items-center
                  gap-2
                '
          >
            <div>Hosted by {vehicle?.host?.name}</div>
  
            <img
              className='rounded-full'
              height='30'
              width='30'
              alt='Avatar'
              src={vehicle?.host?.image}
            />
          </div>
          <div
            className='
                  flex 
                  flex-row 
                  items-center 
                  gap-4 
                  font-light
                  text-neutral-500
                '
          >
            <div>{vehicle?.guests} guests</div>
            <div>{vehicle?.bedrooms} rooms</div>
            <div>{vehicle?.bathrooms} bathrooms</div>
          </div>
        </div>
  
        <hr />
        <div
          className='
            text-lg font-light text-neutral-500'
        >
          {vehicle?.description}
        </div>
        <hr />
      </div>
    )
  }
  
  export default VehicleInfo;