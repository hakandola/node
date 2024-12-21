import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, Package, ShoppingCart, FolderTree, Activity, Store } from "lucide-react";

export function DashboardStats() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      const [
        { count: totalOrders },
        { data: salesData },
        { count: totalCustomers },
        { count: totalCategories },
        { count: totalProducts },
      ] = await Promise.all([
        supabase.from('orders').select('*', { count: 'exact' }),
        supabase.from('orders').select('total_amount'),
        supabase.from('profiles').select('*', { count: 'exact' }),
        supabase.from('categories').select('*', { count: 'exact' }),
        supabase.from('products').select('*', { count: 'exact' }),
      ]);

      const totalSales = salesData?.reduce((sum, order) => sum + (order.total_amount || 0), 0) || 0;
      
      return {
        totalOrders: totalOrders || 0,
        totalSales,
        totalCustomers: totalCustomers || 0,
        totalCategories: totalCategories || 0,
        totalProducts: totalProducts || 0,
        onlineVisitors: 0, // This would require real-time tracking, implemented separately
      };
    },
  });

  if (isLoading) {
    return <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {[...Array(6)].map((_, i) => (
        <Card key={i} className="animate-pulse">
          <CardHeader className="space-y-2">
            <div className="h-4 bg-muted rounded w-1/2"></div>
            <div className="h-8 bg-muted rounded w-3/4"></div>
          </CardHeader>
        </Card>
      ))}
    </div>;
  }

  const statCards = [
    {
      title: "Toplam Sipariş",
      value: stats?.totalOrders.toLocaleString('tr-TR'),
      icon: ShoppingCart,
      description: "Alınan toplam sipariş sayısı",
    },
    {
      title: "Toplam Satış",
      value: `${stats?.totalSales.toLocaleString('tr-TR')} ₺`,
      icon: Store,
      description: "Toplam satış tutarı",
    },
    {
      title: "Toplam Müşteri",
      value: stats?.totalCustomers.toLocaleString('tr-TR'),
      icon: Users,
      description: "Kayıtlı müşteri sayısı",
    },
    {
      title: "Toplam Kategori",
      value: stats?.totalCategories.toLocaleString('tr-TR'),
      icon: FolderTree,
      description: "Mevcut kategori sayısı",
    },
    {
      title: "Çevrimiçi Ziyaretçi",
      value: stats?.onlineVisitors.toLocaleString('tr-TR'),
      icon: Activity,
      description: "Anlık ziyaretçi sayısı",
    },
    {
      title: "Toplam Ürün",
      value: stats?.totalProducts.toLocaleString('tr-TR'),
      icon: Package,
      description: "Mevcut ürün sayısı",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {statCards.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">
              {stat.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}