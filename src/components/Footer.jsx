import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="px-4 divide-y bg-gray-800 text-white dark:bg-gray-800 dark:text-gray-200">
            <div className="w-10/12 mx-auto flex flex-col justify-between items-center gap-7 py-10 space-y-8 lg:flex-row lg:space-y-0">
                <div className="lg:w-[40%]">
                    <div className="flex md:items-center lg:justify-start mb-5">
                        <div 
                        // className="dark:bg-violet-600"
                        >
                            {/* <img src="" alt="logo" /> */}
                            <Link to="/"><img src={logo} alt="site-logo" className='w-12 rounded'/></Link>
                        </div>
                        <span className="self-center text-2xl font-semibold -mt-2">Reunify</span>
                    </div>
                    <p className='lg:pr-10 lg:px-0 md:px-5'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, nobis. Nobis non, nostrum reiciendis sed quisquam omnis fuga dolor eum!</p>

                </div>
                <div className="grid grid-cols-2 text-sm gap-x-3 gap-y-8 lg:w-[60%] sm:grid-cols-4">
                    <div className="space-y-3">
                        <h3 className="tracking-wide uppercase dark:text-gray-100 font-bold">Explore</h3>
                        <ul className="space-y-1">
                            <li>
                                <a rel="noopener noreferrer" href="#">Home</a>
                            </li>
                            <li>
                                <a rel="noopener noreferrer" href="#">Campaign's</a>
                            </li>
                            <li>
                                <a rel="noopener noreferrer" href="#">How It Works</a>
                            </li>
                            <li>
                                <a rel="noopener noreferrer" href="#">Success Stories</a>
                            </li>
                        </ul>
                    </div>
                    <div className="space-y-3">
                        <h3 className="tracking-wide uppercase dark:text-gray-100 font-bold">About</h3>
                        <ul className="space-y-1">
                            <li>
                                <a rel="noopener noreferrer" href="#">About Us</a>
                            </li>
                            <li>
                                <a rel="noopener noreferrer" href="#">Our Team</a>
                            </li>
                            <li>
                                <a rel="noopener noreferrer" href="#">Privacy Policy</a>
                            </li>
                            <li>
                                <a rel="noopener noreferrer" href="#">Terms of Service</a>
                            </li>
                        </ul>
                    </div>
                    <div className="space-y-3">
                        <h3 className="uppercase dark:text-gray-100 font-bold">Get in Touch</h3>
                        <ul className="space-y-1">
                            <li>
                                <a rel="noopener noreferrer" href="#"><span className='font-bold'>Email: </span>support@reunify.com</a>
                            </li>
                            <li>
                                <a rel="noopener noreferrer" href="#"><span className='font-bold'>Phone: </span>+1 234 567 890</a>
                            </li>
                            <li>
                                <a rel="noopener noreferrer" href="#"><span className='font-bold'>Address: </span>1234 Innovation Drive, New York, NY</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='w-10/12 mx-auto flex justify-between items-center'>
                <div className="py-6 text-sm dark:text-gray-400">© SRiTY. All rights reserved.</div>
                <div className="flex justify-start space-x-3">
                    <a rel="noopener noreferrer" href="#" title="Facebook" className="flex items-center p-1">
                        <FaFacebook className='text-xl'/>
                    </a>
                    <a rel="noopener noreferrer" href="#" title="Twitter" className="flex items-center p-1">
                        <FaTwitter className='text-xl'/>
                    </a>
                    <a rel="noopener noreferrer" href="#" title="Instagram" className="flex items-center p-1">
                        <FaInstagram className='text-xl'/>
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;