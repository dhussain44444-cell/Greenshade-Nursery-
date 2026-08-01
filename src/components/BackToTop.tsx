import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

export const BackToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisible = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisible);
    return () => window.removeEventListener('scroll', toggleVisible);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-5 right-5 z-40 bg-emerald-700 hover:bg-emerald-800 text-white p-3 rounded-xl shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center border border-emerald-600/50"
      aria-label="Scroll to top"
      title="Back to top"
    >
      <ChevronUp className="w-6 h-6 stroke-[2.5]" />
    </button>
  );
};
