import React from 'react';
import { motion } from 'motion/react';
import { 
  Flower2, 
  Trees, 
  Sprout, 
  Citrus, 
  Sun, 
  Droplet, 
  Sparkles, 
  PackageCheck, 
  ShieldAlert, 
  Flame, 
  Leaf, 
  Layers 
} from 'lucide-react';

interface CategoryGridProps {
  onSelectCategory: (categoryName: string) => void;
  onViewAllCategories: () => void;
}

export interface CategoryItem {
  id: string;
  name: string;
  icon: React.ReactNode;
  categoryFilterKey: string;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({
  onSelectCategory,
  onViewAllCategories,
}) => {
  const categories: CategoryItem[] = [
    {
      id: 'bougainvillea',
      name: 'Bougainvillea',
      icon: (
        <svg className="w-10 h-10 stroke-slate-800 fill-none" viewBox="0 0 24 24" strokeWidth="1.5">
          <path d="M12 22v-8m0 0C8 14 5 11 5 7a4 4 0 0 1 8 0m-1 7c4 0 7-3 7-7a4 4 0 0 0-8 0" />
          <circle cx="12" cy="7" r="1.5" className="fill-emerald-600" />
        </svg>
      ),
      categoryFilterKey: 'outdoor',
    },
    {
      id: 'indoors',
      name: 'Indoors Plants',
      icon: (
        <svg className="w-10 h-10 stroke-slate-800 fill-none" viewBox="0 0 24 24" strokeWidth="1.5">
          <path d="M7 15h10l-1.5 6h-7L7 15z" className="fill-emerald-100" />
          <path d="M12 15V8m0 0c-3 0-5-2-5-5 3 0 5 2 5 5zm0 0c3 0 5-2 5-5-3 0-5 2-5 5z" />
        </svg>
      ),
      categoryFilterKey: 'indoor',
    },
    {
      id: 'flowering',
      name: 'Flowering Plants',
      icon: (
        <svg className="w-10 h-10 stroke-slate-800 fill-none" viewBox="0 0 24 24" strokeWidth="1.5">
          <path d="M12 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" className="fill-rose-100" />
          <path d="M12 4a3 3 0 0 0-3 3c0 2 3 3 3 3s3-1 3-3a3 3 0 0 0-3-3z" />
          <path d="M12 10v10m-3-6c-2 0-3-2-3-2s2 0 3 2zm6 0c2 0 3-2 3-2s-2 0-3 2z" />
        </svg>
      ),
      categoryFilterKey: 'outdoor',
    },
    {
      id: 'fruits',
      name: 'Fruits Plants',
      icon: (
        <svg className="w-10 h-10 stroke-slate-800 fill-none" viewBox="0 0 24 24" strokeWidth="1.5">
          <path d="M12 22v-9m0 0c-3 0-5-2-5-5a5 5 0 0 1 10 0c0 3-2 5-5 5z" className="fill-amber-100" />
          <circle cx="12" cy="14" r="3" className="fill-amber-300 stroke-amber-700" />
        </svg>
      ),
      categoryFilterKey: 'fruits',
    },
    {
      id: 'bulbs',
      name: 'Flowering Bulbs',
      icon: (
        <svg className="w-10 h-10 stroke-slate-800 fill-none" viewBox="0 0 24 24" strokeWidth="1.5">
          <path d="M12 22c4 0 6-3 6-7 0-4-6-11-6-11S6 11 6 15c0 4 2 7 6 7z" className="fill-emerald-100" />
        </svg>
      ),
      categoryFilterKey: 'native_assam',
    },
    {
      id: 'succulents',
      name: 'Succulents & Cactus',
      icon: (
        <svg className="w-10 h-10 stroke-slate-800 fill-none" viewBox="0 0 24 24" strokeWidth="1.5">
          <path d="M12 20V4m-4 6v4a2 2 0 0 0 2 2h2m4-8v6a2 2 0 0 1-2 2h-2" />
          <path d="M9 20h6" />
        </svg>
      ),
      categoryFilterKey: 'succulents',
    },
    {
      id: 'orchids',
      name: 'Orchids',
      icon: (
        <svg className="w-10 h-10 stroke-slate-800 fill-none" viewBox="0 0 24 24" strokeWidth="1.5">
          <path d="M12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
          <path d="M7 10c-2 0-4 2-4 4s2 3 4 2m10-6c2 0 4 2 4 4s-2 3-4 2m-5 0v8" />
        </svg>
      ),
      categoryFilterKey: 'native_assam',
    },
    {
      id: 'aquatic',
      name: 'Aquatic Plants',
      icon: (
        <svg className="w-10 h-10 stroke-slate-800 fill-none" viewBox="0 0 24 24" strokeWidth="1.5">
          <path d="M12 18c-4 0-7 2-7 4h14c0-2-3-4-7-4z" />
          <path d="M12 14a4 4 0 0 0-4-4c0 4 4 4 4 4zm0 0a4 4 0 0 1 4-4c0 4-4 4-4 4z" />
        </svg>
      ),
      categoryFilterKey: 'native_assam',
    },
    {
      id: 'rose',
      name: 'Rose',
      icon: (
        <svg className="w-10 h-10 stroke-slate-800 fill-none" viewBox="0 0 24 24" strokeWidth="1.5">
          <circle cx="12" cy="8" r="4" className="fill-rose-200 stroke-rose-800" />
          <path d="M12 12v9m-3-4c-2 0-3-2-3-2s2 0 3 2zm6 0c2 0 3-2 3-2s-2 0-3 2z" />
        </svg>
      ),
      categoryFilterKey: 'outdoor',
    },
    {
      id: 'fertilisers',
      name: 'Fertilisers',
      icon: (
        <svg className="w-10 h-10 stroke-slate-800 fill-none" viewBox="0 0 24 24" strokeWidth="1.5">
          <rect x="6" y="5" width="12" height="15" rx="2" className="fill-emerald-50" />
          <path d="M12 9v6m-3-3h6" />
        </svg>
      ),
      categoryFilterKey: 'pots_supplies',
    },
    {
      id: 'adeniums',
      name: 'Adeniums',
      icon: (
        <svg className="w-10 h-10 stroke-slate-800 fill-none" viewBox="0 0 24 24" strokeWidth="1.5">
          <path d="M12 21c-2 0-4-1-4-3 0-2 2-3 4-3s4 1 4 3c0 2-2 3-4 3z" />
          <path d="M12 15V8m-3-2a3 3 0 0 1 6 0" />
        </svg>
      ),
      categoryFilterKey: 'outdoor',
    },
    {
      id: 'seeds',
      name: 'Seeds',
      icon: (
        <svg className="w-10 h-10 stroke-slate-800 fill-none" viewBox="0 0 24 24" strokeWidth="1.5">
          <path d="M7 6h10v14H7z" className="fill-amber-50" />
          <circle cx="12" cy="13" r="2" className="fill-emerald-600" />
        </svg>
      ),
      categoryFilterKey: 'pots_supplies',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.3 } },
  };

  return (
    <section id="categories" className="py-12 bg-white text-slate-900 border-b border-slate-100 overflow-hidden">
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        variants={containerVariants}
      >
        {/* Section Header with Title & View All Button matching Screenshot 2 */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
              Shop by Category
            </h2>
            <span className="text-xl">🌿</span>
          </div>

          <button
            onClick={onViewAllCategories}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#eef5e7] hover:bg-emerald-200/60 text-emerald-950 font-semibold text-sm border border-emerald-300/80 transition-colors shadow-xs"
          >
            View All Categories
          </button>
        </motion.div>

        {/* 12 Category Grid Cards matching Screenshot 2 */}
        <motion.div variants={containerVariants} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {categories.map((cat) => (
            <motion.button
              key={cat.id}
              variants={itemVariants}
              whileHover={{ scale: 1.03, translateY: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectCategory(cat.name)}
              className="bg-[#f3f7ee] hover:bg-[#e7f0df] border border-emerald-100/80 rounded-2xl p-5 flex flex-col items-center justify-center text-center gap-3 transition-all hover:shadow-md group cursor-pointer"
            >
              <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                {cat.icon}
              </div>
              <span className="font-serif font-semibold text-xs sm:text-sm text-slate-800 group-hover:text-emerald-900 leading-tight">
                {cat.name}
              </span>
            </motion.button>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};
