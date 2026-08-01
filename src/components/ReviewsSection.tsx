import React, { useState } from 'react';
import { REVIEWS_DATA } from '../data/reviews';
import { Review } from '../types';
import { Star, MapPin, CheckCircle2, MessageSquarePlus, Send, Check } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>(REVIEWS_DATA);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAuthor, setNewAuthor] = useState('');
  const [newLocation, setNewLocation] = useState('Rani Gate, Azara, Guwahati');
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor || !newComment) return;

    const addedRev: Review = {
      id: Date.now().toString(),
      author: newAuthor,
      location: newLocation,
      rating: newRating,
      comment: newComment,
      date: 'Just now',
      verifiedPurchase: true,
    };

    setReviews([addedRev, ...reviews]);
    setSubmitted(true);
    setTimeout(() => {
      setShowAddForm(false);
      setSubmitted(false);
      setNewAuthor('');
      setNewComment('');
    }, 2000);
  };

  return (
    <section id="reviews" className="py-20 bg-emerald-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-800 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span>4.9 / 5.0 Star Rated in Guwahati</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white">
            Loved By Plant Parents Across Assam
          </h2>
          <p className="text-emerald-200 text-sm sm:text-base">
            Read real feedback from Guwahati residents in Rani Gate, Azara, Jalukbari, Dispur, and GS Road.
          </p>

          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold text-xs transition-colors mt-2"
          >
            <MessageSquarePlus className="w-4 h-4" />
            <span>Write a Customer Review</span>
          </button>
        </div>

        {/* Add Review Form Modal / Drawer */}
        {showAddForm && (
          <div className="max-w-2xl mx-auto mb-12 bg-emerald-900 p-6 sm:p-8 rounded-3xl border border-emerald-700 shadow-2xl space-y-4 animate-fadeIn">
            <h3 className="font-serif font-bold text-xl text-white">Share Your Amar Gaon Experience</h3>

            {submitted ? (
              <div className="p-4 bg-emerald-800 text-amber-300 font-bold text-sm rounded-xl flex items-center justify-center gap-2">
                <Check className="w-5 h-5" />
                <span>Thank you! Your review has been added.</span>
              </div>
            ) : (
              <form onSubmit={handleAddReview} className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-emerald-200 mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Priyanku Gogoi"
                      value={newAuthor}
                      onChange={(e) => setNewAuthor(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-emerald-950 border border-emerald-800 text-white placeholder-emerald-600 focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </div>
                  <div>
                    <label className="block text-emerald-200 mb-1">Guwahati Location</label>
                    <input
                      type="text"
                      placeholder="e.g. Ambikagiri Nagar"
                      value={newLocation}
                      onChange={(e) => setNewLocation(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-emerald-950 border border-emerald-800 text-white placeholder-emerald-600 focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-emerald-200 mb-1">Rating</label>
                  <select
                    value={newRating}
                    onChange={(e) => setNewRating(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-emerald-950 border border-emerald-800 text-amber-300 font-bold focus:outline-none focus:ring-2 focus:ring-amber-400"
                  >
                    <option value={5}>★★★★★ (5/5 Excellent)</option>
                    <option value={4}>★★★★☆ (4/5 Very Good)</option>
                    <option value={3}>★★★☆☆ (3/5 Average)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-emerald-200 mb-1">Your Feedback</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Tell us about the plant condition, staff advice, or delivery experience..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-emerald-950 border border-emerald-800 text-white placeholder-emerald-600 focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none"
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="px-4 py-2 rounded-xl bg-emerald-950 text-emerald-300 hover:bg-emerald-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-amber-400 text-emerald-950 font-bold flex items-center gap-1.5"
                  >
                    <Send className="w-4 h-4" />
                    <span>Post Review</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-emerald-900/60 border border-emerald-800/80 rounded-2xl p-6 space-y-4 flex flex-col justify-between hover:border-emerald-600 transition-colors"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  {rev.verifiedPurchase && (
                    <span className="text-[10px] bg-emerald-800 text-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      <span>Verified</span>
                    </span>
                  )}
                </div>

                <p className="text-xs text-emerald-100 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-3 border-t border-emerald-800/80 space-y-1">
                <div className="font-bold text-white text-sm">
                  {rev.author}
                </div>
                <div className="text-[11px] text-emerald-300 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
                  <span>{rev.location}</span>
                </div>
                {rev.plantPurchased && (
                  <div className="text-[10px] text-emerald-400 font-medium pt-1">
                    Bought: {rev.plantPurchased}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
