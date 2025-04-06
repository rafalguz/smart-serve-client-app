import { db } from "./firebase";
import { useEffect, useState } from "react";
import { MENU } from "./menu";
import { useCart } from "./order";
import MenuHeader from "./components/MenuHeader";
import MenuGrid from "./components/MenuGrid";
import OrderModal from "./components/OrderModal";
import ItemModal from "./components/ItemModal";
import PaymentModal from "./components/PaymentModal";
import LanguageSwitcher from "./components/LanguageSwitcher";
import TableChangeModal from "./components/TableChangeModal";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import NewsletterModal from "./components/NewsletterModal";
import RatingModal from "./components/RatingModal";

const App = () => {
  const [orderOpen, setOrderOpen] = useState(false);
  const [table, setTable] = useState(null);
  const [showTableChange, setShowTableChange] = useState(false);
  const [selected, setSelected] = useState(null);
  const [category, setCategory] = useState("Futomaki");
  const [openedMainCategory, setOpenedMainCategory] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileView, setMobileView] = useState("main");
  const [activeMain, setActiveMain] = useState(null);
  const [quantities, setQuantities] = useState({});
  const [addedItemId, setAddedItemId] = useState(null);
  const [scrolledDown, setScrolledDown] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [showNewsletterModal, setShowNewsletterModal] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);

  const {
    cart,
    orderSuccess,
    setOrderSuccess,
    addToCart,
    removeFromCart,
    getTotal,
    handlePlaceOrder,
    decreaseQuantity,
    clearCart,
  } = useCart();

  useEffect(() => {
    const saved = localStorage.getItem("table");
    if (saved) setTable(saved);
  }, []);

  useEffect(() => {
    if (orderSuccess) {
      const timeout = setTimeout(() => {
        setOrderSuccess(false);
      }, 2000); // 2 sekundy

      return () => clearTimeout(timeout);
    }
  }, [orderSuccess]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolledDown(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
  const handlePaymentMethod = async (method) => {
    setPaymentOpen(false);
    setOrderSuccess(true);
    setShowRatingModal(true); // najpierw ocena

    try {
      await addDoc(collection(db, "orders"), {
        table: Number(table),
        items: cart.map((item) => ({
          name: item.name,
          quantity: item.quantity,
        })),
        status: "new",
        createdAt: serverTimestamp(),
      });

      clearCart();
      console.log("✅ Zamówienie zapisane w Firestore!");
    } catch (error) {
      console.error("❌ Błąd zapisu zamówienia:", error);
    }

    alert(`Wybrano metodę: ${method}`);
  };

  const startPayment = () => {
    setOrderOpen(false);
    setPaymentOpen(true);
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

  const handleSelectCategory = (mainCat, subCat = null) => {
    if (subCat) {
      setCategory(subCat);
      setOpenedMainCategory(mainCat);
    } else {
      setCategory(mainCat);
      setOpenedMainCategory(null);
    }
    setMenuOpen(false);
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
        <div className="fixed top-4 left-4 z-50">
          <LanguageSwitcher />
        </div>

        <MenuHeader
          category={category}
          handleSelectCategory={handleSelectCategory}
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
          key={category}
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
          startPayment={startPayment}
        />
        {paymentOpen && (
          <PaymentModal
            onClose={() => setPaymentOpen(false)}
            onSelect={handlePaymentMethod}
          />
        )}

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
          <div
            className={`fixed z-50 transition-all duration-500 ${
              scrolledDown
                ? "top-24 right-2 flex flex-col items-end space-y-3"
                : "top-3 right-5 flex gap-3 items-center"
            }`}
          >
            {/* Koszyk */}
            <button
              onClick={() => setOrderOpen(true)}
              className={`bg-white text-gray-800 rounded-full shadow-md hover:shadow-lg transition-all duration-300 relative flex items-center justify-center ${
                scrolledDown ? "w-12 h-12" : "w-16 h-16"
              } ${addedItemId ? "animate-bounce" : ""}`}
              title="Twoje zamówienie"
            >
              <img
                src="/images/koszyk.webp"
                alt="Koszyk"
                className="w-8 h-8 object-contain"
              />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              )}
            </button>

            {/* Wezwij kelnera */}
            <button
              onClick={() => alert("Kelner został wezwany!")}
              className={`bg-white text-gray-800 rounded-full shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center ${
                scrolledDown ? "w-12 h-12" : "w-16 h-16"
              }`}
              title="Wezwij kelnera"
            >
              <img
                src="/images/wezwijkelnera.jpg"
                alt="Wezwij kelnera"
                className="w-8 h-8 object-contain"
              />
            </button>

            {/* Numer stolika */}
            {table && (
              <button
                onClick={() => setShowTableChange(true)}
                className={`bg-white text-gray-800 text-xl font-extrabold rounded-full shadow-md hover:bg-gray-300 transition-all duration-300 flex items-center justify-center ${
                  scrolledDown ? "w-12 h-12 text-lg" : "w-16 h-16 text-xl"
                }`}
                title="Numer stolika"
              >
                {table}
              </button>
            )}

            {/* Modal do zmiany stolika */}
            {showTableChange && (
              <TableChangeModal
                onClose={() => setShowTableChange(false)}
                onSuccess={() => {
                  setShowTableChange(false);
                  localStorage.removeItem("table");
                  setTable(null);
                }}
              />
            )}
            {orderSuccess && (
              <div className="absolute top-full mt-2 right-0 bg-green-600 text-white px-5 py-2 rounded-xl shadow-xl z-[9999] whitespace-nowrap">
                ✅ Zamówienie zostało złożone!
              </div>
            )}
          </div>
        )}
        {showNewsletterModal && (
          <NewsletterModal
            onClose={() => setShowNewsletterModal(false)}
            onSubmit={(email) => {
              // TODO: zapisz email do Firestore lub wyślij do API
              console.log("📧 Zapisano do newslettera:", email);
              setShowNewsletterModal(false);
              alert("Dziękujemy za zapis!");
            }}
          />
        )}
        {showRatingModal && (
          <RatingModal
            onSubmit={async (rating) => {
              try {
                await addDoc(collection(db, "ratings"), {
                  table: Number(table),
                  rating,
                  createdAt: serverTimestamp(),
                });
                setShowRatingModal(false);
                setShowNewsletterModal(true); // dopiero potem newsletter
              } catch (err) {
                console.error("Błąd zapisu oceny:", err);
              }
            }}
          />
        )}
      </div>
    </div>
  );
};

export default App;
