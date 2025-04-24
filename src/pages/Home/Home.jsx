import React from "react";
import Banner from "./Banner";
import ItemsCards from "./ItemsCards";
import ReunitedStories from "./ReunitedStories";
import LostAndFoundStats from "./LostAndFoundStats";
import TipsSection from "./TipsSection";
import MissionStatement from "./MissionStatement";

const Home = () => {
  return (
    <div>
      <Banner />
      <div className="w-11/12 mx-auto">
        <ItemsCards />
        <ReunitedStories />
        <LostAndFoundStats />
        <TipsSection />
      </div>
      <MissionStatement />
    </div>
  );
};

export default Home;
