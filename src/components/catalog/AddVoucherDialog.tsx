
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AddVoucherDialogProps {
  trigger: React.ReactNode;
}

export const AddVoucherDialog = ({ trigger }: AddVoucherDialogProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    value: "",
    services: "All services",
    validFor: "1 year"
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Create a voucher</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Voucher name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Enter voucher name"
            />
          </div>

          <div>
            <Label htmlFor="value">Value</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                AED
              </span>
              <Input
                id="value"
                type="number"
                value={formData.value}
                onChange={(e) => handleInputChange("value", e.target.value)}
                placeholder="0"
                className="pl-12"
              />
            </div>
          </div>

          <div>
            <Label>Applicable services</Label>
            <Select value={formData.services} onValueChange={(value) => handleInputChange("services", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All services">All services</SelectItem>
                <SelectItem value="Hair services">Hair services</SelectItem>
                <SelectItem value="Nail services">Nail services</SelectItem>
                <SelectItem value="Facial services">Facial services</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Valid for</Label>
            <Select value={formData.validFor} onValueChange={(value) => handleInputChange("validFor", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="6 months">6 months</SelectItem>
                <SelectItem value="1 year">1 year</SelectItem>
                <SelectItem value="2 years">2 years</SelectItem>
                <SelectItem value="No expiry">No expiry</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700">
              Create Voucher
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
