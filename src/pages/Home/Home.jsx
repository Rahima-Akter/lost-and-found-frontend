import React from 'react';
import Banner from './Banner';
import ItemsCards from './ItemsCards';
import ReunitedStories from './ReunitedStories';
import LostAndFoundStats from './LostAndFoundStats';

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