
import React, { useState } from "react";
import { 
  BarChart2, 
  FileBarChart, 
  FileSpreadsheet, 
  FileText, 
  Layers,
  Printer,
  Download
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import BlurredCard from "@/components/ui/BlurredCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DEMO_CHART_DATA } from "@/lib/constants";
import FinancialChart from "@/components/dashboard/FinancialChart";

const reportTypes = [
  {
    id: "income",
    name: "Income Statement",
    icon: <FileBarChart className="h-8 w-8" />,
    description: "Revenue, expenses, and profit breakdown",
  },
  {
    id: "balance",
    name: "Balance Sheet",
    icon: <FileSpreadsheet className="h-8 w-8" />,
    description: "Assets, liabilities, and equity summary",
  },
  {
    id: "cash",
    name: "Cash Flow",
    icon: <FileText className="h-8 w-8" />,
    description: "Cash inflows and outflows analysis",
  },
  {
    id: "taxes",
    name: "Tax Report",
    icon: <Layers className="h-8 w-8" />,
    description: "Tax obligations and payments",
  },
];

const Reports = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
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
                Financial Reports
              </h1>
              <p className="text-muted-foreground animate-fade-in" style={{ animationDelay: "100ms" }}>
                Generate and view comprehensive financial reports
              </p>
            </header>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
              {reportTypes.map((report, index) => (
                <BlurredCard 
                  key={report.id}
                  className="hover-scale" 
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex flex-col items-center gap-4 p-2">
                    <div className="p-3 rounded-full bg-primary/10 text-primary">
                      {report.icon}
                    </div>
                    <div className="text-center">
                      <h3 className="font-semibold text-lg">{report.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {report.description}
                      </p>
                    </div>
                    <Button className="w-full mt-2">Generate</Button>
                  </div>
                </BlurredCard>
              ))}
            </div>
            
            <Tabs defaultValue="overview" className="w-full mb-6">
              <TabsList className="mb-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="quarterly">Quarterly</TabsTrigger>
                <TabsTrigger value="annual">Annual</TabsTrigger>
                <TabsTrigger value="custom">Custom Range</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="animate-fade-in">
                <div className="grid grid-cols-1 gap-6">
                  <BlurredCard>
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-semibold flex items-center gap-2">
                        <BarChart2 className="h-5 w-5" />
                        Financial Overview
                      </h2>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Printer className="h-4 w-4 mr-2" />
                          Print
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Export
                        </Button>
                      </div>
                    </div>
                    
                    <FinancialChart data={DEMO_CHART_DATA} />
                  </BlurredCard>
                </div>
              </TabsContent>
              
              <TabsContent value="quarterly">
                <div className="flex items-center justify-center h-32 border rounded-lg">
                  <p className="text-muted-foreground">Quarterly reports view will be displayed here</p>
                </div>
              </TabsContent>
              
              <TabsContent value="annual">
                <div className="flex items-center justify-center h-32 border rounded-lg">
                  <p className="text-muted-foreground">Annual reports view will be displayed here</p>
                </div>
              </TabsContent>
              
              <TabsContent value="custom">
                <div className="flex items-center justify-center h-32 border rounded-lg">
                  <p className="text-muted-foreground">Custom date range selector will be displayed here</p>
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <BlurredCard className="animate-scale-in" style={{ animationDelay: "200ms" }}>
                <h3 className="text-lg font-semibold mb-4">Recent Reports</h3>
                
                <div className="space-y-4">
                  {[
                    { name: "Q2 2023 Financial Report", date: "Jul 15, 2023", type: "Quarterly" },
                    { name: "June 2023 Income Statement", date: "Jul 05, 2023", type: "Monthly" },
                    { name: "Mid-Year Tax Summary", date: "Jun 30, 2023", type: "Tax" },
                  ].map((report, index) => (
                    <div
                      key={index}
                      className="p-3 border rounded-lg flex justify-between items-center transition-all duration-200 hover:bg-muted/40"
                      style={{ 
                        animationDelay: `${index * 100 + 300}ms`,
                        opacity: 0,
                        animation: `fade-in 0.5s ease-out ${index * 100 + 300}ms forwards`
                      }}
                    >
                      <div>
                        <p className="font-medium">{report.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {report.date} • {report.type}
                        </p>
                      </div>
                      <Button variant="outline" size="sm">View</Button>
                    </div>
                  ))}
                </div>
              </BlurredCard>
              
              <BlurredCard className="animate-scale-in" style={{ animationDelay: "300ms" }}>
                <h3 className="text-lg font-semibold mb-4">Scheduled Reports</h3>
                
                <div className="space-y-4">
                  {[
                    { name: "Monthly Financial Summary", frequency: "Monthly", next: "Aug 01, 2023" },
                    { name: "Quarterly Performance Review", frequency: "Quarterly", next: "Oct 01, 2023" },
                    { name: "Weekly Cash Flow Analysis", frequency: "Weekly", next: "Jul 24, 2023" },
                  ].map((report, index) => (
                    <div
                      key={index}
                      className="p-3 border rounded-lg flex justify-between items-center transition-all duration-200 hover:bg-muted/40"
                      style={{ 
                        animationDelay: `${index * 100 + 400}ms`,
                        opacity: 0,
                        animation: `fade-in 0.5s ease-out ${index * 100 + 400}ms forwards`
                      }}
                    >
                      <div>
                        <p className="font-medium">{report.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {report.frequency} • Next: {report.next}
                        </p>
                      </div>
                      <Button variant="outline" size="sm">Edit</Button>
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

export default Reports;
