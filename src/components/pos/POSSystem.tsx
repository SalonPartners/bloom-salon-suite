
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Plus, Minus, CreditCard, Banknote, Smartphone, Gift } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  duration: number;
}

export const POSSystem = () => {
  const { toast } = useToast();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedPayment, setSelectedPayment] = useState("credit");

  const services = [
    { id: 1, name: "Women's Haircut", price: 65, duration: 45, category: "Hair" },
    { id: 2, name: "Hair Color (Full)", price: 120, duration: 120, category: "Hair" },
    { id: 3, name: "Men's Haircut", price: 45, duration: 30, category: "Hair" },
    { id: 4, name: "Beard Trim", price: 25, duration: 20, category: "Hair" },
    { id: 5, name: "Classic Manicure", price: 35, duration: 45, category: "Nails" },
    { id: 6, name: "Gel Manicure", price: 50, duration: 60, category: "Nails" },
    { id: 7, name: "Pedicure", price: 45, duration: 60, category: "Nails" }
  ];

  const paymentMethods = [
    { id: "credit", name: "Credit Card", icon: CreditCard },
    { id: "cash", name: "Cash", icon: Banknote },
    { id: "online", name: "Online Payment", icon: Smartphone },
    { id: "gift", name: "Gift Card", icon: Gift }
  ];

  const addToCart = (service: typeof services[0]) => {
    const existingItem = cart.find(item => item.id === service.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === service.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...service, quantity: 1 }]);
    }
  };

  const updateQuantity = (id: number, change: number) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQuantity = item.quantity + change;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;

  const processPayment = () => {
    toast({
      title: "Payment Processed",
      description: `Successfully processed $${total.toFixed(2)} payment via ${paymentMethods.find(p => p.id === selectedPayment)?.name}`,
    });
    setCart([]);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Point of Sale</h1>
        <p className="text-gray-600">Process transactions and manage sales</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Services Selection */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Services</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {services.map((service) => (
                  <Card key={service.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => addToCart(service)}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium">{service.name}</h3>
                        <Badge variant="outline">{service.category}</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-purple-600">${service.price}</span>
                        <span className="text-sm text-gray-500">{service.duration} min</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Cart and Checkout */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Current Order</CardTitle>
            </CardHeader>
            <CardContent>
              {cart.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No items in cart</p>
              ) : (
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between items-center">
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">${item.price} each</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateQuantity(item.id, -1)}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateQuantity(item.id, 1)}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {cart.length > 0 && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    {paymentMethods.map((method) => (
                      <Button
                        key={method.id}
                        variant={selectedPayment === method.id ? "default" : "outline"}
                        onClick={() => setSelectedPayment(method.id)}
                        className={`flex flex-col items-center p-4 h-auto ${
                          selectedPayment === method.id ? "bg-purple-600 hover:bg-purple-700" : ""
                        }`}
                      >
                        <method.icon className="w-5 h-5 mb-2" />
                        <span className="text-xs">{method.name}</span>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (8%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <Button
                    className="w-full bg-purple-600 hover:bg-purple-700 mt-4"
                    onClick={processPayment}
                  >
                    Process Payment
                  </Button>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
