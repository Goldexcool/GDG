"use client";

import React from "react";
import { Header } from "./Header";
import { HeroSection } from "./HeroSection";
import { WellbeingSection } from "./WellbeingSection";
import { OrganicProduceSection } from "./OrganicProduceSection";
import YouAreWhatYouEatSection from "./YouAreWhatYouEatSection";
import WellbeingStartsSection from "./WellbeingStartsSection";
import Footer from "./Footer";

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <WellbeingSection />
        <OrganicProduceSection />
        <YouAreWhatYouEatSection />
        <WellbeingStartsSection />
        {/* We'll add more sections step by step */}
      </main>
      <Footer />
    </div>
  );
};