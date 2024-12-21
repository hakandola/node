import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { ProductList } from "@/components/admin/ProductList";
import { AddProductModal } from "@/components/admin/AddProductModal";
import { DashboardStats } from "@/components/admin/DashboardStats";
import { useToast } from "@/hooks/use-toast";
import { productService } from "@/services/productService";
import type { Product } from "@/lib/supabase";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ProductForm } from "@/components/admin/ProductForm";

export const ProductManagement = () => {
  const { toast } = useToast();
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddProduct = async (data: Omit<Product, "id" | "created_at">) => {
    try {
      await productService.createProduct(data);
      toast({
        title: "Başarılı",
        description: "Ürün başarıyla eklendi",
      });
    } catch (error) {
      toast({
        title: "Hata",
        description: "Ürün eklenirken bir hata oluştu",
        variant: "destructive",
      });
      throw error;
    }
  };

  const handleEditProduct = async (data: Omit<Product, "created_at">) => {
    if (!productToEdit) return;
    
    try {
      setIsSubmitting(true);
      await productService.updateProduct(productToEdit.id, data);
      setProductToEdit(null);
      toast({
        title: "Başarılı",
        description: "Ürün başarıyla güncellendi",
      });
    } catch (error) {
      toast({
        title: "Hata",
        description: "Ürün güncellenirken bir hata oluştu",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Ürün Yönetimi</h1>
          <AddProductModal onProductAdd={handleAddProduct} />
        </div>

        <DashboardStats />

        <ProductList
          onEdit={setProductToEdit}
          onDelete={() => {}}
        />

        <Dialog open={!!productToEdit} onOpenChange={(open) => !open && setProductToEdit(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ürün Düzenle</DialogTitle>
            </DialogHeader>
            {productToEdit && (
              <ProductForm
                initialData={productToEdit}
                onSubmit={handleEditProduct}
                isSubmitting={isSubmitting}
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};