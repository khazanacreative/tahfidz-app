
export const APP_NAME = "FinFlow";

export type BusinessType = "mining" | "tobacco" | "shipping" | "education" | "other";

export interface MenuItem {
  name: string;
  path: string;
  icon: string;
}

export const MENU_ITEMS: MenuItem[] = [
  { name: "Dashboard", path: "/", icon: "LayoutDashboard" },
  { name: "Transaksi", path: "/transactions", icon: "Receipt" },
  { name: "Laporan", path: "/reports", icon: "FileBarChart" },
  { name: "Anggaran", path: "/budget", icon: "Wallet" },
  { name: "Pengaturan", path: "/settings", icon: "Settings" }
];

export const DEMO_TRANSACTIONS = [
  { id: 1, date: new Date(2023, 7, 15), description: "Alat Tulis Kantor", amount: -4587500, category: "Pengeluaran", status: "completed" },
  { id: 2, date: new Date(2023, 7, 14), description: "Pembayaran Klien - PT ABC", amount: 125000000, category: "Pendapatan", status: "completed" },
  { id: 3, date: new Date(2023, 7, 13), description: "Sewa Server", amount: -2999900, category: "Pengeluaran", status: "completed" },
  { id: 4, date: new Date(2023, 7, 12), description: "Biaya Konsultan", amount: -17500000, category: "Pengeluaran", status: "pending" },
  { id: 5, date: new Date(2023, 7, 11), description: "Penjualan Produk", amount: 43502500, category: "Pendapatan", status: "completed" },
];

export const DEMO_STATS = {
  revenue: 1453284500,
  expenses: 874923300,
  profit: 578361200,
  growthRate: 12.8
};

export const DEMO_CHART_DATA = [
  { month: "Jan", revenue: 285000000, expenses: 182000000 },
  { month: "Feb", revenue: 324000000, expenses: 198000000 },
  { month: "Mar", revenue: 378000000, expenses: 224000000 },
  { month: "Apr", revenue: 421000000, expenses: 249000000 },
  { month: "May", revenue: 465000000, expenses: 263000000 },
  { month: "Jun", revenue: 512000000, expenses: 290000000 },
  { month: "Jul", revenue: 573000000, expenses: 318000000 },
];
