import Image from "next/image";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { QrReader } from "react-qr-reader";

export default function Scan() {
  const [pesanan, setPesanan] = useState(null);
  const router = useRouter();
  const qr = useRef();

  // !! ERROR try react-qr-barcode-scanner
  return (
    <main className="pb-16 pt-16 px-1 bg-gray-50 h-screen">
      <div className="px-1 pt-12">
        {!pesanan ? (
          <QrReader
            onResult={(result, error) => {
              if (result) {
                console.log(result?.text);
                setPesanan(JSON.parse(result?.text));
                // router.push("/admin/pesanan");
              }

              if (error) {
                console.log(error);
              }
            }}
            style={{ width: "100%" }}
            constraints={{ facingMode: "environment" }}
          />
        ) : (
          pesanan.map((item) => <div key={item.id}>{item.name}</div>)
        )}
      </div>
    </main>
  );
}
