
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, Star, Edit, Trash2, MapPin } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { Tables } from "@/integrations/supabase/types";

type TeamMember = Tables<"team_members">;

interface TeamMemberListProps {
  refreshTrigger: number;
}

export const TeamMemberList = ({ refreshTrigger }: TeamMemberListProps) => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchTeamMembers = async () => {
    try {
      const { data, error } = await supabase
        .from("team_members")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setTeamMembers(data || []);
    } catch (error) {
      console.error("Error fetching team members:", error);
      toast({
        title: "Error",
        description: "Failed to fetch team members",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTeamMembers();
  }, [refreshTrigger]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this team member?")) return;

    try {
      const { error } = await supabase
        .from("team_members")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Team member deleted successfully",
      });

      fetchTeamMembers();
    } catch (error) {
      console.error("Error deleting team member:", error);
      toast({
        title: "Error",
        description: "Failed to delete team member",
        variant: "destructive",
      });
    }
  };

  const getPermissionBadgeColor = (level: string) => {
    switch (level) {
      case "Admin": return "bg-red-100 text-red-800";
      case "High": return "bg-purple-100 text-purple-800";
      case "Medium": return "bg-blue-100 text-blue-800";
      case "Low": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="text-center">Loading team members...</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.map((member) => (
          <Card key={member.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: member.calendar_color || '#6366f1' }}
                  />
                  <div>
                    <CardTitle className="text-lg">
                      {member.first_name} {member.last_name}
                    </CardTitle>
                    {member.job_title && (
                      <p className="text-sm text-gray-600">{member.job_title}</p>
                    )}
                  </div>
                </div>
                {member.rating && member.rating > 0 && (
                  <div className="flex items-center text-amber-500">
                    <Star className="w-4 h-4 mr-1 fill-current" />
                    <span className="text-sm font-medium">{member.rating}</span>
                    {member.review_count && member.review_count > 0 && (
                      <span className="text-xs text-gray-500 ml-1">
                        ({member.review_count})
                      </span>
                    )}
                  </div>
                )}
              </div>
            </CardHeader>
            
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="w-4 h-4 mr-2" />
                  {member.email}
                </div>
                {member.phone_number && (
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="w-4 h-4 mr-2" />
                    {member.phone_number}
                  </div>
                )}
                {member.location && (
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    {member.location}
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge className={getPermissionBadgeColor(member.permission_level || 'Low')}>
                  {member.permission_level || 'Low'}
                </Badge>
                {member.employment_type && (
                  <Badge variant="outline">
                    {member.employment_type}
                  </Badge>
                )}
                {member.visible_to_clients && (
                  <Badge variant="outline" className="text-green-600 border-green-200">
                    Visible to Clients
                  </Badge>
                )}
              </div>

              {member.notes && (
                <div>
                  <p className="text-sm text-gray-600 line-clamp-2">{member.notes}</p>
                </div>
              )}

              {(member.start_date || member.start_year) && (
                <div className="text-xs text-gray-500">
                  Started: {member.start_date || member.start_year}
                </div>
              )}

              <div className="flex space-x-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-red-600 hover:text-red-700"
                  onClick={() => handleDelete(member.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {teamMembers.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No team members found.</p>
        </div>
      )}
    </div>
  );
};
