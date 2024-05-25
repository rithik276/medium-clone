import { MouseEventHandler } from "react";

export const Button = ({
  value,
  onClick,
}: {
  value: string;
  onClick: MouseEventHandler;
}) => {
  return (
    <div>
      <button
        onClick={onClick}
        type="button"
        className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 text-center me-2"
      >
        {value}
      </button>
    </div>
  );
};
