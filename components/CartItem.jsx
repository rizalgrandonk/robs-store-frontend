import Image from "next/image";
import { MdAdd, MdRemove } from "react-icons/md";
import { useCart } from "../contexts/CartContext";

export default function CartItem({ pesanan }) {
  const { updateItemQuantity, removeItem } = useCart();

  return (
    <div className="p-2 flex items-center rounded-md gap-4 drop-shadow">
      <div className="w-24 h-20 relative overflow-hidden">
        <Image
          src={pesanan.image}
          alt={pesanan.name}
          fill
          loading="lazy"
          sizes="50vw"
          className="object-cover h-full w-full"
        />
      </div>
      <div className="flex-grow">
        <p className="text-gray-900 text-xl font-medium">{pesanan.name}</p>
        <span className="text-gray-500 text-lg">
          {"Rp " + pesanan.price.toLocaleString("id-ID")}
        </span>
      </div>
      <div className="flex items-center border divide-x self-end">
        <button
          onClick={() => {
            if (pesanan.quantity > 1) {
              return updateItemQuantity(pesanan.id, pesanan.quantity - 1);
            }
            return removeItem(pesanan.id);
          }}
          className="text-xl w-8 h-8 grid place-items-center"
        >
          <MdRemove />
        </button>
        <span className="text-lg w-10 h-8 grid place-items-center">
          {pesanan.quantity}
        </span>
        <button
          onClick={() => updateItemQuantity(pesanan.id, pesanan.quantity + 1)}
          className="text-xl w-8 h-8 grid place-items-center"
        >
          <MdAdd />
        </button>
      </div>
    </div>
  );
}
