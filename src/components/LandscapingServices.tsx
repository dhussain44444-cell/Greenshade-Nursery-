import React, { useState } from 'react';
import { SERVICES_DATA } from '../data/services';
import landscapeImg from '../assets/images/landscape_showcase_1785333084939.jpg';
import { Sun, Building2, Trees, Stethoscope, CheckCircle2, Calculator, Send, Check } from 'lucide-react';

export const LandscapingServices: React.FC = () => {
  const [selectedGardenType, setSelectedGardenType] = useState<'terrace' | 'lawn' | 'vertical' | 'balcony'>('terrace');
  const [sqft, setSqft] = useState(250);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerArea, setCustomerArea] = useState('Rani Gate, Azara, Guwahati');
  const [submitted, setSubmitted] = useState(false);

  // Simple pricing estimate
  const pricePerSqft = {
    terrace: 85,
    lawn: 60,
    vertical: 220,
    balcony: 95,
  }[selectedGardenType];

  const estimatedTotal = sqft * pricePerSqft;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone) return;
    setSubmitted(true);
  };

  const getIcon = (name: string) => {
    switch (name) {
      case 'Sun': return <Sun className="w-6 h-6 text-emerald-400" />;
      case 'Building2': return <Building2 className="w-6 h-6 text-emerald-400" />;
      case 'Trees': return <Trees className="w-6 h-6 text-emerald-400" />;
      default: return <Stethoscope className="w-6 h-6 text-emerald-400" />;
    }
  };

  return (
    <section id="services" className="py-20 bg-emerald-950 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800 text-emerald-200 text-xs font-semibold uppercase tracking-wider">
            <span>Guwahati Landscape Architecture</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white">
            Professional Landscape & Terrace Garden Services
          </h2>
          <p className="text-emerald-200/90 text-sm sm:text-base">
            From lush rooftop balconies in Rani Gate, Azara to corporate vertical living walls across Guwahati, our landscape team turns concrete spaces into vibrant botanical retreats.
          </p>
        </div>

        {/* Featured Landscape Showcase Banner */}
        <div className="mb-16 rounded-3xl overflow-hidden border border-emerald-800/80 bg-emerald-900/60 shadow-2xl grid lg:grid-cols-12 gap-0">
          <div className="lg:col-span-7 relative min-h-[300px] lg:min-h-[420px]">
            <img
              src={landscapeImg}
              alt="Landscaping Showcase Amar Gaon Nursery"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-transparent to-transparent lg:hidden" />
          </div>

          <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-center space-y-6 bg-emerald-900/90">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-300">
              Assam Climate Optimized
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Tailored Terrace & Estate Gardens in Assam
            </h3>
            <p className="text-sm text-emerald-100 leading-relaxed">
              Assam monsoon rains require specialized soil drainage, waterproof layering, and hurricane-resistant plants. Our 12+ years of local Guwahati experience guarantees long-lasting green beauty.
            </p>

            <ul className="space-y-2 text-xs sm:text-sm text-emerald-200">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>3D Architectural Mockup & Botanical Planning</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Automated Drip Irrigation & Water Savings</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>3 Months Complimentary Nursery Maintenance</span>
              </li>
            </ul>

            <a
              href="#landscape-calculator"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold text-sm transition-colors"
            >
              <Calculator className="w-4 h-4" />
              <span>Calculate Estimate Below</span>
            </a>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {SERVICES_DATA.map((srv) => (
            <div
              key={srv.id}
              className="bg-emerald-900/70 border border-emerald-800 rounded-2xl p-6 flex flex-col justify-between hover:border-emerald-500/60 transition-all duration-300 group"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-800 border border-emerald-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {getIcon(srv.iconName)}
                </div>

                <h3 className="font-serif font-bold text-xl text-white">
                  {srv.title}
                </h3>

                <p className="text-xs text-emerald-200/90 leading-relaxed">
                  {srv.shortDesc}
                </p>

                <ul className="space-y-1.5 text-xs text-emerald-300/90 pt-2 border-t border-emerald-800/80">
                  {srv.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-emerald-400 font-bold">•</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 mt-6 border-t border-emerald-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-emerald-300 block">Starting from</span>
                  <span className="font-bold text-amber-300 text-sm">{srv.startingPrice}</span>
                </div>
                <a
                  href="tel:08011253258"
                  className="px-3 py-1.5 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-medium transition-colors"
                >
                  Book Visit
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Landscape Cost Estimator Form */}
        <div id="landscape-calculator" className="bg-emerald-900 rounded-3xl p-6 sm:p-10 border border-emerald-700 shadow-2xl max-w-4xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold">
              <Calculator className="w-4 h-4" />
              <span>Instant Guwahati Estimate</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Terrace & Garden Project Cost Calculator
            </h3>
            <p className="text-xs sm:text-sm text-emerald-200">
              Select your garden setup and area size for an immediate cost estimate in Indian Rupees.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left Controls */}
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-emerald-200 mb-2">
                  1. Select Garden Type
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {[
                    { id: 'terrace', label: 'Rooftop Terrace' },
                    { id: 'balcony', label: 'Balcony Nook' },
                    { id: 'lawn', label: 'Lawn Turf Estate' },
                    { id: 'vertical', label: 'Vertical Living Wall' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelectedGardenType(item.id as any)}
                      className={`p-3 rounded-xl border font-medium text-left transition-all ${
                        selectedGardenType === item.id
                          ? 'bg-amber-400 text-emerald-950 border-amber-300 font-bold shadow'
                          : 'bg-emerald-950/60 text-emerald-200 border-emerald-800 hover:bg-emerald-800'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center text-xs text-emerald-200 font-bold mb-2">
                  <span>2. Estimated Area Size (Sq. Ft.)</span>
                  <span className="text-amber-300 font-mono text-sm">{sqft} sq ft</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="1500"
                  step="25"
                  value={sqft}
                  onChange={(e) => setSqft(Number(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-emerald-400 mt-1">
                  <span>50 sq ft (Compact Balcony)</span>
                  <span>1500 sq ft (Large Rooftop)</span>
                </div>
              </div>

              {/* Estimate Result Display */}
              <div className="bg-emerald-950 p-4 rounded-2xl border border-emerald-700 flex items-center justify-between">
                <div>
                  <div className="text-[11px] text-emerald-300">Estimated Project Cost</div>
                  <div className="text-2xl font-bold text-amber-300">
                    ₹{estimatedTotal.toLocaleString('en-IN')}
                  </div>
                  <div className="text-[10px] text-emerald-400">Includes soil, plants & labor in Guwahati</div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-emerald-300 block">Rate</span>
                  <span className="text-xs font-mono text-emerald-200">₹{pricePerSqft}/sq ft</span>
                </div>
              </div>
            </div>

            {/* Right Contact Lead Form */}
            <div className="bg-emerald-950/90 p-6 rounded-2xl border border-emerald-800 space-y-4">
              <h4 className="font-serif font-bold text-lg text-white">
                Request Free Site Measurement Visit
              </h4>
              <p className="text-xs text-emerald-200">
                Our landscape specialist will inspect your Rani Gate, Azara / Guwahati premises and bring plant samples.
              </p>

              {submitted ? (
                <div className="bg-emerald-800/80 p-6 rounded-xl border border-emerald-600 text-center space-y-2">
                  <Check className="w-10 h-10 text-amber-300 mx-auto" />
                  <h5 className="font-bold text-white">Inquiry Received!</h5>
                  <p className="text-xs text-emerald-200">
                    Thank you, {customerName}! Our team will call you shortly at {customerPhone} to finalize your site visit.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3 text-xs">
                  <div>
                    <label className="block text-emerald-300 font-medium mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Goswami"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-emerald-900 border border-emerald-700 text-white placeholder-emerald-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-emerald-300 font-medium mb-1">Contact Phone Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 080112 53258 or 9876543210"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-emerald-900 border border-emerald-700 text-white placeholder-emerald-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-emerald-300 font-medium mb-1">Guwahati Location / Area</label>
                    <input
                      type="text"
                      placeholder="e.g. Rani Gate, Azara, Jalukbari, Dispur"
                      value={customerArea}
                      onChange={(e) => setCustomerArea(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-emerald-900 border border-emerald-700 text-white placeholder-emerald-500 focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold text-xs flex items-center justify-center gap-2 transition-colors mt-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Free Site Visit Request</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
