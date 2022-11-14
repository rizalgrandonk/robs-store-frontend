import Image from "next/image";
import { useRouter } from "next/router";

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

const riwayatPesanan = [
  {
    id: "14001",
    nomor_meja: 1,
    completed: true,
    daftar_menu: [
      { ...daftarMenu[0], jumlah: 1, notes: null },
      { ...daftarMenu[1], jumlah: 2, notes: null },
    ],
  },
  {
    id: "14005",
    nomor_meja: 5,
    completed: false,
    daftar_menu: [{ ...daftarMenu[1], jumlah: 2, notes: null }],
  },
  {
    id: "14007",
    nomor_meja: 7,
    completed: false,
    daftar_menu: [
      { ...daftarMenu[2], jumlah: 1, notes: null },
      { ...daftarMenu[3], jumlah: 1, notes: null },
    ],
  },
  {
    id: "14013",
    nomor_meja: 13,
    completed: true,
    daftar_menu: [
      { ...daftarMenu[0], jumlah: 1, notes: null },
      { ...daftarMenu[2], jumlah: 1, notes: null },
      { ...daftarMenu[3], jumlah: 1, notes: null },
    ],
  },
];

function DetailPesanan() {
  const { query } = useRouter();
  const pesanan = riwayatPesanan.find((pesanan) => pesanan.id === query.id);
  const total = pesanan?.daftar_menu.reduce(
    (prev, curr) => curr.jumlah * curr.price + prev,
    0
  );

  if (!pesanan) {
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
            Meja {pesanan?.nomor_meja}
          </h2>
          <p className="text-gray-600">Kode Pesanan {pesanan?.id}</p>
          <div className="py-6 space-y-2">
            {pesanan?.daftar_menu.map((menu, index) => (
              <div key={index} className="flex items-center gap-4">
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
                <div className="flex flex-col">
                  <p className="text-gray-900 text-lg font-medium">
                    {menu.name}
                  </p>
                  <span className="text-gray-500">
                    {"Rp " + menu.price.toLocaleString("id-ID")}
                  </span>
                  <span className="text-gray-500">Jumlah : {menu.jumlah}</span>
                  <span className="text-gray-500">
                    Notes : {menu.notes ? menu.notes : "-"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <div className="px-4 w-full fixed bottom-28 drop-shadow-lg">
        <div className="flex justify-between items-center w-full h-16 rounded-xl overflow-hidden">
          <div className="w-full h-full border-t-2 border-b-2 border-l-2 flex flex-col justify-center pl-6 bg-white rounded-l-xl">
            <p className="text-lg font-bold">Total :</p>
            <span className="text-gray-600">
              {"Rp " + total.toLocaleString("id-ID")}
            </span>
          </div>
          <button
            type="button"
            className="w-full h-full bg-secondary text-white text-lg font-medium"
          >
            Pesanan Selesai
          </button>
        </div>
      </div>
    </>
  );
}

export default DetailPesanan;
