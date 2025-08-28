import { DollarSign, ShoppingCart, Users } from "lucide-react"
import { Card, CardContent } from "../ui/card"
import { cn } from "@/lib/utils"

interface MetricsCardsProps {
  revenue: number
  revenueChange: number
  orders: number
  ordersChange: number
  customers: number
  customersChange: number
}

export function MetricsCards({
  revenue,
  revenueChange,
  orders,
  ordersChange,
  customers,
  customersChange,
}: MetricsCardsProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const formatChange = (change: number) => {
    const sign = change >= 0 ? "+" : ""
    return `${sign}${change.toFixed(1)}%`
  }

  const metrics = [
    {
      title: "Revenue",
      value: formatCurrency(revenue),
      change: revenueChange,
      icon: DollarSign,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      title: "Orders",
      value: orders.toString(),
      change: ordersChange,
      icon: ShoppingCart,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Customers",
      value: customers.toString(),
      change: customersChange,
      icon: Users,
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {metrics.map((metric, index) => (
        <Card key={index} className="p-6">
          <CardContent className="p-0">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{metric.value}</p>
                <div className="flex items-center mt-2">
                  <span className={cn("text-sm font-medium", metric.change >= 0 ? "text-green-600" : "text-red-600")}>
                    {formatChange(metric.change)}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">vs. Yesterday</span>
                </div>
              </div>
              <div className={cn("p-3 rounded-lg", metric.iconBg)}>
                <metric.icon className={cn("w-6 h-6", metric.iconColor)} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
