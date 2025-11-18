"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FiArrowRight } from "react-icons/fi";
import { usePathname } from "next/navigation";

const NumerlogyArticlesBlog = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  const api = `/api/leaf/blogs.php?perPageLimit=10&recordStartFrom=0&type=${pathname === "/family-pack" ? "FamilyPack" : "Numerology"
    }`;
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); 
    };

    handleResize(); 
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(api);
        const data = await response.json();
        setArticles(data?.blogs);
      } catch (error) {
        console.error("API Fetch Error:", error);
        setError(error.message);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading || error || articles.length === 0) {
    return null;
  }

  const truncateWords = (text, maxWords) => {
    const words = text.split(" ");
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(" ") + "...";
    } else {
      return text;
    }
  };

  return (
    <div className="bg-[#F9F9F9] lg:py-9 py-10">
      <div className="container-os mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-10  max-w-7xl m-auto md:pe-[8%]">
          <div className="pb-3 md:pb-0">
            <h2 className="text-3xl font-semibold relative z-[11]">
              Articles &{" "}
              <span className="inline-block bg-[url('/assets/118.webp')] bg-no-repeat bg-center bg-contain text-primary font-bold px-2">
                Blogs
              </span>
            </h2>

            <p className="font-normal text-[16px] leading-[24px]   md:text-[17px] md:leading-[30px] text-darktext pt-3">
              Stay Informed with the Latest Updates & Expert Insights!
            </p>
          </div>
          <Link
            href="/blogs"
            className="text-sm text-black font-medium flex items-center hover:underline"
          >
            READ ALL <FiArrowRight className="ml-1" />
          </Link>
        </div>

        {/* Blog List (Shows Only 5 Articles) */}
        <div className="grid md:gap-10 gap-10 max-w-7xl m-auto">
          {articles.map((post, index) => (
            <Link href={`/blogs/${post.img_url}`} key={index}>
              <div
                key={post.id}
                className="flex flex-col lg:flex-row bg-white  rounded-lg"
              >
                {/* Blog Image */}

                <div className="relative w-full lg:w-1/2 2xl:min-h-[330px] md:min-h-[240px] min-h-[171px]">
                  <Image
                    src={post.mainImage || "/assets/default-image.png"} // ✅ Uses correct API field
                    alt={post.mainHeading}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg lg:rounded-l-lg lg:rounded-t-none  object-contain 2xl:min-h-[330px] md:min-h-[240px] min-h-[171px]"
                  />
                </div>

                <div className="w-full lg:w-1/2 flex relative lg:right-[20px]">
                  {/* Blog Content */}
                  <div className="p-6 flex flex-col md:max-w-[80%] justify-end  bg-[#E4E4E4] h-max mt-auto">
                    {/* <p className="text-sm text-gray-500">
                  {post.Date || "No Date"}
                </p> */}
                    <h3 className="text-lg font-semibold">
                      {/* <span className="text-primary">{index + 1}. </span>{" "} */}
                      {/* ✅ Numbering */}
                      {post.mainHeading}
                    </h3>
                    <p className="font-normal text-[16px] leading-[24px] md:text-[17px] md:leading-[30px] text-darktext">
                      {truncateWords(
                        post.mainDescriptionNoHtml.replace(/(<([^>]+)>)/gi, ""),
                        isMobile ? 25 : 45
                      )}
                    </p>
                  </div>

                  {/* Arrow Button */}
                  <div className="flex  justify-center items-end relative right-5">
                    <button className="bg-primary text-white p-4 md:p-6  md:left-[20px] md:right-auto right-0 bottom-0">
                      <FiArrowRight size={34} />
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}


        </div>
      </div>
    </div>
  );
};

export default NumerlogyArticlesBlog;
