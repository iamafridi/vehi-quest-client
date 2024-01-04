
import Heading from '../Shared/Heading'

const Header = ({ vehicle }) => {
  return (
    <>
      <Heading title={vehicle.title} subtitle={vehicle.location} />
      <div className='w-full md:h-[60vh] overflow-hidden rounded-xl'>
        <img
          className='object-cover w-full'
          src={vehicle.image}
          alt='header image'
        />
      </div>
    </>
  )
}

export default Header