'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  FaDollarSign,
  FaUsers,
  FaShoppingCart,
} from 'react-icons/fa';

interface DashboardData {
  totalOrders: number;
  totalRevenue: number;
  totalUsers: number;
  recentOrders: any[];
}

export function AdminDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/admin/dashboard');
        const dashboardData = await response.json();
        setData(dashboardData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  const stats = [
    {
      icon: FaShoppingCart,
      label: 'Total Orders',
      value: data?.totalOrders || 0,
      color: 'purple',
    },
    {
      icon: FaDollarSign,
      label: 'Total Revenue',
      value: `$${(data?.totalRevenue || 0).toFixed(2)}`,
      color: 'green',
    },
    {
      icon: FaUsers,
      label: 'Total Users',
      value: data?.totalUsers || 0,
      color: 'blue',
    },
    {
      icon: null,
      label: 'Growth',
      value: '+12.5%',
      color: 'pink',
    },
  ];

  const colorMap = {
    purple: 'from-purple-600 to-purple-400',
    green: 'from-green-600 to-green-400',
    blue: 'from-blue-600 to-blue-400',
    pink: 'from-pink-600 to-pink-400',
  };

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold text-white">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon as any;
          const bgGradient = colorMap[stat.color as keyof typeof colorMap];

          return (
            <motion.div
              key={stat.label}
              whileHover={{ y: -5 }}
              className={`bg-gradient-to-br ${bgGradient} rounded-xl p-6 text-white shadow-lg`}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold opacity-80">{stat.label}</h3>
                {Icon && <Icon size={24} className="opacity-60" />}
              </div>
              <p className="text-3xl font-bold">{stat.value}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Recent Orders */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-800 rounded-xl p-6"
      >
        <h2 className="text-2xl font-bold text-white mb-4">Recent Orders</h2>
        <div className="space-y-3">
          {data?.recentOrders.map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between bg-slate-700 p-4 rounded-lg"
            >
              <div>
                <p className="text-white font-semibold">{order.orderNumber}</p>
                <p className="text-gray-400 text-sm">{order.user?.email}</p>
              </div>
              <div className="text-right">
                <p className="text-purple-400 font-semibold">
                  ${order.total.toFixed(2)}
                </p>
                <p className="text-gray-400 text-sm">{order.status}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
