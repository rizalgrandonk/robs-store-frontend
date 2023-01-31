import Image from "next/image";
import { MdAdd, MdRemove } from "react-icons/md";
import { useCart } from "../contexts/CartContext";

export default function CartItem({ pesanan }) {
  const { updateItemQuantity, removeItem } = useCart();

  return (
    <div className="p-2 flex items-center rounded-md gap-4 drop-shadow">
      <div className="space-y-2">
        <div className="flex-grow flex items-center gap-4">
          <div className="w-24 h-20 relative overflow-hidden">
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
            <p className="text-gray-900 text-lg font-medium">
              {pesanan.menu.name}
            </p>
            <span className="text-gray-500 text-lg">
              {"Rp " + pesanan.menu.price.toLocaleString("id-ID")}
            </span>
          </div>
        </div>
        <p className="font-medium text-sm">Topping</p>
        <div className="p-1 w-20 bg-gray-50 shadow rounded text-center space-y-2">
          <div className="w-full h-14 relative overflow-hidden rounded">
            <Image
              src={pesanan.topping.img}
              alt={pesanan.topping.name}
              fill
              loading="lazy"
              sizes="50vw"
              className="object-cover h-full w-full"
            />
          </div>
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
          className="text-xl w-8 h-8 grid place-items-center"
        >
          <MdRemove />
        </button>
        <span className="text-lg w-10 h-8 grid place-items-center">
          {pesanan.quantity}
        </span>
        <button
          onClick={() =>
            updateItemQuantity(pesanan.menu.id, pesanan.quantity + 1)
          }
          className="text-xl w-8 h-8 grid place-items-center"
        >
          <MdAdd />
        </button>
      </div>
    </div>
  );
}
