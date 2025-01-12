"use client";

import Image from "next/image";
import { Award } from "lucide-react";
import CustomButton from "./CustomButton";

export default function LearningLanding() {
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-16 lg:grid-cols-2 px-5 xl:px-20">
          {/* Left Column */}
          <div className="flex flex-col justify-center space-y-8">
            <Image
              src="/l-1.png"
              alt="Decorative Image 1"
              width={100}
              height={100}
              className="absolute top-0 left-0 h-auto w-96"
            />
            <div className="flex w-fit items-center gap-2 px-4 py-2">
              <div className="flex p-4 items-center justify-center rounded-full bg-[#D5D52C]">
                <Award size={24} color="#107D6C" />
              </div>
              <span className="text-lg font-medium text-[#107D6C]">
                Guaranteed and certified
              </span>
            </div>

            <h1 className="text-4xl font-semibold leading-tight text-[var(--custom-green-11)] lg:text-6xl">
              Online learning wherever and whenever.
            </h1>
            <CustomButton
              primaryText="Learn more"
              secondaryText="Learn more"
              bgColor="#2A3342"
              hoverBgColor="#1F2937"
              hoverTextColor="#fff"
              textColor="#fff"
              className="w-fit"
            />

            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                <Image
                  src="/lm-2.webp"
                  alt="Instructor 1"
                  width={48}
                  height={48}
                  className="h-12 w-12 rounded-full border-2 border-gray-200 object-cover"
                />
                <Image
                  src="/lm-1.webp"
                  alt="Instructor 2"
                  width={48}
                  height={48}
                  className="h-12 w-12 rounded-full border-2 border-gray-200 object-cover bg-white"
                />
              </div>
              <p className="text-sm text-[#4B5563]">
                Online courses from{" "}
                <span className="underline decoration-[#FFD700] decoration-2">
                  experts
                </span>
                .
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="relative space-y-16 pt-8 lg:pt-0">
            <Image
              src="/l-2.png"
              alt="Decorative Image 2"
              width={150}
              height={150}
              className="absolute top-1/2 -right-56 -translate-y-1/2 h-auto w-80 rotate-[-55deg] opacity-5"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 relative">
              {/* First Item - Left */}
              <div className="md:col-start-1">
                <div
                  className="w-fit relative  p-8 shadow-lg clip-path-right 
                  transition-transform duration-300 before:content-[''] before:absolute 
                  before:-right-5 before:border-l-[20px] before:border-l-white
                  before:border-y-[30px] before:border-y-transparent before:top-1/2 before:-translate-y-1/2"
                  style={{
                    clipPath: "polygon(0 0, 95% 0, 100% 50%, 95% 100%, 0 100%)",
                  }}
                >
                  <div className="text-8xl font-bold text-[#eeeeef] absolute left-2 top-0 z-1">
                    01
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-xl font-semibold text-[var(--custom-green-11)]">
                      Flexible schedule
                    </h3>
                    <div className="mt-2 h-1 w-12 bg-[#FFD700]" />
                    <p className="mt-4 text-[#4B5563]">
                      eLearning allows learners to quickly and more easily
                      complete their training.
                    </p>
                  </div>
                </div>
              </div>

              {/* Second Item - Right */}
              <div className="md:col-start-2 md:row-start-2">
                <div
                  className="w-fit ml-auto relative  p-8 shadow-lg clip-path-left 
                  transition-transform duration-300 before:content-[''] before:absolute 
                  before:-left-5 before:border-r-[20px] before:border-r-white
                  before:border-y-[30px] before:border-y-transparent before:top-1/2 before:-translate-y-1/2"
                  style={{
                    clipPath:
                      "polygon(5% 0, 100% 0, 100% 100%, 5% 100%, 0 50%)",
                  }}
                >
                  <div className="text-8xl font-bold text-[#eeeeef] absolute left-2 top-0 z-1">
                    02
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-xl font-semibold text-[var(--custom-green-11)]">
                      Pocket friendly
                    </h3>
                    <div className="mt-2 h-1 w-12 bg-[#FFD700]" />
                    <p className="mt-4 text-[#4B5563]">
                      eLearning allows learners to quickly and more easily
                      complete their training.
                    </p>
                  </div>
                </div>
              </div>

              {/* Third Item - Left */}
              <div className="md:col-start-1 md:row-start-3">
                <div
                  className="w-fit relative  p-8 shadow-lg clip-path-right 
                  transition-transform duration-300 before:content-[''] before:absolute 
                  before:-right-5 before:border-l-[20px] before:border-l-white
                  before:border-y-[30px] before:border-y-transparent before:top-1/2 before:-translate-y-1/2"
                  style={{
                    clipPath: "polygon(0 0, 95% 0, 100% 50%, 95% 100%, 0 100%)",
                  }}
                >
                  <div className="text-8xl font-bold text-[#eeeeef] absolute left-2 top-0 z-1">
                    03
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-xl font-semibold text-[var(--custom-green-11)]">
                      Expert Instructor
                    </h3>
                    <div className="mt-2 h-1 w-12 bg-[#FFD700]" />
                    <p className="mt-4 text-[#4B5563]">
                      eLearning allows learners to quickly and more easily
                      complete their training.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
