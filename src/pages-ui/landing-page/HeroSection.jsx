"use client";
import React from "react";
import Image from "next/image";
import DoctorImg1 from "@/assets/images/landing-page/doctor2.png";
import Icons from "@/components/ui/Icon";
import { motion } from "framer-motion";
const HeroSection = () => {
  return (
    <div className=" bg-[#0086ff21]  px-6 ">
      <div className="container mx-auto h-full">
        <div className="hero-content h-full grid grid-cols-1 md:grid-cols-2 items-center gap-8">
          <div className="box-left md:py-[160px] py-[20px] ">
            <motion.h1
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-3xl md:text-5xl font-bold mb-4 sm:!leading-[60px] md:!leading-[60px]"
            >
              <span className="text-gray-900">Get Expert </span>
              <span className="text-blue-600">Medical Consultation!</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-gray-600 mb-6 max-w-md mx-auto md:mx-0"
            >
              Our doctors provide expert medical advice and consultation. Get in
              touch with our team to discuss.
            </motion.p>
            {/* Search section of hero */}
            <div className="flex items-center bg-white shadow-md rounded-[10px] px-4 py-2 w-[80%] sm:max-w-md mx-auto md:mx-0">
              <div className="location-icon">
              <Icons icon="akar-icons:location" width="24" height="24" />
              </div>
              <input
                type="text"
                placeholder="Search Doctors in your location"
                className="flex-1 px-2 outline-none text-sm text-[#234A6B]"
              />
              <a href="#" className=" absolute right-4  sm:static  bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-[5px] ml-2 cursor-pointer">
                <Icons icon="hugeicons:search-01" width="24" height="24" />
              </a>
            </div>
          </div>
          <div className="box-right  h-full order-[-5] md:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className=" box-img h-full mb-10 md:mb-0"
            >
              <Image   src={DoctorImg1} alt="Doctor" width={600} height={700} priority className=" w-[80%] sm:w-full !h-[100%] sm:mx-auto rounded-xl"  />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
