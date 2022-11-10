import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import {
  MdAdd,
  MdOutlineDelete,
  MdOutlineEdit,
  MdOutlineFilterAlt,
  MdSort,
} from "react-icons/md";

import { useAuth } from "../../../contexts/AuthContext";

const daftarMenu = [
  {
    id: "1",
    name: "Americano",
    image: "https://source.unsplash.com/random/?americano",
    sales: 1300,
    price: 14000,
  },
  {
    id: "2",
    name: "Latte",
    image: "https://source.unsplash.com/random/?latte",
    sales: 2700,
    price: 18000,
  },
  {
    id: "3",
    name: "Cappuccino",
    image: "https://source.unsplash.com/random/?cappuccino",
    sales: 1600,
    price: 16000,
  },
  {
    id: "4",
    name: "Espresso",
    image: "https://source.unsplash.com/random/?Espresso",
    sales: 1000,
    price: 12000,
  },
];

function Menu() {
  const { isAuthenticated, user } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !user) {
    return <h2>Unauthorized</h2>;
  }

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
        {daftarMenu.map((menu) => (
          <div
            key={menu.id}
            className="p-2 flex items-center rounded-md bg-white gap-4 drop-shadow"
          >
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
        ))}
      </div>
    </main>
  );
}

export default Menu;
