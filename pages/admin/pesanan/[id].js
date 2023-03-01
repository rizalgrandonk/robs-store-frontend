import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { MdClose, MdImage } from "react-icons/md";
import { useMutation, useQuery, useQueryClient } from "react-query";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { useAuth } from "../../../contexts/AuthContext";
import { getDetailPesanan, payUserOrder } from "../../../lib/api";

export default function DetailPesanan() {
  const { query } = useRouter();
  const pesananId = query.id;
  const { user } = useAuth();
  const {
    isLoading,
    isError,
    data: pesanan,
  } = useQuery(["detailPesanan", pesananId], () => {
    if (pesananId) {
      return getDetailPesanan(pesananId, user.token);
    }
  });

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

  if (!pesanan && !isLoading) {
    return (
      <main className="pb-16 pt-20 px-1 bg-gray-50 min-h-screen flex justify-center items-center">
        <h2 className="text-gray-800 text-2xl font-medium mb-0.5">
          Pesanan Tidak Ditemukan
        </h2>
      </main>
    );
  }

  return (
    <>
      <main className="pb-16 pt-20 px-2 bg-gray-50 min-h-screen relative">
        <div className="py-3 px-4 rounded bg-white drop-shadow">
          <h2 className="text-secondary text-xl mb-0.5">
            Meja {pesanan.table_number}
          </h2>
          <p className="text-gray-600">
            Kode Pesanan {pesanan.id.split("-")[0]}
          </p>
          <div className="py-6 space-y-2">
            {pesanan.order_items.map((item, index) => (
              <div key={index} className="space-y-1">
                <div className="flex-grow flex items-center gap-4">
                  {item.menu_items.img ? (
                    <div className="w-20 h-16 relative overflow-hidden">
                      <Image
                        src={item.menu_items.img}
                        alt={item.menu_items.name}
                        fill
                        loading="lazy"
                        sizes="50vw"
                        className="object-cover h-full w-full"
                      />
                    </div>
                  ) : (
                    <div className="w-20 h-16 flex flex-col items-center justify-center gap-4 bg-gray-200">
                      <MdImage className="text-6xl text-gray-500" />
                    </div>
                  )}
                  <div className="">
                    <p className="text-gray-900 font-medium">
                      {item.menu_items.name}
                    </p>
                    <p className="text-gray-500">
                      {"Rp " + item.menu_items.price.toLocaleString("id-ID")}
                    </p>
                    <p className="text-gray-500">Jumlah: {item.quantity}</p>
                  </div>
                </div>
                <p className="font-medium text-sm">Topping</p>
                <div className="p-1 bg-gray-50 shadow rounded flex items-center gap-2">
                  <p className="text-xs font-medium">
                    {item.topping_items.name}
                  </p>
                  <p className="text-xs">
                    {"Rp " + item.topping_items.price.toLocaleString("id-ID")}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div>
            <h2 className="font-medium text-gray-700">Notes</h2>
            <p className="text-gray-500 text-sm">
              Notes : {pesanan.notes || "-"}
            </p>
          </div>
        </div>
      </main>
      {pesanan.is_paid ? (
        <div className="px-4 w-full fixed bottom-28 drop-shadow-lg">
          <div className="bg-sky-600 px-2 py-3 w-full rounded-xl overflow-hidden text-center text-lg font-medium text-white">
            Pesanan sudah dibayar
          </div>
        </div>
      ) : (
        <PayOrderButton pesanan={pesanan} />
      )}
    </>
  );
}

function PayOrderButton({ pesanan }) {
  const { query } = useRouter();
  const pesananId = query.id;
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const [modalOpen, setModalOpen] = useState(false);
  const [nominal, setNominal] = useState(0);

  const mutation = useMutation((data) => payUserOrder(data, user.token), {
    onSuccess: () => {
      queryClient.invalidateQueries(["detailPesanan", pesananId]);
      queryClient.invalidateQueries(["allPesanan"]);
      setModalOpen(false);
    },
  });

  const handleChange = (e) => {
    if (e.target.validity.valid) {
      const number = e.target.value ? parseInt(e.target.value) : "";
      setNominal(number);
    }
  };

  const handleSubmit = () => {
    mutation.mutate({
      order_id: pesananId,
      cash: nominal,
    });
  };

  const totalKembalian = nominal - pesanan.total_price;

  return (
    <>
      <div className="px-4 w-full fixed bottom-28 drop-shadow-lg">
        <div className="flex justify-between items-center w-full h-16 rounded-xl overflow-hidden">
          <div className="w-full h-full border-t-2 border-b-2 border-l-2 flex flex-col justify-center pl-6 bg-white rounded-l-xl">
            <p className="text-lg font-bold">Total :</p>
            <span className="text-gray-600">
              {"Rp " + pesanan.total_price.toLocaleString("id-ID")}
            </span>
          </div>
          <button
            onClick={() => setModalOpen(true)}
            type="button"
            className="w-full h-full bg-secondary text-white text-lg font-medium"
          >
            Pesanan Selesai
          </button>
        </div>
      </div>

      {modalOpen ? (
        <div className="fixed inset-0 grid place-items-center bg-black/30 z-40">
          <div className="w-full bg-white rounded-t-3xl px-5 py-4 absolute bottom-0">
            <div className="flex justify-between items-center pb-2 border-b">
              <p className="text-xl">Bayar Pesanan</p>
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
              <form
                onSubmit={handleSubmit}
                className="py-4 flex flex-col gap-3"
              >
                <div className="w-full flex flex-col gap-0">
                  <label htmlFor="cash" className="text-lg font-medium">
                    Cash
                  </label>
                  <div className="relative rounded-md text-lg overflow-hidden border border-gray-600">
                    <span className="absolute left-0 bg-gray-200 h-full w-10 flex items-center justify-center">
                      Rp
                    </span>
                    <input
                      type="text"
                      pattern="[0-9]*"
                      id="cash"
                      name="cash"
                      className="w-full pl-12 rounded-md outline-none border-none"
                      value={nominal}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {totalKembalian >= 0 ? (
                  <p className="text-gray-500">
                    Kembalian :
                    <span className="text-gray-700 font-medium">
                      {` Rp ${totalKembalian.toLocaleString("id-ID")}`}
                    </span>
                  </p>
                ) : (
                  <p className="text-red-500">
                    Jumlah cash minimal sama dengan total harga
                  </p>
                )}

                <div className="w-full flex justify-end items-center pt-6 gap-4">
                  <button
                    type="button"
                    className="bg-rose-600 text-gray-100 py-2 px-6 rounded-lg text-lg"
                    onClick={() => setModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-primary text-gray-800 py-2 px-6 rounded-lg text-lg"
                  >
                    Submit
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
