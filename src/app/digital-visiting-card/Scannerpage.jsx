"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import Goldscanner from "../../../public/digital-card-new/Goldscanner.webp";
import { useDigitalCardPlan } from "./PlanContext";
import qrRight from "../../../public/digital-card-new/qrRight.webp";
import card1 from "../../../public/digital-card-new/Infowithscanner.webp";
import allInOne from "../../../public/digital-card-new/allInOne.webp";
import digitalSmart from "../../../public/digital-card-new/digital-smart-visting.webp";
import { RiExchangeDollarLine } from "react-icons/ri";
import { BsQuestionCircleFill } from "react-icons/bs";
import { TbCreditCardPay } from "react-icons/tb";
import goldbatch from "../../../public/digital-card-new/goldbatch.webp";
import silverbatch from "../../../public/digital-card-new/Silverbatch.webp";
import Powerdby from "../../../public/digital-card-new/poweredby.webp";
import MoneyBack from "../../../public/digital-card-new/moneyback.webp";
import { FaStar } from "react-icons/fa";

const carouselImages = [
  {
    id: 1,
    src: qrRight,
    alt: "Digital Visiting Card",
    title: "Digital Visiting Card",
  },
  {
    id: 2,
    src: digitalSmart,
    alt: "Digital Visiting Card + Smart Visiting Card",
    title: "Digital Visiting Card + Smart Visiting Card",
  },
  {
    id: 3,
    src: card1,
    alt: "Digital Visiting Card + QR NFC Standee",
    title: "Digital Visiting Card + QR NFC Standee",
  },
  {
    id: 4,
    src: allInOne,
    alt: "Digital Visiting Card + Smart Visiting Card + QR NFC Standee",
    title: "Digital Visiting Card + Smart Visiting Card + QR NFC Standee",
  },

];

const Scannerpage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageClick, setIsImageClick] = useState(false);
  const {
    basePlans,
    basePlanId,
    setBasePlanId,
    addOnOptions,
    selectedAddOns,
    toggleAddOn,
    checkoutPlan,
    resetPlanSelections,
    startProfileFlow,
  } = useDigitalCardPlan();
  const basePlan = checkoutPlan?.basePlan;
  const addOnTotal = checkoutPlan
    ? checkoutPlan.totalAmount - (checkoutPlan.basePlan?.amount ?? 0)
    : 0;
  const currentCarouselImage =
    carouselImages[currentImageIndex] ?? carouselImages[0];

  // Map carousel images to plan configurations
  const getPlanConfigForImage = (imageIndex) => {
    switch (imageIndex) {
      case 0: // "Digital Visiting Card" - Just digital card, no add-ons
        return {
          basePlanId: "digital-365-gold",
          addOns: { smart: false, stand: false },
        };
      case 1: // "Digital Visiting Card + Smart Visiting Card" - Digital + Smart only
        return {
          basePlanId: "digital-365-gold",
          addOns: { smart: true, stand: false },
        };
      case 2: // "Digital Visiting Card + QR NFC Standee" - Digital card + stand
        return {
          basePlanId: "digital-365-gold",
          addOns: { smart: false, stand: true },
        };
      case 3: // "Digital Visiting Card + Smart Visiting Card + QR NFC Standee" - All-in-One
        return {
          basePlanId: "digital-365-gold",
          addOns: { smart: true, stand: true },
        };
      default:
        return {
          basePlanId: "digital-365-gold",
          addOns: { smart: false, stand: false },
        };
    }
  };

  // Find image index based on plan configuration
  const getImageIndexForPlan = (planId, addOns) => {
    const hasSmart = !!addOns?.smart;
    const hasStand = !!addOns?.stand;

    if (hasSmart && hasStand) {
      return 3; // All-in-One
    } else if (hasSmart && !hasStand) {
      return 1; // Digital + Smart
    } else if (!hasSmart && hasStand) {
      return 2; // Digital + Stand
    } else {
      return 0; // Digital only
    }
  };

  // Get dynamic content based on selected image/plan
  const getContentForImage = (imageIndex) => {
    const planType = basePlan?.type || "gold";
    const isGold = planType.toLowerCase() === "gold";

    switch (imageIndex) {
      case 0: // Digital Visiting Card only
        return {
          features: [
            {
              icon: "RiExchangeDollarLine",
              iconSize: 24,
              text: "14 Days No Question ask money back guarantee",
            },
            {
              icon: "TbCreditCardPay",
              iconSize: 24,
              text: "Share Your Socials Instantly – All in One Digital Visiting card",
            },
          ],
          offers: [
            "You can Renew your plan for next 365 days package just ₹499",
            isGold
              ? "Removed Branding (Powerd by Vip Number shop)"
              : "Added Branding (Powerd by Vip Number shop)",
          ],
        };
      case 1: // Digital Visiting Card + Smart Visiting Card
        return {
          features: [
            {
              icon: "RiExchangeDollarLine",
              iconSize: 24,
              text: "14 Days No Question ask money back guarantee",
            },
            {
              icon: "TbCreditCardPay",
              iconSize: 24,
              text: "Share Your Socials Instantly – All in One Digital Visiting card",
            },
          ],
          offers: [
            "You can Renew your plan for next 365 days package just ₹499",
            isGold
              ? "Removed Branding (Powerd by Vip Number shop)"
              : "Added Branding (Powerd by Vip Number shop)",
          ],
        };
      case 2: // Digital Visiting Card + QR NFC Standee
        return {
          features: [
            {
              icon: "TbCreditCardPay",
              iconSize: 24,
              text: "Payments for QR Standee are non-refundable",
            },
            {
              icon: "BsQuestionCircleFill",
              iconSize: 22,
              text: "No Question Ask?",
            },
            {
              icon: "RiExchangeDollarLine",
              iconSize: 24,
              text: "Only Digital visiting Card 14 Days Money Back Guarantee",
            },
          ],
          offers: [
            "You can Renew your plan for next 365 days package just ₹499",
            isGold
              ? "Removed Branding (Powerd by Vip Number shop)"
              : "Added Branding (Powerd by Vip Number shop)",
          ],
        };
      case 3: // All-in-One (Digital + Smart + Stand)
        return {
          features: [
            {
              icon: "TbCreditCardPay",
              iconSize: 24,
              text: "Payments for QR Standee are non-refundable",
            },
            {
              icon: "BsQuestionCircleFill",
              iconSize: 22,
              text: "No Question Ask?",
            },
            {
              icon: "RiExchangeDollarLine",
              iconSize: 24,
              text: "Only Digital visiting Card 14 Days Money Back Guarantee",
            },
          ],
          offers: [
            "Renew your Digital Visiting Card plan and get the 365-day package just ₹499",
            isGold
              ? "Remove Tagline (Powerd by Vip Number shop)"
              : "Tagline not Remove (Powerd by Vip Number shop)",
          ],
        };
      default:
        return {
          features: [
            {
              icon: "RiExchangeDollarLine",
              iconSize: 24,
              text: "14 Days No Question ask money back guarantee",
            },
          ],
          offers: [
            "You can Renew your plan for next 365 days package just ₹499",
            isGold
              ? "Removed Branding (Powerd by Vip Number shop)"
              : "Added Branding (Powerd by Vip Number shop)",
          ],
        };
    }
  };

  // Render icon component based on icon name
  const renderIcon = (iconName, size) => {
    const iconProps = {
      fontSize: size,
      className: "text-secondary",
    };
    switch (iconName) {
      case "RiExchangeDollarLine":
        return <RiExchangeDollarLine {...iconProps} />;
      case "TbCreditCardPay":
        return <TbCreditCardPay {...iconProps} />;
      case "BsQuestionCircleFill":
        return <BsQuestionCircleFill {...iconProps} />;
      default:
        return <RiExchangeDollarLine {...iconProps} />;
    }
  };

  const handleImageClick = (imageIndex) => {
    setIsImageClick(true);
    setCurrentImageIndex(imageIndex);
    const planConfig = getPlanConfigForImage(imageIndex);
    resetPlanSelections(planConfig);
    setTimeout(() => setIsImageClick(false), 100);
  };

  const handlePrevImage = () => {
    const newIndex =
      currentImageIndex === 0
        ? carouselImages.length - 1
        : currentImageIndex - 1;
    handleImageClick(newIndex);
  };

  const handleNextImage = () => {
    const newIndex = (currentImageIndex + 1) % carouselImages.length;
    handleImageClick(newIndex);
  };

  // Set initial plan based on selected image when component mounts
  useEffect(() => {
    const planConfig = getPlanConfigForImage(currentImageIndex);
    resetPlanSelections(planConfig);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run on mount

  // Update image when plan changes (but not when change comes from image click)
  useEffect(() => {
    if (!isImageClick) {
      const matchingImageIndex = getImageIndexForPlan(
        basePlanId,
        selectedAddOns
      );
      if (matchingImageIndex !== currentImageIndex) {
        setCurrentImageIndex(matchingImageIndex);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [basePlanId, selectedAddOns]); // Watch for plan changes

  return (
    <div>
      <div className="relative w-[390px] h-[500px] rounded-[50px] bg-[#644B97] shadow-lg border-2 flex items-center m-auto p-5  md:hidden justify-center mb-[30px] lg:mb-0">
        <Image
          src={currentCarouselImage?.src ?? Goldscanner}
          alt={currentCarouselImage?.alt ?? "Goldscanner"}
          width={3000}
          height={500}
          className="max-w-[255px] relative z-10 object-contain w-auto h-full"
        />
        {/* Navigation Buttons */}
        <div className="absolute bottom-4 left-4 flex gap-3 z-10">
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
        {getContentForImage(currentImageIndex).features.some(
          (feature) =>
            feature.text.includes(
              "Only Digital visiting Card 14 Days Money Back Guarantee"
            )
        ) && (
          <div className="absolute top-[-30px] right-[-5px]">
            <Image
              src={MoneyBack}
              alt="Money Back Guarantee"
              width={1000}
              height={300}
              className="max-w-[78px] "
            />
          </div>
        )}
        <div className="absolute bottom-[-5rem] left-0 w-full flex justify-center items-end  ">
          <div className="text-center h-max relative right-[1%] z-[10] flex flex-col items-center">
            {/* <p className="text-lg font-semibold text-black bg-secondary px-4 py-1.5 rounded-2xl ">
              <span className="text-primary">Powerd by</span> VIP Number shop
            </p> */}
            <Image
            src={Powerdby}
            alt="Powerdby"
            width={3000}
            height={1000}
            className="object-contain max-w-[200px] w-full rounded-[16px]"
          />
            <span className="text-primary text-base font-semibold">
              {basePlan?.type?.toLowerCase() === "gold"
                ? "Gold Pack l Removed Branding"
                : "Silver Pack l Added Branding"}
            </span>
          </div>
        </div>
        <div className="absolute top-[20%] right-0 w-full flex justify-center items-end ">
          <Image
            src={
              basePlan?.type?.toLowerCase() === "gold" ? goldbatch : silverbatch
            }
            alt={
              basePlan?.type?.toLowerCase() === "gold"
                ? "goldbatch"
                : "silverbatch"
            }
            width={1000}
            height={300}
            className="w-auto object-contain max-w-[100px] relative z-10  bottom-[10rem] right-[7rem]"
          />
        </div>
        {/* Soft Glow and Light Center */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_70%)] pointer-events-none"></div>
      </div>
      <section className="block sm:hidden bg-white px-4 py-16 text-gray-900">
        <div className="max-w-2xl mx-auto space-y-4">
          <h2 className="text-2xl font-semibold">
            {carouselImages[currentImageIndex]?.title ||
              checkoutPlan?.displayLabel ||
              "Digital Visiting Card Plan"}
          </h2>
          <p className="text-sm text-gray-700 flex items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <FaStar
                key={i}
                className="text-secondary mr-1 w-[21px] h-[21px]"
              />
            ))}{" "}
            <span className="text-gray-700">4.9 (30 Reviews)</span>
          </p>
          <ul className="space-y-2 text-black text-base">
            {getContentForImage(currentImageIndex).features.map(
              (feature, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  {renderIcon(feature.icon, feature.iconSize)}
                  <span>{feature.text}</span>
                </li>
              )
            )}
          </ul>

          <div className="pt-4 space-y-1 flex items-center gap-2">
            <p className="text-purple-700 text-xl font-semibold">
              ₹{basePlan?.amount ?? "--"} /-
            </p>
            <p className="text-gray-500 line-through"> ₹1599/-</p>
            {/* {addOnTotal > 0 && (
              <p className="text-sm text-gray-600">
                Add-ons: {checkoutPlan?.addOnLabel} (+₹{addOnTotal})
              </p>
            )} */}
          </div>

          <div className="mt-4 space-y-4">
            <div className="w-full relative">
              <label className="text-secondary font-semibold text-sm block mb-2">
                Choose a Plan
              </label>
              <select
                className="w-full p-3 border-2 border-secondary rounded-lg text-sm font-semibold text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary cursor-pointer appearance-none"
                value={basePlanId}
                onChange={(event) => setBasePlanId(event.target.value)}
              >
                {basePlans?.map((plan) => (
                  <option
                    key={plan.id}
                    value={plan.id}
                    className="bg-white text-gray-900 py-2"
                  >
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
                      className="mt-[3px] w-6 h-6 cursor-pointer rounded accent-secondary"
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

          {/* Offers/Bullet Points */}
          <div className="flex flex-col gap-2 mt-4">
            {getContentForImage(currentImageIndex).offers?.map((offer, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <span className="text-red-600 text-[16px] mt-1">•</span>
                <span className="text-red-600 text-[15px] font-semibold leading-relaxed">
                  {offer}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-6 text-lg font-semibold flex items-center justify-between">
            <div className="total-am">
              <span className="text-primary">Total Amount:</span> <br />
              <span className="text-2xl font-bold">
                ₹{checkoutPlan?.totalAmount ?? "--"}/-
              </span>
            </div>

            <button
              className="mt-4 bg-[rgba(88,68,127,1)] text-white font-medium px-6 py-2 rounded-full hover:bg-purple-800 transition-all"
              onClick={() => {
                const currentPlanConfig =
                  getPlanConfigForImage(currentImageIndex);
                startProfileFlow(currentPlanConfig);
              }}
            >
              Buy Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Scannerpage;
