import React from 'react';
import { Leaf, MapPin, Phone, MessageCircle, Clock, Heart } from 'lucide-react';

interface FooterProps {
  setActiveSection: (sec: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveSection }) => {
  const scrollTo = (id: string) => {
    setActiveSection(id);
    const elem = document.getElementById(id);
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-emerald-950 text-emerald-200 border-t border-emerald-900 pt-16 pb-8 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white shadow-md">
                <Leaf className="w-6 h-6" />
              </div>
              <span className="font-serif text-2xl font-bold text-white tracking-tight">
                Amar Gaon Nursery
              </span>
            </div>

            <p className="text-emerald-300/80 leading-relaxed max-w-md">
              Guwahati’s specialized botanical greenhouse for healthy house plants, rare native Assam orchids (Kapou Phool), GI Kaji Nemu lemon trees, organic fertilizers, and custom rooftop landscaping.
            </p>

            <div className="pt-2 flex flex-wrap gap-2 text-xs font-semibold">
              <span className="bg-emerald-900 text-amber-300 px-3 py-1 rounded-full border border-emerald-800">
                🌸 Native Assam Flora
              </span>
              <span className="bg-emerald-900 text-emerald-300 px-3 py-1 rounded-full border border-emerald-800">
                🪴 100% Organic Soil
              </span>
              <span className="bg-emerald-900 text-emerald-300 px-3 py-1 rounded-full border border-emerald-800">
                🏡 Rani Gate, Azara
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif font-bold text-base text-white uppercase tracking-wider text-xs">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-emerald-300">
              <li>
                <button onClick={() => scrollTo('catalog')} className="hover:text-amber-300 transition-colors">
                  Plant Catalog & Supplies
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('gardening-tips')} className="hover:text-amber-300 transition-colors">
                  Seasonal Gardening Tips
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('services')} className="hover:text-amber-300 transition-colors">
                  Terrace Landscaping Services
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('plant-doctor')} className="hover:text-amber-300 transition-colors">
                  AI Plant Care Doctor
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('quiz')} className="hover:text-amber-300 transition-colors">
                  Interactive Plant Quiz
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('reviews')} className="hover:text-amber-300 transition-colors">
                  Guwahati Customer Reviews
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('location')} className="hover:text-amber-300 transition-colors">
                  Nursery Location & Hours
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-serif font-bold text-base text-white uppercase tracking-wider text-xs">
              Official Address & Contact
            </h4>

            <div className="space-y-2 text-xs leading-relaxed text-emerald-200">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  Rani gate, Azara, Guwahati, Assam 781017
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href="tel:08011253258" className="font-mono text-amber-300 font-bold hover:underline">
                  080112 53258
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Mon – Sun: 8:00 AM – 7:30 PM</span>
              </div>

              <div className="pt-2 flex gap-3">
                <a
                  href="tel:08011253258"
                  className="px-3 py-1.5 rounded-lg bg-emerald-900 border border-emerald-700 text-white font-semibold text-xs hover:bg-emerald-800"
                >
                  Call Directly
                </a>
                <a
                  href="https://wa.me/918011253258"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-emerald-700 text-white font-semibold text-xs hover:bg-emerald-600 flex items-center gap-1"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-emerald-900 text-center text-xs text-emerald-400/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            © {new Date().getFullYear()} Amar Gaon Nursery. All rights reserved. Guwahati, Assam.
          </div>
          <div className="flex items-center gap-1">
            <span>Cultivated with care for</span>
            <span className="text-amber-300 font-medium">Guwahati, Assam</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
