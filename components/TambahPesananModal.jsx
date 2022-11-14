import Image from "next/image";
import { useState } from "react";
import { MdAdd, MdRemove } from "react-icons/md";

export default function TambahPesananModal({ selectedMenu, setSelectedMenu }) {
  const [jumlah, setJumlah] = useState(1);
  if (selectedMenu)
    return (
      <div className="fixed inset-0 grid place-items-center bg-black/30 z-40">
        <div className="w-full min-h-[70%] bg-white rounded-t-3xl px-5 py-4 absolute bottom-0">
          <div className="flex justify-end items-center pb-2 border-b mb-4 border-gray-200">
            <span
              onClick={() => {
                setSelectedMenu(null);
                setJumlah(1);
              }}
              className="text-2xl text-gray-600 font-bold px-1"
            >
              X
            </span>
          </div>
          <div className="px-2 flex flex-col items-center gap-6">
            <div className="w-full h-48 relative overflow-hidden">
              <Image
                src={selectedMenu.image}
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
            <input
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
            <button className="bg-secondary text-white flex px-6 py-3 rounded-md text-xl">
              Tambahkan Pesanan
            </button>
          </div>
        </div>
      </div>
    );
}
