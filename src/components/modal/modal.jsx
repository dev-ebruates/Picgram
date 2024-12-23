const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-black p-6 rounded-lg shadow-lg relative w-full max-w-md"
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
