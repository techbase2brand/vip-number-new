import React from "react";
import ShilpaShetty from "../../../public/updatednumerology/Shilpa-Shetty.webp";
import sonu from "../../../public/updatednumerology/sonu.webp";
import model from "../../../public/updatednumerology/model.webp";
import Image from "next/image";
const NumerologyawardWinner = () => {
  return (
    <div className="bg-primary">
      <div className="container-os">
        <div className="grid lg:grid-cols-3 pt-8 lg:pt-0">
          <div>
            <div className="lg:bg-secondary">
              <Image
                src={ShilpaShetty}
                alt="ShilpaShetty"
                width={1000}
                height={500}
                className="lg:max-w-[99%] rounded-xl lg:rounded-none"
              />
            </div>

            <div className="py-4 lg:py-8 text-center flex flex-col items-center md:gap-3">
              <h3 className="font-semibold text-[24px] lg:leading-[40px] leading-[35px] text-secondary  md:text-[32px] 2xl:text-[35px]  tracking-wide ">
                Global icon award
              </h3>

              <h5 className="font-roboto font-semibold md:text-[24px] md:leading-[28px] text-white mb-2 text-[18px] leading-[24px]">
                Winner 2024-25
              </h5>
            </div>
          </div>
          <div>
            <div className="lg:bg-secondary">
              <Image
                src={sonu}
                alt="ShilpaShetty"
                width={1000}
                height={500}
                className="lg:max-w-[99%] rounded-xl lg:rounded-none"
              />
            </div>

            <div className="py-4 lg:py-8 text-center flex flex-col items-center md:gap-3">
              <h3 className="font-semibold text-[24px] lg:leading-[40px] leading-[35px] text-secondary  md:text-[32px] 2xl:text-[35px]  tracking-wide ">
                International Business award
              </h3>
              <h5 className="font-roboto font-semibold md:text-[24px] md:leading-[28px] text-white mb-2 text-[18px] leading-[24px]">
                Winner 2023-24
              </h5>
            </div>
          </div>
          <div>
            <Image
              src={model}
              alt="ShilpaShetty"
              width={1000}
              height={500}
              className="lg:max-w-[99%] rounded-xl lg:rounded-none"
            />

            <div className="py-4 lg:py-8 text-center flex flex-col items-center md:gap-3">
              <h3 className="font-semibold text-[24px] lg:leading-[40px] leading-[35px] text-secondary  md:text-[32px] 2xl:text-[35px]  tracking-wide ">
                Global icon award
              </h3>

              <h5 className="font-roboto font-semibold md:text-[24px] md:leading-[28px] text-white mb-2 text-[18px] leading-[24px]">
                Winner 2023-24
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NumerologyawardWinner;
