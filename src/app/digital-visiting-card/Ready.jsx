"use client";

import React, { useContext } from "react";
import lastbackground from "../../../public/digital-card-new/lastbackground.webp";
import Image from "next/image";
import { AppStateContext } from "../contexts/AppStateContext/AppStateContext";
import { MyRegisterSignInContext } from "../contexts/MyRegisterSignInContext/MyRegisterSignInContext";
import { useDigitalCardPlan } from "./PlanContext";

const Ready = () => {
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
      <div className="relative top-[-3rem]">
        <Image
          src={lastbackground}
          alt="vip number shop"
          width={1000}
          height={500}
          className="absolute top-[0] h-full object-cover"
        />
        <section className="relative bg-secondary py-24 px-6 text-center overflow-hidden opacity-[0.9]">
          <div className=" inset-0 bg-secondary/80 backdrop-blur-sm"></div>
          <div className="relative max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-5xl font-extrabold text-primary mb-6 leading-tight">
              Ready to Start Something Amazing with <br />
              <span className="text-primary">
                VIP Number Shop? Let’s Talk!
              </span>
            </h1>
            <p className="text-gray-800 text-base md:text-lg mb-10">
              At VIP Number Shop, we help you stand out with smart solutions and
              creative strategies. From digital cards to premium designs, let’s
              collaborate, innovate, and make your vision a reality.
            </p>
            <button
              className="bg-primary hover:bg-primary text-white font-semibold py-3 px-8 rounded-full shadow-md transition-transform transform hover:-translate-y-1"
              onClick={handleBuyNowClick}
            >
              Buy Now
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Ready;
