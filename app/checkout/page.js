'use client';

import React from 'react';
import { CheckoutForm } from '@/components/admin/CheckoutForm';
import { motion } from 'framer-motion';

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-5xl font-bold text-white">Checkout</h1>
          <p className="text-gray-400 mt-2">Complete your purchase securely</p>
        </motion.div>

        <CheckoutForm />
      </div>
    </div>
  );
}
