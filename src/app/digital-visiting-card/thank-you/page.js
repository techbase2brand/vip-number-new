"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FaCheckCircle, FaWhatsapp } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";

const ThankYouPage = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const amount = searchParams.get("amount");
  const planSummary =
    searchParams.get("planLabel") || "Digital Visiting Card Plan";
  const addOnCopy =
    searchParams.get("addOns") || "Digital Card Only";
  const planId = searchParams.get("planId") || "";

  const effectiveAmount = amount || "";

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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 bg-gradient-to-br from-white to-[#f6f3ff] border border-primary/10 rounded-2xl p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-[#43387c] flex items-center gap-2">
                  <HiSparkles className="text-secondary text-2xl" />
                  Order Snapshot
                </h2>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base">
                  <div className="rounded-xl bg-white border border-primary/10 p-4">
                    <p className="text-gray-500">Order ID</p>
                    <p className="font-semibold text-[#43387c]">
                      {orderId || "Processing"}
                    </p>
                  </div>
                  <div className="rounded-xl bg-white border border-primary/10 p-4 space-y-1">
                    <p className="text-gray-500">Amount Paid</p>
                    <p className="font-semibold text-[#43387c] text-lg">
                      {effectiveAmount ? `₹${effectiveAmount}` : "₹—"}
                    </p>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">
                      {planSummary}
                    </p>
                  </div>
                  <div className="rounded-xl bg-white border border-primary/10 p-4">
                    <p className="text-gray-500">Plan Details</p>
                    <p className="font-semibold text-[#43387c]">{addOnCopy}</p>
                  </div>
                  <div className="rounded-xl bg-white border border-primary/10 p-4">
                    <p className="text-gray-500">Next Step</p>
                    <p className="font-semibold text-[#43387c]">
                      Share your design & business details
                    </p>
                  </div>
                  <div className="rounded-xl bg-white border border-primary/10 p-4">
                    <p className="text-gray-500">Support</p>
                    <p className="font-semibold text-[#43387c]">
                      We just sent a confirmation on WhatsApp & email.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-secondary/20 rounded-2xl p-6 shadow-sm flex flex-col gap-4 justify-between">
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
              </div>
            </div>

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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;

