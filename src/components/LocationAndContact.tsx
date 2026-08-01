import React, { useState } from 'react';
import { MapPin, Phone, Clock, Mail, MessageCircle, Navigation, Send, CheckCircle2, Building2 } from 'lucide-react';

export const LocationAndContact: React.FC = () => {
  const [formSent, setFormSent] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
  };

  return (
    <section id="location" className="py-20 bg-slate-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-800 text-emerald-200 text-xs font-semibold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
            <span>Visit Our Nursery in Guwahati</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white">
            Amar Gaon Nursery Location & Contact
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Walk into our lush greenhouse in Rani Gate, Azara or call our botanical team for immediate plant recommendations and landscaping inquiries.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Official Details Card */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-emerald-950 p-6 sm:p-8 rounded-3xl border border-emerald-800 shadow-xl space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-800 border border-emerald-700 flex items-center justify-center text-emerald-300 shadow">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-bold text-white">
                    Amar Gaon Nursery
                  </h3>
                  <p className="text-xs text-emerald-300">Rani Gate, Azara • Guwahati</p>
                </div>
              </div>

              <div className="space-y-4 pt-2 border-t border-emerald-900/80 text-sm">
                {/* Full Address */}
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-white mb-0.5">Physical Address</div>
                    <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                      Rani gate, Azara, Guwahati, Assam 781017, India
                    </p>
                    <p className="text-[11px] text-emerald-400 mt-1 italic">
                      Landmark: Near Rani Gate, Azara, Guwahati.
                    </p>
                  </div>
                </div>

                {/* Contact Phone */}
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-white mb-0.5">Contact Number</div>
                    <a
                      href="tel:08011253258"
                      className="text-amber-300 font-mono text-base font-bold hover:underline"
                    >
                      080112 53258
                    </a>
                    <span className="text-xs text-slate-400 block">(Click to call directly)</span>
                  </div>
                </div>

                {/* Operating Hours */}
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-white mb-0.5">Nursery Operating Hours</div>
                    <p className="text-slate-300 text-xs sm:text-sm">
                      Monday to Sunday: <span className="text-emerald-300 font-semibold">8:00 AM – 7:30 PM</span>
                    </p>
                    <span className="text-[11px] text-slate-400 block">Open on all public holidays in Assam</span>
                  </div>
                </div>
              </div>

              {/* Direct Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-emerald-900/80">
                <a
                  href="tel:08011253258"
                  className="py-3 px-4 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors border border-emerald-700 shadow"
                >
                  <Phone className="w-4 h-4 text-amber-300" />
                  <span>Call 080112 53258</span>
                </a>

                <a
                  href="https://wa.me/918011253258?text=Hello%20Amar%20Gaon%20Nursery,%20I%20would%20like%20to%20visit%20or%20inquire%20about%20plants"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-200" />
                  <span>WhatsApp Chat</span>
                </a>
              </div>
            </div>

            {/* Embedded Visual Map Card */}
            <div className="bg-slate-800 rounded-3xl p-4 border border-slate-700 shadow-xl space-y-3">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-300 px-1">
                <span className="flex items-center gap-1">
                  <Navigation className="w-4 h-4 text-emerald-400" />
                  <span>Rani Gate, Azara Route Location</span>
                </span>
                <span className="text-amber-400 font-mono">Assam 781017</span>
              </div>

              <div className="relative w-full h-52 rounded-2xl overflow-hidden bg-slate-900 border border-slate-700">
                <iframe
                  title="Amar Gaon Nursery Guwahati Map Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3582.5!2d91.6!3d26.1!2m3!1f0!0!f0!0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sRani%20gate%2C%20Azara%2C%20Guwahati%2C%20Assam%20781017!5e0!3m2!1sen!2sin!4v1600000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'contrast(1.1) brightness(0.95)' }}
                  allowFullScreen={false}
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Direct Quick Inquiry Form */}
          <div className="lg:col-span-6 bg-slate-800/90 p-6 sm:p-8 rounded-3xl border border-slate-700 shadow-xl space-y-6">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-1">
                Quick Nursery Inquiry
              </span>
              <h3 className="font-serif text-2xl font-bold text-white">
                Send Us a Message
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                Have a question regarding plant stock, bulk orders, or custom plant pots? Send us a note!
              </p>
            </div>

            {formSent ? (
              <div className="bg-emerald-950 p-8 rounded-2xl border border-emerald-700 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-amber-300 mx-auto" />
                <h4 className="font-serif font-bold text-xl text-white">Message Sent!</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Thank you {name}! Amar Gaon Nursery team will review your query and contact you at {phone}.
                </p>
                <button
                  onClick={() => setFormSent(false)}
                  className="px-4 py-2 bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Biju Phukan"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Mobile Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 080112 53258"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Your Question / Plant Request</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="e.g. I am looking for Kapou Phool orchids or large terracotta planters for my terrace in Azara..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-2 transition-colors shadow-lg"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Inquiry to Amar Gaon Nursery</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
