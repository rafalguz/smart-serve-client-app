const TableChangeModal = ({ onClose, onSuccess }) => {
  const handleCheckPin = (e) => {
    e.preventDefault();
    const pin = e.target.pin.value;
    if (pin === "4321") {
      onSuccess(); // reset stolika
    } else {
      alert("❌ Niepoprawny kod.");
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-[#1e1e1e] text-white p-6 rounded-2xl max-w-sm w-full relative border border-gray-600 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-3 right-4 text-xl text-gray-400 hover:text-red-500"
          onClick={onClose}
        >
          ✖
        </button>
        <h2 className="text-xl font-bold mb-4 text-center">
          Wprowadź kod, aby zmienić stolik
        </h2>
        <form onSubmit={handleCheckPin} className="flex flex-col gap-4">
          <input
            type="password"
            name="pin"
            placeholder="PIN"
            className="bg-gray-800 text-white p-3 rounded-xl text-center text-xl tracking-widest outline-none"
            autoFocus
          />
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold text-lg transition"
          >
            Potwierdź
          </button>
        </form>
      </div>
    </div>
  );
};

export default TableChangeModal;
