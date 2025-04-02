import { useEffect, useState } from "react";
import { MENU, menuCategories } from "./menu";
import { useCart } from "./order";

const App = () => {
  const [orderOpen, setOrderOpen] = useState(false);
  const [table, setTable] = useState(null);
  const [selected, setSelected] = useState(null);
  const [category, setCategory] = useState("Futomaki");
  const [openedMainCategory, setOpenedMainCategory] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [prevCategory, setPrevCategory] = useState(null);
  const [mobileView, setMobileView] = useState("main"); // "main" | "sub"
  const [activeMain, setActiveMain] = useState(null);
  const [quantities, setQuantities] = useState({});

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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setMenuOpen(false);
        setOpenedMainCategory(null);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleChooseTable = (num) => {
    setTable(num);
    localStorage.setItem("table", num);
  };

  const updateQuantity = (id, change) => {
    setQuantities((prev) => {
      const current = prev[id] || 1;
      const newQty = Math.max(1, current + change);
      return { ...prev, [id]: newQty };
    });
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
            {/* HAMBURGER + KATEGORIE */}
            <div className="px-2 py-4 text-center">
              {/* Przycisk rozwijania tylko na małych ekranach */}
              <button
                onClick={() => {
                  setMenuOpen(!menuOpen);
                  setMobileView("main");
                  setActiveMain(null);
                }}
                className="sm:hidden bg-red-600 text-white px-4 py-2 rounded-full font-semibold shadow-md mb-4"
              >
                🍣 Kategorie
              </button>

              {/* Menu mobilne */}
              {menuOpen && (
                <div className="sm:hidden bg-gray-900 text-white rounded-xl p-4 shadow-lg space-y-2 max-h-[65vh] overflow-y-auto border border-red-600">
                  {mobileView === "main" &&
                    Object.entries(menuCategories).map(([main, subs]) => (
                      <div key={main}>
                        <button
                          onClick={() => {
                            setActiveMain(main);
                            setMobileView("sub");
                          }}
                          className="w-full text-left font-medium text-lg py-2 px-3 rounded-lg hover:bg-red-600 hover:text-white transition"
                        >
                          {main}
                        </button>
                      </div>
                    ))}

                  {mobileView === "sub" && activeMain && (
                    <div>
                      <button
                        onClick={() => {
                          setMobileView("main");
                          setActiveMain(null);
                        }}
                        className="text-sm text-gray-500 mb-2"
                      >
                        ← Wróć
                      </button>
                      {menuCategories[activeMain].map((sub) => (
                        <button
                          key={sub}
                          onClick={() => {
                            setCategory(sub);
                            setMenuOpen(false);
                          }}
                          className={`block w-full text-left rounded-md px-3 py-2 font-medium text-sm ${
                            category === sub
                              ? "bg-red-500 text-white"
                              : "text-gray-800 hover:bg-gray-200"
                          }`}
                        >
                          {sub}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Widok kategorii na dużych ekranach */}
              <div className="hidden sm:flex flex-wrap justify-center gap-3">
                {Object.keys(menuCategories).map((mainCat) => (
                  <button
                    key={mainCat}
                    onClick={() => {
                      const isClosing = openedMainCategory === mainCat;
                      setOpenedMainCategory(isClosing ? null : mainCat);
                      if (
                        !isClosing &&
                        Array.isArray(menuCategories[mainCat])
                      ) {
                        setCategory(menuCategories[mainCat][0]);
                      }
                    }}
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
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
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
              addedItemId === item.id ? "ring-2 ring-red-400 scale-[1.02]" : ""
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
                  <div className="flex items-center gap-2 mt-4">
                    <div className="flex items-center border border-gray-400 rounded-xl px-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          updateQuantity(item.id, -1);
                        }}
                        className="text-xl px-2 text-white hover:text-red-400"
                      >
                        −
                      </button>
                      <span className="px-2 text-white font-semibold">
                        {quantities[item.id] || 1}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          updateQuantity(item.id, 1);
                        }}
                        className="text-xl px-2 text-white hover:text-red-400"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        const qty = quantities[item.id] || 1;
                        for (let i = 0; i < qty; i++) {
                          addToCart(item);
                        }
                        setAddedItemId(item.id);
                        setTimeout(() => setAddedItemId(null), 1000);
                      }}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-xl font-semibold transition"
                    >
                      Dodaj
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* PRZYCISK KOSZYKA */}
          <div className="fixed top-4 right-3 z-50">
            <button
              onClick={() => setOrderOpen(true)}
              className={`bg-white text-gray-800 font-semibold p-3 rounded-full shadow-md hover:shadow-lg transition relative ${
                addedItemId ? "animate-bounce" : ""
              }`}
              title="Twoje zamówienie"
            >
              🛒
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cart.reduce((acc, item) => acc + item.quantity, 0)}
              </span>
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
              className="bg-[#121212] p-6 rounded-2xl max-w-sm w-full relative shadow-xl animate-fade-in border border-gray-600"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-3 right-3 text-gray-400 text-xl hover:text-red-500"
                onClick={() => setSelected(null)}
              >
                ✖
              </button>
              <img
                src={selected.image}
                alt={selected.name}
                className="w-full h-48 object-cover rounded-xl shadow-md"
              />
              <h3 className="text-2xl font-bold mt-4 text-white">
                {selected.name}
              </h3>
              <p className="text-gray-400 mt-2">{selected.description}</p>
              <p className="font-semibold text-red-500 mt-3 text-lg">
                {selected.price} zł
              </p>

              <div className="mt-5 flex items-center gap-2">
                <div className="flex items-center border border-gray-400 rounded-xl px-2">
                  <button
                    onClick={() => updateQuantity(selected.id, -1)}
                    className="text-xl px-2 text-white hover:text-red-400"
                  >
                    −
                  </button>
                  <span className="px-2 text-white font-semibold">
                    {quantities[selected.id] || 1}
                  </span>
                  <button
                    onClick={() => updateQuantity(selected.id, 1)}
                    className="text-xl px-2 text-white hover:text-red-400"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => {
                    const qty = quantities[selected.id] || 1;
                    for (let i = 0; i < qty; i++) {
                      addToCart(selected);
                    }
                    setAddedItemId(selected.id);
                    setTimeout(() => setAddedItemId(null), 1000);
                    setSelected(null);
                  }}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-xl font-semibold transition"
                >
                  Dodaj
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
