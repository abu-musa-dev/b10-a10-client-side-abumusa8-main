import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar/Navbar"; 
import Banner from "../components/Banner/Banner";
import RunningCampaigns from "../components/RunningCampaigns/RunningCampaigns";
import About from "../About/About";
import DonationStats from "../About/DonationStats";
import SuccessStories from "../About/SuccessStories";
import Ourmision from "../components/Ourmision/Ourmision";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";

const Home = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("homeTheme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
    } else {
      setIsDarkMode(false);
    }
  }, []);

  const handleThemeToggle = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      const theme = newMode ? "dark" : "light";
      localStorage.setItem("homeTheme", theme);
      document.documentElement.setAttribute("data-theme", theme);
      return newMode;
    });
  };

  return (
    <div className={`home ${isDarkMode ? "dark-mode" : ""}`}>
      <Navbar isDarkMode={isDarkMode} onThemeToggle={handleThemeToggle} />
      <Banner />
      <RunningCampaigns />
      <About />
      <DonationStats isDarkMode={isDarkMode} />
      <SuccessStories isDarkMode={isDarkMode} />
      <Ourmision />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Home;
