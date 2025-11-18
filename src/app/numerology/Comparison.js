import Image from "next/image";
import React from "react";
// import Comparisonleft from "../../../public/updatednumerology/Comparisonleft.webp";
// import Comparisonright from "../../../public/updatednumerology/Comparisonright.webp";
// import Comparisonlefttop from "../../../public/updatednumerology/Comparisonlefttop.webp";
// import Comparisonrighttop from "../../../public/updatednumerology/Comparisonrighttop.webp";
// import NumerologyBtn from "./NumerologyBtn";
import greencheck from "../../../public/updatednumerology/greencheck.webp";
import redcross from "../../../public/updatednumerology/redcross.webp";
import NumerologyBtn from "./NumerologyBtn";
const numerologyFeatures = [
  {
    id: 1,
    title: "Destiny Number",
    free: true,
    paid: true
  },
  {
    id: 2,
    title: "Sum & Number Matching (100% / 80–90%)",
    free: true,
    paid: true
  },
  {
    id: 3,
    title: "Evil Number Detection",
    free: true,
    paid: true
  },
  {
    id: 4,
    title: "Friendly Numbers",
    free: true,
    paid: true
  },
  {
    id: 5,
    title: "Natural / Calm Numbers",
    free: true,
    paid: true
  },
  {
    id: 6,
    title: "Lucky Color, Day, God, Metal, Stone, Sub-stone",
    free: true,
    paid: true
  },
  {
    id: 7,
    title: "Personal Guidance for Number Selection",
    free: false,
    paid: true
  },
  {
    id: 8,
    title: "Mantra & Placement Guidance for Each Digit",
    free: false,
    paid: true
  },
  {
    id: 9,
    title: "WhatsApp Support (10AM–6PM for 3 Days)",
    free: false,
    paid: true
  },
  {
    id: 10,
    title: "Assistance Until Final Number Selection",
    free: false,
    paid: true
  },
  {
    id: 11,
    title: "Detailed Numerology Explanation",
    free: false,
    paid: true
  },
  {
    id: 12,
    title: "Report Type",
    free: "Auto AI Report",
    paid: "Human-Verified Expert Report"
  },
  {
    id: 13,
    title: "Charges",
    free: "FREE",
    paid: "₹2100 only"
  }
];

const Comparison = ({ setNumerologyPop,
  user,
  setActiveSignInWithOtp, }) => {
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
    <section className="py-6 lg:py-12">
      <div className="container-os mx-auto mb-6">
        <h2 className="text-center flex items-center gap-[1rem] justify-center  font-bold text-[20px] lg:text-[32px] xl:text-[40px] text-HeadingText 2xl:text-[50px] leading-[30px] lg:leading-[60px] tracking-wide mt-4 pb-6">
          Report <span className="text-primary">Comparison</span>{" "}
        </h2>
      </div>
      <div className=" bg-[url('/updatednumerology/Comparisonbg.webp')]">
        <div className="max-w-[1400px] m-auto pt-12 lg:pt-16 px-2 pb-6">
          <div className="grid grid-cols-[3fr_2fr_2fr] md:grid-cols-3 py-4 bg-secondary px-6 md:px-12 rounded-tl-3xl rounded-tr-3xl">
            <div className="font-roboto font-medium md:font-semibold text-[14px] md:text-xl lg:text-[24px] leading-[normal] lg:leading-[28px] text-black  md:leading-[24px] text-start">
              Particulars
            </div>
            <div className="font-roboto font-medium md:font-semibold text-[14px] md:text-xl lg:text-[24px] leading-[normal] lg:leading-[28px] text-black  md:leading-[24px] text-center">
              Free AI-Generated Report
            </div>
            <div className="font-roboto font-medium md:font-semibold text-[14px] md:text-xl lg:text-[24px] leading-[normal] lg:leading-[28px] text-black  md:leading-[24px] text-center">
              Human Numerologist Report (₹2100)
            </div>
          </div>
          {numerologyFeatures.map((data, index) =>
            <div
              className={`grid grid-cols-[3fr_2fr_2fr] md:grid-cols-3 py-3 md:py-4 bg-white border-b-2 px-6 md:px-12 ${data.id ==
                numerologyFeatures.length
                ? "rounded-bl-3xl rounded-br-3xl"
                : ""}`}
              key={index}
            >
              <div>
                <p className="font-roboto font-normal text-[13px] md:text-[16px] leading-[20px] text-black">
                  {data.title}
                </p>
              </div>
              <div className="m-auto">
                {typeof data.free === "boolean"
                  ? <Image
                    src={data.free === true ? greencheck : redcross}
                    alt=""
                    width={1000}
                    height={500}
                    className={`${data.free === true
                      ? "max-w-[20px] md:max-w-[24px]"
                      : "max-w-[16px] md:max-w-[20px]"}`}
                  />
                  : <p className="font-roboto font-normal text-[13px] md:text-[16px] md:leading-[20px] text-black">
                    {data.free}
                  </p>}
              </div>
              <div className="m-auto">
                {typeof data.free === "boolean"
                  ? <Image
                    src={data.paid === true ? greencheck : redcross}
                    alt=""
                    width={1000}
                    height={500}
                    className={`${data.paid === true
                      ? "max-w-[20px] md:max-w-[24px]"
                      : "max-w-[16px] md:max-w-[20px]"}`}
                  />
                  : <p className="font-roboto font-normal text-[13px] md:text-[16px] md:leading-[20px] text-black">
                    {data.paid}
                  </p>}
              </div>
            </div>
          )}
        </div>

        <div className="max-w-[1400px] m-auto pb-12 lg:pb-16 px-2">
          <div className="flex justify-around flex-wrap gap-3">
            <NumerologyBtn title="Get Your Basic Numerology Report!" secondary={true} onClick={handleOpen}/>
            <NumerologyBtn title="Get Your Advanced Numerology Report!" secondary={true} onClick={handleOpen}/>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Comparison;
