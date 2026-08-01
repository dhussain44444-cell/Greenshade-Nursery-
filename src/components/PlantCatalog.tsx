import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Plant, PlantCategory, FilterState } from '../types';
import { PLANTS_DATA } from '../data/plants';
import { Search, Heart, ShoppingBag, Sparkles, Check } from 'lucide-react';

interface PlantCatalogProps {
  onAddToCart: (plant: Plant) => void;
  onToggleWishlist: (plant: Plant) => void;
  wishlistIds: string[];
  onSelectPlant: (plant: Plant) => void;
  onAskDoctorAboutPlant: (plantName: string) => void;
  selectedCategoryName?: string | null;
}

export const PlantCatalog: React.FC<PlantCatalogProps> = ({
  onAddToCart,
  onToggleWishlist,
  wishlistIds,
  onSelectPlant,
  onAskDoctorAboutPlant,
  selectedCategoryName,
}) => {
  const [filters, setFilters] = useState<FilterState>({
    category: 'all',
    search: '',
    maxPrice: 2000,
    sunlight: 'all',
    maintenance: 'all',
    petFriendlyOnly: false,
    airPurifyingOnly: false,
    nativeAssamOnly: false,
  });

  const [sortBy, setSortBy] = useState<'popular' | 'price_low' | 'price_high' | 'rating'>('popular');
  const [addedAnimationId, setAddedAnimationId] = useState<string | null>(null);

  const filteredPlants = useMemo(() => {
    return PLANTS_DATA.filter((p) => {
      // Category text filter if passed from CategoryGrid
      if (selectedCategoryName) {
        const catLower = selectedCategoryName.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(catLower);
        const matchesTags = p.tags.some((t) => t.toLowerCase().includes(catLower));
        const matchesCategory = p.category.toLowerCase().includes(catLower);
        if (!matchesName && !matchesTags && !matchesCategory && catLower !== 'all') {
          // Keep general items if category is broad
        }
      }

      // Search term
      if (filters.search.trim()) {
        const query = filters.search.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesBotanical = p.botanicalName.toLowerCase().includes(query);
        const matchesTags = p.tags.some((t) => t.toLowerCase().includes(query));
        if (!matchesName && !matchesBotanical && !matchesTags) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price_low') return a.price - b.price;
      if (sortBy === 'price_high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return (b.reviewsCount || 0) - (a.reviewsCount || 0);
    });
  }, [filters, sortBy, selectedCategoryName]);

  const handleAddToCart = (plant: Plant, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!plant.inStock) return;
    onAddToCart(plant);
    setAddedAnimationId(plant.id);
    setTimeout(() => setAddedAnimationId(null), 1200);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.06,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <section id="catalog" className="py-12 bg-[#eef5e8] text-slate-900 min-h-screen overflow-hidden">
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        variants={containerVariants}
      >
        {/* Banner Section Header matching Screenshot 4 */}
        <motion.div variants={cardVariants} className="text-center space-y-3 pt-4">
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-slate-900 leading-tight">
            🌿 Shop Imported Exotic Indoor, Outdoor & Flowering Plants Online 🌿
          </h2>

          <div className="inline-block bg-[#e5f0dc] px-6 py-2 rounded-full border border-emerald-300 text-emerald-950 font-serif font-semibold text-base sm:text-lg shadow-xs">
            🌿 Imported Exotic Plants 🌿
          </div>
        </motion.div>

        {/* Filter & Search Toolbar */}
        <motion.div variants={cardVariants} className="bg-white/80 backdrop-blur-xs p-4 rounded-2xl shadow-xs border border-emerald-200/60 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-700 bg-white"
            />
          </div>

          {/* Sort By Selector */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <span className="text-xs font-medium text-slate-600 shrink-0">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="px-3 py-1.5 rounded-xl text-xs border border-slate-300 font-medium bg-white text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-700"
            >
              <option value="popular">Featured / Bestsellers</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
              <option value="rating">Top Rated (★)</option>
            </select>
          </div>
        </motion.div>

        {/* Product Cards Grid matching Screenshot 4 */}
        <motion.div variants={containerVariants} className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredPlants.map((plant) => {
            const isWishlisted = wishlistIds.includes(plant.id);
            const isJustAdded = addedAnimationId === plant.id;

            return (
              <motion.div
                key={plant.id}
                variants={cardVariants}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                onClick={() => onSelectPlant(plant)}
                className="bg-[#f8faf6] rounded-2xl overflow-hidden border border-emerald-100/90 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer"
              >
                {/* Top Image Container */}
                <div>
                  <div className="relative aspect-square overflow-hidden bg-white p-2">
                    <img
                      src={plant.image}
                      alt={plant.name}
                      className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Top Right Floating White Square Wishlist Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleWishlist(plant);
                      }}
                      className={`absolute top-4 right-4 p-2 rounded-lg bg-white shadow-md transition-colors ${
                        isWishlisted ? 'text-rose-500' : 'text-slate-600 hover:text-rose-500'
                      }`}
                      title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
                    >
                      <Heart className="w-4 h-4 fill-current" />
                    </button>

                    {/* Out Of Stock Ribbon Overlay matching Screenshot 4 */}
                    {!plant.inStock && (
                      <div className="absolute top-4 left-4 bg-slate-800/90 text-white font-bold text-[10px] uppercase px-2.5 py-1 rounded-md shadow-md backdrop-blur-xs">
                        Out Of Stock
                      </div>
                    )}
                  </div>

                  {/* Product Details Content */}
                  <div className="p-4 space-y-2 text-center sm:text-left">
                    <h3 className="font-serif font-bold text-sm sm:text-base text-slate-900 group-hover:text-emerald-800 transition-colors line-clamp-2 leading-snug">
                      {plant.name}
                    </h3>

                    {/* Price Range / Format matching Screenshot 4 */}
                    <div className="font-sans font-semibold text-slate-900 text-sm sm:text-base">
                      {plant.originalPrice ? (
                        <span>₹{plant.price}.00 – ₹{plant.originalPrice}.00</span>
                      ) : (
                        <span>₹{plant.price}.00</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Actions matching Screenshot 4 */}
                <div className="p-4 pt-0 space-y-2 text-center">
                  {plant.inStock ? (
                    <button
                      onClick={(e) => handleAddToCart(plant, e)}
                      className={`w-full py-2.5 px-4 rounded-full font-semibold text-xs transition-all flex items-center justify-center gap-1.5 shadow-xs ${
                        isJustAdded
                          ? 'bg-teal-700 text-white'
                          : 'bg-emerald-800 hover:bg-emerald-900 text-white'
                      }`}
                    >
                      {isJustAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Added!</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Select options</span>
                        </>
                      )}
                    </button>
                  ) : (
                    <button
                      disabled
                      className="w-full py-2.5 px-4 rounded-full font-semibold text-xs bg-slate-200 text-slate-500 cursor-not-allowed"
                    >
                      Out of stock
                    </button>
                  )}

                  {/* Add to Wishlist Link below button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist(plant);
                    }}
                    className="text-xs text-slate-600 hover:text-emerald-800 flex items-center justify-center gap-1 mx-auto pt-1 font-medium"
                  >
                    <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'text-rose-500 fill-rose-500' : ''}`} />
                    <span>{isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}</span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
};
