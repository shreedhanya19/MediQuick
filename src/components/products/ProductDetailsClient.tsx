"use client";

import type { Product } from "@/types";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart, PackageCheck, AlertTriangle, CheckCircle2 } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

interface ProductDetailsClientProps {
  product: Product;
}

export default function ProductDetailsClient({ product }: ProductDetailsClientProps) {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <Card className="overflow-hidden shadow-lg">
      <div className="grid md:grid-cols-2 gap-0 md:gap-0">
        <div className="p-0 md:p-0">
           <Image
            src={product.imageUrl}
            alt={product.name}
            width={600}
            height={600}
            className="object-cover w-full h-full aspect-square md:rounded-l-lg"
            data-ai-hint={product.dataAiHint || "pharmaceutical product detail"}
          />
        </div>
        <div className="flex flex-col">
          <CardHeader className="p-6">
            <CardTitle className="text-3xl font-bold">{product.name}</CardTitle>
            <CardDescription className="text-md mt-2">{product.description}</CardDescription>
            <div className="mt-4">
              <Badge variant={product.category === 'Prescription' ? "destructive" : "secondary"}>{product.category}</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-4 flex-grow">
            <p className="text-3xl font-bold text-primary">${product.price.toFixed(2)}</p>
            
            {product.dosage && <p><strong className="font-semibold">Dosage:</strong> {product.dosage}</p>}
            {product.usage && <p><strong className="font-semibold">Usage:</strong> {product.usage}</p>}
            {product.sideEffects && <p><strong className="font-semibold">Side Effects:</strong> {product.sideEffects}</p>}

            <div className="flex items-center gap-2">
              {product.stock > 0 ? (
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              ) : (
                <AlertTriangle className="h-5 w-5 text-destructive" />
              )}
              <span className={product.stock > 0 ? "text-green-600" : "text-destructive"}>
                {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
              </span>
            </div>

          </CardContent>
          <CardFooter className="p-6 bg-muted/30">
            <Button 
              size="lg" 
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
              onClick={handleAddToCart}
              disabled={product.stock <= 0}
            >
              <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
            </Button>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
}
