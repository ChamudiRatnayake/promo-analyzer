"use client"

import { useState } from "react"
import { Sidebar } from "./dashboard/sidebar"
import { Header } from "./dashboard/header"
import { MetricsCards } from "./dashboard/metrics-cards"
import { RecentOrders } from "./dashboard/recent-orders"
import { OrderTrafficChart } from "./dashboard/order-traffic-chart"
import { TopSellingItems } from "./dashboard/top-selling-items"
import { SalesAlertBanner } from "./dashboard/sales-alert-banner"
import { SalesAlertCard } from "./dashboard/sales-alert-card"
import { InsightsModal } from "./dashboard/insights-modal"

// Mock data for demonstration
const mockData = {
  thisWeek: {
    revenue: 2307.4,
    orders: 127,
    customers: 27,
  },
  lastWeek: {
    revenue: 2625.5,
    orders: 135,
    customers: 29,
  },
}

export function MerchantDashboard() {
  const alertPattern = "banner"
  const promotionPattern = "expandable"
  const [showInsightsModal, setShowInsightsModal] = useState(false)

  // Calculate week-over-week changes
  const revenueChange = ((mockData.thisWeek.revenue - mockData.lastWeek.revenue) / mockData.lastWeek.revenue) * 100
  const ordersChange = ((mockData.thisWeek.orders - mockData.lastWeek.orders) / mockData.lastWeek.orders) * 100
  const customersChange =
    ((mockData.thisWeek.customers - mockData.lastWeek.customers) / mockData.lastWeek.customers) * 100

  const hasAlert = revenueChange < 0 || ordersChange < 0 || customersChange < 0

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar showInsights={alertPattern === "sidebar"} hasAlert={hasAlert} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-y-auto p-6">
          {/* Sales Alert Banner */}
          {hasAlert && alertPattern === "banner" && (
            <SalesAlertBanner
              revenueChange={revenueChange}
              ordersChange={ordersChange}
              customersChange={customersChange}
              promotionPattern={promotionPattern}
              onShowModal={() => setShowInsightsModal(true)}
            />
          )}

          {/* Metrics Cards */}
          <MetricsCards
            revenue={mockData.thisWeek.revenue}
            revenueChange={revenueChange}
            orders={mockData.thisWeek.orders}
            ordersChange={ordersChange}
            customers={mockData.thisWeek.customers}
            customersChange={customersChange}
          />

          {/* Sales Alert Card */}
          {hasAlert && alertPattern === "card" && (
            <SalesAlertCard
              revenueChange={revenueChange}
              ordersChange={ordersChange}
              customersChange={customersChange}
              promotionPattern={promotionPattern}
              onShowModal={() => setShowInsightsModal(true)}
            />
          )}

          {/* Dashboard Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            <div className="lg:col-span-2">
              <RecentOrders />
            </div>
            <div className="space-y-6">
              <OrderTrafficChart />
              <TopSellingItems />
            </div>
          </div>
        </main>
      </div>

      {/* Insights Modal */}
      <InsightsModal
        open={showInsightsModal}
        onOpenChange={setShowInsightsModal}
        revenueChange={revenueChange}
        ordersChange={ordersChange}
        customersChange={customersChange}
      />
    </div>
  )
}
