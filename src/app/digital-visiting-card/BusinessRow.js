import React from "react";
import girl from "../../../public/digital-card-new/descriptiongirl.webp";
import { FaWhatsapp } from "react-icons/fa";
import Image from "next/image";
const BusinessRow = () => {
  return (
    <div className="container-os  px-4">
      <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8 items-center justify-items-end pt-8">
        {/* Text Section */}
        <div>
          <h2 className=" text-[36px] 2xl:text-[52px] leading-tight mb-4 font-bold text-center md:text-left">
            Complete <span className="text-primary">Business Card Kit</span>
          </h2>
          <p className="text-[15px] text-gray-700 leading-relaxed  text-center md:text-left">
            Presenting the ultimate NFC Smart Business Kit: A modern way to
            share your identity with tailored designs, premium print quality,
            and durable materials. Comes with a complimentary two-year
            replacement assurance for worry-free use.
          </p>
        </div>

        {/* WhatsApp Contact Card */}
        <div className="bg-primary rounded-full py-2 md:py-4 ps-4 pe-8 flex items-center gap-4 shadow-lg mb-16 lg:mb-0">
          <div className="relative">
            <div className="w-[60px] md:w-[80px] h-[60px] md:h-[80px] rounded-full bg-white overflow-hidden scale-[1.4]">
              <Image
                src={girl}
                alt="Contact vip shop"
                width={1000}
                height={100}
                className="w-[60px] md:w-[80px] h-[60px] md:h-[80px] object-cover rounded-full"
              />
            </div>
            <div className="absolute top-[-25px] right-[-10px] w-10 h-10 bg-black rounded-full flex items-center justify-center cursor-pointer">
              <FaWhatsapp className="text-white text-[20px]" />
            </div>
          </div>
          <div className="ps-5">
            <h3 className="text-yellow-300 text-[18px]">
              Contact VIP Number Shop
            </h3>
            <p className="text-white text-[18px]">
              Looking for free design assistance?
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessRow;
