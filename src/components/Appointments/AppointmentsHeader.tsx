import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Bell, 
  RefreshCcw,
  Package,
  CreditCard,
  Gift,
  Search,
  X,
  User,
  PersonStanding
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

interface AppointmentsHeaderProps {
  currentDate: Date;
  onDateChange: (date: Date) => void;
}

export const AppointmentsHeader = ({ currentDate, onDateChange }: AppointmentsHeaderProps) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSelectingClient, setIsSelectingClient] = useState(true);
  const [clientSearchTerm, setClientSearchTerm] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleTodayClick = () => {
    onDateChange(new Date());
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      onDateChange(date);
    }
  };

  return (
    <div className="flex justify-between items-center p-6 border-b">
      <div className="flex items-center gap-4">
        <Button 
          variant="outline" 
          size="sm"
          onClick={handleTodayClick}
        >
          Today
        </Button>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => {
              const newDate = new Date(currentDate);
              newDate.setDate(currentDate.getDate() - 1);
              onDateChange(newDate);
            }}
          >
            <ChevronLeft size={16} />
          </Button>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "justify-start text-left font-normal px-4",
                  !currentDate && "text-muted-foreground"
                )}
              >
                {format(currentDate, "EEE d MMM")}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={currentDate}
                onSelect={handleDateSelect}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => {
              const newDate = new Date(currentDate);
              newDate.setDate(currentDate.getDate() + 1);
              onDateChange(newDate);
            }}
          >
            <ChevronRight size={16} />
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              Scheduled team
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>All team members</DropdownMenuItem>
            <DropdownMenuItem>Available only</DropdownMenuItem>
            <DropdownMenuItem>Custom schedule</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="ghost" size="icon">
          Hi
        </Button>

        <Button variant="ghost" size="icon">
          <Bell size={16} />
        </Button>

        <Button variant="ghost" size="icon">
          <RefreshCcw size={16} />
        </Button>

        <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
          <SheetTrigger asChild>
            <Button>
              <Plus size={16} className="mr-2" />
              Add
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[800px] p-0 flex">
            {/* Left Panel - Cart Items */}
            <div className="flex-1 border-r">
              <div className="p-4">
                <h2 className="text-xl font-bold mb-4">Add to cart</h2>
                
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input 
                    className="pl-9" 
                    placeholder="Search" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <Tabs defaultValue="quick-sale">
                  <TabsList className="w-full justify-start mb-4 bg-transparent border-b h-auto p-0 space-x-6">
                    <TabsTrigger 
                      value="quick-sale" 
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent px-0"
                    >
                      Quick Sale
                    </TabsTrigger>
                    <TabsTrigger 
                      value="products"
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent px-0"
                    >
                      Products
                    </TabsTrigger>
                    <TabsTrigger 
                      value="memberships"
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent px-0"
                    >
                      Memberships
                    </TabsTrigger>
                    <TabsTrigger 
                      value="voucher"
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-black data-[state=active]:bg-transparent px-0"
                    >
                      Voucher
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="quick-sale" className="mt-4">
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                        <Package className="w-8 h-8 text-purple-600" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">No quick sale items</h3>
                      <p className="text-gray-600 mb-4">Try adding quick sale items to get started</p>
                    </div>
                  </TabsContent>

                  <TabsContent value="products">
                    <div className="grid grid-cols-3 gap-4">
                      {/* Product items will go here */}
                    </div>
                  </TabsContent>

                  <TabsContent value="memberships">
                    <div className="grid grid-cols-3 gap-4">
                      {/* Membership items will go here */}
                    </div>
                  </TabsContent>

                  <TabsContent value="voucher">
                    <div className="grid grid-cols-3 gap-4">
                      {/* Voucher items will go here */}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>

            {/* Right Panel - Client Selection */}
            <div className="w-[300px] bg-gray-50 p-6">
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
                    <button className="flex items-center gap-4 p-3 w-full text-left hover:bg-gray-100 rounded-lg">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                        <Plus className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-semibold">Add new client</p>
                      </div>
                    </button>
                    <button className="flex items-center gap-4 p-3 w-full text-left hover:bg-gray-100 rounded-lg">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                        <PersonStanding className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-semibold">Walk-In</p>
                      </div>
                    </button>
                    <div className="border-t my-2" />
                    {/* Client list will go here */}
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                    <Package className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Your cart is empty</h3>
                  <p className="text-sm text-gray-500">
                    Tap an item to add to cart or add an existing client for smart recommendations
                  </p>
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}; 