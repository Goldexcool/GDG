"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import freshImage from "../../images/fresh.svg";
import iconImage from "../../images/Icon.svg";

export const OrganicProduceSection: React.FC = () => {
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

  const imageVariants = {
    initial: { opacity: 0, x: -50 },
    animate: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as const
      }
    }
  };

  const contentVariants = {
    initial: { opacity: 0, x: 50 },
    animate: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as const
      }
    }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as const
      }
    }
  };

  return (
    <section className="min-h-[80vh] py-16 bg-white flex items-center">
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
        <motion.div
          variants={sectionVariants}
          initial="initial"
          animate="animate"
          className="overflow-hidden"
        >
          {/* Desktop Layout - Side by side */}
          <div className="hidden lg:flex justify-start items-center gap-14 overflow-hidden">
            {/* Left Image */}
            <motion.div 
              variants={imageVariants}
              className="flex-shrink-0"
            >
              <Image
                src={freshImage}
                alt="Fresh organic produce background"
                width={635}
                height={578}
                className="rounded-2xl"
              />
            </motion.div>

            {/* Right Content */}
            <motion.div 
              variants={contentVariants}
              className="flex-1 h-[474px] flex flex-col justify-between items-start overflow-hidden"
            >
              {/* Header Section */}
              <div className="self-stretch pb-4 flex flex-col justify-start items-start overflow-hidden space-y-4">
                <h2 className="self-stretch text-[#2B2B2B] text-[50.52px] font-semibold font-['Poppins'] leading-[62px] mb-4">
                  Fresh organic produce
                </h2>
                <p className="self-stretch text-[#2B2B2B] text-base font-normal font-['Poppins'] leading-normal">
                  Lorem ipsum dolor sit amet consectetur. Quam ut consequat at a. Diam lacus platea orci vel elit blandit facilisis enim risus. Ut tristique eget integer odio nec vulputate consequat. Elit mattis ac in amet sit viverra.
                </p>
              </div>

              {/* Feature Items */}
              <motion.div 
                variants={itemVariants}
                className="self-stretch flex justify-start items-start gap-6 overflow-hidden"
              >
                <div className="w-12 h-12 relative flex-shrink-0">
                  <Image
                    src={iconImage}
                    alt="Feature icon"
                    width={48}
                    height={48}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex-1 text-[#2B2B2B] text-base font-normal font-['Poppins'] leading-normal">
                  Lorem ipsum dolor sit amet consectetur. Quam ut consequat at a. Diam lacus platea
                </div>
              </motion.div>

              <motion.div 
                variants={itemVariants}
                className="self-stretch flex justify-start items-start gap-6 overflow-hidden"
              >
                <div className="w-12 h-12 relative flex-shrink-0">
                  <Image
                    src={iconImage}
                    alt="Feature icon"
                    width={48}
                    height={48}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex-1 text-[#2B2B2B] text-base font-normal font-['Poppins'] leading-normal">
                  Lorem ipsum dolor sit amet consectetur. Quam ut consequat at a. Diam lacus platea
                </div>
              </motion.div>

              <motion.div 
                variants={itemVariants}
                className="self-stretch flex justify-start items-start gap-6 overflow-hidden"
              >
                <div className="w-12 h-12 relative flex-shrink-0">
                  <Image
                    src={iconImage}
                    alt="Feature icon"
                    width={48}
                    height={48}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex-1 text-[#2B2B2B] text-base font-normal font-['Poppins'] leading-normal">
                  Lorem ipsum dolor sit amet consectetur. Quam ut consequat at a. Diam lacus platea
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Mobile/Tablet Layout - Image on top, content below, all centered */}
          <div className="lg:hidden flex flex-col items-center text-center space-y-8">
            {/* Image on top */}
            <motion.div 
              variants={imageVariants}
              className="w-full max-w-md"
            >
              <Image
                src={freshImage}
                alt="Fresh organic produce background"
                width={635}
                height={578}
                className="rounded-2xl w-full h-auto"
              />
            </motion.div>

            {/* Content below, centered */}
            <motion.div 
              variants={contentVariants}
              className="w-full max-w-2xl flex flex-col items-center space-y-8"
            >
              {/* Header Section */}
              <div className="w-full flex flex-col items-center space-y-4">
                <h2 className="text-[#2B2B2B] text-4xl md:text-5xl font-semibold font-['Poppins'] leading-tight">
                  Fresh organic produce
                </h2>
                <p className="text-[#2B2B2B] text-base font-normal font-['Poppins'] leading-normal max-w-xl">
                  Lorem ipsum dolor sit amet consectetur. Quam ut consequat at a. Diam lacus platea orci vel elit blandit facilisis enim risus. Ut tristique eget integer odio nec vulputate consequat. Elit mattis ac in amet sit viverra.
                </p>
              </div>

              {/* Feature Items */}
              <div className="w-full space-y-6">
                <motion.div 
                  variants={itemVariants}
                  className="flex justify-center items-start gap-6"
                >
                  <div className="w-12 h-12 relative flex-shrink-0">
                    <Image
                      src={iconImage}
                      alt="Feature icon"
                      width={48}
                      height={48}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-1 text-[#2B2B2B] text-base font-normal font-['Poppins'] leading-normal text-left max-w-md">
                    Lorem ipsum dolor sit amet consectetur. Quam ut consequat at a. Diam lacus platea
                  </div>
                </motion.div>

                <motion.div 
                  variants={itemVariants}
                  className="flex justify-center items-start gap-6"
                >
                  <div className="w-12 h-12 relative flex-shrink-0">
                    <Image
                      src={iconImage}
                      alt="Feature icon"
                      width={48}
                      height={48}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-1 text-[#2B2B2B] text-base font-normal font-['Poppins'] leading-normal text-left max-w-md">
                    Lorem ipsum dolor sit amet consectetur. Quam ut consequat at a. Diam lacus platea
                  </div>
                </motion.div>

                <motion.div 
                  variants={itemVariants}
                  className="flex justify-center items-start gap-6"
                >
                  <div className="w-12 h-12 relative flex-shrink-0">
                    <Image
                      src={iconImage}
                      alt="Feature icon"
                      width={48}
                      height={48}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-1 text-[#2B2B2B] text-base font-normal font-['Poppins'] leading-normal text-left max-w-md">
                    Lorem ipsum dolor sit amet consectetur. Quam ut consequat at a. Diam lacus platea
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
