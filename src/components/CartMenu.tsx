import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ShoppingCart, Trash2 } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

export function CartMenu() {
  const navigate = useNavigate();
  const { 
    items, 
    removeFromCart, 
    clearCart, 
    totalItems, 
    calculateTotal,
    calculateTax,
    applyDiscount,
    removeDiscount,
    discountAmount,
    finalTotal
  } = useCart();

  const [discountCode, setDiscountCode] = useState("");

  const handleApplyDiscount = (e: React.MouseEvent) => {
    e.preventDefault();
    applyDiscount(discountCode);
    setDiscountCode("");
  };

  const handleProceedToCheckout = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate("/checkout");
  };

  const calculateItemTotal = (item) => {
    const basePrice = item.price * item.quantity;
    const vatAmount = basePrice * (item.vatRate || 18) / 100;
    return basePrice + vatAmount;
  };

  const calculateVatTotal = () => {
    return items.reduce((total, item) => {
      const basePrice = item.price * item.quantity;
      return total + (basePrice * (item.vatRate || 18) / 100);
    }, 0);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {totalItems > 0 && (
            <Badge variant="destructive" className="absolute -top-2 -right-2 px-2 min-w-[20px] h-5">
              {totalItems}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        {items.length === 0 ? (
          <DropdownMenuItem className="text-center text-muted-foreground">
            Sepetiniz boş
          </DropdownMenuItem>
        ) : (
          <>
            {items.map((item) => (
              <DropdownMenuItem key={item.id} className="flex items-center gap-2 p-2">
                <div className="w-12 h-12 rounded overflow-hidden flex-shrink-0">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-grow">
                  <div className="font-medium">{item.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {item.quantity} x {calculateItemTotal(item).toLocaleString('tr-TR')} ₺
                    {item.vatRate && (
                      <span className="text-xs"> (KDV: %{item.vatRate})</span>
                    )}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.preventDefault();
                    removeFromCart(item.id);
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="p-2">
              <div className="w-full space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Ara Toplam:</span>
                  <span>{calculateTotal().toLocaleString('tr-TR')} ₺</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">KDV:</span>
                  <span>{calculateVatTotal().toLocaleString('tr-TR')} ₺</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between items-center text-green-600">
                    <span className="text-sm">İndirim:</span>
                    <span>-{discountAmount.toLocaleString('tr-TR')} ₺</span>
                  </div>
                )}
                <div className="flex justify-between items-center font-bold">
                  <span>Toplam:</span>
                  <span>{finalTotal().toLocaleString('tr-TR')} ₺</span>
                </div>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="p-2">
              <div className="w-full space-y-2">
                <div className="flex gap-2">
                  <Input
                    placeholder="İndirim kodu"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    className="h-8"
                  />
                  <Button
                    variant="secondary"
                    onClick={handleApplyDiscount}
                    className="h-8"
                  >
                    Uygula
                  </Button>
                </div>
                {discountAmount > 0 && (
                  <Button
                    variant="ghost"
                    onClick={(e) => {
                      e.preventDefault();
                      removeDiscount();
                    }}
                    className="w-full h-8 text-red-500"
                  >
                    İndirimi Kaldır
                  </Button>
                )}
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="p-2">
              <Button
                variant="default"
                className="w-full"
                onClick={handleProceedToCheckout}
              >
                Satın Al
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem className="p-2">
              <Button
                variant="destructive"
                className="w-full"
                onClick={(e) => {
                  e.preventDefault();
                  clearCart();
                }}
              >
                Sepeti Temizle
              </Button>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
