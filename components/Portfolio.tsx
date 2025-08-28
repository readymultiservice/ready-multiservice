import React, { useState, useMemo } from 'react';
import type { PortfolioItem, ActionButton } from '../types';

const portfolioData: PortfolioItem[] = [
  { 
    id: 1, 
    image: 'https://picsum.photos/500/400?random=1', 
    category: 'WordPress', 
    title: 'Conversion-Focused E-commerce Site', 
    status: 'Active', 
    buttons: [{ text: 'View Live Site', link: '#', type: 'primary' }] 
  },
  { 
    id: 2, 
    image: 'https://picsum.photos/500/400?random=2', 
    category: 'Automation', 
    title: 'Real Estate Lead Gen Funnel', 
    status: 'Active', 
    buttons: [{ text: 'See Funnel', link: '#', type: 'secondary' }] 
  },
  { 
    id: 3, 
    image: 'https://picsum.photos/500/400?random=3', 
    category: 'SEO & PPC', 
    title: 'Local Business SEO Campaign', 
    status: 'Active', 
    buttons: [{ text: 'View Results', link: '#', type: 'primary' }] 
  },
  { 
    id: 4, 
    image: 'https://picsum.photos/500/400?random=4', 
    category: 'GEM Portal', 
    title: 'Government Portal Integration', 
    status: 'Active', 
    buttons: [] 
  },
  { 
    id: 5, 
    image: 'https://picsum.photos/500/400?random=5', 
    category: 'UI/UX', 
    title: 'Startup Website Design', 
    status: 'Active', 
    buttons: [{ text: 'See Mockups', link: '#', type: 'secondary' }] 
  },
  { 
    id: 6, 
    image: 'https://picsum.photos/500/400?random=6', 
    category: 'Marketing', 
    title: 'ROI-Driven Ad Campaign', 
    status: 'Active', 
    buttons: [{ text: 'View Report', link: '#', type: 'primary' }]
  },
];

const ActionButton: React.FC<{button: ActionButton}> = ({button}) => {
    const baseClasses = 'font-semibold py-2 px-4 rounded-md transition-transform duration-300 transform hover:scale-105 text-sm';
    const styles = {
        primary: 'bg-red-600 hover:bg-red-700 text-white',
        secondary: 'bg-white hover:bg-gray-100 text-gray-800'
    };
    return <a href={button.link} className={`${baseClasses} ${styles[button.type]}`}>{button.text}</a>
}


const Portfolio: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = useMemo(() => ['All', ...Array.from(new Set(portfolioData.map(p => p.category)))], []);
  
  const filteredPortfolio = useMemo(() => {
    if (activeCategory === 'All') return portfolioData;
    return portfolioData.filter(item => item.category === activeCategory);
  }, [activeCategory]);

  return (
    <section id="portfolio" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">My Portfolio</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">Check out some of my recent work and success stories.</p>
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPortfolio.map((item) => (
            <div key={item.id} className="group relative overflow-hidden rounded-lg shadow-lg">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 transform group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div>
                  <span className="text-sm font-bold uppercase text-red-500">{item.category}</span>
                  <h3 className="text-xl font-bold text-white mt-2">{item.title}</h3>
                </div>
                {item.buttons.length > 0 &&
                  <div className="mt-4 flex gap-3 transition-transform transform translate-y-4 group-hover:translate-y-0 duration-300">
                    {item.buttons.map((button, btnIndex) => (
                      <ActionButton key={btnIndex} button={button} />
                    ))}
                  </div>
                }
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;