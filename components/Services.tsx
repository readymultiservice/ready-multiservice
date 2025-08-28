import React, { useState, useMemo } from 'react';
import type { Service, ActionButton } from '../types';

// Icon components (inline SVG for simplicity)
const WordPressIcon = () => <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM8.5 15.5l-1.5-4.5h3l1.5 4.5h-3zm3.5-5.5L10.5 4h3l1.5 6H12zm2 5.5l1.5-4.5h3l-1.5 4.5h-3z"/></svg>;
const SeoIcon = () => <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>;
const AutomationIcon = () => <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"></path></svg>;
const GemPortalIcon = () => <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>;

const servicesData: Service[] = [
  {
    id: 1,
    icon: <WordPressIcon />,
    title: 'WordPress Development',
    description: 'Conversion-focused WordPress websites using Elementor & WooCommerce for businesses and e-commerce.',
    category: 'Development',
    status: 'Active',
    sortOrder: 1,
    buttons: [
        { text: 'View Projects', link: '#portfolio', type: 'primary' },
        { text: 'Get a Quote', link: '#contact', type: 'secondary' }
    ],
    subsections: []
  },
  {
    id: 2,
    icon: <SeoIcon />,
    title: 'SEO & Performance Marketing',
    description: 'Drive growth with SEO Audits, Google Ads, Meta Ads, and performance-led lead generation.',
    category: 'Marketing',
    status: 'Active',
    sortOrder: 2,
    buttons: [{ text: 'Learn More', link: '#', type: 'primary' }],
    subsections: []
  },
  {
    id: 3,
    icon: <AutomationIcon />,
    title: 'Marketing Automation',
    description: 'End-to-end funnels for real estate and other industries, including landing pages & CRM integration.',
    category: 'Marketing',
    status: 'Active',
    sortOrder: 3,
    buttons: [{ text: 'See Case Study', link: '#', type: 'secondary' }],
    subsections: []
  },
  {
    id: 4,
    icon: <GemPortalIcon />,
    title: 'GEM Portal Services',
    description: 'Specialized support for GEM Portal integration and compliance for government-facing websites.',
    category: 'Consulting',
    status: 'Active',
    sortOrder: 4,
    buttons: [{ text: 'Contact Us', link: '#contact', type: 'primary' }],
    subsections: []
  },
];

const ActionButton: React.FC<{button: ActionButton}> = ({button}) => {
    const baseClasses = 'font-bold py-2 px-4 rounded-md transition-transform duration-300 transform hover:scale-105';
    const styles = {
        primary: 'bg-red-600 hover:bg-red-700 text-white',
        secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800'
    };
    return <a href={button.link} className={`${baseClasses} ${styles[button.type]}`}>{button.text}</a>
}


const Services: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = useMemo(() => ['All', ...Array.from(new Set(servicesData.map(s => s.category)))], []);
  
  const filteredServices = useMemo(() => {
    if (activeCategory === 'All') return servicesData;
    return servicesData.filter(service => service.category === activeCategory);
  }, [activeCategory]);
  
  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">What I Do</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">I offer a full suite of web and digital marketing services to help your business grow.</p>
          <div className="mt-4 mx-auto w-24 h-1 bg-red-600 rounded"></div>
        </div>

        <div className="flex justify-center flex-wrap gap-2 mb-12">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors ${
                activeCategory === category
                  ? 'bg-red-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-red-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredServices.map((service) => (
            <div key={service.id} className="bg-white p-8 rounded-lg shadow-lg text-center flex flex-col justify-between transition-transform duration-300 transform hover:-translate-y-2 hover:shadow-2xl">
              <div>
                <div className="inline-block p-4 rounded-full bg-red-100 text-red-600 mb-6">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
              </div>
              <div className="flex flex-col sm:flex-row justify-center gap-3 mt-auto">
                {service.buttons.map((button, btnIndex) => (
                  <ActionButton key={btnIndex} button={button} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;