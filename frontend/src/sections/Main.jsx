import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { FaArrowRightLong } from "react-icons/fa6";

const Main = () => {
  const navigate = useNavigate();

  const handleEnrollClick = () => {
    navigate("/signup");
  };

  const handleClick = () => {
    navigate("/login");
  };

  return (
    <div className="h-[90vh] flex justify-center items-center">
      <div className="flex flex-col items-center">
        <div className="text-5xl font-bold py-5">
          Start your development journey with us
        </div>
        <div className="text-2xl font-medium py-2">
          Join our community to learn the best from the best
        </div>
        <div className="flex gap-8 items-center py-5">
          <button
            onClick={handleClick}
            className="flex items-center gap-3 bg-gradient-to-r from-blue-900 to-blue-700 py-2 px-4 rounded text-white font-medium"
          >
            All courses <FaArrowRightLong />
          </button>

          <button
            onClick={handleEnrollClick}
            className="flex items-center gap-3 bg-gradient-to-r from-blue-900 to-blue-700 py-2 px-4 rounded text-white font-medium"
          >
            Enroll now <FaArrowRightLong />
          </button>
          {/* <Button label={"All courses"} />
          <Button label={"Enroll now"} /> */}
        </div>
      </div>
    </div>
  );
};

export default Main;
