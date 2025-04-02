import { useTranslate } from "../context/LanguageContext";

const ItemModal = ({
    selected,
    setSelected,
    updateQuantity,
    quantities,
    addToCart,
    setQuantities,
    setAddedItemId,
  }) => {
    const { t } = useTranslate();
    if (!selected) return null;
  
    const handleAdd = () => {
      const qty = quantities[selected.id] || 1;
      for (let i = 0; i < qty; i++) {
        addToCart(selected);
      }
      setQuantities((prev) => ({ ...prev, [selected.id]: 1 }));
      setAddedItemId(selected.id);
      setTimeout(() => setAddedItemId(null), 1000);
      setSelected(null);
    };
  
    return (
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
          <h3 className="text-2xl font-bold mt-4 text-white">{selected.name}</h3>
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
              onClick={handleAdd}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-xl font-semibold transition"
            >
              {t("add")}
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default ItemModal;
  