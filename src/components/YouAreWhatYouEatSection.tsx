"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import illustrationImage from "../../images/Illustration 2.svg";
import vectorIcon from "../../images/vectorrrr.svg";

export default function YouAreWhatYouEatSection() {
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
    <section className="min-h-screen py-16 flex items-center justify-center">
      <div className="w-full max-w-[1400px] px-6 md:px-12 lg:px-16">
        <motion.div
          variants={sectionVariants}
          initial="initial"
          animate="animate"
          className="bg-[#F4F4F4] rounded-xl overflow-hidden"
        >
          {/* Desktop Layout - CSS Grid */}
          <div className="hidden lg:grid lg:grid-cols-2 lg:gap-16 lg:p-12 lg:min-h-[400px] lg:items-center">
            {/* Left - Illustration */}
            <motion.div 
              variants={imageVariants}
              className="flex justify-center items-center"
            >
              <Image
                src={illustrationImage}
                alt="Food illustration"
                width={400}
                height={500}
                className="w-full h-auto max-w-md object-contain"
              />
            </motion.div>

            {/* Right - Content */}
            <motion.div 
              variants={contentVariants}
              className="space-y-8"
            >
              {/* Title */}
              <div>
                <h2 className="justify-start text-[#2B2B2B] text-2xl md:text-3xl lg:text-[43px] font-semibold font-['Poppins'] leading-loose">
                  You are what you eat
                </h2>
              </div>

              {/* Feature Cards Grid */}
              <div className="grid grid-cols-2 gap-8">
                <motion.div 
                  variants={itemVariants}
                  className="flex flex-col items-start space-y-4"
                >
                  <div className="px-4 py-3.5 bg-[#EBBFAE] rounded-lg">
                    <Image
                      src={vectorIcon}
                      alt="Feature icon"
                      width={32}
                      height={36}
                      className="object-contain"
                    />
                  </div>
                  <div className="self-stretch">
                    <p className="justify-start text-[#0F0F0F] text-sm md:text-base lg:text-lg font-normal font-['Poppins'] leading-normal">
                      Lorem ipsum dolor sit amet consectetur. Quam ut consequat at a. Diam lacus platea orci vel elit.
                    </p>
                  </div>
                </motion.div>

                <motion.div 
                  variants={itemVariants}
                  className="flex flex-col items-start space-y-4"
                >
                  <div className="px-4 py-3.5 bg-[#EBBFAE] rounded-lg">
                    <Image
                      src={vectorIcon}
                      alt="Feature icon"
                      width={32}
                      height={36}
                      className="object-contain"
                    />
                  </div>
                  <div className="self-stretch">
                    <p className="justify-start text-[#0F0F0F] text-sm md:text-base lg:text-lg font-normal font-['Poppins'] leading-normal">
                      Lorem ipsum dolor sit amet consectetur. Quam ut consequat at a. Diam lacus platea orci vel elit.
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Mobile/Tablet Layout - Improved Grid */}
          <div className="lg:hidden p-6 md:p-8">
            <motion.div 
              variants={contentVariants}
              className="space-y-8 text-center"
            >
              {/* Centered Illustration for Mobile */}
              <motion.div 
                variants={imageVariants}
                className="flex justify-center items-center"
              >
                <Image
                  src={illustrationImage}
                  alt="Food illustration"
                  width={300}
                  height={375}
                  className="w-full h-auto max-w-xs object-contain"
                />
              </motion.div>

              {/* Title - Centered */}
              <div>
                <h2 className="text-center text-[#2A2A2A] text-2xl md:text-3xl lg:text-4xl font-semibold font-['Poppins'] leading-loose">
                  You are what you eat
                </h2>
              </div>

              {/* Feature Cards - Centered */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div 
                  variants={itemVariants}
                  className="space-y-4 flex flex-col items-center text-center"
                >
                  <div className="px-4 py-3.5 bg-[#EBBFAE] rounded-lg w-fit">
                    <Image
                      src={vectorIcon}
                      alt="Feature icon"
                      width={32}
                      height={36}
                      className="object-contain"
                    />
                  </div>
                  <p className="text-center text-[#2B2B2B] text-sm md:text-base font-normal font-['Poppins'] leading-normal max-w-sm">
                    Lorem ipsum dolor sit amet consectetur. Quam ut consequat at a. Diam lacus platea orci vel elit.
                  </p>
                </motion.div>

                <motion.div 
                  variants={itemVariants}
                  className="space-y-4 flex flex-col items-center text-center"
                >
                  <div className="px-4 py-3.5 bg-[#EBBFAE] rounded-lg w-fit">
                    <Image
                      src={vectorIcon}
                      alt="Feature icon"
                      width={32}
                      height={36}
                      className="object-contain"
                    />
                  </div>
                  <p className="text-center text-[#2B2B2B] text-sm md:text-base font-normal font-['Poppins'] leading-normal max-w-sm">
                    Lorem ipsum dolor sit amet consectetur. Quam ut consequat at a. Diam lacus platea orci vel elit.
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
