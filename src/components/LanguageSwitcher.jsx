import { useTranslate } from "../context/LanguageContext";

const LanguageSwitcher = () => {
  const { lang, changeLanguage } = useTranslate();

  const buttonStyle = (code) =>
    `w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold shadow-md transition ${
      lang === code
        ? "bg-red-600 text-white"
        : "bg-white text-gray-800 hover:bg-gray-200"
    }`;

  return (
    <div className="flex gap-2 items-center">
      <button onClick={() => changeLanguage("pl")} className={buttonStyle("pl")}>
        PL
      </button>
      <button onClick={() => changeLanguage("en")} className={buttonStyle("en")}>
        GB
      </button>
    </div>
  );
};

export default LanguageSwitcher;
