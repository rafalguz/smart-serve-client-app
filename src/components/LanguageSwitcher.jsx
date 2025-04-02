import { useTranslate } from "../context/LanguageContext";

const LanguageSwitcher = () => {
  const { lang, changeLanguage } = useTranslate();

  return (
    <div className="flex gap-2 items-center">
      <button
        onClick={() => changeLanguage("pl")}
        className={`px-3 py-1 rounded-full text-sm font-semibold shadow-md ${
          lang === "pl"
            ? "bg-red-600 text-white"
            : "bg-white text-gray-800 hover:bg-gray-200"
        }`}
      >
        🇵🇱
      </button>
      <button
        onClick={() => changeLanguage("en")}
        className={`px-3 py-1 rounded-full text-sm font-semibold shadow-md ${
          lang === "en"
            ? "bg-red-600 text-white"
            : "bg-white text-gray-800 hover:bg-gray-200"
        }`}
      >
        🇬🇧
      </button>
    </div>
  );
};

export default LanguageSwitcher;
