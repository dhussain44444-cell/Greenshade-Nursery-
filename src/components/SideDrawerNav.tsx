import React, { useState } from 'react';
import { ArrowLeft, Search, Heart, ShoppingBag, ChevronDown, ChevronUp, Leaf, X } from 'lucide-react';

interface SideDrawerNavProps {
  isOpen: boolean;
  onClose: () => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  setActiveSection: (sec: string) => void;
  onCategorySelect?: (catName: string) => void;
}

export const SideDrawerNav: React.FC<SideDrawerNavProps> = ({
  isOpen,
  onClose,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  setActiveSection,
  onCategorySelect,
}) => {
  const [isShopExpanded, setIsShopExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const handleNavClick = (sectionId: string) => {
    setActiveSection(sectionId);
    onClose();
    const elem = document.getElementById(sectionId);
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveSection('catalog');
    onClose();
    const elem = document.getElementById('catalog');
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  const shopCategories = [
    'Bougainvillea',
    'Indoors Plants',
    'Flowering Plants',
    'Fruits Plants',
    'Flowering Bulbs',
    'Succulents & Cactus',
    'Orchids',
    'Aquatic Plants',
    'Rose',
    'Fertilisers',
    'Adeniums',
    'Seeds',
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-fadeIn"
        onClick={onClose}
      />

      {/* Off-canvas Drawer Panel */}
      <div className="fixed inset-y-0 left-0 max-w-xs sm:max-w-sm w-full bg-white shadow-2xl flex flex-col z-50 transform transition-transform duration-300 ease-in-out">
        {/* Top Header Row matching Screenshot 3 */}
        <div className="p-3 bg-[#eef5e7] border-b border-emerald-100 flex items-center justify-between gap-2">
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-emerald-900 hover:bg-emerald-100/80 transition-colors flex items-center gap-1 text-xs font-semibold"
            title="Close Drawer"
          >
            <ArrowLeft className="w-5 h-5 text-emerald-800" />
          </button>

          {/* Search bar inside header */}
          <form onSubmit={handleSearchSubmit} className="relative flex-1 max-w-[170px]">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-2.5 pr-6 py-1.5 text-xs rounded-md border border-emerald-200 bg-white focus:outline-none focus:ring-1 focus:ring-emerald-600 text-slate-800"
            />
            <button type="submit" className="absolute right-1.5 top-1/2 -translate-y-1/2 text-slate-400">
              <Search className="w-3.5 h-3.5 text-emerald-700" />
            </button>
          </form>

          {/* Brand Mini Logo */}
          <div className="flex items-center gap-1">
            <div className="w-6 h-6 rounded-md bg-emerald-800 text-white flex items-center justify-center">
              <Leaf className="w-3.5 h-3.5" />
            </div>
            <span className="font-serif font-bold text-xs text-emerald-950 leading-tight hidden xs:inline">
              Amar Gaon
            </span>
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => {
                onClose();
                onOpenWishlist();
              }}
              className="relative p-1.5 text-emerald-800 hover:text-emerald-950"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-emerald-600 rounded-full ring-2 ring-white" />
              )}
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenCart();
              }}
              className="relative p-1.5 text-emerald-800 hover:text-emerald-950"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-800 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Navigation Link List matching Screenshot 3 */}
        <div className="flex-1 overflow-y-auto py-2 divide-y divide-slate-100 text-sm font-semibold text-slate-900">
          <button
            onClick={() => handleNavClick('hero')}
            className="w-full text-left px-5 py-3.5 hover:bg-emerald-50 hover:text-emerald-800 transition-colors flex items-center justify-between"
          >
            <span>Home</span>
          </button>

          <div>
            <button
              onClick={() => setIsShopExpanded(!isShopExpanded)}
              className="w-full text-left px-5 py-3.5 hover:bg-emerald-50 hover:text-emerald-800 transition-colors flex items-center justify-between"
            >
              <span>Shop</span>
              {isShopExpanded ? (
                <ChevronUp className="w-4 h-4 text-slate-400" />
              ) : (
                <ChevronDown className="w-4 h-4 text-slate-400" />
              )}
            </button>

            {isShopExpanded && (
              <div className="bg-slate-50/80 px-6 py-2 space-y-1.5 text-xs text-slate-700 font-normal border-y border-slate-100">
                {shopCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      if (onCategorySelect) onCategorySelect(cat);
                      handleNavClick('catalog');
                    }}
                    className="block w-full text-left py-1.5 hover:text-emerald-800 hover:font-medium transition-colors"
                  >
                    🌿 {cat}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => handleNavClick('catalog')}
            className="w-full text-left px-5 py-3.5 hover:bg-emerald-50 hover:text-emerald-800 transition-colors"
          >
            Track Order
          </button>

          <button
            onClick={() => handleNavClick('plant-doctor')}
            className="w-full text-left px-5 py-3.5 hover:bg-emerald-50 hover:text-emerald-800 transition-colors flex items-center justify-between"
          >
            <span>AI Plant Doctor</span>
            <span className="text-[10px] font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full">
              NEW
            </span>
          </button>

          <button
            onClick={() => handleNavClick('services')}
            className="w-full text-left px-5 py-3.5 hover:bg-emerald-50 hover:text-emerald-800 transition-colors"
          >
            Terrace Landscaping
          </button>

          <button
            onClick={() => handleNavClick('reviews')}
            className="w-full text-left px-5 py-3.5 hover:bg-emerald-50 hover:text-emerald-800 transition-colors"
          >
            Customer Reviews
          </button>

          <button
            onClick={() => handleNavClick('location')}
            className="w-full text-left px-5 py-3.5 hover:bg-emerald-50 hover:text-emerald-800 transition-colors"
          >
            About Us & Contact
          </button>

          <button
            onClick={() => handleNavClick('location')}
            className="w-full text-left px-5 py-3.5 hover:bg-emerald-50 hover:text-emerald-800 transition-colors text-emerald-800"
          >
            Login / Register
          </button>
        </div>

        {/* Footer Contact Info in Drawer */}
        <div className="p-4 bg-emerald-950 text-emerald-200 text-xs space-y-2 border-t border-emerald-900">
          <div className="font-serif font-bold text-white text-sm">
            Amar Gaon Nursery Guwahati
          </div>
          <p className="text-emerald-300/80 leading-tight">
            Rani gate, Azara, Guwahati, Assam 781017
          </p>
          <div className="pt-1 flex items-center justify-between">
            <a href="tel:08011253258" className="font-mono text-amber-300 font-bold hover:underline">
              📞 080112 53258
            </a>
            <span className="text-[10px] bg-emerald-900 px-2 py-0.5 rounded text-emerald-300">
              Open 8 AM - 7:30 PM
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
