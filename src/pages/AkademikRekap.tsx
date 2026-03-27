import { useState, useMemo } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { MOCK_TAHUN_AJARAN, MOCK_MAPEL, MOCK_KOMPONEN_NILAI, MOCK_KELAS_AKADEMIK, getSantriByKelas, generateMockNilai } from "@/lib/mock-akademik-data";

export default function AkademikRekap() {
  const [selectedKelas, setSelectedKelas] = useState("");
  const [selectedTa, setSelectedTa] = useState(MOCK_TAHUN_AJARAN.find(t => t.aktif)?.id || "");
  const mapelList = MOCK_MAPEL.filter(m => m.aktif && m.jenjang === "SMP" && m.kategori === "Umum");
  const mockNilai = useMemo(() => generateMockNilai(), []);

  const rekapData = useMemo(() => {
    if (!selectedKelas) return [];
    const santriList = getSantriByKelas(selectedKelas);
    const rows = santriList.map(s => {
      const nilaiPerMapel: Record<string, number | null> = {};
      let totalNilai = 0;
      let mapelCount = 0;

      mapelList.forEach(m => {
        const relevantKomp = MOCK_KOMPONEN_NILAI.filter(k => k.id_mapel === m.id);
        const values = relevantKomp.map(k => mockNilai[`${s.id}_${k.id}`]).filter(v => v !== undefined);
        if (values.length > 0) {
          const avg = values.reduce((a, b) => a + b, 0) / values.length;
          nilaiPerMapel[m.id] = Math.round(avg * 100) / 100;
          totalNilai += nilaiPerMapel[m.id]!;
          mapelCount++;
        } else {
          nilaiPerMapel[m.id] = null;
        }
      });

      return { santri: { id: s.id, nama_santri: s.nama_santri, nis: s.nis }, nilaiPerMapel, jumlah: Math.round(totalNilai * 100) / 100, rataRata: mapelCount > 0 ? Math.round((totalNilai / mapelCount) * 100) / 100 : 0, peringkat: 0 };
    });

    rows.sort((a, b) => b.jumlah - a.jumlah);
    rows.forEach((r, i) => { r.peringkat = r.jumlah > 0 ? i + 1 : 0; });
    rows.sort((a, b) => a.santri.nama_santri.localeCompare(b.santri.nama_santri));
    return rows;
  }, [selectedKelas, mockNilai]);

  const getPredikat = (nilai: number | null) => {
    if (nilai === null) return "-";
    if (nilai >= 90) return "A";
    if (nilai >= 80) return "B";
    if (nilai >= 70) return "C";
    return "D";
  };

  const getPredikatColor = (p: string) => {
    switch (p) {
      case "A": return "bg-emerald-500/10 text-emerald-700";
      case "B": return "bg-blue-500/10 text-blue-700";
      case "C": return "bg-amber-500/10 text-amber-700";
      case "D": return "bg-red-500/10 text-red-700";
      default: return "";
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Rekap Nilai & Peringkat</h1>
          <p className="text-muted-foreground text-sm mt-1">Rekapitulasi nilai semua mata pelajaran per kelas</p>
        </div>

        <Card>
          <CardContent className="pt-4">
            <div className="flex gap-3">
              <Select value={selectedTa} onValueChange={setSelectedTa}>
                <SelectTrigger className="w-52"><SelectValue placeholder="Pilih TA" /></SelectTrigger>
                <SelectContent>{MOCK_TAHUN_AJARAN.map(ta => <SelectItem key={ta.id} value={ta.id}>{ta.nama} - {ta.semester} {ta.aktif ? "✓" : ""}</SelectItem>)}</SelectContent>
              </Select>
              <Select value={selectedKelas} onValueChange={setSelectedKelas}>
                <SelectTrigger className="w-52"><SelectValue placeholder="Pilih Kelas" /></SelectTrigger>
                <SelectContent>{MOCK_KELAS_AKADEMIK.map(k => <SelectItem key={k.id} value={k.id}>{k.nama_kelas}</SelectItem>)}</SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {rekapData.length > 0 ? (
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-10 sticky left-0 bg-[#015504] z-10">No</TableHead>
                      <TableHead className="min-w-[160px] sticky left-10 bg-[#015504] z-10">Nama Siswa</TableHead>
                      {mapelList.map(m => (
                        <TableHead key={m.id} className="text-center min-w-[60px]">
                          <div className="text-[9px] leading-tight">{m.nama.length > 10 ? m.nama.substring(0, 10) + "." : m.nama}</div>
                        </TableHead>
                      ))}
                      <TableHead className="text-center">Jumlah</TableHead>
                      <TableHead className="text-center">Rata²</TableHead>
                      <TableHead className="text-center">Peringkat</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rekapData.map((row, idx) => (
                      <TableRow key={row.santri.id}>
                        <TableCell className="sticky left-0 bg-card z-10">{idx + 1}</TableCell>
                        <TableCell className="sticky left-10 bg-card z-10 font-medium text-sm">{row.santri.nama_santri}</TableCell>
                        {mapelList.map(m => {
                          const val = row.nilaiPerMapel[m.id];
                          const kkm = m.kkm || 70;
                          const belowKkm = val !== null && val < kkm;
                          return <TableCell key={m.id} className={`text-center text-sm ${belowKkm ? "text-red-600 font-semibold" : ""}`}>{val !== null ? val : "-"}</TableCell>;
                        })}
                        <TableCell className="text-center font-semibold">{row.jumlah || "-"}</TableCell>
                        <TableCell className="text-center">
                          {row.rataRata > 0 && <Badge className={getPredikatColor(getPredikat(row.rataRata))}>{row.rataRata} ({getPredikat(row.rataRata)})</Badge>}
                        </TableCell>
                        <TableCell className="text-center font-bold text-lg">{row.peringkat || "-"}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        ) : selectedKelas ? (
          <Card><CardContent className="text-center py-12 text-muted-foreground">Belum ada data nilai untuk kelas ini</CardContent></Card>
        ) : (
          <Card className="bg-muted/30"><CardContent className="text-center py-12 text-muted-foreground">Pilih tahun ajaran dan kelas untuk melihat rekap nilai</CardContent></Card>
        )}
      </div>
    </Layout>
  );
}
