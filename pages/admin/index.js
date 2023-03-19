import Link from "next/link";
import {
  MdChevronRight,
  MdContentPaste,
  MdMenuBook,
  MdOutlineSummarize,
  MdQrCodeScanner,
} from "react-icons/md";
import { useQuery } from "react-query";
import HeroCarousel from "../../components/HeroCarousel";
import LoadingSpinner from "../../components/LoadingSpinner";
import MenuCarousel from "../../components/MenuCarousel";
import ReportSection from "../../components/ReportSection";
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
              <Link legacyBehavior href="/admin/report">
                <a className="h-16 w-16 bg-primary flex justify-center items-center text-4xl rounded-lg">
                  <MdOutlineSummarize />
                </a>
              </Link>
              <p>Laporan</p>
            </div>
          </div>
        </div>
      </div>

      <div className="py-12 space-y-12">
        {/* <h2 className="text-xl font-bold text-secondary">Menu Terlaris</h2>
        <MenuCarousel /> */}

        <ReportSection />

        <PesananSection />
      </div>
    </main>
  );
}

function PesananSection() {
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
      <div className="px-4 spce-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-secondary">Riwayat Pesanan</h2>
          <Link legacyBehavior href="/admin/pesanan">
            <a className="text-blue-500 hover:text-blue-400 flex items-center">
              Semua Pesanan
              <MdChevronRight className="text-xl" />
            </a>
          </Link>
        </div>
        <div className="py-4 space-y-3">
          {daftarPesanan.slice(0, 5).map((pesanan) => (
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
      </div>
    );
  }
}

export default Dashboard;
