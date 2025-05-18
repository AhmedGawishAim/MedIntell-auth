import React from 'react';
import Image from 'next/image';
import DentistryIcon from "@/assets/images/landing-page/dentistry.png";
import InjectionIcon from "@/assets/images/landing-page/injection.png";
import SurgeryIcon from "@/assets/images/landing-page/surgery.png";
import CardiologyIcon from "@/assets/images/landing-page/cardiology.png";
import PharmacyIcon from "@/assets/images/landing-page/pharmacy.png";
import StaffIcon from "@/assets/images/landing-page/staff.png";
import DnaIcon from "@/assets/images/landing-page/DNA.png";
import OphthalmologyIcon from "@/assets/images/landing-page/ophthalmology.png";
import HealthIcon from "@/assets/images/landing-page/health.png";

const specialties = [
  { title: 'Dentistry', description: 'Get consultation from our Dentistry team', icon: DentistryIcon },
  { title: 'General Diagnosis', description: 'Get consultation from our General Diagnosis team', icon: InjectionIcon, active: true },
  { title: 'Neuro Surgery', description: 'Get consultation from our Neuro Surgery team', icon: SurgeryIcon },
  { title: 'Cardiology', description: 'Get consultation from our Cardiology team', icon: CardiologyIcon },
  { title: 'Pharmacy', description: 'Get consultation from our Pharmacy team', icon: PharmacyIcon },
  { title: 'Trained Staff', description: 'Get consultation from our Trained Staff team', icon: StaffIcon },
  { title: 'DNA Testing', description: 'Accurate and confidential DNA testing services', icon: DnaIcon },
  { title: 'Ophthalmology', description: 'Comprehensive eye care and vision services', icon: OphthalmologyIcon },
  { title: 'Health Screening', description: 'Preventive health checkups and early diagnosis', icon: HealthIcon },
];

const SpecialtiesSection = () => {
  return (
    <div className="text-center px-6 py-12 bg-[#0086ff21]">
      <div className="container mx-auto h-full">
        <div className="specialties-contnet lg:w-[70%] mx-auto">
          <div className="title-box flex items-center flex-col pb-10">
            <h2 className="text-3xl font-bold mb-2">Our Specialty</h2>
            <p className="text-gray-600 mb-10 sm:w-[40%]">
              We provide the world class services with the best medical team!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[30px] max-w-5xl mx-auto">
            {specialties.map((item, index) => (
              <div
                key={index}
                className={`rounded-2xl p-6 shadow-md transition-transform duration-500 ease-out h-[250px] transform hover:-translate-y-2  hover:scale-[1.03] hover:shadow-xl ${
                  item.active
                    ? 'bg-blue-600 text-white'
                    : 'bg-[#FFFFFF] text-gray-800 hover:bg-blue-50'
                }`}
              >
                <div className="mb-4 flex justify-center text-3xl mx-auto">
                  <span className="bg-[#F6F9FE] p-5 rounded-[10px]">
                  <Image 
      src={item.icon} 
      alt={item.title} 
      width={40} 
      height={40}
      style={{ width: 'auto', height: 'auto' }} 
    />                  </span>
                </div>
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="text-sm mt-2">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialtiesSection;
