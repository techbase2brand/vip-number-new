"use client"
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Moneybacknew from "../../../public/digital-card-new/Moneybacknew.webp";
import savecontactimg from "../../../public/digital-card-new/savecontactimg.webp";
import Sociallink from "../../../public/digital-card-new/Sociallink.webp";
import Accountdetails from "../../../public/digital-card-new/Sociallink.webp";
import Leftstar from "../../../public/digital-card-new/Leftstar.webp";
import Rightstar from "../../../public/digital-card-new/Rightstar.webp";
import Direction from "../../../public/digital-card-new/Direction.webp";
import Clicktocall from "../../../public/digital-card-new/Clicktocall.webp";
import Scanqr from "../../../public/digital-card-new/Scanqr.webp";
import ClickonWhatsapp from "../../../public/digital-card-new/ClickonWhatsapp.webp";
import Allwithsingleclick from "../../../public/digital-card-new/Allwithsingleclick.webp";
import Phcenterimg from "../../../public/digital-card-new/Phcenterimg.webp";
import { AppStateContext } from "../contexts/AppStateContext/AppStateContext";
import { MyRegisterSignInContext } from "../contexts/MyRegisterSignInContext/MyRegisterSignInContext";
import { useRouter } from "next/navigation";
import { getProfile } from "../Services/Services";
import axios from "axios";
import { toast } from "react-toastify";
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
const Banner = () => {
  const panelImg = process.env.NEXT_PUBLIC_IMAGES;
  const { userProfile, user, setNameUpdate } = useContext(AppStateContext);
  const { setActiveSignInWithOtp } = useContext(MyRegisterSignInContext);
  const Router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    pincode: "",
    city: "",
    address: "",
  });
  const [errors, setErrors] = useState({});
  const { openPlanModal, resetPlanSelections } = useDigitalCardPlan();

  const openModal = () => {
    resetPlanSelections();
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

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
      getProfile(user?.token)?.then((res) => {
        const address = res?.address || {};
        const fullName = `${res?.firstname || ""} ${
          res?.lastname || ""
        }`.trim(); // Remove leading/trailing spaces from the full name
        setFormData((prevState) => ({
          ...prevState,
          name: `${res?.firstname} ${res.lastname}` || "",
          mobile: res?.mobile || "",
          email: res.email,
          pincode: address?.zip_code || "",
          city: address?.city || "",
          // district: res?.contact_cf?.district || "",
          // state_name: address?.state || "",
          // dob: dateBirth?.date_of_birth || "",
          address: address?.address,
        }));
      });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
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
      closeModal();
      openPlanModal();
      // await axios.post(
      //   `/api/web/lead/create`,
      //   {
      //     first_name: formData.name,
      //     mobile_number: formData.mobile,
      //     primary_email: formData.email,
      //     postal_code: formData.pincode,
      //     city: formData.city,
      //     billing_address: formData.address,
      //     // state: data.state_name,
      //     // district: data.district,
      //     ...(storedReferId && {
      //       refer_id: storedReferId === "undefined" ? "" : storedReferId,
      //     }),
      //   },
      //   {
      //     headers: {
      //       "Content-Type": "application/json",
      //       Authorization: `Bearer ${user?.token}`,
      //     },
      //   }
      // );
    } catch (error) {
      console.error("Error:", error);
      toast.error("Unable to submit details. Please try again.");
    }
  };

  return (
    <div>
      <div className="custom_container bg-[#E7DEFA]">
        <div className="bg-img  bg-[#E7DEFA] overflow-hidden py-12 md:pb-0">
          {/* Star Backgrounds */}
          <div className="side-star flex justify-between absolute w-full   ">
            <div className="left-start hidden lg:block">
              <Image
                src={Leftstar}
                alt="Leftstar"
                width={1000}
                height={500}
                className="Leftstar max-w-[150px] 2xl:max-w-[294px]"
              />
            </div>
            <div className="right-start hidden lg:block">
              <Image
                src={Rightstar}
                alt="Rightstar"
                width={1000}
                height={500}
                className="Rightstar max-w-[150px] 2xl:max-w-[294px]"
              />
            </div>
          </div>

          {/* Floating Moneyback Images */}
          <div className="moneyback-main flex justify-evenly gap-[137px] items-center">
            <div className="moneyimg-one max-md:max-w-[83px]">
              <Image
                src={Moneybacknew}
                alt="moneyback"
                width={1000}
                height={500}
                className="max-w-[83px] 2xl:max-w-[191px] m-auto"
              />
            </div>
            <div className="moneyimg-two">
              <Image
                src={Moneybacknew}
                alt="moneyback"
                width={1000}
                height={500}
                className="max-w-[83px] 2xl:max-w-[191px] m-auto"
              />
            </div>
          </div>
          {/* Main Banner Content */}
          <div className="banner-main-box custom-container flex flex-col items-center justify-center  w-full px-4 md:px-0">
            {/* Title */}
            <div className="banner-title flex flex-col items-center text-center text-[28px] 2xl:text-[70px] max-w-[90%] md:max-w-[923px] mx-auto">
              <h1 className="smart card font-bold leading-3">Smart Card</h1>
              <h2 className="how-work font-semibold mt-2 text-[#58447F]">
                How It Works
              </h2>
            </div>

            {/* Description */}
            <div className="baner-des max-w-[312px] xl:max-w-[562px] 2xl:max-w-[862px] text-[15px] 2xl:text-[24px] mx-auto mt-4 text-center leading-relaxed">
              <p>
                These business essentials are backed by VIP Number Shop,
                offering exclusive VIP mobile numbers to enhance your brand’s
                professional identity.
              </p>
            </div>

            {/* Button */}
            <div className="banner-btn mt-6  z-[10]">
              <button className="bg-[#58447F] text-white text-[16px] md:text-[18px] font-medium w-[130px] md:w-[160px] h-[40px] md:h-[43px] rounded-full hover:bg-[#4b3b70] transition-all"
              onClick={() => {
                if (!user?.token) {
                  setActiveSignInWithOtp(true);
                  localStorage.setItem("Lead-Page", "Digital Card");
                } else {
                  openModal();
                }
              }}>
                Buy Now
              </button>
            </div>
          </div>
        </div>

        <section className="hidden lg:block">
          <div className="ph-main-div">
            <div className="left-right-main flex justify-evenly">
              <div className="left-side-ph text-[15px]">
                <div className="left-img-one relative bottom-[8%]  xl:bottom-[10%] 2xl:bottom-[17%] left-[30%] xl:left-[50%] 2xl:left-[67%] items-center">
                  <Image
                    src={savecontactimg}
                    alt="savecontactimg"
                    width={1000}
                    height={500}
                    className="savecontactimg max-w-[168px] xl:max-w-[178px] 2xl:max-w-[248px] h-auto 2xl:h-[295px] m-auto"
                  />
                  <button className="Save Contact relative  text-[12px]  2xl:text-[14px] right-[4px] xl:right-[18px] 2xl:right-[5px] bottom-[23px] 2xl:bottom-[23px] bg-[#22C55E] text-white w-[150px] xl:w-[200px] 2xl:w-[217px] h-[33px] xl:h-[43px] items-center m-auto rounded-[50px]">
                    Save Contact
                  </button>
                </div>

                <div className="left-img-two relative bottom-[8%] 2xl:bottom-[17%] left-[19%] xl:left-[39%] 2xl:left-[51%]  items-center">
                  <Image
                    src={Accountdetails}
                    alt="Accountdetails"
                    width={1000}
                    height={500}
                    className="savecontactimg max-w-[168px] 2xl:max-w-[248px] h-auto 2xl:h-[295px] m-auto"
                  />
                  <button className="Save Contact relative text-[12px]  2xl:text-[14px] right-[-16px] xl:right-[-8px] 2xl:right-[-22px] bottom-[43px] 2xl:bottom-[39px] bg-[#3B82F6] text-white w-[150px] xl:w-[200px] 2xl:w-[217px] h-[33px] xl:h-[43px] items-center m-auto rounded-[50px]">
                    Click to Account Details
                  </button>
                </div>

                <div className="left-img-three relative  bottom-[8%] 2xl:bottom-[15%] left-[23%] xl:left-[73%] 2xl:left-[83%]  items-center">
                  <Image
                    src={Sociallink}
                    alt="Sociallink"
                    width={1000}
                    height={500}
                    className="savecontactimg max-w-[168px] 2xl:max-w-[248px] h-auto 2xl:h-[295px] m-auto"
                  />
                  <button className="Save Contact relative text-[12px]  2xl:text-[14px] right-[-16px] xl:right-[-8px] 2xl:right-[-19px] bottom-[43px] 2xl:bottom-[39px] bg-[#E21A20] text-white w-[150px] xl:w-[200px] 2xl:w-[217px] h-[33px] xl:h-[43px] items-center m-auto rounded-[50px]">
                    Click to Social Links
                  </button>
                </div>
              </div>

              <div className="center-imgs relative">
                <div className="center-direction-img hidden xl:block">
                  <Image
                    src={Direction}
                    width={1000}
                    height={500}
                    alt="Direction"
                    className="center-direction max-w-[828px] 2xl:max-w-[928px]"
                  />
                </div>

                <div className="bottom-side-ph relative bottom-[-22%]   xl:bottom-[31%]">
                  <div className="bottom-img-one item-center m-auto flex flex-col justify-center">
                    <Image
                      src={Allwithsingleclick}
                      alt="Allwithsingleclick"
                      width={1000}
                      height={500}
                      className="Allwithsingleclick max-w-[144.81px] xl:max-w-[244.81px] 2xl:max-w-[344.81px] m-auto items-center"
                    />
                    <button className="Save Contact relative right-[-1  px] 2xl:right-[5px] bottom-[23px] 2xl:bottom-[35px] bg-[#22C55E] text-white           w-[170px] xl:w-[270px] 2xl:w-[389px] h-[33px] xl:h-[43px] 2xl:h-[74px] items-center m-auto rounded-[50px]">
                      All With Single Click
                    </button>
                  </div>
                </div>
              </div>

              <div className="right-side-ph text-[15px]">
                <div className="right-img-one relative bottom-[6%] xl:bottom-[10%] 2xl:bottom-[17%] left-[-50%] 2xl:left-[-50%] items-center">
                  <Image
                    src={Clicktocall}
                    alt="Clicktocall"
                    width={1000}
                    height={500}
                    className="savecontactimg max-w-[158px] xl:max-w-[178px] 2xl:max-w-[248px] h-auto 2xl:h-[295px] m-auto"
                  />
                  <button className="Save Contact relative right-[-18px] xl:right-[-18px] 2xl:right-[-20px] bottom-[23px] 2xl:bottom-[23px] bg-[#3B82F6] text-white              w-[150px] xl:w-[200px] 2xl:w-[217px] h-[33px] xl:h-[43px] items-center m-auto rounded-[50px]">
                    Click to Call
                  </button>
                </div>

                <div className="right-img-two relative bottom-[6%]  xl:bottom-[10%] 2xl:bottom-[17%]  right-[43%]">
                  <Image
                    src={Scanqr}
                    alt="Scanqr"
                    width={1000}
                    height={500}
                    className="savecontactimg max-w-[158px] xl:max-w-[178px] 2xl:max-w-[248px] h-auto 2xl:h-[295px] m-auto"
                  />
                  <button className="Save Contact relative right-[-18px] 2xl:right-[-20px] xl:right-[-18px] bottom-[23px] 2xl:bottom-[23px] bg-[#E21A20] text-white             w-[150px] xl:w-[200px] 2xl:w-[217px] h-[33px] xl:h-[43px] items-center m-auto rounded-[50px]">
                    Click to Qr Code
                  </button>
                </div>

                <div className="right-img-three relative bottom-[3%] xl:bottom-[8%] 2xl:bottom-[13%] right-[45%] xl:right-[55%] 2xl:right-[75%]">
                  <Image
                    src={ClickonWhatsapp}
                    alt="ClickonWhatsapp"
                    width={1000}
                    height={500}
                    className="savecontactimg max-w-[158px] 2xl:max-w-[248px] h-auto 2xl:h-[295px] m-auto"
                  />
                  <button className="Save Contact relative right-[-18px] xl:right-[-18px] 2xl:right-[-20px] bottom-[23px] 2xl:bottom-[23px] bg-[#22C55E] text-white             w-[150px] xl:w-[200px] 2xl:w-[217px] h-[33px] xl:h-[43px] items-center m-auto rounded-[50px]">
                    Click to WhatsApp
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative lg:hidden block">
          <div className="ph-center-img ">
            <Image
              src={Phcenterimg}
              width={1000}
              height={500}
              alt="ph-center-img"
              className="max-w-[60%] m-auto py-[10%]"
            />
          </div>
          <div className="grid grid-cols-2 absolute top-[0] w-full h-full">
            <div className="left-img-one relative items-center">
              <Image
                src={savecontactimg}
                alt="savecontactimg"
                width={1000}
                height={500}
                className="savecontactimg max-w-[123px] xl:max-w-[178px] 2xl:max-w-[248px] h-auto 2xl:h-[295px] m-auto"
              />
              <button className="Save Contact relative  text-[8px]  2xl:text-[14px] left-[18%]   sm:left-[32%]  xl:right-[18px] 2xl:right-[5px] bottom-[23px] 2xl:bottom-[23px] bg-[#22C55E] text-white w-[120px] xl:w-[200px] 2xl:w-[217px] h-[30px] xl:h-[43px] items-center m-auto rounded-[50px]">
                Save Contact
              </button>
            </div>
            <div className="right-img-one relative  ">
              <Image
                src={Clicktocall}
                alt="Clicktocall"
                width={1000}
                height={500}
                className="savecontactimg max-w-[123px] xl:max-w-[178px] 2xl:max-w-[248px] h-auto 2xl:h-[295px] m-auto"
              />
              <button className="Save Contact relative left-[25%] sm:left-[37%] xl:right-[-18px] 2xl:right-[-20px] bottom-[28px] 2xl:bottom-[23px] bg-[#3B82F6] text-white  text-[8px]            w-[120px] xl:w-[200px] 2xl:w-[217px] h-[30px] xl:h-[43px] items-center m-auto rounded-[50px]">
                Click to Call
              </button>
            </div>
            <div className="left-img-three relative   ">
              <Image
                src={Sociallink}
                alt="Sociallink"
                width={1000}
                height={500}
                className="savecontactimg max-w-[123px] 2xl:max-w-[248px] h-auto 2xl:h-[295px] m-auto"
              />
              <button className="Save Contact relative text-[8px]  2xl:text-[14px] left-[22%] sm:left-[36%] xl:right-[-8px] 2xl:right-[-19px] bottom-[29px] 2xl:bottom-[39px] bg-[#E21A20] text-white w-[120px] xl:w-[200px] 2xl:w-[217px] h-[30px] xl:h-[43px] items-center m-auto rounded-[50px]">
                Click to Social Links
              </button>
            </div>
            <div className="left-img-two relative  ">
              <Image
                src={Accountdetails}
                alt="Accountdetails"
                width={1000}
                height={500}
                className="savecontactimg max-w-[123px] 2xl:max-w-[248px] h-auto 2xl:h-[295px] m-auto"
              />
              <button className="Save Contact relative text-[8px]  2xl:text-[14px] left-[23%] sm:left-[36%] xl:right-[-8px] 2xl:right-[-22px] bottom-[33px] 2xl:bottom-[39px] bg-[#3B82F6] text-white w-[120px] xl:w-[200px] 2xl:w-[217px] h-[30px] xl:h-[43px] items-center m-auto rounded-[50px]">
                Click to Account Details
              </button>
            </div>
            <div className="right-img-two relative ">
              <Image
                src={Scanqr}
                alt="Scanqr"
                width={1000}
                height={500}
                className="savecontactimg max-w-[123px] xl:max-w-[178px] 2xl:max-w-[248px] h-auto 2xl:h-[295px] m-auto"
              />
              <button className="Save Contact relative left-[27%] sm:left-[37%] 2xl:right-[-20px] xl:right-[-18px] bottom-[23px] 2xl:bottom-[23px] bg-[#E21A20] text-white      text-[8px]             w-[120px] xl:w-[200px] 2xl:w-[217px] h-[30px] xl:h-[43px] items-center m-auto rounded-[50px]">
                Click to Qr Code
              </button>
            </div>
            <div className="right-img-three relative ">
              <Image
                src={ClickonWhatsapp}
                alt="ClickonWhatsapp"
                width={1000}
                height={500}
                className="savecontactimg max-w-[123px] 2xl:max-w-[248px] h-auto 2xl:h-[295px] m-auto"
              />
              <button className="Save Contact relative left-[27%] sm:left-[37%] xl:right-[-18px] 2xl:right-[-20px] bottom-[23px] 2xl:bottom-[23px] bg-[#22C55E] text-white text-[8px]             w-[120px] xl:w-[200px] 2xl:w-[217px] h-[30px] xl:h-[43px] items-center m-auto rounded-[50px]">
                Click to WhatsApp
              </button>
            </div>
          </div>
        </section>
        <section className="lg:hidden block">
          <div className="bottom-img-one item-center m-auto flex flex-col justify-center">
            <Image
              src={Allwithsingleclick}
              alt="Allwithsingleclick"
              width={1000}
              height={500}
              className="Allwithsingleclick max-w-[179.81px] xl:max-w-[244.81px] 2xl:max-w-[344.81px] m-auto items-center"
            />
            <button className="Save Contact relative right-[-1px] 2xl:right-[5px] bottom-[23px] 2xl:bottom-[35px] bg-[#FFCE00] text-white w-[202px] xl:w-[270px] 2xl:w-[389px] h-[38px] xl:h-[43px] 2xl:h-[74px] items-center m-auto rounded-[50px]">
              All With Single Click
            </button>
          </div>
        </section>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={closeModal}
          ></div>
          <div className="relative bg-white w-full max-w-[560px] rounded-3xl shadow-xl mx-4">
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h3 className="text-[20px] font-semibold">Complete Your Details</h3>
              <button
                className="text-gray-600 hover:text-black text-[20px]"
                aria-label="Close"
                onClick={closeModal}
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
                  onClick={closeModal}
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

export default Banner;
