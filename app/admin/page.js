'use client';

import React from 'react';
import { AdminDashboard } from '@/components/admin/AdminDashboard';
import { motion } from 'framer-motion';

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <AdminDashboard />
        </motion.div>
      </div>
    </div>
  );
}
