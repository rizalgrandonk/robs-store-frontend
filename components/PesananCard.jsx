import Link from "next/link";
import { MdExpandMore } from "react-icons/md";

function PesananCard({ pesanan }) {
  return (
    <div className="py-3 px-4 flex items-center rounded-md bg-white gap-4 drop-shadow">
      <div className="flex-grow space-y-1">
        <p className="text-gray-900 text-xl font-medium">{`Meja ${pesanan.nomor_meja}`}</p>
        <p className="text-gray-500 text-lg leading-none">{pesanan.id}</p>
        {pesanan.completed ? (
          <p className="text-cyan-600 text-lg leading-none">Pesanan Selesai</p>
        ) : (
          <p className="text-rose-600 text-lg leading-none">Perlu Dikirim</p>
        )}
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
