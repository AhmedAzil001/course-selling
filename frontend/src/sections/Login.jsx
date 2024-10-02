import Button from "../components/Button";
import ButtonWarning from "../components/ButtonWarning";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";

const Login = () => {
  const handleClick = () => {};
  return (
    <div className="h-screen bg-slate-300 flex justify-center">
      <div className="flex items-center">
        <div className="w-[23rem] bg-white py-2 px-5 text-center rounded-lg">
          <Heading label={"Sign In"} />
          <SubHeading label={"Enter your credentials to access your account"} />
          <InputBox
            label={"Email"}
            placeholder={"Enter your email"}
            type={"email"}
          />
          <InputBox
            label={"Password"}
            placeholder={"Enter your password"}
            type={"password"}
          />
          <Button label={"Login"} />
          <ButtonWarning
            label={"Don't have an account?"}
            buttonText={"Sign up"}
            to={"/signup"}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
