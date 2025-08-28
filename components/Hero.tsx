import React from 'react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative bg-gray-900 text-white min-h-screen flex flex-col justify-center">
      <div className="absolute inset-0">
        <img src="https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Professional business meeting" className="w-full h-full object-cover opacity-30" />
      </div>
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 z-10 text-center flex-grow flex flex-col justify-center">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">
          Building a Digital Presence That <span className="text-red-600">Works While You Sleep</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8">
         I help startups, realtors, and local businesses build high-converting websites and run ROI-driven campaigns that drive measurable growth.
        </p>
        <div className="flex justify-center space-x-4">
          <a href="#contact" className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-md transition-transform duration-300 transform hover:scale-105">
            Get Started
          </a>
          <a href="#services" className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-md transition-all duration-300 hover:bg-white hover:text-gray-800">
            My Services
          </a>
        </div>
      </div>
      <div className="relative z-10 w-full py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <p className="text-center text-gray-400 text-sm font-semibold uppercase tracking-wider">Trusted by Industry Leaders</p>
              <div className="flex justify-center items-center space-x-8 md:space-x-12 mt-4 grayscale opacity-70">
                <svg className="h-8 text-white" viewBox="0 0 121 37" fill="currentColor"><path d="M120.73 14.28V0H109.1v14.28h11.63zm-14.96 0V0h-11.6v14.28h11.6zm-14.95 0V0h-11.6v14.28h11.6zm-14.96 0V0h-11.6v14.28h11.6zM61.2 14.28V0h-11.6v14.28h11.6zM46.25 14.28V0h-11.6v14.28h11.6zM21.93 36.3C10.13 36.3 0 27.25 0 18.15 0 9.05 10.13 0 21.93 0c6.5 0 10.9 2.02 14.6 5.4l-6.3 4.35c-2.1-1.9-4.8-3.3-8.3-3.3-5.22 0-9.8 3.5-9.8 8.7 0 5.2 4.58 8.7 9.8 8.7 4.1 0 6.9-1.9 8.6-3.4l6.3 4.35c-3.7 3.5-8.1 5.5-14.6 5.5zM33.6 14.28V0h-11.6v14.28h11.6z"></path></svg>
                <svg className="h-7 text-white" viewBox="0 0 119 24" fill="currentColor"><path d="M59.23 24c-6.33 0-11.2-5.1-11.2-11.2V0h6.1v12.8c0 3.33 2.05 5.92 5.1 5.92s5.1-2.6 5.1-5.93V0h6.1v12.8C70.43 18.9 65.55 24 59.23 24zM24.7 23.53V0h6.1v23.53h-6.1zM93.8 24c-6.9 0-12.08-4.9-12.08-11.48 0-6.6 5.18-11.47 12.08-11.47 6.9 0 12.07 4.88 12.07 11.47C105.88 19.1 100.7 24 93.8 24zm0-5.52c3.54 0 5.98-2.6 5.98-5.96s-2.44-5.97-5.98-5.97c-3.53 0-5.97 2.6-5.97 5.97s2.44 5.96 5.97 5.96zM118.44 23.53h-6.1V6.2h-4.3V0h14.7v6.2h-4.3v17.33zM42.14 23.53h-16V0h16c6.54 0 10.7 4.15 10.7 8.58 0 2.8-1.5 5.34-4.23 6.9l4.63 8.05h-6.7l-4.1-7.5h-4.3v7.5zm0-12.3c3.2 0 4.8-1.8 4.8-3.72 0-1.9-1.6-3.65-4.8-3.65h-9.9v7.37h9.9zM0 23.53V0h16.5v5.1H6.1v3.4h9.3v5.1H6.1v4.83h10.4v5.1H0z"></path></svg>
                <svg className="h-8 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M13.111 23.633L6.42.322h5.833l3.528 11.333L19.45.322h4.24l-6.945 23.31h-3.634Z M0 23.633L-.005.32h4.37v23.313H0Z"/></svg>
              </div>
          </div>
      </div>
    </section>
  );
};

export default Hero;