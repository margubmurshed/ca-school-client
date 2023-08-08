import React from "react";
import googleLogo from '../../../assets/Images/home/logos/Google_2015_logo.svg.png';
import facebookLogo from '../../../assets/Images/home/logos/Facebook_Logo_(2019).svg.png';
import amazonLogo from '../../../assets/Images/home/logos/Amazon_logo.svg.webp';
import spaceXLogo from '../../../assets/Images/home/logos/SpaceX_logo_black.svg.png';

const Partners = () => {
  return (
    <section className="p-5 py-20 mt-16 bg-ca-primary">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          <div className="text-white">
            <h2 className="mb-3 text-4xl font-bold uppercase">
              Our <span className="text-white">Partners</span>
            </h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi quaerat dolores dolorem magnam nisi omnis eveniet tenetur nesciunt, iste sit praesentium explicabo, accusantium animi delectus esse error dicta nemo dolor? Aperiam commodi exercitationem ad blanditiis cupiditate, explicabo quaerat laborum unde a similique, voluptatem autem non inventore id. Maiores, ducimus. Maxime?</p>
          </div>
          <div className="grid grid-cols-2 gap-10 items-center">
            <img src={googleLogo} alt="google" className=" brightness-0 invert"/>
            <img src={facebookLogo} alt="facebook" className=" brightness-0 invert"/>
            <img src={amazonLogo} alt="amazon" className=" brightness-0 invert"/>
            <img src={spaceXLogo} alt="spacex" className=" brightness-0 invert"/>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Partners;
