import React, { useState } from 'react';
import { Plant } from '../types';
import { PLANTS_DATA } from '../data/plants';
import { Sparkles, CheckCircle2, RotateCcw, ArrowRight, Eye, ShoppingBag } from 'lucide-react';

interface PlantMatchQuizProps {
  onSelectPlant: (plant: Plant) => void;
  onAddToCart: (plant: Plant) => void;
}

export const PlantMatchQuiz: React.FC<PlantMatchQuizProps> = ({
  onSelectPlant,
  onAddToCart,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [locationPref, setLocationPref] = useState<'indoor' | 'outdoor' | 'sun' | 'lowlight'>('indoor');
  const [careLevel, setCareLevel] = useState<'beginner' | 'moderate' | 'expert'>('beginner');
  const [priority, setPriority] = useState<'native' | 'air' | 'lowwater' | 'flowering'>('air');

  const handleNext = () => {
    if (step < 3) {
      setStep((step + 1) as any);
    } else {
      setStep(4); // Results
    }
  };

  const resetQuiz = () => {
    setStep(1);
  };

  // Determine recommended plants based on choices
  const recommendedPlants = PLANTS_DATA.filter((p) => {
    if (priority === 'native' && p.isNativeAssam) return true;
    if (priority === 'air' && p.airPurifying) return true;
    if (priority === 'lowwater' && p.watering.includes('Minimal')) return true;
    if (priority === 'flowering' && (p.category === 'outdoor' || p.isNativeAssam)) return true;
    return p.maintenance === 'Low Maintenance';
  }).slice(0, 3);

  return (
    <section id="quiz" className="py-16 bg-gradient-to-b from-slate-900 to-emerald-950 text-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-800 text-emerald-200 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Plant Match Finder</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
            Find Your Perfect Plant Match
          </h2>
          <p className="text-emerald-200/80 text-sm max-w-xl mx-auto">
            Answer 3 quick questions about your Guwahati living space to receive personalized botanical recommendations.
          </p>
        </div>

        {/* Quiz Box */}
        <div className="bg-emerald-900/80 border border-emerald-700/80 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-md">
          {step < 4 && (
            <div className="mb-8">
              <div className="flex justify-between items-center text-xs text-emerald-300 font-semibold mb-2">
                <span>Step {step} of 3</span>
                <span>{step === 1 ? '33%' : step === 2 ? '66%' : '100%'} Completed</span>
              </div>
              <div className="w-full bg-emerald-950 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-amber-400 h-full transition-all duration-300"
                  style={{ width: `${(step / 3) * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* Question 1 */}
          {step === 1 && (
            <div className="space-y-6 animate-fadeIn">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white text-center">
                1. Where will your plant live?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { id: 'indoor', label: '🪴 Indoors (Living Room / Desk)', desc: 'Filtered indirect light, air conditioned room' },
                  { id: 'lowlight', label: '🌙 Low Light Corner / Bedroom', desc: 'Minimal natural light windows' },
                  { id: 'sun', label: '☀️ Sunny Balcony / Terrace', desc: 'Direct sunlight 4-6 hours per day' },
                  { id: 'outdoor', label: '🏡 Garden / Gate Entry', desc: 'Full outdoor sun and monsoon rain' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setLocationPref(item.id as any)}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      locationPref === item.id
                        ? 'bg-amber-400 text-emerald-950 border-amber-300 font-bold shadow-lg'
                        : 'bg-emerald-950/60 border-emerald-800 text-emerald-100 hover:bg-emerald-800'
                    }`}
                  >
                    <div className="font-bold text-sm mb-1">{item.label}</div>
                    <div className="text-xs opacity-80 font-normal">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Question 2 */}
          {step === 2 && (
            <div className="space-y-6 animate-fadeIn">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white text-center">
                2. What is your plant care experience?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { id: 'beginner', label: '🌱 Beginner', desc: 'Need unkillable hardy plants' },
                  { id: 'moderate', label: '🌿 Regular', desc: 'Can water weekly & wipe leaves' },
                  { id: 'expert', label: '🌺 Collector', desc: 'Love delicate orchids & exotic flora' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setCareLevel(item.id as any)}
                    className={`p-5 rounded-2xl border text-left transition-all ${
                      careLevel === item.id
                        ? 'bg-amber-400 text-emerald-950 border-amber-300 font-bold shadow-lg'
                        : 'bg-emerald-950/60 border-emerald-800 text-emerald-100 hover:bg-emerald-800'
                    }`}
                  >
                    <div className="font-bold text-base mb-1">{item.label}</div>
                    <div className="text-xs opacity-80 font-normal">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Question 3 */}
          {step === 3 && (
            <div className="space-y-6 animate-fadeIn">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white text-center">
                3. What feature matters most to you?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { id: 'native', label: '🌸 Native Assam Heritage', desc: 'Kapou Phool Orchid, GI Kaji Nemu' },
                  { id: 'air', label: '🌬️ Air Purification', desc: 'Filters benzene, indoor toxins & dust' },
                  { id: 'lowwater', label: '💧 Low Water Need', desc: 'Tolerates travel and occasional missed watering' },
                  { id: 'flowering', label: '🌺 Colorful Blossoms', desc: 'Bright Hibiscus, Bougainvillea, Orchids' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setPriority(item.id as any)}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      priority === item.id
                        ? 'bg-amber-400 text-emerald-950 border-amber-300 font-bold shadow-lg'
                        : 'bg-emerald-950/60 border-emerald-800 text-emerald-100 hover:bg-emerald-800'
                    }`}
                  >
                    <div className="font-bold text-sm mb-1">{item.label}</div>
                    <div className="text-xs opacity-80 font-normal">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step Controls */}
          {step < 4 && (
            <div className="mt-8 pt-6 border-t border-emerald-800/80 flex justify-between items-center">
              {step > 1 ? (
                <button
                  onClick={() => setStep((step - 1) as any)}
                  className="px-4 py-2 rounded-xl bg-emerald-950 text-emerald-200 text-xs font-semibold hover:bg-emerald-800"
                >
                  ← Back
                </button>
              ) : <div />}

              <button
                onClick={handleNext}
                className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold text-sm flex items-center gap-2 shadow-lg"
              >
                <span>{step === 3 ? 'See Recommended Matches' : 'Next Question'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Step 4: Results */}
          {step === 4 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="text-center space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-800 text-amber-300 text-xs font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Your Customized Results</span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-white">
                  Top Plant Recommendations For You
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {recommendedPlants.map((plant) => (
                  <div
                    key={plant.id}
                    className="bg-emerald-950/90 border border-emerald-700 rounded-2xl overflow-hidden p-3.5 space-y-3 flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="h-36 rounded-xl overflow-hidden bg-slate-800 relative">
                        <img src={plant.image} alt={plant.name} className="w-full h-full object-cover" />
                        {plant.isNativeAssam && (
                          <span className="absolute top-2 left-2 bg-amber-500 text-emerald-950 text-[10px] font-bold px-2 py-0.5 rounded">
                            🌸 Native Assam
                          </span>
                        )}
                      </div>
                      <h4 className="font-serif font-bold text-white text-base leading-tight">
                        {plant.name}
                      </h4>
                      <p className="text-xs text-emerald-200 line-clamp-2">
                        {plant.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-emerald-800/80 flex items-center justify-between">
                      <span className="font-bold text-amber-300 text-sm">₹{plant.price}</span>
                      <div className="flex gap-1.5">
                        <button
                          onClick={() => onSelectPlant(plant)}
                          className="p-2 rounded-lg bg-emerald-800 text-emerald-200 hover:text-white"
                          title="View Specs"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onAddToCart(plant)}
                          className="px-3 py-1.5 rounded-lg bg-amber-400 text-emerald-950 font-bold text-xs flex items-center gap-1"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Add</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center pt-4">
                <button
                  onClick={resetQuiz}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-950 text-emerald-300 text-xs font-semibold border border-emerald-800 hover:bg-emerald-900"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake Plant Match Quiz</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
