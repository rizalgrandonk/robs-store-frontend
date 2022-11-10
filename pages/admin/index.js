import { useRouter } from "next/router";
import { useEffect } from "react";
import { MdContentPaste, MdMenuBook, MdQrCodeScanner } from "react-icons/md";
import HeroCarousel from "../../components/HeroCarousel";
import MenuCarousel from "../../components/MenuCarousel";
import { useAuth } from "../../contexts/AuthContext";

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

function Dashboard() {
  const { isAuthenticated, user } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !user) {
    return (
      <div className="h-screen flex justify-center items-center">
        <h2 className="text-2xl font-bold">Unauthorized</h2>
      </div>
    );
  }

  return (
    <main className="pb-16">
      <div className="px-4 bg-primary pt-[4.5rem]">
        <div className="rounded-t-3xl relative overflow-hidden">
          <HeroCarousel />
          <div className="w-full px-8 py-14 flex justify-between items-center bg-white absolute bottom-0 rounded-t-[2rem]">
            <div className="text-center text-gray-500">
              <div className="h-16 w-16 bg-primary flex justify-center items-center text-4xl rounded-lg">
                <MdQrCodeScanner />
              </div>
              <p>Scan QR</p>
            </div>
            <div className="text-center text-gray-500">
              <div className="h-16 w-16 bg-primary flex justify-center items-center text-4xl rounded-lg">
                <MdContentPaste />
              </div>
              <p>Pesanan</p>
            </div>
            <div className="text-center text-gray-500">
              <div className="h-16 w-16 bg-primary flex justify-center items-center text-4xl rounded-lg">
                <MdMenuBook />
              </div>
              <p>Menu</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4">
        <h2 className="text-xl font-bold text-secondary">Menu Terlaris</h2>
        <MenuCarousel />

        <h2 className="text-xl font-bold text-secondary">Riwayat Pesanan</h2>
        <div className="py-4 space-y-3">
          {riwayatPesanan.map((pesanan) => (
            <div
              key={pesanan.id}
              className="flex justify-between items-center bg-gray-100 px-7 py-4 rounded-xl"
            >
              <p className="text-gray-900 text-lg">{`Meja ${pesanan.nomor_meja}`}</p>
              {pesanan.completed ? (
                <span className="text-cyan-600 text-lg">Pesanan Selesai</span>
              ) : (
                <span className="text-rose-600 text-lg">Perlu Dikirin</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
