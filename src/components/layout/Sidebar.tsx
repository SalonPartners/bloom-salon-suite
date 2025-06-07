import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Users, 
  Scissors, 
  UserCheck, 
  CreditCard, 
  BarChart3,
  Sparkles,
  Calendar,
  Package,
  Clock
} from "lucide-react";

interface SidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "appointments", label: "Appointments", icon: Clock },
  { id: "calendar", label: "Calendar", icon: Calendar },
  { id: "pos", label: "Point of Sale", icon: CreditCard },
  { id: "clients", label: "Clients", icon: Users },
  { id: "catalog", label: "Catalog", icon: Package },
  { id: "team", label: "Team", icon: UserCheck },
  { id: "reports", label: "Reports", icon: BarChart3 },
];

export const Sidebar = ({ activeView, setActiveView }: SidebarProps) => {
  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">SalonPOS</h1>
            <p className="text-sm text-gray-500">Professional Edition</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActiveView(item.id)}
                className={cn(
                  "w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-left transition-colors",
                  activeView === item.id
                    ? "bg-purple-100 text-purple-700 font-medium"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                )}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-gray-200">
        <div className="bg-gradient-to-r from-purple-600 to-amber-500 rounded-lg p-4 text-white">
          <h3 className="font-medium mb-1">Pro Features</h3>
          <p className="text-sm opacity-90">Advanced analytics & reporting</p>
        </div>
      </div>
    </div>
  );
};
