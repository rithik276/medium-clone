import { Quote } from "../components/Quote";
import SignUpAuth from "../components/SignUpAuth";

export const SignUp = () => {
  return (
    <div className="lg:flex justify-center items-center max-h-screen">
      <div className="lg:w-full">
        <SignUpAuth />
      </div>
      <div className="hidden lg:block">
        <Quote />
      </div>
    </div>
  );
};
