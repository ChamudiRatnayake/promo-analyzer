import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Eye } from "lucide-react"

export function RecentOrders() {
  const orders = [
    {
      id: "#1234",
      customer: "John Smith",
      items: "2 items",
      amount: "$24.50",
      time: "2 min ago",
      status: "Completed",
      statusColor: "bg-green-100 text-green-800",
    },
    {
      id: "#1235",
      customer: "Sarah Johnson",
      items: "1 item",
      amount: "$18.75",
      time: "5 min ago",
      status: "Accepted",
      statusColor: "bg-yellow-100 text-yellow-800",
    },
    {
      id: "#1236",
      customer: "Mike Davis",
      items: "3 items",
      amount: "$32.25",
      time: "8 min ago",
      status: "New",
      statusColor: "bg-blue-100 text-blue-800",
    },
    {
      id: "#1237",
      customer: "Emily Wilson",
      items: "2 items",
      amount: "$15.00",
      time: "12 min ago",
      status: "Completed",
      statusColor: "bg-green-100 text-green-800",
    },
  ]

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <div className="p-2 bg-red-100 rounded-lg">
            <Eye className="w-4 h-4 text-red-600" />
          </div>
          Recent Orders
        </CardTitle>
        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
          View all
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {orders.map((order, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900">{order.id}</span>
                    <Badge className={order.statusColor}>{order.status}</Badge>
                  </div>
                  <div className="text-sm text-gray-600">
                    {order.customer} • {order.items}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-gray-900">{order.amount}</div>
                <div className="text-sm text-gray-500">{order.time}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
