function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white relative rounded-xl shadow-md p-8 max-w-sm w-full">
        <button
          className="absolute top-4 right-4 text-slate-900"
          onClick={onClose}
        >
          &times;
        </button>
        {children}
        <div className="flex justify-center">
          <button
            className="mt-4 px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-700 hover:-translate-y-1 transition-transform duration-200"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
