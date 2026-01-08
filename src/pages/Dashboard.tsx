import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookMarked, BookOpen, TrendingUp } from "lucide-react";
import { Layout } from "@/components/Layout";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalAsatidz: 0,
    totalWaliSantri: 0,
    totalAdmin: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    // Fetch user role stats from user_roles table
    const { data: roles, error } = await supabase
      .from("user_roles")
      .select("role");

    if (!error && roles) {
      const adminCount = roles.filter(r => r.role === "admin").length;
      const asatidzCount = roles.filter(r => r.role === "asatidz").length;
      const waliSantriCount = roles.filter(r => r.role === "wali_santri").length;

      setStats({
        totalUsers: roles.length,
        totalAsatidz: asatidzCount,
        totalWaliSantri: waliSantriCount,
        totalAdmin: adminCount,
      });
    }
  };

  const statCards = [
    {
      title: "Total Pengguna",
      value: stats.totalUsers,
      icon: Users,
      gradient: "from-green-500 to-lime-500",
    },
    {
      title: "Total Asatidz",
      value: stats.totalAsatidz,
      icon: BookMarked,
      gradient: "from-green-500 to-lime-500",
    },
    {
      title: "Total Wali Santri",
      value: stats.totalWaliSantri,
      icon: BookOpen,
      gradient: "from-green-500 to-lime-500",
    },
    {
      title: "Total Admin",
      value: stats.totalAdmin,
      icon: TrendingUp,
      gradient: "from-green-500 to-lime-500",
    },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard Tahfidz</h1>
          <p className="text-muted-foreground mt-1">
            Selamat datang di sistem manajemen hafalan Al-Qur'an
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {statCards.map((card) => (
            <Card key={card.title} className="overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {card.title}
                </CardTitle>
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${card.gradient} flex items-center justify-center`}>
                  <card.icon className="w-5 h-5 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{card.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Informasi Sistem</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <span className="text-muted-foreground">
                  Sistem manajemen tahfidz dengan fitur lengkap untuk pengelolaan hafalan santri
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 rounded-full bg-secondary"></div>
                <span className="text-muted-foreground">
                  Dilengkapi dengan fitur setoran, absensi, penilaian, dan laporan
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 rounded-full bg-chart-3"></div>
                <span className="text-muted-foreground">
                  Akses berbasis role untuk Admin, Asatidz, dan Wali Santri
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
