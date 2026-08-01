import React, { useState } from 'react';
import { Search, ArrowRight, Truck, Package, Sparkles } from 'lucide-react';

import heroBannerImg from '../assets/images/nursery_hero_banner_1785333069514.jpg';

interface HeroProps {
  onExploreCatalog: (searchQuery?: string) => void;
  onBookServices: () => void;
  onConsultDoctor: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreCatalog,
  onBookServices,
  onConsultDoctor,
}) => {
  const [searchInput, setSearchInput] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onExploreCatalog(searchInput);
  };

  return (
    <div id="hero" className="relative w-full">
      {/* Main Hero Background Section */}
      <div className="relative bg-emerald-950 text-white min-h-[480px] sm:min-h-[540px] flex flex-col justify-between overflow-hidden">
        {/* Background Image with Foliage and Hibiscus Visual */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroBannerImg}
            alt="Lush Foliage and Hibiscus Flowers - Amar Gaon Nursery Guwahati"
            className="w-full h-full object-cover object-right sm:object-center"
          />
          {/* Subtle Dark Gradient Overlay for optimal high contrast readable text */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/65 to-transparent sm:w-3/4" />
        </div>

        {/* Hero Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-12 w-full flex-1 flex flex-col justify-between">
          {/* Top Floating White Search Bar matching Screenshot 1 */}
          <form
            onSubmit={handleSearchSubmit}
            className="w-full max-w-2xl mx-auto mb-8 sm:mb-12 shadow-xl"
          >
            <div className="relative flex items-center bg-white rounded-xl border border-slate-200 p-1">
              <input
                type="text"
                placeholder="Search Product..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full pl-4 pr-10 py-2.5 sm:py-3 text-slate-800 placeholder-slate-400 text-sm sm:text-base bg-transparent focus:outline-none"
              />
              <button
                type="submit"
                className="p-2 sm:p-2.5 text-slate-500 hover:text-emerald-800 transition-colors"
                title="Search Products"
              >
                <Search className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
          </form>

          {/* Headline & Description Block matching Screenshot 1 */}
          <div className="max-w-xl space-y-4 my-auto">
            <span className="text-emerald-300 font-medium text-sm sm:text-base tracking-wide block">
              Bring Nature Home
            </span>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1]">
              Healthy Plants
              <span className="block mt-1">Happy Homes</span>
            </h1>

            <p className="text-slate-200 text-sm sm:text-base leading-relaxed max-w-md pt-1">
              Premium Indoor, Outdoor & Flowering Plants Delivered Fresh to Your Doorstep
            </p>

            {/* Action Buttons matching Screenshot 1 */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={() => onExploreCatalog()}
                className="px-6 py-3 rounded-xl bg-[#e5f0dc] hover:bg-white text-emerald-950 font-bold text-sm sm:text-base shadow-lg transition-all hover:scale-[1.02]"
              >
                Shop Now
              </button>

              <button
                onClick={() => {
                  const elem = document.getElementById('categories');
                  if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex items-center gap-2 text-white hover:text-emerald-300 font-semibold text-sm sm:text-base transition-colors py-2"
              >
                <span>Explore Categories</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Feature Bar matching Screenshot 1 & 2 */}
      <div className="bg-[#eaf3e2] border-b border-emerald-200/80 py-4 px-4 text-slate-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 items-center justify-center">
          {/* Fast & Safe Delivery */}
          <div className="flex items-center justify-center sm:justify-start gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-100/90 text-emerald-800">
              <Truck className="w-6 h-6 shrink-0" />
            </div>
            <div>
              <div className="font-semibold text-sm text-slate-900">
                Fast & Safe Delivery
              </div>
              <div className="text-xs text-slate-600">
                Pan India Shipping • Guwahati Doorstep Delivery
              </div>
            </div>
          </div>

          {/* Safe Packing */}
          <div className="flex items-center justify-center sm:justify-start gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-100/90 text-emerald-800">
              <Package className="w-6 h-6 shrink-0" />
            </div>
            <div>
              <div className="font-semibold text-sm text-slate-900">
                Safe Packing
              </div>
              <div className="text-xs text-slate-600">
                Plants Delivered With Root Protection & Care
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
