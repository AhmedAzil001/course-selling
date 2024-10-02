const Button = ({ label, onClick }) => {
  return (
    <div className="py-4">
      <button
        className="bg-gradient-to-r from-blue-900 to-blue-700 w-full rounded px-4 py-2 text-white font-medium"
        onClick={onClick}
      >
        {label}
      </button>
    </div>
  );
};

export default Button;
