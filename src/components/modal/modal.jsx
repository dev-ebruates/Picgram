import { useEffect } from "react";

const Modal = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => (document.body.style.overflow = ""); // Cleanup
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-black bg-opacity-80 flex justify-center items-center z-[999999]"
      onClick={onClose}
    >
      <div
        className="bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-md border-gray-700 border-2 z-[999999] transform translate-y-0"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-200"
          onClick={onClose}
        >
          ✖
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
