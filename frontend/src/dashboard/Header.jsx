import { FiUser } from "react-icons/fi";
import { MdOutlineLightMode } from "react-icons/md";
import logo from "../assets/logo.ico";

const Header = () => {
  return (
    <div className="flex px-10 py-5 justify-between items-center border-b-[1px] border-gray-200">
      <div className="flex items-center justify-center gap-2">
        <div className="w-12 h-12 rounded-full overflow-hidden">
          <img className="w-14 h-14" src={logo} alt="" />
        </div>
        <div className="text-2xl font-bold">100xDevs</div>
      </div>

      <div className="flex gap-7 items-center">
        <div className="cursor-pointer">
          <MdOutlineLightMode size={25} />
        </div>
        <div className="border-[1px] bg-teal-600 p-3 justify-center items-center rounded-full cursor-pointer">
          <FiUser size={20} color="white" />
        </div>
      </div>
    </div>
  );
};

export default Header;
