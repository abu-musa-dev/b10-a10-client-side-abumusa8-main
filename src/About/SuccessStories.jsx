import React, { useEffect, useState } from "react";
import { Typewriter } from 'react-simple-typewriter';  // Import Typewriter

const SuccessStories = ({ isDarkMode }) => {
  const [textLength, setTextLength] = useState(0);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const stories = [
    {
      name: "Ayesha Rahman",
      story: "Thanks to Dream Donation, we received warm clothes and blankets, which helped us survive the harsh winter. Their support gave us hope for a better future.",
      image: "https://i.ibb.co/L89BW3V/download-16.jpg",
    },
    {
      name: "Kamrul Hasan",
      story: "The food donations from Dream Donation made a huge difference in our lives. We are deeply grateful for the kindness and generosity that changed our lives.",
      image: "https://i.ibb.co/VNNNkgH/download-17.jpg",
    },
  ];

  useEffect(() => {
    setTextLength(stories[0].story.length);
  }, [stories]);

  return (
    <section className="py-16 px-4 text-center">
      <h2 className="text-3xl font-extrabold mb-8" style={{ color: "var(--text-color)" }}>
        Success Stories
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-10">
        {stories.map((story, index) => (
          <div
            key={index}
            className="p-6 shadow-lg rounded-md"
            style={{
              backgroundColor: "var(--bg-color)", 
              color: "var(--text-color)",
            }}
          >
            <img
              src={story.image}
              alt={`Portrait of ${story.name}`}
              className="w-32 h-32 mx-auto rounded-full mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">{story.name}</h3>
            <p className="story-text">
              <Typewriter
                words={[story.story]}
                loop={1}  // You can adjust the loop as needed
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1500}
              />
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SuccessStories;
