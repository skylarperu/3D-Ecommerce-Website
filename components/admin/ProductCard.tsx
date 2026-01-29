'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  inStock: boolean;
}

export function ProductCard({
  id,
  name,
  price,
  image,
  description,
  inStock,
}: ProductCardProps) {
  const { addItem } = useCart();
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleAddToCart = () => {
    addItem({
      id,
      name,
      price,
      quantity: 1,
      image,
    });
    toast.success(`${name} added to cart!`);
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist');
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
    >
      {/* Image */}
      <div className="relative h-64 bg-slate-700 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
        {!inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-bold text-lg">Out of Stock</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-white mb-2">{name}</h3>
        <p className="text-sm text-gray-400 line-clamp-2 mb-3">{description}</p>

        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-purple-400">${price}</span>
          <button
            onClick={handleWishlist}
            className="p-2 rounded-full hover:bg-slate-700 transition"
          >
            <FaHeart
              className={`${
                isWishlisted ? 'text-red-500' : 'text-gray-400'
              }`}
            />
          </button>
        </div>

        {/* Add to Cart Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAddToCart}
          disabled={!inStock}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 rounded-lg font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition"
        >
          <FaShoppingCart />
          Add to Cart
        </motion.button>
      </div>
    </motion.div>
  );
}
