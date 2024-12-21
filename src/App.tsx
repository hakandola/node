import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Index from "@/pages/Index";
import { ProductManagement } from "@/pages/admin/ProductManagement";
import { SignUpForm } from "@/components/auth/SignUpForm";
import { LoginForm } from "@/components/auth/LoginForm";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { CartProvider } from "@/contexts/CartContext";
import Checkout from "@/pages/Checkout";

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth/signup" element={<SignUpForm />} />
              <Route path="/auth/login" element={<LoginForm />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route
                path="/admin/*"
                element={
                  <ProtectedRoute>
                    <Routes>
                      <Route path="products" element={<ProductManagement />} />
                    </Routes>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
          <Toaster />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;