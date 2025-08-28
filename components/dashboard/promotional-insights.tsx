"use client"

import { Badge } from "../ui/badge"

interface PromotionalInsightsProps {
  revenueChange: number
  ordersChange: number
  customersChange: number
}

export function PromotionalInsights({ revenueChange, ordersChange, customersChange }: PromotionalInsightsProps) {
  const promotions = [
    {
      title: "10% Lunch Discount",
      description: "Boost midday sales",
      impact: "+8%",
    },
    {
      title: "Happy Hour Special",
      description: "2-5 PM promotion",
      impact: "+15%",
    },
    {
      title: "Combo Deal Offer",
      description: "Bundle discount",
      impact: "+10%",
    },
  ]

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <h4 className="font-semibold text-gray-900">Recommended Promotions</h4>
        <Badge variant="secondary">AI Generated</Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {promotions.map((promotion, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow h-20 flex flex-col justify-between"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <h5 className="font-bold text-sm text-gray-900 truncate">💡 {promotion.title}</h5>
                <p className="text-xs text-gray-600 mt-1 truncate">{promotion.description}</p>
              </div>
              <div className="ml-2 flex-shrink-0">
                <span className="text-xs font-medium text-green-600">📈 {promotion.impact}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
