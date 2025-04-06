// components/NewsletterModal.jsx
import { useState } from "react";

const NewsletterModal = ({ onClose, onSubmit }) => {
    const [email, setEmail] = useState("");
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
        <div className="bg-white p-6 rounded-2xl max-w-md w-full relative">
          <button
            onClick={onClose}
            className="absolute top-2 right-3 text-gray-500 hover:text-red-500"
          >
            ✖
          </button>
          <h2 className="text-xl font-bold mb-4 text-gray-800">
            Chcesz otrzymywać promocje?
          </h2>
          <p className="text-gray-600 mb-4">
            Zostaw swój e-mail, a wyślemy Ci info o promocjach i nowościach.
          </p>
          <input
            type="email"
            className="w-full border border-gray-300 rounded-xl px-4 py-2 mb-4"
            placeholder="Twój e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            onClick={() => onSubmit(email)}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl font-semibold w-full"
          >
            Zapisz mnie
          </button>
        </div>
      </div>
    );
  };
  
  export default NewsletterModal;
  