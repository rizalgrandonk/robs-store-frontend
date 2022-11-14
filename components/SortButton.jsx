import { useState } from "react";
import { MdSort } from "react-icons/md";

export default function SortButton({ setSortOption, options }) {
  const [sortOpen, setSortOpen] = useState(false);

  return (
    <div className="relative">
      <div
        onClick={() => setSortOpen((prev) => !prev)}
        className="bg-primary text-gray-700 flex items-center px-2 py-1 rounded relative"
      >
        <span className="text-xl">
          <MdSort />
        </span>
        <span className="text-sm">Sort</span>
      </div>
      {sortOpen ? (
        <div className="absolute w-32 left-0 -bottom-[6.3rem] drop-shadow-xl bg-primary flex flex-col divide-y divide-white z-40 rounded">
          {options.map((item, index) => (
            <p
              key={index}
              onClick={() => {
                setSortOption(item);
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
