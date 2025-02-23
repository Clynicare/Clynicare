import React from 'react';
import { Heart, Stethoscope, UserPlus } from 'lucide-react';

function InfiniteScroll({ direction = 'left' }) {
  const images = [
    "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=500",
    "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=500",
    "https://images.unsplash.com/photo-1583324113626-70df0f4deaab?auto=format&fit=crop&q=80&w=500",
    "https://images.unsplash.com/photo-1666214280557-f1b5022eb634?auto=format&fit=crop&q=80&w=500",
  ];

  return (
    <div className="relative flex overflow-hidden">
      <div className={`flex ${direction === 'left' ? 'animate-scroll-left' : 'animate-scroll-right'} gap-4`}>
        {[...images, ...images].map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Healthcare ${index + 1}`}
            className="h-64 w-80 rounded-xl object-cover shadow-lg"
          />
        ))}
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-16">
        <InfiniteScroll direction="left" />
        
        <div className="flex flex-col items-center justify-center gap-5 py-[100px]  w-full  ]">
      <div className="text-center font-medium text-lg tracking-wide font-rejoice w-11/12 sm:w-3/4 lg:w-3/5 overflow-hidden text-ellipsis ">
      Experience personalized healthcare with Clynicare, connecting you to skilled paramedical professionals for home-based medical services. Our comprehensive approach ensures your unique health needs are met with convenience and expertise.
      </div>
      <button  className="bg-gradient-to-r from-[#4DA1A9] to-[#007BA7] text-white py-2 px-4 rounded-full w-10/12 sm:w-64">
        Discover our Services
      </button>
    </div>

        <InfiniteScroll direction="right" />
      </div>
    </div>
  );
}

export default App;
