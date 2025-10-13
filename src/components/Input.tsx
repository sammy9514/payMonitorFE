import type { FC } from "react";

interface iData {
  label: string;
  type: string;
  onChange: (value: any) => void;
  value: any;
  require: boolean;
}

export const Input: FC<iData> = ({ label, type, onChange, value, require }) => {
  return (
    <div className="w-full">
      <label className="mb-3 block">{label}</label>
      <input
        type={type}
        className="w-full p-4 border rounded-md mb-3"
        value={value}
        onChange={onChange}
        required={require}
      />
    </div>
  );
};
