import Image from "next/image";
import { useEffect, useState } from "react";
import { MdAdd, MdClose, MdRemove } from "react-icons/md";
import { useQuery } from "react-query";
import { useCart } from "../contexts/CartContext";
import { getAllTopping } from "../lib/user/api";
import LoadingSpinner from "./LoadingSpinner";

export default function TambahPesananModal({ selectedMenu, setSelectedMenu }) {
  const { addItem } = useCart();
  const {
    isLoading,
    isError,
    data: daftarTopping,
  } = useQuery("allToppingUser", () => getAllTopping());

  const [jumlah, setJumlah] = useState(1);
  const [notes, setNotes] = useState("");

  const [selectedTopping, setSelectedTopping] = useState(null);

  const [error, setError] = useState("");

  useEffect(() => {
    if (daftarTopping) {
      setSelectedTopping((prev) => (prev ? prev : daftarTopping[0]));
    }
  }, [daftarTopping]);

  const handleAddItem = () => {
    if (!selectedTopping) {
      return setError("Add Topping");
    }

    const item = { menu: selectedMenu, topping: selectedTopping, notes };
    addItem(item, jumlah);
    setSelectedMenu(null);
    setJumlah(1);
  };

  if (isLoading) {
    return (
      <div className="h-40 grid place-items-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="px-4 pt-20">
        <div className="w-full px-2 py-3 bg-red-100">
          <p className="text-red-500">Service Error</p>
        </div>
      </div>
    );
  }

  if (daftarTopping && selectedMenu) {
    return (
      <div className="fixed inset-0 grid place-items-center bg-black/30 z-40">
        <div className="w-full min-h-[70%] bg-white rounded-t-3xl px-4 py-3 absolute bottom-0">
          <div className="flex justify-end items-center pb-2 border-b mb-3 border-gray-200">
            <span
              onClick={() => {
                setSelectedMenu(null);
                setJumlah(1);
              }}
              className="text-2xl text-gray-600 font-bold px-1"
            >
              <MdClose />
            </span>
          </div>
          <div className="px-2 flex flex-col items-center gap-4">
            <div className="w-full h-40 relative overflow-hidden">
              <Image
                src={selectedMenu.img}
                alt={selectedMenu.name}
                fill
                loading="lazy"
                sizes="90vw"
                className="object-cover h-full w-full"
              />
            </div>
            <p className="text-center text-xl text-secondary font-medium">
              {selectedMenu.name}
            </p>
            {error ? <p className="text-red-400 font-medium">{error}</p> : ""}
            <div className="w-full ">
              <p className="font-medium">Pilih Topping</p>
              <div className="py-4 grid grid-cols-4 gap-4">
                {daftarTopping.map((topping) => (
                  <div
                    onClick={() => setSelectedTopping(topping)}
                    key={topping.id}
                    className={`p-1 bg-gray-100 shadow rounded text-center space-y-2 cursor-pointer ring-2  ${
                      selectedTopping?.id === topping.id
                        ? "ring-primary"
                        : "ring-gray-100/20"
                    }`}
                  >
                    <div className="w-full h-14 relative overflow-hidden rounded">
                      <Image
                        src={topping.img}
                        alt={topping.name}
                        fill
                        loading="lazy"
                        sizes="50vw"
                        className="object-cover h-full w-full"
                      />
                    </div>
                    <p className="text-xs font-medium">{topping.name}</p>
                  </div>
                ))}
              </div>
            </div>
            <input
              onChange={(e) => setNotes(e.target.value)}
              value={notes}
              placeholder="Add Notes"
              type="text"
              className="w-full border-b-2 border-0 border-gray-300 text-gray-900 focus:outline-none focus:ring-0 focus:border-secondary"
            />
            <p className="text-2xl text-gray-800 self-end">
              {"Rp " + selectedMenu.price.toLocaleString("id-ID")}
            </p>
            <div className="flex items-center border divide-x self-end">
              <button
                onClick={() =>
                  setJumlah((prev) => (prev > 1 ? prev - 1 : prev))
                }
                className="text-2xl w-10 h-10 grid place-items-center"
              >
                <MdRemove />
              </button>
              <span className="text-xl w-12 h-10 grid place-items-center">
                {jumlah}
              </span>
              <button
                onClick={() => setJumlah((prev) => prev + 1)}
                className="text-2xl w-10 h-10 grid place-items-center"
              >
                <MdAdd />
              </button>
            </div>
            <button
              onClick={handleAddItem}
              className="bg-secondary text-white flex px-6 py-3 rounded-md text-xl"
            >
              Tambahkan Pesanan
            </button>
          </div>
        </div>
      </div>
    );
  }
}
