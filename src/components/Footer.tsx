import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Lock, Phone, Mail, MapPin, Facebook, Twitter, Instagram } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-white mt-16 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold text-lg mb-4">Yasal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy">
                  <Button variant="link">Gizlilik Sözleşmesi</Button>
                </Link>
              </li>
              <li>
                <Link to="/distance-sales">
                  <Button variant="link">Mesafeli Satış Sözleşmesi</Button>
                </Link>
              </li>
              <li>
                <Link to="/returns">
                  <Button variant="link">İade Sözleşmesi</Button>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">İletişim</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+90 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>destek@ornek.com</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>İstanbul, Türkiye</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Sosyal Medya</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon">
                  <Facebook className="h-5 w-5" />
                </Button>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon">
                  <Twitter className="h-5 w-5" />
                </Button>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="icon">
                  <Instagram className="h-5 w-5" />
                </Button>
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Güvenlik</h3>
            <div className="flex items-center gap-2 mb-2">
              <Lock className="text-green-500" />
              <span>SSL Korumalı</span>
            </div>
            <p className="text-sm text-gray-600">
              Tüm işlemler SSL şifreleme ile korunmaktadır
            </p>
            <div className="mt-4">
              <ShieldCheck className="text-green-500 h-6 w-6" />
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} E-Store. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
};