import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Phone, 
  Calendar, 
  Clock, 
  User, 
  CreditCard,
  MoreVertical,
  UserPlus,
  Calendar as CalendarIcon,
  Plus
} from "lucide-react";

interface Appointment {
  id: number;
  clientName: string;
  service: string;
  time: string;
  memberId: number;
  startSlot: number;
  duration: number;
  status: string;
}

interface AppointmentDetailSheetProps {
  appointment: Appointment | null;
  isOpen: boolean;
  onClose: () => void;
  teamMember?: {
    id: number;
    name: string;
    initial: string;
    color: string;
  };
  newAppointmentData?: {
    memberId: number;
    time: string;
  } | null;
}

export const AppointmentDetailSheet = ({ 
  appointment, 
  isOpen, 
  onClose,
  teamMember,
  newAppointmentData
}: AppointmentDetailSheetProps) => {
  const [isCheckedOut, setIsCheckedOut] = useState(false);

  // Handle new appointment creation
  if (newAppointmentData && !appointment) {
    return (
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side="right" className="w-96 p-0">
          <div className="bg-blue-500 text-white p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">New Appointment</span>
              <Badge variant="secondary" className="bg-white/20 text-white border-none">
                Create
              </Badge>
            </div>
            <div className="text-sm opacity-90 mb-3">{newAppointmentData.time}</div>
            <div className="flex items-center space-x-3">
              <Avatar className="h-12 w-12">
                <AvatarFallback className={`${teamMember?.color} font-bold text-lg`}>
                  {teamMember?.initial}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-semibold text-lg">{teamMember?.name}</h2>
                <p className="text-blue-100 text-sm">Available for booking</p>
              </div>
            </div>
          </div>
          
          <div className="p-4">
            <Button className="w-full bg-blue-500 hover:bg-blue-600">
              Create New Appointment
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  if (!appointment) return null;

  const clientPhone = "+971 50 494 5952";
  const createdDate = "19 Jul 2024";
  
  // Parse services from appointment
  const services = appointment.service.includes("Classic Manicure") && appointment.service.includes("Classic Pedicure") 
    ? [
        { name: "Classic Pedicure", time: "9:00pm", duration: "1h", price: 90, teamMember: "Patricia", available: false },
        { name: "Classic Manicure", time: "9:00pm", duration: "1h", price: 75, teamMember: "Angelica", available: true }
      ]
    : [{ 
        name: appointment.service, 
        time: "9:00pm", 
        duration: "1h", 
        price: appointment.service.includes("Classic Manicure") ? 75 : 
               appointment.service.includes("Classic Pedicure") ? 90 : 85,
        teamMember: teamMember?.name || "Angelica",
        available: true
      }];

  const total = services.reduce((sum, service) => sum + service.price, 0);

  const handleCheckout = () => {
    setIsCheckedOut(true);
  };

  const handlePayNow = () => {
    // Handle payment logic
    console.log("Processing payment...");
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-96 p-0">
        {/* Header */}
        <div className="bg-green-500 text-white p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Mon 2 Jun</span>
            <Badge variant="secondary" className="bg-white/20 text-white border-none">
              Started
            </Badge>
          </div>
          <div className="text-sm opacity-90 mb-3">9:00pm • Doesn't repeat</div>
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="bg-white text-green-500 font-bold text-lg">
                K
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-semibold text-lg">{appointment.clientName}</h2>
              <p className="text-green-100 text-sm">{clientPhone}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-6">
          {/* Actions */}
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" className="flex-1">
              <MoreVertical className="w-4 h-4 mr-2" />
              Actions
            </Button>
            <Button variant="outline" size="sm">
              View profile
            </Button>
          </div>

          {/* Client Actions */}
          <div className="space-y-2">
            <Button variant="ghost" size="sm" className="w-full justify-start text-blue-600 hover:text-blue-700">
              <UserPlus className="w-4 h-4 mr-2" />
              Add pronouns
            </Button>
            <Button variant="ghost" size="sm" className="w-full justify-start text-blue-600 hover:text-blue-700">
              <CalendarIcon className="w-4 h-4 mr-2" />
              Add date of birth
            </Button>
            <div className="flex items-center py-2">
              <User className="w-4 h-4 mr-2 text-gray-500" />
              <span className="text-sm text-gray-600">Created {createdDate}</span>
            </div>
          </div>

          <Separator />

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-3">Services</h3>
            <div className="space-y-3">
              {services.map((service, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-3 py-2">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-medium">{service.name}</p>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <span>{service.time} • {service.duration} • </span>
                        <span className="text-red-500 ml-1">♥</span>
                        <span className="ml-1">{service.teamMember}</span>
                      </div>
                      {!service.available && (
                        <div className="flex items-center mt-1">
                          <div className="w-4 h-4 rounded-full bg-orange-100 flex items-center justify-center mr-2">
                            <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                          </div>
                          <span className="text-sm text-orange-600">Team member is not available</span>
                        </div>
                      )}
                    </div>
                    <span className="font-semibold">AED {service.price}</span>
                  </div>
                </div>
              ))}
              
              <Button variant="ghost" size="sm" className="w-full justify-start mt-3">
                <Plus className="w-4 h-4 mr-2" />
                <span className="text-blue-600">Add service</span>
              </Button>
              
              <div className="text-right text-sm text-gray-500 mt-2">
                2h
              </div>
            </div>
          </div>

          <Separator />

          {/* Total */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-semibold">Total (incl. tax)</span>
              <span className="font-bold text-lg">AED {total}</span>
            </div>
            
            {!isCheckedOut ? (
              <div className="flex space-x-2">
                <Button 
                  className="flex-1 bg-green-500 hover:bg-green-600"
                  onClick={handlePayNow}
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  Pay now
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={handleCheckout}
                >
                  Checkout
                </Button>
              </div>
            ) : (
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <MoreVertical className="w-4 h-4" />
                </Button>
                <Button 
                  className="flex-1 bg-green-500 hover:bg-green-600"
                  onClick={handlePayNow}
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  Pay now
                </Button>
                <Button 
                  variant="default" 
                  className="flex-1 bg-black hover:bg-gray-800 text-white"
                >
                  Checkout
                </Button>
              </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
