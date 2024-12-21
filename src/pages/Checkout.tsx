import { TestPurchaseForm } from "@/components/TestPurchaseForm";
import { useCart } from "@/contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Checkout() {
  const { items } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (items.length === 0) {
      navigate("/");
    }
  }, [items, navigate]);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-8">Ödeme Bilgileri</h1>
      <TestPurchaseForm />
    </div>
  );
}