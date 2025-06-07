import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { ClientManagement } from "@/components/clients/ClientManagement";
import { CatalogManagement } from "@/components/catalog/CatalogManagement";
import { TeamManagement } from "@/components/team/TeamManagement";
import { POSSystem } from "@/components/pos/POSSystem";
import { SalesReports } from "@/components/reports/SalesReports";
import { Calendar } from "@/components/calendar/Calendar";
import AppointmentsCalendar from "@/components/Appointments/Appointments";

const Index = () => {
  const [activeView, setActiveView] = useState("dashboard");

  const renderActiveView = () => {
    switch (activeView) {
      case "dashboard":
        return <Dashboard />;
      case "appointments":
        return <AppointmentsCalendar />;
      case "calendar":
        return <Calendar />;
      case "clients":
        return <ClientManagement />;
      case "catalog":
        return <CatalogManagement />;
      case "team":
        return <TeamManagement />;
      case "pos":
        return <POSSystem />;
      case "reports":
        return <SalesReports />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <main className="flex-1 overflow-auto">
        {renderActiveView()}
      </main>
    </div>
  );
};

export default Index;
