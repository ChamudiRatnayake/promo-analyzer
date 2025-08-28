"use client"

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Clock } from "lucide-react"

export function OrderTrafficChart() {
  const data = [
    { name: "Kiosk", value: 35, color: "#ef4444" },
    { name: "Walk-ins", value: 30, color: "#f97316" },
    { name: "Online Orders", value: 25, color: "#eab308" },
    { name: "Mobile Orders", value: 10, color: "#fbbf24" },
  ]

  const total = 127

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="p-2 bg-red-100 rounded-lg">
            <Clock className="w-4 h-4 text-red-600" />
          </div>
          Order Traffic
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center mb-6">
          <div className="relative w-32 h-32">
            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="2"
              />
              {/* Kiosk - 35% */}
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#ef4444"
                strokeWidth="2"
                strokeDasharray="35, 65"
                strokeDashoffset="0"
              />
              {/* Walk-ins - 30% */}
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#f97316"
                strokeWidth="2"
                strokeDasharray="30, 70"
                strokeDashoffset="-35"
              />
              {/* Online Orders - 25% */}
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#eab308"
                strokeWidth="2"
                strokeDasharray="25, 75"
                strokeDashoffset="-65"
              />
              {/* Mobile Orders - 10% */}
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#fbbf24"
                strokeWidth="2"
                strokeDasharray="10, 90"
                strokeDashoffset="-90"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{total}</div>
                <div className="text-sm text-gray-500">orders</div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {data.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-sm text-gray-600">{item.name}</span>
              </div>
              <span className="text-sm font-medium text-gray-900">{item.value}%</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
