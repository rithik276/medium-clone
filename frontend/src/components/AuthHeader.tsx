import { Link } from "react-router-dom";

export const AuthHeader = ({ type }: { type: "signin" | "signup" }) => {
  return (
    <>
      <h1 className="text-4xl font-bold">
        {type === "signin" ? "Login to your Account" : "Create an account"}
      </h1>
      <h3 className="mt-2 text-md text-slate-500">
        {type === "signin"
          ? "Don't have an account? "
          : "Already have an account? "}
        <Link
          to={type === "signup" ? "/signin" : "/signup"}
          className="underline"
        >
          {type === "signup" ? "Login" : "Create an account"}
        </Link>
      </h3>
    </>
  );
};
