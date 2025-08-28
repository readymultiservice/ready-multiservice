import React from 'react';

const AboutUs: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">About Shubham Bagde</h2>
            <div className="mt-4 w-24 h-1 bg-red-600 rounded"></div>
            <p className="mt-6 text-lg text-gray-600">
              I'm a web developer and digital marketing strategist based in Nagpur, and the Founder of Ready Multi Service. I help startups, realtors, and local businesses build high-converting websites that turn visitors into qualified leads.
            </p>
            <p className="mt-4 text-gray-600">
             With over 100+ websites delivered and 50+ successful marketing campaigns, my focus is on UI/UX, data-backed CRO principles, and ROI-driven solutions that work while you sleep.
            </p>
            <a href="#contact" className="mt-8 inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full transition-transform duration-300 transform hover:scale-105">
              Let's Talk
            </a>
          </div>
          <div className="order-1 md:order-2">
            <img src="https://picsum.photos/600/500?random=8" alt="About Shubham Bagde" className="rounded-lg shadow-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;