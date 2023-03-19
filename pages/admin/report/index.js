import { useState } from "react";
import { useQuery } from "react-query";
import LoadingSpinner from "../../../components/LoadingSpinner";
import SelectInput from "../../../components/SelectInput";
import { useAuth } from "../../../contexts/AuthContext";
import { getReport } from "../../../lib/api";
import { MONTHS, filterReport } from "../../../lib/helper";

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
    return (
      <div className="min-h-screen grid place-items-center">
        <LoadingSpinner />
      </div>
    );
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
    const filteredReport = filterReport(daftarReport, period, month);
    const totalAmount = filteredReport.reduce(
      (acc, curr) => acc + curr.total_sales,
      0
    );
    return (
      <main className="pb-16 pt-20 px-1 bg-gray-50 min-h-screen">
        <div className="space-y-4">
          <div className="px-2 flex items-start gap-6">
            <div className="flex flex-col items-start gap-1">
              <label htmlFor="period" className="text-sm">
                Jangka Waktu
              </label>
              <SelectInput
                options={["monthly", "weekly", "daily"]}
                onChange={setPeriod}
                value={period}
                placeholder="Jangka Waktu"
              />
            </div>

            {period !== "monthly" ? (
              <div className="flex flex-col items-start gap-1">
                <label htmlFor="month" className="text-sm">
                  Bulan
                </label>
                <SelectInput
                  options={MONTHS}
                  onChange={setMonth}
                  value={month}
                  placeholder="Bulan"
                />
              </div>
            ) : (
              ""
            )}
          </div>

          <div className="px-2 divide-y divide-gray-300 max-h-[32rem] overflow-y-auto">
            {filteredReport.map((report) => (
              <div
                key={report.period}
                className="flex justify-between items-center px-2 py-2"
              >
                <p className="text-gray-900">{report.period}</p>
                <div className="space-y-1 text-right">
                  <p className="font-semibold text-sm">Total Penjualan</p>
                  <p className="text-cyan-600 leading-none">
                    {`Rp ${report.total_sales.toLocaleString("ID-id")}`}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {period !== "monthly" ? (
            <div className="flex items-center justify-between py-2 px-4">
              <span className="font-semibold">{`Total Bulan ${month}`}</span>
              <span className="font-semibold text-lg text-emerald-500">{`Rp ${totalAmount.toLocaleString(
                "ID-id"
              )}`}</span>
            </div>
          ) : (
            <div className="flex items-center justify-between py-2 px-4">
              <span className="font-semibold">{`Total Tahun ${new Date().getFullYear()}`}</span>
              <span className="font-semibold text-lg text-emerald-500">{`Rp ${totalAmount.toLocaleString(
                "ID-id"
              )}`}</span>
            </div>
          )}
        </div>
      </main>
    );
  }
}
