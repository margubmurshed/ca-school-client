import image1 from "../../../assets/Images/home/image1.webp";
import image2 from "../../../assets/Images/home/image2.jpg";
import image3 from "../../../assets/Images/home/image3.jpg";
import image4 from "../../../assets/Images/home/image4.jpg";
import coachesImg from "../../../assets/Images/home/coaches.png";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-creative";
import "swiper/css/navigation";

// import required modules
import { EffectCreative } from "swiper";
import { Navigation } from "swiper";
import { Slide } from "react-awesome-reveal";

const Slider = () => {
  return (
    <div>
      <Swiper
        grabCursor={true}
        effect={"creative"}
        creativeEffect={{
          prev: {
            shadow: true,
            translate: [0, 0, -400],
          },
          next: {
            translate: ["100%", 0, 0],
          },
        }}
        modules={[EffectCreative, Navigation]}
        navigation={true}
        className="mySwiper"
        loop
      >
        <SwiperSlide>
          <div className="w-full h-[500px] relative select-none">
            <img
              src={coachesImg}
              alt="coaches image"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-80 p-10 text-white flex flex-col justify-center">
              <Slide triggerOnce>
              <div className="md:w-3/4 mx-auto text-center space-y-5">
                <h2 className="text-4xl md:text-5xl font-bold text-center uppercase">
                  <span className="text-ca-primary">World Class</span> Coaches
                  are here
                </h2>
                <p className="md:text-lg font-thin">
                  Join an experienced coaching panel, with guest appearances by
                  leading state or Bangladeshi players and coaches, and receive
                  top-level coaching at an CA Cricket School.
                </p>
              </div>
              </Slide>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full h-[500px] relative select-none">

            <img src={image1} alt="batting image" className="w-full h-full object-cover" />
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-80 p-10 text-white flex flex-col justify-center">
              <Slide triggerOnce>
              <div className="md:w-3/4 mx-auto text-center space-y-5">
                <h2 className="text-4xl md:text-5xl font-bold text-center uppercase">
                learn <span className="text-ca-primary">batting</span> techniques
                </h2>
                <p className="md:text-lg font-thin">
                  Join an experienced coaching panel, with guest appearances by
                  leading state or Bangladeshi players and coaches, and receive
                  top-level coaching at an CA Cricket School.
                </p>
              </div>
              </Slide>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full h-[500px] relative select-none">

            <img src={image3} alt="" className="w-full h-full object-cover" />
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-80 p-10 text-white flex flex-col justify-center">
              <Slide triggerOnce>
              <div className="md:w-3/4 mx-auto text-center space-y-5">
                <h2 className="text-4xl md:text-5xl font-bold text-center uppercase">
                learn <span className="text-ca-primary">pace bowling</span> techniques
                </h2>
                <p className="md:text-lg font-thin">
                  Join an experienced coaching panel, with guest appearances by
                  leading state or Bangladeshi players and coaches, and receive
                  top-level coaching at an CA Cricket School.
                </p>
              </div>
              </Slide>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full h-[500px] relative select-none">

            <img src={image4} alt="" className="w-full h-full object-cover" />
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-80 p-10 text-white flex flex-col justify-center">
              <Slide triggerOnce>
              <div className="md:w-3/4 mx-auto text-center space-y-5">
                <h2 className="text-4xl md:text-5xl font-bold text-center uppercase">
                learn <span className="text-ca-primary">keeping</span> techniques
                </h2>
                <p className="md:text-lg font-thin">
                  Join an experienced coaching panel, with guest appearances by
                  leading state or Bangladeshi players and coaches, and receive
                  top-level coaching at an CA Cricket School.
                </p>
              </div>
              </Slide>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Slider;
