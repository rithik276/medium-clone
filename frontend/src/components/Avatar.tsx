import React from "react";
import { FormatName } from "../utils/FormatName";

export const Avatar = ({ name }: { name: string }) => {
  return (
    <div className="relative inline-flex items-center justify-center w-5 h-5 overflow-hidden bg-black rounded-full ">
      <span className="text-xs uppercase font-medium text-gray-200 ">
        {FormatName(name)}
      </span>
    </div>
  );
};
