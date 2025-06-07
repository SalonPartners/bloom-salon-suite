
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface AddTeamMemberDialogProps {
  onTeamMemberAdded: () => void;
}

export const AddTeamMemberDialog = ({ onTeamMemberAdded }: AddTeamMemberDialogProps) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    additional_phone: "",
    location: "",
    permission_level: "Low",
    calendar_color: "#6366f1",
    job_title: "",
    start_date: "",
    start_year: new Date().getFullYear(),
    end_date: "",
    end_year: null as number | null,
    employment_type: "",
    team_member_id: "",
    notes: "",
    visible_to_clients: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase
        .from("team_members")
        .insert([formData]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Team member added successfully",
      });

      setOpen(false);
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        additional_phone: "",
        location: "",
        permission_level: "Low",
        calendar_color: "#6366f1",
        job_title: "",
        start_date: "",
        start_year: new Date().getFullYear(),
        end_date: "",
        end_year: null,
        employment_type: "",
        team_member_id: "",
        notes: "",
        visible_to_clients: true,
      });
      onTeamMemberAdded();
    } catch (error) {
      console.error("Error adding team member:", error);
      toast({
        title: "Error",
        description: "Failed to add team member",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Team Member
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Team Member</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="first_name">First Name *</Label>
              <Input
                id="first_name"
                value={formData.first_name}
                onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="last_name">Last Name</Label>
              <Input
                id="last_name"
                value={formData.last_name}
                onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone_number">Phone Number</Label>
              <Input
                id="phone_number"
                value={formData.phone_number}
                onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="additional_phone">Additional Phone</Label>
              <Input
                id="additional_phone"
                value={formData.additional_phone}
                onChange={(e) => setFormData({ ...formData, additional_phone: e.target.value })}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="permission_level">Permission Level</Label>
              <Select
                value={formData.permission_level}
                onValueChange={(value) => setFormData({ ...formData, permission_level: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="calendar_color">Calendar Color</Label>
              <Input
                id="calendar_color"
                type="color"
                value={formData.calendar_color}
                onChange={(e) => setFormData({ ...formData, calendar_color: e.target.value })}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="job_title">Job Title</Label>
            <Input
              id="job_title"
              value={formData.job_title}
              onChange={(e) => setFormData({ ...formData, job_title: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="start_date">Start Date</Label>
              <Input
                id="start_date"
                type="date"
                value={formData.start_date}
                onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="start_year">Start Year</Label>
              <Input
                id="start_year"
                type="number"
                value={formData.start_year}
                onChange={(e) => setFormData({ ...formData, start_year: parseInt(e.target.value) })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="end_date">End Date</Label>
              <Input
                id="end_date"
                type="date"
                value={formData.end_date}
                onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="end_year">End Year</Label>
              <Input
                id="end_year"
                type="number"
                value={formData.end_year || ""}
                onChange={(e) => setFormData({ ...formData, end_year: e.target.value ? parseInt(e.target.value) : null })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="employment_type">Employment Type</Label>
              <Select
                value={formData.employment_type}
                onValueChange={(value) => setFormData({ ...formData, employment_type: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Full-time">Full-time</SelectItem>
                  <SelectItem value="Part-time">Part-time</SelectItem>
                  <SelectItem value="Contract">Contract</SelectItem>
                  <SelectItem value="Freelance">Freelance</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="team_member_id">Team Member ID</Label>
              <Input
                id="team_member_id"
                value={formData.team_member_id}
                onChange={(e) => setFormData({ ...formData, team_member_id: e.target.value })}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="visible_to_clients"
              checked={formData.visible_to_clients}
              onCheckedChange={(checked) => setFormData({ ...formData, visible_to_clients: checked })}
            />
            <Label htmlFor="visible_to_clients">Visible to Clients</Label>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} className="bg-purple-600 hover:bg-purple-700">
              {isLoading ? "Adding..." : "Add Team Member"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
