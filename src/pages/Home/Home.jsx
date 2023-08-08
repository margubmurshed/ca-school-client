import React from "react";
import Slider from "./Slider/Slider";
import PopularClasses from "./PopularClasses/PopularClasses";
import StartTeaching from "./StartTeaching/StartTeaching";
import PopularInstructors from "./PopularInstructors/PopularInstructors";
import Stats from "./Stats/Stats";
import JoinCommunity from "./JoinCommunity/JoinCommunity";
import Testimonials from "./Testimonials/Testimonials";

const Home = () => {
  return (
    <div>
      <Slider />
      <PopularClasses />
      <PopularInstructors />
      <Stats />
      <JoinCommunity />
      <Testimonials />
      <StartTeaching />
    </div>
  );
};

export default Home;
