"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import tylerImage from "../../images/tyler-lastovich-AVzByhROPbs-unsplash 1.svg";
import plantMainIcon from "../../images/plantmain.svg";
import plantIcon from "../../images/plant.svg";

export default function WellbeingStartsSection() {
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

  const heroVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as const
      }
    }
  };

  const featuresVariants = {
    initial: { opacity: 0, y: 100 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.3,
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

  // Features data array
  const features = [
    { id: 1, title: "Plant Protective", icon: plantIcon },
    { id: 2, title: "Plant Protective", icon: plantIcon },
    { id: 3, title: "Plant Protective", icon: plantIcon },
    { id: 4, title: "Plant Protective", icon: plantIcon }
  ];

  return (
    <section className="min-h-screen py-16 flex items-center justify-center">
      <div className="w-full max-w-[1400px] px-6 md:px-12 lg:px-16">
        <motion.div
          variants={sectionVariants}
          initial="initial"
          animate="animate"
          className="relative"
        >
          {/* Hero Section with Background Image */}
          <motion.div 
            variants={heroVariants}
            className="relative h-[600px] lg:h-[705px] rounded-xl overflow-hidden"
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <Image
                src={tylerImage}
                alt="Wellbeing background"
                width={1302}
                height={667}
                className="w-full h-full object-cover rounded-xl"
              />
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/40 rounded-xl" />
            </div>

            {/* Centered Content */}
            <div className="absolute inset-0 flex flex-col justify-center items-center px-4">
              <div className="flex flex-col justify-center items-center gap-8 lg:gap-11 text-center">
                {/* Plant Main Icon */}
                <div className="w-20 lg:w-24 h-16 lg:h-20 flex justify-center items-center rounded-lg border-2 border-white">
                  <Image
                    src={plantMainIcon}
                    alt="Plant main icon"
                    width={50}
                    height={40}
                    className="object-contain"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col justify-start items-center gap-6 lg:gap-7">
                  <div className="flex flex-col justify-start items-center gap-3">
                    {/* Title */}
                    <h2 className="w-full max-w-[640px] text-center text-white text-2xl md:text-3xl lg:text-4xl font-semibold font-['Poppins'] leading-tight">
                      Wellbeing starts with welldoing
                    </h2>
                    
                    {/* Description */}
                    <p className="w-full max-w-[650px] text-center text-white text-sm md:text-base font-normal font-['Poppins'] leading-normal">
                      Lorem ipsum dolor sit amet consectetur. Quam ut consequat at a. Diam lacus platea orci vel elit blandit facilisis enim risus. Ut tristique eget integer odio nec.
                    </p>
                  </div>
                  
                  {/* CTA Button */}
                  <Link href="/sign-up">
                    <button className="w-56 lg:w-64 h-12 lg:h-14 px-4 py-3 lg:py-4 rounded-[67px] border border-white/20 flex justify-center items-center gap-4 hover:bg-white/10 transition-colors">
                      <span className="text-center text-white text-lg lg:text-xl font-semibold font-['Poppins'] leading-normal">
                        Join now
                      </span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Overlapping Features Section - 50% overlap */}
          <motion.div 
            variants={featuresVariants}
            className="relative -mt-24 lg:-mt-32 flex justify-center"
          >
            <div className="w-full max-w-[900px] md:max-w-[800px] lg:max-w-[1000px] px-2 md:px-10 lg:px-16 py-12 md:py-18 lg:py-24 bg-[#EBBFAE] rounded-xl overflow-hidden shadow-lg">
              {/* Features Grid - Responsive: 1 col mobile, 2x2 tablet, 4 cols desktop */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                {features.map((feature) => (
                  <motion.div 
                    key={feature.id}
                    variants={itemVariants}
                    className="flex flex-col justify-center items-center gap-4"
                  >
                    <div className="relative flex justify-center items-center">
                      <Image
                        src={feature.icon}
                        alt={`${feature.title} icon`}
                        width={80}
                        height={80}
                        className="object-contain"
                      />
                    </div>
                    <p className="text-center text-[#2B2B2B] text-lg font-normal font-['Poppins'] leading-normal">
                      {feature.title}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
