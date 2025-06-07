
import { useState } from "react";
import { AddServiceDialog } from "./AddServiceDialog";
import { ServiceMenuView } from "./ServiceMenuView";

export const ServiceManagement = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleServiceAdded = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b bg-white px-6 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Service Management</h1>
            <p className="text-gray-600">Manage your service catalog and pricing</p>
          </div>
          <AddServiceDialog onServiceAdded={handleServiceAdded} />
        </div>
      </div>
      
      <ServiceMenuView refreshTrigger={refreshTrigger} />
    </div>
  );
};
