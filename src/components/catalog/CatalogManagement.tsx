
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ServiceManagement } from "../services/ServiceManagement";
import { MembershipsManagement } from "./MembershipsManagement";
import { VouchersManagement } from "./VouchersManagement";
import { ProductsManagement } from "./ProductsManagement";

export const CatalogManagement = () => {
  const [activeTab, setActiveTab] = useState("services");

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b bg-white px-6 py-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Catalog Management</h1>
          <p className="text-gray-600">Manage your services, products, memberships, and vouchers</p>
        </div>
      </div>
      
      <div className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="memberships">Memberships</TabsTrigger>
            <TabsTrigger value="vouchers">Vouchers</TabsTrigger>
          </TabsList>
          
          <TabsContent value="services" className="mt-6">
            <ServiceManagement />
          </TabsContent>
          
          <TabsContent value="products" className="mt-6">
            <ProductsManagement />
          </TabsContent>
          
          <TabsContent value="memberships" className="mt-6">
            <MembershipsManagement />
          </TabsContent>
          
          <TabsContent value="vouchers" className="mt-6">
            <VouchersManagement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
