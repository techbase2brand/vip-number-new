"use client";

import Image from "next/image";
import React, { useContext, useState } from "react";
import card1 from "../../../public/digital-card-new/Infowithscanner.webp";
import allInOne from "../../../public/digital-card-new/allInOne.webp";
import digitalSmart from "../../../public/digital-card-new/digital-smart-visting.webp";
import { AppStateContext } from "../contexts/AppStateContext/AppStateContext";
import { MyRegisterSignInContext } from "../contexts/MyRegisterSignInContext/MyRegisterSignInContext";
import { useDigitalCardPlan } from "./PlanContext";
import {
  BASE_DIGITAL_CARD_PLANS,
  ADD_ON_OPTIONS,
  ALL_IN_ONE_ADD_ON_AMOUNT,
} from "./planOptions";
import qrRight from "../../../public/digital-card-new/qrRight.webp";
import { RiExchangeDollarLine } from "react-icons/ri";
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

  // State to track selected base plan for each card
  const [selectedPlans, setSelectedPlans] = useState({
    1: "digital-30-silver", // Default for card 1
    2: "digital-365-gold", // Default for card 2
    3: "digital-365-gold", // Default for card 3
    4: "digital-365-gold", // Default for card 4
  });

  // Calculate pricing based on selected base plan and add-ons
  const calculatePricing = (cardId, basePlanId) => {
    const basePlan = BASE_DIGITAL_CARD_PLANS.find(
      (plan) => plan.id === basePlanId
    );
    if (!basePlan) return { basePrice: 0, addOnPrice: 0, total: 0 };

    const card = pricingData.find((item) => item.id === cardId);
    if (!card) return { basePrice: 0, addOnPrice: 0, total: 0 };

    const basePrice = basePlan.amount;
    let addOnPrice = 0;

    if (card.planConfig.addOns.smart && card.planConfig.addOns.stand) {
      // Both add-ons - bundle price
      addOnPrice = ALL_IN_ONE_ADD_ON_AMOUNT;
    } else if (card.planConfig.addOns.smart) {
      // Only smart card
      addOnPrice =
        ADD_ON_OPTIONS.find((opt) => opt.id === "smart")?.amount ?? 499;
    } else if (card.planConfig.addOns.stand) {
      // Only stand
      addOnPrice =
        ADD_ON_OPTIONS.find((opt) => opt.id === "stand")?.amount ?? 999;
    }

    const total = basePrice + addOnPrice;

    return { basePrice, addOnPrice, total };
  };

  const handlePlanChange = (cardId, basePlanId) => {
    setSelectedPlans((prev) => ({
      ...prev,
      [cardId]: basePlanId,
    }));
  };

  const handleBuyNowClick = (cardId) => {
    const selectedBasePlanId = selectedPlans[cardId];
    const card = pricingData.find((item) => item.id === cardId);

    if (!card) return;

    const planConfig = {
      basePlanId: selectedBasePlanId,
      addOns: card.planConfig.addOns,
    };

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

                <div className="bg-white rounded-b-3xl text-center text-gray-800 py-4 md:px-4 w-full flex flex-col items-center h-[58%] justify-between">
                  <div className="w-full">
                    <h3 className="font-semibold text-[18px] leading-snug mb-3 text-center w-full min-h-[50px] flex items-center justify-center">
                      {item.title}
                    </h3>

                    {/* Dropdown for Base Plan Selection */}
                    <div className="w-full mb-3">
                      <label className="block text-xs font-semibold text-gray-700 mb-1 text-left">
                        Choose Base Plan
                      </label>
                      <select
                        className="w-full rounded-lg border-2 border-primary bg-white px-3 py-2 text-sm font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
                        value={selectedPlans[item.id]}
                        onChange={(e) =>
                          handlePlanChange(item.id, e.target.value)
                        }
                      >
                        {BASE_DIGITAL_CARD_PLANS.map((plan) => (
                          <option key={plan.id} value={plan.id}>
                            {plan.label} - ₹{plan.amount}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Pricing Breakdown */}
                    {(() => {
                      const pricing = calculatePricing(
                        item.id,
                        selectedPlans[item.id]
                      );
                      const basePlan = BASE_DIGITAL_CARD_PLANS.find(
                        (p) => p.id === selectedPlans[item.id]
                      );
                      const smartAmount =
                        ADD_ON_OPTIONS.find((opt) => opt.id === "smart")
                          ?.amount ?? 499;
                      const standAmount =
                        ADD_ON_OPTIONS.find((opt) => opt.id === "stand")
                          ?.amount ?? 999;

                      return (
                        <div className="w-full mb-3 bg-gray-50 rounded-lg p-3 space-y-2">
                          <div>
                            {/* Base Plan Price */}
                            <div className="flex justify-between text-sm">
                              <span className="text-black-700">
                                {basePlan?.label || "Base Plan"}
                              </span>
                              <span className="font-semibold text-gray-800">
                                ₹{pricing.basePrice}
                              </span>
                            </div>

                            {/* Add-ons Breakdown */}
                            {item.planConfig.addOns.smart &&
                            item.planConfig.addOns.stand ? (
                              // Both add-ons - show bundle
                              <>
                                <div className="flex justify-between items-center text-sm">
                                  <span className="text-gray-500 line-through">
                                    Smart Visiting Card
                                  </span>
                                  <span className="text-gray-500 line-through">
                                    +₹{smartAmount}
                                  </span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                  <span className="text-gray-500 line-through">
                                    QR NFC Stand
                                  </span>
                                  <span className="text-gray-500 line-through">
                                    +₹{standAmount}
                                  </span>
                                </div>
                                <div className="flex justify-between items-center text-sm bg-primary/10 -mx-1 px-1 py-1 rounded">
                                  <span className="font-semibold text-primary">
                                    Bundle (Smart + Stand)
                                  </span>
                                  <span className="font-semibold text-primary">
                                    +₹{pricing.addOnPrice}
                                  </span>
                                </div>
                                <div className="text-xs text-green-600 italic">
                                  Save ₹
                                  {smartAmount +
                                    standAmount -
                                    pricing.addOnPrice}
                                </div>
                              </>
                            ) : item.planConfig.addOns.smart ? (
                              // Only smart card
                              <div className="flex justify-between items-center text-sm">
                                <span className="font-semibold text-primary">
                                  Smart Visiting Card
                                </span>
                                <span className="font-semibold text-gray-800">
                                  +₹{pricing.addOnPrice}
                                </span>
                              </div>
                            ) : item.planConfig.addOns.stand ? (
                              // Only stand
                              <div className="flex justify-between items-center text-sm">
                                <span className="font-semibold text-primary">
                                  QR NFC Stand
                                </span>
                                <span className="font-semibold text-gray-800">
                                  +₹{pricing.addOnPrice}
                                </span>
                              </div>
                            ) : null}

                            {/* Divider */}
                            {(item.planConfig.addOns.smart ||
                              item.planConfig.addOns.stand) && (
                              <div className="border-t border-gray-300 my-2"></div>
                            )}
                          </div>

                          {/* Total */}
                          <div className="flex justify-between items-center pt-1 border-t-2 border-primary">
                            <span className="font-bold text-gray-900">
                              Total
                            </span>
                            <span className="text-primary font-bold text-xl">
                              ₹{pricing.total}/-
                            </span>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                  {/* Guarantee Highlight Section */}
                  {(() => {
                    const guaranteeText = item.planConfig.addOns.stand
                      ? "14-Day Money Back Guarantee - Digital Visiting Cards Only"
                      : "14-Day Money-Back Guarantee - No Questions Ask";
                    return (
                      <div className="flex items-center gap-2 bg-secondary/20 border border-secondary/50 rounded-lg px-3 py-2 mt-2 w-full">
                        <RiExchangeDollarLine
                          className="text-secondary"
                          fontSize={18}
                        />
                        <span className="text-secondary text-[12px] font-semibold">
                          {guaranteeText}
                        </span>
                      </div>
                    );
                  })()}
                  <button
                    className="mt-2 bg-primary text-white rounded-full px-6 py-2 w-full hover:bg-primary/90 transition-all font-semibold"
                    onClick={() => handleBuyNowClick(item.id)}
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
