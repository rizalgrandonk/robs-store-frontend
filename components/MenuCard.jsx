import Image from "next/image";
import { useState } from "react";
import { MdAdd, MdOutlineDelete, MdOutlineEdit } from "react-icons/md";
import MenuForm from "./MenuForm";

export default function MenuCard({ menu }) {
  return (
    <>
      <div className="p-2 flex items-center rounded-md bg-white gap-4 drop-shadow">
        <div className="w-24 h-20 relative overflow-hidden">
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
        <div className="flex self-end pr-4 pb-4">
          <div className="bg-primary text-gray-600 flex items-center px-2 py-1 rounded-md">
            <span className="text-xl">
              <MdAdd />
            </span>
            <span className="text-sm">Pesan</span>
          </div>
        </div>
      </div>
    </>
  );
}
