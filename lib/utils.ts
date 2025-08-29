import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateMockData(revenueDropPercentage: number) {
  const baseRevenue = 2625.5 // Corresponds to mockData.lastWeek.revenue
  const baseOrders = 135 // Corresponds to mockData.lastWeek.orders
  const baseCustomers = 29 // Corresponds to mockData.lastWeek.customers

  const thisWeekRevenue = baseRevenue * (1 - revenueDropPercentage / 100)
  const thisWeekOrders = baseOrders * (1 - (revenueDropPercentage / 100) * 0.5) // Orders drop less dramatically
  const thisWeekCustomers = baseCustomers * (1 - (revenueDropPercentage / 100) * 0.3) // Customers drop even less

  return {
    thisWeek: {
      revenue: parseFloat(thisWeekRevenue.toFixed(2)),
      orders: Math.round(thisWeekOrders),
      customers: Math.round(thisWeekCustomers),
    },
    lastWeek: {
      revenue: baseRevenue,
      orders: baseOrders,
      customers: baseCustomers,
    },
  }
}
  