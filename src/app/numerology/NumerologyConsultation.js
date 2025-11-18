"use client";
import React, { useContext } from "react";
import NumerologyBtn from "./NumerologyBtn";
import { AppStateContext } from "../contexts/AppStateContext/AppStateContext";
import { MyRegisterSignInContext } from "../contexts/MyRegisterSignInContext/MyRegisterSignInContext";

const NumerologyConsultation = ({ title }) => {
  const { setNumerologyPop, user } = useContext(AppStateContext);
  const { setActiveSignInWithOtp } = useContext(MyRegisterSignInContext);
  const handleOpen = () => {
    if (!user?.token) {
      setActiveSignInWithOtp(true);
      localStorage.setItem("Lead-Page", "Numurology");
    } else {
      setNumerologyPop(true);
      localStorage.setItem("Lead-Page", "Numurology");
    }
  };
  return (
    <section className="bg-[#E4E4E4] py-10">
      <div className="container-os mx-auto px-4 grid lg:grid-cols-[4fr_2fr] justify-between items-center gap-5">
        {/* Left Section: Text Content */}
        <div className="lg:max-w-[80%] text-center lg:text-left">
          <h2 className="text-2xl md:text-3xl font-semibold text-black capitalize">
            your Numerology Mobile Number Consultation
          </h2>
          <p className="text-darktext mt-2 md:text-lg">
            Consult with one of our team members to select your Numerology
            mobile number. We’ll assist you in finding the perfect digits
            aligned with your good luck. Take the first step towards getting
            your Numerology mobile number today!
          </p>
        </div>

        {/* Right Section: Button */}
        <div className="flex flex-col gap-3 lg:justify-start justify-center">
          <NumerologyBtn title={'Get Your FREE Basic Numerology Report'} onClick={handleOpen} />
          <NumerologyBtn title={'Pay 2100/- For Advanced Numerology Report'} onClick={handleOpen} secondary={true} />
        </div>

      </div>
    </section>
  );
};

export default NumerologyConsultation;
