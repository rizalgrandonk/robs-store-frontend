import { useState } from "react";
import { MdAdd, MdClose } from "react-icons/md";
import { useMutation, useQuery, useQueryClient } from "react-query";
import AdminMenuCard from "../../../components/AdminMenuCard";
import MenuForm from "../../../components/MenuForm";
import SortButton from "../../../components/SortButton";
import { useAuth } from "../../../contexts/AuthContext";
import { addMenu, getAllMenu } from "../../../lib/api";

// const daftarMenu = [
//   {
//     id: "1",
//     name: "Americano",
//     image: "https://source.unsplash.com/random/?americano",
//     sales: 1300,
//     price: 14000,
//   },
//   {
//     id: "2",
//     name: "Latte",
//     image: "https://source.unsplash.com/random/?latte",
//     sales: 2700,
//     price: 18000,
//   },
//   {
//     id: "3",
//     name: "Cappuccino",
//     image: "https://source.unsplash.com/random/?cappuccino",
//     sales: 1600,
//     price: 16000,
//   },
//   {
//     id: "4",
//     name: "Espresso",
//     image: "https://source.unsplash.com/random/?espresso",
//     sales: 1000,
//     price: 12000,
//   },
// ];

export default function Menu() {
  const { user } = useAuth();
  const {
    isLoading,
    isError,
    data: daftarMenu,
  } = useQuery("/admin/menu", () => getAllMenu(user.token));
  const [sortOption, setSortOption] = useState("name");
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
      <div className="w-full h-screen flex justify-center items-center">
        <div className="border-t-transparent border-solid animate-spin  rounded-full border-primary border-8 h-20 w-20"></div>
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
      <main className="pb-24 pt-[4.5rem] px-4 bg-gray-50 min-h-screen">
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-2">
            <SortButton
              setSortOption={setSortOption}
              options={Object.keys(sortMethods)}
            />
          </div>
          <AddMenuButton />
        </div>
        <div className="flex flex-col gap-4">
          {daftarMenu.sort(sortMethods[sortOption]).map((menu) => (
            <AdminMenuCard key={menu.id} menu={menu} />
          ))}
        </div>
      </main>
    );
  }
}

function AddMenuButton() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);

  const mutation = useMutation((data) => addMenu(data, user.token), {
    onSuccess: () => {
      queryClient.invalidateQueries("/admin/menu");
      setModalOpen(false);
    },
  });

  const handleSubmit = (formData) => {
    mutation.mutate(formData);
  };

  return (
    <>
      <div
        onClick={() => setModalOpen(true)}
        className="bg-primary text-gray-600 flex items-center px-2 py-1 rounded"
      >
        <span className="text-xl">
          <MdAdd />
        </span>
        <span className="text-sm">Tambahkan Menu</span>
      </div>
      {modalOpen ? (
        <div className="fixed inset-0 grid place-items-center bg-black/30 z-40">
          <div className="w-full min-h-[60%] bg-white rounded-t-3xl px-5 py-4 absolute bottom-0">
            <div className="flex justify-between items-center pb-2 border-b">
              <p className="text-xl">Add Menu</p>
              <span
                onClick={() => setModalOpen(false)}
                className="text-2xl text-gray-600 font-bold px-1"
              >
                <MdClose />
              </span>
            </div>
            {mutation.isError ? (
              <div>An error occurred: {mutation.error.message}</div>
            ) : null}
            {mutation.isLoading ? (
              <div className="w-full flex justify-center items-center py-6">
                <div className="border-t-transparent border-solid animate-spin  rounded-full border-primary border-8 h-20 w-20"></div>
              </div>
            ) : (
              <MenuForm onSubmit={handleSubmit} setModalOpen={setModalOpen} />
            )}
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
