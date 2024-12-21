import { ProductTable } from "./ProductTable";
import { useProducts } from "@/hooks/use-products";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import type { Product } from "@/lib/supabase";

interface ProductListProps {
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

export const ProductList = ({ onEdit, onDelete }: ProductListProps) => {
  const { products, isLoading, mutate } = useProducts();
  const { toast } = useToast();

  const handleDelete = async (product: Product) => {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', product.id);

      if (error) throw error;

      onDelete(product);
      await mutate();
      
      toast({
        title: "Başarılı",
        description: "Ürün başarıyla silindi",
      });
    } catch (error) {
      console.error('Error deleting product:', error);
      toast({
        title: "Hata",
        description: "Ürün silinirken bir hata oluştu",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        Stokta ürün yok.
      </div>
    );
  }

  return <ProductTable products={products} onEdit={onEdit} onDelete={handleDelete} />;
};