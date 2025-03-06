import React from "react";
import "tailwindcss/tailwind.css";

const Banner = () => {
  const slides = [
    {
      url: "https://i.ibb.co/zFr5DcS/pexels-newmanphotographs-14831647.jpg",
      title: "Help Make Their Dreams Come True: Winter Donation Campaign",
      description: "Every donation is a step toward brighter futures. Help us provide warm clothes and the hope of a better tomorrow to those in need this winter."
    },
    {
      url: "https://i.ibb.co/zxdyy2q/pexels-kokorevas-11319521.jpg",
      title: "A Dream of Warmth: Support Our Winter Donation Campaign",
      description: "Join our effort to make this winter a little warmer for the homeless. Your generosity can light the way for those who dream of a safe, warm home."
    },
    {
      url: "https://i.ibb.co/ZKp8sXv/pexels-newmanphotographs-14831814.jpg",
      title: "Realize Their Dreams: Winter Donation Campaign",
      description: "Donate to help provide not just shelter, but the dream of a better life. Your contribution can bring warmth, safety, and new opportunities."
    },
  ];
  

  return (
    <section className="container mx-auto ">
      <div className="relative carousel w-full rounded-lg overflow-hidden shadow-xl">
        {slides.map((slide, index) => (
          <div
            id={`slide${index}`}
            className="carousel-item relative w-full"
            key={index}
          >
            <img
              src={slide.url}
              className="w-full h-[450px] object-cover transition-transform duration-1000 ease-in-out transform hover:scale-105"
              alt={slide.title}
            />
            <div className="absolute bottom-0 bg-gradient-to-t from-black via-transparent to-transparent w-full text-white p-6">
              <h2 className="text-3xl font-semibold mb-2">{slide.title}</h2>
              <p className="text-lg">{slide.description}</p>
            </div>
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a
                href={`#slide${(index - 1 + slides.length) % slides.length}`}
                className="btn btn-circle text-white bg-gray-800 hover:bg-gray-600 transition-colors duration-300"
              >
                ❮
              </a>
              <a
                href={`#slide${(index + 1) % slides.length}`}
                className="btn btn-circle text-white bg-gray-800 hover:bg-gray-600 transition-colors duration-300"
              >
                ❯
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Banner;


