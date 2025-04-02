import { useTranslate } from "../context/LanguageContext";

const PaymentModal = ({ onClose, onSelect }) => {
    const { t } = useTranslate();
    return (
      <div
        className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <div
          className="bg-[#1e1e1e] text-white p-8 rounded-2xl w-full max-w-xl shadow-2xl relative border border-gray-600"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-5 text-2xl text-gray-400 hover:text-red-500"
          >
            ✖
          </button>
  
          <h2 className="text-3xl font-bold mb-6 text-center text-white">
            {t("choosePaymentMethod")}
          </h2>
  
          <div className="space-y-4">
            <button
              onClick={() => onSelect("karta")}
              className="w-full bg-[#2a2a2a] hover:bg-red-600 text-white font-bold py-4 px-6 rounded-2xl text-xl flex items-center justify-center gap-3 shadow-md transition"
            >
              💳 {t("payWithCard")}
            </button>
            <button
              onClick={() => onSelect("blik")}
              className="w-full bg-[#2a2a2a] hover:bg-red-600 text-white font-bold py-4 px-6 rounded-2xl text-xl flex items-center justify-center gap-3 shadow-md transition"
            >
              📲 {t("payWithBlik")}
            </button>
            <button
              onClick={() => onSelect("kelner")}
              className="w-full bg-[#2a2a2a] hover:bg-red-600 text-white font-bold py-4 px-6 rounded-2xl text-xl flex items-center justify-center gap-3 shadow-md transition"
            >
              🧾 {t("payWithWaiter")}
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default PaymentModal;
  