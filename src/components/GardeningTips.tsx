import React, { useState } from 'react';
import { 
  BookOpen, 
  CloudRain, 
  Sun, 
  Snowflake, 
  Calendar, 
  Sparkles, 
  ChevronRight, 
  Droplets, 
  Sprout, 
  ShieldCheck, 
  CheckCircle2, 
  MessageSquare
} from 'lucide-react';

interface GardeningTipsProps {
  onAskDoctor: (topic: string) => void;
}

export interface TipGuide {
  id: string;
  title: string;
  season: 'monsoon' | 'summer' | 'winter' | 'all';
  difficulty: 'Beginner' | 'Intermediate';
  readTime: string;
  summary: string;
  icon: React.ReactNode;
  steps: string[];
  localAssamNote?: string;
  recommendedPlants: string[];
}

export const GardeningTips: React.FC<GardeningTipsProps> = ({ onAskDoctor }) => {
  const [activeSeasonFilter, setActiveSeasonFilter] = useState<'all' | 'monsoon' | 'summer' | 'winter'>('all');
  const [selectedTip, setSelectedTip] = useState<TipGuide | null>(null);

  const tipsData: TipGuide[] = [
    {
      id: 'tip-1',
      title: 'Monsoon Root Care & Potted Drainage Magic',
      season: 'monsoon',
      difficulty: 'Beginner',
      readTime: '3 min read',
      summary: 'Prevent root rot and soil waterlogging during heavy Assam rainfall with proper pot elevation and coarse sand mix.',
      icon: <CloudRain className="w-6 h-6 text-blue-600" />,
      steps: [
        'Check pot drainage holes weekly and clear clogged debris.',
        'Elevate outdoor pots using brick rubber feet or pot stands to avoid rainwater pooling at the bottom.',
        'Mix 20% coarse sand or perlite into heavy potting soil to ensure swift water drainage.',
        'Hold back watering indoors when relative humidity is above 80%.'
      ],
      localAssamNote: 'During Guwahati’s heavy monsoon months (June-September), move delicate potted succulents and indoor orchids under shaded balcony roofs.',
      recommendedPlants: ['Monstera Deliciosa', 'Kaji Nemu', 'Snake Plant']
    },
    {
      id: 'tip-2',
      title: 'Beating the Summer Heat: Sunshade & Mulching',
      season: 'summer',
      difficulty: 'Beginner',
      readTime: '4 min read',
      summary: 'Protect delicate tropical leaves from scorch marks during peak 35°C+ summer afternoons in North East India.',
      icon: <Sun className="w-6 h-6 text-amber-500" />,
      steps: [
        'Water deeply in early morning (6:00 AM – 8:00 AM) before sun exposure intensifies.',
        'Apply a 2-inch layer of dried leaf mulch or coco-peat on topsoil to retain moisture.',
        'Use a 50% green agro-shade net over rooftop bougainvillea and young fruiting trees.',
        'Mist high-humidity lovers like Kapou Phool orchids on warm evenings.'
      ],
      localAssamNote: 'Hydrate potted Kaji Nemu lemon trees with organic neem cake liquid fertilizer once every 15 days in early summer.',
      recommendedPlants: ['Aprajita Vine', 'Blue Daze', 'Hibiscus']
    },
    {
      id: 'tip-3',
      title: 'Winter Bloom Boost for Bougainvillea & Roses',
      season: 'winter',
      difficulty: 'Intermediate',
      readTime: '3 min read',
      summary: 'Maximize vibrant petal yields and deep flower saturation from November through February.',
      icon: <Snowflake className="w-6 h-6 text-teal-600" />,
      steps: [
        'Prune dead stems and spent flower clusters in late October to stimulate fresh flowering shoots.',
        'Top-dress each pot with 2 cups of rich organic earthworm vermicompost and bone meal.',
        'Ensure 6 full hours of unobstructed winter sunlight for rose bushes and adeniums.',
        'Reduce watering frequency as soil evaporation slows down in cool weather.'
      ],
      localAssamNote: 'Guwahati’s mild winters are ideal for exotic imported Lisianthus and multipetal Clematis bloom cycles.',
      recommendedPlants: ['Royal Purple Bougainvillea', 'Rose', 'Lisianthus']
    },
    {
      id: 'tip-4',
      title: 'Organic Soil Enrichment 101 for New Plant Parents',
      season: 'all',
      difficulty: 'Beginner',
      readTime: '5 min read',
      summary: 'Build nutrient-rich living soil naturally without harsh chemical fertilizers.',
      icon: <Sprout className="w-6 h-6 text-emerald-600" />,
      steps: [
        'Use a balanced baseline formula: 40% garden soil + 30% vermicompost + 20% coco peat + 10% coarse sand.',
        'Add a handful of mustard cake powder once a month for organic nitrogen boost.',
        'Gently aerate top 1 inch of pot soil using a hand trowel every fortnight.',
        'Inspect leaf undersides regularly for early signs of aphids or mealybugs.'
      ],
      localAssamNote: 'Organic neem oil spray (5ml per liter water with 2 drops soap) works wonders against humid tropical pests.',
      recommendedPlants: ['All Indoor & Outdoor House Plants']
    }
  ];

  const filteredTips = activeSeasonFilter === 'all' 
    ? tipsData 
    : tipsData.filter((t) => t.season === activeSeasonFilter || t.season === 'all');

  return (
    <section id="gardening-tips" className="py-14 bg-[#f2f7ed] text-slate-900 border-t border-b border-emerald-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Section Title Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-900 text-xs font-bold px-3 py-1 rounded-full border border-emerald-300">
              <BookOpen className="w-3.5 h-3.5 text-emerald-700" />
              <span>Beginner Care Academy</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Seasonal Gardening Tips & Care Guides
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm max-w-2xl">
              Practical advice tailored for Guwahati’s tropical climate, heavy monsoons, and home garden enthusiasts.
            </p>
          </div>

          {/* Seasonal Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2 bg-white/80 p-1.5 rounded-2xl border border-emerald-200/80 shadow-xs">
            <button
              onClick={() => setActiveSeasonFilter('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeSeasonFilter === 'all'
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'text-slate-700 hover:bg-emerald-100/60'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>All Seasons</span>
            </button>

            <button
              onClick={() => setActiveSeasonFilter('monsoon')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeSeasonFilter === 'monsoon'
                  ? 'bg-blue-700 text-white shadow-xs'
                  : 'text-slate-700 hover:bg-blue-50'
              }`}
            >
              <CloudRain className="w-3.5 h-3.5" />
              <span>Monsoon</span>
            </button>

            <button
              onClick={() => setActiveSeasonFilter('summer')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeSeasonFilter === 'summer'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-slate-700 hover:bg-amber-50'
              }`}
            >
              <Sun className="w-3.5 h-3.5" />
              <span>Summer</span>
            </button>

            <button
              onClick={() => setActiveSeasonFilter('winter')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeSeasonFilter === 'winter'
                  ? 'bg-teal-700 text-white shadow-xs'
                  : 'text-slate-700 hover:bg-teal-50'
              }`}
            >
              <Snowflake className="w-3.5 h-3.5" />
              <span>Winter</span>
            </button>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredTips.map((tip) => (
            <div
              key={tip.id}
              onClick={() => setSelectedTip(tip)}
              className="bg-white rounded-2xl p-5 border border-emerald-100/90 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group cursor-pointer hover:-translate-y-1"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-[#eef5e8] group-hover:scale-110 transition-transform">
                    {tip.icon}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full">
                    {tip.difficulty} • {tip.readTime}
                  </span>
                </div>

                <h3 className="font-serif font-bold text-base text-slate-900 group-hover:text-emerald-800 transition-colors leading-snug">
                  {tip.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {tip.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-emerald-800">
                <span>Read Full Guide</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {/* Modal / Expanded View for selected tip */}
        {selectedTip && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
            <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl relative border border-emerald-100">
              <button
                onClick={() => setSelectedTip(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 p-2 text-sm font-bold"
              >
                ✕
              </button>

              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-[#eef5e8]">
                  {selectedTip.icon}
                </div>
                <div>
                  <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                    {selectedTip.season.toUpperCase()} CARE GUIDE
                  </span>
                  <h3 className="font-serif font-bold text-xl sm:text-2xl text-slate-900">
                    {selectedTip.title}
                  </h3>
                </div>
              </div>

              <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                {selectedTip.summary}
              </p>

              {/* Actionable Steps */}
              <div className="space-y-3">
                <h4 className="font-serif font-bold text-sm text-slate-900 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>Key Step-by-Step Instructions:</span>
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                  {selectedTip.steps.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Local Assam Regional Advice Box */}
              {selectedTip.localAssamNote && (
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 text-xs sm:text-sm space-y-1">
                  <div className="font-bold flex items-center gap-1.5 text-amber-900">
                    <span>📍 Guwahati & Assam Local Tip</span>
                  </div>
                  <p className="leading-relaxed text-amber-900/90">
                    {selectedTip.localAssamNote}
                  </p>
                </div>
              )}

              {/* Buttons at bottom */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={() => {
                    const topic = selectedTip.title;
                    setSelectedTip(null);
                    onAskDoctor(topic);
                  }}
                  className="w-full sm:flex-1 py-3 px-5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-colors"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Ask AI Doctor About This</span>
                </button>

                <button
                  onClick={() => setSelectedTip(null)}
                  className="w-full sm:w-auto py-3 px-6 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs sm:text-sm transition-colors"
                >
                  Close Guide
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
