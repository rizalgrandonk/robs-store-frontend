import { useRouter } from "next/router";
import { useEffect } from "react";
import { GiCheckMark } from "react-icons/gi";
import QRCode from "react-qr-code";
import { useCart } from "../contexts/CartContext";

export default function Scan() {
  const { orderCode } = useCart();
  const router = useRouter();

  useEffect(() => {
    if (!orderCode) {
      router.push("/pesanan");
    }
  }, [orderCode, router]);

  console.log(orderCode);

  if (!orderCode) {
    return (
      <main className="pb-2 pt-20 px-2 bg-gray-50 h-screen space-y-3">
        <div className="flex justify-center items-center bg-white px-3 py-6 h-full">
          <p className="text-3xl font-medium">Belum ada pesanan</p>
        </div>
      </main>
    );
  }

  if (orderCode) {
    return (
      <main className="pb-2 pt-20 px-2 bg-gray-50 h-screen space-y-3">
        <div className="flex flex-col items-center gap-10 bg-white pt-16 h-full">
          <div className="w-20 h-20 flex justify-center items-center bg-primary rounded-full text-4xl text-white">
            <GiCheckMark />
          </div>
          <p className="italic">Pesanan anda berhasil dibuat</p>
          <div className="w-full px-10">
            <QRCode
              size={256}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              value={orderCode}
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
}
