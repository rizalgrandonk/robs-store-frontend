import Image from "next/image";
import { MdAdd, MdImage, MdRemove } from "react-icons/md";
import { useCart } from "../contexts/CartContext";

export default function MenuCard({ menu, setSelectedMenu }) {
  const { inCart, items, updateItemQuantity, removeItem } = useCart();

  const cartItem = inCart(menu.id)
    ? items.find((item) => item.menu.id === menu.id)
    : null;

  const currentMenu = cartItem
    ? { ...cartItem.menu, quantity: cartItem.quantity }
    : menu;

  return (
    <>
      <div className="p-2 flex items-center rounded-md bg-white gap-4 drop-shadow">
        {currentMenu.img ? (
          <div className="w-24 h-20 relative overflow-hidden">
            <Image
              src={currentMenu.img}
              alt={currentMenu.name}
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
          <p className="text-gray-900 text-xl font-medium">
            {currentMenu.name}
          </p>
          <span className="text-gray-500 text-lg">
            {"Rp " + currentMenu.price.toLocaleString("id-ID")}
          </span>
        </div>
        <div className="flex self-end pb-2 pr-2">
          {inCart(currentMenu.id) ? (
            <div className="flex items-center border divide-x self-end">
              <button
                onClick={() => {
                  if (currentMenu.quantity > 1) {
                    return updateItemQuantity(
                      currentMenu.id,
                      currentMenu.quantity - 1
                    );
                  }
                  return removeItem(currentMenu.id);
                }}
                className="w-6 h-6 grid place-items-center"
              >
                <MdRemove />
              </button>
              <span className="text-sm w-8 h-6 grid place-items-center">
                {currentMenu.quantity}
              </span>
              <button
                onClick={() => {
                  updateItemQuantity(currentMenu.id, currentMenu.quantity + 1);
                }}
                className="w-6 h-6 grid place-items-center"
              >
                <MdAdd />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setSelectedMenu(currentMenu)}
              className="bg-primary text-gray-600 flex items-center px-2 py-1 rounded-md disabled:bg-gray-300"
              disabled={inCart(currentMenu.id)}
            >
              <span className="text-xl">
                <MdAdd />
              </span>
              <span className="text-sm">Pesan</span>
            </button>
          )}
        </div>
      </div>
    </>
  );
}
