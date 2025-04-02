import { useEffect, useState } from "react";
import { MENU } from "./menu";
import { useCart } from "./order";
import MenuHeader from "./components/MenuHeader";
import MenuGrid from "./components/MenuGrid";
import OrderModal from "./components/OrderModal";
import ItemModal from "./components/ItemModal";

const App = () => {
  const [orderOpen, setOrderOpen] = useState(false);
  const [table, setTable] = useState(null);
  const [selected, setSelected] = useState(null);
  const [category, setCategory] = useState("Futomaki");
  const [openedMainCategory, setOpenedMainCategory] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileView, setMobileView] = useState("main");
  const [activeMain, setActiveMain] = useState(null);
  const [quantities, setQuantities] = useState({});
  const [addedItemId, setAddedItemId] = useState(null);

  const {
    cart,
    orderSuccess,
    addToCart,
    removeFromCart,
    getTotal,
    handlePlaceOrder,
    decreaseQuantity,
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

  const handleCartQuantityChange = (item, change) => {
    if (change === 1) {
      addToCart(item);
    } else if (change === -1) {
      decreaseQuantity(item.id);
    }
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

        <MenuHeader
          category={category}
          setCategory={setCategory}
          openedMainCategory={openedMainCategory}
          setOpenedMainCategory={setOpenedMainCategory}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          mobileView={mobileView}
          setMobileView={setMobileView}
          activeMain={activeMain}
          setActiveMain={setActiveMain}
        />

        <MenuGrid
          filteredMenu={filteredMenu}
          quantities={quantities}
          updateQuantity={updateQuantity}
          addToCart={addToCart}
          setQuantities={setQuantities}
          setAddedItemId={setAddedItemId}
          addedItemId={addedItemId}
          setSelected={setSelected}
        />

        <OrderModal
          orderOpen={orderOpen}
          setOrderOpen={setOrderOpen}
          cart={cart}
          removeFromCart={removeFromCart}
          handleCartQuantityChange={handleCartQuantityChange}
          getTotal={getTotal}
          handlePlaceOrder={handlePlaceOrder}
        />

        <ItemModal
          selected={selected}
          setSelected={setSelected}
          updateQuantity={updateQuantity}
          quantities={quantities}
          addToCart={addToCart}
          setQuantities={setQuantities}
          setAddedItemId={setAddedItemId}
        />

        {cart.length > 0 && !orderOpen && (
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
        )}
      </div>
    </div>
  );
};

export default App;
