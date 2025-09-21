"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useUser } from '@clerk/nextjs';
import jaredRiceImage from "../../images/jared-rice-xce530fBHrk-unsplash 1.svg";
import katherineHanlonImage from "../../images/katherine-hanlon-mod2s3-qFOc-unsplash 1.svg";

export const HeroSection: React.FC = () => {
  const { isSignedIn, isLoaded } = useUser();

  const heroVariants = {
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

  const subtitleVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as const,
        delay: 0.2
      }
    }
  };

  const buttonVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as const,
        delay: 0.4
      }
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.3 }
    },
    tap: {
      scale: 0.95,
      transition: { duration: 0.1 }
    }
  };

  const imageVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 1,
        ease: [0.22, 1, 0.36, 1] as const,
        delay: 0.6
      }
    }
  };

  const leftImageVariants = {
    ...imageVariants,
    animate: {
      ...imageVariants.animate,
      transition: {
        ...imageVariants.animate.transition,
        delay: 0.6
      }
    }
  };

  const rightImageVariants = {
    ...imageVariants,
    animate: {
      ...imageVariants.animate,
      transition: {
        ...imageVariants.animate.transition,
        delay: 0.8
      }
    }
  };

  return (
    <section className="min-h-screen pt-24 pb-[20px] bg-white flex items-center">
      <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
        <motion.div
          variants={heroVariants}
          initial="initial"
          animate="animate"
          className="text-center mb-12"
        >
          {/* Main Heading - Responsive */}
          <motion.h1
            variants={titleVariants}
            className="mb-8"
          >
            {/* Desktop/Tablet Title */}
            <span className="hidden md:block" style={{
              color: '#2A2A2A',
              fontSize: '65.34px',
              fontFamily: 'Poppins',
              fontWeight: '600',
              lineHeight: '82px',
              textAlign: 'center',
              wordWrap: 'break-word'
            }}>
              The dawn of a new era in health is here
            </span>
            
            {/* Mobile Title */}
            <span className="block md:hidden text-center text-[#2A2A2A] text-4xl font-semibold font-['Poppins'] leading-10">
              The dawn of a new era in health is here
            </span>
          </motion.h1>

          {/* Subtitle - Responsive */}
          <motion.p
            variants={subtitleVariants}
            className="mb-12 max-w-4xl mx-auto"
          >
            {/* Desktop/Tablet Subtitle */}
            <span className="hidden md:block" style={{
              color: '#2B2B2B',
              fontSize: '16px',
              fontFamily: 'Poppins',
              fontWeight: '400',
              lineHeight: '24px',
              textAlign: 'center',
              wordWrap: 'break-word'
            }}>
              Lorem ipsum dolor sit amet consectetur. Quam ut consequat at a. Diam lacus platea orci vel elit blandit facilisis
            </span>
            
            {/* Mobile Subtitle */}
            <span className="block md:hidden text-center text-[#2A2A2A] text-base font-normal font-['Poppins'] leading-normal">
              Lorem ipsum dolor sit amet consectetur. Quam ut consequat at a. Diam lacus platea orci vel elit blandit facilisis 
            </span>
          </motion.p>

          {/* CTA Button - Responsive */}
          <motion.div
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className="mx-auto"
          >
            {!isLoaded ? (
              // Loading state
              <div className="px-6 py-4 bg-gray-300 animate-pulse rounded-full">
                <span className="text-transparent text-lg font-semibold font-['Poppins']">
                  Loading...
                </span>
              </div>
            ) : !isSignedIn ? (
              // Not signed in - show Join now button
              <Link href="/sign-up">
                {/* Desktop/Tablet Button */}
                <div className="hidden md:block" style={{
                  padding: '16px',
                  background: '#285E67',
                  borderRadius: '67px',
                  border: 'none',
                  cursor: 'pointer',
                  minWidth: '200px',
                  display: 'inline-flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  <span style={{
                    color: 'white',
                    fontSize: '21.33px',
                    fontFamily: 'Poppins',
                    fontWeight: '600',
                    lineHeight: '24px',
                    textAlign: 'center',
                    wordWrap: 'break-word'
                  }}>
                    Join now
                  </span>
                </div>
                
                {/* Mobile Button */}
                <div className="block md:hidden px-6 py-3 bg-[#285E67] rounded-full">
                  <span className="text-white text-lg font-semibold font-['Poppins']">
                    Join now
                  </span>
                </div>
              </Link>
            ) : (
              // Signed in - show Go to Dashboard button
              <Link href="/dashboard">
                {/* Desktop/Tablet Button */}
                <div className="hidden md:block" style={{
                  padding: '16px',
                  background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 50%, #FF007F 100%)',
                  borderRadius: '67px',
                  border: 'none',
                  cursor: 'pointer',
                  minWidth: '200px',
                  display: 'inline-flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  <span style={{
                    color: 'white',
                    fontSize: '21.33px',
                    fontFamily: 'Poppins',
                    fontWeight: '600',
                    lineHeight: '24px',
                    textAlign: 'center',
                    wordWrap: 'break-word'
                  }}>
                    Go to Dashboard
                  </span>
                </div>
                
                {/* Mobile Button */}
                <div className="block md:hidden px-6 py-3 bg-gradient-to-r from-orange-500 via-yellow-500 to-pink-500 rounded-full">
                  <span className="text-white text-lg font-semibold font-['Poppins']">
                    Go to Dashboard
                  </span>
                </div>
              </Link>
            )}
          </motion.div>
        </motion.div>

        {/* Hero Images */}
        <div className="flex justify-center items-start gap-12 flex-wrap">
          {/* Left Image - Jared Rice */}
          <motion.div
            variants={leftImageVariants}
            initial="initial"
            animate="animate"
            className="flex-1 min-w-[300px] max-w-[637px]"
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.3 }
            }}
          >
            <Image
              src={jaredRiceImage}
              alt="Healthcare professional"
              width={637}
              height={391}
              className="w-full h-96 object-cover rounded-2xl shadow-lg"
            />
          </motion.div>

          {/* Right Image */}
          <motion.div
            variants={rightImageVariants}
            initial="initial"
            animate="animate"
            className="flex-1 min-w-[300px] max-w-[637px]"
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.3 }
            }}
          >
            <Image
              src={katherineHanlonImage}
              alt="Modern healthcare technology"
              width={637}
              height={390}
              className="w-full h-96 object-cover rounded-2xl shadow-lg"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
