"use client";

import React, { useContext } from "react";
import Image from "next/image";
import girl from "../../../public/digital-card-new/descriptiongirl.webp";
import Leftwave from "../../../public/digital-card-new/start-wave.webp";
import righttwave from "../../../public/digital-card-new/Right-wave.webp";
import centerstar from "../../../public/digital-card-new/centerstar.webp";
import scannerstand from "../../../public/digital-card-new/scannerstand.webp";
import leftscanner from "../../../public/digital-card-new/leftscanner.webp";
import Rightscanner from "../../../public/digital-card-new/Rightscanner.webp";
import centerscanner from "../../../public/digital-card-new/centerscanner .webp";
import Forphstand from "../../../public/digital-card-new/Forphstand.webp";
import Moneybacknew from "../../../public/digital-card-new/Moneybacknew.webp";
import Businessphbg from "../../../public/digital-card-new/Businessphbg.webp";
import { FaWhatsapp } from "react-icons/fa";
import Scannerpage from "./Scannerpage";
import { AppStateContext } from "../contexts/AppStateContext/AppStateContext";
import { MyRegisterSignInContext } from "../contexts/MyRegisterSignInContext/MyRegisterSignInContext";
import { useDigitalCardPlan } from "./PlanContext";

const BusinessCard = () => {
  const { user } = useContext(AppStateContext);
  const { setActiveSignInWithOtp } = useContext(MyRegisterSignInContext);
  const { startProfileFlow } = useDigitalCardPlan();

  const handleBuyNowClick = () => {
    if (!user?.token) {
      setActiveSignInWithOtp(true);
      localStorage.setItem("Lead-Page", "Digital Card");
    } else {
      startProfileFlow();
    }
  };

  return (
    <div>
      <div className="container-os">
        <div className="py-16 px-4">
          <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8 items-center justify-items-end">
            {/* Text Section */}
            <div>
              <h2 className=" text-[36px] 2xl:text-[52px] leading-tight mb-4 font-bold">
                Complete <span className="text-primary">Business Card Kit</span>
              </h2>
              <p className="text-[15px] text-gray-700 leading-relaxed">
                Presenting the ultimate NFC Smart Business Kit: A modern way to
                share your identity with tailored designs, premium print
                quality, and durable materials. Comes with a complimentary
                two-year replacement assurance for worry-free use.
              </p>
            </div>

            {/* WhatsApp Contact Card */}
            <div className="bg-primary rounded-full p-4 flex items-center gap-4 shadow-lg">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-white overflow-hidden scale-[1.4]">
                  <Image
                    src={girl}
                    alt="Contact vip shop"
                    width={1000}
                    height={100}
                    className="w-[80px] h-[80px] object-cover rounded-full"
                  />
                </div>
                <div className="absolute top-[-25px] right-[-25px] w-10 h-10 bg-black rounded-full flex items-center justify-center cursor-pointer">
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
      </div>
      <Scannerpage />
      <section className="bg-[#FFCE00] hidden md:block">
        <div className="top-img flex flex-col md:flex-row  w-full items-center justify-between   relative pb-[200px] 2xl:pb-[260px] ">
          <div className="star-left hidden lg:block">
            <Image
              src={Leftwave}
              width={1000}
              height={500}
              alt="leftwave"
              className="w-[200px] md:max-w-[414px]"
            />
          </div>

          <div className="center-star text-center md:text-left  ">
            <Image
              src={centerstar}
              width={1000}
              height={500}
              alt="centerstar"
              className="w-[300px] md:max-w-[680px] mx-auto hidden lg:block absolute top-0"
            />

            <div className="center-star-div relative bottom-[2%] md:bottom-[50%] px-4 pt-6 2xl:pb-[170px]">
              <div className="baner-des max-w-[90%] md:max-w-[708px] text-[16px] md:text-[24px] m-auto items-center text-center">
                <p className="font-semibold text-[18px] 2xl:text-[24px]">
                  Backed By VIP Number Shop
                </p>
              </div>

              <div className="banner-title flex flex-col items-center text-[32px] md:text-[52px] max-w-[90%] md:max-w-[645px] m-auto mt-2">
                <h2 className=" text-[36px] 2xl:text-[52px] leading-tight mb-4 font-bold text-primary text-center">
                  Smart Business Cards for <br />
                  the Digital Age
                </h2>
              </div>

              <div className="baner-des max-w-[90%] md:max-w-[708px] text-[16px] md:text-[24px] m-auto items-center text-center mt-2">
                <p>
                  Always updated, Change your phone, email, website, or social
                  links anytime, no reprinting needed.
                </p>
              </div>

              <div className="banner-btn max-w-[130px] md:max-w-[160px] h-[40px] md:h-[43px] items-center m-auto mt-4">
                <button
                  className="bg-[#58447F] text-white w-[130px] md:w-[160px] h-[40px] md:h-[43px] items-center m-auto rounded-[50px]"
                  onClick={handleBuyNowClick}
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>

          <div className="right-wavehidden hidden lg:block">
            <Image
              src={righttwave}
              width={1000}
              height={500}
              alt="righttwave"
              className="w-[200px] md:max-w-[414px]"
            />
          </div>
        </div>

        <div className="scanner-imgs  ">
          <div className="scanner-imgs-main relative  ">
            <div className="three-in-one flex justify-evenly w-full bottom-[50%]">
              <div className="left-scanner  absolute left-[6%] 2xl:left-[10%] bottom-[60%]">
                <Image
                  src={leftscanner}
                  width={1000}
                  height={500}
                  alt="leftscanner"
                  className="max-w-[100px] xl:max-w-[300px] 2xl:[max-w-[200px]   "
                />
              </div>
              <div className="centre-scanner absolute bottom-[22%]">
                <Image
                  src={centerscanner}
                  width={1000}
                  height={500}
                  alt="leftscanner"
                  className=" max-w-[100px] xl:max-w-[200px] 2xl:max-w-[345px] "
                />
              </div>
              <div className="right-scanner absolute bottom-[47%] 2xl:bottom-[60%] right-[5%] xl:right-[8%] 2xl:right-[11%]">
                <Image
                  src={Rightscanner}
                  width={1000}
                  height={500}
                  alt="leftscanner"
                  className=" max-w-[100px] xl:max-w-[300px] 2xl:[max-w-[200px]"
                />
              </div>
            </div>

            <div className="left-stand">
              <Image
                src={scannerstand}
                width={1000}
                height={500}
                alt="scannerstand"
                className="max-w-[1820px] m-auto items-center  "
              />
            </div>
          </div>

          <div className="scanner-stand relative m-auto  pl-11"></div>
        </div>
      </section>
      <section
        className="block md:hidden  bg-cover bg-no-repeat pt-16"
        style={{ backgroundImage: `url(${Businessphbg.src})` }}
      >
        <div className="relative">
          <Image
            src={Forphstand}
            width={1000}
            height={500}
            alt="Forphscanner"
            className="max-w-[518px] pt-[30%]"
          />

          <div className="absolute top-0 w-full h-full">
            <div>
              <Image
                alt=""
                src={Moneybacknew}
                width={1000}
                height={500}
                className="max-w-[94px] m-auto"
              />
            </div>
            <div className="pt-4">
              <p className="text-[15px] text-center">
                Backed By VIP Number Shop
              </p>
              <h5 className="text-[28px] font-extrabold text-primary text-center pt-4">
                Smart Business Cards for the Digital Age
              </h5>
              <p className="text-[15px] text-center px-12 pt-4">
                Always updated, Change your phone, email, website, or social
                links anytime, no reprinting needed.
              </p>
            </div>
            <div className="banner-btn max-w-[130px] md:max-w-[160px] h-[40px] md:h-[43px] items-center m-auto mt-4">
              <button
                className="bg-primary text-white w-[130px] md:w-[160px] h-[40px] md:h-[43px] items-center m-auto rounded-[50px]"
                onClick={handleBuyNowClick}
              >
                Buy Now
              </button>
            </div>

            <div className="flex justify-center pt-4">
              <div>
                <Image
                  src={centerscanner}
                  alt=""
                  width={1000}
                  height={500}
                  className="max-w-[180px]"
                />
              </div>
              <div className="relative top-6">
                <Image
                  src={Rightscanner}
                  alt=""
                  width={1000}
                  height={500}
                  className="max-w-[171px] mt-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BusinessCard;
