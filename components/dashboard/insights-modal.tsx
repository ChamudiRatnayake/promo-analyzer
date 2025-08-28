import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import { PromotionalInsights } from "./promotional-insights"
import { AlertTriangle } from "lucide-react"

interface InsightsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  revenueChange: number
  ordersChange: number
  customersChange: number
}

export function InsightsModal({
  open,
  onOpenChange,
  revenueChange,
  ordersChange,
  customersChange,
}: InsightsModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            Sales Insights & Recommendations
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="bg-red-50 p-4 rounded-lg">
            <h3 className="font-semibold text-red-900 mb-2">Cause Summary</h3>
            <p className="text-red-800">
              Sales dropped mainly due to fewer weekday lunch orders and reduced customer retention. The decline appears
              to be concentrated during peak lunch hours (11 AM - 2 PM) with a notable decrease in repeat customers.
            </p>
          </div>

          <PromotionalInsights
            revenueChange={revenueChange}
            ordersChange={ordersChange}
            customersChange={customersChange}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
