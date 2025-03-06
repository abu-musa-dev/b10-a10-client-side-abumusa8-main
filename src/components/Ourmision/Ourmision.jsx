import React, { useEffect } from 'react';
import { Slide } from 'react-awesome-reveal'; // Importing the Slide animation

const OurMission = ({ isDarkMode }) => {
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, [isDarkMode]);

  return (
    <div className="py-16">
      <div className="max-w-6xl mx-auto px-6">
        <h2
          className="text-4xl font-bold text-center mb-6"
          style={{ color: "var(--text-color)" }}
        >
          Our Impact
        </h2>
        <p
          className="text-lg text-center mb-6"
          style={{ color: "var(--text-color)" }}
        >
          Over the past 5 years, Dreem Foundation has helped over 10,000 children access education, healthcare, and clean water. With your support, we continue to make a lasting impact on communities in need.
        </p>
        <div className="text-center mt-8">
          {/* Using Slide animation with triggerOnce to animate only once */}
          <Slide triggerOnce delay={500}>
            <button
              className="btn px-6 py-3 text-lg font-semibold"
              style={{
                backgroundColor: "var(--button-bg)",
              
              }}
            >
              Read Our Impact Report
            </button>
          </Slide>
        </div>
      </div>
    </div>
  );
};

export default OurMission;
