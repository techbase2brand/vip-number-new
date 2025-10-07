import React from 'react'

const DealBanner = () => {
  return (
    <div
      className={`bg-[url("/assets/vipsalebannerphone.png")] md:bg-[url("/assets/vipsalebanner.png")] bg-cover bg-no-repeat bg-center 
              w-full h-[70vh] sm:h-[45vh] md:h-[50vh] lg:h-[55vh] xl:h-[60vh] 2xl:h-[65vh] relative overflow-hidden mb-2`}
    >
      <style jsx>{`
        @keyframes custom-spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        .animate-custom-spin {
          animation: custom-spin 5s linear infinite; /* Adjust 5s for speed control */
        }
      `}</style>
    </div>
  )
}

export default DealBanner