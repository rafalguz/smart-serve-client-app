const OrderModal = ({
  orderOpen,
  setOrderOpen,
  cart,
  removeFromCart,
  handleCartQuantityChange,
  getTotal,
  startPayment,
}) => {
  if (!orderOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
      onClick={() => setOrderOpen(false)}
    >
      <div
        className="bg-[#1e1e1e] text-white p-8 rounded-2xl w-full max-w-xl shadow-2xl relative border border-gray-600"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setOrderOpen(false)}
          className="absolute top-4 right-5 text-2xl text-gray-400 hover:text-red-500"
        >
          ✖
        </button>

        <h2 className="text-3xl font-bold mb-6 text-center text-white">
          🧾 Twoje zamówienie
        </h2>

        {cart.length === 0 ? (
          <p className="text-gray-400 italic text-center">Brak pozycji</p>
        ) : (
          <ul className="space-y-4 mb-6 text-lg">
            {cart.map((item, i) => (
              <li
                key={i}
                className="flex justify-between items-center bg-[#2a2a2a] rounded-xl p-4 shadow-inner"
              >
                <div>
                  <p className="font-semibold text-white">{item.name}</p>
                  <p className="text-sm text-gray-400">
                    {item.price} zł / szt. × {item.quantity} ={" "}
                    {item.price * item.quantity} zł
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 text-lg font-bold px-2"
                    title="Usuń pozycję"
                  >
                    🗑
                  </button>
                  <div className="flex items-center border border-gray-500 rounded-xl">
                    <button
                      onClick={() => handleCartQuantityChange(item, -1)}
                      className="px-3 text-xl text-white hover:text-red-400"
                    >
                      −
                    </button>
                    <span className="px-3 font-semibold text-white text-lg">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => handleCartQuantityChange(item, 1)}
                      className="px-3 text-xl text-white hover:text-red-400"
                    >
                      +
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        {cart.length > 0 && (
          <div className="mt-6 flex justify-between items-center">
            <strong className="text-2xl text-white">
              Razem: {getTotal()} zł
            </strong>
            <button
              onClick={startPayment}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-bold text-lg"
            >
              Złóż zamówienie
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderModal;
