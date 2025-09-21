"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const navigationItems = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Team", href: "#team" },
  { label: "Contact", href: "#contact" },
];

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const headerVariants = {
    initial: { y: -100, opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as const
      }
    }
  };

  const logoVariants = {
    initial: { scale: 0, rotate: -180 },
    animate: { 
      scale: 1, 
      rotate: 0,
      transition: {
        duration: 1,
        ease: [0.22, 1, 0.36, 1] as const,
        delay: 0.2
      }
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.3 }
    }
  };

  const navItemVariants = {
    initial: { y: -30, opacity: 0 },
    animate: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as const,
        delay: 0.5 + i * 0.1
      }
    }),
    hover: {
      y: -3,
      transition: { duration: 0.2 }
    }
  };

  const hamburgerVariants = {
    initial: { scale: 0, rotate: 180 },
    animate: { 
      scale: 1, 
      rotate: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as const,
        delay: 0.7
      }
    }
  };

  const lineVariants = {
    closed: { rotate: 0, y: 0 },
    open: { rotate: 45, y: 6 }
  };

  const middleLineVariants = {
    closed: { opacity: 1 },
    open: { opacity: 0 }
  };

  const bottomLineVariants = {
    closed: { rotate: 0, y: 0 },
    open: { rotate: -45, y: -6 }
  };

  const mobileMenuVariants = {
    initial: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut" as const
      }
    },
    animate: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1] as const,
        staggerChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut" as const
      }
    }
  };

  const mobileItemVariants = {
    initial: { x: -50, opacity: 0 },
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1] as const
      }
    }
  };

  return (
    <motion.header
      variants={headerVariants}
      initial="initial"
      animate="animate"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-lg shadow-lg' 
          : 'bg-white'
      }`}
    >
      <div className="max-w-[1300px] mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            variants={logoVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            className="cursor-pointer"
          >
            <Image
              src="/logo.svg"
              alt="Logo"
              width={91}
              height={26}
              priority
              className="h-auto"
            />
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-12">
            {navigationItems.map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                variants={navItemVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                custom={index}
                className="relative group"
                style={{
                  color: '#2B2B2B',
                  fontSize: '16px',
                  fontFamily: 'Poppins',
                  fontWeight: '400',
                  lineHeight: '24px',
                }}
              >
                {item.label}
                
                {/* Animated underline */}
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#285E67] origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ 
                    scaleX: 1,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                />

                {/* Hover glow effect */}
                <motion.div
                  className="absolute inset-0 bg-[#285E67]/5 rounded-lg -z-10"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ 
                    opacity: 1, 
                    scale: 1.1,
                    transition: { duration: 0.2 }
                  }}
                />
              </motion.a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            variants={hamburgerVariants}
            initial="initial"
            animate="animate"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 z-50"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              variants={lineVariants}
              animate={isMenuOpen ? "open" : "closed"}
              className="w-6 h-0.5 bg-[#2B2B2B] rounded-full"
            />
            <motion.div
              variants={middleLineVariants}
              animate={isMenuOpen ? "open" : "closed"}
              className="w-6 h-0.5 bg-[#2B2B2B] rounded-full"
            />
            <motion.div
              variants={bottomLineVariants}
              animate={isMenuOpen ? "open" : "closed"}
              className="w-6 h-0.5 bg-[#2B2B2B] rounded-full"
            />
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              variants={mobileMenuVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="md:hidden overflow-hidden bg-white border-t border-gray-100"
            >
              <div className="py-6 space-y-6">
                {navigationItems.map((item, index) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    variants={mobileItemVariants}
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                    style={{
                      color: '#2B2B2B',
                      fontSize: '16px',
                      fontFamily: 'Poppins',
                      fontWeight: '400',
                      lineHeight: '24px',
                    }}
                    whileHover={{
                      x: 10,
                      transition: { duration: 0.2 }
                    }}
                  >
                    {item.label}
                  </motion.a>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};
