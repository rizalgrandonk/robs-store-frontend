import { useState } from "react";
import { MdArrowDropDown } from "react-icons/md";

export default function SelectInput({ options, value, onChange, placeholder }) {
  const [sortOpen, setSortOpen] = useState(false);

  return (
    <div className="relative text-sm">
      <div
        onClick={() => setSortOpen((prev) => !prev)}
        className="bg-primary flex items-center justify-between px-2 py-1 rounded relative w-32"
      >
        <span className="capitalize">{value ?? placeholder}</span>
        <MdArrowDropDown className="text-xl" />
      </div>
      {sortOpen ? (
        <div className="absolute w-32 left-0 mt-1 drop-shadow-xl bg-primary flex flex-col divide-y divide-white z-40 rounded max-h-60 overflow-y-auto">
          {options.map((item, index) => (
            <p
              key={index}
              onClick={() => {
                onChange(item);
                setSortOpen(false);
              }}
              className="px-3 py-1 capitalize"
            >
              {item}
            </p>
          ))}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
