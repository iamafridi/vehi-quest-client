import { Link } from 'react-router-dom'
import Container from '../Container'
import logoImg from '../../../assets/images/logo.png'
import MenuDropdown from './MenuDropdown'

const Navbar = () => {
  return (
    <div className='fixed w-full bg-white z-10 shadow-sm'>
      <div className='py-4 border-b-[1px]'>
        <Container>
          <div className='flex flex-row  nitems-center justify-between gap-3 md:gap-0'>
            {/* Logo */}
            <Link className="flex items-center" to='/'>
              <img
                className='hidden md:block'
                src={logoImg}
                alt='logo'
                width='100'
                height='100'
              />
               <h3 className='font-bold uppercase -ml-3 text-xl '>VehiQuest</h3>
            </Link>
            {/* Dropdown Menu */}
            <MenuDropdown />
          </div>
        </Container>
      </div>
    </div>
  )
}

export default Navbar
