import { menuCategories } from "../menu";
import { useTranslate } from "../context/LanguageContext";

const MenuHeader = ({
  category,
  handleSelectCategory,
  openedMainCategory,
  setOpenedMainCategory,
  menuOpen,
  setMenuOpen,
  mobileView,
  setMobileView,
  activeMain,
  setActiveMain,
}) => {
  const { t } = useTranslate();
  return (
    <header className="text-center mb-6 w-full mx-auto">
      <img
        src="/images/logo.png"
        alt="Logo firmy"
        className="mx-auto mb-2 w-48 md:w-56 lg:w-64 h-auto"
      />
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-red-600 tracking-tight mb-2">
        {t("menu")}
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
            🍣 {t("categories")}
          </button>

          {/* Menu mobilne */}
          {menuOpen && (
            <div className="sm:hidden bg-[#1e1e1e] text-white rounded-2xl p-4 shadow-2xl space-y-3 max-h-[70vh] overflow-y-auto border border-red-500">
              {mobileView === "main" &&
                Object.entries(menuCategories).map(([main, subs]) => (
                  <div key={main}>
                    <button
                      onClick={() => {
                        const subs = menuCategories[main];
                        if (Array.isArray(subs)) {
                          setOpenedMainCategory(main);
                          setMobileView("sub");
                          setActiveMain(main);
                        } else {
                          handleSelectCategory(main);
                          setMenuOpen(false);
                        }
                      }}
                      className="w-full text-left font-bold text-lg py-3 px-4 rounded-xl bg-[#2a2a2a] hover:bg-red-600 hover:text-white transition shadow-md"
                    >
                      {main}
                    </button>
                  </div>
                ))}

              {mobileView === "sub" && activeMain && (
                <div className="space-y-2 flex flex-col items-center">
                  <button
                    onClick={() => {
                      setMobileView("main");
                      setActiveMain(null);
                    }}
                    className="block w-full text-center text-white text-sm mb-2 hover:text-red-400"
                  >
                    ← Wróć
                  </button>
                  {menuCategories[activeMain].map((sub) => (
                    <button
                      key={sub}
                      onClick={() => {
                        handleSelectCategory(activeMain, sub);
                        setMenuOpen(false);
                      }}
                      className={`w-full text-left font-bold text-lg py-3 px-4 rounded-xl bg-[#2a2a2a] hover:bg-red-600 hover:text-white transition shadow-md ${
                        category === sub ? "bg-red-600 text-white" : ""
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
                  if (isClosing) {
                    setOpenedMainCategory(null);
                  } else {
                    const subs = menuCategories[mainCat];
                    if (Array.isArray(subs)) {
                      handleSelectCategory(mainCat, subs[0]);
                    } else {
                      handleSelectCategory(mainCat);
                    }
                  }
                }}
                className={`min-w-[130px] px-5 py-2.5 text-lg rounded-full font-semibold border transition-transform duration-150 ease-in-out hover:-translate-y-0.5 active:scale-95 ${
                  category === mainCat || menuCategories[mainCat]?.includes(category)
                    ? "bg-gradient-to-r from-red-600 to-red-700 text-white border-red-600"
                    : "bg-white text-black border border-gray-600 hover:bg-red-600 hover:text-white"
                }`}
                
                
              >
                {mainCat}
              </button>
            ))}
          </div>
        </div>

        {openedMainCategory && (
          <div className="hidden sm:flex w-full px-2 mt-4 flex-wrap justify-center gap-3 pb-2">
            {Array.isArray(menuCategories[openedMainCategory]) &&
              menuCategories[openedMainCategory].map((subCat) => (
                <button
                  key={subCat}
                  onClick={() =>
                    handleSelectCategory(openedMainCategory, subCat)
                  }
                  className={`min-w-[130px] px-5 py-2.5 text-base rounded-full font- font-medium transition-transform duration-150 ease-in-out hover:-translate-y-0.5 active:scale-95 ${
                    category === subCat
                      ? " bg-red-500 text-white"
                      : "bg-gray-800 text-white hover:bg-red-500"
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
