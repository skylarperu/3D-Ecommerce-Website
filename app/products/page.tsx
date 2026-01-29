'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProductCard } from '@/components/admin/ProductCard';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  stock: number;
  slug: string;
}

type FilterType = 'all' | 'electronics' | 'software' | 'courses';

interface PageState {
  status: 'loading' | 'success' | 'error';
  error?: string;
}


const CATEGORIES: FilterType[] = ['all', 'electronics', 'software', 'courses'];

export default function ProductsPage() {
  // Estados principales
  const [products, setProducts] = useState<Product[]>([]);
  const [pageState, setPageState] = useState<PageState>({ status: 'loading' });
  const [filter, setFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('relevancia');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);

  // Fetch productos
  useEffect(() => {
    const fetchProducts = async () => {
      setPageState({ status: 'loading' });
      try {
        const response = await fetch('/api/products');
        if (!response.ok) throw new Error('Error al obtener productos');
        
        const data = await response.json();
        
        // Validar que sea un array
        if (!Array.isArray(data)) {
          throw new Error('Formato de respuesta inválido');
        }
        
        setProducts(data);
        setPageState({ status: 'success' });
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Error desconocido';
        console.error('Error fetching products:', error);
        setPageState({ status: 'error', error: message });
        setProducts([]);
      }
    };

    fetchProducts();
  }, []);

  // Filtrado y búsqueda avanzados
  const filteredAndSortedProducts = useMemo(() => {
    if (!Array.isArray(products)) return [];

    let result = [...products];

    // Filtro por categoría
    if (filter !== 'all') {
      result = result.filter((p) => p.category === filter);
    }

    // Búsqueda por texto
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      );
    }

    // Filtro por precio
    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Ordenamiento
    switch (sortBy) {
      case 'precio-bajo':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'precio-alto':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'nuevo':
        // Asumir que los más recientes están al final de la API
        result.reverse();
        break;
      case 'relevancia':
      default:
        // Mantener orden original
        break;
    }

    return result;
  }, [products, filter, searchQuery, priceRange, sortBy]);

  const handleFilterChange = useCallback((cat: FilterType) => {
    setFilter(cat);
  }, []);

  const handleSortChange = useCallback((sort: string) => {
    setSortBy(sort);
  }, []);

  // Renderizar contenido
  const renderContent = () => {
    if (pageState.status === 'loading') {
      return (
        <div className="flex flex-col items-center justify-center min-h-96">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="w-12 h-12 border-4 border-purple-600 border-t-pink-600 rounded-full"
          />
          <p className="mt-4 text-gray-400">Cargando productos...</p>
        </div>
      );
    }

    if (pageState.status === 'error') {
      return (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-500/10 border border-red-500/30 rounded-lg p-6 text-center"
        >
          <p className="text-red-400 font-semibold">Error al cargar productos</p>
          <p className="text-red-300 text-sm mt-2">{pageState.error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
          >
            Reintentar
          </button>
        </motion.div>
      );
    }

    if (!Array.isArray(filteredAndSortedProducts) || filteredAndSortedProducts.length === 0) {
      return (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <p className="text-gray-400 text-lg">No hay productos que coincidan con tus criterios</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setFilter('all');
              setPriceRange([0, 10000]);
              setSortBy('relevancia');
            }}
            className="mt-4 px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition"
          >
            Limpiar filtros
          </button>
        </motion.div>
      );
    }

    return (
      <div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6 text-sm text-gray-400"
        >
          Mostrando {filteredAndSortedProducts.length} de {products.length} productos
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredAndSortedProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: idx * 0.05 }}
              >
                <ProductCard
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  image={product.image}
                  description={product.description}
                  inStock={product.stock > 0}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-white mb-4">Nuestros Productos</h1>
          <p className="text-xl text-gray-300">
            Explora nuestra colección de productos 3D premium
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <input
            type="text"
            placeholder="🔍 Buscar productos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-6 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-600/30 transition"
          />
        </motion.div>

        {/* Filtros y Ordenamiento */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-8 space-y-4"
        >
          {/* Categorías */}
          <div>
            <p className="text-gray-400 text-sm font-semibold mb-3">Categorías</p>
            <div className="flex gap-2 flex-wrap">
              {CATEGORIES.map((cat) => (
                <motion.button
                  key={cat}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleFilterChange(cat)}
                  className={`px-6 py-2 rounded-full font-semibold transition ${
                    filter === cat
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-600/50'
                      : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                  }`}
                >
                  {cat === 'all' ? '🌟 Todos' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Ordenamiento y Precio */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Sort */}
            <div>
              <p className="text-gray-400 text-sm font-semibold mb-3">Ordenar por</p>
              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-purple-600 transition"
              >
                <option value="relevancia">📌 Relevancia</option>
                <option value="precio-bajo">💰 Precio: Menor a Mayor</option>
                <option value="precio-alto">💸 Precio: Mayor a Menor</option>
                <option value="nuevo">🆕 Más Nuevos</option>
              </select>
            </div>

            {/* Price Range */}
            <div>
              <p className="text-gray-400 text-sm font-semibold mb-3">
                Rango de Precio: ${priceRange[0]} - ${priceRange[1]}
              </p>
              <input
                type="range"
                min="0"
                max="10000"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        </motion.div>

        {/* Products Grid */}
        {renderContent()}
      </div>
    </div>
  );
}
