function Popup({ message, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full text-center">
        <h2 className="text-xl font-bold text-red-600 mb-4">Limit Reached</h2>
        <p className="mb-6 text-gray-700">{message}</p>
        <button
          className="px-6 py-2 bg-green-700 text-white rounded hover:bg-green-800 transition"
          onClick={onClose}
        >
          OK
        </button>
      </div>
    </div>
  );
}
export default Popup;
