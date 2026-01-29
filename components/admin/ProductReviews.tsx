'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaUser } from 'react-icons/fa';

export function ProductReviews() {
  const [reviews] = useState<any[]>([]);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmitReview = async () => {
    setLoading(true);
    try {
      // TODO: Submit review to API
      console.log('Submitting review:', newReview);
      setNewReview({ rating: 5, comment: '' });
    } finally {
      setLoading(false);
    }
  };

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

  return (
    <div className="space-y-6">
      {/* Average Rating */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-slate-800 rounded-xl p-6"
      >
        <h3 className="text-2xl font-bold text-white mb-4">Customer Reviews</h3>

        <div className="flex items-center gap-4 mb-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-400">
              {averageRating.toFixed(1)}
            </div>
            <div className="flex gap-1 justify-center">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={
                    i < Math.round(averageRating)
                      ? 'text-yellow-400'
                      : 'text-gray-600'
                  }
                />
              ))}
            </div>
            <p className="text-gray-400 text-sm mt-2">({reviews.length} reviews)</p>
          </div>
        </div>

        {/* Write Review */}
        <div className="border-t border-slate-700 pt-6">
          <h4 className="text-lg font-semibold text-white mb-4">Write a Review</h4>

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-300 mb-2">Rating</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setNewReview({ ...newReview, rating: star })}
                    className="transition"
                  >
                    <FaStar
                      className={
                        star <= newReview.rating
                          ? 'text-yellow-400'
                          : 'text-gray-600'
                      }
                      size={24}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-2">
                Comment
              </label>
              <textarea
                value={newReview.comment}
                onChange={(e) =>
                  setNewReview({ ...newReview, comment: e.target.value })
                }
                placeholder="Share your thoughts..."
                className="w-full bg-slate-700 text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                rows={4}
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSubmitReview}
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 rounded-lg font-semibold disabled:opacity-50"
            >
              {loading ? 'Submitting...' : 'Submit Review'}
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.length > 0 ? (
          reviews.map((review, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-800 rounded-lg p-4"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                  <FaUser className="text-white" />
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-white">
                      {review.user?.name || 'Anonymous'}
                    </h4>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={
                            i < review.rating
                              ? 'text-yellow-400'
                              : 'text-gray-600'
                          }
                          size={14}
                        />
                      ))}
                    </div>
                  </div>

                  <p className="text-gray-400 text-sm mb-2">{review.comment}</p>
                  <p className="text-gray-500 text-xs">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-center text-gray-400 py-8">
            No reviews yet. Be the first to review!
          </div>
        )}
      </div>
    </div>
  );
}
