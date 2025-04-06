// components/RatingModal.jsx
import { useState } from "react";

const RatingModal = ({ onSubmit }) => {
  const [rating, setRating] = useState(null);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 rounded-2xl max-w-md w-full relative">
        <h2 className="text-xl font-bold mb-4 text-gray-800 text-center">
          Jak oceniasz proces składania zamówienia?
        </h2>
        <div className="flex justify-center space-x-2 mb-6">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star)}
              className={`text-3xl ${
                rating && star <= rating ? "text-yellow-400" : "text-gray-300"
              } hover:text-yellow-500 transition`}
            >
              ★
            </button>
          ))}
        </div>
        <button
          disabled={!rating}
          onClick={() => onSubmit(rating)}
          className="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white px-4 py-2 rounded-xl font-semibold w-full"
        >
          Prześlij ocenę
        </button>
      </div>
    </div>
  );
};

export default RatingModal;
