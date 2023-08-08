import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";

const Testimonials = () => {
  return (
    <section className="container mx-auto p-5 mt-16">
      <h2 className="text-center mb-10 text-4xl font-bold uppercase">
        What Our <span className="text-ca-primary">Students</span> Say
      </h2>
      <div>
        <Swiper
          pagination={true}
          modules={[Pagination]}
          className="mySwiper"
          slidesPerView={3}
          spaceBetween={30}
        >
          <SwiperSlide>
            <div className="p-5 border space-y-3">
              <div className="flex gap-3">
                <div className="avatar placeholder">
                  <div className="bg-neutral-focus text-neutral-content rounded-full w-10 h-10">
                    <span className="text-xs">HM</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold">Hema Malini</h3>
                  <p>Student</p>
                </div>
              </div>
              <p className="text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Tempore, explicabo consequatur beatae itaque labore ducimus
                quaerat hic, modi asperiores non veniam provident dolorem.
                Voluptatum minus quae velit unde! At, deleniti.
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="p-5 border space-y-3">
              <div className="flex gap-3">
                <div className="avatar placeholder">
                  <div className="bg-neutral-focus text-neutral-content rounded-full w-10 h-10">
                    <span className="text-xs">JM</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold">Jhankar Mahbub</h3>
                  <p>Student</p>
                </div>
              </div>
              <p className="text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Tempore, explicabo consequatur beatae itaque labore ducimus
                quaerat hic, modi asperiores non veniam provident dolorem.
                Voluptatum minus quae velit unde! At, deleniti.
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="p-5 border space-y-3">
              <div className="flex gap-3">
                <div className="avatar placeholder">
                  <div className="bg-neutral-focus text-neutral-content rounded-full w-10 h-10">
                    <span className="text-xs">SAH</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold">Shakib Al Hasan</h3>
                  <p>Student</p>
                </div>
              </div>
              <p className="text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Tempore, explicabo consequatur beatae itaque labore ducimus
                quaerat hic, modi asperiores non veniam provident dolorem.
                Voluptatum minus quae velit unde! At, deleniti.
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="p-5 border space-y-3">
              <div className="flex gap-3">
                <div className="avatar placeholder">
                  <div className="bg-neutral-focus text-neutral-content rounded-full w-10 h-10">
                    <span className="text-xs">MS</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold">Mahendra Singh Dhoni</h3>
                  <p>Student</p>
                </div>
              </div>
              <p className="text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Tempore, explicabo consequatur beatae itaque labore ducimus
                quaerat hic, modi asperiores non veniam provident dolorem.
                Voluptatum minus quae velit unde! At, deleniti.
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="p-5 border space-y-3">
              <div className="flex gap-3">
                <div className="avatar placeholder">
                  <div className="bg-neutral-focus text-neutral-content rounded-full w-10 h-10">
                    <span className="text-xs">RP</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold">Ricky Ponting</h3>
                  <p>Student</p>
                </div>
              </div>
              <p className="text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Tempore, explicabo consequatur beatae itaque labore ducimus
                quaerat hic, modi asperiores non veniam provident dolorem.
                Voluptatum minus quae velit unde! At, deleniti.
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="p-5 border space-y-3">
              <div className="flex gap-3">
                <div className="avatar placeholder">
                  <div className="bg-neutral-focus text-neutral-content rounded-full w-10 h-10">
                    <span className="text-xs">DB</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold">Don Bradman</h3>
                  <p>Student</p>
                </div>
              </div>
              <p className="text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Tempore, explicabo consequatur beatae itaque labore ducimus
                quaerat hic, modi asperiores non veniam provident dolorem.
                Voluptatum minus quae velit unde! At, deleniti.
              </p>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;
