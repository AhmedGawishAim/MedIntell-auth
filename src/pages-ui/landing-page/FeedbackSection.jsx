"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay"; 
import { Navigation, Autoplay } from "swiper/modules";
import Icons from "@/components/ui/Icon";

const testimonials = [
  {
    quote:
      "Thank you for the excellent online consultation. The doctors were attentive and helped me feel at ease throughout the process.",
    name: "Pepe Madrid",
    position: "CEO of Something INC",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    quote:
      "I’m truly grateful for the prompt specialist booking service. It made managing my health so much easier and stress-free.",
    name: "Laura Chen",
    position: "Marketing Director",
    avatar:
      "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    quote:
      "Accessing my health records online saved me a lot of time and hassle. The system is secure and very user-friendly!",
    name: "Mark Robinson",
    position: "Product Manager",
    avatar:
      "https://randomuser.me/api/portraits/men/43.jpg",
  },
  {
    quote:
      "Managing my prescriptions online has never been easier. Thank you for making healthcare more accessible and convenient.",
    name: "Sophia Lee",
    position: "Software Engineer",
    avatar:
      "https://randomuser.me/api/portraits/women/44.jpg",
  },
];

export default function MedicalCarousel() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="feedback-section py-[130px] relative bg-[#0086ff21]">
      <div className="container mx-auto px-[30px] lg:px-0 ">
        <div className="relative text-content py-[30px]">
          <h1 className="text-[30px] text-[#234A6B] sm:w-[50%]">
            Read feedback about our Services and wonderful team!
          </h1>
          <h2 className="text-[16px] text-[#757575] sm:w-[50%]">
            We take care of our patients just like a family member. Read the
            testimonials from our patients.
          </h2>
          {/* customized arrow for swiper js */}
          <div className="absolute top-4 right-0 hidden sm:flex gap-2 z-10">
            <button
              ref={prevRef}
              className="flex justify-center items-center bg-blue-600 hover:bg-blue-700 text-white w-[40px] h-[40px] rounded-full shadow-md"
            >
              <Icons icon="akar-icons:arrow-left" width="24" height="24" />
            </button>
            <button
              ref={nextRef}
              className="flex justify-center items-center bg-blue-600 hover:bg-blue-700 text-white w-[40px] h-[40px] rounded-full shadow-md"
            >
              <Icons icon="akar-icons:arrow-right" width="24" height="24" />
            </button>
          </div>
        </div>
         {/* slider of feedback */}
        <Swiper
          spaceBetween={30}
          loop={true}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          autoplay={{
            delay: 3000, 
            disableOnInteraction: false, 
          }}
          onBeforeInit={(swiper) => {
            if (typeof swiper.params.navigation !== "boolean") {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }
          }}
          modules={[Navigation, Autoplay]}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {testimonials.map((testimonial, idx) => (
            <SwiperSlide key={idx}>
              <div className="p-6 bg-white rounded-xl shadow-md h-full flex flex-col justify-between">
                <div className="flex flex-col gap-12 cursor-pointer">
                  <p className="text-[17px] text-gray-900 font-display text-balance line-clamp-3">
                    {testimonial.quote}
                  </p>
                  <div className="block flex-shrink-0">
                    <div className="flex items-center">
                      <div>
                        <img
                          className="inline-block h-9 w-9 rounded-full object-cover object-center"
                          src={testimonial.avatar}
                          alt={testimonial.name}
                        />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-700">
                          {testimonial.name}
                        </p>
                        <p className="text-xs font-medium text-gray-500">
                          {testimonial.position}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
