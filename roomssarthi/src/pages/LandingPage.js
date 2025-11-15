import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import CTA from '../components/CTA';
import Footer from '../components/Footer';
import '../App.css';
import Login from './Login';

export default function LandingPage() {
  const [activeNav, setActiveNav] = useState('home');

  return (
    <div>
      <Navbar activeNav={activeNav} setActiveNav={setActiveNav} />
      <Hero />
      <Stats />
      <Features />
      <HowItWorks />
      <CTA />
      <Login/>
      <Footer />
    </div>
  );
}
