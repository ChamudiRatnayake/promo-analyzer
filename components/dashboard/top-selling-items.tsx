import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Star } from "lucide-react"

export function TopSellingItems() {
  const items = [
    {
      rank: "#1",
      name: "Margherita Pizza",
      orders: "23 orders",
      revenue: "$345.00",
      change: "+15%",
      changeColor: "text-green-600",
    },
    {
      rank: "#2",
      name: "Caesar Salad",
      orders: "18 orders",
      revenue: "$216.00",
      change: "+8%",
      changeColor: "text-green-600",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="p-2 bg-red-100 rounded-lg">
            <Star className="w-4 h-4 text-red-600" />
          </div>
          Top Selling Items
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                {item.rank}
              </div>
              <div className="flex-1">
                <div className="font-medium text-gray-900">{item.name}</div>
                <div className="text-sm text-gray-600">{item.orders}</div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-gray-900">{item.revenue}</div>
                <div className={`text-sm ${item.changeColor}`}>{item.change}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
