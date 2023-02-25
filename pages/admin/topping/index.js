import { useState } from "react";
import { MdAdd, MdClose } from "react-icons/md";
import { useMutation, useQuery, useQueryClient } from "react-query";
import AdminMenuCard from "../../../components/AdminMenuCard";
import AdminToppingCard from "../../../components/AdminToppingCard";
import LoadingSpinner from "../../../components/LoadingSpinner";
import MenuForm from "../../../components/MenuForm";
import SortButton from "../../../components/SortButton";
import ToppingForm from "../../../components/ToppingForm";
import { useAuth } from "../../../contexts/AuthContext";
import { addTopping, getAllTopping } from "../../../lib/api";

export default function Topping() {
  const { user } = useAuth();
  const {
    isLoading,
    isError,
    data: daftarTopping,
  } = useQuery("allTopping", () => getAllTopping(user.token));

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

  if (daftarTopping) {
    return (
      <main className="pb-24 pt-[4.5rem] px-4 bg-gray-50 min-h-screen">
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-2">
            <SortButton
              setSortOption={setSortOption}
              options={Object.keys(sortMethods)}
            />
          </div>
          <AddToppingButton />
        </div>
        <div className="flex flex-col gap-4">
          {daftarTopping.sort(sortMethods[sortOption]).map((topping) => (
            <AdminToppingCard key={topping.id} topping={topping} />
          ))}
        </div>
      </main>
    );
  }
}

function AddToppingButton() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);

  const mutation = useMutation((data) => addTopping(data, user.token), {
    onSuccess: () => {
      queryClient.invalidateQueries("allTopping");
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
        <span className="text-sm">Tambahkan Topping</span>
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
              <div className="p-2 bg-red-100 ring-1 ring-red-200 text-red-400 ">
                {mutation.error.message}
              </div>
            ) : null}
            {mutation.isLoading ? (
              <div className="w-full flex justify-center items-center py-6">
                <div className="border-t-transparent border-solid animate-spin  rounded-full border-primary border-8 h-20 w-20"></div>
              </div>
            ) : (
              <ToppingForm
                onSubmit={handleSubmit}
                setModalOpen={setModalOpen}
              />
            )}
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
