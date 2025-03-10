
import React from "react";
import { format } from "date-fns";
import { ArrowDownLeft, ArrowUpRight, AlertCircle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import BlurredCard from "@/components/ui/BlurredCard";
import { Button } from "@/components/ui/button";

interface Transaction {
  id: number;
  date: Date;
  description: string;
  amount: number;
  category: string;
  status: string;
}

interface RecentTransactionsProps {
  transactions: Transaction[];
  className?: string;
}

const RecentTransactions = ({ transactions, className }: RecentTransactionsProps) => {
  return (
    <BlurredCard className={cn("w-full", className)}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Recent Transactions</h2>
        <Button variant="outline" size="sm" className="text-xs">
          View All
        </Button>
      </div>
      
      <div className="space-y-4">
        {transactions.map((transaction, index) => (
          <div 
            key={transaction.id}
            className={cn(
              "p-3 rounded-lg flex items-center justify-between transition-all duration-200 hover:bg-muted/40",
              index < transactions.length - 1 && "border-b border-border pb-4"
            )}
            style={{ 
              animationDelay: `${index * 100}ms`,
              opacity: 0,
              animation: `fade-in 0.5s ease-out ${index * 100}ms forwards`
            }}
          >
            <div className="flex items-center gap-3">
              <div className={cn(
                "rounded-full p-2",
                transaction.amount > 0 ? "bg-green-100" : "bg-red-100"
              )}>
                {transaction.amount > 0 ? (
                  <ArrowUpRight className="h-5 w-5 text-green-600" />
                ) : (
                  <ArrowDownLeft className="h-5 w-5 text-red-600" />
                )}
              </div>
              
              <div>
                <p className="font-medium text-sm">{transaction.description}</p>
                <p className="text-xs text-muted-foreground">
                  {format(transaction.date, "d MMM yyyy")} • {transaction.category}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <span className={cn(
                "font-semibold",
                transaction.amount > 0 ? "text-green-600" : "text-red-600"
              )}>
                {transaction.amount > 0 ? "+" : ""}
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(Math.abs(transaction.amount))}
              </span>
              
              {transaction.status === "pending" ? (
                <AlertCircle className="h-4 w-4 text-amber-500" />
              ) : (
                <CheckCircle2 className="h-4 w-4 text-green-500" />
              )}
            </div>
          </div>
        ))}
      </div>
    </BlurredCard>
  );
};

export default RecentTransactions;
