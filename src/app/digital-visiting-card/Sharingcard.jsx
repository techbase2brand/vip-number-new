import React from "react";
import Arrowicon from "../../../public/digital-card-new/Arrowicon.webp";
import Yellowspin from "../../../public/digital-card-new/Yellowspin.webp";
import Leafspin from "../../../public/digital-card-new/Leafspin.webp";
import Ropeimg from "../../../public/digital-card-new/Ropeimg.webp";
import Facebook from "../../../public/digital-card-new/Facebook.webp";
import Youtube from "../../../public/digital-card-new/Youtube.webp";
import Instagram from "../../../public/digital-card-new/Instagram.webp";
import Whatsapp from "../../../public/digital-card-new/Whatsapp.webp";
import Yourlogo from "../../../public/digital-card-new/sharing_bg.png";
import Yourlogos from "../../../public/digital-card-new/Yourlogo.webp";
import Roundimgdesk from "../../../public/digital-card-new/Roundimgdesk.webp";
import Roundimgdesk2 from "../../../public/digital-card-new/Roundimgdesk2.webp";
import "../digital-visiting-card/digital.css";

import Image from "next/image";

const Sharingcard = () => {
  return (
    <div>
      <div className="relative pt-[4%] pb-[15%] block md:hidden ">
        <div className="sharing-content flex flex-col justify-center  gap-[100px]   ">
          <div className="shearing-icon  items-center m-auto absolute left-[37%] top-[-6%]">
            <Image
              src={Arrowicon}
              alt="Arrowicon"
              width={1000}
              height={500}
              className="max-w-[97px] m-auto"
            />
          </div>
          <div className="shearing-card-on max-w-[302px] m-auto h-[178px] bg-[#58447F] text-white pt-[40px]  w-full rounded-[36px] ">
            <h2 className="shearing-title text-center max-w-[106px]  text-[18px] m-auto">
              Easy Sharing
            </h2>
            <p className="shearing-des text-center m-auto max-w-[269px] text-[13px] leading-[22px]">
              Instantly share your details via WhatsApp, Email, SMS, QR code, or
              NFC tap, no apps required, just effortless connectivity.
            </p>
          </div>
          <div className="shearing-icon absolute left-[37%] bottom-[61%]  items-center m-auto">
            <Image
              src={Yellowspin}
              alt="Yellowspin"
              width={1000}
              height={500}
              className="max-w-[97px] m-auto"
            />
          </div>
          <div className="shearing-card-on max-w-[302px] m-auto h-[178px] bg-[#FFCE00] text-white pt-[40px]  w-full rounded-[36px] ">
            <h2 className="shearing-title text-center max-w-[106px]  text-[18px] m-auto">
              Easy Sharing
            </h2>
            <p className="shearing-des text-center m-auto max-w-[269px] text-[13px] leading-[22px]">
              Instantly share your details via WhatsApp, Email, SMS, QR code, or
              NFC tap, no apps required, just effortless connectivity.
            </p>
          </div>
          <div className="shearing-icon absolute bottom-[26%] left-[37%] items-center m-auto">
            <Image
              src={Leafspin}
              alt="Leafspin"
              width={1000}
              height={500}
              className="max-w-[97px] m-auto"
            />
          </div>
          <div className="shearing-card-on max-w-[302px] m-auto h-[178px] bg-[#58447F] text-white pt-[40px]  w-full rounded-[36px] ">
            <h2 className="shearing-title text-center max-w-[106px]  text-[18px] m-auto">
              Easy Sharing
            </h2>
            <p className="shearing-des text-center m-auto max-w-[269px] text-[13px] leading-[22px]">
              Instantly share your details via WhatsApp, Email, SMS, QR code, or
              NFC tap, no apps required, just effortless connectivity.
            </p>
          </div>
        </div>
      </div>
      <section className="block md:hidden">
        <div className="social-setion relative">
          <div className="rope-img flex  ">
            <Image
              src={Ropeimg}
              alt="Ropeimg"
              width={1000}
              height={500}
              className="max-w-[432px] m-auto"
            />
          </div>
          <div className="social-icon flex justify-evenly">
            <div className="facebook absolute left-0 top-[3%]">
              <Image
                src={Facebook}
                alt="Facebook"
                width={1000}
                height={500}
                className="max-w-52px"
              />
            </div>
            <div className="Youtube absolute top-[-4%] left-[26%]">
              <Image
                src={Youtube}
                alt="Youtube"
                width={1000}
                height={500}
                className="max-w-52px"
              />
            </div>
            <div className="Whatsapp absolute right-[27%] top-[-4%]">
              <Image
                src={Whatsapp}
                alt="Whatsapp"
                width={1000}
                height={500}
                className="max-w-52px"
              />
            </div>
            <div className="Instagram absolute right-[1%] top-[1%] ">
              <Image
                src={Instagram}
                alt="Instagram"
                width={1000}
                height={500}
                className="max-w-52px"
              />
            </div>
            <div className="relative">
              <div className="Flylogoimg absolute">
                <Image
                  src={Yourlogos}
                  alt="Flylogoimg"
                  width={1000}
                  height={500}
                  className="max-w-[970px]"
                />
              </div>
              <div className="bottom-imgs   mt-4">
                <div className="Yourlogo-img relative ">
                  <Image
                    src={Yourlogo}
                    alt="Yourlogo"
                    width={1000}
                    height={500}
                    className="w-[100%]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className=" hidden lg:block">
        <div className="social-setion relative">
          <div className="rope-img relative  ">
            <Image
              src={Roundimgdesk}
              alt="Ropeimg"
              width={1000}
              height={500}
              className="max-w-[2114px] h-[502px] m-auto"
            />
            <div className="rope-img flex absolute top-[30%] 2xl:top-[19%] left-[20%] 2xl:left-[26%]  ">
              <Image
                src={Roundimgdesk2}
                alt="Ropeimg"
                width={1000}
                height={500}
                className="  m-auto line_img"
              />
            </div>
          </div>

          <div className="social-icon flex justify-evenly">
            <div className="Whatsapp absolute left-[9%] top-[40%]">
              <Image
                src={Whatsapp}
                alt="Whatsapp"
                width={1000}
                height={500}
                className="max-w-[85px] m-auto"
              />
            </div>
            <div className="Instagram absolute  left-[23%]  top-[13%] ">
              <Image
                src={Instagram}
                alt="Instagram"
                width={1000}
                height={500}
                className="max-w-[85px] m-auto"
              />
            </div>
            <div className="Youtube absolute  right-[23%] top-[13%] ">
              <Image
                src={Youtube}
                alt="Youtube"
                width={1000}
                height={500}
                className="max-w-[85px] m-auto"
              />
            </div>
            <div className="facebook absolute right-[9%] top-[40%]">
              <Image
                src={Facebook}
                alt="Facebook"
                width={1000}
                height={500}
                className="max-w-[85px] m-auto "
              />
            </div>

            <div className="sharing_res max-w-xs bg-[#58447F] rounded-3xl text-white p-10 text-center mx-auto absolute  left-[14%] top-[60%]  ">
              {/* White circle with arrow icon image overlapping */}
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white rounded-full w-16 h-16 flex items-center justify-center shadow-md">
                <Image
                  src={Arrowicon} // your imported arrow icon image
                  alt="Arrow Icon"
                  width={32} // adjust size as needed
                  height={32}
                  className="object-contain"
                />
              </div>

              {/* Card content */}
              <h2 className="font-bold text-lg mb-4">Easy Sharing</h2>
              <p className="text-sm leading-relaxed text-[14px] max-w-[270px]">
                Instantly share your details via WhatsApp, Email, SMS, QR code,
                or NFC tap, no apps required, just effortless connectivity.
              </p>
            </div>
            <div className=" max-w-xs bg-yellow-400 rounded-3xl text-gray-800 p-10 text-center mx-auto shadow-md absolute top-[-6%]">
              {/* White circle with refresh icon overlapping */}
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white rounded-full w-16 h-16 flex items-center justify-center shadow-md">
                <Image
                  src={Yellowspin} // your imported refresh icon image
                  alt="Refresh Icon"
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>

              {/* Card content */}
              <h2 className="font-bold text-lg mb-4">Always Updatable</h2>
              <p className="text-sm leading-relaxed">
                Update your information anytime without reprinting. Keep your
                card accurate and relevant as your career or business grows.
              </p>
            </div>
            <div className="sharing_easy max-w-xs bg-[#58447F] rounded-3xl text-white p-10 text-center mx-auto absolute  right-[14%] top-[60%]">
              {/* White circle with arrow icon image overlapping */}
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white rounded-full w-16 h-16 flex items-center justify-center shadow-md">
                <Image
                  src={Arrowicon} // your imported arrow icon image
                  alt="Arrow Icon"
                  width={32} // adjust size as needed
                  height={32}
                  className="object-contain"
                />
              </div>

              {/* Card content */}
              <h2 className="font-bold text-lg mb-4">Easy Sharing</h2>
              <p className="text-sm leading-relaxed">
                Instantly share your details via WhatsApp, Email, SMS, QR code,
                or NFC tap, no apps required, just effortless connectivity.
              </p>
            </div>
          </div>

          <div className="Flylogoimg absolute xl:top-[100%]">
            <Image
              src={Yourlogos}
              alt="Flylogoimg"
              width={1000}
              height={500}
              className="max-w-[970px] "
            />
          </div>
        </div>
        <div className="bottom-imgs   mt-4">
          <div className="Yourlogo-img relative ">
            <Image
              src={Yourlogo}
              alt="Yourlogo"
              width={1000}
              height={500}
              className="w-[100%]"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Sharingcard;
