import { menuCategories } from "../menu";

const MenuHeader = ({
  category,
  setCategory,
  openedMainCategory,
  setOpenedMainCategory,
  menuOpen,
  setMenuOpen,
  mobileView,
  setMobileView,
  activeMain,
  setActiveMain,
}) => {
  return (
    <header className="text-center mb-6 w-full mx-auto">
      <img
        src="/images/logo.png"
        alt="Logo firmy"
        className="mx-auto mb-2 w-48 md:w-56 lg:w-64 h-auto"
      />
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-red-600 tracking-tight mb-2">
        Menu
      </h1>

      <div className="w-full max-w-5xl mx-auto">
        <div className="px-2 py-4 text-center">
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

          <div className="hidden sm:flex flex-wrap justify-center gap-3">
            {Object.keys(menuCategories).map((mainCat) => (
              <button
                key={mainCat}
                onClick={() => {
                  const isClosing = openedMainCategory === mainCat;
                  setOpenedMainCategory(isClosing ? null : mainCat);
                  if (!isClosing && Array.isArray(menuCategories[mainCat])) {
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
  );
};

export default MenuHeader;
