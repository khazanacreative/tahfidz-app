import { useState, useMemo } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Save } from "lucide-react";
import { toast } from "sonner";
import { MOCK_TAHUN_AJARAN, MOCK_KELAS_AKADEMIK, getSantriByKelas } from "@/lib/mock-akademik-data";

const JENIS_IBADAH = ["Praktek Wudhu", "Praktek Shalat", "Dzikir Setelah Shalat", "Dzikir Pagi Petang"];

function getPredikat(nilai: number): { predikat: string; color: string } {
  if (nilai >= 90) return { predikat: "A", color: "bg-green-500/10 text-green-700" };
  if (nilai >= 80) return { predikat: "B", color: "bg-blue-500/10 text-blue-700" };
  if (nilai >= 70) return { predikat: "C", color: "bg-amber-500/10 text-amber-700" };
  return { predikat: "D", color: "bg-red-500/10 text-red-700" };
}

export default function AkademikIbadah() {
  const [selectedTa, setSelectedTa] = useState(MOCK_TAHUN_AJARAN.find(t => t.aktif)?.id || "");
  const [filterJenjang, setFilterJenjang] = useState("SMP");
  const [selectedKelas, setSelectedKelas] = useState("");
  const [dataMap, setDataMap] = useState<Record<string, { nilai: number; kkm: number }>>({});
  const [saving, setSaving] = useState(false);

  const filteredKelas = MOCK_KELAS_AKADEMIK.filter(k => !k.jenjang || k.jenjang === filterJenjang);
  const santriList = useMemo(() => selectedKelas ? getSantriByKelas(selectedKelas) : [], [selectedKelas]);

  const handleNilaiChange = (santriId: string, idx: number, value: string) => {
    const num = Math.max(0, Math.min(100, parseInt(value) || 0));
    const key = `${santriId}_${idx}`;
    setDataMap(prev => ({ ...prev, [key]: { ...(prev[key] || { nilai: 0, kkm: 70 }), nilai: num } }));
  };

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => { toast.success("Nilai keterampilan ibadah berhasil disimpan"); setSaving(false); }, 300);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Keterampilan Ibadah</h1>
            <p className="text-muted-foreground text-sm mt-1">Penilaian praktek ibadah santri</p>
          </div>
          <Button onClick={handleSave} disabled={saving}><Save className="w-4 h-4 mr-2" />{saving ? "Menyimpan..." : "Simpan"}</Button>
        </div>

        <Card>
          <CardContent className="pt-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Tahun Ajaran</label>
                <Select value={selectedTa} onValueChange={setSelectedTa}>
                  <SelectTrigger><SelectValue placeholder="Pilih TA" /></SelectTrigger>
                  <SelectContent>
                    {MOCK_TAHUN_AJARAN.map(ta => <SelectItem key={ta.id} value={ta.id}>{ta.nama} - {ta.semester} {ta.aktif ? "✓" : ""}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Jenjang</label>
                <Select value={filterJenjang} onValueChange={v => { setFilterJenjang(v); setSelectedKelas(""); }}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="TK">TK</SelectItem>
                    <SelectItem value="SD">SD</SelectItem>
                    <SelectItem value="SMP">SMP</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Kelas</label>
                <Select value={selectedKelas} onValueChange={setSelectedKelas}>
                  <SelectTrigger><SelectValue placeholder="Pilih Kelas" /></SelectTrigger>
                  <SelectContent>
                    {filteredKelas.map(k => <SelectItem key={k.id} value={k.id}>{k.nama_kelas}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {selectedKelas && santriList.length > 0 && (
          <Card>
            <CardHeader className="pb-3"><CardTitle className="text-base">Nilai Keterampilan Ibadah ({santriList.length} santri)</CardTitle></CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-8">No</TableHead>
                      <TableHead className="min-w-[140px]">Nama Santri</TableHead>
                      {JENIS_IBADAH.map((j, i) => (
                        <TableHead key={i} className="text-center min-w-[120px]">
                          <div className="text-xs">{j}</div>
                          <div className="text-[10px] text-muted-foreground">KKM: 70</div>
                        </TableHead>
                      ))}
                      {JENIS_IBADAH.map((_, i) => (
                        <TableHead key={`pred-${i}`} className="text-center w-16">Predikat</TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {santriList.map((santri, sIdx) => (
                      <TableRow key={santri.id}>
                        <TableCell>{sIdx + 1}</TableCell>
                        <TableCell className="font-medium text-sm">{santri.nama_santri}</TableCell>
                        {JENIS_IBADAH.map((_, iIdx) => {
                          const entry = dataMap[`${santri.id}_${iIdx}`] || { nilai: 0, kkm: 70 };
                          return (
                            <TableCell key={iIdx} className="p-1">
                              <Input type="number" min={0} max={100} value={entry.nilai}
                                onChange={(e) => handleNilaiChange(santri.id, iIdx, e.target.value)}
                                className={`h-8 w-16 text-center mx-auto text-sm ${entry.nilai < 70 ? "border-red-400 text-red-600" : ""}`} />
                            </TableCell>
                          );
                        })}
                        {JENIS_IBADAH.map((_, iIdx) => {
                          const entry = dataMap[`${santri.id}_${iIdx}`] || { nilai: 0, kkm: 70 };
                          const { predikat, color } = getPredikat(entry.nilai);
                          return (
                            <TableCell key={`pred-${iIdx}`} className="text-center">
                              <Badge className={color}>{predikat}</Badge>
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}

        {!selectedKelas && (
          <Card className="bg-muted/30">
            <CardContent className="text-center py-12 text-muted-foreground">
              Pilih tahun ajaran dan kelas untuk memulai input nilai ibadah
            </CardContent>
          </Card>
        )}

        <Card className="bg-muted/50">
          <CardContent className="p-4">
            <h4 className="font-semibold mb-2 text-sm">ℹ️ Informasi</h4>
            <ul className="space-y-1 text-xs text-muted-foreground">
              <li>• KKM (Kriteria Ketuntasan Minimal) = 70</li>
              <li>• Predikat: A (90-100), B (80-89), C (70-79), D (0-69)</li>
              <li>• Nilai di bawah KKM ditandai merah</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
