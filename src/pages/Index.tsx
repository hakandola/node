import { useState, useEffect } from "react";
import { ProductCard } from "@/components/ProductCard";
import { Lock } from "lucide-react";
import { productService } from "@/services/productService";
import type { Product } from "@/lib/supabase";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/contexts/CartContext";

export default function Index() {
  const [products, setProducts] = useState<Product[]>([]);
  const { toast } = useToast();
  const { addToCart } = useCart();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await productService.getProducts();
        setProducts(data);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load products. Please try again later.",
          variant: "destructive",
        });
      }
    };

    loadProducts();

    // Subscribe to realtime changes
    const subscription = supabase
      .channel('products')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'products' },
        (payload) => {
          switch (payload.eventType) {
            case 'INSERT':
              setProducts(prev => [payload.new as Product, ...prev]);
              break;
            case 'DELETE':
              setProducts(prev => prev.filter(p => p.id !== payload.old.id));
              break;
            case 'UPDATE':
              setProducts(prev => prev.map(p => 
                p.id === payload.new.id ? payload.new as Product : p
              ));
              break;
          }
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [toast]);

  const handleAddToCart = (productId: number) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      addToCart(product);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h1 className="text-4xl font-bold">Ürünlerimiz</h1>
            <div className="flex items-center gap-2">
              <Lock className="text-green-500 h-4 w-4" />
              <span className="text-sm text-green-500">SSL Güvenli Bağlantı</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                {...product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}