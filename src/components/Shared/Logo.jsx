import { Link } from 'react-router-dom';
import logoImg from '../../assets/images/logo.png'

const Logo = () => {
    return (
        <div className="bg-white/70 rounded-full  px-3">
            <Link className="flex items-center justify-center " to='/'>
                <img
                    className='hidden sm:block w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 flex-shrink-0'
                    src={logoImg}
                    alt='logo'
                />
                <h3 className='animated-text-logo lg:-ml-3.5 whitespace-nowrap'>
                    Vehi-Quest
                </h3>
            </Link>
        </div>
    );
};

export default Logo;