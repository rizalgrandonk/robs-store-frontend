import Link from "next/link";
import { useState } from "react";
import MenuCard from "../components/MenuCard";
import SortButton from "../components/SortButton";
import TambahPesananModal from "../components/TambahPesananModal";
import { useCart } from "../contexts/CartContext";

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
    image: "https://source.unsplash.com/random/?espresso",
    sales: 1000,
    price: 12000,
  },
];

export default function Home() {
  const [menus, setMenus] = useState(daftarMenu);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [sortOption, setSortOption] = useState("name");

  const { isEmpty, cartTotal } = useCart();

  const sortMethods = {
    name: (a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    },
    price: (a, b) => a.price - b.price,
    sales: (a, b) => b.sales - a.sales,
  };

  return (
    <>
      <main className="pb-24 pt-16 px-4 bg-gray-50 min-h-screen">
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-2">
            <SortButton
              setSortOption={setSortOption}
              options={Object.keys(sortMethods)}
            />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          {menus.sort(sortMethods[sortOption]).map((menu) => (
            <MenuCard
              key={menu.id}
              menu={menu}
              setSelectedMenu={setSelectedMenu}
            />
          ))}
        </div>
      </main>
      <TambahPesananModal
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
      />
      {!isEmpty ? (
        <div className="px-4 w-full fixed bottom-10 drop-shadow-lg">
          <div className="flex justify-between items-center w-full h-16 rounded-xl overflow-hidden">
            <div className="w-full h-full border-t-2 border-b-2 border-l-2 flex flex-col justify-center pl-6 bg-white rounded-l-xl">
              <p className="text-lg font-bold">Total :</p>
              <span className="text-gray-600">
                {"Rp " + cartTotal.toLocaleString("id-ID")}
              </span>
            </div>
            <Link legacyBehavior href="/pesanan">
              <a className="flex justify-center items-center w-full h-full bg-secondary text-white text-lg font-medium">
                Buat Pesanan
              </a>
            </Link>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
