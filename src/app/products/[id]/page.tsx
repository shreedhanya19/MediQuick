import { mockProducts } from '@/lib/mockData';
import type { Product } from '@/types';
import ProductDetailsClient from '@/components/products/ProductDetailsClient';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface ProductPageParams {
  params: {
    id: string;
  };
}

// This page can be a Server Component
async function getProduct(id: string): Promise<Product | undefined> {
  // In a real app, fetch data from an API
  return Promise.resolve(mockProducts.find(p => p.id === id));
}

export default async function ProductPage({ params }: ProductPageParams) {
  const product = await getProduct(params.id);

  if (!product) {
    return (
      <div className="text-center py-10">
        <h1 className="text-2xl font-semibold">Product not found</h1>
        <p className="text-muted-foreground mt-2">
          The product you are looking for does not exist.
        </p>
        <Button asChild className="mt-6">
          <Link href="/products">
            <ArrowLeft className="mr-2 h-4 w-4" /> Go back to Products
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
       <div className="mb-6">
        <Button asChild variant="outline">
          <Link href="/products">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Products
          </Link>
        </Button>
      </div>
      <ProductDetailsClient product={product} />
    </div>
  );
}

// Optional: Generate static paths if you know all product IDs at build time
// export async function generateStaticParams() {
//   return mockProducts.map(product => ({
//     id: product.id,
//   }));
// }
