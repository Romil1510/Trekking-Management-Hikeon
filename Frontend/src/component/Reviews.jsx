import { Star } from "lucide-react";
import React, { useEffect, useState } from "react";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/reviews");
        if (!response.ok) {
          throw new Error("Failed to fetch reviews");
        }
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-gray-900 via-blue-900/20 to-gray-900">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
          What Our Trekkers Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="bg-gray-800/60 backdrop-blur-lg rounded-2xl p-6 border border-white/10 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-2"
            >
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-6 w-6 ${
                      i < review.rating ? "text-yellow-400" : "text-gray-500"
                    }`}
                  />
                ))}
              </div>
              <p className="text-lg font-semibold text-white mb-4">
                {review.user}
              </p>
              <p className="text-gray-300 leading-relaxed mb-4">
                {review.comment}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">
                  {new Date(review.date).toLocaleDateString()}
                </span>
                <span className="text-sm text-gray-400">
                  Trek: {review.trekName}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;