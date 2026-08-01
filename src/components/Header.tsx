import React, { useState } from 'react';
import { Menu, Heart, ShoppingBag, Leaf, Sparkles, MapPin, Phone } from 'lucide-react';
import { SideDrawerNav } from './SideDrawerNav';

interface HeaderProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  activeSection: string;
  setActiveSection: (sec: string) => void;
  onCategorySelect?: (catName: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  activeSection,
  setActiveSection,
  onCategorySelect,
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const scrollTo = (id: string) => {
    setActiveSection(id);
    const elem = document.getElementById(id);
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full shadow-xs">
        {/* Top Dark Green Ticker Announcement Bar matching Screenshots */}
        <div className="bg-[#08381e] text-emerald-100 text-[11px] sm:text-xs py-1.5 px-4 overflow-hidden uppercase font-semibold tracking-wider text-center border-b border-emerald-900/60">
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
            <span>COURIER FOR FASTER DELIVERY</span>
            <span>📬</span>
            <span className="truncate">YOU MAY RECEIVE MULTIPLE PACKAGES FOR PLANTS & SUPPLIES</span>
          </div>
        </div>

        {/* Light Pistachio Green Main Navbar matching Screenshots 1, 2, 4 */}
        <nav className="bg-[#eef5e7] text-slate-900 border-b border-emerald-200/80 px-4 py-2.5 sm:py-3 transition-all">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
            {/* Left: Hamburger Drawer Menu Button */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsDrawerOpen(true)}
                className="p-1.5 rounded-lg text-emerald-950 hover:bg-emerald-200/60 transition-colors focus:outline-none"
                aria-label="Open Navigation Menu"
              >
                <Menu className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2]" />
              </button>

              {/* Quick links on desktop */}
              <div className="hidden md:flex items-center gap-4 text-xs font-semibold text-emerald-900">
                <button
                  onClick={() => scrollTo('catalog')}
                  className="hover:text-emerald-700 transition-colors"
                >
                  Plant Catalog
                </button>
                <button
                  onClick={() => scrollTo('services')}
                  className="hover:text-emerald-700 transition-colors"
                >
                  Landscaping
                </button>
                <button
                  onClick={() => scrollTo('plant-doctor')}
                  className="hover:text-emerald-700 transition-colors flex items-center gap-1 text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded-full"
                >
                  <Sparkles className="w-3 h-3 text-amber-600" />
                  <span>AI Plant Doctor</span>
                </button>
              </div>
            </div>

            {/* Center: Brand Logo matching Screenshots */}
            <button
              onClick={() => scrollTo('hero')}
              className="flex flex-col items-center group text-center focus:outline-none"
            >
              {/* Leaf logo icon matching Screenshot logo */}
              <div className="flex items-center gap-1 text-emerald-800">
                <Leaf className="w-4 h-4 text-emerald-600 -rotate-45" />
                <Leaf className="w-5 h-5 text-emerald-700 -mt-1" />
                <Leaf className="w-4 h-4 text-emerald-600 rotate-45" />
              </div>
              <span className="font-serif text-lg sm:text-2xl font-bold tracking-tight text-emerald-950 leading-none group-hover:text-emerald-800 transition-colors">
                Amar Gaon Nursery
              </span>
              <span className="text-[9px] uppercase tracking-widest text-emerald-800/80 font-semibold hidden xs:block">
                Guwahati • Rani Gate, Azara
              </span>
            </button>

            {/* Right: Wishlist & Cart Icons matching Screenshots */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Call contact pill on desktop */}
              <a
                href="tel:08011253258"
                className="hidden lg:flex items-center gap-1 text-xs font-bold text-emerald-900 bg-emerald-100/90 hover:bg-emerald-200/90 px-3 py-1.5 rounded-full border border-emerald-300"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-700" />
                <span>080112 53258</span>
              </a>

              {/* Wishlist Icon */}
              <button
                onClick={onOpenWishlist}
                className="relative p-2 text-emerald-900 hover:text-emerald-700 transition-colors"
                title="View Wishlist"
              >
                <Heart className="w-6 h-6 stroke-[1.8]" />
                {wishlistCount > 0 ? (
                  <span className="absolute top-1.5 right-1.5 w-3 h-3 bg-emerald-600 rounded-full ring-2 ring-[#eef5e7]" />
                ) : (
                  <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-emerald-600/90 rounded-full ring-2 ring-[#eef5e7]" />
                )}
              </button>

              {/* Shopping Cart Icon */}
              <button
                onClick={onOpenCart}
                className="relative p-2 text-emerald-900 hover:text-emerald-700 transition-colors"
                title="View Shopping Cart"
              >
                <ShoppingBag className="w-6 h-6 stroke-[1.8]" />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-emerald-800 text-white font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Slide Out Navigation Drawer */}
      <SideDrawerNav
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        cartCount={cartCount}
        wishlistCount={wishlistCount}
        onOpenCart={onOpenCart}
        onOpenWishlist={onOpenWishlist}
        setActiveSection={setActiveSection}
        onCategorySelect={onCategorySelect}
      />
    </>
  );
};
