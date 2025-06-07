
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";

interface AddMembershipDialogProps {
  trigger: React.ReactNode;
}

export const AddMembershipDialog = ({ trigger }: AddMembershipDialogProps) => {
  const [open, setOpen] = useState(false);
  const [paymentType, setPaymentType] = useState("one-time");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    sessions: "5",
    sessionType: "Limited",
    validFor: "1 month",
    price: "",
    taxRate: "No tax"
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create a membership</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <h3 className="font-medium text-gray-900">Basic info</h3>
            
            <div>
              <Label htmlFor="name">Membership name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Add membership name"
              />
            </div>

            <div>
              <Label htmlFor="description">Membership description</Label>
              <div className="text-right text-sm text-gray-500 mb-1">0/360</div>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Add membership description"
                rows={4}
              />
            </div>
          </div>

          {/* Services and Sessions */}
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-900">Services and sessions</h3>
              <p className="text-sm text-gray-600">Add the services and sessions included in the membership.</p>
            </div>

            <div>
              <Label>Included services</Label>
              <div className="mt-2 p-3 border rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">0 services</span>
                  <Button variant="link" className="text-purple-600 p-0">Edit</Button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Sessions</Label>
                <Select value={formData.sessionType} onValueChange={(value) => handleInputChange("sessionType", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Limited">Limited</SelectItem>
                    <SelectItem value="Unlimited">Unlimited</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Number of sessions</Label>
                <Input
                  type="number"
                  value={formData.sessions}
                  onChange={(e) => handleInputChange("sessions", e.target.value)}
                />
                <p className="text-xs text-gray-500 mt-1">
                  For recurring memberships, the number of sessions will renew at the beginning of each payment cycle.
                </p>
              </div>
            </div>
          </div>

          {/* Pricing and Payment */}
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-900">Pricing and payment</h3>
              <p className="text-sm text-gray-600">Choose how you'd like your clients to pay.</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Card 
                className={`cursor-pointer transition-all ${
                  paymentType === "one-time" ? "ring-2 ring-purple-600" : ""
                }`}
                onClick={() => setPaymentType("one-time")}
              >
                <CardContent className="p-4 text-center">
                  {paymentType === "one-time" && (
                    <div className="absolute top-2 right-2">
                      <div className="w-5 h-5 bg-purple-600 rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    </div>
                  )}
                  <h4 className="font-medium">One-time payment</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Clients are charged once at the time of purchase.
                  </p>
                </CardContent>
              </Card>

              <Card 
                className={`cursor-pointer transition-all ${
                  paymentType === "recurring" ? "ring-2 ring-purple-600" : ""
                }`}
                onClick={() => setPaymentType("recurring")}
              >
                <CardContent className="p-4 text-center">
                  {paymentType === "recurring" && (
                    <div className="absolute top-2 right-2">
                      <div className="w-5 h-5 bg-purple-600 rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    </div>
                  )}
                  <h4 className="font-medium">Recurring payments</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Clients are charged on the membership renewal date.
                  </p>
                  <p className="text-xs text-purple-600 mt-2">Payment Processing Only</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Valid for</Label>
                <Select value={formData.validFor} onValueChange={(value) => handleInputChange("validFor", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1 month">1 month</SelectItem>
                    <SelectItem value="3 months">3 months</SelectItem>
                    <SelectItem value="6 months">6 months</SelectItem>
                    <SelectItem value="1 year">1 year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Price</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    AED
                  </span>
                  <Input
                    type="number"
                    value={formData.price}
                    onChange={(e) => handleInputChange("price", e.target.value)}
                    className="pl-12"
                  />
                </div>
              </div>
            </div>

            <div>
              <Label>Tax rate</Label>
              <Select value={formData.taxRate} onValueChange={(value) => handleInputChange("taxRate", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="No tax">No tax</SelectItem>
                  <SelectItem value="5%">5%</SelectItem>
                  <SelectItem value="8%">8%</SelectItem>
                  <SelectItem value="10%">10%</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700">
              Create Membership
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
