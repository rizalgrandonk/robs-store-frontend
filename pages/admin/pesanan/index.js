import PesananCard from "../../../components/PesananCard";

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
          <PesananCard key={pesanan.id} pesanan={pesanan} />
        ))}
      </div>
    </main>
  );
}

export default Pesanan;
