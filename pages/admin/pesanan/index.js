import { useState } from "react";
import { useQuery } from "react-query";
import LoadingSpinner from "../../../components/LoadingSpinner";
import PesananCard from "../../../components/PesananCard";
import { useAuth } from "../../../contexts/AuthContext";
import { getAllPesanan } from "../../../lib/api";

function Pesanan() {
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
      <main className="pb-16 pt-20 px-1 bg-gray-50 min-h-screen">
        <div className="space-y-4">
          {daftarPesanan.map((pesanan) => (
            <PesananCard key={pesanan.id} pesanan={pesanan} />
          ))}
        </div>
      </main>
    );
  }
}

export default Pesanan;
