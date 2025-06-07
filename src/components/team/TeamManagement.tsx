
import { useState } from "react";
import { AddTeamMemberDialog } from "./AddTeamMemberDialog";
import { TeamMemberList } from "./TeamMemberList";

export const TeamManagement = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleTeamMemberAdded = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b bg-white px-6 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Team Management</h1>
            <p className="text-gray-600">Manage your team members and their information</p>
          </div>
          <AddTeamMemberDialog onTeamMemberAdded={handleTeamMemberAdded} />
        </div>
      </div>
      
      <TeamMemberList refreshTrigger={refreshTrigger} />
    </div>
  );
};
