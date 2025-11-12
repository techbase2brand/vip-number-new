"use client";

import Image from "next/image";
import React, { useContext } from "react";
import card1 from "../../../public/digital-card-new/Infowithscanner.webp";
import allInOne from "../../../public/digital-card-new/allInOne.webp";
import digitalSmart from "../../../public/digital-card-new/digital-smart-visting.webp";
import { AppStateContext } from "../contexts/AppStateContext/AppStateContext";
import { MyRegisterSignInContext } from "../contexts/MyRegisterSignInContext/MyRegisterSignInContext";
import { useDigitalCardPlan } from "./PlanContext";
import qrRight from "../../../public/digital-card-new/qrRight.webp";
const pricingData = [
  {
    id: 1,
    title: "Digital Visiting Card",
    price: "199",
    oldPrice: "300",
    img: qrRight,
    planConfig: {
      basePlanId: "digital-30-silver",
      addOns: { smart: false, stand: false },
    },
  },
  {
    id: 2,
    title: "Digital Visiting Card + Smart Visiting Card",
    price: "499",
    oldPrice: "699",
    img: digitalSmart,
    planConfig: {
      basePlanId: "digital-365-gold",
      addOns: { smart: true },
    },
  },
  {
    id: 3,
    title: "Digital Visiting Card + QR NFC Standee",
    price: "999",
    oldPrice: "1300",
    img: card1,
    planConfig: {
      basePlanId: "digital-365-gold",
      addOns: { stand: true },
    },
  },
  {
    id: 4,
    title: "Digital Visiting Card + Smart Visiting Card + QR NFC Standee",
    price: "1299",
    oldPrice: "1499",
    img: allInOne,
    planConfig: {
      basePlanId: "digital-365-gold",
      addOns: { smart: true, stand: true },
    },
  },
];

const Contectless = () => {
  const { user } = useContext(AppStateContext);
  const { setActiveSignInWithOtp } = useContext(MyRegisterSignInContext);
  const { startProfileFlow } = useDigitalCardPlan();

  const handleBuyNowClick = (planConfig) => {
    if (!user?.token) {
      setActiveSignInWithOtp(true);
      localStorage.setItem("Lead-Page", "Digital Card");
    } else {
      startProfileFlow(planConfig);
    }
  };

  return (
    <div>
      <section className="flex flex-col items-center justify-center text-center px-4 py-16 bg-white">
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-900">
          Go contactless in{" "}
          <span className="text-primary underline decoration-blue-400 decoration-4">
            3 easy steps!
          </span>
        </h2>

        <p className="mt-4 text-sm sm:text-base md:text-lg text-gray-700 max-w-2xl">
          Presenting the NFC Smart Card: Tailored designs, premium print and
          materials, with a complimentary two-year replacement assurance.
        </p>
      </section>
      <section className="py-12 bg-white">
        <div className="mx-auto px-4">
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {pricingData.map((item) => (
              <div
                key={item.id}
                className=" text-white shadow-lg flex flex-col items-center p-6 rounded-[20px] border border-primary"
              >
                <div className="bg-primary rounded-3xl w-full text-center overflow-hidden">
                  <div className="relative w-full h-80">
                    <Image
                      src={item.img}
                      alt={item.title}
                      fill
                      className="object-contain rounded-t-3xl p-2"
                    />
                  </div>
                </div>

                <div className="bg-white rounded-b-3xl text-center text-gray-800 p-4 w-full flex flex-col items-center">
                  <div className="card-titleordes flex max-w-[447px] text-start items-center">
                    <h3 className="font-semibold max-w-[298px] text-[18px] leading-snug mb-2 pr-4 py-2 border-r-2 border-primary">
                      {item.title}
                    </h3>

                    <p className="text-primary font-bold text-xl flex flex-col gap-[12px] items-center text-[35px] m-auto px-4 py-2">
                      +{item.price}/-
                      <span className="line-through text-yellow-500 text-[30px]">
                        {item.oldPrice}/-
                      </span>
                    </p>
                  </div>

                  <button
                    className="mt-4 bg-primary text-white rounded-full px-6 py-2 w-full hover:bg-primary transition-all"
                    onClick={() => handleBuyNowClick(item.planConfig)}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contectless;
