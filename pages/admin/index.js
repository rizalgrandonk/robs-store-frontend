import { MdContentPaste, MdMenuBook, MdQrCodeScanner } from "react-icons/md";
import HeroCarousel from "../../components/HeroCarousel";
import Layout from "../../components/Layout";
import MenuCarousel from "../../components/MenuCarousel";

function Dashboard() {
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
          <div className="flex justify-between items-center bg-gray-100 px-7 py-4 rounded-xl">
            <p className="text-gray-900 text-lg">Table 1</p>
            <span className="text-cyan-600 text-lg">Pesanan Selesai</span>
          </div>
          <div className="flex justify-between items-center bg-gray-100 px-7 py-4 rounded-xl">
            <p className="text-gray-900 text-lg">Table 2</p>
            <span className="text-rose-600 text-lg">Perlu Dikirin</span>
          </div>
          <div className="flex justify-between items-center bg-gray-100 px-7 py-4 rounded-xl">
            <p className="text-gray-900 text-lg">Table 3</p>
            <span className="text-cyan-600 text-lg">Pesanan Selesai</span>
          </div>
        </div>
      </div>
    </main>
  );
}

Dashboard.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Dashboard;
