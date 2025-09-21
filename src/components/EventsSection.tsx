"use client";

import React from "react";
import { motion } from "framer-motion";

const events = [
  {
    id: 1,
    title: "Android Dev Workshop",
    date: "Dec 15, 2024",
    time: "2:00 PM - 5:00 PM",
    location: "Tech Hub Lagos",
    type: "Workshop",
    attendees: 45,
    color: "from-green-500 to-green-600",
    image: "🤖"
  },
  {
    id: 2,
    title: "Cloud Architecture Masterclass",
    date: "Dec 20, 2024",
    time: "10:00 AM - 4:00 PM",
    location: "Online",
    type: "Masterclass",
    attendees: 120,
    color: "from-blue-500 to-blue-600",
    image: "☁️"
  },
  {
    id: 3,
    title: "AI/ML Study Jam",
    date: "Dec 28, 2024",
    time: "6:00 PM - 8:00 PM",
    location: "Innovation Center",
    type: "Study Jam",
    attendees: 80,
    color: "from-purple-500 to-purple-600",
    image: "🧠"
  }
];

const upcomingEvents = [
  { title: "Flutter Firebase Workshop", date: "Jan 5, 2025" },
  { title: "Web Performance Optimization", date: "Jan 12, 2025" },
  { title: "Google I/O Extended", date: "Jan 20, 2025" }
];

export const EventsSection: React.FC = () => {
  return (
    <section id="events" className="py-20 bg-white">
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
            Upcoming <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">Events</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Join our exciting events and expand your knowledge with hands-on workshops,
            tech talks, and networking opportunities.
          </p>
        </motion.div>

        {/* Featured Events */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="group cursor-pointer"
            >
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden h-full">
                {/* Event Header */}
                <div className={`bg-gradient-to-r ${event.color} p-6 text-white relative overflow-hidden`}>
                  <div className="text-6xl opacity-20 absolute -top-4 -right-4">
                    {event.image}
                  </div>
                  <div className="relative z-10">
                    <div className="text-sm font-medium opacity-90 mb-2">
                      {event.type}
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:scale-105 transition-transform duration-300">
                      {event.title}
                    </h3>
                    <div className="text-sm opacity-90">
                      {event.attendees} attendees registered
                    </div>
                  </div>
                </div>

                {/* Event Details */}
                <div className="p-6">
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-600">
                      <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{event.location}</span>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full mt-6 bg-gradient-to-r ${event.color} text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200`}
                  >
                    Register Now
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* More Events Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gray-50 rounded-3xl p-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                More Events Coming Soon
              </h3>
              <p className="text-gray-600 mb-6">
                Stay tuned for more exciting events throughout the year. 
                Subscribe to our newsletter to get notified about upcoming workshops and tech talks.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
              >
                Subscribe to Updates
              </motion.button>
            </div>

            <div className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold text-gray-900">{event.title}</h4>
                    <span className="text-sm text-gray-500">{event.date}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
