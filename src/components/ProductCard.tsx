import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, ShoppingCart, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

interface ProductCardProps {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  rating: number;
  vatRate?: number;
  onAddToCart: (id: number) => void;
}

export const ProductCard = ({ id, name, description, price, image, rating, vatRate = 18, onAddToCart }: ProductCardProps) => {
  const { toast } = useToast();
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = async () => {
    try {
      setIsAdding(true);
      onAddToCart(id);
      setIsAdded(true);
      toast({
        title: "Ürün sepete eklendi",
        description: "Ürün başarıyla sepetinize eklendi.",
      });

      setTimeout(() => {
        setIsAdded(false);
      }, 2000);
    } catch (error) {
      toast({
        title: "Hata",
        description: "Ürün sepete eklenirken bir hata oluştu. Lütfen tekrar deneyin.",
        variant: "destructive",
      });
    } finally {
      setTimeout(() => {
        setIsAdding(false);
      }, 500);
    }
  };

  const calculateFinalPrice = (basePrice: number) => {
    return basePrice * (1 + (vatRate / 100));
  };

  return (
    <Card className="flex flex-col hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="w-full h-48 overflow-hidden rounded-t-lg">
          <img 
            src={image} 
            alt={name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
        <CardTitle className="mt-4">{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-center">
            <p className="text-2xl font-bold text-primary">{calculateFinalPrice(price).toLocaleString('tr-TR')} ₺</p>
          </div>
          <div className="flex justify-end items-center gap-1">
            <Star className="fill-yellow-400 text-yellow-400" size={20} />
            <span>{rating}/5</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <Button 
          className="w-full"
          onClick={handleAddToCart}
          disabled={isAdding}
          variant={isAdded ? "secondary" : "default"}
        >
          {isAdded ? (
            <>
              <Check className="mr-2" size={20} />
              Eklendi
            </>
          ) : (
            <>
              <ShoppingCart className="mr-2" size={20} />
              {isAdding ? 'Ekleniyor...' : 'Sepete Ekle'}
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};