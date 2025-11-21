import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Vision from './components/Vision';
import Footer from './components/Footer';
import { Routes, Route } from "react-router-dom";
import InstantCheckupsPage from "./pages/InstantCheckupsPage";
import DoctorsListPage from "./pages/DoctorsListPage";

function App() {
  return (
    <>
      <Header />
      <main>
      <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <Features />
              <HowItWorks />
              <Vision />
            </>
          } />

          <Route path="/checkups" element={<InstantCheckupsPage />} />
          <Route path="/doctors" element={<DoctorsListPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
