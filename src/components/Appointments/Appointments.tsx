import React, { useState, useMemo } from 'react';
import { DndContext, useDraggable, useDroppable, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus, User, Clock, ChevronLeft, ChevronRight, Calendar, X, Cake, UserPlus, Users, MoreHorizontal, AlertCircle, Loader2, StickyNote, FileText, Repeat, Users2, History, XCircle, Trash2, Search, PersonStanding, CreditCard, Banknote, Smartphone, Gift, Split, DollarSign, CreditCard as Card, Star } from 'lucide-react';
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { AppointmentsHeader } from "./AppointmentsHeader";

// Update the type definitions at the top of the file
type Service = {
  id: string;  // Added id field
  name: string;
  duration: string;
  price: string;
};

type Client = {
  id: number;  // Changed to number to match your data
  name: string;
  phone: string;
  initial: string;  // Added missing fields
  pronouns?: string;
  dob?: string;
  createdAt: string;
};

type Appointment = {
  id: number;
  client: Client | null;
  services: Service[];
  staffId: number;
  date: Date;
  startTime: string;
  endTime: string;
  notes: string;
};

// Sample staff data based on the interface
const staffMembers = [
  { id: 1, name: "Areej", initial: "A" },
  { id: 2, name: "Jenny", initial: "J" },
  { id: 3, name: "Emy", initial: "E" },
  { id: 4, name: "Nadeen", initial: "N" },
  { id: 5, name: "Raghe", initial: "R" },
  { id: 6, name: "Rawan", initial: "R" },
  { id: 7, name: "Jannat", initial: "J" },
  { id: 8, name: "Samar", initial: "S" }
];

const allClients = [
    { id: 1, name: '1111', phone: '+971 52 460 0004', initial: '1', pronouns: 'they/them', dob: 'Jan 1, 1990', createdAt: '18 Mar 2025' },
    { id: 2, name: 'Mohamad', phone: '+971 50 987 6543', initial: 'M', createdAt: '12 Feb 2024' },
    { id: 3, name: 'Aakriti', phone: '+971 58 515 0142', initial: 'A' },
    { id: 4, name: 'Aashna', phone: '+971 55 266 1402', initial: 'A' },
    { id: 5, name: 'Abbas', phone: '+971 50 117 7256', initial: 'A' },
    { id: 6, name: 'Abby', phone: '+971 58 522 3238', initial: 'A' },
    { id: 7, name: 'Abdel', phone: '+971 50 265 5422', initial: 'A' },
    { id: 8, name: 'Abdul', phone: '+971 58 512 1948', initial: 'A' },
    { id: 9, name: 'Abdulla', phone: '+971 50 889 6666', initial: 'A' },
    { id: 10, name: 'Abdulrahaman', phone: '+971 50 926 1101', initial: 'A' },
];

const serviceColors = ['#FBBF24', '#38BDF8', '#A78BFA', '#F87171', '#4ADE80'];

// Sample services
const services = [
  'Classic Manicure', 'Classic Pedicure', 'Gel Manicure', 'Walk-In Haircut', 
  'Hair Color', 'Eyebrow Threading', 'Upper Lip Threading', 'Facial Treatment',
  'Massage Therapy', 'Nail Art', 'Hair Styling', 'Wax Service'
];

// Generate time slots from 8:00 AM to 11:59 PM
const timeSlots = Array.from({ length: 64 }, (_, i) => {
  const hour = Math.floor(i / 4) + 8;  // Start from 8
  const minute = (i % 4) * 15;
  return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
});

// Sample services with pricing
const servicesData = [
  { name: 'APPLE Beard Dye', duration: '1h', price: 'AED 30' },
  { name: 'Haircut+ blowdry', duration: '1h', price: 'from AED 220' },
  { name: 'Haircut+ blowdry', duration: '1h', price: 'AED 250' },
  { name: 'Haircut+ blowdry', duration: '1h', price: 'AED 300' },
  { name: 'Haircut+ blowdry', duration: '1h', price: 'AED 350' },
  { name: 'Children Color (Spray)', duration: '1h', price: 'AED 10' },
  { name: 'Children Color (Spray)', duration: '1h', price: 'AED 20' },
  { name: "Children's haircut", duration: '1h', price: 'AED 50' },
  { name: "Children's haircut", duration: '1h', price: 'AED 80' },
  { name: "Children's haircut", duration: '1h', price: 'AED 150' },
  { name: "Children's haircut", duration: '1h', price: 'AED 200' },
  { name: 'Hair Cut', duration: '20min', price: 'AED 80' },
  { name: 'Wavy', duration: '1h', price: 'AED 100' },
  { name: 'Blow dry', duration: '1h', price: 'AED 190' },
];

// Get current time indicator position
const getCurrentTimePosition = () => {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  
  if (currentHour < 8 || currentHour >= 20) return -1;
  
  const totalMinutesFromStart = (currentHour - 8) * 60 + currentMinute;
  const slotHeight = 16; // Height of each 15-minute slot in pixels
  return (totalMinutesFromStart / 15) * slotHeight;
};

// Helper functions for date manipulation
const formatDate = (date) => {
  return date.toLocaleDateString('en-US', { 
    weekday: 'short', 
    month: 'short', 
    day: 'numeric' 
  });
};

const getWeekDates = (currentDate) => {
  const startOfWeek = new Date(currentDate);
  const day = startOfWeek.getDay();
  const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
  startOfWeek.setDate(diff);
  
  const weekDates = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    weekDates.push(date);
  }
  return weekDates;
};

const isSameDate = (date1, date2) => {
  if (!date1 || !date2) return false;
  return date1.toDateString() === date2.toDateString();
};

const AddNewClientDialog = ({ isOpen, onClose, onSave }) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState<{name?: string, phone?: string}>({});

    const validate = () => {
        const newErrors: {name?: string, phone?: string} = {};
        if (!name) newErrors.name = "Name is required";
        if (!phone) newErrors.phone = "Phone number is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = () => {
        if (validate()) {
            const newClient = {
                id: Date.now(),
                name,
                phone,
                email,
                initial: name.charAt(0).toUpperCase(),
                createdAt: formatDate(new Date())
            };
            onSave(newClient);
            onClose();
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Client</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div>
                        <Label htmlFor="new-client-name">Name *</Label>
                        <Input id="new-client-name" value={name} onChange={(e) => setName(e.target.value)} />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div>
                        <Label htmlFor="new-client-phone">Phone Number *</Label>
                        <Input id="new-client-phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                    </div>
                    <div>
                        <Label htmlFor="new-client-email">Email</Label>
                        <Input id="new-client-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                </div>
                <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

const CancellationDialog = ({ isOpen, onClose, onConfirm }) => {
  const [reason, setReason] = useState("");
  const [otherReason, setOtherReason] = useState("");

  const cancellationReasons = [
    "Client is a no show",
    "Client cancelled",
    "Client rescheduled",
    "Service provider cancelled",
    "Other"
  ];

  const handleConfirm = () => {
    const finalReason = reason === "Other" ? otherReason : reason;
    onConfirm(finalReason);
  };

  const handleClose = () => {
      setReason("");
      setOtherReason("");
      onClose();
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cancel Booking</DialogTitle>
          <DialogDescription>
            Are you sure you want to cancel this booking? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <Label>Reason for cancellation</Label>
          <Select onValueChange={setReason} value={reason}>
            <SelectTrigger>
              <SelectValue placeholder="Select a reason" />
            </SelectTrigger>
            <SelectContent>
              {cancellationReasons.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
            </SelectContent>
          </Select>
          {reason === 'Other' && (
            <Textarea
              placeholder="Please specify the reason for cancellation."
              value={otherReason}
              onChange={(e) => setOtherReason(e.target.value)}
            />
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>Keep booking</Button>
          <Button variant="destructive" onClick={handleConfirm}>Cancel booking</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const CheckoutSheet = ({ isOpen, onClose, services, onConfirm }) => {
  const [selectedPayment, setSelectedPayment] = useState("");
  
  const paymentMethods = [
    { id: "cash", name: "Cash", icon: Banknote, color: "text-green-600" },
    { id: "gift", name: "Gift card", icon: Gift, color: "text-purple-600" },
    { id: "split", name: "Split payment", icon: Split, color: "text-blue-600" },
    { id: "courtesy", name: "Courtesy", icon: DollarSign, color: "text-orange-600" },
    { id: "online", name: "Online", icon: CreditCard, color: "text-indigo-600" },
    { id: "card", name: "Card", icon: Card, color: "text-gray-800" },
    { id: "loyalty", name: "Loyalty points", icon: Star, color: "text-yellow-600" }
  ];

  const subtotal = services.reduce((acc, s) => acc + parseInt(s.price.replace(/from AED |AED /g, '')), 0);
  const tax = subtotal * 0.05; // 5% VAT
  const total = subtotal + tax;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="!w-[900px] !max-w-[900px] p-0">
        {/* Header Section */}
        <div className="p-4 border-b flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={onClose}
          >
            <X size={20} />
          </Button>
          <div>
            <h2 className="text-lg font-semibold">Checkout</h2>
            <p className="text-sm text-gray-600">Sat, Jun 7 at 09:00</p>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex h-[calc(100vh-64px)]">
          {/* Left Side - Payment Methods */}
          <div className="w-1/2 border-r">
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-base text-gray-600">Cart</span>
                <span className="text-base text-gray-600">•</span>
                <span className="text-base font-medium">Payment</span>
              </div>
              <h2 className="text-3xl font-semibold">Select payment</h2>
              
              <div className="mt-8">
                <h3 className="text-xl font-medium mb-6">Payment methods</h3>
                <div className="grid grid-cols-3 gap-4">
                  {paymentMethods.map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setSelectedPayment(method.id)}
                      className={`relative flex flex-col items-center justify-center p-6 rounded-lg border transition-all ${
                        selectedPayment === method.id 
                        ? 'border-purple-600 bg-white shadow-sm' 
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      <div className="mb-4">
                        <method.icon className={`w-7 h-7 ${method.color}`} />
                      </div>
                      <span className="text-base font-medium text-gray-900">{method.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Order Summary */}
          <div className="w-1/2 flex flex-col">
            <div className="p-6 border-b flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-2xl font-medium">1111</span>
                <span className="text-base text-gray-600">+971 52 460 0004</span>
              </div>
              <Button variant="outline" size="sm">
                Actions
              </Button>
            </div>

            <div className="flex-1 p-6">
              <div className="space-y-6">
                {services.map((service, index) => (
                  <div key={index} className="flex justify-between items-start pb-6 border-b border-gray-100 last:border-0">
                    <div>
                      <p className="text-lg font-medium mb-2">{service.name}</p>
                      <p className="text-base text-gray-500">1h • Mohamad</p>
                    </div>
                    <span className="text-lg font-medium">AED {service.price.replace(/from AED |AED /g, '')}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 border-t mt-auto bg-gray-50">
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-base">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">AED {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-base">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">AED {tax.toFixed(2)}</span>
                </div>
                <Separator className="my-4" />
                <div className="flex justify-between text-xl font-semibold">
                  <span>Total</span>
                  <span>AED {total.toFixed(2)}</span>
                </div>
                {selectedPayment && (
                  <div className="flex justify-between items-center bg-white p-4 rounded-lg mt-6 border">
                    <div className="flex items-center gap-3">
                      <span className="text-base font-medium">
                        {paymentMethods.find(m => m.id === selectedPayment)?.name}
                      </span>
                    </div>
                    <span className="text-base font-medium">AED {total.toFixed(2)}</span>
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <Button variant="outline" size="icon" className="h-14 w-14">
                  <MoreHorizontal className="h-5 w-5" />
                </Button>
                <Button 
                  className="flex-1 bg-gray-900 hover:bg-gray-800 text-white h-14 text-base font-medium"
                  onClick={() => onConfirm(selectedPayment)}
                  disabled={!selectedPayment}
                >
                  Pay now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

const AppointmentsCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isServicePanelOpen, setIsServicePanelOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<{ staffId: number; date: Date; timeSlot: string } | null>(null);
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [client, setClient] = useState<Client | null>(null);
  const [isAddingService, setIsAddingService] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showSaveConfirmation, setShowSaveConfirmation] = useState(false);
  const [editingAppointmentId, setEditingAppointmentId] = useState<number | null>(null);
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [isSelectingClient, setIsSelectingClient] = useState(false);
  const [clientSearchTerm, setClientSearchTerm] = useState("");
  const [isAddingNewClient, setIsAddingNewClient] = useState(false);
  const [clients, setClients] = useState<Client[]>(allClients as Client[]);
  const [isCancelling, setIsCancelling] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const [formData, setFormData] = useState({
    client: '',
    phone: '',
    service: '',
    notes: ''
  });

  const filteredServices = servicesData.filter(service =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredClients = clients.filter(c => 
    c.name.toLowerCase().includes(clientSearchTerm.toLowerCase()) ||
    c.phone?.includes(clientSearchTerm) ||
    c.phone === clientSearchTerm
  );

  const currentTimePosition = getCurrentTimePosition();
  const weekDates = useMemo(() => getWeekDates(currentDate), [currentDate]);

  const navigateWeek = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + (direction * 7));
    setCurrentDate(newDate);
  };

  const navigateDay = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + direction);
    setCurrentDate(newDate);
  };

  const handleTimeSlotClick = (staffId, date, timeSlot) => {
    setEditingAppointmentId(null);
    setSelectedSlot({ staffId, date, timeSlot });
    setSelectedServices([]);
    setClient(null);
    setSearchTerm('');
    setIsAddingService(false);
    setIsSelectingClient(true);
    setIsServicePanelOpen(true);
  };

  const handleAppointmentClick = (appointment) => {
    setEditingAppointmentId(appointment.id);
    setSelectedSlot({ 
        staffId: appointment.staffId, 
        date: appointment.date, 
        timeSlot: appointment.startTime 
    });
    setSelectedServices(appointment.services);
    setClient(appointment.client);
    setIsServicePanelOpen(true);
    setIsAddingService(false);
    setIsSelectingClient(false);
  };

  const handleServiceSelect = (service) => {
    setSelectedServices([...selectedServices, service]);
    setIsAddingService(false);
    setSearchTerm('');
  };

  const handleAddServiceClick = () => {
    setIsAddingService(true);
  }

  const handleRemoveService = (index) => {
    setSelectedServices(selectedServices.filter((_, i) => i !== index));
  };

  const proceedToClientForm = () => {
    setIsServicePanelOpen(false);
    setFormData({ 
      client: '', 
      phone: '', 
      service: selectedServices.map(s => s.name).join(', '), 
      notes: '' 
    });
    setIsDialogOpen(true);
  };

  const handleSaveAppointment = () => {
    if (!selectedSlot || selectedServices.length === 0) return;

    setIsSaving(true);

    const totalDurationMinutes = selectedServices.reduce((acc, service) => {
        return acc + calculateServiceDuration(service.duration);
    }, 0);

    const startTime = new Date(selectedSlot.date);
    const [startHours, startMinutes] = selectedSlot.timeSlot.split(':').map(Number);
    startTime.setHours(startHours, startMinutes);

    const endTime = new Date(startTime.getTime() + totalDurationMinutes * 60000);

    const appointmentData = {
      id: editingAppointmentId || Date.now(),
      client: client,
      services: selectedServices,
      staffId: selectedSlot.staffId,
      date: selectedSlot.date,
      startTime: selectedSlot.timeSlot,
      endTime: `${endTime.getHours().toString().padStart(2, '0')}:${endTime.getMinutes().toString().padStart(2, '0')}`,
      notes: ""
    };

    setTimeout(() => {
        if (editingAppointmentId) {
            setAppointments(appointments.map(a => a.id === editingAppointmentId ? appointmentData : a));
        } else {
            setAppointments([...appointments, appointmentData]);
        }
        setIsSaving(false);
        setIsServicePanelOpen(false);
    setSelectedSlot(null);
        setSelectedServices([]);
        setClient(null);
        setEditingAppointmentId(null);

        setShowSaveConfirmation(true);
        setTimeout(() => {
            setShowSaveConfirmation(false);
        }, 3000);
    }, 1500);
  };

  const getAppointmentForSlot = (staffId, date, timeSlot) => {
    return appointments.find(apt => 
      apt.staffId === staffId && 
      isSameDate(apt.date, date) && 
      apt.startTime === timeSlot
    );
  };

  const isTimeSlotBooked = (staffId, date, timeSlot) => {
    const newAptId = editingAppointmentId;
    return appointments.some(apt => {
      if (apt.id === newAptId) return false;
      if (apt.staffId !== staffId || !isSameDate(apt.date, date)) return false;
      
      const slotDate = new Date(date);
      const [slotH, slotM] = timeSlot.split(':').map(Number);
      slotDate.setHours(slotH, slotM, 0, 0);

      const aptStart = new Date(date);
      const [startH, startM] = apt.startTime.split(':').map(Number);
      aptStart.setHours(startH, startM, 0, 0);

      const aptEnd = new Date(date);
      const [endH, endM] = apt.endTime.split(':').map(Number);
      aptEnd.setHours(endH, endM, 0, 0);
      
      return slotDate >= aptStart && slotDate < aptEnd;
    });
  };

  const QuickActionsPopup = ({ onClose }) => (
    <div className="absolute bottom-16 left-4 w-64 bg-white rounded-lg shadow-2xl z-30 border" onClick={(e) => e.stopPropagation()}>
        <div className="p-4">
            <h4 className="font-bold mb-4">Quick actions</h4>
            <div className="space-y-1">
                <button className="w-full flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 text-sm">
                    <StickyNote size={16} /> Add a note
                </button>
                <button className="w-full flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 text-sm">
                    <FileText size={16} /> Add a form
                </button>
                <div className="border-t my-2" />
                <button className="w-full flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 text-sm">
                    <History size={16} /> View appointment activity
                </button>
                <button className="w-full flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 text-sm">
                    <Repeat size={16} /> Set as repeating
                </button>
                <button className="w-full flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 text-sm">
                    <Users2 size={16} /> Add to group appointment
                </button>
                <button className="w-full flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 text-sm">
                    Rebook
                </button>
                <div className="border-t my-2" />
                <button className="w-full flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 text-sm">
                    Reschedule
                </button>
                <button className="w-full flex items-center gap-3 p-2 rounded-md hover:bg-red-50 text-red-600 text-sm">
                    <XCircle size={16} /> No-show
                </button>
                <button className="w-full flex items-center gap-3 p-2 rounded-md hover:bg-red-50 text-red-600 text-sm">
                    <Trash2 size={16} /> Cancel
                </button>
            </div>
        </div>
    </div>
  );

  const AppointmentBlock = ({ 
    appointment,
    style,
    onClick 
  }: { 
    appointment: Appointment;
    style: { top: string; height: string };
    onClick: (appointment: Appointment) => void;
  }) => {
    const {attributes, listeners, setNodeRef, transform, isDragging} = useDraggable({
        id: appointment.id,
        data: { 
          appointment,
          originalTop: style.top,
          originalHeight: style.height
        },
    });

    const totalDuration = appointment.services.reduce((acc, service) => {
        return acc + calculateServiceDuration(service.duration);
    }, 0);

    const draggableStyle = {
        ...(transform ? {
            transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
            position: 'absolute' as const,
            left: '2px',
            right: '2px',
            height: style.height,
            top: style.top,
            zIndex: isDragging ? 1000 : 10,
            opacity: isDragging ? 0.8 : 1,
            cursor: isDragging ? 'grabbing' : 'grab',
            transition: !isDragging ? 'transform 200ms cubic-bezier(0.2, 0, 0, 1)' : undefined,
            boxShadow: isDragging ? 
              '0 16px 24px -2px rgba(0, 0, 0, 0.1), 0 6px 12px -2px rgba(0, 0, 0, 0.08)' :
              '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        } : {
            position: 'absolute' as const,
            left: '2px',
            right: '2px',
            height: style.height,
            top: style.top,
            zIndex: 10,
            cursor: 'grab',
            transition: 'transform 200ms cubic-bezier(0.2, 0, 0, 1), box-shadow 200ms cubic-bezier(0.2, 0, 0, 1)',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        })
    };
    
    return (
        <div
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            className={`absolute rounded-md overflow-hidden flex flex-col ${
              isDragging ? 'ring-2 ring-blue-500 ring-opacity-50' : ''
            }`}
            style={draggableStyle}
            onClick={(e) => {
              if (!isDragging) {
                onClick(appointment);
              }
              e.stopPropagation();
            }}
        >
            <div className="absolute inset-0 flex flex-col">
                {appointment.services.map((service, index) => {
                    const serviceDuration = calculateServiceDuration(service.duration);
                    const heightPercentage = (serviceDuration / totalDuration) * 100;
                    return (
                      <div 
                        key={`${service.name}-${index}`}
                        style={{ 
                          height: `${heightPercentage}%`, 
                          backgroundColor: serviceColors[index % serviceColors.length],
                          opacity: isDragging ? 0.9 : 0.8,
                          transition: 'opacity 200ms ease'
                        }} 
                      />
                    );
                })}
            </div>
            <div className={`relative z-10 text-black text-xs p-1 flex flex-col h-full ${
              isDragging ? 'pointer-events-none' : ''
            }`}>
                {appointment.services.map((service, index) => {
                    const serviceDuration = calculateServiceDuration(service.duration);
                    const flexGrow = serviceDuration / 15;
                    return (
                        <div key={`${service.name}-${index}`} className="overflow-hidden" style={{ flexGrow: flexGrow }}>
                            <p className="font-bold truncate">{appointment.client?.name ?? 'Walk-In'}</p>
                            <p className="truncate">{service.name}</p>
                        </div>
                    )
                })}
            </div>
            <div className={`absolute top-1/2 -translate-y-1/2 left-full ml-2 w-64 bg-white p-4 rounded-lg shadow-2xl z-20 ${
              isDragging ? 'hidden' : 'hidden group-hover:block'
            } pointer-events-none`}>
                <div className="font-bold text-blue-600 bg-blue-100 p-2 rounded-t-lg text-center -mt-4 mx-[-16px] mb-4">
                    {appointment.startTime} - {appointment.endTime} Booked
                </div>
                <div className="p-2">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                            <User size={24} className="text-purple-600" />
                        </div>
                        <span className="font-semibold">{appointment.client ? appointment.client.name : 'Walk-In'}</span>
                    </div>
                    {appointment.services.map((service, index) => (
                       <div key={`${service.name}-${index}`} className="flex justify-between items-center text-sm mb-1">
                           <span>{service.name}</span>
                           <span className="font-semibold">{service.price}</span>
                       </div>
                    ))}
                    <div className="text-xs text-gray-500 mt-2">
                        {staffMembers.find(s => s.id === appointment.staffId)?.name} &middot; {totalDuration}m
                    </div>
                </div>
            </div>
        </div>
    );
  };

  const StaffColumn = ({ staff, children }) => {
    const { setNodeRef, isOver } = useDroppable({ 
      id: staff.id.toString(),  // Ensure ID is a string
      data: { staffId: staff.id }
    });
    
    return (
      <div 
        ref={setNodeRef} 
        className={`relative border-r min-w-0 ${isOver ? 'bg-blue-50' : ''}`}
        data-staff-id={staff.id}
      >
        {children}
      </div>
    );
  };

  const handleDragEnd = (event) => {
    const { over, active } = event;
    if (!over || !active) return;

    const appointmentId = active.id;
    const appointment = appointments.find(apt => apt.id === appointmentId);
    if (!appointment) return;

    const newStaffId = parseInt(over.id);
    
    // Find the staff column element
    const staffColumn = document.querySelector(`[data-staff-id="${newStaffId}"]`);
    if (!staffColumn) return;

    // Get the time slots container
    const timeSlotsContainer = staffColumn.querySelector('.relative');
    if (!timeSlotsContainer) return;

    // Get container bounds and scroll position
    const containerRect = timeSlotsContainer.getBoundingClientRect();
    const scrollContainer = staffColumn.closest('.overflow-auto');
    const scrollTop = scrollContainer ? scrollContainer.scrollTop : 0;

    // Calculate position relative to the time slots container
    const mouseY = event.y;
    const containerY = containerRect.top;
    const relativeY = mouseY - containerY + scrollTop;

    // Each 15-minute block is 16px high
    const blockHeight = 16;
    
    // Calculate the number of 15-minute blocks from the top
    let blocksFromTop = Math.round(relativeY / blockHeight);
    
    // Calculate total minutes from 8:00 AM
    const minutesFromStart = blocksFromTop * 15;
    const totalMinutes = 8 * 60 + minutesFromStart; // 8 hours in minutes + offset

    // Calculate hour and minute
    let hour = Math.floor(totalMinutes / 60);
    let minute = Math.floor((totalMinutes % 60) / 15) * 15;

    // Calculate appointment duration in minutes
    const durationMinutes = appointment.services.reduce((acc, service) => {
        return acc + calculateServiceDuration(service.duration);
    }, 0);

    // Ensure the appointment doesn't start before 8:00 AM
    if (hour < 8) {
      hour = 8;
      minute = 0;
    }

    // Ensure the appointment doesn't end after 11:59 PM
    const endTimeMinutes = (hour * 60 + minute) + durationMinutes;
    if (endTimeMinutes > (24 * 60)) {
      // Adjust start time so appointment ends at 11:59 PM
      hour = Math.floor((24 * 60 - durationMinutes) / 60);
      minute = Math.floor(((24 * 60 - durationMinutes) % 60) / 15) * 15;
    }

    const newStartTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
    
    // Calculate end time
    const startDate = new Date(currentDate);
    startDate.setHours(hour, minute);
    const endDate = new Date(startDate.getTime() + durationMinutes * 60000);
    const newEndTime = `${endDate.getHours().toString().padStart(2, '0')}:${endDate.getMinutes().toString().padStart(2, '0')}`;

    // Check for overlapping appointments
    const hasOverlap = appointments.some(apt => {
      if (apt.id === appointmentId) return false; // Skip the appointment being dragged
      if (apt.staffId !== newStaffId) return false; // Only check appointments in the same column
      if (!isSameDate(apt.date, currentDate)) return false; // Only check appointments on the same day

      const aptStart = new Date(currentDate);
      const [aptStartH, aptStartM] = apt.startTime.split(':').map(Number);
      aptStart.setHours(aptStartH, aptStartM);

      const aptEnd = new Date(currentDate);
      const [aptEndH, aptEndM] = apt.endTime.split(':').map(Number);
      aptEnd.setHours(aptEndH, aptEndM);

      const newStart = new Date(currentDate);
      newStart.setHours(hour, minute);

      const newEnd = new Date(startDate.getTime() + durationMinutes * 60000);

      return (
        (newStart >= aptStart && newStart < aptEnd) || // New start time overlaps with existing appointment
        (newEnd > aptStart && newEnd <= aptEnd) || // New end time overlaps with existing appointment
        (newStart <= aptStart && newEnd >= aptEnd) // New appointment completely encompasses existing appointment
      );
    });

    if (hasOverlap) {
      // If there's an overlap, return the appointment to its original position
      return;
    }

    // Update the appointment
    setAppointments(prevAppointments => {
      return prevAppointments.map(apt => {
        if (apt.id === appointmentId) {
          return {
            ...apt,
            staffId: newStaffId,
            date: currentDate,
            startTime: newStartTime,
            endTime: newEndTime
          };
        }
        return apt;
      });
    });
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const renderService = (service, index, isEditable) => {
    const isNotAvailable = service.name === 'Wavy'; // Mocking the availability warning
    const serviceStartTime = new Date(selectedSlot.date);
    const [startHours, startMinutes] = selectedSlot.timeSlot.split(':').map(Number);

    let cumulativeDuration = 0;
    for (let i = 0; i < index; i++) {
      const duration = selectedServices[i].duration;
      const value = calculateServiceDuration(duration);
      cumulativeDuration += value;
    }

    serviceStartTime.setHours(startHours, startMinutes + cumulativeDuration);
    const timeString = `${serviceStartTime.getHours().toString().padStart(2, '0')}:${serviceStartTime.getMinutes().toString().padStart(2, '0')}`;

    return (
      <div key={index} className="flex justify-between items-start mb-4">
        <div className="flex gap-3">
          <div className="w-1 self-stretch rounded" style={{ backgroundColor: serviceColors[index % serviceColors.length] }} />
          <div>
            <div className="font-medium">{service.name}</div>
            <div className="text-sm text-gray-500">
              {timeString} &middot; {service.duration} &middot; {staffMembers.find(s => s.id === selectedSlot.staffId)?.name}
            </div>
            {isNotAvailable && (
              <div className="mt-1 flex items-center text-xs text-yellow-600 bg-yellow-100 px-2 py-1 rounded-md">
                <AlertCircle size={14} className="mr-1" />
                Team member is not available
              </div>
            )}
          </div>
        </div>
        <div className='flex items-center'>
          <span className="font-semibold">{service.price}</span>
          {isEditable && (
            <Button variant="ghost" size="icon" onClick={() => handleRemoveService(index)} className="ml-2 w-8 h-8">
              <X size={16} />
            </Button>
          )}
        </div>
      </div>
    )
  };

  const handleCheckout = () => {
    setIsCheckoutOpen(true);
  };

  const handlePaymentConfirm = (paymentMethod) => {
    // Process payment here
    console.log(`Processing payment via ${paymentMethod}`);
    setIsCheckoutOpen(false);
    handleSaveAppointment();
  };

  // Fix the service duration parsing
  const calculateServiceDuration = (duration: string): number => {
    const value = parseInt(duration);
    if (duration.includes('h')) {
      return value * 60;
    }
    if (duration.includes('min')) {
      return value;
    }
    return 0;
  };

  return (
    <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
        <div className="appointments-calendar h-screen p-4 bg-gray-50 relative">
        {showSaveConfirmation && (
            <div className="absolute top-5 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-4 py-2 rounded-md shadow-lg z-50">
              Appointment saved
            </div>
        )}
        <div className="bg-white rounded-lg shadow-lg h-full flex flex-col">
          <AppointmentsHeader 
            currentDate={currentDate}
            onDateChange={setCurrentDate}
          />
          
          {/* Calendar Grid */}
          <div className="flex-1 overflow-auto relative">
            {/* Current time indicator */}
            {currentTimePosition >= 0 && (
              <div 
                className="absolute left-0 right-0 h-0.5 bg-red-500 z-10"
                style={{ top: `${80 + currentTimePosition}px` }}
              />
            )}
            
            <div className="grid grid-cols-9 min-w-full">
              {/* Time column */}
              <div className="border-r bg-gray-50">
                <div className="h-20 border-b flex items-center justify-center font-semibold text-gray-600">
                  <Clock size={16} />
                </div>
                {timeSlots.map((time, index) => {
                  const isHourMark = time.endsWith(':00');
                  return (
                    <div 
                      key={index} 
                      className={`h-4 flex items-center justify-center text-xs text-gray-600 px-2 ${
                        isHourMark ? 'border-b border-gray-300 font-medium' : 'border-b border-gray-100'
                      }`}
                    >
                      {isHourMark ? time : ''}
                    </div>
                  );
                })}
              </div>
              
              {/* Staff columns */}
              {staffMembers.map(staff => (
                <StaffColumn staff={staff} key={staff.id}>
                  {/* Staff header */}
                  <div className="h-20 border-b bg-gray-50 flex flex-col items-center justify-center p-2">
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm mb-1"
                      style={{ backgroundColor: '#4A90E2' }}
                    >
                      {staff.initial}
                    </div>
                    <div className="font-semibold text-xs text-center text-gray-800">
                      {staff.name}
                    </div>
                  </div>
                  
                  {/* Time slots for this staff member */}
                  <div className="relative">
                  {timeSlots.map((timeSlot, timeIndex) => {
                      const isBooked = isTimeSlotBooked(staff.id, currentDate, timeSlot);
                    const isHourMark = timeSlot.endsWith(':00');
                    
                    return (
                      <div 
                        key={timeIndex}
                          className={`h-4 relative ${
                            isBooked ? '' : 'cursor-pointer hover:bg-blue-50'
                          } transition-colors ${isHourMark ? 'border-b border-gray-300' : 'border-b border-gray-100'}`}
                          onClick={() => !isBooked && handleTimeSlotClick(staff.id, currentDate, timeSlot)}
                        />
                      );
                    })}

                    {appointments
                      .filter(apt => apt.staffId === staff.id && isSameDate(apt.date, currentDate))
                      .map(appointment => {
                        const startMinutes = parseInt(appointment.startTime.split(':')[0]) * 60 + parseInt(appointment.startTime.split(':')[1]);
                        const endMinutes = parseInt(appointment.endTime.split(':')[0]) * 60 + parseInt(appointment.endTime.split(':')[1]);
                        
                        const calendarStartMinutes = 8 * 60;
                        
                        const top = ((startMinutes - calendarStartMinutes) / 15) * 16;
                        const height = ((endMinutes - startMinutes) / 15) * 16;

                        return (
                          <AppointmentBlock 
                            key={appointment.id}
                            appointment={appointment}
                            style={{ top: `${top}px`, height: `${height}px` }}
                            onClick={handleAppointmentClick}
                          />
                    );
                  })}
                </div>
                </StaffColumn>
              ))}
            </div>
          </div>
        </div>

        {/* Service Selection Panel */}
        {isServicePanelOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
            <div className="bg-white w-[800px] h-full shadow-xl flex flex-col">
              {/* Header */}
              <div className="p-4 border-b flex items-center justify-between">
                <div className="flex items-center gap-4">
                <Button 
                  variant="ghost" 
                  size="sm"
                    onClick={() => {
                      setIsServicePanelOpen(false);
                      setEditingAppointmentId(null);
                    }}
                >
                    <X size={20} />
                </Button>
                  <div>
                    <h2 className="text-lg font-semibold">
                      {editingAppointmentId ? 'Edit Appointment' : 'New Appointment'}
                    </h2>
                    <p className="text-sm text-gray-600">
                      {selectedSlot && `${formatDate(selectedSlot.date)} at ${selectedSlot.timeSlot}`}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-1 overflow-hidden">
                {/* Client Info */}
                <div className="w-1/2 border-r p-6 flex flex-col">
                  {isSelectingClient ? (
                      <div className="flex flex-col h-full">
                          <h3 className="text-lg font-semibold mb-4">Select a client</h3>
                          <div className="relative mb-4">
                             <Input 
                               placeholder="Search client or leave empty"
                               value={clientSearchTerm}
                               onChange={(e) => setClientSearchTerm(e.target.value)}
                               className="pl-10"
                             />
                             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          </div>
                          <div className="flex-1 overflow-auto -mx-6 px-6">
                              <button onClick={() => setIsAddingNewClient(true)} className="flex items-center gap-4 p-3 w-full text-left hover:bg-gray-50 rounded-lg">
                                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                                      <Plus className="w-5 h-5" />
                                  </div>
                                  <div>
                                      <p className="font-semibold">Add new client</p>
                                  </div>
                              </button>
                               <button onClick={() => { setClient(null); setIsSelectingClient(false); }} className="flex items-center gap-4 p-3 w-full text-left hover:bg-gray-50 rounded-lg">
                                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                                      <PersonStanding className="w-5 h-5" />
                                  </div>
                                  <div>
                                      <p className="font-semibold">Walk-In</p>
                                  </div>
                              </button>
                              <div className="border-t my-2" />
                              {filteredClients.map(c => (
                                  <button key={c.id} onClick={() => { setClient(c); setIsSelectingClient(false); }} className="flex items-center gap-4 p-3 w-full text-left hover:bg-gray-50 rounded-lg">
                                      <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center font-bold text-purple-600">
                                          {c.initial}
                                      </div>
                                      <div>
                                          <p className="font-semibold">{c.name}</p>
                                          <p className="text-sm text-gray-500">{c.phone}</p>
                                      </div>
                                  </button>
                              ))}
                          </div>
                      </div>
                  ) : client ? (
                      <div className="flex flex-col items-center text-center">
                          <div className="w-24 h-24 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 text-4xl font-bold mb-4">
                              {client.initial}
                          </div>
                          <h3 className="text-xl font-semibold">{client.name}</h3>
                          <p className="text-gray-500">{client.phone}</p>
                          <div className="flex gap-2 mt-4">
                              <Button variant="outline" onClick={() => setIsSelectingClient(true)}>Change client</Button>
                              <Button variant="outline">View profile</Button>
                          </div>
                          <div className="border-t my-6 w-full" />
                          <div className="space-y-4 text-sm text-gray-700 self-start w-full">
                              <div className="flex items-center gap-3">
                                  <Users size={16} />
                                  <span>Add pronouns</span>
                              </div>
                              <div className="flex items-center gap-3">
                                  <Cake size={16} />
                                  <span>Add date of birth</span>
                              </div>
                              <div className="flex items-center gap-3">
                                  <UserPlus size={16} />
                                  <span>Created {client.createdAt}</span>
                              </div>
                          </div>
                      </div>
                  ) : (
                      <div className="flex-1 flex flex-col items-center justify-center">
                          <button onClick={() => setIsSelectingClient(true)} className="text-center group">
                              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4 group-hover:bg-gray-200 transition-colors">
                                  <UserPlus size={32} className="text-gray-500" />
                              </div>
                              <h3 className="font-semibold">Add client</h3>
                              <p className="text-sm text-gray-500">Or leave empty for walk-ins</p>
                          </button>
                      </div>
                  )}
                </div>

                {/* Service Info */}
                <div className="w-1/2 p-6 flex flex-col">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold">Appointment</h3>
                    <button onClick={() => setIsServicePanelOpen(false)} className="text-gray-500 hover:text-gray-800">
                      <X size={24} />
                    </button>
                  </div>

                  <div className="flex-1 overflow-auto -mx-6 px-6">
                    {selectedServices.map((service, index) => renderService(service, index, true))}
                    {isAddingService ? (
                      <div className="mt-4">
                        <Input
                          placeholder="Search for a service"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="mb-2"
                        />
                        <div className="max-h-60 overflow-y-auto">
                          {filteredServices.map(service => (
                            <div key={service.id} className="p-2 hover:bg-gray-100 cursor-pointer rounded-md" onClick={() => handleServiceSelect(service)}>
                              <p className="font-semibold">{service.name}</p>
                              <p className="text-sm text-gray-500">{service.duration} • {service.price}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <button onClick={() => setIsAddingService(true)} className="mt-4 flex items-center gap-2 text-purple-600 font-semibold hover:text-purple-800">
                        <Plus size={16} />
                        <span>Add a service</span>
                      </button>
                    )}
                  </div>

                  <div className="border-t pt-4 relative">
                     <div className="flex justify-between items-center font-semibold">
                       <span>Total</span>
                       <span>AED {selectedServices.reduce((acc, s) => acc + parseInt(s.price.replace(/from AED |AED /g, '')), 0)}</span>
                      </div>
               
                     {editingAppointmentId ? (
                       <div className="flex gap-2 mt-4">
                           <Button variant="outline" size="icon" onClick={() => setShowQuickActions(!showQuickActions)}>
                               <MoreHorizontal size={20} />
                           </Button>
                           <Button variant="outline" className="flex-1">Pay now</Button>
                         <Button 
                               className="flex-1 bg-gray-900 hover:bg-gray-800 text-white flex items-center justify-center"
                               onClick={handleCheckout}
                               disabled={selectedServices.length === 0 || isSaving}
                           >
                               {isSaving ? <Loader2 className="animate-spin" /> : 'Checkout'}
                         </Button>
                         {showQuickActions && (
                          <div className="absolute right-0 bottom-12 mb-2 w-48 bg-white rounded-md shadow-lg border z-10 py-1">
                            <button className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                              <StickyNote size={16} />
                              <span>Add a note</span>
                            </button>
                            <button className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                              <Repeat size={16} />
                              <span>Reschedule</span>
                            </button>
                            <div className="border-t my-1" />
                            <button 
                              onClick={() => {
                                setShowQuickActions(false);
                                setIsCancelling(true);
                              }}
                              className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                            >
                              <Trash2 size={16} />
                              <span>Cancel Booking</span>
                            </button>
                          </div>
                         )}
                       </div>
                     ) : (
                       <Button 
                           className="w-full mt-4 bg-gray-900 hover:bg-gray-800 text-white flex items-center justify-center"
                           onClick={handleSaveAppointment}
                           disabled={selectedServices.length === 0 || isSaving}
                       >
                           {isSaving ? <Loader2 className="animate-spin" /> : 'Save'}
                       </Button>
                     )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <AddNewClientDialog 
          isOpen={isAddingNewClient}
          onClose={() => setIsAddingNewClient(false)}
          onSave={(newClient) => {
              setClients([newClient, ...clients]);
              setClient(newClient);
              setIsSelectingClient(false);
          }}
        />

        <CancellationDialog
          isOpen={isCancelling}
          onClose={() => setIsCancelling(false)}
          onConfirm={(reason) => {
            console.log(`Appointment ${editingAppointmentId} cancelled. Reason: ${reason}`);
            setAppointments(prev => prev.filter(app => app.id !== editingAppointmentId));
            setIsCancelling(false);
            setIsServicePanelOpen(false);
            setEditingAppointmentId(null);
          }}
        />

        {/* Appointment Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>New Appointment</DialogTitle>
            </DialogHeader>
            {selectedSlot && (
              <div className="space-y-4">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2 text-sm text-blue-800">
                    <User size={14} />
                    <span className="font-medium">
                      {staffMembers.find(s => s.id === selectedSlot.staffId)?.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-blue-600 mt-1">
                    <Clock size={14} />
                    <span>
                      {formatDate(selectedSlot.date)} at {selectedSlot.timeSlot}
                    </span>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="client">Client Name *</Label>
                  <Input
                    id="client"
                    value={formData.client}
                    onChange={(e) => setFormData({...formData, client: e.target.value})}
                    placeholder="Enter client name"
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="+971-50-xxx-xxxx"
                  />
                </div>
                
                <div>
                  <Label htmlFor="service">Service *</Label>
                  <select
                    id="service"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.service}
                    onChange={(e) => setFormData({...formData, service: e.target.value})}
                  >
                    <option value="">Select a service</option>
                    {services.map((service, index) => (
                      <option key={index} value={service}>{service}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <Label htmlFor="notes">Notes</Label>
                  <Input
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    placeholder="Additional notes (optional)"
                  />
                </div>
                
                <div className="flex gap-2 pt-4">
                  <Button 
                    onClick={handleSaveAppointment}
                    disabled={!formData.client || !formData.service}
                    className="flex-1"
                  >
                    Save Appointment
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setIsDialogOpen(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        <CheckoutSheet
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          services={selectedServices}
          onConfirm={handlePaymentConfirm}
        />
      </div>
    </DndContext>
  );
};

export default AppointmentsCalendar;