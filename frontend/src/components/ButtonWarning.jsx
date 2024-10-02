import { Link } from "react-router-dom";

const ButtonWarning = ({ label, buttonText, to }) => {
  return (
    <div className="flex justify-center text-sm py-2 gap-1">
      <div className="">{label}</div>
      <Link className="underline cursor-pointer font-medium" to={to}>{buttonText}</Link>
    </div>
  );
};

export default ButtonWarning;
