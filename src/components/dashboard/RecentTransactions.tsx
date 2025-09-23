"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ArrowUpRight,
  ArrowDownLeft,
  CreditCard,
  Wallet,
  DollarSign,
  MoreHorizontal
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Sample transaction data
const recentTransactions = [
  {
    id: "TXN-001",
    type: "credit",
    amount: 2500.00,
    description: "Shipment Payment - Order #12345",
    date: "2024-01-15",
    time: "14:30",
    status: "completed",
    method: "bank_transfer"
  },
  {
    id: "TXN-002",
    type: "debit",
    amount: -125.50,
    description: "Fuel Surcharge - Route CA-001",
    date: "2024-01-15",
    time: "12:15",
    status: "completed",
    method: "wallet"
  },
  {
    id: "TXN-003",
    type: "credit",
    amount: 1800.00,
    description: "Advance Payment - Order #12346",
    date: "2024-01-14",
    time: "16:45",
    status: "pending",
    method: "credit_card"
  },
  {
    id: "TXN-004",
    type: "debit",
    amount: -89.99,
    description: "Maintenance Fee - Vehicle #TRK-789",
    date: "2024-01-14",
    time: "09:20",
    status: "completed",
    method: "bank_transfer"
  },
  {
    id: "TXN-005",
    type: "credit",
    amount: 3200.00,
    description: "Weekly Settlement",
    date: "2024-01-13",
    time: "18:00",
    status: "completed",
    method: "bank_transfer"
  },
  {
    id: "TXN-006",
    type: "debit",
    amount: -45.00,
    description: "Insurance Premium",
    date: "2024-01-13",
    time: "11:30",
    status: "completed",
    method: "wallet"
  }
];

const getTransactionIcon = (type: string, method: string) => {
  if (type === "credit") {
    return <ArrowDownLeft className="h-4 w-4 text-success" />;
  } else {
    return <ArrowUpRight className="h-4 w-4 text-destructive" />;
  }
};

const getMethodIcon = (method: string) => {
  switch (method) {
    case "credit_card":
      return <CreditCard className="h-3 w-3" />;
    case "wallet":
      return <Wallet className="h-3 w-3" />;
    case "bank_transfer":
      return <DollarSign className="h-3 w-3" />;
    default:
      return <DollarSign className="h-3 w-3" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-success/20 text-success hover:bg-success/30";
    case "pending":
      return "bg-yellow-500/20 text-yellow-600 hover:bg-yellow-500/30";
    case "failed":
      return "bg-destructive/20 text-destructive hover:bg-destructive/30";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const formatAmount = (amount: number) => {
  const formatted = Math.abs(amount).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD'
  });
  return amount > 0 ? `+${formatted}` : formatted;
};

export default function RecentTransactions() {
  return (
    <Card className="panel blur-bg text-foreground min-h-max border-border h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              Recent Transactions
            </h3>
            <p className="text-sm text-muted-foreground">
              Your latest financial activity
            </p>
          </div>
          <Button variant="outline" size="sm" className="border-border ml-2">
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[400px] px-6">
          <div className="space-y-3 pb-4">
            {recentTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-3 rounded-lg border border-border/50 bg-background/30 hover:bg-background/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-muted/50">
                    {getTransactionIcon(transaction.type, transaction.method)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-medium text-foreground truncate">
                        {transaction.description}
                      </p>
                      <Badge
                        variant="secondary"
                        className={`text-xs ${getStatusColor(transaction.status)}`}
                      >
                        {transaction.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{transaction.date}</span>
                      <span>•</span>
                      <span>{transaction.time}</span>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        {getMethodIcon(transaction.method)}
                        <span className="capitalize">{transaction.method.replace('_', ' ')}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className={`text-sm font-semibold ${
                      transaction.type === 'credit' ? 'text-success' : 'text-destructive'
                    }`}>
                      {formatAmount(transaction.amount)}
                    </p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="hover:bg-accent/20 h-8 w-8 p-0"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="bg-background border-border"
                    >
                      <DropdownMenuItem className="hover:bg-accent/20">
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem className="hover:bg-accent/20">
                        Download Receipt
                      </DropdownMenuItem>
                      <DropdownMenuItem className="hover:bg-accent/20">
                        Dispute Transaction
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
