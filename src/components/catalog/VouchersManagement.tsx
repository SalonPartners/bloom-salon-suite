
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Plus, 
  Info
} from "lucide-react";
import { AddVoucherDialog } from "./AddVoucherDialog";

const mockVouchers = [
  {
    id: "1",
    name: "4000 Ultimate",
    services: "All services",
    price: "AED 4,000",
    value: "AED 4,000",
    sold: 3,
    color: "bg-orange-500"
  },
  {
    id: "2",
    name: "3000 Super Saver",
    services: "All services",
    price: "AED 3,000",
    value: "AED 3,000",
    sold: 2,
    color: "bg-purple-500"
  },
  {
    id: "3",
    name: "2500 Lavish",
    services: "All services",
    price: "AED 2,500",
    value: "AED 2,500",
    sold: 0,
    color: "bg-blue-500"
  },
  {
    id: "4",
    name: "2000 Luxhstatic",
    services: "All services",
    price: "AED 2,000",
    value: "AED 2,000",
    sold: 13,
    color: "bg-gray-800"
  },
  {
    id: "5",
    name: "1500 Glam Up",
    services: "All services",
    price: "AED 1,500",
    value: "AED 1,500",
    sold: 10,
    color: "bg-teal-500"
  },
  {
    id: "6",
    name: "1000 Dazzling Beauty",
    services: "All services",
    price: "AED 1,000",
    value: "AED 1,000",
    sold: 0,
    color: "bg-gray-800"
  },
  {
    id: "7",
    name: "Gift card",
    services: "All services",
    price: "AED 500",
    value: "AED 500",
    sold: 1,
    color: "bg-blue-500"
  }
];

export const VouchersManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddDialog, setShowAddDialog] = useState(false);

  const filteredVouchers = mockVouchers.filter((voucher) =>
    voucher.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h3 className="font-medium text-blue-900">Goodbye vouchers. Hello gift cards</h3>
            <p className="text-blue-700 text-sm mt-1">
              We've upgraded your vouchers to gift cards of equal value. Don't worry, you can still{" "}
              <span className="underline cursor-pointer">view your old vouchers below</span>.{" "}
              <span className="underline cursor-pointer">Learn more</span> or{" "}
              <span className="underline cursor-pointer">view your gift cards</span>
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Vouchers</h2>
        </div>
        <AddVoucherDialog 
          trigger={
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Voucher
            </Button>
          }
        />
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Search by voucher name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="bg-white rounded-lg border">
        <div className="grid grid-cols-4 gap-4 p-4 border-b font-medium text-gray-700">
          <div>Voucher name</div>
          <div>Services</div>
          <div>Price / Value</div>
          <div>Sold</div>
        </div>
        
        <div className="divide-y">
          {filteredVouchers.map((voucher) => (
            <div key={voucher.id} className="grid grid-cols-4 gap-4 p-4 items-center hover:bg-gray-50">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 ${voucher.color} rounded-lg flex items-center justify-center text-white font-bold text-sm`}>
                  {voucher.name.slice(0, 2).toUpperCase()}
                </div>
                <div className="font-medium text-gray-900">{voucher.name}</div>
              </div>
              <div className="text-blue-600 underline cursor-pointer">{voucher.services}</div>
              <div className="font-medium text-gray-900">{voucher.price} / {voucher.value}</div>
              <div className="font-medium text-gray-900">{voucher.sold}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center text-gray-500 text-sm">1 of 1</div>
    </div>
  );
};
