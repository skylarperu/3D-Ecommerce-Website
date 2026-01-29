'use client';

import { motion } from 'framer-motion';
import { FaBox, FaShippingFast, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

interface OrderTrackerProps {
  orderNumber: string;
  status: 'PENDING' | 'CONFIRMED' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  estimatedDelivery?: string;
}

export function OrderTracker({ orderNumber, status, estimatedDelivery }: OrderTrackerProps) {
  const steps = [
    { key: 'PENDING', label: 'Pendiente', icon: FaBox },
    { key: 'CONFIRMED', label: 'Confirmado', icon: FaCheckCircle },
    { key: 'PROCESSING', label: 'Procesando', icon: FaBox },
    { key: 'SHIPPED', label: 'Enviado', icon: FaShippingFast },
    { key: 'DELIVERED', label: 'Entregado', icon: FaCheckCircle },
  ];

  const statusIndex = steps.findIndex((s) => s.key === status);
  const isCancelled = status === 'CANCELLED';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-800 rounded-xl p-6 space-y-6"
    >
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Order {orderNumber}</h2>
        <p className="text-gray-400">
          {isCancelled ? '❌ Pedido Cancelado' : `Status: ${status}`}
        </p>
      </div>

      {!isCancelled && (
        <>
          {/* Progress Bar */}
          <div className="relative">
            <div className="flex justify-between relative z-10 mb-8">
              {steps.map((step, idx) => {
                const Icon = step.icon;
                const isActive = idx <= statusIndex;

                return (
                  <motion.div
                    key={step.key}
                    whileHover={{ scale: 1.1 }}
                    className="flex flex-col items-center"
                  >
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-colors ${
                        isActive
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                          : 'bg-slate-700 text-gray-400'
                      }`}
                    >
                      <Icon size={20} />
                    </div>
                    <p className={`text-xs font-semibold ${isActive ? 'text-white' : 'text-gray-400'}`}>
                      {step.label}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            {/* Line */}
            <div className="absolute top-6 left-0 right-0 h-1 bg-slate-700">
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: `${(statusIndex / (steps.length - 1)) * 100}%` }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
                className="h-full bg-gradient-to-r from-purple-600 to-pink-600"
              />
            </div>
          </div>

          {/* Estimated Delivery */}
          {estimatedDelivery && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-slate-700/50 rounded-lg p-4 border border-slate-600"
            >
              <p className="text-gray-300 text-sm">
                📅 <strong>Estimated Delivery:</strong> {estimatedDelivery}
              </p>
            </motion.div>
          )}
        </>
      )}

      {isCancelled && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-red-900/30 rounded-lg p-4 border border-red-600 flex items-center gap-3"
        >
          <FaExclamationCircle className="text-red-500" size={20} />
          <p className="text-red-300">Tu pedido ha sido cancelado</p>
        </motion.div>
      )}
    </motion.div>
  );
}
