"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { FaCheckCircle, FaWhatsapp } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import { ADD_ON_OPTIONS, ALL_IN_ONE_ADD_ON_AMOUNT } from "../planOptions";

const ThankYouPage = () => {
  const searchParams = useSearchParams();
  const [planDetails, setPlanDetails] = useState(null);

  useEffect(() => {
    // Try to get from localStorage first (persists on reload)
    const savedDetails = localStorage.getItem("digitalCardPaymentDetails");
    if (savedDetails) {
      try {
        const parsed = JSON.parse(savedDetails);
        setPlanDetails(parsed);
      } catch (e) {
        console.error("Error parsing saved details:", e);
      }
    } else {
      // Fallback to query params if localStorage doesn't have data
      const orderId = searchParams.get("orderId");
      const amount = searchParams.get("amount");
      const planLabel = searchParams.get("planLabel") || "Digital Visiting Card Plan";
      const addOns = searchParams.get("addOns") || "Digital Card Only";
      const planId = searchParams.get("planId") || "";

      if (orderId || amount) {
        setPlanDetails({
          orderId: orderId || "",
          amount: amount || "",
          planLabel,
          addOns,
          planId,
          totalAmount: amount ? parseInt(amount) : 0,
        });
      }
    }
  }, [searchParams]);

  const orderId = planDetails?.orderId || searchParams.get("orderId") || "";
  const amount = planDetails?.amount || searchParams.get("amount") || "";
  const planSummary = planDetails?.planLabel || searchParams.get("planLabel") || "Digital Visiting Card Plan";
  const addOnCopy = planDetails?.addOns || searchParams.get("addOns") || "Digital Card Only";
  const planId = planDetails?.planId || searchParams.get("planId") || "";
  const basePlan = planDetails?.basePlan || null;
  const hasSmart = planDetails?.hasSmart || false;
  const hasStand = planDetails?.hasStand || false;
  const totalAmount = planDetails?.totalAmount || (amount ? parseInt(amount) : 0);

  const effectiveAmount = amount || "";
  
  // Calculate pricing breakdown
  const basePrice = basePlan?.amount || 0;
  const addOnTotal = totalAmount - basePrice;
  const smartAmount = ADD_ON_OPTIONS.find(opt => opt.id === 'smart')?.amount ?? 499;
  const standAmount = ADD_ON_OPTIONS.find(opt => opt.id === 'stand')?.amount ?? 999;

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#f5f3ff] via-white to-[#fff7ed] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -left-24 top-10 w-64 h-64 bg-primary/10 blur-3xl rounded-full"></div>
        <div className="absolute -right-36 bottom-16 w-72 h-72 bg-secondary/10 blur-3xl rounded-full"></div>
      </div>

      <div className="relative max-w-5xl mx-auto px-5 sm:px-8 lg:px-12 py-16 sm:py-20">
        <div className="bg-white/90 backdrop-blur-sm shadow-2xl rounded-3xl border border-white/60 overflow-hidden">
          <div className="bg-gradient-to-r from-primary to-secondary text-white py-10 px-6 sm:px-10 text-center">
            <div className="flex flex-col items-center gap-4">
              <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
                <FaCheckCircle className="text-white text-4xl" />
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold">
                Payment Successful!
              </h1>
              <p className="max-w-2xl text-base sm:text-lg font-medium text-white/90">
                Thank you for choosing VIP Number Shop. Your smart digital visiting
                card experience starts now.
              </p>
            </div>
          </div>

          <div className="px-6 sm:px-10 py-10 flex flex-col gap-10">
             <div className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/10 rounded-2xl p-6 sm:p-8 text-center flex flex-col items-center gap-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#43387c]">
                Ready to personalise your Digital Visiting Card?
              </h2>
              <p className="max-w-2xl text-gray-600 text-base sm:text-lg">
                Complete a quick form with your logo, contact information, and brand
                colours so we can craft your interactive smart card.
              </p>
              <Link
                href="/digital-card"
                className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-primary text-white font-semibold text-base sm:text-lg shadow-lg hover:bg-secondary transition-colors animate-bounce"
              >
                Fill My Card Details
              </Link>
              <p className="text-xs text-gray-500">
                Takes less than 5 minutes. You can save & resume anytime.
              </p>
            </div>
            <div className="">
              <div className="md:col-span-2 bg-gradient-to-br from-white to-[#f6f3ff] border border-primary/10 rounded-2xl p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-[#43387c] flex items-center gap-2 mb-6">
                  <HiSparkles className="text-secondary text-2xl" />
                  Order Snapshot
                </h2>
                
                {/* Order ID and Basic Info */}
                <div className="gap-4 mb-6">
                  {/* <div className="rounded-xl bg-white border border-primary/10 p-4">
                    <p className="text-gray-500 text-sm mb-1">Order ID</p>
                    <p className="font-semibold text-[#43387c]">
                      {orderId || "Processing"}
                    </p>
                  </div> */}
                  <div className="rounded-xl bg-white border border-primary/10 p-4">
                    <p className="text-gray-500 text-sm mb-1">Plan Type</p>
                    <p className="font-semibold text-[#43387c]">{planSummary}</p>
                  </div>
                </div>

                {/* Detailed Pricing Breakdown */}
                <div className="bg-white border border-primary/10 rounded-xl p-5 mb-6">
                  <h3 className="text-lg font-semibold text-[#43387c] mb-4">Pricing Breakdown</h3>
                  <div className="space-y-3">
                    {/* Base Plan */}
                    {basePlan ? (
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-700 font-medium">
                          {basePlan.label}
                        </span>
                        <span className="font-semibold text-[#43387c]">
                          ₹{basePrice}
                        </span>
                      </div>
                    ) : (
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-700 font-medium">
                          {planSummary}
                        </span>
                        <span className="font-semibold text-[#43387c]">
                          ₹{basePrice || totalAmount}
                        </span>
                      </div>
                    )}

                    {/* Add-ons Breakdown */}
                    {hasSmart && hasStand ? (
                      // Both add-ons - show bundle
                      <>
                        <div className="space-y-1">
                          <div className="flex justify-between items-center text-sm text-gray-400 line-through">
                            <span>Smart Visiting Card</span>
                            <span>+₹{smartAmount}</span>
                          </div>
                          <div className="flex justify-between items-center text-sm text-gray-400 line-through">
                            <span>QR NFC Stand</span>
                            <span>+₹{standAmount}</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center py-2 bg-primary/10 rounded-lg px-3 border-2 border-primary/30">
                          <span className="font-semibold text-primary flex items-center gap-1">
                            <span className="text-yellow-500">✨</span>
                            Bundle (Smart + Stand)
                          </span>
                          <span className="font-semibold text-primary">
                            +₹{addOnTotal}
                          </span>
                        </div>
                        <div className="text-sm text-green-600 font-semibold bg-green-50 px-2 py-1 rounded-md text-center">
                          💰 Save ₹{(smartAmount + standAmount) - addOnTotal}
                        </div>
                      </>
                    ) : hasSmart ? (
                      // Only smart card
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-700 font-medium">
                          Smart Visiting Card
                        </span>
                        <span className="font-semibold text-[#43387c]">
                          +₹{addOnTotal}
                        </span>
                      </div>
                    ) : hasStand ? (
                      // Only stand
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-700 font-medium">
                          QR NFC Stand
                        </span>
                        <span className="font-semibold text-[#43387c]">
                          +₹{addOnTotal}
                        </span>
                      </div>
                    ) : null}

                    {/* Divider */}
                    {(hasSmart || hasStand) && (
                      <div className="border-t-2 border-dashed border-gray-300 my-3"></div>
                    )}

                    {/* Total */}
                    <div className="flex justify-between items-center pt-3 border-t-2 border-primary bg-gradient-to-r from-primary/10 to-purple-50 rounded-lg px-3 py-3 -mx-1">
                      <span className="font-bold text-[#43387c] text-lg">Total Paid</span>
                      <span className="text-primary font-extrabold text-2xl">
                        ₹{totalAmount}
                        <span className="text-sm font-normal">/-</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="">
                  <div className="rounded-xl bg-white border border-primary/10 p-4">
                    <p className="text-gray-500 text-sm mb-1">Add-ons</p>
                    <p className="font-semibold text-[#43387c]">{addOnCopy}</p>
                  </div>
                  {/* <div className="rounded-xl bg-white border border-primary/10 p-4">
                    <p className="text-gray-500 text-sm mb-1">Next Step</p>
                    <p className="font-semibold text-[#43387c] text-sm">
                      Share your design & business details
                    </p>
                  </div> */}
                </div>
              </div>

              {/* <div className="bg-white border border-secondary/20 rounded-2xl p-6 shadow-sm flex flex-col gap-4 justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-secondary">What's Next?</h3>
                  <ul className="mt-3 space-y-2 text-sm text-gray-600">
                    <li>• Fill in your personal & business details</li>
                    <li>• Upload branding assets for your card</li>
                    <li>• Get a preview before final activation</li>
                  </ul>
                </div>
                <div className="flex items-center gap-3 text-sm bg-secondary/10 border border-secondary/30 rounded-xl p-3 text-secondary">
                  <FaWhatsapp className="text-lg" />
                  <span>Need help? Reply to the WhatsApp we just sent.</span>
                </div>
              </div> */}
            </div>

            {/* Connect Soon Message */}
            <div className="bg-gradient-to-r from-primary to-secondary text-white rounded-2xl p-6 sm:p-8 text-center shadow-lg">
              <div className="flex flex-col items-center gap-3">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 mb-2">
                  <FaWhatsapp className="text-3xl" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold">
                  We'll Connect With You Soon!
                </h3>
                <p className="text-base sm:text-lg text-white/90 max-w-2xl">
                  Our team will reach out to you shortly via WhatsApp and email for the next steps in setting up your Digital Visiting Card.
                </p>
                <p className="text-sm text-white/80 font-medium mt-2">
                  Please keep your phone and email handy for further process.
                </p>
              </div>
            </div>

           
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;

