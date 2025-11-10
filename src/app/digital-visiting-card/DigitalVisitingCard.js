"use client";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import MoneyBack from "../../../public/digital-card-new/moneyback.webp";
import { HiCurrencyRupee } from "react-icons/hi2";
import sideImg from "../../../public/digital-card-new/sideImg.webp";
import poweredBy from "../../../public/digital-card-new/poweredBy.webp";
import { FaStar, FaWhatsapp } from "react-icons/fa";
import Image from "next/image";
import { HiChevronUp, HiChevronDown } from "react-icons/hi2";
import qrCenter from "../../../public/digital-card-new/qrCenter.webp";
import qrRight from "../../../public/digital-card-new/qrRight.webp";
import qrbackimg from '../../../public/digital-card-new/qrbackimg.webp'
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { getProfile } from "../Services/Services";
import { AppStateContext } from "../contexts/AppStateContext/AppStateContext";
import { MyRegisterSignInContext } from "../contexts/MyRegisterSignInContext/MyRegisterSignInContext";
import "./digital.css"
import { useDigitalCardPlan } from "./PlanContext";
const invalidNames = [
  "loged-in",
  "loged in",
  "missed call",
  "call me back",
  "vip",
  "undefined",
  "null",
  "-",
];

const carouselImages = [
  {
    id: 1,
    src: qrRight,
    backimg: qrbackimg,
    alt: "product 1",
    title: "Digital Visiting Card + QR NFC Standee",
    desc: "Payments for QR Standee are non-refundable.\nNo Question Ask! Only Digital visiting Card 14 Days Money Back Guarantee",
  },
  {
    id: 2,
    src: qrCenter,
    backimg: qrbackimg,
    alt: "product 2",
    title: "Premium NFC Card Only",
    desc: "Fast contact sharing, tap-to-save experience, custom branding available!",
  },
  {
    src: qrRight,
    backimg: qrbackimg,
    alt: "product 3",
    title: "All-in-One Professional Kit",
    desc: "Includes standee, NFC card, & digital business profile access.",
  },
  {
    src: sideImg,
    alt: "product 3",
    title: "All-in-One Professional Kit",
    desc: "Includes standee, NFC card, & digital business profile access.",
  },
  {
    src: sideImg,
    alt: "product 3",
    title: "All-in-One Professional Kit",
    desc: "Includes standee, NFC card, & digital business profile access.",
  },
];

const DigitalVisitingCard = () => {
  const panelImg = process.env.NEXT_PUBLIC_IMAGES;
  const { userProfile, user, setNameUpdate } = useContext(AppStateContext);
  const { setActiveSignInWithOtp } = useContext(MyRegisterSignInContext);
  const Router = useRouter();
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [carouselWindowStart, setCarouselIdx] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    pincode: "",
    city: "",
    address: "",
  });
  const [errors, setErrors] = useState({});
  const [isRazorpayReady, setIsRazorpayReady] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const {
    basePlans,
    basePlanId,
    setBasePlanId,
    addOnOptions,
    selectedAddOns,
    toggleAddOn,
    checkoutPlan,
    openPlanModal,
    closePlanModal,
    isPlanModalOpen,
    isProfileModalOpen,
    closeProfileModal,
    startProfileFlow,
  } = useDigitalCardPlan();
  const activePlanRef = React.useRef(checkoutPlan);
  const basePlan = checkoutPlan?.basePlan;
  const addOnTotal = checkoutPlan
    ? checkoutPlan.totalAmount - (checkoutPlan.basePlan?.amount ?? 0)
    : 0;

  const handleOpenProfileModal = (config) => {
    startProfileFlow(config);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    const trimmedName = formData.name.trim();
    if (!trimmedName) newErrors.name = "Name is required";
    else if (invalidNames.includes(trimmedName.toLowerCase()))
      newErrors.name = "Please enter your full name";
    if (!/^\d{10}$/.test(formData.mobile))
      newErrors.mobile = "Enter 10-digit mobile";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Invalid email";
    if (!/^\d{6}$/.test(formData.pincode))
      newErrors.pincode = "Enter 6-digit pincode";
    if (!formData.city.trim() || formData.city.trim().length < 2)
      newErrors.city = "City is required";
    if (!formData.address.trim() || formData.address.trim().length < 10)
      newErrors.address = "Min 10 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    if (user?.token) {
      getProfile(user?.token)
        ?.then((res) => {
          if (!res) return;
          const address = res?.address || {};
          const firstName = res?.firstname || "";
          const lastName = res?.lastname || "";
          const fullName = [firstName, lastName].filter(Boolean).join(" ");
          setFormData((prevState) => ({
            ...prevState,
            name: fullName,
            mobile: res?.mobile || "",
            email: res?.email || "",
            pincode: address?.zip_code || "",
            city: address?.city || "",
            address: address?.address || "",
          }));
        })
        .catch((error) => {
          console.error("Failed to prefill profile data:", error);
        });
    }
  }, [user]);

  useEffect(() => {
    const scriptUrl = "https://checkout.razorpay.com/v1/checkout.js";
    const existingScript = document.querySelector(`script[src="${scriptUrl}"]`);

    if (existingScript) {
      if (window.Razorpay && typeof window.Razorpay === "function") {
        setIsRazorpayReady(true);
      } else {
        existingScript.addEventListener("load", () => setIsRazorpayReady(true));
      }
      return;
    }

    const script = document.createElement("script");
    script.src = scriptUrl;
    script.async = true;
    script.onload = () => setIsRazorpayReady(true);
    script.onerror = () =>
      toast.error("Payment gateway failed to load. Please refresh and try again.");
    document.body.appendChild(script);

    return () => {
      script.onload = null;
      script.onerror = null;
    };
  }, []);
  useEffect(() => {
    activePlanRef.current = checkoutPlan;
  }, [checkoutPlan]);
  const PAYMENT_API_URL =
    "https://staging.fancymobilenumber.in/index.php/web/razorpay/digital_card/payment";

  const resolveOrderDetails = (response, planInfo) => {
    const dataLayer = response?.data ?? response ?? {};
    const innerLayer = dataLayer?.data ?? dataLayer ?? {};
    const orderId =
      innerLayer?.order_id ||
      innerLayer?.razorpay_order_id ||
      innerLayer?.id ||
      innerLayer?.orderId;
    let amount = innerLayer?.amount;
    const currency = innerLayer?.currency || "INR";
    const fallbackAmount = planInfo?.payload?.amount ?? 0;

    if (typeof amount !== "number" || Number.isNaN(amount) || amount <= 0) {
      amount = fallbackAmount * 100;
    } else if (fallbackAmount && amount <= fallbackAmount + 10) {
      amount = fallbackAmount * 100;
    }

    return {
      orderId,
      amount,
      currency,
    };
  };

  const handleRzpClick = async () => {
    if (!checkoutPlan) {
      toast.error("Please select a plan before continuing.");
      return;
    }

    if (
      !isRazorpayReady ||
      !window.Razorpay ||
      typeof window.Razorpay !== "function"
    ) {
      toast.error(
        "Payment gateway is still initializing. Please try again in a moment."
      );
      return;
    }

    const token = user?.token;

    if (!token) {
      toast.error("Session expired. Please sign in again to continue.");
      setActiveSignInWithOtp(true);
      return;
    }

    activePlanRef.current = checkoutPlan;

    const payload = checkoutPlan?.payload;

    if (!payload) {
      toast.error("Unable to prepare payment payload. Please try again.");
      return;
    }

    setIsProcessingPayment(true);

    try {
      const response = await axios.post(PAYMENT_API_URL, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const { orderId, amount, currency } = resolveOrderDetails(
        response,
        checkoutPlan
      );

      if (!orderId) {
        throw new Error("Unable to start payment. Order ID missing.");
      }

      closePlanModal();

      const options = {
        key: "rzp_live_mMfqxRhCpzrpog",
        name: "VIP NUMBER SHOP",
        description: "Digital Visiting Card Payment",
        image: `${panelImg}/assets/img/vip-images/VIP-icon-2_iyiaaj.webp`,
        order_id: orderId,
        amount,
        currency,
        handler: function (response) {
          ajaxRequest(response, false);
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.mobile,
        },
        notes: {
          address: formData.address,
          base_plan: checkoutPlan?.basePlan?.label,
          add_ons: checkoutPlan?.addOnLabel || "Digital Only",
        },
        theme: {
          color: "#3399cc",
        },
        method: "upi",
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.on("payment.failed", function (response) {
        ajaxRequest(response, true);
      });
      rzp1 && rzp1.open();
    } catch (error) {
      console.error("Failed to initialise Razorpay order:", error);
      toast.error(
        error?.response?.data?.message ||
          "We couldn't start the payment. Please try again."
      );
      openPlanModal();
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const ajaxRequest = (response, orderdeclined) => {
    const planSnapshot = activePlanRef.current || checkoutPlan;
    const planAmount = planSnapshot?.totalAmount ?? 0;
    let data;
    let leadPayload = {};
    if (response.error) {
      const errorMetadata = response.error?.metadata || {};
      data = {
        payment_status: 0,
        amount: planAmount,
        user_id: 613,
        razorpay_payment_id: errorMetadata.payment_id || "",
        razorpay_order_id: errorMetadata.order_id || "",
        error_code: response.error.code,
        error_description: response.error.description,
        error_source: response.error.source,
        error_step: response.error.step,
        error_reason: response.error.reason,
      };
      leadPayload.payment_status = "failed";
      leadPayload.payment_id = errorMetadata.payment_id || ""; // Add payment_id to leadPayload
    } else {
      data = {
        payment_status: 1,
        amount: planAmount,
        user_id: 613,
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_order_id: response.razorpay_order_id,
        razorpay_signature: response.razorpay_signature,
      };
      leadPayload.payment_status = "success";
      leadPayload.payment_id = response.razorpay_payment_id; // Add payment_id to leadPayload
    }
    const token = user?.token; // get the user's token data
    const orderId =
      response?.razorpay_order_id ||
      response?.order_id ||
      response?.error?.metadata?.order_id ||
      "";
    fetch(`/api/web/transaction/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // use the user's token data
      },
      body: JSON.stringify(data),
    })
      .then(async (response) => {
        if (response.ok) {
          await response.json();
          if (orderdeclined) {
            localStorage.setItem("vipDeclined", true);
            Router.push(`/payment-declined?orderId=${orderId}`);
          } else {
            try {
              const actionLabel = (() => {
                if (checkoutPlan?.basePlan?.duration === 30) {
                  return "Silver - 30 Days";
                }
                if (
                  checkoutPlan?.basePlan?.duration === 365 &&
                  checkoutPlan?.basePlan?.type?.toLowerCase() === "silver"
                ) {
                  return "Silver - DVC";
                }
                if (
                  checkoutPlan?.basePlan?.duration === 365 &&
                  checkoutPlan?.basePlan?.type?.toLowerCase() === "gold"
                ) {
                  return "Gold - DVC";
                }
                return "digital card payment";
              })();

              await axios.post(
                `/api/web/profile/update`,
                {
                  action: actionLabel,
                },
                {
                  headers: {
                    Authorization: `Bearer ${user?.token}`,
                  },
                }
              );
            } catch (error) {
              console.error("Error during second update:", error);
            }
            const planLabel =
              planSnapshot?.displayLabel || planSnapshot?.basePlan?.label || "";
            const planAddOns = planSnapshot?.addOnLabel || "Digital Only";
            const basePlanId = planSnapshot?.basePlan?.id || "";

            const thankYouQuery = new URLSearchParams({
              orderId: orderId || "",
              amount: String(planAmount || ""),
              planLabel,
              addOns: planAddOns,
              planId: basePlanId,
            }).toString();

            Router.push(`/digital-visiting-card/thank-you?${thankYouQuery}`);
          }
        } else {
          const data = await response.json();
          toast.error(data.message);
          localStorage.setItem("vipDeclined", true);
          Router.push("/payment-declined");
          console.error(data);
        }
      })
      .catch((error) => console.error(error));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    if (!checkoutPlan) {
      toast.error("Please select a plan before continuing.");
      return;
    }
    // Submit or next step logic can go here
    try {
      const storedReferId = localStorage.getItem("referId");
      await axios.post(
        `/api/web/profile/update`,
        {
          full_name: formData.name,
          mobile: formData.mobile,
          email: formData.email,
          zip_code: formData.pincode,
          address: formData.address,
          city: formData.city,
          // state: formData.state_name,
          // lag_lat: formData.lag_lat,
          time_zone: "GMT+5:30",
          // district: formData.district,
          // business_name: formData.business_name,
          ...(storedReferId && {
            refer_id: storedReferId === "undefined" ? "" : storedReferId,
          }),
        },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      setNameUpdate(true);
      closeProfileModal();
      openPlanModal();
      await axios.post(
        `/api/web/lead/create`,
        {
          first_name: formData.name,
          mobile_number: formData.mobile,
          primary_email: formData.email,
          postal_code: formData.pincode,
          city: formData.city,
          billing_address: formData.address,
          // state: data.state_name,
          // district: data.district,
          ...(storedReferId && {
            refer_id: storedReferId === "undefined" ? "" : storedReferId,
          }),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
    } catch (error) {
      console.error("Error:", error);
      toast.error("Unable to submit details. Please try again.");
    }
  };


  return (
    <div className="pt-5 container-os">
      {isPlanModalOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => {
              if (!isProcessingPayment) {
                closePlanModal();
              }
            }}
          ></div>
          <div className="relative bg-white w-full max-w-[560px] rounded-3xl shadow-2xl mx-4">
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h3 className="text-[20px] font-semibold text-gray-900">
                Choose Your Plan
              </h3>
              <button
                className="text-gray-600 hover:text-black text-[24px] leading-none"
                aria-label="Close"
                onClick={() => {
                  if (!isProcessingPayment) {
                    closePlanModal();
                  }
                }}
              >
                ×
              </button>
            </div>
            <div className="px-6 py-5 flex flex-col gap-4">
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">
                  Digital Visiting Card Plan
                </label>
                <select
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 font-semibold focus:outline-none focus:ring-2 focus:ring-primary"
                  value={basePlanId}
                  onChange={(e) => setBasePlanId(e.target.value)}
                >
                  {basePlans?.map((planOption) => (
                    <option key={planOption.id} value={planOption.id}>
                      {`${planOption.label} — ₹${planOption.amount}`}
                    </option>
                  ))}
                </select>
              </div>

              <div className="border border-gray-200 rounded-2xl px-4 py-4 bg-gray-50">
                <span className="text-sm font-semibold text-gray-700">
                  Add-ons (optional)
                </span>
                <div className="flex flex-col gap-3 mt-3">
                  {addOnOptions?.map((option) => (
                    <label
                      key={option.id}
                      className="flex items-start gap-3 text-gray-800 cursor-pointer"
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
                          <span className="text-[12px] text-gray-500">
                            {option.description}
                          </span>
                        )}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl bg-primary/10 border border-primary/30 px-5 py-4">
                <h4 className="text-sm font-semibold text-primary mb-1">
                  Order Summary
                </h4>
                <p className="text-sm text-gray-800">
                  {checkoutPlan?.displayLabel || "Select a plan to continue"}
                </p>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-sm text-gray-600">Total Payable</span>
                  <span className="text-2xl font-bold text-primary">
                    ₹{checkoutPlan?.totalAmount ?? "--"}
                  </span>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-1">
                <button
                  type="button"
                  className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700"
                  onClick={() => {
                    if (!isProcessingPayment) {
                      closePlanModal();
                    }
                  }}
                >
                  Back
                </button>
                <button
                  type="button"
                  className="px-6 py-2.5 rounded-xl bg-primary text-white font-semibold hover:opacity-90 disabled:opacity-60"
                  onClick={handleRzpClick}
                  disabled={isProcessingPayment || !checkoutPlan}
                >
                  {isProcessingPayment ? "Preparing..." : "Proceed to Pay"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* <div className="w-full">
        <div className="bg-[url('/digital-visiting-card/Frame.webp')] bg-no-repeat bg-contain pb-40 overflow-hidden pt-16">
          <div className="flex justify-evenly m-auto pt-8 Money-Back-main ">
            <Image
              src={MoneyBack}
              alt="dsfds"
              width={400}
              height={300}
              className="max-w-[191px] animate-bounce [animation-delay:0.8s] money-back"
            />
            <div>
              <h1 className="text-[71px] max-w-[923px] leading-[81px] text-center font-bold smart-card">
                Smart Card <br />{" "}
                <span className="text-primary">How It Works</span>
              </h1>
            </div>
            <Image
              src={MoneyBack}
              alt="dsfds"
              width={400}
              height={300}
              className="max-w-[191px] animate-bounce [animation-delay:0s] money-back"
            />
          </div>
          <div className="text-center">
            <p className="text-[24px] max-w-[862px] m-auto leading-10 font-normal text-center py-[10px] smart-des">
              These business essentials are backed by VIP Number Shop, offering
              exclusive VIP mobile numbers to enhance your brand’s
              professional identity.
            </p>
            <button
              className="py-2 px-8 bg-primary rounded-3xl text-white"
              onClick={() => {
                if (!user?.token) {
                  setActiveSignInWithOtp(true);
                  localStorage.setItem("Lead-Page", "Digital Card");
                } else {
      handleOpenProfileModal();
                }
              }}
            >
              Buy Now
            </button>
          </div>
          <div className="grid grid-cols-2 w-full relative">
            <div className="relative z-[5]">
              <div className="flex flex-col items-center w-max relative left-[20%] bottom-[5%] mobile-on-ph">
                <Image
                  src={saveContact}
                  width={1000}
                  height={300}
                  alt="Save Contact"
                  className=" max-w-[144px] 2xl:max-w-[194px]"
                />
                <button className="bg-[#22C55E] max-w-[217px] py-3 rounded-full px-8 text-white w-[115%]">
                  Save Contact
                </button>
              </div>
              <div className="flex flex-col items-center w-max relative left-[16%] bottom-0 mobile-on-ph">
                <Image
                  src={accDetail}
                  width={1000}
                  height={300}
                  alt="Click to Account Details"
                  className=" max-w-[144px] 2xl:max-w-[194px]"
                />
                <button className="bg-[#3B82F6]  max-w-[217px] py-3 rounded-full px-8 text-white w-full bottom-1">
                  Click to Account Details
                </button>
              </div>
              <div className="flex flex-col items-center w-max relative left-[32%] top-[8%] mobile-on-ph">
                <Image
                  src={Sociallink}
                  width={1000}
                  height={300}
                  alt="Click to Social Links"
                  className=" max-w-[144px] 2xl:max-w-[194px]"
                />
                <button className="bg-[#E21A20]  max-w-[217px] py-3 rounded-full px-8 text-white w-[115%] bottom-1">
                  Click to Social Links
                </button>
              </div>
            </div>
            
            <div className="absolute z-[4] top-0 w-full h-full flex justify-center items-center mobile-on-ph">
              <div className="flex flex-col items-center">
                <Image
                  src={allLink}
                  width={1000}
                  height={300}
                  alt="All With Single Click"
                  className="max-w-[250px] 2xl:max-w-[344px]"
                />
                <button className="bg-[#FFCE00]  max-w-[389px] py-6 rounded-full px-6 text-white w-[120%] bottom-1 text-[26px]">
                  All With Single Click
                </button>
              </div>
            </div> 

            <div className="relative z-[5]">
              <div className="flex flex-col items-center w-max ms-auto relative right-[20%] bottom-[5%] mobile-on-ph">
                <Image
                  src={clickCall}
                  width={1000}
                  height={300}
                  alt="Click to Call"
                  className=" max-w-[144px] 2xl:max-w-[194px] ms-auto"
                />
                <button className="ms-auto bg-[#3B82F6]  max-w-[217px] py-3 rounded-full px-8 text-white w-[115%] bottom-1 relative right-3">
                  Click to Call
                </button>
              </div>
              <div className="flex flex-col items-center w-max ms-auto relative right-[20%] bottom-0 mobile-on-ph">
                <Image
                  src={QrCode}
                  width={1000}
                  height={300}
                  alt="Click to Qr Code"
                  className=" max-w-[144px] 2xl:max-w-[194px] ms-auto"
                />
                <button className="ms-auto bg-[#E21A20]  max-w-[217px] py-3 rounded-full px-8 text-white w-[115%] bottom-1 relative right-3">
                  Click to Qr Code
                </button>
              </div>
              <div className="flex flex-col items-center w-max ms-auto relative right-[29%] top-[8%] mobile-on-ph ">
                <Image
                  src={WhatsApp}
                  width={1000}
                  height={300}
                  alt="Click to WhatsApp"
                  className=" max-w-[144px] 2xl:max-w-[194px] ms-auto"
                />
                <button className="ms-auto bg-[#22C55E]  max-w-[217px] py-3 rounded-full px-8 text-white w-[115%] bottom-1 relative right-3">
                  Click to WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      {/* Second component .... */}
      {/* <div className="">
        <div className="py-16 px-4">
          <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
   
            <div>
              <h2 className="text-[52px] leading-tight mb-4 font-bold">
                Complete <span className="text-primary">Business Card Kit</span>
              </h2>
              <p className="text-[18px] text-gray-700 leading-relaxed">
                Presenting the ultimate NFC Smart Business Kit: A modern way to
                share your identity with tailored designs, premium print
                quality, and durable materials. Comes with a complimentary
                two-year replacement assurance for worry-free use.
              </p>
            </div>

 
            <div className="bg-primary rounded-full p-4 flex items-center gap-4 shadow-lg">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-white overflow-hidden scale-[1.4]">
                  <Image
                    src={girl}
                    alt="Contact vip shop"
                    width={1000}
                    height={100}
                    className="w-[80px] h-[80px] object-cover rounded-full"
                  />
                </div>
                <div className="absolute top-[-25px] right-[-25px] w-10 h-10 bg-black rounded-full flex items-center justify-center cursor-pointer">
                  <FaWhatsapp className="text-white text-[20px]" />
                </div>
              </div>
              <div className="ps-5">
                <h3 className="text-yellow-300 text-[18px]">
                  Contact VIP Number Shop
                </h3>
                <p className="text-white text-[18px]">
                  Looking for free design assistance?
                </p>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <div className=" hidden lg:block">
        <div className="py-16 px-4">
          <div className=" mx-auto grid grid-cols-2 sm:grid-cols- gap-8 items-center">
          </div>
        </div>

        {/* third Component */}
        <div className="w-full my-16 flex justify-center">
          <div className="flex gap-10 w-full">
            {/* Carousel Thumbnails (Left) */}
            <div className="flex flex-col items-center min-w-[267px] relative">
              {/* Top button */}
              <button
                className="flex items-center justify-center rounded-full bg-[#CDC5DF] min-w-[267px]  h-[60px] mb-3 text-3xl shadow-md transition hover:bg-[#bbaed8]"
                onClick={() =>
                  setCarouselIdx((idx) => (idx > 0 ? idx - 1 : idx))
                }
                aria-label="Scroll to top images"
              >
                <HiChevronUp className="text-[#8773b6]" size={34} />
              </button>
              {/* Haldi scroll indicator */}
              <div className="absolute left-[-30px] -translate-x-1/2 top-[70px] bottom-[70px] flex flex-col items-center z-0">
                <div className="w-2 h-full rounded-full bg-[#FFD600] opacity-80"></div>
              </div>
              {/* Thumbnails */}
              <div className="flex flex-col gap-2 z-10 pt-[10px] pb-[10px]">
                {carouselImages
                  .slice(carouselWindowStart, carouselWindowStart + 3)
                  .map((img, idx) => (
                    <div
                      key={idx + carouselWindowStart}
                      className={`p-[2px] rounded-[56px] border-[5px] ${selectedIdx === idx + carouselWindowStart
                        ? "border-secondary"
                        : "border-transparent"
                        } cursor-pointer bg-primary`}
                      onClick={() => setSelectedIdx(idx + carouselWindowStart)}
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        width={400}
                        height={300}
                        className="rounded-lg object-cover max-w-[200px] p-7  "
                      />
                    </div>
                  ))}
              </div>
              {/* Bottom button */}
              <button
                className="flex items-center justify-center rounded-full bg-[#CDC5DF] min-w-[267px]  h-[60px] mt-3 text-3xl shadow-md transition hover:bg-[#bbaed8]"
                onClick={() =>
                  setCarouselIdx((idx) =>
                    idx < carouselImages.length - 3 ? idx + 1 : idx
                  )
                }
                aria-label="Scroll to bottom images"
              >
                <HiChevronDown className="text-[#8773b6]" size={34} />
              </button>
            </div>

            {/* Main Image + Details (Right) */}
            <div className="flex-1 flex items-center">
              <div
                className="relative w-full max-h-[940px] drop-shadow-xl bg-[#5B448A] flex justify-start items-center rounded-[56px] p-[25px]"
              // style={{
              //   backgroundImage: `url(${carouselImages[selectedIdx].src})`,
              // }}
              >
                <div className=" flex-1 flex flex-col gap-1 ps-14 py-10 left-0 top-3 max-w-[540px] min-w-[340px] z-10">
                  <h2 className="text-[41px] font-bold mb-3 leading-snug text-white">
                    {carouselImages[selectedIdx].title}
                  </h2>
                  <span className="flex items-center mb-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <FaStar
                        key={i}
                        className="text-secondary mr-1 w-[21px] h-[21px]"
                      />
                    ))}
                    <span className="text-white ml-2 text-[16px]">
                      4.9 (30 Reviews)
                    </span>
                  </span>
                  <div className="flex items-center mb-1 gap-2">
                    <HiCurrencyRupee
                      fontSize={22}
                      className="text-secondary mr-1"
                    />
                    <h4 className="text-white font-normal text-[18px]">
                      Payments for QR Standee are <br /> non-refundable
                    </h4>
                  </div>
                  <div className="flex items-center mb-1 gap-2">
                    <HiCurrencyRupee
                      fontSize={22}
                      className="text-secondary mr-1"
                    />
                    <h4 className="text-white font-normal text-[18px]">
                      No Question Ask?
                    </h4>
                  </div>
                  <div className="flex items-center mb-2 gap-2">
                    <HiCurrencyRupee
                      fontSize={22}
                      className="text-secondary mr-1"
                    />
                    <h4 className="text-white font-normal text-[18px]">
                      Only Digital visiting Card 14 Days Money Back <br />{" "}
                      Guarantee
                    </h4>
                  </div>
                  <div className="mb-1">
                    <h2 className="font-bold text-[29px] text-white">
                      Base Plan: ₹{basePlan?.amount ?? "--"}/-
                    </h2>
                    <p className="text-[#d1c6f2] text-[15px]">
                      {basePlan?.label ?? "Select a plan to view details"}
                    </p>
                    {addOnTotal > 0 && (
                      <p className="text-[#FFD600] text-[15px] font-semibold mt-1">
                        Add-ons: {checkoutPlan?.addOnLabel} (+₹{addOnTotal})
                      </p>
                    )}
                  </div>
                  {/* Pricing & Plan Dropdown + offers section */}
                  <div className="flex flex-col gap-3 mt-3 max-w-xs relative">
                    <label className="text-secondary font-normal -top-3 left-3 bg-primary px-2 mb-1 absolute text-[15px]">
                      Choose a Plan
                    </label>
                    <select
                      className="rounded-lg px-4 py-4 border-2 border-white bg-[#5B448A] text-white font-bold focus:outline-none focus:border-secondary"
                      style={{ minWidth: 210, maxWidth: 320 }}
                      value={basePlanId}
                      onChange={(e) => setBasePlanId(e.target.value)}
                    >
                      {basePlans?.map((planOption) => (
                        <option key={planOption.id} value={planOption.id}>
                          {`${planOption.label} — ₹${planOption.amount}`}
                        </option>
                      ))}
                    </select>
                    <div className="flex flex-col gap-2 bg-[#6E53A8] bg-opacity-60 border border-white/20 rounded-xl px-4 py-3 text-white text-sm">
                      <span className="font-semibold text-[15px]">
                        Add-ons (optional)
                      </span>
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
                              <span className="text-[12px] text-[#E2DFF5]">
                                {option.description}
                              </span>
                            )}
                          </span>
                        </label>
                      ))}
                      <span className="text-[11px] text-[#E2DFF5]">
                        Bundle smart accessories with your digital card to boost
                        offline sharing.
                      </span>
                    </div>
                    <div className="mt-6">
                      <span className="text-white font-normal">
                        Total Amount
                      </span>
                      <h2 className="text-[42px] font-extrabold text-white mt-0 leading-tight">
                        ₹{checkoutPlan?.totalAmount ?? "--"}
                        <span className="text-[22px]">/-</span>
                      </h2>
                    </div>
                    <div className="absolute max-w-[195px] bottom-[100px] left-[70%] text-center">
                      <Image
                        src={poweredBy}
                        alt="tag line"
                        width={400}
                        height={300}
                        className="max-w-[200px]"
                      />
                      <span className="text-secondary text-[18px]">
                        Remove Tagline
                      </span>
                    </div>
                    <button
                      className="bg-white text-[#5B448A] max-w-[200px] font-bold rounded-full py-3 px-14 text-lg shadow-lg mt-2 transition-all hover:bg-secondary hover:text-white"
                      onClick={() => {
                        if (!user?.token) {
                          setActiveSignInWithOtp(true);
                          localStorage.setItem("Lead-Page", "Digital Card");
                        } else {
                          handleOpenProfileModal();
                        }
                      }}
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
                <div className="absolute flex items-start  right-[2rem] w-[50%]">
                  {/* <Image
                    src={carouselImages[selectedIdx].backimg}
                    alt="qrbackimg"
                    width={800}
                    height={500}
                    className="max-w-[250px]  digital_logo relative left-[5rem]" /> */}
                  <Image
                    src={carouselImages[selectedIdx].src}
                    alt={carouselImages[selectedIdx].alt}
                    width={450}
                    height={350}
                    className="rounded-3x max-w-[600px] relative z-10  digital_img"
                  />

                </div>
                <div className="absolute top-[-70px] right-[-40px]">
                  <Image
                    src={MoneyBack}
                    alt="dsfds"
                    width={400}
                    height={300}
                    className="max-w-[191px] "
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* fourth component */}

      {/* <div className="relative ">
        <Image
          src={Frame4}
          width={3000}
          height={500}
          alt=""
          className="w-full"
        />
        <div className="absolute w-full h-[88%] bottom-0">
          <div className="text-center">
            <h4 className="font-medium text-[24px]">
              Backed By VIP Number Shop
            </h4>
            <h2 className="font-extrabold text-[52px] text-primary leading-none">
              Smart Business Cards for
              <br /> the Digital Age
            </h2>
            <p className="font-normal text-[24px]">
              Always updated, Change your phone, email, website, or social
              <br /> links anytime, no reprinting needed.
            </p>
            <button
            
              className="bg-primary py-2 px-10 text-white rounded-2xl"
              onClick={() => {
                if (!user?.token) {
                  setActiveSignInWithOtp(true);
                  localStorage.setItem("Lead-Page", "Digital Card");
                } else {
                  handleOpenProfileModal({
                    basePlanId: "digital-365-gold",
                    addOns: { stand: true },
                  });
                }
              }}
            >
              buy Now
            </button>
          </div>
          <div className="absolute bottom-[13%] left-[8%]">
            <Image
              src={qrRight}
              width={400}
              height={300}
              className="max-w-[280px] 2xl:max-w-[383px]"
              alt="digital cards"
            />
          </div>
          <div className="absolute right-[45%] 2xl:right-[43%] bottom-[6%]">
            <Image
              src={qrCenter}
              width={400}
              height={300}
              className=" max-w-[190px] 2xl:max-w-[300px]"
              alt="digital cards"
            />
          </div>
          <div className="absolute right-[12%] bottom-[12%]">
            <Image
              src={qrRight}
              width={400}
              height={300}
              className="max-w-[280px] 2xl:max-w-[383px]"
              alt="digital cards"
            />
          </div>
        </div>
      </div> */}

      {/* <div className="relative">
        <Image
          src={Frame4}
          width={3000}
          height={500}
          alt=""
          className="w-full h-auto object-cover"
        />
        <div className="absolute w-full h-[88%] bottom-0 flex flex-col items-center justify-center text-center px-4">
          <div className="text-center">
            <h4 className="font-medium text-[18px] sm:text-[20px] md:text-[24px]">
              Backed By VIP Number Shop
            </h4>
            <h2 className="font-extrabold text-[28px] sm:text-[40px] md:text-[52px] text-primary leading-tight">
              Smart Business Cards for
              <br className="hidden sm:block" /> the Digital Age
            </h2>
            <p className="font-normal text-[16px] sm:text-[18px] md:text-[24px]">
              Always updated, Change your phone, email, website, or social
              <br className="hidden md:block" /> links anytime, no reprinting needed.
            </p>
            <button
              className="bg-primary py-2 px-6 sm:px-8 md:px-10 text-white rounded-2xl text-[16px] sm:text-[18px] mt-3"
              onClick={() => {
                if (!user?.token) {
                  setActiveSignInWithOtp(true);
                  localStorage.setItem("Lead-Page", "Digital Card");
                } else {
                  handleOpenProfileModal();
                }
              }}
            >
              buy Now
            </button>
          </div>

          <div className="absolute bottom-[10%] left-[5%] sm:left-[8%] hidden sm:block">
            <Image
              src={qrRight}
              width={400}
              height={300}
              className="max-w-[150px] sm:max-w-[220px] md:max-w-[280px] 2xl:max-w-[383px]"
              alt="digital cards"
            />
          </div>

          <div className="absolute right-[50%] translate-x-[50%] bottom-[6%]">
            <Image
              src={qrCenter}
              width={400}
              height={300}
              className="max-w-[130px] sm:max-w-[190px] md:max-w-[250px] 2xl:max-w-[300px]"
              alt="digital cards"
            />
          </div>

          <div className="absolute right-[5%] sm:right-[12%] bottom-[10%] hidden sm:block">
            <Image
              src={qrRight}
              width={400}
              height={300}
              className="max-w-[150px] sm:max-w-[220px] md:max-w-[280px] 2xl:max-w-[383px]"
              alt="digital cards"
            />
          </div>
        </div>
      </div> */}

      {/* fifth screen */}

      {/* <div className="">
        <div className=" ">
          <div className="text-center my-20">
            <h3 className="font-bold text-[52px]">
              Go contactless in{" "}
              <span className="text-primary">3 easy steps!</span>
            </h3>
            <p className="font-normal text-[20px]">
              Presenting the NFC Smart Card: Tailored designs, premium print and
              materials, with a complimentary
              <br /> two-year replacement assurance.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-5 justify-center pb-12">
            <div className="max-w-[523px] h-full bg-white rounded-[60px] border-2 border-primary ">
              <div className="bg-primary p-7 rounded-tl-[52px] rounded-tr-[52px]">
                <Image
                  src={qrCenter}
                  width={500}
                  height={300}
                  className="max-w-[200px] 2xl:max-w-[300px] m-auto"
                  alt="nft smart cards"
                />
              </div>
              <div className=" p-10">
                <div className="min-h-[108px] flex items-center justify-around">
                  <h4 className="font-semibold 2xl:text-[28px] text-primary leading-9 pr-[50px]  border-r-[3px] border-primary">
                    Digital Visiting Card +QR NFC Standee
                  </h4>
                  <h3 className="ps-3 font-semibold leading-8">
                    <span className="text-2xl 2xl:text-[37px] text-primary">
                      +999/-
                    </span>
                    <br />{" "}
                    <span className="text-[30px] text-secondary">1300/-</span>
                  </h3>
                </div>
                <button
                  className="bg-primary w-[90%] flex m-auto p-2 justify-center mt-6 rounded-[50px] text-white"
                  onClick={() => {
                    if (!user?.token) {
                      setActiveSignInWithOtp(true);
                      localStorage.setItem("Lead-Page", "Digital Card");
                    } else {
                  handleOpenProfileModal({
                    basePlanId: "digital-365-gold",
                    addOns: { smart: true, stand: true },
                  });
                    }
                  }}
                >
                  Buy Now
                </button>
              </div>
            </div>
            <div className="max-w-[523px] h-full bg-white rounded-[60px] border-2 border-primary ">
              <div className="bg-primary p-7 rounded-tl-[52px] rounded-tr-[52px]">
                <Image
                  src={qrCenter}
                  width={500}
                  height={300}
                  className="max-w-[200px] 2xl:max-w-[300px] m-auto"
                  alt="nft smart cards"
                />
              </div>
              <div className=" p-10">
                <div className="min-h-[108px] flex items-center justify-around">
                  <h4 className="font-semibold 2xl:text-[28px] text-primary leading-9 pr-[50px]  border-r-[3px] border-primary">
                    Digital Visiting Card + Smart Visiting Card +<br /> QR NFC
                    Standee
                  </h4>
                  <h3 className="ps-3 font-semibold leading-8">
                    <span className="text-2xl 2xl:text-[37px] text-primary">
                      +999/-
                    </span>
                    <br />{" "}
                    <span className="text-[30px] text-secondary">1300/-</span>
                  </h3>
                </div>
                <button
                  className="bg-primary w-[90%] flex m-auto p-2 justify-center mt-6 rounded-[50px] text-white"
                  onClick={() => {
                    if (!user?.token) {
                      setActiveSignInWithOtp(true);
                      localStorage.setItem("Lead-Page", "Digital Card");
                    } else {
                      handleOpenProfileModal({
                        basePlanId: "digital-365-gold",
                        addOns: { smart: true },
                      });
                    }
                  }}
                >
                  Buy Now
                </button>
              </div>
            </div>
            <div className="max-w-[523px] h-full bg-white rounded-[60px] border-2 border-primary ">
              <div className="bg-primary p-7 rounded-tl-[52px] rounded-tr-[52px]">
                <Image
                  src={qrCenter}
                  width={500}
                  height={300}
                  className="max-w-[200px] 2xl:max-w-[300px] m-auto"
                  alt="nft smart cards"
                />
              </div>
              <div className=" p-10">
                <div className="min-h-[108px] flex items-center justify-around">
                  <h4 className="font-semibold 2xl:text-[28px] text-primary leading-9 pr-[50px]  border-r-[3px] border-primary">
                    Digital Visiting Card + Smart Visiting Card
                  </h4>
                  <h3 className="ps-3 font-semibold leading-8">
                    <span className="text-2xl 2xl:text-[37px] text-primary">
                      +999/-
                    </span>
                    <br />{" "}
                    <span className="text-[30px] text-secondary">1300/-</span>
                  </h3>
                </div>
                <button
                  className="bg-primary w-[90%] flex m-auto p-2 justify-center mt-6 rounded-[50px] text-white"
                  onClick={() => {
                    if (!user?.token) {
                      setActiveSignInWithOtp(true);
                      localStorage.setItem("Lead-Page", "Digital Card");
                    } else {
                      handleOpenProfileModal({ basePlanId: "digital-365-silver" });
                    }
                  }}
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* Six screen */}

      {/* <div className="top-0">
        <div className="flex justify-around items-center py-20">
          <div>
            <h3 className="font-bold text-[52px] leading-[3.5rem]">
              Benefits of <br />
              <span className="text-primary">Smart Cards</span>
            </h3>
          </div>
          <p>
            Smart Cards transform the way professionals connect by offering a{" "}
            <br /> modern, eco-friendly, and versatile solution making
            networking smarter,
            <br /> faster, and more sustainable than traditional paper cards.
          </p>
        </div>
      </div> */}

      {/* seven screen */}

      {/* <div className="relative">
        <Image
          src={circleline}
          alt="circle line"
          width={3000}
          height={1000}
          className="w-full h-full"
        />
        <div className="absolute top-[3%] flex justify-center w-full">
          <div className="flex max-w-[1500px] justify-between w-full m-auto items-center cursor-pointer z-10">
            <Image
              src={whatsapp}
              alt="social link"
              width={1000}
              height={500}
              className="w-[85px] relative top-[10rem] animate-bounce [animation-delay:0s]"
            />
            <Image
              src={instagram}
              alt="social link"
              width={1000}
              height={500}
              className="w-[85px] relative top-[-1rem] animate-bounce [animation-delay:0.5s]"
            />
            <div className="relative bottom-[6rem] left-0 rounded-full bg-white z-10 w-[60px] flex justify-center p-2">
              <Image
                src={spinner}
                alt="social link"
                width={1000}
                height={500}
                className="w-[50px] "
              />
            </div>
            <div className="absolute w-[372px] bg-secondary rounded-3xl p-[36px] text-center left-[41rem] top-[-3rem]">
              <h3 className="text-primary font-bold text-[29px]">
                Always Updatable
              </h3>
              <p className="font-normal text-[17px]">
                Update your information anytime without reprinting. Keep your
                card accurate and relevant as your career or business grows.
              </p>
            </div>
            <Image
              src={Youtube}
              alt="social link"
              width={1000}
              height={500}
              className="w-[85px] relative left-[4rem] animate-bounce [animation-delay:0.5s]"
            />
            <Image
              src={facebook}
              alt="social link"
              width={1000}
              height={500}
              className="w-[85px] relative top-[8rem] right-[3rem] animate-bounce [animation-delay:0s]"
            />
          </div>
        </div>
        <div className="absolute top-[18%] flex justify-center w-full">
          <div className="flex justify-between w-full m-auto items-center">
            <div className="grid grid-cols-2 w-full">
              <div className="">
                <div className="m-auto w-max">
                  <div className="relative top-[2rem] left-[9rem] rounded-full bg-white z-10 w-[60px] flex justify-center p-2">
                    <Image
                      src={ecoFriendly}
                      alt="social link"
                      width={1000}
                      height={500}
                      className="w-[50px] "
                    />
                  </div>
                  <div className="w-[372px] bg-primary rounded-3xl p-[36px] text-center left-[26rem] top-[10rem]">
                    <h3 className="text-white font-bold text-[29px]">
                      Eco-Friendly
                    </h3>
                    <p className="font-normal text-[17px] text-white">
                      Ditch the paper clutter and go green with a reusable card
                      that reduces waste while reflecting your commitment to
                      sustainability.
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <div className="m-auto w-max">
                  <div className="relative top-[2rem] left-[9rem] rounded-full bg-white z-10 w-[60px] flex justify-center p-2">
                    <Image
                      src={forward}
                      alt="social link"
                      width={1000}
                      height={500}
                      className="w-[45px] "
                    />
                  </div>
                  <div className="w-[372px] bg-primary rounded-3xl p-[36px] text-center">
                    <h3 className="text-white font-bold text-[29px]">
                      Easy Sharing
                    </h3>
                    <p className="font-normal text-[17px] text-white">
                      Instantly share your details via WhatsApp, Email, SMS, QR
                      code, or NFC tap, no apps required, just effortless
                      connectivity.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute w-full flex justify-center bottom-[20%] right-4">
          <Image
            src={yourLogo}
            alt="your logo"
            width={1000}
            height={500}
            className="max-w-[590px]"
          />
        </div>
      </div> */}

      {/* eight screen */}

      {/* <div className="relative">
        <Image
          src={lastbackground}
          alt="vip number shop"
          width={1000}
          height={500}
          className="absolute top-[-2rem]"
        />
        <section className="relative bg-secondary py-24 px-6 text-center overflow-hidden opacity-[0.9] top-[-3rem]">
          <div className="absolute inset-0 bg-secondary/80 backdrop-blur-sm"></div>
          <div className="relative max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-5xl font-extrabold text-indigo-800 mb-6 leading-tight">
              Ready to Start Something Amazing with <br />
              <span className="text-indigo-800">VIP Number Shop? Let’s Talk!</span>
            </h1>
            <p className="text-gray-800 text-base md:text-lg mb-10">
              At VIP Number Shop, we help you stand out with smart solutions and
              creative strategies. From digital cards to premium designs, let’s
              collaborate, innovate, and make your vision a reality.
            </p>
            <button className="bg-indigo-700 hover:bg-indigo-800 text-white font-semibold py-3 px-8 rounded-full shadow-md transition-transform transform hover:-translate-y-1">
              Lorem Ipsum
            </button>
          </div>
        </section>
      </div>  */}
      {/* Modal Section */}
      {isProfileModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={closeProfileModal}
          ></div>
          <div className="relative bg-white w-full max-w-[560px] rounded-3xl shadow-xl mx-4">
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h3 className="text-[20px] font-semibold">Complete Your Details</h3>
              <button
                className="text-gray-600 hover:text-black text-[20px]"
                aria-label="Close"
                onClick={closeProfileModal}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="px-6 py-5">
              <div className="grid grid-cols-1 gap-4">
                <div className="relative">
                  <label
                    htmlFor="name"
                    className="text-primary font-medium -top-3 left-3 bg-white px-2 mb-1 absolute text-[12px]"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 ${errors.name
                      ? "border-red-400 focus:ring-red-300"
                      : "border-gray-300 focus:ring-primary"
                      }`}
                    placeholder="Enter your full name"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <label
                      htmlFor="mobile"
                      className="text-primary font-medium -top-3 left-3 bg-white px-2 mb-1 absolute text-[12px]"
                    >
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      id="mobile"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      className={`w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 ${errors.mobile
                        ? "border-red-400 focus:ring-red-300"
                        : "border-gray-300 focus:ring-primary"
                        }`}
                      placeholder="10-digit mobile"
                      maxLength={10}
                      disabled={formData.mobile.length === 10}
                    />
                    {errors.mobile && (
                      <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>
                    )}
                  </div>

                  <div className="relative">
                    <label
                      htmlFor="email"
                      className="text-primary font-medium -top-3 left-3 bg-white px-2 mb-1 absolute text-[12px]"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 ${errors.email
                        ? "border-red-400 focus:ring-red-300"
                        : "border-gray-300 focus:ring-primary"
                        }`}
                      placeholder="you@example.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <label
                      htmlFor="pincode"
                      className="text-primary font-medium -top-3 left-3 bg-white px-2 mb-1 absolute text-[12px]"
                    >
                      Pincode
                    </label>
                    <input
                      type="tel"
                      id="pincode"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      className={`w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 ${errors.pincode
                        ? "border-red-400 focus:ring-red-300"
                        : "border-gray-300 focus:ring-primary"
                        }`}
                      placeholder="6-digit pincode"
                      maxLength={6}
                    />
                    {errors.pincode && (
                      <p className="text-red-500 text-sm mt-1">{errors.pincode}</p>
                    )}
                  </div>

                  <div className="relative">
                    <label
                      htmlFor="city"
                      className="text-primary font-medium -top-3 left-3 bg-white px-2 mb-1 absolute text-[12px]"
                    >
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className={`w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 ${errors.city
                        ? "border-red-400 focus:ring-red-300"
                        : "border-gray-300 focus:ring-primary"
                        }`}
                      placeholder="Enter city"
                    />
                    {errors.city && (
                      <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                    )}
                  </div>
                </div>

                <div className="relative">
                  <label
                    htmlFor="address"
                    className="text-primary font-medium -top-3 left-3 bg-white px-2 mb-1 absolute text-[12px]"
                  >
                    Address
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className={`w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 ${errors.address
                      ? "border-red-400 focus:ring-red-300"
                      : "border-gray-300 focus:ring-primary"
                      }`}
                    placeholder="House no, street, area"
                    rows={3}
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-6">
                <button
                  type="button"
                  className="px-5 py-2.5 rounded-xl border border-gray-300"
                  onClick={closeProfileModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-primary text-white hover:opacity-90"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DigitalVisitingCard;
