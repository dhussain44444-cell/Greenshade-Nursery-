import React, { useState } from 'react';
import { CartItem } from '../types';
import { X, Trash2, ShoppingBag, ArrowRight, CheckCircle2, MapPin, Truck, ShieldCheck, CreditCard } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (plantId: string, quantity: number) => void;
  onRemoveItem: (plantId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [deliveryMode, setDeliveryMode] = useState<'delivery' | 'pickup'>('delivery');
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'cod' | 'card'>('upi');

  // Customer details state
  const [custName, setCustName] = useState('');
  const [custPhone, setCustPhone] = useState('');
  const [custAddress, setCustAddress] = useState('Rani gate, Azara, Guwahati, Assam 781017');
  const [orderPlaced, setOrderPlaced] = useState(false);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.plant.price * item.quantity, 0);
  const deliveryFee = deliveryMode === 'pickup' || subtotal >= 999 || cartItems.length === 0 ? 0 : 99;
  const grandTotal = subtotal + deliveryFee;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!custName || !custPhone) return;
    setOrderPlaced(true);
  };

  const handleFinishOrder = () => {
    setOrderPlaced(false);
    setIsCheckoutModalOpen(false);
    onClearCart();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white text-slate-900 shadow-2xl flex flex-col justify-between">
          {/* Cart Header */}
          <div className="bg-emerald-950 text-white p-5 flex items-center justify-between border-b border-emerald-900">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-emerald-400" />
              <h2 className="font-serif font-bold text-lg">Your Botanical Order</h2>
              <span className="bg-emerald-800 text-amber-300 text-xs font-bold px-2 py-0.5 rounded-full">
                {cartItems.reduce((acc, i) => acc + i.quantity, 0)} items
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-emerald-900 text-slate-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Delivery Threshold Bar */}
          <div className="bg-emerald-50 px-5 py-2.5 border-b border-emerald-100 flex items-center justify-between text-xs text-emerald-900">
            <span className="flex items-center gap-1 font-medium">
              <Truck className="w-4 h-4 text-emerald-700" />
              {subtotal >= 999 ? '🎉 You unlocked FREE Delivery in Guwahati!' : `Add ₹${999 - subtotal} more for Free Local Delivery`}
            </span>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="text-5xl">🪴</div>
                <h3 className="font-serif font-bold text-slate-800">Your cart is empty</h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Browse our plant catalog and add your favorite houseplants, orchids, or fertilizers.
                </p>
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-emerald-800 text-white text-xs font-bold rounded-xl hover:bg-emerald-700"
                >
                  Explore Plants
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.plant.id}
                  className="flex gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-200/80 items-center justify-between"
                >
                  <img
                    src={item.plant.image}
                    alt={item.plant.name}
                    className="w-16 h-16 object-cover rounded-xl shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif font-bold text-sm text-slate-900 truncate">
                      {item.plant.name}
                    </h4>
                    <div className="text-xs font-bold text-emerald-800 mt-0.5">
                      ₹{item.plant.price}
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden bg-white text-xs">
                        <button
                          onClick={() => onUpdateQuantity(item.plant.id, item.quantity - 1)}
                          className="px-2 py-0.5 text-slate-600 hover:bg-slate-100 font-bold"
                        >
                          -
                        </button>
                        <span className="px-2 py-0.5 font-bold text-slate-800">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.plant.id, item.quantity + 1)}
                          className="px-2 py-0.5 text-slate-600 hover:bg-slate-100 font-bold"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.plant.id)}
                        className="text-slate-400 hover:text-rose-600 p-1"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="text-right font-bold text-sm text-slate-900 shrink-0">
                    ₹{item.plant.price * item.quantity}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Cart Footer & Checkout */}
          {cartItems.length > 0 && (
            <div className="p-5 bg-slate-50 border-t border-slate-200 space-y-4">
              {/* Delivery / Pickup Option */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setDeliveryMode('delivery')}
                  className={`p-2.5 rounded-xl border font-bold flex items-center justify-center gap-1.5 transition-colors ${
                    deliveryMode === 'delivery'
                      ? 'bg-emerald-800 text-white border-emerald-800'
                      : 'bg-white text-slate-700 border-slate-300'
                  }`}
                >
                  <Truck className="w-3.5 h-3.5" />
                  <span>Guwahati Delivery</span>
                </button>

                <button
                  type="button"
                  onClick={() => setDeliveryMode('pickup')}
                  className={`p-2.5 rounded-xl border font-bold flex items-center justify-center gap-1.5 transition-colors ${
                    deliveryMode === 'pickup'
                      ? 'bg-emerald-800 text-white border-emerald-800'
                      : 'bg-white text-slate-700 border-slate-300'
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Rani Gate Pickup</span>
                </button>
              </div>

              {/* Price Calculation Summary */}
              <div className="space-y-1.5 text-xs text-slate-600 pt-1">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-800">₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Charge</span>
                  <span className="font-semibold text-slate-800">
                    {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-slate-900 pt-2 border-t border-slate-200">
                  <span>Total Amount</span>
                  <span className="text-emerald-800 text-base">₹{grandTotal}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => setIsCheckoutModalOpen(true)}
                className="w-full py-3.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-colors"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Checkout Modal Dialog */}
      {isCheckoutModalOpen && (
        <div className="fixed inset-0 z-60 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-slate-200 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-3 border-b border-slate-200">
              <h3 className="font-serif font-bold text-xl text-emerald-950">
                Amar Gaon Order Checkout
              </h3>
              <button
                onClick={() => setIsCheckoutModalOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {orderPlaced ? (
              <div className="py-8 text-center space-y-4">
                <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto" />
                <h4 className="font-serif font-bold text-2xl text-slate-900">
                  Order Successfully Placed!
                </h4>
                <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                  Thank you, <span className="font-bold text-slate-900">{custName}</span>! Your plant order of <span className="font-bold text-emerald-800">₹{grandTotal}</span> has been confirmed. Our team in Amar Gaon Nursery will prepare your plants with care.
                </p>
                <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 text-xs text-emerald-900 text-left space-y-1">
                  <div><strong>Contact:</strong> 080112 53258</div>
                  <div><strong>Pickup/Delivery:</strong> {deliveryMode === 'pickup' ? 'Rani Gate Nursery Pickup' : custAddress}</div>
                  <div><strong>Payment Mode:</strong> {paymentMethod.toUpperCase()}</div>
                </div>

                <button
                  onClick={handleFinishOrder}
                  className="w-full py-3.5 bg-emerald-800 text-white font-bold text-sm rounded-xl hover:bg-emerald-700"
                >
                  Done & Back to Store
                </button>
              </div>
            ) : (
              <form onSubmit={handlePlaceOrder} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Himangshu Das"
                    value={custName}
                    onChange={(e) => setCustName(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Phone Number (For Order Confirmation)</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 080112 53258"
                    value={custPhone}
                    onChange={(e) => setCustPhone(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                {deliveryMode === 'delivery' && (
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Delivery Address in Guwahati</label>
                    <textarea
                      rows={2}
                      required
                      placeholder="e.g. Rani gate, Azara, Guwahati, Assam 781017"
                      value={custAddress}
                      onChange={(e) => setCustAddress(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-600 resize-none"
                    />
                  </div>
                )}

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Payment Method</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'upi', label: 'GPay / UPI' },
                      { id: 'cod', label: 'Cash on Delivery' },
                      { id: 'card', label: 'Card' },
                    ].map((pm) => (
                      <button
                        key={pm.id}
                        type="button"
                        onClick={() => setPaymentMethod(pm.id as any)}
                        className={`p-2.5 rounded-xl border font-bold text-xs ${
                          paymentMethod === pm.id
                            ? 'bg-emerald-800 text-white border-emerald-800'
                            : 'bg-slate-50 text-slate-700 border-slate-300'
                        }`}
                      >
                        {pm.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200">
                  <div className="flex justify-between text-sm font-bold text-slate-900 mb-3">
                    <span>Grand Total To Pay</span>
                    <span className="text-emerald-800 text-base">₹{grandTotal}</span>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-lg transition-colors"
                  >
                    Confirm & Place Order
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
