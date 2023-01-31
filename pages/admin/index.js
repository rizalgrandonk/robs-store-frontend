import Link from "next/link";
import { MdContentPaste, MdMenuBook, MdQrCodeScanner } from "react-icons/md";
import { useQuery } from "react-query";
import HeroCarousel from "../../components/HeroCarousel";
import LoadingSpinner from "../../components/LoadingSpinner";
import MenuCarousel from "../../components/MenuCarousel";
import { useAuth } from "../../contexts/AuthContext";
import { getAllPesanan } from "../../lib/api";

function Dashboard() {
  return (
    <main className="pb-20">
      <div className="px-4 bg-primary pt-[4.5rem]">
        <div className="rounded-t-3xl relative overflow-hidden">
          <HeroCarousel />
          <div className="w-full px-8 py-14 flex justify-between items-center bg-white absolute bottom-0 rounded-t-[2rem]">
            <div className="text-center text-gray-500">
              <Link legacyBehavior href="/admin/scan">
                <a className="h-16 w-16 bg-primary flex justify-center items-center text-4xl rounded-lg">
                  <MdQrCodeScanner />
                </a>
              </Link>
              <p>Scan QR</p>
            </div>
            <div className="text-center text-gray-500">
              <Link legacyBehavior href="/admin/pesanan">
                <a className="h-16 w-16 bg-primary flex justify-center items-center text-4xl rounded-lg">
                  <MdContentPaste />
                </a>
              </Link>
              <p>Pesanan</p>
            </div>
            <div className="text-center text-gray-500">
              <Link legacyBehavior href="/admin/menu">
                <a className="h-16 w-16 bg-primary flex justify-center items-center text-4xl rounded-lg">
                  <MdMenuBook />
                </a>
              </Link>
              <p>Menu</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4">
        <h2 className="text-xl font-bold text-secondary">Menu Terlaris</h2>
        <MenuCarousel />

        <PesananSectio />
      </div>
    </main>
  );
}

function PesananSectio() {
  const { user } = useAuth();
  const {
    isLoading,
    isError,
    data: daftarPesanan,
  } = useQuery("allPesanan", () => getAllPesanan(user.token));

  if (isLoading) {
    return <LoadingSpinner />;
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

  if (daftarPesanan) {
    return (
      <>
        <h2 className="text-xl font-bold text-secondary">Riwayat Pesanan</h2>
        <div className="py-4 space-y-3">
          {daftarPesanan.map((pesanan) => (
            <div
              key={pesanan.id}
              className="flex justify-between items-center bg-gray-100 px-7 py-4 rounded-xl"
            >
              <p className="text-gray-900 text-lg">{`Meja ${pesanan.table_number}`}</p>
              {pesanan.is_paid ? (
                <p className="text-cyan-600 text-lg leading-none">
                  Sudah Dibayar
                </p>
              ) : (
                <p className="text-rose-600 text-lg leading-none">
                  Belum Dibayar
                </p>
              )}
            </div>
          ))}
        </div>
      </>
    );
  }
}

export default Dashboard;
