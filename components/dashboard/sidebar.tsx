import {
  LayoutDashboard,
  Menu,
  ShoppingCart,
  Wrench,
  Users,
  UserCheck,
  Settings,
  Puzzle,
  Link,
  BarChart3,
  AlertTriangle,
  TrendingUp,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"

interface SidebarProps {
  showInsights?: boolean
  hasAlert?: boolean
}

export function Sidebar({ showInsights, hasAlert }: SidebarProps) {
  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", active: true },
    { icon: Menu, label: "Menu" },
    { icon: ShoppingCart, label: "Orders" },
    { icon: Wrench, label: "Services" },
    { icon: Users, label: "Employees" },
    { icon: UserCheck, label: "Customers" },
    { icon: Settings, label: "Settings" },
    { icon: Puzzle, label: "Plugins" },
    { icon: Link, label: "Integrations" },
    { icon: BarChart3, label: "Reports" },
  ]

  return (
    <div className="w-64 bg-white text-[#333333] flex flex-col border-r border-gray-200">
      {/* Logo */}
      <div className="p-6">
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Applova.png-jsVKdQCwi1zo8jsUkTX2lte1KGOjBm.webp"
          alt="Applova"
          className="h-8 w-auto"
        />
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-lg mb-1 cursor-pointer transition-colors",
              item.active ? "bg-[#E50914] text-white" : "text-[#333333] hover:bg-[#F5F5F5] hover:text-[#333333]",
            )}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-sm">{item.label}</span>
          </div>
        ))}
      </nav>

      {/* Insights Section (Sidebar Pattern) */}
      {showInsights && hasAlert && (
        <div className="p-4 border-t border-gray-200">
          <Card className="bg-[#E50914] border-[#E50914]">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-white flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Insights
                <Badge variant="destructive" className="ml-auto">
                  New
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-xs text-red-100 space-y-1">
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  Sales Alert
                </div>
                <p className="text-red-200">Revenue dropped 12% vs last week</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Cafe Info */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">N</span>
          </div>
          <div>
            <div className="text-sm font-medium text-[#333333]">Cafe Royale</div>
          </div>
        </div>
      </div>
    </div>
  )
}
