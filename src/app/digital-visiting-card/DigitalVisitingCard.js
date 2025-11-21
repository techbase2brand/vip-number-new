"use client";
import React, { useContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import MoneyBack from "../../../public/digital-card-new/moneyback.webp";
import Moneybacknew from "../../../public/digital-card-new/Moneybacknew.webp";
import { FaStar } from "react-icons/fa";
import Image from "next/image";
import { HiChevronUp, HiChevronDown } from "react-icons/hi2";
import Powerdby from "../../../public/digital-card-new/powered.webp";
import qrRight from "../../../public/digital-card-new/qrRight.webp";
import qrbackimg from "../../../public/digital-card-new/qrbackimg.webp";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { getProfile } from "../Services/Services";
import { AppStateContext } from "../contexts/AppStateContext/AppStateContext";
import { MyRegisterSignInContext } from "../contexts/MyRegisterSignInContext/MyRegisterSignInContext";
import card1 from "../../../public/digital-card-new/Infowithscanner.webp";
import allInOne from "../../../public/digital-card-new/allInOne.webp";
import digitalSmart from "../../../public/digital-card-new/digital-smart-visting.webp";
import goldbatch from "../../../public/digital-card-new/goldbatch.webp";
import silverbatch from "../../../public/digital-card-new/Silverbatch.webp";
import "./digital.css";
import { useDigitalCardPlan } from "./PlanContext";
import { ALL_IN_ONE_ADD_ON_AMOUNT } from "./planOptions";
import { RiExchangeDollarLine } from "react-icons/ri";
import { BsQuestionCircleFill } from "react-icons/bs";
import { TbCreditCardPay } from "react-icons/tb";
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
    alt: "Digital Visiting Card",
    title: "Digital Visiting Card",
    desc: "digital visiting card branding",
  },
  {
    src: digitalSmart,
    alt: "Digital Visiting Card + Smart Visiting Card",
    title: "Digital Visiting Card + Smart Visiting Card",
    desc: "Includes standee, NFC card, & digital business profile access.",
  },
  {
    id: 2,
    src: card1,
    backimg: qrbackimg,
    alt: "Digital Visiting Card + QR NFC Standee",
    title: "Digital Visiting Card + QR NFC Standee",
    desc: "Payments for QR Standee are non-refundable.\nNo Question Ask! 14-Day Money Back Guarantee for Digital Visiting Card",
  },
  {
    src: allInOne,
    backimg: qrbackimg,
    alt: "Premium NFC Card Only",
    title: "Digital Visiting Card + Smart Visiting Card + QR NFC Standee",
    desc: "Fast contact sharing, tap-to-save experience, custom branding available!",
  },
];

const DigitalVisitingCard = () => {
  const panelImg = process.env.NEXT_PUBLIC_IMAGES;
  const { userProfile, user, setNameUpdate } = useContext(AppStateContext);
  const { setActiveSignInWithOtp } = useContext(MyRegisterSignInContext);
  const Router = useRouter();
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [carouselWindowStart, setCarouselIdx] = useState(0);
  const [isImageClick, setIsImageClick] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    pincode: "",
    city: "",
    state: "",
    address: "",
  });
  const [errors, setErrors] = useState({});
  const [cities, setCities] = useState([]);
  const [isLoadingCities, setIsLoadingCities] = useState(false);
  const [isRazorpayReady, setIsRazorpayReady] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    resetPlanSelections,
  } = useDigitalCardPlan();
  const activePlanRef = React.useRef(checkoutPlan);
  const hasOpenedModalAfterLogin = useRef(false);
  const basePlan = checkoutPlan?.basePlan;
  const addOnTotal = checkoutPlan
    ? checkoutPlan.totalAmount - (checkoutPlan.basePlan?.amount ?? 0)
    : 0;

  // Map carousel images to plan configurations
  const getPlanConfigForImage = (imageIndex) => {
    switch (imageIndex) {
      case 0: // "Digital Visiting Card" - Just digital card, no add-ons
        return {
          basePlanId: basePlanId, // Default to Gold plan
          addOns: { smart: false, stand: false },
        };
      case 1: // "Digital Visiting Card + Smart Visiting Card" - Digital + Smart only
        return {
          basePlanId: basePlanId,
          addOns: { smart: true, stand: false },
        };
      case 2: // "Digital Visiting Card + QR NFC Standee" - Digital card + stand
        return {
          basePlanId: basePlanId,
          addOns: { smart: false, stand: true },
        };
      case 3: // "Digital Visiting Card + Smart Visiting Card + QR NFC Standee" - All-in-One
        return {
          basePlanId: basePlanId,
          addOns: { smart: true, stand: true },
        };
      default:
        return {
          basePlanId: basePlanId,
          addOns: { smart: false, stand: false },
        };
    }
  };

  // Find image index based on plan configuration
  const getImageIndexForPlan = (planId, addOns) => {
    const hasSmart = !!addOns?.smart;
    const hasStand = !!addOns?.stand;

    // Match based on add-ons (basePlanId is same for all, so we match by add-ons)
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
    const isGold365 = basePlanId === "digital-365-gold";
    const hasStand = imageIndex === 2 || imageIndex === 3; // QR NFC Standee cases

    // Get guarantee message based on plan and add-ons
    const getGuaranteeMessage = () => {
      // if (hasStand) {
      //   return "14-Day Money Back Guarantee for Digital Visiting Card";
      // }
      // Only show "No Questions Ask" for Gold 365 days plan
      if (isGold365) {
        return "14-Day Money-Back Guarantee - No Questions Ask";
      }
      return null; // Don't show guarantee for other plans
    };

    switch (imageIndex) {
      case 0: // Digital Visiting Card only
        return {
          features: [
            {
              icon: "TbCreditCardPay",
              iconSize: 24,
              text: "Share Your Socials Instantly – All in One Digital Visiting card",
            },
          ],
          guarantee: getGuaranteeMessage(),
          offers: [
            "You can Renew your plan for next 365 days package just ₹499",
            // isGold
            //   ? "Removed Branding (Powerd by Vip Number shop)"
            //   : "Added Branding (Powerd by Vip Number shop)",
          ],
        };
      case 1: // Digital Visiting Card + Smart Visiting Card
        return {
          features: [
            {
              icon: "TbCreditCardPay",
              iconSize: 24,
              text: "Share Your Socials Instantly – All in One Digital Visiting card",
            },
          ],
          guarantee: getGuaranteeMessage(),
          offers: [
            "You can Renew your plan for next 365 days package just ₹499",
            // isGold
            //   ? "Removed Branding (Powerd by Vip Number shop)"
            //   : "Added Branding (Powerd by Vip Number shop)",
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
              text: "14-Day Money-Back Guarantee - No Questions Ask",
            },
          ],
          guarantee: getGuaranteeMessage(),
          offers: [
            "You can Renew your plan for next 365 days package just ₹499",
            // isGold
            //   ? "Removed Branding (Powerd by Vip Number shop)"
            //   : "Added Branding (Powerd by Vip Number shop)",
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
              text: "14-Day Money-Back Guarantee - No Questions Ask",
            },
          ],
          guarantee: getGuaranteeMessage(),
          offers: [
            "Renew your Digital Visiting Card plan and get the 365-day package just ₹499",
            // isGold
            //   ? "Remove Tagline (Powerd by Vip Number shop)"
            //   : "Tagline not Remove (Powerd by Vip Number shop)",
          ],
        };
      default:
        return {
          features: [],
          guarantee: getGuaranteeMessage(),
          offers: [
            "You can Renew your plan for next 365 days package just ₹499",
            // isGold
            //   ? "Removed Branding (Powerd by Vip Number shop)"
            //   : "Added Branding (Powerd by Vip Number shop)",
          ],
        };
    }
  };

  // Render icon component based on icon name
  const renderIcon = (iconName, size) => {
    const iconProps = {
      fontSize: size,
      className: "text-secondary mr-1",
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
    setSelectedIdx(imageIndex);

    // Auto-scroll carousel to show selected image
    const visibleStart = carouselWindowStart;
    const visibleEnd = carouselWindowStart + 2; // Shows 3 images (0, 1, 2)

    if (imageIndex < visibleStart) {
      // Image is above visible window, scroll up
      setCarouselIdx(imageIndex);
    } else if (imageIndex > visibleEnd) {
      // Image is below visible window, scroll down
      setCarouselIdx(Math.max(0, imageIndex - 2)); // Show selected image in middle or bottom
    }

    const planConfig = getPlanConfigForImage(imageIndex);
    resetPlanSelections(planConfig);
    // Reset flag after a short delay to allow plan update to complete
    setTimeout(() => setIsImageClick(false), 100);
  };

  const handleOpenProfileModal = (config) => {
    startProfileFlow(config);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePincodeChange = async (e) => {
    const pincode = e.target.value.replace(/\D/g, ""); // Only numbers
    setFormData((prev) => ({ ...prev, pincode }));

    if (pincode.length === 6) {
      setIsLoadingCities(true);
      try {
        const response = await axios.get(
          `https://api.postalpincode.in/pincode/${pincode}`
        );
        if (response.data && response.data[0]?.Status === "Success") {
          const { PostOffice } = response.data[0];
          if (PostOffice && PostOffice.length > 0) {
            const cityNames = PostOffice.map((office) => office.Name);
            const state = PostOffice[0].State || "";
            const district = PostOffice[0].District || "";

            setCities(cityNames);
            setFormData((prev) => ({
              ...prev,
              city: cityNames[0] || "", // Auto-select first city
              state: state,
            }));
          }
        } else {
          setCities([]);
          setFormData((prev) => ({ ...prev, city: "", state: "" }));
        }
      } catch (error) {
        console.error("Error fetching pincode details:", error);
        setCities([]);
        setFormData((prev) => ({ ...prev, city: "", state: "" }));
      } finally {
        setIsLoadingCities(false);
      }
    } else {
      setCities([]);
      if (pincode.length < 6) {
        setFormData((prev) => ({ ...prev, city: "", state: "" }));
      }
    }
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
            state: address?.state || "",
            address: address?.address || "",
          }));
        })
        .catch((error) => {
          console.error("Failed to prefill profile data:", error);
        });
    }
  }, [user]);

  // Auto-open profile modal after login if user came from Digital Card page
  useEffect(() => {
    // Reset ref when user logs out
    if (!user?.token) {
      hasOpenedModalAfterLogin.current = false;
      return;
    }

    if (user?.token && !hasOpenedModalAfterLogin.current) {
      const leadPage = localStorage.getItem("Lead-Page");
      if (leadPage === "Digital Card") {
        hasOpenedModalAfterLogin.current = true;
        // Small delay to ensure login popup is closed
        setTimeout(() => {
          // Get current plan config based on selected image
          const currentPlanConfig = getPlanConfigForImage(selectedIdx);
          startProfileFlow(currentPlanConfig);
          localStorage.removeItem("Lead-Page");
        }, 300);
      }
    }
  }, [user?.token, selectedIdx, startProfileFlow]);

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
      toast.error(
        "Payment gateway failed to load. Please refresh and try again."
      );
    document.body.appendChild(script);

    return () => {
      script.onload = null;
      script.onerror = null;
    };
  }, []);
  useEffect(() => {
    activePlanRef.current = checkoutPlan;
  }, [checkoutPlan]);

  // Set initial plan based on selected image when component mounts
  useEffect(() => {
    const planConfig = getPlanConfigForImage(selectedIdx);
    resetPlanSelections(planConfig);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run on mount - resetPlanSelections is stable from context

  // Update image when plan changes (but not when change comes from image click)
  useEffect(() => {
    if (!isImageClick) {
      const matchingImageIndex = getImageIndexForPlan(
        basePlanId,
        selectedAddOns
      );
      if (matchingImageIndex !== selectedIdx) {
        setSelectedIdx(matchingImageIndex);

        // Auto-scroll carousel to show selected image
        const visibleStart = carouselWindowStart;
        const visibleEnd = carouselWindowStart + 2; // Shows 3 images (0, 1, 2)

        if (matchingImageIndex < visibleStart) {
          // Image is above visible window, scroll up
          setCarouselIdx(matchingImageIndex);
        } else if (matchingImageIndex > visibleEnd) {
          // Image is below visible window, scroll down
          setCarouselIdx(Math.max(0, matchingImageIndex - 2)); // Show selected image in middle or bottom
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [basePlanId, selectedAddOns]); // Watch for plan changes
  const PAYMENT_API_URL = "/api/web/razorpay/digital_card/payment";

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

            // Save full plan details to localStorage for thank-you page
            const planDetails = {
              orderId: orderId || "",
              amount: String(planAmount || ""),
              planLabel,
              addOns: planAddOns,
              planId: basePlanId,
              basePlan: planSnapshot?.basePlan || null,
              hasSmart: planSnapshot?.hasSmart || false,
              hasStand: planSnapshot?.hasStand || false,
              totalAmount: planSnapshot?.totalAmount || planAmount || 0,
              addOnLabelParts: planSnapshot?.addOnLabelParts || [],
              timestamp: new Date().toISOString(),
            };
            localStorage.setItem(
              "digitalCardPaymentDetails",
              JSON.stringify(planDetails)
            );

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
    if (isSubmitting) return;
    if (!validate()) return;
    if (!checkoutPlan) {
      toast.error("Please select a plan before continuing.");
      return;
    }
    // Submit or next step logic can go here
    try {
      setIsSubmitting(true);
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
          state: formData.state || "",
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
          state: formData.state || "",
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
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-5 container-os">
      {isPlanModalOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 overflow-y-auto">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => {
              if (!isProcessingPayment) {
                closePlanModal();
              }
            }}
          ></div>
          <div className="relative bg-white w-full max-w-[560px] rounded-3xl shadow-2xl my-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b sticky top-0 bg-white z-10 rounded-t-3xl">
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
            <div className="px-6 py-5 flex flex-col gap-4  max-h-[85vh] overflow-auto">
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">
                  Digital Visiting Card Plan
                </label>
                {basePlanId &&
                  basePlans &&
                  (() => {
                    const selectedPlan = basePlans.find(
                      (plan) => plan.id === basePlanId
                    );
                    const isGold = selectedPlan?.type?.toLowerCase() === "gold";
                    return (
                      <div className="mb-3 flex flex-col items-center gap-2">
                        <div className="flex items-center gap-2 w-full justify-between">
                          <Image
                            src={Powerdby}
                            alt="Powered by"
                            width={3000}
                            height={1000}
                            className="object-contain max-w-[200px] h-auto"
                          />
                          {isGold && (
                            <Image
                              src={Moneybacknew}
                              alt="Money Back Guarantee"
                              width={200}
                              height={100}
                              className="object-contain max-w-[80px] h-auto"
                            />
                          )}
                        </div>
                        <span className="text-red-600 text-base font-semibold">
                          {isGold
                            ? "Gold Pack | Removed Branding"
                            : "Silver Pack | Added Branding"}
                          <span className="text-primary text-base font-semibold">
                            {" "}
                            Powerd by
                          </span>{" "}
                          <span className="text-black text-base font-semibold">
                            VIP Number shop
                          </span>
                        </span>
                      </div>
                    );
                  })()}
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
                {/* Guarantee Highlight Section */}
                {getContentForImage(selectedIdx).guarantee && (
                  <div className="flex items-center gap-2 bg-secondary/20 border border-secondary/50 rounded-xl px-4 py-3 mt-3">
                    {renderIcon("RiExchangeDollarLine", 24)}
                    <span className="text-primary text-[16px] font-semibold">
                      {getContentForImage(selectedIdx).guarantee}
                    </span>
                  </div>
                )}
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
                        className="mt-[3px] w-5 h-5 cursor-pointer rounded accent-secondary"
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
                <h4 className="text-sm font-semibold text-primary mb-3">
                  Order Summary
                </h4>
                {checkoutPlan ? (
                  <div className="space-y-2">
                    {/* Base Plan */}
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-800">
                        {checkoutPlan.basePlan?.label}
                      </span>
                      <span className="text-sm font-semibold text-gray-800">
                        ₹{checkoutPlan.basePlan?.amount ?? 0}
                      </span>
                    </div>

                    {/* Add-ons Breakdown */}
                    {(() => {
                      const smartAmount =
                        addOnOptions?.find((opt) => opt.id === "smart")
                          ?.amount ?? 499;
                      const standAmount =
                        addOnOptions?.find((opt) => opt.id === "stand")
                          ?.amount ?? 999;
                      const addOnTotal =
                        checkoutPlan.totalAmount -
                        (checkoutPlan.basePlan?.amount ?? 0);

                      if (checkoutPlan.hasSmart && checkoutPlan.hasStand) {
                        // Both selected - show bundle
                        return (
                          <>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-800">
                                Smart Visiting Card
                              </span>
                              <span className="text-sm text-gray-500 line-through">
                                +₹{smartAmount}
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-800">
                                QR NFC Stand
                              </span>
                              <span className="text-sm text-gray-500 line-through">
                                +₹{standAmount}
                              </span>
                            </div>
                            <div className="flex justify-between items-center bg-primary/5 -mx-2 px-2 py-1 rounded">
                              <span className="text-sm font-semibold text-gray-800">
                                Smart Visiting Card + QR NFC Stand (Bundle)
                              </span>
                              <span className="text-sm font-semibold text-primary">
                                +₹{addOnTotal}
                              </span>
                            </div>
                            <div className="text-xs text-gray-600 italic mt-1">
                              * You save ₹
                              {smartAmount + standAmount - addOnTotal} with
                              bundle offer
                            </div>
                          </>
                        );
                      } else {
                        // Individual add-ons
                        return (
                          <>
                            {checkoutPlan.hasSmart && (
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-800">
                                  Smart Visiting Card
                                </span>
                                <span className="text-sm font-semibold text-gray-800">
                                  +₹{smartAmount}
                                </span>
                              </div>
                            )}
                            {checkoutPlan.hasStand && (
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-800">
                                  QR NFC Stand
                                </span>
                                <span className="text-sm font-semibold text-gray-800">
                                  +₹{standAmount}
                                </span>
                              </div>
                            )}
                          </>
                        );
                      }
                    })()}

                    {/* Divider */}
                    {(checkoutPlan.hasSmart || checkoutPlan.hasStand) && (
                      <div className="border-t border-primary/20 my-2"></div>
                    )}

                    {/* Total */}
                    <div className="flex justify-between items-center pt-1">
                      <span className="text-sm font-semibold text-gray-700">
                        Total Payable
                      </span>
                      <span className="text-2xl font-bold text-primary">
                        ₹{checkoutPlan.totalAmount ?? 0}
                      </span>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-gray-800">
                    Select a plan to continue
                  </p>
                )}
              </div>

              <div className="flex justify-end gap-3 pt-1">
                {/* <button
                  type="button"
                  className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700"
                  onClick={() => {
                    if (!isProcessingPayment) {
                      closePlanModal();
                    }
                  }}
                  disabled={isProcessingPayment || !checkoutPlan}
                >
                  Cancel
                </button> */}
                <button
                  type="button"
                  className="px-6 py-2.5 rounded-xl bg-primary text-white font-semibold hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  onClick={handleRzpClick}
                  disabled={isProcessingPayment || !checkoutPlan}
                >
                  {isProcessingPayment && (
                    <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  )}
                  {isProcessingPayment ? "Preparing..." : "Proceed to Pay"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="hidden lg:block">
        {/* third Component */}
        <div className="w-full my-16 flex justify-center">
          <div className="flex gap-10 w-full">
            {/* Carousel Thumbnails (Left) */}
            <div className="flex flex-col items-center min-w-[267px] relative">
              {/* Top button - only show if there are images above */}
              {carouselWindowStart > 0 && (
                <button
                  className="flex items-center justify-center rounded-full bg-[#9077c9] min-w-[100px] h-[60px] mb-3 text-3xl shadow-md transition hover:bg-primary opacity-100"
                  onClick={() =>
                    setCarouselIdx((idx) => (idx > 0 ? idx - 1 : idx))
                  }
                  aria-label="Scroll to top images"
                >
                  <HiChevronUp className="text-[black]" size={34} />
                </button>
              )}
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
                      className={`p-[2px] rounded-[56px] border-[5px] ${
                        selectedIdx === idx + carouselWindowStart
                          ? "border-secondary"
                          : "border-transparent"
                      } cursor-pointer bg-primary`}
                      onClick={() =>
                        handleImageClick(idx + carouselWindowStart)
                      }
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
              {/* Bottom button - only show if there are images below, with highlight */}
              {carouselWindowStart < carouselImages.length - 3 && (
                <button
                  className="flex items-center justify-center rounded-full bg-[#9077c9] min-w-[100px] h-[60px] mt-3 text-3xl shadow-md transition hover:bg-primary opacity-100  "
                  onClick={() =>
                    setCarouselIdx((idx) =>
                      idx < carouselImages.length - 3 ? idx + 1 : idx
                    )
                  }
                  aria-label="Scroll to bottom images"
                >
                  <HiChevronDown className="text-black" size={34} />
                </button>
              )}
            </div>

            {/* Main Image + Details (Right) */}
            <div className="flex-1 flex items-center">
              <div
                className="relative w-full max-h-[1020px] drop-shadow-xl bg-[#5B448A] flex justify-start items-center rounded-[56px] p-[25px]"
                // style={{
                //   backgroundImage: `url(${carouselImages[selectedIdx].src})`,
                // }}
              >
                <div className=" flex-1 flex flex-col gap-1 ps-14 py-10 left-0 top-3 max-w-[572px] min-w-[340px] z-10">
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
                  {getContentForImage(selectedIdx).features.map(
                    (feature, idx) => (
                      <div key={idx} className="flex items-center mb-1 gap-2">
                        {renderIcon(feature.icon, feature.iconSize)}
                        <h4 className="text-white font-normal text-[18px]">
                          {feature?.text?.includes("\n")
                            ? feature?.text?.split("\n").map((line, i) => (
                                <span key={i}>
                                  {line}
                                  {i < feature.text.split("\n").length - 1 && (
                                    <br />
                                  )}
                                </span>
                              ))
                            : feature.text}
                        </h4>
                      </div>
                    )
                  )}
                  {/* <div className="mb-1">
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
                  </div> */}
                  {/* Pricing & Plan Dropdown + offers section */}
                  <div className="flex flex-col gap-3 max-w-xs relative">
                    <label className="text-secondary font-normal -top-3 left-3 bg-primary px-2 mb-1 absolute text-[15px]">
                      Choose a Plan
                    </label>
                    <select
                      className="rounded-lg px-4 py-4 border-2 border-secondary bg-[#5B448A] text-white font-bold focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/50 cursor-pointer appearance-none"
                      style={{ minWidth: 210, maxWidth: 320 }}
                      value={basePlanId}
                      onChange={(e) => setBasePlanId(e.target.value)}
                    >
                      {basePlans?.map((planOption) => (
                        <option
                          key={planOption.id}
                          value={planOption.id}
                          className="bg-[#5B448A] text-white py-2"
                        >
                          {`${planOption.label} — ₹${planOption.amount}`}
                        </option>
                      ))}
                    </select>
                    {/* Guarantee Highlight Section */}
                    {getContentForImage(selectedIdx).guarantee && (
                      <div className="flex items-center gap-2 bg-secondary/20 border border-secondary/50 rounded-xl px-4 py-3">
                        {renderIcon("RiExchangeDollarLine", 24)}
                        <span className="text-secondary text-[16px] font-semibold">
                          {getContentForImage(selectedIdx).guarantee}
                        </span>
                      </div>
                    )}
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
                            className="mt-[3px] w-6 h-6 cursor-pointer rounded accent-secondary"
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
                      {/* <span className="text-[11px] text-[#E2DFF5]">
                        Bundle smart accessories with your digital card to boost
                        offline sharing.
                      </span> */}
                    </div>
                    {/* Offers/Bullet Points */}
                    <div className="flex flex-col gap-2">
                      {getContentForImage(selectedIdx).offers?.map(
                        (offer, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <span className="text-secondary text-[50px] mt-1">
                              •
                            </span>
                            <span className="text-secondary text-[18px] font-semibold leading-relaxed">
                              {offer}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                    <div className="">
                      <span className="text-white font-normal">
                        Total Amount
                      </span>
                      <h2 className="text-[42px] font-extrabold text-white mt-0 leading-tight">
                        ₹{checkoutPlan?.totalAmount ?? "--"}
                        <span className="text-[22px]">/-</span>
                      </h2>
                    </div>
                    <button
                      className="bg-white text-[#5B448A] max-w-[200px] font-bold rounded-full py-3 px-14 text-lg shadow-lg mt-2 transition-all hover:bg-secondary hover:text-black"
                      onClick={() => {
                        if (!user?.token) {
                          setActiveSignInWithOtp(true);
                          localStorage.setItem("Lead-Page", "Digital Card");
                        } else {
                          // Pass current plan config based on selected image
                          const currentPlanConfig =
                            getPlanConfigForImage(selectedIdx);
                          handleOpenProfileModal(currentPlanConfig);
                        }
                      }}
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
                <div className="absolute flex   right-[2rem] w-[50%] h-full justify-center items-center">
                  <Image
                    src={carouselImages[selectedIdx].src}
                    alt={carouselImages[selectedIdx].alt}
                    width={450}
                    height={350}
                    className="rounded-3x w-auto object-contain h-[80%] relative z-10  digital_img"
                  />
                </div>
                {basePlan?.type?.toLowerCase() === "gold" &&
                  getContentForImage(selectedIdx).features.some((feature) =>
                    feature.text.includes(
                      "14-Day Money Back Guarantee for Digital Visiting Card"
                    )
                  ) && (
                    <div className="absolute top-[-70px] right-[-40px]">
                      <Image
                        src={MoneyBack}
                        alt="Money Back Guarantee"
                        width={400}
                        height={300}
                        className="max-w-[191px] "
                      />
                    </div>
                  )}

                <div className="absolute bottom-[20%] left-0 w-full flex justify-center items-end leading-[3rem]">
                  <div className="text-center h-max relative right-[-25%] xl:right-[-10%] 2xl:right-[6%] z-[10]">
                    {/* <p className="text-lg font-semibold text-black bg-secondary px-4 py-1.5 rounded-2xl ">
                      <span className="text-primary">Powerd by</span> VIP Number
                      shop
                    </p> */}
                    <Image
                      src={Powerdby}
                      alt="Powerdby"
                      width={3000}
                      height={1000}
                      className="object-contain max-w-[200px] z-10 bottom-[8rem] left-[15%] w-full rounded-[16px]"
                    />
                    <span className="text-secondary text-base font-semibold mt-3">
                      {basePlan?.type?.toLowerCase() === "gold"
                        ? "Gold Pack | Removed Branding"
                        : "Silver Pack | Added Branding"}
                    </span>
                  </div>
                </div>

                <div className="absolute top-[20%] right-0 w-full flex justify-center items-end ">
                  <Image
                    src={
                      basePlan?.type?.toLowerCase() === "gold"
                        ? goldbatch
                        : silverbatch
                    }
                    alt={
                      basePlan?.type?.toLowerCase() === "gold"
                        ? "goldbatch"
                        : "silverbatch"
                    }
                    width={100}
                    height={100}
                    className="w-auto object-contain max-w-[170px] relative z-10  digital_img bottom-[8rem] left-[15%]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isProfileModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={closeProfileModal}
          ></div>
          <div className="relative bg-white w-full max-w-[560px] rounded-3xl shadow-xl mx-4">
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h3 className="text-[20px] font-semibold">
                Complete Your Details
              </h3>
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
                    className={`w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 ${
                      errors.name
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
                      className={`w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 ${
                        errors.mobile
                          ? "border-red-400 focus:ring-red-300"
                          : "border-gray-300 focus:ring-primary"
                      }`}
                      placeholder="10-digit mobile"
                      maxLength={10}
                      disabled={formData.mobile.length === 10}
                    />
                    {errors.mobile && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.mobile}
                      </p>
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
                      className={`w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 ${
                        errors.email
                          ? "border-red-400 focus:ring-red-300"
                          : "border-gray-300 focus:ring-primary"
                      }`}
                      placeholder="you@example.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email}
                      </p>
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
                      onChange={handlePincodeChange}
                      className={`w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 ${
                        errors.pincode
                          ? "border-red-400 focus:ring-red-300"
                          : "border-gray-300 focus:ring-primary"
                      }`}
                      placeholder="6-digit pincode"
                      maxLength={6}
                    />
                    {isLoadingCities && (
                      <p className="text-sm text-gray-500 mt-1">
                        Fetching city details...
                      </p>
                    )}
                    {errors.pincode && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.pincode}
                      </p>
                    )}
                  </div>

                  <div className="relative">
                    <label
                      htmlFor="city"
                      className="text-primary font-medium -top-3 left-3 bg-white px-2 mb-1 absolute text-[12px]"
                    >
                      City
                    </label>
                    {cities.length > 0 ? (
                      <select
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className={`w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 ${
                          errors.city
                            ? "border-red-400 focus:ring-red-300"
                            : "border-gray-300 focus:ring-primary"
                        }`}
                      >
                        <option value="">Select city</option>
                        {cities.map((city, idx) => (
                          <option key={idx} value={city}>
                            {city}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className={`w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 ${
                          errors.city
                            ? "border-red-400 focus:ring-red-300"
                            : "border-gray-300 focus:ring-primary"
                        }`}
                        placeholder="Enter city"
                      />
                    )}
                    {errors.city && (
                      <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                    )}
                  </div>
                </div>

                <div className="relative">
                  <label
                    htmlFor="state"
                    className="text-primary font-medium -top-3 left-3 bg-white px-2 mb-1 absolute text-[12px]"
                  >
                    State
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className={`w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 ${
                      errors.state
                        ? "border-red-400 focus:ring-red-300"
                        : "border-gray-300 focus:ring-primary"
                    }`}
                    placeholder="Enter state"
                  />
                  {errors.state && (
                    <p className="text-red-500 text-sm mt-1">{errors.state}</p>
                  )}
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
                    className={`w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 ${
                      errors.address
                        ? "border-red-400 focus:ring-red-300"
                        : "border-gray-300 focus:ring-primary"
                    }`}
                    placeholder="House no, street, area"
                    rows={3}
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.address}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-6">
                <button
                  type="button"
                  className="px-5 py-2.5 rounded-xl border border-gray-300"
                  onClick={closeProfileModal}
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-primary text-white hover:opacity-90 flex items-center justify-center gap-2 disabled:opacity-60"
                  disabled={isSubmitting}
                >
                  {isSubmitting && (
                    <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  )}
                  {isSubmitting ? "Submitting..." : "Submit"}
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
