
import React, { useState } from "react";
import { 
  BarChart2, 
  DollarSign, 
  CreditCard, 
  TrendingUp,
  PercentCircle, 
  MoreHorizontal,
  Menu as MenuIcon
} from "lucide-react";
import { 
  DEMO_STATS, 
  DEMO_TRANSACTIONS, 
  DEMO_CHART_DATA 
} from "@/lib/constants";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import StatCard from "@/components/dashboard/StatCard";
import RecentTransactions from "@/components/dashboard/RecentTransactions";
import FinancialChart from "@/components/dashboard/FinancialChart";
import BlurredCard from "@/components/ui/BlurredCard";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gradient-subtle overflow-hidden">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Navbar toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 overflow-y-auto px-4 md:px-6 pt-20 pb-6">
          <div className="max-w-7xl mx-auto">
            <header className="mb-6">
              <h1 className="text-2xl md:text-3xl font-bold mb-1 animate-fade-in">
                Financial Dashboard
              </h1>
              <p className="text-muted-foreground animate-fade-in" style={{ animationDelay: "100ms" }}>
                Overview of your company's financial performance
              </p>
            </header>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <StatCard
                title="Revenue"
                value={DEMO_STATS.revenue}
                icon={<DollarSign className="h-5 w-5" />}
                change={12.5}
                trend="up"
                gradientClass="bg-gradient-blue"
                style={{ animationDelay: "150ms" }}
              />
              <StatCard
                title="Expenses"
                value={DEMO_STATS.expenses}
                icon={<CreditCard className="h-5 w-5" />}
                change={7.2}
                trend="up"
                gradientClass="bg-gradient-orange"
                style={{ animationDelay: "200ms" }}
              />
              <StatCard
                title="Profit"
                value={DEMO_STATS.profit}
                icon={<TrendingUp className="h-5 w-5" />}
                change={9.3}
                trend="up"
                gradientClass="bg-gradient-green"
                style={{ animationDelay: "250ms" }}
              />
              <StatCard
                title="Growth Rate"
                value={`${DEMO_STATS.growthRate}%`}
                icon={<PercentCircle className="h-5 w-5" />}
                change={2.1}
                trend="up"
                gradientClass="bg-gradient-purple"
                style={{ animationDelay: "300ms" }}
              />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <FinancialChart 
                data={DEMO_CHART_DATA} 
                className="lg:col-span-2"
              />
              <RecentTransactions transactions={DEMO_TRANSACTIONS.slice(0, 4)} />
            </div>
            
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <BlurredCard hoverAnimation={true}>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Quick Actions</h2>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-5 w-5" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <Button className="flex-col h-24 bg-gradient-blue hover:bg-gradient-blue/90 shadow-subtle">
                    <BarChart2 className="h-6 w-6 mb-2" />
                    <span>Generate Report</span>
                  </Button>
                  <Button className="flex-col h-24 bg-gradient-green hover:bg-gradient-green/90 shadow-subtle">
                    <CreditCard className="h-6 w-6 mb-2" />
                    <span>New Transaction</span>
                  </Button>
                  <Button className="flex-col h-24 bg-gradient-orange hover:bg-gradient-orange/90 shadow-subtle">
                    <DollarSign className="h-6 w-6 mb-2" />
                    <span>Manage Budget</span>
                  </Button>
                  <Button className="flex-col h-24 bg-gradient-purple hover:bg-gradient-purple/90 shadow-subtle">
                    <MenuIcon className="h-6 w-6 mb-2" />
                    <span>More Options</span>
                  </Button>
                </div>
              </BlurredCard>
              
              <BlurredCard hoverAnimation={true}>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Upcoming Payments</h2>
                  <Button variant="outline" size="sm" className="text-xs">
                    View All
                  </Button>
                </div>
                
                <div className="space-y-3">
                  {[
                    { name: "Server Hosting", amount: 299.99, date: "Aug 25, 2023" },
                    { name: "Software Licenses", amount: 1299.50, date: "Aug 27, 2023" },
                    { name: "Office Rent", amount: 3500.00, date: "Sep 01, 2023" },
                  ].map((payment, index) => (
                    <div 
                      key={index} 
                      className="flex items-center justify-between p-3 rounded-lg border border-border"
                      style={{ 
                        animationDelay: `${index * 100}ms`,
                        opacity: 0,
                        animation: `fade-in 0.5s ease-out ${index * 100}ms forwards`
                      }}
                    >
                      <div>
                        <p className="font-medium">{payment.name}</p>
                        <p className="text-xs text-muted-foreground">Due {payment.date}</p>
                      </div>
                      <span className="font-semibold">
                        {new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "USD",
                        }).format(payment.amount)}
                      </span>
                    </div>
                  ))}
                </div>
              </BlurredCard>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
