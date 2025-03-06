import React, { useEffect } from "react";
import 'animate.css/animate.min.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

const About = ({ isDarkMode }) => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      offset: 100,
      easing: 'ease-in-out',
      delay: 100,
      once: true,
    });

    // Dynamically set data-theme for dark mode
    if (isDarkMode) {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, [isDarkMode]);

  return (
    <section className={`about-section ${isDarkMode ? "dark-mode" : ""} py-10 px-6 sm:px-12 animate__animated animate__fadeInUp`}>
      <div className="max-w-screen-lg mx-auto">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6" data-aos="fade-up">About Us</h2>
        <p className="text-lg text-gray-600 mb-6" data-aos="fade-up" data-aos-delay="200">
          "Dream Foundation" is a platform dedicated to bringing people together to support causes that make a real difference...
        </p>

        <h3 className="text-2xl font-semibold text-gray-700 mb-4" data-aos="fade-up" data-aos-delay="400">How You Can Contribute to the Dream:</h3>
        <ul className="space-y-4 text-lg text-gray-600">
          <li className="flex items-start" data-aos="fade-right">
            <span className="text-2xl text-blue-500 mr-3">💰</span>
            <div>
              <strong className="font-semibold">Monetary Donations:</strong> Your financial contribution directly supports...
            </div>
          </li>
          <li className="flex items-start" data-aos="fade-right" data-aos-delay="200">
            <span className="text-2xl text-blue-500 mr-3">📦</span>
            <div>
              <strong className="font-semibold">Material Donations:</strong> Donate food, clothing...
            </div>
          </li>
          <li className="flex items-start" data-aos="fade-right" data-aos-delay="400">
            <span className="text-2xl text-blue-500 mr-3">🤝</span>
            <div>
              <strong className="font-semibold">Volunteer:</strong> Contribute your time, skills...
            </div>
          </li>
          <li className="flex items-start" data-aos="fade-right" data-aos-delay="600">
            <span className="text-2xl text-blue-500 mr-3">📣</span>
            <div>
              <strong className="font-semibold">Spread the Word:</strong> Help us reach more people...
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default About;
