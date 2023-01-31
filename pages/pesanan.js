import { useRouter } from "next/router";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import CartItem from "../components/CartItem";
import { useCart } from "../contexts/CartContext";
import { createOrder } from "../lib/user/api";

export default function Pesanan() {
  const {
    items,
    isEmpty,
    cartTotal,
    namaCustomer,
    meja,
    setNamaCustomer,
    setMeja,
    setOrderCode,
  } = useCart();

  const router = useRouter();
  // const queryClient = useQueryClient();

  // const [errors, setErrors] = useState({});

  const mutation = useMutation((formData) => createOrder(formData), {
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data) => {
      setOrderCode(data);
      router.push("/scan");
    },
  });

  const submitOrder = () => {
    if (isEmpty || !namaCustomer || !meja) {
      return;
    }

    const orderItem = items.map((pesanan) => ({
      menu_id: pesanan.menu.id,
      topping_id: pesanan.topping.id,
      quantity: pesanan.quantity,
      price: (pesanan.menu.price + pesanan.topping.price) * pesanan.quantity,
    }));

    const form = {
      customer_name: namaCustomer,
      total_price: cartTotal,
      is_paid: false,
      notes: items.reduce(
        (acc, curr) => `${acc}, ${curr.menu.name}: ${curr.notes}`,
        ""
      ),
      cashier_id: 1,
      table_number: meja,
      take_away: false,
      order_item: orderItem,
    };

    // console.log(form);
    mutation.mutate(form);
  };

  return (
    <>
      <main className="pb-24 pt-20 px-1 bg-gray-50 h-screen space-y-3">
        <div className="bg-white px-3 py-6 max-h-[60%] overflow-y-scroll">
          {isEmpty ? <p className="text-2xl">No Items</p> : ""}
          {items.map((pesanan) => (
            <CartItem key={pesanan.menu.id} pesanan={pesanan} />
          ))}
        </div>
        <div className="bg-white px-5 py-6 space-y-2">
          <div className="w-full flex flex-col gap-0">
            <label htmlFor="nama" className="text-lg font-medium">
              Nama
            </label>
            <input
              onChange={(e) => setNamaCustomer(e.target.value)}
              value={namaCustomer}
              type="text"
              id="nama"
              name="nama"
              className={`rounded text-lg ${
                namaCustomer === "" ? "border-red-600" : ""
              }`}
            />
            {namaCustomer === "" ? (
              <span className="text-red-600">Isi nama anda</span>
            ) : (
              ""
            )}
          </div>
          <div className="w-full flex flex-col gap-0">
            <label htmlFor="nomor_meja" className="text-lg font-medium">
              Nomor Meja
            </label>
            <input
              onChange={(e) => setMeja(e.target.value)}
              value={meja}
              type="text"
              id="nomor_meja"
              name="nomor_meja"
              className={`rounded text-lg ${
                meja === "" ? "border-red-600" : ""
              }`}
            />
            {meja === "" ? (
              <span className="text-red-600">Isi nomor meja</span>
            ) : (
              ""
            )}
          </div>
        </div>
      </main>

      {!isEmpty ? (
        <div className="px-4 w-full fixed bottom-10 drop-shadow-lg">
          <div className="flex justify-between items-center w-full h-16 rounded-xl overflow-hidden">
            <div className="w-full h-full border-t-2 border-b-2 border-l-2 flex flex-col justify-center pl-6 bg-white rounded-l-xl">
              <p className="text-lg font-bold">Total :</p>
              <span className="text-gray-600">
                {"Rp " + cartTotal.toLocaleString("id-ID")}
              </span>
            </div>
            <button
              type="button"
              className="flex justify-center items-center w-full h-full bg-secondary text-white text-lg font-medium disabled:bg-gray-400"
              disabled={
                namaCustomer === "" || meja === "" || mutation.isLoading
              }
              onClick={submitOrder}
            >
              {mutation.isLoading ? "Loading..." : "Buat Pesanan"}
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
