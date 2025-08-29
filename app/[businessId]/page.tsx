import { MerchantDashboard1 } from "@/components/merchant-dashboard-1"
import { MerchantDashboard2 } from "@/components/merchant-dashboard-2"
import { generateMockData } from "@/lib/utils"

type Props = {
  params: {
    businessId: string
  }
}

export default function Page({ params }: Props) {
  let dashboardComponent
  let mockData

  if (params.businessId === "BIZ_123") {
    mockData = generateMockData(12.1) // Original mock data's revenue drop
    dashboardComponent = <MerchantDashboard1 mockData={mockData} />
  } else if (params.businessId === "BIZ_234") {
    mockData = generateMockData(60) // 60% revenue drop
    dashboardComponent = <MerchantDashboard1 mockData={mockData} />
  } else {
    dashboardComponent = <div>Business not found</div>
  }

  return dashboardComponent
}
