import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
} from "@/components/ui/navigation-menu";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import { CartMenu } from "@/components/CartMenu";

export const Header = () => {
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast({
        title: "Başarılı",
        description: "Çıkış yapıldı",
      });
    } catch (error) {
      console.error("Error logging out:", error);
      toast({
        title: "Hata",
        description: "Çıkış yapılırken bir hata oluştu",
        variant: "destructive",
      });
    }
  };

  return (
    <header className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-primary">E-Mağaza</h1>
          </Link>

          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/">
                  <Button variant="ghost">Ana Sayfa</Button>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/products">
                  <Button variant="ghost">Ürünler</Button>
                </Link>
              </NavigationMenuItem>
              {isAuthenticated && (
                <NavigationMenuItem>
                  <Link to="/admin/products">
                    <Button variant="ghost">Admin Panel</Button>
                  </Link>
                </NavigationMenuItem>
              )}
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Ara..."
                className="pl-8 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            </div>
            <CartMenu />
            {isAuthenticated ? (
              <Button variant="ghost" onClick={handleLogout}>
                Çıkış Yap
              </Button>
            ) : (
              <>
                <Link to="/auth/login">
                  <Button variant="ghost">Giriş Yap</Button>
                </Link>
                <Link to="/auth/signup">
                  <Button variant="ghost">Kayıt Ol</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};