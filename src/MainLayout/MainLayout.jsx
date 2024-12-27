import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';

const MainLayout = () => {
    return (
        <div className='flex flex-col min-h-screen bg-white dark:bg-black'>
            <Navbar />
            <div className='flex-grow pt-[64px]'>
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default MainLayout;