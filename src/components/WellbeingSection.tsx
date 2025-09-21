"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import groupImage from "../../images/Group.svg";
import frameIcon from "../../images/Frame 1.svg";

export const WellbeingSection: React.FC = () => {
  const sectionVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 1,
        ease: [0.22, 1, 0.36, 1] as const,
        staggerChildren: 0.2
      }
    }
  };

  const titleVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as const
      }
    }
  };

  const cardVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as const
      }
    }
  };

  const imageVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 1,
        ease: [0.22, 1, 0.36, 1] as const,
        delay: 0.4
      }
    }
  };

  return (
    <section className="min-h-[80vh] py-12 bg-white flex items-center">
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
        <motion.div
          variants={sectionVariants}
          initial="initial"
          animate="animate"
          className="relative"
        >
          {/* Desktop Layout */}
          <div className="hidden lg:block">
            <div className="h-[450px] px-28 bg-[#F4F4F4] rounded-xl flex justify-between items-center gap-5 overflow-hidden relative">
              {/* Left Content */}
              <div className="w-[589px] h-80 relative flex-shrink-0">
                {/* Title */}
                <motion.div 
                  variants={titleVariants}
                  className="w-[589px] pt-12 left-0 top-0 absolute flex justify-start items-start gap-4"
                >
                  <h2 className="flex-1 h-11 text-[#2B2B2B] text-[50.52px] font-semibold font-['Poppins'] leading-[62px]">
                    Wellbeing is welldoing
                  </h2>
                </motion.div>

                {/* Feature Cards */}
                <motion.div 
                  variants={cardVariants}
                  className="w-[589px] left-0 top-[155px] absolute flex justify-start items-start gap-[69px]"
                >
                  {/* First Feature */}
                  <div className="flex-1 flex flex-col justify-start items-start gap-5">
                    <div className="px-4 py-3.5 bg-[#285E67] rounded-lg flex justify-start items-start gap-4 overflow-hidden">
                      <div className="w-6 h-7 relative">
                        <Image
                          src={frameIcon}
                          alt="Feature icon"
                          width={26}
                          height={29}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </div>
                    <div className="self-stretch h-28 text-[#2B2B2B] text-base font-normal font-['Poppins'] leading-6">
                      Lorem ipsum dolor sit amet consectetur. Quam ut consequat at a. Diam lacus platea orci vel elit.
                    </div>
                  </div>

                  {/* Second Feature */}
                  <div className="flex-1 flex flex-col justify-start items-start gap-5">
                    <div className="px-4 py-3.5 bg-[#285E67] rounded-lg flex justify-start items-start gap-4 overflow-hidden">
                      <div className="w-6 h-7 relative">
                        <Image
                          src={frameIcon}
                          alt="Feature icon"
                          width={26}
                          height={29}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </div>
                    <div className="self-stretch h-28 text-[#2B2B2B] text-base font-normal font-['Poppins'] leading-6">
                      Lorem ipsum dolor sit amet consectetur. Quam ut consequat at a. Diam lacus platea orci vel elit.
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Right Image - Desktop */}
              <motion.div 
                variants={imageVariants}
                className="flex-shrink-0 flex justify-center items-center"
              >
                <Image
                  src={groupImage}
                  alt="Wellbeing illustration"
                  width={293}
                  height={296}
                  className="object-contain"
                />
              </motion.div>
            </div>
          </div>

          {/* Tablet Layout (md to lg) */}
          <div className="hidden md:block lg:hidden">
            <div className="min-h-[500px] px-28 py-20 bg-[#F4F4F4] rounded-xl flex flex-col justify-center items-center gap-16 overflow-hidden">
              {/* Title */}
              <motion.div 
                variants={titleVariants}
                className="w-[574px] h-16 pt-0.5 flex justify-start items-start gap-4"
              >
                <h2 className="flex-1 h-11 text-center text-[#2A2A2A] text-5xl font-semibold font-['Poppins'] leading-[62px]">
                  Wellbeing is welldoing
                </h2>
              </motion.div>

              {/* Feature Cards - Horizontal */}
              <motion.div 
                variants={cardVariants}
                className="w-[589px] h-56 flex justify-start items-start gap-14"
              >
                {/* First Feature */}
                <div className="flex-1 pr-4 flex flex-col justify-start items-center gap-5">
                  <div className="px-4 py-3.5 bg-[#285E67] rounded-lg flex justify-start items-start gap-4 overflow-hidden">
                    <div className="w-6 h-7 relative">
                      <Image
                        src={frameIcon}
                        alt="Feature icon"
                        width={26}
                        height={29}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                  <div className="self-stretch h-28 text-center text-[#2B2B2B] text-base font-normal font-['Poppins'] leading-normal">
                    Lorem ipsum dolor sit amet consectetur. Quam ut consequat at a. Diam lacus platea orci vel elit.
                  </div>
                </div>

                {/* Second Feature */}
                <div className="flex-1 flex flex-col justify-start items-center gap-5">
                  <div className="px-4 py-3.5 bg-[#285E67] rounded-lg flex justify-start items-start gap-4 overflow-hidden">
                    <div className="w-6 h-7 relative">
                      <Image
                        src={frameIcon}
                        alt="Feature icon"
                        width={26}
                        height={29}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                  <div className="w-60 h-28 text-center text-[#2B2B2B] text-base font-normal font-['Poppins'] leading-normal">
                    Lorem ipsum dolor sit amet consectetur. Quam ut consequat at a. Diam lacus platea orci vel elit.
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="block md:hidden">
            <div className="min-h-[600px] px-6 py-20 bg-[#F4F4F4] rounded-xl flex flex-col justify-center items-center gap-20 overflow-hidden">
              {/* Title */}
              <motion.div 
                variants={titleVariants}
                className="w-96 h-16 pt-0.5 flex justify-start items-start gap-4"
              >
                <h2 className="flex-1 text-center text-[#2B2B2B] text-4xl font-semibold font-['Poppins'] leading-[53px]">
                  Wellbeing <br/>is well doing
                </h2>
              </motion.div>

              {/* Feature Cards - Vertical */}
              <motion.div 
                variants={cardVariants}
                className="w-96 h-96 flex flex-col justify-start items-start gap-6"
              >
                {/* First Feature */}
                <div className="self-stretch pr-4 flex flex-col justify-start items-center gap-5">
                  <div className="px-4 py-3.5 bg-[#285E67] rounded-lg flex justify-center items-start gap-4 overflow-hidden">
                    <div className="w-6 h-7 relative">
                      <Image
                        src={frameIcon}
                        alt="Feature icon"
                        width={26}
                        height={29}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                  <div className="w-64 h-28 text-center text-[#2A2A2A] text-base font-normal font-['Poppins'] leading-normal">
                    Lorem ipsum dolor sit amet consectetur. Quam ut consequat at a. Diam lacus platea orci vel elit.
                  </div>
                </div>

                {/* Second Feature */}
                <div className="self-stretch pr-4 flex flex-col justify-start items-center gap-5">
                  <div className="px-4 py-3.5 bg-[#285E67] rounded-lg flex justify-center items-start gap-4 overflow-hidden">
                    <div className="w-6 h-7 relative">
                      <Image
                        src={frameIcon}
                        alt="Feature icon"
                        width={26}
                        height={29}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                  <div className="w-64 h-28 text-center text-[#2A2A2A] text-base font-normal font-['Poppins'] leading-normal">
                    Lorem ipsum dolor sit amet consectetur. Quam ut consequat at a. Diam lacus platea orci vel elit.
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
