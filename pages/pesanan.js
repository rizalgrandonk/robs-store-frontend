import { useRouter } from "next/router";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import CartItem from "../components/CartItem";
import LoadingSpinner from "../components/LoadingSpinner";
import { useCart } from "../contexts/CartContext";
import { createOrder, getMejaOptions } from "../lib/user/api";

export default function Pesanan() {
  const {
    items,
    isEmpty,
    cartTotal,
    namaCustomer,
    setNamaCustomer,
    setOrderCode,
    saveCustomer,
    emptyCart,
  } = useCart();

  const { data: mejaOptions } = useQuery("mejaOptions", () => getMejaOptions());

  const router = useRouter();

  const mutation = useMutation((formData) => createOrder(formData), {
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (data) => {
      setOrderCode(data);
      saveCustomer();
      emptyCart();
      router.push("/scan");
    },
  });

  const [meja, setMeja] = useState("");
  const [takeaway, setTakeaway] = useState(false);

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
      take_away: takeaway,
      order_item: orderItem,
    };

    // console.log(form);
    mutation.mutate(form);
  };

  return (
    <>
      <main className="pb-32 pt-20 px-1 bg-gray-50 min-h-screen space-y-3">
        <div className="bg-white px-3 py-3 max-h-[50%] overflow-y-scroll space-y-4">
          {isEmpty ? <p className="text-2xl">No Items</p> : ""}
          {items.map((pesanan) => (
            <CartItem key={pesanan.menu.id} pesanan={pesanan} />
          ))}
        </div>
        <div className="bg-white px-5 py-4 space-y-2">
          <div className="w-full flex flex-col gap-0">
            <label htmlFor="nama" className="font-medium">
              Nama
            </label>
            <input
              onChange={(e) => setNamaCustomer(e.target.value)}
              value={namaCustomer}
              type="text"
              id="nama"
              name="nama"
              className={`rounded ${
                namaCustomer === "" ? "border-red-600" : ""
              }`}
            />
            {namaCustomer === "" ? (
              <span className="text-xs text-red-600">Isi nama anda</span>
            ) : (
              ""
            )}
          </div>

          {mejaOptions ? (
            <div className="w-full flex flex-col gap-0">
              <label htmlFor="nomor_meja" className="font-medium">
                Nomor Meja
              </label>
              <select
                onChange={(e) => setMeja(e.target.value)}
                name="nomor_meja"
                id="nomor_meja"
                className={`rounded ${meja === "" ? "border-red-600" : ""}`}
              >
                <option value="">Pilih Meja</option>
                {mejaOptions.map((meja) => (
                  <option key={meja.table_number} value={meja.table_number}>
                    {meja.table_number}
                  </option>
                ))}
              </select>
              {meja === "" ? (
                <span className="text-xs text-red-600">Isi nomor meja</span>
              ) : (
                ""
              )}
            </div>
          ) : (
            <LoadingSpinner />
          )}

          <div className="w-full flex items-center gap-4">
            <input
              onChange={(e) => setTakeaway(e.target.checked)}
              defaultChecked={false}
              type="checkbox"
              name="takeaway"
              id="takeaway"
            />
            <label htmlFor="takeaway" className="font-medium">
              Takeaway
            </label>
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
