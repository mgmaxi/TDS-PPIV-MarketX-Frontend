"use client";

import Hero from "./components/Hero";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import Categories from "./components/Categories";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-gray-800">
      <Hero />
      <Features />
      <HowItWorks />
      <Categories />
      <CTA />
      <Footer />
    </main>
  );
}





