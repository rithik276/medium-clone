import { ChangeEvent } from "react";

interface InputBoxType {
  label: string;
  type: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
const InputBox = ({ label, type, placeholder, onChange }: InputBoxType) => {
  return (
    <>
      <label className="block mb-2 mt-4 text-xl font-medium text-gray-900 ">
        {label}
      </label>
      <input
        type={type}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-full mt-3"
        placeholder={placeholder}
        onChange={onChange}
        required
      />
    </>
  );
};

export default InputBox;
