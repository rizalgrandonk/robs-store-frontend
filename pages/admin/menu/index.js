import Image from "next/image";
import {
  MdAdd,
  MdOutlineDelete,
  MdOutlineEdit,
  MdOutlineFilterAlt,
  MdSort,
} from "react-icons/md";

import Layout from "../../../components/Layout";

function Menu() {
  return (
    <main className="pb-16 pt-[4.5rem] px-4 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between py-3">
        <div className="flex items-center gap-2">
          <div className="bg-primary text-gray-600 flex items-center px-2 py-1 rounded gap-1">
            <span className="text-xl">
              <MdOutlineFilterAlt />
            </span>
            <span className="text-sm">Filter</span>
          </div>
          <div className="bg-primary text-gray-600 flex items-center px-2 py-1 rounded">
            <span className="text-xl">
              <MdSort />
            </span>
            <span className="text-sm">Sort</span>
          </div>
        </div>
        <div className="bg-primary text-gray-600 flex items-center px-2 py-1 rounded">
          <span className="text-xl">
            <MdAdd />
          </span>
          <span className="text-sm">Tambahkan Menu</span>
        </div>
      </div>
      <div className="space-y-4">
        <div className="p-2 flex items-center rounded-md bg-white gap-4 drop-shadow">
          <div className="w-28 h-24 relative overflow-hidden">
            <Image
              src={"https://source.unsplash.com/random/?americano"}
              alt="Menu Image"
              fill
              loading="lazy"
              sizes="50vw"
              className="object-cover h-full w-full"
            />
          </div>
          <div className="flex-grow">
            <p className="text-gray-900 text-xl font-medium">Americano</p>
            <span className="text-gray-500 text-lg">Rp 17.000</span>
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
        <div className="p-2 flex items-center rounded-md bg-white gap-4 drop-shadow">
          <div className="w-28 h-24 relative overflow-hidden">
            <Image
              src={"https://source.unsplash.com/random/?latte"}
              alt="Menu Image"
              fill
              loading="lazy"
              sizes="50vw"
              className="object-cover h-full w-full"
            />
          </div>
          <div className="flex-grow">
            <p className="text-gray-900 text-xl font-medium">Latte</p>
            <span className="text-gray-500 text-lg">Rp 20.000</span>
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
      </div>
    </main>
  );
}

Menu.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Menu;
