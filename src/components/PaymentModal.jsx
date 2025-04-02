const PaymentModal = ({ onClose, onSelect }) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white p-8 rounded-3xl w-full max-w-xl shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-5 text-2xl text-gray-500 hover:text-red-500"
        >
          ✖
        </button>

        <h2 className="text-3xl font-extrabold mb-6 text-gray-800 text-center">
          Wybierz metodę płatności
        </h2>

        <div className="space-y-4">
          <button
            onClick={() => onSelect("karta")}
            className="w-full bg-gray-100 hover:bg-red-100 text-gray-800 font-bold py-4 px-6 rounded-2xl text-xl flex items-center justify-center gap-3 shadow-md"
          >
            💳 Płatność kartą
          </button>
          <button
            onClick={() => onSelect("blik")}
            className="w-full bg-gray-100 hover:bg-red-100 text-gray-800 font-bold py-4 px-6 rounded-2xl text-xl flex items-center justify-center gap-3 shadow-md"
          >
            📲 BLIK
          </button>
          <button
            onClick={() => onSelect("kelner")}
            className="w-full bg-gray-100 hover:bg-red-100 text-gray-800 font-bold py-4 px-6 rounded-2xl text-xl flex items-center justify-center gap-3 shadow-md"
          >
            🧾 Zapłać u kelnera
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
