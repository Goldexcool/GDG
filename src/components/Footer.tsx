'use client';

import { motion } from 'framer-motion';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const sectionVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as const,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }
    }
  };

  const socialIcons = [
    { name: 'Facebook', icon: Facebook, url: 'https://facebook.com', size: 20 },
    { name: 'Twitter', icon: Twitter, url: 'https://twitter.com', size: 20 },
    { name: 'Instagram', icon: Instagram, url: 'https://instagram.com', size: 20 },
    { name: 'LinkedIn', icon: Linkedin, url: 'https://linkedin.com', size: 20 }
  ];

  const navLinks = ['About', 'Services', 'Team', 'Contact'];

  return (
    <footer className="py-8 flex justify-center bg-[#285E67] overflow-hidden">
      <div className="w-full max-w-[1300px] px-6 md:px-12 lg:px-36">
        <motion.div
          variants={sectionVariants}
          initial="initial"
          animate="animate"
          className="space-y-6"
        >
          {/* Desktop Layout */}
          <div className="hidden lg:flex justify-between items-center">
            {/* Logo Section - Left */}
            <motion.div 
              variants={itemVariants}
              className="flex items-center gap-3"
            >
              <div className="w-6 h-6 bg-gray-200 rounded-full" />
              <div className="text-white text-xl font-semibold font-['Poppins'] leading-normal">
                Logo
              </div>
            </motion.div>

            {/* Navigation Links - Right */}
            <motion.div 
              variants={itemVariants}
              className="flex justify-start items-center gap-10"
            >
              {navLinks.map((link, index) => (
                <motion.div
                  key={link}
                  variants={itemVariants}
                  className="text-white text-base font-normal font-['Poppins'] leading-normal hover:text-gray-200 transition-colors cursor-pointer"
                >
                  {link}
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Tablet Layout */}
          <div className="hidden md:flex lg:hidden flex-col space-y-4">
            {/* Top Row - Logo and first 2 nav items */}
            <div className="flex justify-between items-center">
              <motion.div 
                variants={itemVariants}
                className="flex items-center gap-3"
              >
                <div className="w-6 h-6 bg-gray-200 rounded-full" />
                <div className="text-white text-xl font-semibold font-['Poppins'] leading-normal">
                  Logo
                </div>
              </motion.div>
              
              <motion.div 
                variants={itemVariants}
                className="flex justify-start items-center gap-8"
              >
                {navLinks.slice(0, 2).map((link, index) => (
                  <motion.div
                    key={link}
                    variants={itemVariants}
                    className="text-white text-base font-normal font-['Poppins'] leading-normal hover:text-gray-200 transition-colors cursor-pointer"
                  >
                    {link}
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Second Row - Remaining nav items aligned right */}
            <div className="flex justify-end">
              <motion.div 
                variants={itemVariants}
                className="flex justify-start items-center gap-8"
              >
                {navLinks.slice(2).map((link, index) => (
                  <motion.div
                    key={link}
                    variants={itemVariants}
                    className="text-white text-base font-normal font-['Poppins'] leading-normal hover:text-gray-200 transition-colors cursor-pointer"
                  >
                    {link}
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden space-y-4">
            {/* Logo */}
            <motion.div 
              variants={itemVariants}
              className="flex items-center gap-3"
            >
              <div className="w-6 h-6 bg-gray-200 rounded-full" />
              <div className="text-white text-xl font-semibold font-['Poppins'] leading-normal">
                Logo
              </div>
            </motion.div>

            {/* Navigation in 2x2 grid */}
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-2 gap-2 w-fit"
            >
              {navLinks.map((link, index) => (
                <motion.div
                  key={link}
                  variants={itemVariants}
                  className="text-white text-base font-normal font-['Poppins'] leading-normal hover:text-gray-200 transition-colors cursor-pointer w-fit"
                >
                  {link}
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Social Media Icons - Always aligned with logo */}
          <motion.div 
            variants={itemVariants}
            className="flex justify-start items-center gap-6"
          >
            {socialIcons.map((social, index) => {
              const IconComponent = social.icon;
              return (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={itemVariants}
                  className="w-10 h-10 flex justify-center items-center cursor-pointer hover:scale-110 transition-transform bg-white/10 hover:bg-white/20 rounded-lg"
                >
                  <IconComponent 
                    size={social.size} 
                    className="text-white" 
                  />
                </motion.a>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
