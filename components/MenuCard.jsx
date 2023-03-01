import Image from "next/image";
import { MdAdd, MdImage } from "react-icons/md";
import { useCart } from "../contexts/CartContext";

export default function MenuCard({ menu, setSelectedMenu }) {
  const { inCart } = useCart();
  return (
    <>
      <div className="p-2 flex items-center rounded-md bg-white gap-4 drop-shadow">
        {menu.img ? (
          <div className="w-24 h-20 relative overflow-hidden">
            <Image
              src={menu.img}
              alt={menu.name}
              fill
              loading="lazy"
              sizes="50vw"
              className="object-cover h-full w-full"
            />
          </div>
        ) : (
          <div className="w-24 h-20 flex flex-col items-center justify-center gap-4 bg-gray-200">
            <MdImage className="text-9xl text-gray-500" />
          </div>
        )}
        <div className="flex-grow">
          <p className="text-gray-900 text-xl font-medium">{menu.name}</p>
          <span className="text-gray-500 text-lg">
            {"Rp " + menu.price.toLocaleString("id-ID")}
          </span>
        </div>
        <div className="flex self-end pr-4 pb-4">
          <button
            onClick={() => setSelectedMenu(menu)}
            className="bg-primary text-gray-600 flex items-center px-2 py-1 rounded-md disabled:bg-gray-300"
            disabled={inCart(menu.id)}
          >
            <span className="text-xl">
              <MdAdd />
            </span>
            <span className="text-sm">Pesan</span>
          </button>
        </div>
      </div>
    </>
  );
}
