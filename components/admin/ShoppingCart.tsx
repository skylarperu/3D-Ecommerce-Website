'use client';

import { useCart } from '@/context/CartContext';
import { motion } from 'framer-motion';
import { FaTrash, FaMinus, FaPlus } from 'react-icons/fa';
import Link from 'next/link';

export function ShoppingCart() {
  const { items, total, removeItem, updateQuantity } = useCart();

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-2xl text-gray-400 mb-4">Your cart is empty</p>
        <Link
          href="/products"
          className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-slate-800 rounded-xl p-6">
      <h2 className="text-2xl font-bold text-white mb-6">Shopping Cart</h2>

      <div className="space-y-4 mb-6">
        {items.map((item) => (
          <motion.div
            key={item.id}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-4 bg-slate-700 p-4 rounded-lg"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 object-cover rounded"
            />

            <div className="flex-1">
              <h3 className="text-white font-semibold">{item.name}</h3>
              <p className="text-purple-400">${item.price}</p>
            </div>

            <div className="flex items-center gap-2 bg-slate-600 rounded-lg p-2">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="text-gray-400 hover:text-white transition"
              >
                <FaMinus size={14} />
              </button>
              <span className="text-white w-8 text-center">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="text-gray-400 hover:text-white transition"
              >
                <FaPlus size={14} />
              </button>
            </div>

            <span className="text-white font-semibold w-24 text-right">
              ${(item.price * item.quantity).toFixed(2)}
            </span>

            <button
              onClick={() => removeItem(item.id)}
              className="text-red-500 hover:text-red-400 transition"
            >
              <FaTrash />
            </button>
          </motion.div>
        ))}
      </div>

      <div className="border-t border-slate-600 pt-4">
        <div className="flex justify-between items-center mb-6">
          <span className="text-xl text-gray-300">Total:</span>
          <span className="text-3xl font-bold text-purple-400">
            ${total.toFixed(2)}
          </span>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition"
        >
          Proceed to Checkout
        </motion.button>
      </div>
    </div>
  );
}
