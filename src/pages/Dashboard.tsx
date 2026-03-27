import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  BookOpenCheck,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { Layout } from "@/components/Layout";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  mockSantriProgress,
  calculateTargetStats,
  checkTargetStatus,
  CLASS_TARGETS,
} from "@/lib/target-hafalan";
import { getSantriByNama } from "@/lib/mock-data";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  PieChart,
  Pie,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

export default function Dashboard() {
  const navigate = useNavigate();

  const targetStats = useMemo(
    () => calculateTargetStats(mockSantriProgress),
    []
  );

  const targetPerKelasData = useMemo(() => {
    const kelasGroups: Record<string, { total: number; meetsTarget: number }> = {};
    mockSantriProgress.forEach((student) => {
      const kelas = student.kelasNumber;
      if (!kelasGroups[kelas]) kelasGroups[kelas] = { total: 0, meetsTarget: 0 };
      kelasGroups[kelas].total += 1;
      const status = checkTargetStatus(kelas, student.juzSelesai);
      if (status.meetsTarget) kelasGroups[kelas].meetsTarget += 1;
    });
    return Object.entries(kelasGroups)
      .sort(([a], [b]) => Number(a) - Number(b))
      .map(([kelas, data]) => ({
        name: `Kelas ${kelas}`,
        memenuhi: data.meetsTarget,
        belum: data.total - data.meetsTarget,
      }));
  }, []);

  const pieChartData = [
    { name: "Memenuhi", value: targetStats.meetsTarget },
    { name: "Belum", value: targetStats.notMeetsTarget },
  ];

  const studentsNotMeetingTarget = useMemo(() => {
    return mockSantriProgress
      .filter((s) => !checkTargetStatus(s.kelasNumber, s.juzSelesai).meetsTarget)
      .slice(0, 5);
  }, []);

  const eligibleForTasmi = useMemo(() => {
    return mockSantriProgress.filter((s) => s.eligibleForTasmi).slice(0, 5);
  }, []);

  const statCards = [
    { title: "Total Santri", value: mockSantriProgress.length, icon: Users, color: "bg-amber-600" },
    { title: "Memenuhi Target", value: targetStats.meetsTarget, icon: CheckCircle, color: "bg-green-600" },
    { title: "Belum Memenuhi", value: targetStats.notMeetsTarget, icon: XCircle, color: "bg-red-600" },
    { title: "Calon Tasmi'", value: targetStats.eligibleForTasmi, icon: BookOpenCheck, color: "bg-emerald-600" },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Dashboard Tahfidz</h1>
          <p className="text-muted-foreground">Selamat datang di sistem manajemen hafalan Al-Qur'an</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((card) => (
            <Card key={card.title}>
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{card.title}</p>
                  <p className="text-2xl font-bold">{card.value}</p>
                </div>
                <div className={`w-10 h-10 rounded-lg ${card.color} flex items-center justify-center`}>
                  <card.icon className="w-5 h-5 text-white" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Pencapaian Target per Kelas</CardTitle>
              <CardDescription>Perbandingan santri yang memenuhi target</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={targetPerKelasData}>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="memenuhi" fill="#22c55e" />
                  <Bar dataKey="belum" fill="#ef4444" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ringkasan Target Keseluruhan</CardTitle>
              <CardDescription>Proporsi santri memenuhi target</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip />
                  <Legend />
                  <Pie data={pieChartData} dataKey="value" nameKey="name" outerRadius={90}>
                    <Cell fill="#22c55e" />
                    <Cell fill="#ef4444" />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader><CardTitle>Santri Belum Memenuhi Target</CardTitle></CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nama</TableHead>
                    <TableHead>Kelas</TableHead>
                    <TableHead>Target</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {studentsNotMeetingTarget.map((student) => {
                    const target = CLASS_TARGETS[student.kelasNumber];
                    return (
                      <TableRow key={student.id}>
                        <TableCell
                          className="text-primary font-medium cursor-pointer hover:underline"
                          onClick={() => {
                            const s = getSantriByNama(student.nama);
                            if (s) navigate(`/santri/${s.id}`);
                          }}
                        >{student.nama}</TableCell>
                        <TableCell>{student.kelas}</TableCell>
                        <TableCell>Juz {target?.targetJuz}</TableCell>
                        <TableCell>
                          <Badge variant="destructive">{student.jumlahJuzHafal} Juz</Badge>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Calon Peserta Tasmi'</CardTitle></CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nama</TableHead>
                    <TableHead>Kelas</TableHead>
                    <TableHead>Hafalan</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {eligibleForTasmi.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell
                        className="text-primary font-medium cursor-pointer hover:underline"
                        onClick={() => {
                          const s = getSantriByNama(student.nama);
                          if (s) navigate(`/santri/${s.id}`);
                        }}
                      >{student.nama}</TableCell>
                      <TableCell>{student.kelas}</TableCell>
                      <TableCell><Badge>{student.jumlahJuzHafal} Juz</Badge></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader><CardTitle>Target Hafalan per Kelas</CardTitle></CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {Object.values(CLASS_TARGETS).map((target) => (
                <div key={target.kelasName} className="p-4 border rounded-lg">
                  <p className="font-semibold">{target.kelasName}</p>
                  <p className="text-primary font-bold">Juz {target.targetJuz}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
