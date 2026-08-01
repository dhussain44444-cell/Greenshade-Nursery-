import React, { useState } from 'react';
import { Plant } from '../types';
import { X, Sun, Droplets, Shield, Sparkles, ShoppingBag, Heart, Check, MapPin, Share2 } from 'lucide-react';

interface PlantDetailModalProps {
  plant: Plant | null;
  onClose: () => void;
  onAddToCart: (plant: Plant, quantity: number) => void;
  onToggleWishlist: (plant: Plant) => void;
  isWishlisted: boolean;
  onAskDoctor: (plantName: string) => void;
}

export const PlantDetailModal: React.FC<PlantDetailModalProps> = ({
  plant,
  onClose,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  onAskDoctor,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!plant) return null;

  const handleAdd = () => {
    onAddToCart(plant, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 max-h-[90vh] flex flex-col md:flex-row">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white backdrop-blur-md transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Image Section */}
        <div className="md:w-1/2 relative bg-slate-100 min-h-[250px] md:min-h-[400px]">
          <img
            src={plant.image}
            alt={plant.name}
            className="w-full h-full object-cover"
          />
          {plant.isNativeAssam && (
            <div className="absolute top-4 left-4 bg-amber-500 text-emerald-950 font-bold text-xs px-3 py-1 rounded-full shadow-md">
              🌸 Native Assam Flora
            </div>
          )}
        </div>

        {/* Right Info Section */}
        <div className="md:w-1/2 p-6 sm:p-8 overflow-y-auto space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-1">
                <span>{plant.category.replace('_', ' ')}</span>
                <span className="text-amber-600 font-bold">★ {plant.rating} ({plant.reviewsCount} reviews)</span>
              </div>

              <h2 className="font-serif text-2xl font-bold text-slate-900 leading-tight">
                {plant.name}
              </h2>
              <p className="text-sm font-mono italic text-slate-500 mt-0.5">
                {plant.botanicalName}
              </p>
            </div>

            {/* Price Badge */}
            <div className="flex items-baseline gap-2 bg-emerald-50 p-3 rounded-2xl border border-emerald-100">
              <span className="text-2xl font-bold text-emerald-950">₹{plant.price}</span>
              {plant.originalPrice && (
                <span className="text-sm text-slate-400 line-through">₹{plant.originalPrice}</span>
              )}
              <span className="text-xs font-medium text-emerald-800 ml-auto bg-emerald-200/60 px-2.5 py-1 rounded-md">
                Fresh Stock in Guwahati
              </span>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              {plant.description}
            </p>

            {/* Botanical Care Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
              <div className="flex items-center gap-2">
                <Sun className="w-4 h-4 text-amber-500 shrink-0" />
                <div>
                  <div className="font-semibold text-slate-700">Light Need</div>
                  <div className="text-slate-500">{plant.sunlight}</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Droplets className="w-4 h-4 text-cyan-500 shrink-0" />
                <div>
                  <div className="font-semibold text-slate-700">Watering</div>
                  <div className="text-slate-500">{plant.watering}</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-600 shrink-0" />
                <div>
                  <div className="font-semibold text-slate-700">Pet Safe</div>
                  <div className="text-slate-500">{plant.petFriendly ? 'Yes (Non-toxic)' : 'Keep away'}</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                <div>
                  <div className="font-semibold text-slate-700">Ideal Place</div>
                  <div className="text-slate-500 line-clamp-1">{plant.idealFor}</div>
                </div>
              </div>
            </div>

            {/* Ask AI Doctor Banner */}
            <button
              onClick={() => {
                onAskDoctor(plant.name);
                onClose();
              }}
              className="w-full py-2.5 px-4 bg-amber-50 hover:bg-amber-100 border border-amber-300 rounded-xl text-xs font-semibold text-amber-900 flex items-center justify-between transition-colors"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Have care questions about {plant.name}?</span>
              </div>
              <span className="underline font-bold">Ask AI Doctor →</span>
            </button>
          </div>

          {/* Quantity & Cart Action */}
          <div className="space-y-3 pt-4 border-t border-slate-200">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center border border-slate-300 rounded-xl overflow-hidden bg-slate-50">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1.5 text-slate-600 hover:bg-slate-200 font-bold"
                >
                  -
                </button>
                <span className="px-4 py-1.5 font-bold text-slate-800 text-sm">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1.5 text-slate-600 hover:bg-slate-200 font-bold"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => onToggleWishlist(plant)}
                className={`p-3 rounded-xl border transition-colors ${
                  isWishlisted
                    ? 'bg-rose-50 border-rose-200 text-rose-600'
                    : 'bg-white border-slate-300 text-slate-600 hover:bg-slate-50'
                }`}
                title="Wishlist"
              >
                <Heart className="w-5 h-5 fill-current" />
              </button>
            </div>

            <button
              onClick={handleAdd}
              className={`w-full py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-lg transition-all ${
                added
                  ? 'bg-teal-600 text-white'
                  : 'bg-emerald-800 hover:bg-emerald-700 text-white'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-5 h-5" />
                  <span>Added {quantity} to Cart!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-5 h-5" />
                  <span>Add {quantity} to Cart • ₹{plant.price * quantity}</span>
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 pt-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              <span>Available for pickup at Rani Gate, Azara Nursery or local Guwahati delivery</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
