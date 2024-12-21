import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ProductForm } from "./ProductForm";
import { useToast } from "@/hooks/use-toast";
import { Plus } from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { Product } from "@/lib/supabase";

interface AddProductModalProps {
  onProductAdd: (product: Omit<Product, "id" | "created_at">) => void;
}

export const AddProductModal = ({ onProductAdd }: AddProductModalProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (data: Omit<Product, "id" | "created_at">) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from('products')
        .insert([data]);

      if (error) throw error;

      onProductAdd(data);
      toast({
        title: "Başarılı",
        description: "Ürün başarıyla eklendi",
      });
      setIsOpen(false);
    } catch (error) {
      console.error('Error adding product:', error);
      toast({
        title: "Hata",
        description: "Ürün eklenirken bir hata oluştu",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Yeni Ürün Ekle
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Yeni Ürün Ekle</SheetTitle>
        </SheetHeader>
        <div className="mt-4">
          <ProductForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
        </div>
      </SheetContent>
    </Sheet>
  );
};