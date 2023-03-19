import Link from "next/link";
import { useState } from "react";
import { MdChevronRight, MdMoney, MdOutlineStore } from "react-icons/md";
import { useQuery } from "react-query";
import { useAuth } from "../contexts/AuthContext";
import { getReport } from "../lib/api";
import { filterReport } from "../lib/helper";
import LoadingSpinner from "./LoadingSpinner";
import ReportChart from "./ReportChart";

export default function ReportSection() {
  const { user } = useAuth();
  const {
    isLoading,
    isError,
    data: daftarReport,
  } = useQuery("allReport", () => getReport(user.token));

  const [period, setPeriod] = useState("monthly");
  const [month, setMonth] = useState(
    new Date().toLocaleString("id-ID", {
      month: "long",
    })
  );

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

  if (daftarReport) {
    const filteredReport = filterReport(daftarReport, "monthly");
    const totalAmount = filteredReport.reduce(
      (acc, curr) => acc + curr.total_sales,
      0
    );
    return (
      <div className="spce-y-2">
        <div className="space-y-4 px-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-secondary">
              Penjualan {new Date().getFullYear()}
            </h2>
            <Link legacyBehavior href="/admin/report">
              <a className="text-blue-500 hover:text-blue-400 flex items-center">
                Laporan
                <MdChevronRight className="text-xl" />
              </a>
            </Link>
          </div>
          <div className="flex items-center justify-between py-2 px-4 bg-secondary rounded-lg">
            <div>
              <MdOutlineStore className="text-white text-4xl" />
              <span className="text-yellow-100">Total Penjualan</span>
            </div>
            <span className="text-2xl text-white">{`Rp ${totalAmount.toLocaleString(
              "ID-id"
            )}`}</span>
          </div>
        </div>

        <ReportChart reports={filteredReport} />
      </div>
    );
  }
}
