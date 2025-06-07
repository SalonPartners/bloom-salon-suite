
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Edit, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Service {
  id: string;
  service_name: string;
  service_type: string;
  category: string;
  description: string;
  price_type: string;
  price: number;
  duration: string;
  created_at: string;
}

export const ServiceMenuView = ({ refreshTrigger }: { refreshTrigger: number }) => {
  const [services, setServices] = useState<Service[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const categories = ["All", "Hairstyle", "Hair Color", "Nails", "Skin Care", "Body Care"];

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setServices(data || []);
    } catch (error) {
      console.error("Error fetching services:", error);
      toast({
        title: "Error",
        description: "Failed to load services",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, [refreshTrigger]);

  const handleDeleteService = async (id: string) => {
    try {
      const { error } = await supabase.from("services").delete().eq("id", id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Service deleted successfully",
      });

      fetchServices();
    } catch (error) {
      console.error("Error deleting service:", error);
      toast({
        title: "Error",
        description: "Failed to delete service",
        variant: "destructive",
      });
    }
  };

  const filteredServices = services.filter((service) => {
    const matchesSearch = service.service_name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const groupedServices = filteredServices.reduce((acc, service) => {
    const category = service.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(service);
    return acc;
  }, {} as Record<string, Service[]>);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading services...</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Service Menu</h2>
        
        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className={
                selectedCategory === category
                  ? "bg-purple-600 hover:bg-purple-700"
                  : ""
              }
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Services Display */}
      <div className="space-y-6">
        {Object.keys(groupedServices).length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No services found. Try adjusting your search or add some services.
          </div>
        ) : (
          Object.entries(groupedServices).map(([category, categoryServices]) => (
            <div key={category}>
              <h3 className="text-lg font-semibold text-gray-800 mb-3 border-b pb-2">
                {category}
              </h3>
              <div className="grid gap-3">
                {categoryServices.map((service) => (
                  <Card key={service.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-gray-900">
                              {service.service_name}
                            </h4>
                            <div className="flex items-center space-x-2">
                              <span className="text-lg font-semibold text-gray-900">
                                AED {service.price}
                              </span>
                              <div className="flex space-x-1">
                                <Button variant="ghost" size="sm">
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleDeleteService(service.id)}
                                  className="text-red-600 hover:text-red-700"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                          <div className="text-sm text-gray-600 mb-1">
                            {service.service_type} • {service.duration}
                          </div>
                          {service.description && (
                            <p className="text-sm text-gray-500">
                              {service.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
