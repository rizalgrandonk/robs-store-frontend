import Image from "next/image";
import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";

function MenuCard({ menu, setMenus }) {
  return (
    <div className="p-2 flex items-center rounded-md bg-white gap-4 drop-shadow">
      <div className="w-28 h-24 relative overflow-hidden">
        <Image
          src={menu.image}
          alt={menu.name}
          fill
          loading="lazy"
          sizes="50vw"
          className="object-cover h-full w-full"
        />
      </div>
      <div className="flex-grow">
        <p className="text-gray-900 text-xl font-medium">{menu.name}</p>
        <span className="text-gray-500 text-lg">
          {"Rp " + menu.price.toLocaleString("id-ID")}
        </span>
      </div>
      <div className="flex self-end">
        <span className="text-rose-600 text-2xl p-1.5 border border-gray-500">
          <MdOutlineDelete />
        </span>
        <span className="text-secondary text-2xl p-1.5 border border-gray-500">
          <MdOutlineEdit />
        </span>
      </div>
    </div>
  );
}

export default MenuCard;
