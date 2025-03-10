
import React, { useState } from "react";
import { 
  ArrowDownUp, 
  DownloadCloud, 
  Filter, 
  Plus, 
  Search
} from "lucide-react";
import { DEMO_TRANSACTIONS } from "@/lib/constants";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import BlurredCard from "@/components/ui/BlurredCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const Transactions = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  // Sort and filter transactions
  const filteredTransactions = [...DEMO_TRANSACTIONS]
    .filter(transaction => 
      transaction.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a.date.getTime() - b.date.getTime();
      } else {
        return b.date.getTime() - a.date.getTime();
      }
    });
    
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
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
                Transactions
              </h1>
              <p className="text-muted-foreground animate-fade-in" style={{ animationDelay: "100ms" }}>
                Manage and review all financial transactions
              </p>
            </header>
            
            <BlurredCard className="w-full mb-6 animate-scale-in">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="relative w-full md:w-80">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search transactions..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={toggleSortOrder}>
                    <ArrowDownUp className="h-4 w-4 mr-2" />
                    {sortOrder === "desc" ? "Newest First" : "Oldest First"}
                  </Button>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    <DownloadCloud className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    New Transaction
                  </Button>
                </div>
              </div>
            </BlurredCard>
            
            <BlurredCard className="w-full animate-scale-in" style={{ animationDelay: "100ms" }}>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Date</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Description</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Category</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Amount</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTransactions.map((transaction, index) => (
                      <tr 
                        key={transaction.id} 
                        className="border-b border-border hover:bg-muted/30 transition-colors"
                        style={{ 
                          animationDelay: `${index * 50}ms`,
                          opacity: 0,
                          animation: `fade-in 0.5s ease-out ${index * 50}ms forwards`
                        }}
                      >
                        <td className="px-4 py-3 text-sm">
                          {format(transaction.date, "MMM d, yyyy")}
                        </td>
                        <td className="px-4 py-3 text-sm font-medium">
                          {transaction.description}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          {transaction.category}
                        </td>
                        <td className={cn(
                          "px-4 py-3 text-sm font-medium",
                          transaction.amount > 0 ? "text-green-600" : "text-red-600"
                        )}>
                          {transaction.amount > 0 ? "+" : ""}
                          {new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                          }).format(transaction.amount)}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <span className={cn(
                            "px-2 py-1 rounded-full text-xs",
                            transaction.status === "completed" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"
                          )}>
                            {transaction.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </BlurredCard>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Transactions;
