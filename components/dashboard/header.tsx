import { Bell, Search } from "lucide-react"
import { Badge } from "../ui/badge"

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Welcome back, John!</h1>
          <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            Sweet Beans • 123 Main St, New York
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm text-gray-600">Thursday, August 28, 2025</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-5 h-5 text-gray-400" />
            </div>

            <div className="relative">
              <Bell className="w-5 h-5 text-gray-400" />
              <Badge className="absolute -top-2 -right-2 w-5 h-5 p-0 flex items-center justify-center text-xs bg-red-500">
                2
              </Badge>
            </div>

            <div className="relative">
              <Bell className="w-5 h-5 text-gray-400" />
              <Badge className="absolute -top-2 -right-2 w-5 h-5 p-0 flex items-center justify-center text-xs bg-red-500">
                5
              </Badge>
            </div>

            <div className="flex items-center gap-2 ml-2">
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">JD</span>
              </div>
              <span className="text-sm font-medium text-gray-700">John Doe</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
