import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen, FileText, TrendingUp, ClipboardCheck, Trophy } from "lucide-react";
import { useMemo } from "react";
import { MOCK_SANTRI_AKADEMIK, MOCK_MAPEL, MOCK_KOMPONEN_NILAI, MOCK_EKSKUL, generateMockNilai } from "@/lib/mock-akademik-data";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const COLORS = ["hsl(var(--primary))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))", "hsl(var(--chart-5))"];

export default function AkademikDashboard() {
  const mockNilai = useMemo(() => generateMockNilai(), []);
  
  const umumMapel = MOCK_MAPEL.filter(m => m.kategori === "Umum" && m.jenjang === "SMP");
  const umumKomponen = MOCK_KOMPONEN_NILAI.filter(k => {
    const mapel = MOCK_MAPEL.find(m => m.id === k.id_mapel);
    return mapel && mapel.kategori === "Umum";
  });
  
  const allNilaiValues = Object.values(mockNilai);
  const totalNilai = allNilaiValues.length;
  const avgNilai = totalNilai > 0 ? Math.round(allNilaiValues.reduce((a, b) => a + b, 0) / totalNilai * 10) / 10 : 0;

  const nilaiPerMapel = useMemo(() => {
    const mapelMap: Record<string, { total: number; count: number }> = {};
    Object.entries(mockNilai).forEach(([key, nilai]) => {
      const komponenId = key.split("_")[1];
      const komponen = MOCK_KOMPONEN_NILAI.find(k => k.id === komponenId);
      if (!komponen) return;
      const mapel = MOCK_MAPEL.find(m => m.id === komponen.id_mapel);
      if (!mapel || mapel.kategori !== "Umum") return;
      if (!mapelMap[mapel.nama]) mapelMap[mapel.nama] = { total: 0, count: 0 };
      mapelMap[mapel.nama].total += nilai;
      mapelMap[mapel.nama].count += 1;
    });
    return Object.entries(mapelMap).map(([nama, v]) => ({
      nama,
      rataRata: Math.round(v.total / v.count * 10) / 10,
    })).sort((a, b) => b.rataRata - a.rataRata);
  }, [mockNilai]);

  const distribusiNilai = useMemo(() => {
    const ranges = { "90-100": 0, "80-89": 0, "70-79": 0, "60-69": 0, "<60": 0 };
    allNilaiValues.forEach(v => {
      if (v >= 90) ranges["90-100"]++;
      else if (v >= 80) ranges["80-89"]++;
      else if (v >= 70) ranges["70-79"]++;
      else if (v >= 60) ranges["60-69"]++;
      else ranges["<60"]++;
    });
    return Object.entries(ranges).map(([name, value]) => ({ name, value }));
  }, []);

  const recentActivity = nilaiPerMapel.slice(0, 5).map(n => ({
    mapel: n.nama,
    santri: Object.keys(mockNilai).length,
    waktu: "Semester ini",
  }));

  const statCards = [
    { title: "Total Santri Aktif", value: MOCK_SANTRI_AKADEMIK.filter(s => s.status === "Aktif").length, desc: "Santri terdaftar", icon: Users, color: "text-blue-500" },
    { title: "Mata Pelajaran", value: umumMapel.length, desc: "Mapel umum aktif", icon: BookOpen, color: "text-green-500" },
    { title: "Data Nilai", value: totalNilai, desc: "Nilai terinput", icon: FileText, color: "text-orange-500" },
    { title: "Rata-rata Nilai", value: avgNilai || "-", desc: "Semua mapel umum", icon: TrendingUp, color: "text-purple-500" },
    { title: "Komponen Nilai", value: MOCK_KOMPONEN_NILAI.length, desc: "Total komponen", icon: ClipboardCheck, color: "text-cyan-500" },
    { title: "Ekstrakurikuler", value: MOCK_EKSKUL.filter(e => e.aktif).length, desc: "Ekskul aktif", icon: Trophy, color: "text-pink-500" },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard Akademik</h1>
          <p className="text-muted-foreground text-sm mt-1">Ringkasan data akademik mata pelajaran umum</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {statCards.map((card) => (
            <Card key={card.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-xs font-medium text-muted-foreground">{card.title}</CardTitle>
                <card.icon className={`w-4 h-4 ${card.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{card.value}</div>
                <p className="text-xs text-muted-foreground">{card.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card>
            <CardHeader><CardTitle className="text-base">Rata-rata Nilai per Mapel</CardTitle></CardHeader>
            <CardContent>
              {nilaiPerMapel.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={nilaiPerMapel} layout="vertical" margin={{ left: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis type="category" dataKey="nama" width={120} tick={{ fontSize: 11 }} />
                    <Tooltip />
                    <Bar dataKey="rataRata" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-muted-foreground text-center py-8">Belum ada data nilai</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-base">Distribusi Nilai</CardTitle></CardHeader>
            <CardContent>
              {distribusiNilai.some(d => d.value > 0) ? (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie data={distribusiNilai} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label={({ name, value }) => `${name}: ${value}`}>
                      {distribusiNilai.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-muted-foreground text-center py-8">Belum ada data nilai</p>
              )}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader><CardTitle className="text-base">Ringkasan Nilai per Mata Pelajaran</CardTitle></CardHeader>
          <CardContent>
            {recentActivity.length > 0 ? (
              <div className="space-y-3">
                {recentActivity.map((a, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <BookOpen className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{a.mapel}</p>
                        <p className="text-xs text-muted-foreground">{a.waktu}</p>
                      </div>
                    </div>
                    <span className="text-sm font-semibold">{a.santri} nilai</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-8">Belum ada aktivitas</p>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
