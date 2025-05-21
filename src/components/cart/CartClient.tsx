"use client";

import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Trash2, ShoppingBag, Plus, Minus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

export default function CartClient() {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const { toast } = useToast();

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity > 0) {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleRemoveItem = (productId: string, productName: string) => {
    removeFromCart(productId);
    toast({
      title: "Item Removed",
      description: `${productName} has been removed from your cart.`,
      variant: "destructive",
    });
  };

  const handleClearCart = () => {
    clearCart();
    toast({
      title: "Cart Cleared",
      description: "All items have been removed from your cart.",
    });
  };
  
  const handleCheckout = () => {
    // Mock checkout
    toast({
      title: "Checkout Initiated",
      description: "Thank you for your order! (This is a demo)",
    });
    clearCart(); // Clear cart after mock checkout
  };


  if (cartItems.length === 0) {
    return (
      <div className="text-center py-16">
        <ShoppingBag className="mx-auto h-24 w-24 text-muted-foreground mb-6" />
        <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
        <p className="text-muted-foreground mb-6">Looks like you haven't added anything to your cart yet.</p>
        <Button asChild>
          <Link href="/products">Start Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-3 gap-8 items-start">
      <div className="md:col-span-2 space-y-6">
        <div className="flex justify-between items-center">
           <h1 className="text-3xl font-bold text-primary">Your Shopping Cart</h1>
           {cartItems.length > 0 && (
            <Button variant="outline" onClick={handleClearCart} className="text-destructive hover:border-destructive hover:bg-destructive/10">
              <Trash2 className="mr-2 h-4 w-4" /> Clear Cart
            </Button>
          )}
        </div>
        {cartItems.map(item => (
          <Card key={item.id} className="flex flex-col sm:flex-row items-center gap-4 p-4 shadow-sm">
            <Image
              src={item.imageUrl}
              alt={item.name}
              width={100}
              height={100}
              className="rounded-md object-cover aspect-square"
              data-ai-hint={item.dataAiHint || "product image"}
            />
            <div className="flex-grow">
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-sm text-muted-foreground">{item.category}</p>
              <p className="text-md font-semibold text-primary mt-1">${item.price.toFixed(2)}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={() => handleQuantityChange(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>
                <Minus className="h-4 w-4" />
              </Button>
              <Input
                type="number"
                value={item.quantity}
                onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                className="w-16 text-center h-9"
                min="1"
              />
              <Button variant="outline" size="icon" onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-lg font-semibold w-24 text-right sm:text-center">${(item.price * item.quantity).toFixed(2)}</p>
            <Button variant="ghost" size="icon" onClick={() => handleRemoveItem(item.id, item.name)} className="text-destructive hover:bg-destructive/10">
              <Trash2 className="h-5 w-5" />
            </Button>
          </Card>
        ))}
      </div>

      <Card className="sticky top-24 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl">Order Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${getCartTotal().toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>FREE</span>
          </div>
          <Separator />
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>${getCartTotal().toFixed(2)}</span>
          </div>
        </CardContent>
        <CardFooter>
          <Button size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" onClick={handleCheckout}>
            Proceed to Checkout
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
