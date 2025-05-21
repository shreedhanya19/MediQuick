import ProductList from '@/components/products/ProductList';
import { mockProducts } from '@/lib/mockData';
import type { Product } from '@/types';

// This page can be a Server Component
async function getProducts(): Promise<Product[]> {
  // In a real app, fetch data from an API
  return Promise.resolve(mockProducts);
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="space-y-8">
      <section className="text-center py-8 bg-primary/5 rounded-lg">
        <h1 className="text-3xl font-bold text-primary">Our Products</h1>
        <p className="text-foreground/80 mt-2">Browse our wide selection of medicines and health products.</p>
      </section>
      
      <section>
        <ProductList products={products} />
      </section>
    </div>
  );
}
