const MenuGrid = ({
    filteredMenu,
    quantities,
    updateQuantity,
    addToCart,
    setQuantities,
    setAddedItemId,
    addedItemId,
    setSelected,
  }) => {
    return (
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
                <h2 className="text-xl font-bold mt-3 text-white">{item.name}</h2>
                <p className="text-md text-red-500 font-semibold">{item.price} zł</p>
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
                      setQuantities((prev) => ({ ...prev, [item.id]: 1 }));
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
      </div>
    );
  };
  
  export default MenuGrid;
  