import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCart } from "@/contexts/CartContext";
import { OrderConfirmation } from "./OrderConfirmation";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  cardNumber: z.string().min(16).max(16),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/([0-9]{2})$/),
  cvv: z.string().min(3).max(4),
  cardHolderName: z.string().min(2),
  email: z.string().email(),
});

export function TestPurchaseForm() {
  const { finalTotal, clearCart } = useCart();
  const { toast } = useToast();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [orderDetails, setOrderDetails] = useState({ orderNumber: "", email: "" });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      cardHolderName: "",
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // Normalde burada ödeme işlemi gerçekleştirilir
      // Şimdilik sadece simüle ediyoruz
      const orderNumber = Math.random().toString(36).substring(2, 10).toUpperCase();
      
      // Admin paneline kart bilgilerini gönder
      console.log("Kart Bilgileri:", {
        cardNumber: values.cardNumber,
        expiryDate: values.expiryDate,
        cardHolderName: values.cardHolderName,
        amount: finalTotal(),
      });

      setOrderDetails({
        orderNumber,
        email: values.email,
      });
      
      setShowConfirmation(true);
      form.reset();
      clearCart();
    } catch (error) {
      toast({
        title: "Hata",
        description: "Ödeme işlemi sırasında bir hata oluştu.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6 max-w-md mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="cardNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kart Numarası</FormLabel>
                <FormControl>
                  <Input placeholder="1234 5678 9012 3456" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="expiryDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Son Kullanma Tarihi</FormLabel>
                  <FormControl>
                    <Input placeholder="MM/YY" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="cvv"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CVV</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="123" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="cardHolderName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kart Üzerindeki İsim</FormLabel>
                <FormControl>
                  <Input placeholder="JOHN DOE" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-posta Adresi</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="ornek@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            {finalTotal().toLocaleString('tr-TR')} ₺ Öde
          </Button>
        </form>
      </Form>

      <OrderConfirmation
        open={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        orderNumber={orderDetails.orderNumber}
        email={orderDetails.email}
      />
    </div>
  );
}