import Button from "../components/Button";
import ButtonWarning from "../components/ButtonWarning";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";

const SignUp = () => {
  return (
    <div className="h-screen bg-slate-300 flex justify-center">
      <div className="flex items-center">
        <div className="w-[23rem] bg-white py-2 px-5 text-center rounded-lg">
          <Heading label={"Sign Up"} />
          <SubHeading label={"Enter details to register"} />
          <div className="flex gap-2">
            <InputBox
              label={"First Name"}
              placeholder={"Eg:- Jane"}
              type={"text"}
            />
            <InputBox
              label={"Last Name"}
              placeholder={"Eg:- Doe"}
              type={"text"}
            />
          </div>
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
          <Button label={"Sign Up"} />
          <ButtonWarning
            label={"Already have an account?"}
            buttonText={"Sign In"}
            to={"/login"}
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
