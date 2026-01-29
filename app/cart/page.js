'use client';

import React from 'react';
import { ShoppingCart } from '@/components/admin/ShoppingCart';
import { motion } from 'framer-motion';

export default function CartPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-5xl font-bold text-white">Shopping Cart</h1>
        </motion.div>

        <ShoppingCart />
      </div>
    </div>
  );
}
