import { useEffect, useState } from "react";
import { MENU, menuCategories } from "./menu";
import { useCart } from "./order";

const App = () => {
  const [orderOpen, setOrderOpen] = useState(false);
  const [table, setTable] = useState(null);
  const [selected, setSelected] = useState(null);
  const [category, setCategory] = useState("Futomaki");

  const [openedMainCategory, setOpenedMainCategory] = useState(null);

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
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Wybierz swój stolik
        </h1>
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

        <header className="text-center mb-6 w-full mx-auto">
          <img
            src="/images/logo.png"
            alt="Logo firmy"
            className="mx-auto mb-2 w-48 md:w-56 lg:w-64 h-auto"
          />
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-red-600 tracking-tight mb-2">
            Menu
          </h1>

          {/* Belka nawigacyjna z kategoriami i podkategoriami */}
          <div className="w-full max-w-5xl mx-auto">
            <div className="flex flex-wrap justify-center gap-3 px-2 py-4">
              {Object.keys(menuCategories).map((mainCat) => (
                <button
                  key={mainCat}
                  onClick={() =>
                    setOpenedMainCategory(
                      openedMainCategory === mainCat ? null : mainCat
                    )
                  }
                  className={`min-w-[130px] px-5 py-2.5 text-base rounded-full font-semibold border ${
                    openedMainCategory === mainCat
                      ? "bg-red-600 text-white"
                      : "bg-white text-gray-800 border-gray-300"
                  } hover:shadow transition`}
                >
                  {mainCat}
                </button>
              ))}
            </div>

            {/* Podkategorie w pełnej szerokości */}
            {openedMainCategory && (
              <div className="w-full px-2 mt-4 flex flex-wrap justify-center gap-3 pb-2">
                {Array.isArray(menuCategories[openedMainCategory]) &&
                  menuCategories[openedMainCategory].map((subCat) => (
                    <button
                      key={subCat}
                      onClick={() => setCategory(subCat)}
                      className={`min-w-[130px] px-5 py-2.5 text-base  rounded-full transition ${
                        category === subCat
                          ? "bg-red-500 text-white"
                          : "bg-white text-gray-700"
                      }`}
                    >
                      {subCat}
                    </button>
                  ))}
              </div>
            )}
          </div>
        </header>

        <div className="w-full">
        <div className="md:col-span-2 grid gap-6 grid-cols-[repeat(auto-fit,minmax(220px,1fr))]">
            {filteredMenu.length === 0 ? (
              <p className="text-gray-400 italic col-span-full">
                Brak pozycji w tej kategorii.
              </p>
            ) : (
              filteredMenu.map((item) => (
                <div
                  key={item.id}
                  className={`border border-gray-600 rounded-2xl p-3 shadow-lg bg-[#121212]
            hover:shadow-xl hover:ring-1 hover:ring-gray-500 hover:-translate-y-1 hover:scale-[1.01] transition-all duration-300 ease-in-out cursor-pointer relative ${
              addedItemId === item.id
                ? "ring-2 ring-red-400 scale-[1.02]"
                : ""
            }`}
                  onClick={() => setSelected(item)}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-40 object-cover rounded-xl shadow-md"
                  />
                  <hr className="my-3 border-t-1 border-dashed border-red-500" />
                  <h2 className="text-xl font-bold mt-3 text-white">
                    {item.name}
                  </h2>
                  <p className="text-md text-red-500 font-semibold">
                    {item.price} zł
                  </p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(item);
                      setAddedItemId(item.id);
                      setTimeout(() => setAddedItemId(null), 1000);
                    }}
                    className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-xl font-semibold transition"
                  >
                    Dodaj do zamówienia
                  </button>
                </div>
              ))
            )}
          </div>

          {/* MINI KAFELEK TWOJE ZAMÓWIENIE */}
          <div className="fixed top-4 right-4 z-50">
            <button
              onClick={() => setOrderOpen(true)}
              className={`bg-white text-gray-800 font-semibold py-2 px-4 rounded-xl shadow-md hover:shadow-lg transition flex items-center gap-2 ${
                addedItemId ? "animate-bounce" : ""
              }`}
            >
              🛒 TWOJE ZAMÓWIENIE:  {cart.reduce((acc, item) => acc + item.quantity, 0)} |{" "}
              {getTotal()} zł
            </button>
          </div>

          {orderOpen && (
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
                  <ul className="space-y-2 mb-4">
                    {cart.map((item, i) => (
                      <li key={i} className="flex justify-between text-sm">
                        <span>
                          {item.name} × {item.quantity}
                        </span>
                        <span>{item.price * item.quantity} zł</span>
                      </li>
                    ))}
                  </ul>
                )}

                {cart.length > 0 && (
                  <div className="mt-4 flex justify-between items-center">
                    <strong className="text-lg text-gray-800">
                      Razem: {getTotal()} zł
                    </strong>
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
          )}
        </div>

        {selected && (
          <div
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
            onClick={() => setSelected(null)}
          >
            <div
              className="bg-white p-6 rounded-2xl max-w-sm w-full relative shadow-xl animate-fade-in"
              onClick={(e) => e.stopPropagation()}
            >
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
                className="mt-5 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-xl font-semibold transition"
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
