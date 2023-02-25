import Image from "next/image";
import { MdAdd, MdRemove } from "react-icons/md";
import { useCart } from "../contexts/CartContext";

export default function CartItem({ pesanan }) {
  const { updateItemQuantity, removeItem } = useCart();

  return (
    <div className="py-2 flex items-center rounded-md justify-between drop-shadow">
      <div className="space-y-1">
        <div className="flex-grow flex items-center gap-4">
          <div className="w-14 h-12 relative overflow-hidden">
            <Image
              src={pesanan.menu.img}
              alt={pesanan.menu.name}
              fill
              loading="lazy"
              sizes="50vw"
              className="object-cover h-full w-full"
            />
          </div>
          <div className="">
            <p className="text-gray-900 font-medium">{pesanan.menu.name}</p>
            <span className="text-gray-500">
              {"Rp " + pesanan.menu.price.toLocaleString("id-ID")}
            </span>
          </div>
        </div>
        <p className="font-medium text-sm">Topping</p>
        <div className="p-1 bg-gray-50 shadow rounded flex items-center gap-2">
          <p className="text-xs font-medium">{pesanan.topping.name}</p>
          <p className="text-xs">
            {"Rp " + pesanan.topping.price.toLocaleString("id-ID")}
          </p>
        </div>
      </div>
      <div className="flex items-center border divide-x self-end">
        <button
          onClick={() => {
            if (pesanan.quantity > 1) {
              return updateItemQuantity(pesanan.menu.id, pesanan.quantity - 1);
            }
            return removeItem(pesanan.menu.id);
          }}
          className="text-lg w-6 h-6 grid place-items-center"
        >
          <MdRemove />
        </button>
        <span className="w-8 h-6 grid place-items-center">
          {pesanan.quantity}
        </span>
        <button
          onClick={() =>
            updateItemQuantity(pesanan.menu.id, pesanan.quantity + 1)
          }
          className="text-lg w-6 h-6 grid place-items-center"
        >
          <MdAdd />
        </button>
      </div>
    </div>
  );
}
