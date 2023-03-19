import {
  getDate,
  getDaysInMonth,
  getWeekOfMonth,
  getWeeksInMonth,
  setDate,
  setMonth,
} from "date-fns";

export const MONTHS = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "Novermber",
  "Desember",
];

export const getWeekList = (date) => {
  const weeksOfMonts = getWeeksInMonth(date);
  return new Array(weeksOfMonts).fill(0).map((week, index) => index + 1);
};

export const getDayList = (date) => {
  const daysOfMonts = getDaysInMonth(date);
  return new Array(daysOfMonts).fill(0).map((week, index) => index + 1);
};

export const filterReport = (dataReport, period, month) => {
  const monthlyOrders = MONTHS.map((month) => {
    const monthly = dataReport.filter(
      (order) =>
        new Date(order.updatedAt).toLocaleString("id-ID", {
          month: "long",
        }) === month
    );
    const totalSales = monthly.reduce((acc, curr) => acc + curr.total_price, 0);
    return {
      period: month,
      orders: monthly,
      total_sales: totalSales,
    };
  });

  if (period === "monthly") {
    return monthlyOrders;
  }

  const selectedMonth = month;
  const selectedMonthIndex = MONTHS.findIndex(
    (month) => month === selectedMonth
  );
  const selectedMonthOrders = monthlyOrders.find(
    (monthly) => monthly.period === selectedMonth
  ).orders;

  const dateFilter = setMonth(setDate(new Date(), 1), selectedMonthIndex);

  const weeksOfMonts = getWeekList(dateFilter);

  const weeklyOrders = weeksOfMonts.map((week) => {
    const weekly = selectedMonthOrders.filter(
      (order) => getWeekOfMonth(new Date(order.updatedAt)) === week
    );
    const totalSales = weekly.reduce((acc, curr) => acc + curr.total_price, 0);

    return {
      period: `Minggu ke-${week} ${selectedMonth}`,
      orders: weekly,
      total_sales: totalSales,
    };
  });

  if (period === "weekly") {
    return weeklyOrders;
  }

  const daysOfMonts = getDayList(dateFilter);

  const dailyOrders = daysOfMonts.map((day) => {
    const daily = selectedMonthOrders.filter(
      (order) => getDate(new Date(order.updatedAt)) === day
    );
    const totalSales = daily.reduce((acc, curr) => acc + curr.total_price, 0);

    return {
      period: `${day} ${selectedMonth}`,
      orders: daily,
      total_sales: totalSales,
    };
  });

  if (period === "daily") {
    return dailyOrders;
  }

  return [];
};
