
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
import { Plus, ArrowLeft, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface ServiceFormData {
  service_name: string;
  service_type: string;
  category: string;
  description: string;
  price_type: string;
  price: string;
  duration: string;
}

export const AddServiceDialog = ({ onServiceAdded }: { onServiceAdded: () => void }) => {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<ServiceFormData>({
    service_name: "",
    service_type: "",
    category: "",
    description: "",
    price_type: "Fixed",
    price: "",
    duration: "",
  });

  const handleInputChange = (field: keyof ServiceFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step === 1) {
      if (!formData.service_name || !formData.service_type || !formData.category) {
        toast({
          title: "Missing Information",
          description: "Please fill in all required fields",
          variant: "destructive",
        });
        return;
      }
    }
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleSubmit = async () => {
    if (!formData.price || !formData.duration) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase.from("services").insert([
        {
          service_name: formData.service_name,
          service_type: formData.service_type,
          category: formData.category,
          description: formData.description,
          price_type: formData.price_type,
          price: parseFloat(formData.price),
          duration: formData.duration,
        },
      ]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Service added successfully",
      });

      setOpen(false);
      setStep(1);
      setFormData({
        service_name: "",
        service_type: "",
        category: "",
        description: "",
        price_type: "Fixed",
        price: "",
        duration: "",
      });
      onServiceAdded();
    } catch (error) {
      console.error("Error adding service:", error);
      toast({
        title: "Error",
        description: "Failed to add service",
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
          Add New Service
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {step === 1 ? "New service" : "Pricing & Duration"}
          </DialogTitle>
        </DialogHeader>

        {step === 1 ? (
          <div className="space-y-4">
            <div>
              <Label htmlFor="service_name">Service name *</Label>
              <Input
                id="service_name"
                value={formData.service_name}
                onChange={(e) => handleInputChange("service_name", e.target.value)}
                placeholder="Enter service name"
              />
            </div>

            <div>
              <Label htmlFor="service_type">Service type *</Label>
              <Select
                value={formData.service_type}
                onValueChange={(value) => handleInputChange("service_type", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select service type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Hair Service">Hair Service</SelectItem>
                  <SelectItem value="Hair Treatment">Hair Treatment</SelectItem>
                  <SelectItem value="Nail Service">Nail Service</SelectItem>
                  <SelectItem value="Facial">Facial</SelectItem>
                  <SelectItem value="Massage">Massage</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="category">Category *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleInputChange("category", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Hairstyle">Hairstyle</SelectItem>
                  <SelectItem value="Hair Color">Hair Color</SelectItem>
                  <SelectItem value="Nails">Nails</SelectItem>
                  <SelectItem value="Skin Care">Skin Care</SelectItem>
                  <SelectItem value="Body Care">Body Care</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Enter service description"
                rows={3}
              />
            </div>

            <div className="flex justify-end pt-4">
              <Button onClick={handleNext} className="bg-purple-600 hover:bg-purple-700">
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <Label htmlFor="price_type">Price type</Label>
              <Select
                value={formData.price_type}
                onValueChange={(value) => handleInputChange("price_type", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Fixed">Fixed</SelectItem>
                  <SelectItem value="Variable">Variable</SelectItem>
                  <SelectItem value="Starting from">Starting from</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="price">Price *</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  AED
                </span>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => handleInputChange("price", e.target.value)}
                  placeholder="0.00"
                  className="pl-12"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="duration">Duration *</Label>
              <Select
                value={formData.duration}
                onValueChange={(value) => handleInputChange("duration", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15m">15 minutes</SelectItem>
                  <SelectItem value="30m">30 minutes</SelectItem>
                  <SelectItem value="45m">45 minutes</SelectItem>
                  <SelectItem value="1h">1 hour</SelectItem>
                  <SelectItem value="1h 15m">1 hour 15 minutes</SelectItem>
                  <SelectItem value="1h 30m">1 hour 30 minutes</SelectItem>
                  <SelectItem value="2h">2 hours</SelectItem>
                  <SelectItem value="2h 30m">2 hours 30 minutes</SelectItem>
                  <SelectItem value="3h">3 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-between pt-4">
              <Button variant="outline" onClick={handleBack}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isLoading}
                className="bg-purple-600 hover:bg-purple-700"
              >
                {isLoading ? "Adding..." : "Add Service"}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
