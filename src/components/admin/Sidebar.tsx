import { Link } from "react-router-dom";
import { Package, Palette, Settings } from "lucide-react";

export const Sidebar = () => {
  return (
    <div className="w-64 bg-sidebar text-sidebar-foreground border-r border-sidebar-border">
      <div className="p-6">
        <h2 className="text-lg font-semibold">Admin Panel</h2>
      </div>
      <nav className="space-y-1 px-3">
        <Link
          to="/admin/products"
          className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
        >
          <Package className="h-5 w-5" />
          <span>Ürün Yönetimi</span>
        </Link>
        <Link
          to="/admin/design"
          className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
        >
          <Palette className="h-5 w-5" />
          <span>Tasarım</span>
        </Link>
        <Link
          to="/admin/settings"
          className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
        >
          <Settings className="h-5 w-5" />
          <span>Ayarlar</span>
        </Link>
      </nav>
    </div>
  );
};