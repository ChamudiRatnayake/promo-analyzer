"use client"

import { useState } from "react"
import { AlertTriangle, X, ChevronDown, ChevronUp } from "lucide-react"
import { Card, CardContent } from "../ui/card"
import { Button } from "../ui/button"
import { PromotionalInsights } from "./promotional-insights"

interface SalesAlertBannerProps {
  revenueChange: number
  ordersChange: number
  customersChange: number
  promotionPattern: "expandable" | "modal" | "tab"
  onShowModal: () => void
}

export function SalesAlertBanner({
  revenueChange,
  ordersChange,
  customersChange,
  promotionPattern,
  onShowModal,
}: SalesAlertBannerProps) {
  const [dismissed, setDismissed] = useState(false)
  const [expanded, setExpanded] = useState(false)

  if (dismissed) return null

  const getWorstMetric = () => {
    const metrics = [
      { name: "revenue", change: revenueChange },
      { name: "orders", change: ordersChange },
      { name: "customers", change: customersChange },
    ]
    return metrics.reduce((worst, current) => (current.change < worst.change ? current : worst))
  }

  const worstMetric = getWorstMetric()

  return (
    <Card className="mb-6 border-red-200 bg-red-50">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3 flex-1">
            <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-red-900">Sales Alert</h3>
                <span className="text-xs bg-red-200 text-red-800 px-2 py-1 rounded-full">Weekly Comparison</span>
              </div>
              <p className="text-red-800 mt-1">
                ⚠️ {worstMetric.name.charAt(0).toUpperCase() + worstMetric.name.slice(1)} dropped by{" "}
                {Math.abs(worstMetric.change).toFixed(1)}% compared to last week.
              </p>

              {promotionPattern === "expandable" && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setExpanded(!expanded)}
                  className="text-red-700 hover:text-red-900 p-0 h-auto mt-2"
                >
                  {expanded ? (
                    <>
                      Hide Recommendations <ChevronUp className="w-4 h-4 ml-1" />
                    </>
                  ) : (
                    <>
                      View Recommendations <ChevronDown className="w-4 h-4 ml-1" />
                    </>
                  )}
                </Button>
              )}

              {promotionPattern === "modal" && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onShowModal}
                  className="mt-2 border-red-300 text-red-700 hover:bg-red-100 bg-transparent"
                >
                  View Recommendations
                </Button>
              )}
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setDismissed(true)}
            className="text-red-600 hover:text-red-800 p-1"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {expanded && promotionPattern === "expandable" && (
          <div className="mt-4 pt-4 border-t border-red-200">
            <PromotionalInsights
              revenueChange={revenueChange}
              ordersChange={ordersChange}
              customersChange={customersChange}
            />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
