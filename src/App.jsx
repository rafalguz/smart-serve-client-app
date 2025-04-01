import { useEffect, useState } from "react";
import { MENU, CATEGORIES } from "./menu";
import { useCart } from "./order";

const App = () => {
  const [table, setTable] = useState(null);
  const [selected, setSelected] = useState(null);
  const [category, setCategory] = useState("Futomaki");

  const {
    cart,
    addedItemId,
    orderSuccess,
    addToCart,
    removeFromCart,
    getTotal,
    handlePlaceOrder,
  } = useCart();

  useEffect(() => {
    const saved = localStorage.getItem("table");
    if (saved) setTable(saved);
  }, []);

  const handleChooseTable = (num) => {
    setTable(num);
    localStorage.setItem("table", num);
  };

  const filteredMenu = MENU.filter((item) => item.category === category);

  if (!table) {
    return (
      <div className="p-4 min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-sky-100 to-rose-100">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Wybierz swój stolik</h1>
        <div className="flex gap-4">
          {[1, 2, 3, 4].map((n) => (
            <button
              key={n}
              className="px-6 py-3 bg-pink-600 hover:bg-pink-700 transition text-white font-semibold rounded-2xl shadow-md"
              onClick={() => handleChooseTable(n)}
            >
              Stolik {n}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full font-sans bg-[#121212] flex justify-center px-4 py-6">
    <div className="w-full max-w-6xl mx-auto">
      {orderSuccess && (
        <div className="fixed top-5 right-5 bg-green-600 text-white px-4 py-2 rounded-xl shadow-lg animate-bounce z-50">
          ✅ Zamówienie zostało złożone!
        </div>
      )}

      <header className="text-center mb-10 w-full max-w-4xl mx-auto">
         <img 
           src="/images/logo.png" 
           alt="Logo firmy" 
           className="mx-auto mb-4 w-48 md:w-56 lg:w-64 h-auto"
        />
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-red-600 tracking-tight">
                Menu
         </h1>
        <div className="flex flex-wrap justify-center gap-3 mt-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`px-4 py-2 rounded-full font-medium border ${
                category === cat
                  ? "bg-red-600 text-white"
                  : "bg-white text-gray-800 border-gray-300"
              } hover:shadow transition`}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {filteredMenu.length === 0 ? (
            <p className="text-gray-400 italic col-span-2">
              Brak pozycji w tej kategorii.
            </p>
          ) : (
            filteredMenu.map((item) => (
              <div
                key={item.id}
                className={`border border-gray-200 rounded-2xl p-3 shadow-sm bg-white hover:shadow-md transition cursor-pointer relative ${
                  addedItemId === item.id
                    ? "ring-2 ring-green-400 scale-[1.02]"
                    : ""
                }`}
                onClick={() => setSelected(item)}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-40 object-cover rounded-xl"
                />
                <h2 className="text-xl font-bold mt-3 text-gray-800">
                  {item.name}
                </h2>
                <p className="text-md text-red-600 font-semibold">
                  {item.price} zł
                </p>
              </div>
            ))
          )}
        </div>

        <div className="bg-white border border-gray-200 p-5 rounded-2xl shadow-md flex flex-col justify-between h-fit max-h-screen overflow-auto">
          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-700">🧾 Twoje zamówienie</h2>
            {cart.length === 0 ? (
              <p className="text-gray-400 italic">Brak pozycji</p>
            ) : (
              <ul className="space-y-2 mb-4">
                {cart.map((item, i) => (
                  <li key={i} className="flex justify-between items-center text-sm">
                    <span>
                      {item.name} × {item.quantity} – {item.price * item.quantity} zł
                    </span>
                    <button
                      onClick={() => removeFromCart(i)}
                      className="text-red-500 text-xs hover:underline"
                    >
                      Usuń
                    </button>
                  </li>
                ))}
              </ul>
            )}
            {cart.length > 0 && (
  <div className="flex justify-between items-center mt-6 gap-4">
    <div className="font-bold text-lg text-gray-700">
      Razem: {getTotal()} zł
    </div>
    <button
      onClick={handlePlaceOrder}
      className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-xl font-semibold transition"
    >
      Złóż zamówienie
    </button>     
  </div>
)}

          </div>
       
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-2xl max-w-sm w-full relative shadow-xl animate-fade-in">
            <button
              className="absolute top-3 right-3 text-gray-500 text-xl"
              onClick={() => setSelected(null)}
            >
              ✖
            </button>
            <img
              src={selected.image}
              alt={selected.name}
              className="w-full h-48 object-cover rounded-xl"
            />
            <h3 className="text-2xl font-bold mt-4 text-gray-800">
              {selected.name}
            </h3>
            <p className="text-gray-600 mt-2">{selected.description}</p>
            <p className="font-semibold text-pink-600 mt-3 text-lg">
              {selected.price} zł
            </p>
            <button
              className="mt-5 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-xl font-semibold transition"
              onClick={() => {
                addToCart(selected);
                setSelected(null);
              }}
            >
              Dodaj do zamówienia
            </button>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default App;