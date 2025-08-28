import React from 'react';
import type { Testimonial } from '../types';

const testimonialData: Testimonial[] = [
  {
    quote: "Ready Multi Service completely revitalized our online strategy. Our organic traffic is up 150%, and the new WordPress site is converting leads like never before. Highly recommended!",
    author: 'Priya Sharma',
    company: 'Director, Nagpur Realtors',
    avatar: 'https://picsum.photos/100/100?random=1'
  },
  {
    quote: "The GEM Portal integration was seamless and professional. Shubham's team handled all the complexities, allowing us to focus on our business. A huge weight off our shoulders.",
    author: 'Ankit Desai',
    company: 'Founder, Apex Solutions',
    avatar: 'https://picsum.photos/100/100?random=2'
  },
  {
    quote: "Their data-driven approach to Google and Meta Ads has delivered a phenomenal ROI. Our cost-per-lead is down 40%, and the quality of inquiries is significantly better.",
    author: 'Sameer Joshi',
    company: 'Marketing Head, Creative Startups',
    avatar: 'https://picsum.photos/100/100?random=3'
  },
];

const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">What My Clients Say</h2>
          <p className="mt-4 text-lg text-gray-600">Real stories from businesses I've helped succeed.</p>
          <div className="mt-4 mx-auto w-24 h-1 bg-red-600 rounded"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonialData.map((testimonial, index) => (
                <div key={index} className="bg-white p-8 rounded-lg shadow-lg flex flex-col">
                    <svg className="w-12 h-12 text-red-600 opacity-25 mb-4" fill="currentColor" viewBox="0 0 32 32">
                        <path d="M9.333 8h-4.667v-8h4.667v8zm13.333 0h-4.666v-8h4.666v8zm-7.619 4.381c-2.039-2.585-5.064-4.381-8.381-4.381v3c2.332 0 4.332 1.096 5.619 2.763l-1.619 1.237v6h8v-8l-4-4zM21.381 12.381c-2.039-2.585-5.064-4.381-8.381-4.381v3c2.332 0 4.332 1.096 5.619 2.763l-1.619 1.237v6h8v-8l-4-4z"></path>
                    </svg>
                    <p className="text-gray-700 italic flex-grow">"{testimonial.quote}"</p>
                    <div className="flex items-center mt-6 pt-6 border-t border-gray-200">
                        <img className="w-12 h-12 rounded-full mr-4" src={testimonial.avatar} alt={testimonial.author} />
                        <div>
                            <p className="font-bold text-gray-800">{testimonial.author}</p>
                            <p className="text-sm text-gray-600">{testimonial.company}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;