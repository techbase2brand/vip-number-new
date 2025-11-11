"use client";

import Image from "next/image";
import React, { useState } from "react";
import Goldscanner from "../../../public/digital-card-new/Goldscanner.webp";
import { useDigitalCardPlan } from "./PlanContext";
import qrRight from "../../../public/digital-card-new/qrRight.webp";
import card1 from "../../../public/digital-card-new/Infowithscanner.webp";
import allInOne from "../../../public/digital-card-new/allInOne.webp";
import digitalSmart from "../../../public/digital-card-new/digital-smart-visting.webp";

const carouselImages = [
  {
    id: 1,
    src: qrRight,
    alt: "Digital Visiting Card",
  },
  {
    id: 2,
    src: card1,
    alt: "Digital Visiting Card + QR NFC Standee",
  },
  {
    id:3,
    src: allInOne,
    alt: "Premium NFC Card Only",
  },
  {
    id:4,
    src: digitalSmart,
    alt: "All-in-One Professional Kit",
  },
];

const Scannerpage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const {
    basePlans,
    basePlanId,
    setBasePlanId,
    addOnOptions,
    selectedAddOns,
    toggleAddOn,
    checkoutPlan,
  } = useDigitalCardPlan();
  const basePlan = checkoutPlan?.basePlan;
  const addOnTotal = checkoutPlan
    ? checkoutPlan.totalAmount - (checkoutPlan.basePlan?.amount ?? 0)
    : 0;
  const currentCarouselImage =
    carouselImages[currentImageIndex] ?? carouselImages[0];

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? carouselImages.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex + 1) % carouselImages.length
    );
  };

  return (
    <div>
      <div className="relative w-[320px] h-[450px] rounded-2xl bg-gradient-to-br from-[#7b5cf0] to-[#4b1b78] shadow-lg border-2 border-cyan-400 shadow-cyan-500/30 flex items-center justify-start m-auto p-5  md:hidden">
        <Image
          src={currentCarouselImage?.src ?? Goldscanner}
          alt={currentCarouselImage?.alt ?? "Goldscanner"}
          width={1000}
          height={500}
          className="max-w-[255px] absolute z-10"
        />
        {/* Navigation Buttons */}
        <div className="absolute bottom-4 left-4 flex gap-3">
          {/* Left Button */}
          <button
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-md hover:scale-105 transition-transform duration-200"
            onClick={handlePrevImage}
            aria-label="View previous image"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-purple-800"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          {/* Right Button */}
          <button
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-md hover:scale-105 transition-transform duration-200"
            onClick={handleNextImage}
            aria-label="View next image"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-purple-800"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
        {/* Soft Glow and Light Center */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_70%)] pointer-events-none"></div>
      </div>
      <section className="block sm:hidden bg-white px-4 py-10 text-gray-900">
        <div className="max-w-2xl mx-auto space-y-4">
          <h2 className="text-2xl font-semibold">
            {checkoutPlan?.displayLabel || "Digital Visiting Card Plan"}
          </h2>
          <p className="text-sm text-gray-700">⭐ 4.9 (30 Reviews)</p>
          <ul className="space-y-2 text-gray-700 text-base">
            <li>⚠️ Payments for QR Stand are non-refundable</li>
            <li>
              ℹ️{" "}
              <a href="#" className="text-purple-700 font-medium underline">
                No Question Ask?
              </a>
            </li>
            <li>✅ Only Digital Visiting Card 14 Days Money Back Guarantee</li>
          </ul>

          <div className="pt-4 space-y-1 flex">
            <p className="text-purple-700 text-xl font-semibold">
               ₹{basePlan?.amount ?? "--"} /- 
            </p>
            <p> ₹1599/-</p>
            {addOnTotal > 0 && (
              <p className="text-sm text-gray-600">
                Add-ons: {checkoutPlan?.addOnLabel} (+₹{addOnTotal})
              </p>
            )}
          </div>

          <div className="mt-4 space-y-4">
            <div className="w-full">
              <label className="text-sm text-gray-600 block">
                Choose a Plan:
              </label>
              <select
                className="mt-2 w-full p-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={basePlanId}
                onChange={(event) => setBasePlanId(event.target.value)}
              >
                {basePlans?.map((plan) => (
                  <option key={plan.id} value={plan.id}>
                    {`${plan.label} — ₹${plan.amount}`}
                  </option>
                ))}
              </select>
            </div>

            <div className="border border-purple-200 rounded-xl px-3 py-3 bg-purple-50">
              <p className="text-sm font-semibold text-purple-800">
                Add-ons (optional)
              </p>
              <div className="flex flex-col gap-2 mt-2 text-sm text-gray-800">
                {addOnOptions?.map((option) => (
                  <label
                    key={option.id}
                    className="flex items-start gap-3 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      className="mt-[3px]"
                      checked={!!selectedAddOns?.[option.id]}
                      onChange={() => toggleAddOn(option.id)}
                    />
                    <span>
                      <span className="font-semibold block">
                        {option.label}
                      </span>
                      {option.description && (
                        <span className="text-xs text-purple-600">
                          {option.description}
                        </span>
                      )}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-6 text-lg font-semibold flex items-center justify-between">
            <div className="total-am">
            Total Amount:{" "}
            <span className="text-2xl font-bold">
              ₹{checkoutPlan?.totalAmount ?? "--"}/-
            </span>
            </div>
            
            <button className="mt-4 bg-[rgba(88,68,127,1)] text-white font-medium px-6 py-2 rounded-full hover:bg-purple-800 transition-all">
            Buy Now
          </button>
          </div>

         
        </div>
      </section>
    </div>
  );
};

export default Scannerpage;
