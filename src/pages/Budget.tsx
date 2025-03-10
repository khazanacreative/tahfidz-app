
import React, { useState } from "react";
import { 
  PieChart, 
  DollarSign, 
  TrendingUp, 
  PlusCircle,
  Edit,
  Trash2
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import BlurredCard from "@/components/ui/BlurredCard";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { cn, formatCurrency } from "@/lib/utils";

// Budget data for demonstration
const budgetCategories = [
  { name: "Operations", allocated: 45000, spent: 32150, color: "#3b82f6" },
  { name: "Marketing", allocated: 20000, spent: 15600, color: "#10b981" },
  { name: "Development", allocated: 30000, spent: 25900, color: "#f59e0b" },
  { name: "Administration", allocated: 15000, spent: 10200, color: "#8b5cf6" },
  { name: "Facilities", allocated: 25000, spent: 18300, color: "#ec4899" },
];

const Budget = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  // Calculate total budget
  const totalAllocated = budgetCategories.reduce((sum, cat) => sum + cat.allocated, 0);
  const totalSpent = budgetCategories.reduce((sum, cat) => sum + cat.spent, 0);
  const budgetProgress = (totalSpent / totalAllocated) * 100;
  
  // Format data for pie chart
  const pieData = budgetCategories.map(cat => ({
    name: cat.name,
    value: cat.allocated,
    color: cat.color
  }));

  return (
    <div className="flex h-screen bg-gradient-subtle overflow-hidden">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Navbar toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 overflow-y-auto px-4 md:px-6 pt-20 pb-6">
          <div className="max-w-7xl mx-auto">
            <header className="mb-6">
              <h1 className="text-2xl md:text-3xl font-bold mb-1 animate-fade-in">
                Budget Management
              </h1>
              <p className="text-muted-foreground animate-fade-in" style={{ animationDelay: "100ms" }}>
                Track and manage your financial allocations
              </p>
            </header>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <BlurredCard className="animate-scale-in">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-primary/10 text-primary">
                    <DollarSign className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Total Budget</h3>
                    <p className="text-2xl font-semibold mt-1">
                      {formatCurrency(totalAllocated)}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Fiscal Year 2023
                    </p>
                  </div>
                </div>
              </BlurredCard>
              
              <BlurredCard className="animate-scale-in" style={{ animationDelay: "100ms" }}>
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-green-100 text-green-600">
                    <TrendingUp className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Budget Used</h3>
                    <p className="text-2xl font-semibold mt-1">
                      {formatCurrency(totalSpent)}
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      <Progress value={budgetProgress} className="h-2 w-24" />
                      <span className="text-xs font-medium">
                        {budgetProgress.toFixed(0)}%
                      </span>
                    </div>
                  </div>
                </div>
              </BlurredCard>
              
              <BlurredCard className="animate-scale-in" style={{ animationDelay: "200ms" }}>
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                    <PieChart className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Remaining</h3>
                    <p className="text-2xl font-semibold mt-1">
                      {formatCurrency(totalAllocated - totalSpent)}
                    </p>
                    <p className="text-xs text-green-600 font-medium mt-1">
                      {(100 - budgetProgress).toFixed(0)}% Available
                    </p>
                  </div>
                </div>
              </BlurredCard>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <BlurredCard className="lg:col-span-2 animate-scale-in" style={{ animationDelay: "300ms" }}>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Budget Allocation</h2>
                  <Button>
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add Category
                  </Button>
                </div>
                
                <div className="space-y-6">
                  {budgetCategories.map((category, index) => {
                    const percentSpent = (category.spent / category.allocated) * 100;
                    
                    return (
                      <div 
                        key={index}
                        className="animate-fade-in"
                        style={{ animationDelay: `${index * 100 + 400}ms` }}
                      >
                        <div className="flex justify-between items-center mb-1">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }} />
                            <span className="font-medium">{category.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center text-sm mb-1.5">
                          <span className="text-muted-foreground">
                            {formatCurrency(category.spent)} of {formatCurrency(category.allocated)}
                          </span>
                          <span className={cn(
                            "font-medium",
                            percentSpent > 90 ? "text-red-500" :
                            percentSpent > 75 ? "text-amber-500" : "text-green-600"
                          )}>
                            {percentSpent.toFixed(0)}%
                          </span>
                        </div>
                        
                        <Progress 
                          value={percentSpent} 
                          className={cn(
                            "h-2",
                            percentSpent > 90 ? "bg-red-100" :
                            percentSpent > 75 ? "bg-amber-100" : "bg-green-100"
                          )}
                          indicatorClassName={
                            percentSpent > 90 ? "bg-red-500" :
                            percentSpent > 75 ? "bg-amber-500" : "bg-green-600"
                          }
                        />
                      </div>
                    );
                  })}
                </div>
              </BlurredCard>
              
              <BlurredCard className="animate-scale-in" style={{ animationDelay: "400ms" }}>
                <h2 className="text-xl font-semibold mb-4">Budget Distribution</h2>
                
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={entry.color} 
                            stroke="none"
                          />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value) => formatCurrency(value as number)}
                      />
                      <Legend />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </BlurredCard>
            </div>
            
            <BlurredCard className="animate-scale-in" style={{ animationDelay: "500ms" }}>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Budget Adjustments</h2>
                <Button variant="outline">View History</Button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Date</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Category</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Type</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Amount</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Approved By</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { date: "Jul 18, 2023", category: "Marketing", type: "Increase", amount: 5000, approver: "John Smith" },
                      { date: "Jul 10, 2023", category: "Operations", type: "Decrease", amount: 2000, approver: "Sarah Johnson" },
                      { date: "Jul 05, 2023", category: "Development", type: "Increase", amount: 8000, approver: "Michael Brown" },
                    ].map((adjustment, index) => (
                      <tr 
                        key={index} 
                        className="border-b border-border"
                        style={{ 
                          animationDelay: `${index * 100 + 600}ms`,
                          opacity: 0,
                          animation: `fade-in 0.5s ease-out ${index * 100 + 600}ms forwards`
                        }}
                      >
                        <td className="px-4 py-3 text-sm">{adjustment.date}</td>
                        <td className="px-4 py-3 text-sm font-medium">{adjustment.category}</td>
                        <td className="px-4 py-3 text-sm">
                          <span className={cn(
                            "px-2 py-1 rounded-full text-xs",
                            adjustment.type === "Increase" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                          )}>
                            {adjustment.type}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm font-medium">
                          {formatCurrency(adjustment.amount)}
                        </td>
                        <td className="px-4 py-3 text-sm">{adjustment.approver}</td>
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

export default Budget;
