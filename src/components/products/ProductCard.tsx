"use client";

import type { Product } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingCart, Info } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
      variant: "default",
    });
  };

  return (
    <Card className="flex flex-col overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
      <Link href={`/products/${product.id}`} legacyBehavior>
        <a className="block aspect-[4/3] overflow-hidden">
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={400}
            height={300}
            className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
            data-ai-hint={product.dataAiHint || "pharmaceutical product"}
          />
        </a>
      </Link>
      <CardHeader className="p-4">
        <Link href={`/products/${product.id}`} legacyBehavior>
          <a>
            <CardTitle className="text-lg font-semibold hover:text-primary transition-colors">
              {product.name}
            </CardTitle>
          </a>
        </Link>
        <CardDescription className="text-sm h-10 overflow-hidden text-ellipsis">
          {product.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <p className="text-xl font-bold text-primary">₹{product.price.toFixed(2)}</p>
        {product.stock <= 0 && <p className="text-sm text-destructive">Out of stock</p>}
        {product.stock > 0 && product.stock < 10 && <p className="text-sm text-yellow-600">Low stock ({product.stock} left)</p>}
      </CardContent>
      <CardFooter className="p-4 bg-muted/30 flex gap-2">
        <Link href={`/products/${product.id}`} passHref legacyBehavior>
          <Button variant="outline" className="flex-1">
            <Info className="mr-2 h-4 w-4" /> View Details
          </Button>
        </Link>
        <Button 
          onClick={handleAddToCart} 
          disabled={product.stock <= 0}
          className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground"
        >
          <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
