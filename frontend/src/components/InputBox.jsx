const InputBox = ({ placeholder, label, onChange, type }) => {
  return (
    <div className="flex flex-col items-start py-2">
      <div className="font-medium pb-[0.1rem]">{label}</div>
      <input
        className="w-full p-2 border-[1px] rounded border-gray-200"
        type={type}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};

export default InputBox;
