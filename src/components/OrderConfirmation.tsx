import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCart } from "@/contexts/CartContext";

interface OrderConfirmationProps {
  open: boolean;
  onClose: () => void;
  orderNumber: string;
  email: string;
}

export function OrderConfirmation({ open, onClose, orderNumber, email }: OrderConfirmationProps) {
  const { items, finalTotal } = useCart();

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Sipariş Onayı</DialogTitle>
          <DialogDescription>
            Siparişiniz başarıyla alındı. Sipariş detayları aşağıdadır.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <p className="font-medium">Sipariş Numarası:</p>
            <p className="text-muted-foreground">{orderNumber}</p>
          </div>
          <div>
            <p className="font-medium">Sipariş Özeti:</p>
            <ul className="list-disc list-inside space-y-1">
              {items.map((item) => (
                <li key={item.id} className="text-muted-foreground">
                  {item.name} x {item.quantity}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-medium">Toplam Tutar:</p>
            <p className="text-muted-foreground">{finalTotal().toLocaleString('tr-TR')} ₺</p>
          </div>
          <div>
            <p className="font-medium">Teslimat Bilgisi:</p>
            <p className="text-muted-foreground">
              Dijital ürünlerinize ait indirme bağlantıları {email} adresine gönderilecektir.
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onClose}>Tamam</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}