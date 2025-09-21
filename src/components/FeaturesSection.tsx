"use client";

import React from "react";
import { motion } from "framer-motion";

const features = [
  {
    icon: "🎓",
    title: "Learn & Grow",
    description: "Access cutting-edge workshops, tutorials, and hands-on coding sessions with Google technologies.",
    color: "from-blue-500 to-blue-600"
  },
  {
    icon: "🤝",
    title: "Network & Connect",
    description: "Meet like-minded developers, industry experts, and potential collaborators in your area.",
    color: "from-green-500 to-green-600"
  },
  {
    icon: "🚀",
    title: "Build & Ship",
    description: "Work on real projects, contribute to open source, and showcase your skills to the community.",
    color: "from-purple-500 to-purple-600"
  },
  {
    icon: "💡",
    title: "Innovation Hub",
    description: "Stay updated with the latest Google technologies, trends, and best practices in software development.",
    color: "from-orange-500 to-orange-600"
  },
  {
    icon: "🏆",
    title: "Skill Recognition",
    description: "Earn certificates, badges, and recognition for your contributions and learning achievements.",
    color: "from-red-500 to-red-600"
  },
  {
    icon: "🌍",
    title: "Global Community",
    description: "Connect with GDG chapters worldwide and participate in global events and initiatives.",
    color: "from-teal-500 to-teal-600"
  }
];

export const FeaturesSection: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Why Join <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">GDG?</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the benefits of being part of a thriving developer community
            that empowers growth, innovation, and collaboration.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 h-full">
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-2xl">{feature.icon}</span>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover Effect Line */}
                <div className={`h-1 w-0 bg-gradient-to-r ${feature.color} mt-6 group-hover:w-full transition-all duration-500 rounded-full`} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-lg transition-all duration-200"
          >
            Start Your Journey
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};
