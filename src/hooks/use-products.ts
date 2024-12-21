import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { Product } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const loadProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }
      
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast({
        title: "Hata",
        description: "Ürünler yüklenirken bir hata oluştu",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();

    const channel = supabase
      .channel('products_changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'products' },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setProducts((current) => [payload.new as Product, ...current]);
          } else if (payload.eventType === 'DELETE') {
            setProducts((current) =>
              current.filter((product) => product.id !== payload.old.id)
            );
          } else if (payload.eventType === 'UPDATE') {
            setProducts((current) =>
              current.map((product) =>
                product.id === payload.new.id ? (payload.new as Product) : product
              )
            );
          }
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [toast]);

  const mutate = () => loadProducts();

  return { products, isLoading, mutate };
};