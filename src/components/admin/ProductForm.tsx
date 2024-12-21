import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Product } from "@/lib/supabase";

const productSchema = z.object({
  name: z.string().min(1, "Ürün adı zorunludur"),
  description: z.string().optional(),
  price: z.number().positive("Fiyat pozitif olmalıdır"),
  image: z.string().url("Geçerli bir URL giriniz"),
  rating: z.number().min(0).max(5, "Değerlendirme 0-5 arasında olmalıdır").optional(),
  vatRate: z.number().min(0).max(100, "KDV oranı 0-100 arasında olmalıdır").nullable().optional(),
});

type ProductFormData = z.infer<typeof productSchema>;

interface ProductFormProps {
  initialData?: Partial<ProductFormData>;
  onSubmit: (data: ProductFormData) => void;
  isSubmitting: boolean;
}

export const ProductForm = ({ initialData, onSubmit, isSubmitting }: ProductFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
      price: initialData?.price || 0,
      image: initialData?.image || "",
      rating: initialData?.rating || 5.0,
      vatRate: initialData?.vatRate || null,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Ürün Adı *</Label>
        <Input
          id="name"
          {...register("name")}
          placeholder="Ürün adını giriniz"
        />
        {errors.name && (
          <p className="text-sm text-destructive">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Açıklama</Label>
        <Textarea
          id="description"
          {...register("description")}
          placeholder="Ürün açıklamasını giriniz"
        />
        {errors.description && (
          <p className="text-sm text-destructive">{errors.description.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="price">Fiyat *</Label>
        <Input
          id="price"
          type="number"
          step="0.01"
          {...register("price", { valueAsNumber: true })}
          placeholder="Fiyat giriniz"
        />
        {errors.price && (
          <p className="text-sm text-destructive">{errors.price.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="vatRate">KDV Oranı (%)</Label>
        <Input
          id="vatRate"
          type="number"
          step="0.1"
          min="0"
          max="100"
          {...register("vatRate", { 
            setValueAs: (v) => v === "" ? null : parseFloat(v),
            valueAsNumber: true 
          })}
          placeholder="KDV oranını giriniz"
        />
        {errors.vatRate && (
          <p className="text-sm text-destructive">{errors.vatRate.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">Görsel URL *</Label>
        <Input
          id="image"
          {...register("image")}
          placeholder="Görsel URL'sini giriniz"
        />
        {errors.image && (
          <p className="text-sm text-destructive">{errors.image.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="rating">Değerlendirme (0-5)</Label>
        <Input
          id="rating"
          type="number"
          step="0.1"
          min="0"
          max="5"
          {...register("rating", { valueAsNumber: true })}
          placeholder="Değerlendirme puanını giriniz"
        />
        {errors.rating && (
          <p className="text-sm text-destructive">{errors.rating.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Kaydediliyor..." : initialData ? "Güncelle" : "Ekle"}
      </Button>
    </form>
  );
};