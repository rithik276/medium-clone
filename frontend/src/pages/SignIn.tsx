import { Quote } from "../components/Quote";
import { SignInAuth } from "../components/SignInAuth";

export const SignIn = () => {
  return (
    <div className="lg:flex justify-center items-center max-h-screen">
      <div className="lg:w-full">
        <SignInAuth />
      </div>
      <div className="hidden lg:block">
        <Quote />
      </div>
    </div>
  );
};
