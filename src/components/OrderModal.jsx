const OrderModal = ({
    orderOpen,
    setOrderOpen,
    cart,
    removeFromCart,
    handleCartQuantityChange,
    getTotal,
    handlePlaceOrder,
  }) => {
    if (!orderOpen) return null;
  
    return (
      <div
        className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
        onClick={() => setOrderOpen(false)}
      >
        <div
          className="bg-white p-6 rounded-2xl w-full max-w-md shadow-xl relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => setOrderOpen(false)}
            className="absolute top-3 right-4 text-xl text-gray-500 hover:text-red-500"
          >
            ✖
          </button>
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            🧾 Twoje zamówienie
          </h2>
  
          {cart.length === 0 ? (
            <p className="text-gray-400 italic">Brak pozycji</p>
          ) : (
            <ul className="space-y-3 mb-4">
              {cart.map((item, i) => (
                <li
                  key={i}
                  className="flex justify-between items-center bg-gray-100 rounded-xl p-3"
                >
                  <div>
                    <p className="font-semibold text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-600">
                      {item.price} zł / szt. × {item.quantity} = {item.price * item.quantity} zł
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
                    <div className="flex items-center border border-gray-400 rounded-xl">
                      <button
                        onClick={() => handleCartQuantityChange(item, -1)}
                        className="px-2 text-gray-800 hover:text-red-600 text-xl"
                      >
                        −
                      </button>
                      <span className="px-2 font-semibold text-gray-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleCartQuantityChange(item, 1)}
                        className="px-2 text-gray-800 hover:text-red-600 text-xl"
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
            <div className="mt-4 flex justify-between items-center">
              <strong className="text-lg text-gray-800">Razem: {getTotal()} zł</strong>
              <button
                onClick={handlePlaceOrder}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl font-semibold"
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
  