
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Users, Calendar, TrendingUp } from "lucide-react";

export const Dashboard = () => {
  const stats = [
    {
      title: "Today's Revenue",
      value: "$2,847",
      change: "+12%",
      icon: DollarSign,
      color: "text-green-600"
    },
    {
      title: "Appointments",
      value: "32",
      change: "+5%",
      icon: Calendar,
      color: "text-blue-600"
    },
    {
      title: "New Clients",
      value: "8",
      change: "+20%",
      icon: Users,
      color: "text-purple-600"
    },
    {
      title: "Growth",
      value: "18%",
      change: "+3%",
      icon: TrendingUp,
      color: "text-amber-600"
    }
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening at your salon today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <p className="text-xs text-gray-500 mt-1">
                <span className="text-green-600 font-medium">{stat.change}</span> from yesterday
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { client: "Sarah Johnson", service: "Hair Cut & Color", time: "2:00 PM", stylist: "Emma" },
                { client: "Mike Davis", service: "Beard Trim", time: "2:30 PM", stylist: "Alex" },
                { client: "Lisa Chen", service: "Manicure", time: "3:00 PM", stylist: "Sofia" }
              ].map((appointment, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{appointment.client}</p>
                    <p className="text-sm text-gray-600">{appointment.service}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{appointment.time}</p>
                    <p className="text-xs text-gray-500">{appointment.stylist}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Services Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { service: "Hair Cut", bookings: 12, revenue: "$720" },
                { service: "Hair Color", bookings: 8, revenue: "$960" },
                { service: "Manicure", bookings: 6, revenue: "$360" }
              ].map((service, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{service.service}</p>
                    <p className="text-sm text-gray-600">{service.bookings} bookings</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{service.revenue}</p>
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
