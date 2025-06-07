
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Plus, 
  MoreHorizontal,
  Filter
} from "lucide-react";
import { AddMembershipDialog } from "./AddMembershipDialog";

const mockMemberships = [
  {
    id: "1",
    name: "5 blow dry+1 FREE",
    services: "10 services",
    validFor: "1 year",
    sessions: "6 sessions",
    price: "AED 500",
    color: "bg-blue-500"
  },
  {
    id: "2",
    name: "11 classic PEDICURE(cleaning ONLY)",
    services: "1 service",
    validFor: "6 months",
    sessions: "11 sessions",
    price: "AED 800",
    color: "bg-blue-500"
  },
  {
    id: "3",
    name: "5 blow dry",
    services: "10 services",
    validFor: "3 months",
    sessions: "5 sessions",
    price: "AED 450",
    color: "bg-blue-500"
  },
  {
    id: "4",
    name: "600 aed 5 blowdry M",
    services: "22 services",
    validFor: "1 year",
    sessions: "5 sessions",
    price: "AED 600",
    color: "bg-blue-500"
  },
  {
    id: "5",
    name: "5 Hammam zeit +1 free",
    services: "4 services",
    validFor: "1 year",
    sessions: "6 sessions",
    price: "AED 750",
    color: "bg-purple-500"
  },
  {
    id: "6",
    name: "5 Blowdry only",
    services: "13 services",
    validFor: "1 year",
    sessions: "5 sessions",
    price: "AED 500",
    color: "bg-blue-500"
  },
  {
    id: "7",
    name: "10 Blow dry+ 1 FREE",
    services: "28 services",
    validFor: "8 months",
    sessions: "11 sessions",
    price: "AED 1,200",
    color: "bg-blue-500"
  },
  {
    id: "8",
    name: "6 Blowdry",
    services: "22 services",
    validFor: "1 year",
    sessions: "6 sessions",
    price: "AED 500",
    color: "bg-blue-500"
  },
  {
    id: "9",
    name: "Wash and Quick Dry",
    services: "2 services",
    validFor: "1 year",
    sessions: "10 sessions",
    price: "AED 400",
    color: "bg-blue-500"
  },
  {
    id: "10",
    name: "Gents _ Hair Cut & Beard & Main & Pedi",
    services: "4 services",
    validFor: "1 year",
    sessions: "9 sessions",
    price: "AED 1,000",
    color: "bg-orange-500"
  }
];

export const MembershipsManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddDialog, setShowAddDialog] = useState(false);

  const filteredMemberships = mockMemberships.filter((membership) =>
    membership.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Memberships</h2>
          <p className="text-gray-600">Manage membership packages and deals</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <MoreHorizontal className="w-4 h-4 mr-2" />
            Options
          </Button>
          <AddMembershipDialog 
            trigger={
              <Button className="bg-gray-900 hover:bg-gray-800 text-white">
                Add
              </Button>
            }
          />
        </div>
      </div>

      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search by membership name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          Filters
        </Button>
      </div>

      <div className="bg-white rounded-lg border">
        <div className="grid grid-cols-5 gap-4 p-4 border-b font-medium text-gray-700">
          <div>Membership name</div>
          <div>Valid for</div>
          <div>Sessions</div>
          <div>Price</div>
          <div></div>
        </div>
        
        <div className="divide-y">
          {filteredMemberships.map((membership) => (
            <div key={membership.id} className="grid grid-cols-5 gap-4 p-4 items-center hover:bg-gray-50">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 ${membership.color} rounded-lg flex items-center justify-center text-white font-bold text-sm`}>
                  {membership.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="font-medium text-gray-900">{membership.name}</div>
                  <div className="text-sm text-gray-500">{membership.services}</div>
                </div>
              </div>
              <div className="text-gray-700">{membership.validFor}</div>
              <div className="text-blue-600 font-medium">{membership.sessions}</div>
              <div className="font-semibold text-gray-900">{membership.price}</div>
              <div className="flex justify-end">
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
