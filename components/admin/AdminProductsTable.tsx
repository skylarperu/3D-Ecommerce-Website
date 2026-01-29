'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaEye } from 'react-icons/fa';

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  createdAt: string;
}

interface AdminProductsTableProps {
  products: Product[];
}

export function AdminProductsTable({ products }: AdminProductsTableProps) {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('name');

  const filteredProducts = products
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sort === 'name') return a.name.localeCompare(b.name);
      if (sort === 'price') return a.price - b.price;
      if (sort === 'stock') return a.stock - b.stock;
      return 0;
    });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-800 rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Products</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg font-semibold"
        >
          + Add Product
        </motion.button>
      </div>

      {/* Search & Sort */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <FaSearch className="absolute left-3 top-3 text-gray-500" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-700 text-white pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="bg-slate-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="name">Sort by Name</option>
          <option value="price">Sort by Price</option>
          <option value="stock">Sort by Stock</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="text-left text-gray-400 font-semibold py-3 px-4">Product</th>
              <th className="text-left text-gray-400 font-semibold py-3 px-4">Price</th>
              <th className="text-left text-gray-400 font-semibold py-3 px-4">Stock</th>
              <th className="text-left text-gray-400 font-semibold py-3 px-4">Category</th>
              <th className="text-left text-gray-400 font-semibold py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <motion.tr
                key={product.id}
                whileHover={{ backgroundColor: 'rgba(88, 86, 214, 0.1)' }}
                className="border-b border-slate-700 hover:bg-slate-700/50 transition"
              >
                <td className="py-4 px-4">
                  <p className="text-white font-semibold">{product.name}</p>
                </td>
                <td className="py-4 px-4 text-purple-400 font-semibold">
                  ${product.price.toFixed(2)}
                </td>
                <td className="py-4 px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      product.stock > 20
                        ? 'bg-green-900/50 text-green-300'
                        : product.stock > 0
                        ? 'bg-yellow-900/50 text-yellow-300'
                        : 'bg-red-900/50 text-red-300'
                    }`}
                  >
                    {product.stock} units
                  </span>
                </td>
                <td className="py-4 px-4 text-gray-400">{product.category}</td>
                <td className="py-4 px-4">
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      className="text-purple-400 hover:text-purple-300 transition"
                    >
                      <FaEye />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      className="text-blue-400 hover:text-blue-300 transition"
                    >
                      ✏️
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      className="text-red-400 hover:text-red-300 transition"
                    >
                      🗑️
                    </motion.button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-400">No products found</p>
        </div>
      )}
    </motion.div>
  );
}
