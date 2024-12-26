import React from 'react';
import Banner from './Banner';
import ItemsCards from '../../components/ItemsCards';
import ReunitedStories from '../../components/ReunitedStories';
import LostAndFoundStats from '../../components/LostAndFoundStats';

const Home = () => {
    return (
        <div>
            <Banner />
            <div className='w-11/12 mx-auto'>
                <ItemsCards/>
                <ReunitedStories/>
                <LostAndFoundStats/>
            </div>
        </div>
    );
};

export default Home;