import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MobileLayout } from "@/components/MobileLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";
import { 
  Users, 
  BookOpen, 
  GraduationCap,
  ChevronRight,
  Globe
} from "lucide-react";

// Mock data - akan diganti dengan data dari Supabase
const mockHalaqoh = [
  { id: "1", nama: "Halaqoh Al-Azhary", jumlahSantri: 8, jadwal: "Senin, Rabu, Jumat" },
  { id: "2", nama: "Halaqoh Al-Furqon", jumlahSantri: 6, jadwal: "Selasa, Kamis, Sabtu" },
];

const mockSantri = [
  { id: "1", nama: "Muhammad Faiz", nis: "S001", halaqoh: "Halaqoh Al-Azhary", juzTerakhir: 30, status: "Aktif" },
  { id: "2", nama: "Aisyah Nur", nis: "S002", halaqoh: "Halaqoh Al-Azhary", juzTerakhir: 29, status: "Aktif" },
  { id: "3", nama: "Fatimah Zahra", nis: "S003", halaqoh: "Halaqoh Al-Furqon", juzTerakhir: 30, status: "Aktif" },
  { id: "4", nama: "Ahmad Fauzi", nis: "S004", halaqoh: "Halaqoh Al-Furqon", juzTerakhir: 28, status: "Aktif" },
];

export default function DashboardMobile() {
  const [profile, setProfile] = useState<{ namaLengkap: string; email: string } | null>(null);

  useEffect(() => {
    const getProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        // Fetch from profiles table
        const { data: profileData } = await supabase
          .from("profiles")
          .select("full_name")
          .eq("user_id", user.id)
          .single();

        setProfile({
          namaLengkap: profileData?.full_name || user.user_metadata?.nama_lengkap || "Ustadz",
          email: user.email || "",
        });
      }
    };
    getProfile();
  }, []);

  const totalSantri = mockSantri.length;
  const totalHalaqoh = mockHalaqoh.length;

  return (
    <MobileLayout>
      <div className="p-4 space-y-4">
        {/* Welcome Card */}
        <Card className="bg-gradient-to-br from-emerald-500 to-teal-500 border-0 text-white">
          <CardContent className="pt-4 pb-4">
            <p className="text-sm text-white/80">Assalamu'alaikum,</p>
            <h2 className="text-xl font-bold">{profile?.namaLengkap || "Ustadz"}</h2>
            <div className="flex items-center gap-4 mt-3">
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span className="text-sm">{totalSantri} Santri</span>
              </div>
              <div className="flex items-center gap-1">
                <BookOpen className="w-4 h-4" />
                <span className="text-sm">{totalHalaqoh} Halaqoh</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Link to Web */}
        <Link 
          to="/auth" 
          className="flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Buka Web Admin</span>
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        </Link>

        {/* Halaqoh Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Halaqoh Saya</h3>
            <Badge variant="outline">{totalHalaqoh} halaqoh</Badge>
          </div>
          {mockHalaqoh.map((halaqoh) => (
            <Card key={halaqoh.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="font-semibold">{halaqoh.nama}</p>
                    <p className="text-sm text-muted-foreground">{halaqoh.jadwal}</p>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-emerald-500">
                      <Users className="w-3 h-3 mr-1" />
                      {halaqoh.jumlahSantri} santri
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Santri Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Santri Binaan</h3>
            <Badge variant="outline">{totalSantri} santri</Badge>
          </div>
          {mockSantri.map((santri) => (
            <Card key={santri.id}>
              <CardContent className="p-3">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-emerald-100 text-emerald-700 text-sm">
                      {santri.nama.split(" ").map(n => n[0]).join("").slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{santri.nama}</p>
                    <p className="text-xs text-muted-foreground">{santri.halaqoh}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="secondary" className="text-xs">
                      <GraduationCap className="w-3 h-3 mr-1" />
                      Juz {santri.juzTerakhir}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MobileLayout>
  );
}
