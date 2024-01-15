
import { Link } from 'react-router-dom';
import logoImg from '../../assets/images/logo.png'
const Logo = () => {
    return (
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
    );
};

export default Logo;