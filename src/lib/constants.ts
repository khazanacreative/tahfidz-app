
export const APP_NAME = "FinFlow";

export type BusinessType = "mining" | "tobacco" | "shipping" | "education" | "other";

export interface MenuItem {
  name: string;
  path: string;
  icon: string;
}

export const MENU_ITEMS: MenuItem[] = [
  { name: "Dashboard", path: "/", icon: "layout-dashboard" },
  { name: "Transactions", path: "/transactions", icon: "receipt" },
  { name: "Reports", path: "/reports", icon: "bar-chart-2" },
  { name: "Budget", path: "/budget", icon: "wallet" },
  { name: "Settings", path: "/settings", icon: "settings" }
];

export const DEMO_TRANSACTIONS = [
  { id: 1, date: new Date(2023, 7, 15), description: "Office Supplies", amount: -458.75, category: "Expenses", status: "completed" },
  { id: 2, date: new Date(2023, 7, 14), description: "Client Payment - ABC Corp", amount: 12500.00, category: "Income", status: "completed" },
  { id: 3, date: new Date(2023, 7, 13), description: "Server Hosting", amount: -299.99, category: "Expenses", status: "completed" },
  { id: 4, date: new Date(2023, 7, 12), description: "Consultant Fee", amount: -1750.00, category: "Expenses", status: "pending" },
  { id: 5, date: new Date(2023, 7, 11), description: "Product Sales", amount: 4350.25, category: "Income", status: "completed" },
];

export const DEMO_STATS = {
  revenue: 145328.45,
  expenses: 87492.33,
  profit: 57836.12,
  growthRate: 12.8
};

export const DEMO_CHART_DATA = [
  { month: "Jan", revenue: 28500, expenses: 18200 },
  { month: "Feb", revenue: 32400, expenses: 19800 },
  { month: "Mar", revenue: 37800, expenses: 22400 },
  { month: "Apr", revenue: 42100, expenses: 24900 },
  { month: "May", revenue: 46500, expenses: 26300 },
  { month: "Jun", revenue: 51200, expenses: 29000 },
  { month: "Jul", revenue: 57300, expenses: 31800 },
];
