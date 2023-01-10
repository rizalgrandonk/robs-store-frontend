import Link from "next/link";
import { MdExpandMore } from "react-icons/md";

function PesananCard({ pesanan }) {
  return (
    <div className="py-3 px-4 flex items-center rounded-md bg-white gap-4 drop-shadow">
      <div className="flex-grow space-y-2">
        <p className="text-gray-900 text-xl font-medium">{`Meja ${pesanan.table_number}`}</p>
        <p className="text-gray-500 text-lg leading-none">
          {pesanan.customer_name}
        </p>
        {pesanan.is_paid ? (
          <p className="text-cyan-600 text-lg leading-none">Sudah Dibayar</p>
        ) : (
          <p className="text-rose-600 text-lg leading-none">Belum Dibayar</p>
        )}
        <p className="text-gray-700 text-lg leading-none">
          {"Rp " + pesanan.total_price.toLocaleString("id-ID")}
        </p>
      </div>
      <Link legacyBehavior href={`/admin/pesanan/${pesanan.id}`}>
        <a className="text-gray-900 text-4xl p-1.5">
          <MdExpandMore />
        </a>
      </Link>
    </div>
  );
}

export default PesananCard;
