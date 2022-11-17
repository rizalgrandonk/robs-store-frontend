import { GiCheckMark } from "react-icons/gi";
import QRCode from "react-qr-code";
import { useCart } from "../contexts/CartContext";

export default function Scan() {
  const { items, isEmpty, cartTotal, namaCustomer, meja } = useCart();

  if (isEmpty) {
    return (
      <main className="pb-2 pt-20 px-2 bg-gray-50 h-screen space-y-3">
        <div className="flex justify-center items-center bg-white px-3 py-6 h-full">
          <p className="text-3xl font-medium">Tidak ada pesanan</p>
        </div>
      </main>
    );
  }

  if (namaCustomer === "" || meja === "") {
    return (
      <main className="pb-2 pt-20 px-2 bg-gray-50 h-screen space-y-3">
        <div className="flex justify-center items-center bg-white px-3 py-6 h-full">
          <p className="text-3xl font-medium">Data diri tidak lengkap</p>
        </div>
      </main>
    );
  }

  return (
    <main className="pb-2 pt-20 px-2 bg-gray-50 h-screen space-y-3">
      <div className="flex flex-col items-center gap-10 bg-white pt-20 h-full">
        <div className="w-24 h-24 flex justify-center items-center bg-primary rounded-full text-5xl text-white">
          <GiCheckMark />
        </div>
        <p className="italic">Pesanan anda berhasil dibuat</p>
        <div className="w-full px-10">
          <QRCode
            size={256}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value={JSON.stringify(items)}
            viewBox={`0 0 256 256`}
          />
        </div>
        <p className="italic">
          Silahkan menunjukkan Kode QR tersebut ke kasir.
        </p>
      </div>
    </main>
  );
}
