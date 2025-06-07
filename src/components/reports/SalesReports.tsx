
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, TrendingUp, DollarSign, Users } from "lucide-react";

export const SalesReports = () => {
  const salesData = [
    { date: "2024-06-01", gross: 1245, discounts: 125, tips: 180, tax: 99, net: 1399 },
    { date: "2024-06-02", gross: 2847, discounts: 234, tips: 310, tax: 228, net: 3151 },
    { date: "2024-05-31", gross: 1876, discounts: 187, tips: 220, tax: 150, net: 2059 },
    { date: "2024-05-30", gross: 2156, discounts: 156, tips: 275, tax: 172, net: 2447 }
  ];

  const paymentMethods = [
    { method: "Credit Card", amount: 1850, percentage: 65 },
    { method: "Cash", amount: 540, percentage: 19 },
    { method: "Online", amount: 320, percentage: 11 },
    { method: "Gift Card", amount: 137, percentage: 5 }
  ];

  const topServices = [
    { service: "Hair Cut", revenue: 720, bookings: 12 },
    { service: "Hair Color", revenue: 960, bookings: 8 },
    { service: "Manicure", revenue: 360, bookings: 6 },
    { service: "Pedicure", revenue: 270, bookings: 4 }
  ];

  const teamPerformance = [
    { name: "Emma Rodriguez", sales: 1200, clients: 15, rating: 4.9 },
    { name: "Alex Thompson", sales: 890, clients: 12, rating: 4.8 },
    { name: "Sofia Martinez", sales: 650, clients: 18, rating: 4.7 },
    { name: "David Kim", sales: 560, clients: 8, rating: 5.0 }
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Sales Reports</h1>
        <p className="text-gray-600">Comprehensive analytics and financial insights</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Revenue</CardTitle>
            <DollarSign className="w-4 h-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2,847</div>
            <p className="text-xs text-green-600 mt-1">+12% from yesterday</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clients Served</CardTitle>
            <Users className="w-4 h-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32</div>
            <p className="text-xs text-blue-600 mt-1">+5% from yesterday</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Sale</CardTitle>
            <TrendingUp className="w-4 h-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$89</div>
            <p className="text-xs text-purple-600 mt-1">+8% from yesterday</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tips Collected</CardTitle>
            <CalendarDays className="w-4 h-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$310</div>
            <p className="text-xs text-amber-600 mt-1">+15% from yesterday</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Daily Sales Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Daily Sales Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {salesData.map((day, index) => (
                <div key={day.date} className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{day.date}</span>
                    <Badge variant="outline">${day.net}</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Gross:</span> ${day.gross}
                    </div>
                    <div>
                      <span className="text-gray-600">Tips:</span> ${day.tips}
                    </div>
                    <div>
                      <span className="text-gray-600">Discounts:</span> -${day.discounts}
                    </div>
                    <div>
                      <span className="text-gray-600">Tax:</span> ${day.tax}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Payment Methods */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Method Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {paymentMethods.map((payment, index) => (
                <div key={payment.method} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 rounded-full bg-purple-600" style={{
                      backgroundColor: `hsl(${270 + index * 30}, 70%, 50%)`
                    }}></div>
                    <span className="font-medium">{payment.method}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-600">${payment.amount}</span>
                    <Badge variant="outline">{payment.percentage}%</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Services */}
        <Card>
          <CardHeader>
            <CardTitle>Top Services Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topServices.map((service, index) => (
                <div key={service.service} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{service.service}</p>
                    <p className="text-sm text-gray-600">{service.bookings} bookings</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">${service.revenue}</p>
                    <p className="text-sm text-gray-600">${Math.round(service.revenue / service.bookings)}/avg</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Team Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Team Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {teamPerformance.map((member, index) => (
                <div key={member.name} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{member.name}</p>
                    <p className="text-sm text-gray-600">{member.clients} clients served</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">${member.sales}</p>
                    <div className="flex items-center">
                      <span className="text-sm text-amber-600 mr-1">★</span>
                      <span className="text-sm text-gray-600">{member.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
