import Link from "next/link";
import { useState } from "react";
import { useQuery } from "react-query";
import LoadingSpinner from "../components/LoadingSpinner";
import MenuCard from "../components/MenuCard";
import SortButton from "../components/SortButton";
import TambahPesananModal from "../components/TambahPesananModal";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import { getAllMenu } from "../lib/user/api";

export default function Home() {
  const {
    isLoading,
    isError,
    data: daftarMenu,
  } = useQuery("allMenuUser", () => getAllMenu());

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

  if (isLoading) {
    return (
      <div className="min-h-screen grid place-items-center">
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

  if (daftarMenu) {
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
            {daftarMenu.sort(sortMethods[sortOption]).map((menu) => (
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
}
