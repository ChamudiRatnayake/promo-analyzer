"use client"

import { useState } from "react"
import { AlertTriangle, TrendingDown, ChevronDown, ChevronUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { PromotionalInsights } from "./promotional-insights"

interface SalesAlertCardProps {
  revenueChange: number
  ordersChange: number
  customersChange: number
  promotionPattern: "expandable" | "modal" | "tab"
  onShowModal: () => void
}

export function SalesAlertCard({
  revenueChange,
  ordersChange,
  customersChange,
  promotionPattern,
  onShowModal,
}: SalesAlertCardProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <Card className="mb-6 border-red-200">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-red-900">
          <AlertTriangle className="w-5 h-5 text-red-600" />
          Weekly Sales Analysis
          <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full ml-auto">Alert</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center p-3 bg-red-50 rounded-lg">
            <div className="flex items-center justify-center gap-1 text-red-600 mb-1">
              <TrendingDown className="w-4 h-4" />
              <span className="text-sm font-medium">Revenue</span>
            </div>
            <p className="text-lg font-bold text-red-900">{revenueChange.toFixed(1)}%</p>
          </div>
          <div className="text-center p-3 bg-red-50 rounded-lg">
            <div className="flex items-center justify-center gap-1 text-red-600 mb-1">
              <TrendingDown className="w-4 h-4" />
              <span className="text-sm font-medium">Orders</span>
            </div>
            <p className="text-lg font-bold text-red-900">{ordersChange.toFixed(1)}%</p>
          </div>
          <div className="text-center p-3 bg-red-50 rounded-lg">
            <div className="flex items-center justify-center gap-1 text-red-600 mb-1">
              <TrendingDown className="w-4 h-4" />
              <span className="text-sm font-medium">Customers</span>
            </div>
            <p className="text-lg font-bold text-red-900">{customersChange.toFixed(1)}%</p>
          </div>
        </div>

        <p className="text-gray-700 mb-4">
          📉 Sales dropped mainly due to fewer weekday lunch orders and reduced customer retention.
        </p>

        {promotionPattern === "expandable" && (
          <>
            <Button
              variant="outline"
              onClick={() => setExpanded(!expanded)}
              className="w-full border-red-300 text-red-700 hover:bg-red-50"
            >
              {expanded ? (
                <>
                  Hide Promotional Insights <ChevronUp className="w-4 h-4 ml-2" />
                </>
              ) : (
                <>
                  View Promotional Insights <ChevronDown className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>

            {expanded && (
              <div className="mt-4 pt-4 border-t">
                <PromotionalInsights
                  revenueChange={revenueChange}
                  ordersChange={ordersChange}
                  customersChange={customersChange}
                />
              </div>
            )}
          </>
        )}

        {promotionPattern === "modal" && (
          <Button onClick={onShowModal} className="w-full bg-red-600 hover:bg-red-700">
            View Promotional Insights
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
