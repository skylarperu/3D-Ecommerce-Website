'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { FaCreditCard, FaLock } from 'react-icons/fa';

export function CheckoutForm() {
  const { items, total, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
  });

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePayment = async () => {
    setLoading(true);

    try {
      // TODO: Integrate with Stripe
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          userId: 'user-id', // Get from session
          shippingAddress: formData,
        }),
      });

      const { session } = await response.json();

      // Redirect to Stripe
      if (session.url) {
        window.location.href = session.url;
      }

      clearCart();
      toast.success('Order placed successfully!');
    } catch (error) {
      toast.error('Payment failed');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Steps */}
      <div className="flex justify-between items-center mb-8">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center flex-1">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition ${
                step >= s
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                  : 'bg-slate-700 text-gray-400'
              }`}
            >
              {s}
            </motion.div>
            {s < 3 && (
              <div
                className={`flex-1 h-1 mx-2 ${
                  step >= s ? 'bg-purple-600' : 'bg-slate-700'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Shipping */}
      {step === 1 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          <h2 className="text-2xl font-bold text-white">Shipping Address</h2>

          <div className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-slate-800 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full bg-slate-800 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            <input
              type="text"
              name="street"
              placeholder="Street Address"
              value={formData.street}
              onChange={handleChange}
              className="w-full bg-slate-800 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                className="bg-slate-800 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <input
                type="text"
                name="state"
                placeholder="State"
                value={formData.state}
                onChange={handleChange}
                className="bg-slate-800 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="zipCode"
                placeholder="ZIP Code"
                value={formData.zipCode}
                onChange={handleChange}
                className="bg-slate-800 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                className="bg-slate-800 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setStep(2)}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold"
          >
            Continue to Review
          </motion.button>
        </motion.div>
      )}

      {/* Step 2: Review Order */}
      {step === 2 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          <h2 className="text-2xl font-bold text-white">Order Review</h2>

          <div className="bg-slate-800 rounded-lg p-6 space-y-3">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between text-gray-300">
                <span>
                  {item.name} x{item.quantity}
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}

            <div className="border-t border-slate-700 pt-3 flex justify-between text-white font-bold text-lg">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setStep(1)}
              className="flex-1 bg-slate-700 text-white py-3 rounded-lg font-semibold hover:bg-slate-600 transition"
            >
              Back
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setStep(3)}
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold"
            >
              Proceed to Payment
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Step 3: Payment */}
      {step === 3 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          <h2 className="text-2xl font-bold text-white">Payment</h2>

          <div className="bg-slate-800 rounded-lg p-6 flex items-center gap-3 text-gray-300">
            <FaLock className="text-green-500" />
            <span>Your payment is secured by Stripe</span>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePayment}
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <FaCreditCard />
            {loading ? 'Processing...' : 'Complete Payment'}
          </motion.button>
        </motion.div>
      )}
    </div>
  );
}
