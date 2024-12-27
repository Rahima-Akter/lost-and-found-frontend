import { Link } from 'react-router-dom';
import notFound from '../assets/404.gif'

const NotFound = () => {
    return (
        <div>
            <div className='flex flex-col justify-center items-center'>
                <img src={notFound} alt="404 not found img" className='relative'/>
                <Link to='/'
                        type="submit"
                        className="px-6 py-2 bg-gray-800 border-2 border-white text-white font-bold text-lg hover:bg-gray-700 transition duration-700 absolute lg:left-[45%] md:left-[35%] lg:bottom-10 md:bottom-36 bottom-52 rounded-md"
                    >
                       ← Go back home
                    </Link>
            </div>
        </div>
    );
};

export default NotFound;