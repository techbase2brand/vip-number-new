import React, { useContext } from "react";
import "./Numerology.css";
import { AppStateContext } from "../contexts/AppStateContext/AppStateContext";
import NumerologyBtn from "./NumerologyBtn";
import { MyRegisterSignInContext } from "../contexts/MyRegisterSignInContext/MyRegisterSignInContext";
import Link from "next/link";
const NumerologyLead = ({ title1, para1, title, titleClass }) => {
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
    <section className={`md:px-8 px-3 py-12`}>
      <div className="container-os">
        <div className="space-y-2 text-center">
          <h2
            className={`font-semibold text-[20px] lg:leading-[40px] leading-[28px] text-[#3D3D3D]  md:text-[32px] lg:text-[35px] text-center xl:w-9/12 md:w-9/12 w-full m-auto 2xl:text-[38px] tracking-wide  ${titleClass}`}
          >
            {title1}
          </h2>

          <p className="font-normal text-[16px] leading-[24px]  md:text-[17px] md:leading-[30px] text-darktext text-center max-w-5xl m-auto py-3">
            {para1}
          </p>
          <div className="flex justify-center mb-4 gap-3 md:gap-6 flex-wrap">
            <NumerologyBtn title={'Get Your FREE Basic Numerology Report'} onClick={handleOpen} />
            <NumerologyBtn title={'Pay 2100/- For Advanced Numerology Report'} onClick={handleOpen} secondary={true}/>
          </div>
          {/* <div className="mt-4">
            <span className="mb-2 text-darktext text-center md:text-[18px] text-[15px]    w-full">
                Get <span className="text-primary">1,500 Cashback</span> with
                your Numerology Report.
                <br />
                Cashback valid for 30 days only.
                <br />
                Cashback can be used only on{" "}
                <Link href="/" className="text-primary">
                  www.vipnumbershop.com{" "}
                  <span className="text-black">(For buying a Number)</span>
                </Link>
              </span>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default NumerologyLead;
