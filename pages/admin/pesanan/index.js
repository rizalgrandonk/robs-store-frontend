import { MdExpandMore } from "react-icons/md";

const riwayatPesanan = [
  {
    id: "14001",
    nomor_meja: 1,
    completed: true,
  },
  {
    id: "14005",
    nomor_meja: 5,
    completed: false,
  },
  {
    id: "14007",
    nomor_meja: 7,
    completed: false,
  },
  {
    id: "14013",
    nomor_meja: 13,
    completed: true,
  },
];

function Pesanan() {
  return (
    <main className="pb-16 pt-20 px-1 bg-gray-50 min-h-screen">
      <div className="space-y-4">
        {riwayatPesanan.map((pesanan) => (
          <div
            key={pesanan.id}
            className="py-3 px-4 flex items-center rounded-md bg-white gap-4 drop-shadow"
          >
            <div className="flex-grow space-y-1">
              <p className="text-gray-900 text-xl font-medium">{`Meja ${pesanan.nomor_meja}`}</p>
              <p className="text-gray-500 text-lg leading-none">{pesanan.id}</p>
              {pesanan.completed ? (
                <p className="text-cyan-600 text-lg leading-none">
                  Pesanan Selesai
                </p>
              ) : (
                <p className="text-rose-600 text-lg leading-none">
                  Perlu Dikirim
                </p>
              )}
            </div>
            <span className="text-gray-900 text-3xl p-1.5">
              <MdExpandMore />
            </span>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Pesanan;
