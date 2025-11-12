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
      <div className="py-16 px-4">
        <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 md:gap-8 items-center justify-items-center">
          <h2 className=" text-[36px] 2xl:text-[52px] leading-tight mb-4 font-bold text-center md:text-left">
            Benefits of<span className="text-primary">Smart Cards</span>
          </h2>
          <div className=" md:p-4 flex items-center gap-4">
            <div className="ps-5">
              <p className="text-[18px] text-center md:text-left">
                Smart Cards transform the way professionals connect by offering
                a modern, eco-friendly, and versatile solution making networking
                smarter, faster, and more sustainable than traditional paper
                cards.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="relative pt-[4%] pb-[15%] block lg:hidden ">
        <div className="sharing-content grid md:grid-cols-2 justify-center  gap-12 lg:gap-[100px]">
          
          <div className="relative shearing-card-on max-w-[302px] m-auto h-[178px] bg-[#58447F] text-white pt-[40px]  w-full rounded-[36px] ">
            <h2 className="shearing-title text-center max-w-[106px]  text-[18px] m-auto">
              Easy Sharing
            </h2>
            <p className="shearing-des text-center m-auto max-w-[269px] text-[13px] leading-[22px]">
              Instantly share your details via WhatsApp, Email, SMS, QR code, or
              NFC tap, no apps required, just effortless connectivity.
            </p>
            <div className="shearing-icon  items-center m-auto absolute top-[-12%] w-full flex justify-center">
            <Image
              src={Arrowicon}
              alt="Arrowicon"
              width={1000}
              height={500}
              className="max-w-[50px] md:max-w-[62px] m-auto"
            />
          </div>
          </div>
         
          <div className="relative shearing-card-on max-w-[302px] m-auto h-[178px] bg-[#FFCE00] text-white pt-[40px]  w-full rounded-[36px] ">
            <h2 className="shearing-title text-center max-w-[106px]  text-[18px] m-auto">
              Easy Sharing
            </h2>
            <p className="shearing-des text-center m-auto max-w-[269px] text-[13px] leading-[22px]">
              Instantly share your details via WhatsApp, Email, SMS, QR code, or
              NFC tap, no apps required, just effortless connectivity.
            </p>
            <div className="shearing-icon absolute  top-[-12%] w-full flex justify-center items-center m-auto">
            <Image
              src={Yellowspin}
              alt="Yellowspin"
              width={1000}
              height={500}
              className="max-w-[50px] md:max-w-[62px] m-auto"
            />
          </div>
          </div>
       
          <div className="relative shearing-card-on max-w-[302px] m-auto h-[178px] bg-[#58447F] text-white pt-[40px]  w-full rounded-[36px] ">
            <h2 className="shearing-title text-center max-w-[106px]  text-[18px] m-auto">
              Easy Sharing
            </h2>
            <p className="shearing-des text-center m-auto max-w-[269px] text-[13px] leading-[22px]">
              Instantly share your details via WhatsApp, Email, SMS, QR code, or
              NFC tap, no apps required, just effortless connectivity.
            </p>
            <div className="shearing-icon absolute  top-[-12%] w-full flex justify-center items-center m-auto">
            <Image
              src={Leafspin}
              alt="Leafspin"
              width={1000}
              height={500}
              className="max-w-[50px] md:max-w-[62px] m-auto"
            />
          </div>
          </div>
        </div>
      </div>
      <section className="block lg:hidden">
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
            <div className="relative pt-32 md:pt-12 lg:pt-0 ">
              <div className=" absolute bottom-[10%] md:bottom-[32%] z-[1] w-full flex justify-center">
                <Image
                  src={Yourlogos}
                  alt="Flylogoimg"
                  width={1000}
                  height={500}
                  className="max-w-[250px]"
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

      <section className=" hidden lg:block relative">
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
            <div className="Whatsapp absolute left-[9%] top-[40%] animate-bounce">
              <Image
                src={Whatsapp}
                alt="Whatsapp"
                width={1000}
                height={500}
                className="max-w-[85px] m-auto"
              />
            </div>
            <div className="Instagram absolute  left-[23%]  top-[13%] animate-bounce">
              <Image
                src={Instagram}
                alt="Instagram"
                width={1000}
                height={500}
                className="max-w-[85px] m-auto"
              />
            </div>
            <div className="Youtube absolute  right-[23%] top-[13%] animate-bounce">
              <Image
                src={Youtube}
                alt="Youtube"
                width={1000}
                height={500}
                className="max-w-[85px] m-auto"
              />
            </div>
            <div className="facebook absolute right-[9%] top-[40%] animate-bounce">
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
                  width={500} // adjust size as needed
                  height={500}
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
                  width={500}
                  height={500}
                  className="object-contain"
                />
              </div>

              {/* Card content */}
              <h2 className="font-bold text-lg mb-4">Always Updatable</h2>
              <p className="text-sm leading-relaxed font-bold">
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
                  width={500} // adjust size as needed
                  height={300}
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

         
        </div>
        <div className=" absolute z-[1] bottom-[15%] xl:bottom-[17%] 2xl:bottom-[18%] flex justify-center w-full flyover_hht">
            <Image
              src={Yourlogos}
              alt="Flylogoimg"
              width={1000}
              height={500}
              className=" max-w-[400px] xl:max-w-[500px] 2xl:max-w-[600px] "
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
      </section>
    </div>
  );
};

export default Sharingcard;
