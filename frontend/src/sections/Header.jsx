import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/login");
  };
  return (
    <div className="border-[1px] py-4 px-10 flex justify-between">
      <div className="text-2xl font-bold">100xDevs</div>
      <div>
        <button
          onClick={handleClick}
          className="py-2 px-10 bg-gradient-to-r from-blue-900 to-blue-700 text-white font-medium rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Header;
