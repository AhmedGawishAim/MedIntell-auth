import React from "react";
import Image from "next/image";
import AboutImg1 from "@/assets/images/landing-page/about-img.png";
import Icons from "@/components/ui/Icon";
const AboutSection = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-[120px] ">
      <div className="container mx-auto h-full">
        <div className="hero-content h-full grid grid-cols-1 md:grid-cols-2 items-center gap-8">
          {/* Left Image box */}
          <div className=" mb-8 md:mb-0 order-[2] md:order-[-1]">
            <Image
              src={AboutImg1}
              alt="Doctor"
              width={600}
              height={700}
              className="w-[90%] md:w-full lg:w-[90%] !h-[100%] mx-auto rounded-xl "
            />
          </div>

          {/* Right Content box */}
          <div className=" text-center md:text-left">
            <p className="text-blue-600 font-medium mb-2">About Us</p>
            <h2 className="text-2xl md:text-3xl font-bold text-[#234A6B] mb-4">
              World-Class Preventive,
              <br />
              Prescriptive & Curative
              <br />
              Medical Practices
            </h2>
            <p className="text-[#757575] mb-6 max-w-md mx-auto md:mx-0">
              Being in the healthcare sector, we consider it our paradigm duty
              to ensure Safety of our patients, effectiveness of our treatments,
              transparency in our practices, and absolute timely care.
            </p>
            <a
              href="#"
              className="
              text-[16px] py-2 px-5 rounded-[5px] font-semibold text-white bg-[#0086FF] 
              hover:opacity-80 hover:scale-105 
              transition duration-300 ease-in-out transform
            "
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
