import { MdExpandMore } from "react-icons/md";
import Layout from "../../../components/Layout";

function Pesanan() {
  return (
    <Layout>
      <main className="pb-16 pt-20 px-1 bg-gray-50 min-h-screen">
        <div className="space-y-4">
          <div className="py-3 px-4 flex items-center rounded-md bg-white gap-4 drop-shadow">
            <div className="flex-grow space-y-1">
              <p className="text-gray-900 text-xl font-medium">Meja 1</p>
              <p className="text-gray-500 text-lg leading-none">14006</p>
              <p className="text-cyan-600 text-lg leading-none">
                Pesanan Selesai
              </p>
            </div>
            <span className="text-gray-900 text-3xl p-1.5">
              <MdExpandMore />
            </span>
          </div>
          <div className="py-3 px-4 flex items-center rounded-md bg-white gap-4 drop-shadow">
            <div className="flex-grow space-y-1">
              <p className="text-gray-900 text-xl font-medium">Meja 2</p>
              <p className="text-gray-500 text-lg leading-none">14013</p>
              <p className="text-rose-600 text-lg leading-none">
                Perlu Dikirim
              </p>
            </div>
            <span className="text-gray-900 text-3xl p-1.5">
              <MdExpandMore />
            </span>
          </div>
          <div className="py-3 px-4 flex items-center rounded-md bg-white gap-4 drop-shadow">
            <div className="flex-grow space-y-1">
              <p className="text-gray-900 text-xl font-medium">Meja 3</p>
              <p className="text-gray-500 text-lg leading-none">14025</p>
              <p className="text-cyan-600 text-lg leading-none">
                Pesanan Selesai
              </p>
            </div>
            <span className="text-gray-900 text-3xl p-1.5">
              <MdExpandMore />
            </span>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export default Pesanan;
