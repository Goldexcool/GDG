"use client";

import React from "react";
import { motion } from "framer-motion";

export const AboutSection: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          {/* Content */}
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">GDG</span>
            </h2>
            
            <div className="space-y-6 text-gray-600 leading-relaxed">
              <p className="text-lg">
                Google Developer Groups (GDG) are community-driven organizations that bring 
                together developers, designers, and tech enthusiasts who are interested in 
                Google technologies.
              </p>
              
              <p className="text-lg">
                Our mission is to create an inclusive environment where everyone can learn, 
                share knowledge, and build amazing things together. Whether you&apos;re a beginner 
                or an experienced developer, there&apos;s always something new to discover.
              </p>
              
              <p className="text-lg">
                We organize regular meetups, workshops, hackathons, and tech talks featuring 
                the latest Google technologies including Android, Web, Cloud, AI/ML, and more.
              </p>
            </div>

            {/* Stats */}
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-2 gap-6 mt-8 pt-8 border-t border-gray-200"
            >
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">2018</div>
                <div className="text-gray-600">Founded</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600 mb-2">15+</div>
                <div className="text-gray-600">Cities</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Visual Elements */}
          <motion.div variants={itemVariants} className="relative">
            <div className="relative z-10">
              {/* Main Card */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-3xl p-8 shadow-2xl"
              >
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold text-xl">G</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">Google Developer Groups</h3>
                      <p className="text-gray-600">Community-driven learning</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-xl">
                      <div className="text-2xl mb-2">🚀</div>
                      <div className="font-semibold text-gray-900">Innovation</div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-xl">
                      <div className="text-2xl mb-2">🤝</div>
                      <div className="font-semibold text-gray-900">Collaboration</div>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-xl">
                      <div className="text-2xl mb-2">📚</div>
                      <div className="font-semibold text-gray-900">Learning</div>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-xl">
                      <div className="text-2xl mb-2">🌟</div>
                      <div className="font-semibold text-gray-900">Growth</div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Floating Elements */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl opacity-20"
              />
              
              <motion.div
                animate={{
                  y: [0, 15, 0],
                  rotate: [0, -5, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
                className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-r from-green-400 to-blue-400 rounded-2xl opacity-20"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
