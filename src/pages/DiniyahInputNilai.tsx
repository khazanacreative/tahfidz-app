import { useState, useMemo } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Save, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { MOCK_TAHUN_AJARAN, MOCK_MAPEL, MOCK_KOMPONEN_NILAI, MOCK_KELAS_AKADEMIK, getSantriByKelas } from "@/lib/mock-akademik-data";

export default function DiniyahInputNilai() {
  const [selectedMapel, setSelectedMapel] = useState("");
  const [selectedKelas, setSelectedKelas] = useState("");
  const [selectedTa, setSelectedTa] = useState(MOCK_TAHUN_AJARAN.find(t => t.aktif)?.id || "");
  const [filterJenjang, setFilterJenjang] = useState("SMP");
  const [nilaiMap, setNilaiMap] = useState<Record<string, { value: number | null; dirty: boolean }>>({});
  const [saving, setSaving] = useState(false);

  const agamaMapel = MOCK_MAPEL.filter(m => m.kategori === "Agama" && m.aktif && m.jenjang === filterJenjang);
  const santriList = useMemo(() => selectedKelas ? getSantriByKelas(selectedKelas) : [], [selectedKelas]);
  const komponenList = useMemo(() => MOCK_KOMPONEN_NILAI.filter(k => k.id_mapel === selectedMapel), [selectedMapel]);

  const handleNilaiChange = (santriId: string, komponenId: string, value: string) => {
    const key = `${santriId}_${komponenId}`;
    const numVal = value === "" ? null : Number(value);
    setNilaiMap(prev => ({ ...prev, [key]: { value: numVal, dirty: true } }));
  };

  const handleSave = () => {
    setSaving(true);
    const dirtyCount = Object.values(nilaiMap).filter(v => v.dirty).length;
    setTimeout(() => {
      setNilaiMap(prev => {
        const updated = { ...prev };
        Object.keys(updated).forEach(k => { updated[k] = { ...updated[k], dirty: false }; });
        return updated;
      });
      toast.success(`${dirtyCount} nilai berhasil disimpan`);
      setSaving(false);
    }, 300);
  };

  const getAverage = (santriId: string): string => {
    const values = komponenList.map(k => nilaiMap[`${santriId}_${k.id}`]?.value).filter(v => v !== null && v !== undefined) as number[];
    if (values.length === 0) return "-";
    return (values.reduce((a, b) => a + b, 0) / values.length).toFixed(1);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Input Nilai Diniyah</h1>
            <p className="text-muted-foreground text-sm mt-1">Input nilai mata pelajaran keagamaan per kelas</p>
          </div>
          <Button onClick={handleSave} disabled={saving || !Object.values(nilaiMap).some(v => v.dirty)}>
            <Save className="w-4 h-4 mr-1" />{saving ? "Menyimpan..." : "Simpan Nilai"}
          </Button>
        </div>

        <Card>
          <CardContent className="pt-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Tahun Ajaran</label>
                <Select value={selectedTa} onValueChange={setSelectedTa}>
                  <SelectTrigger><SelectValue placeholder="Pilih TA" /></SelectTrigger>
                  <SelectContent>{MOCK_TAHUN_AJARAN.map(ta => <SelectItem key={ta.id} value={ta.id}>{ta.nama} - {ta.semester} {ta.aktif ? "✓" : ""}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Jenjang</label>
                <Select value={filterJenjang} onValueChange={v => { setFilterJenjang(v); setSelectedMapel(""); }}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent><SelectItem value="TK">TK</SelectItem><SelectItem value="SD">SD</SelectItem><SelectItem value="SMP">SMP</SelectItem></SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Kelas</label>
                <Select value={selectedKelas} onValueChange={setSelectedKelas}>
                  <SelectTrigger><SelectValue placeholder="Pilih Kelas" /></SelectTrigger>
                  <SelectContent>{MOCK_KELAS_AKADEMIK.map(k => <SelectItem key={k.id} value={k.id}>{k.nama_kelas}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Mata Pelajaran Diniyah</label>
                <Select value={selectedMapel} onValueChange={setSelectedMapel}>
                  <SelectTrigger><SelectValue placeholder="Pilih Mapel" /></SelectTrigger>
                  <SelectContent>{agamaMapel.map(m => <SelectItem key={m.id} value={m.id}>{m.nama}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {selectedMapel && selectedKelas && selectedTa && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">
                {MOCK_MAPEL.find(m => m.id === selectedMapel)?.nama} — {santriList.length} siswa, {komponenList.length} komponen
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {komponenList.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">Belum ada komponen penilaian untuk mapel ini.</div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-10 sticky left-0 bg-[#015504] z-10">No</TableHead>
                        <TableHead className="min-w-[180px] sticky left-10 bg-[#015504] z-10">Nama Siswa</TableHead>
                        {komponenList.map(k => (
                          <TableHead key={k.id} className="min-w-[80px] text-center">
                            <div className="text-[10px] leading-tight">{k.nama_komponen}</div>
                            <div className="text-[9px] opacity-70 font-normal">{k.jenis}</div>
                          </TableHead>
                        ))}
                        <TableHead className="text-center min-w-[70px]">Rata-rata</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {santriList.map((s, idx) => (
                        <TableRow key={s.id}>
                          <TableCell className="sticky left-0 bg-card z-10">{idx + 1}</TableCell>
                          <TableCell className="sticky left-10 bg-card z-10 font-medium text-sm">{s.nama_santri}</TableCell>
                          {komponenList.map(k => {
                            const key = `${s.id}_${k.id}`;
                            const val = nilaiMap[key]?.value;
                            const isDirty = nilaiMap[key]?.dirty;
                            return (
                              <TableCell key={k.id} className="p-1">
                                <Input type="number" min={0} max={100}
                                  className={`w-16 h-8 text-center text-sm p-1 ${isDirty ? "border-primary ring-1 ring-primary/30" : ""}`}
                                  value={val ?? ""} onChange={e => handleNilaiChange(s.id, k.id, e.target.value)} />
                              </TableCell>
                            );
                          })}
                          <TableCell className="text-center font-semibold">{getAverage(s.id)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {(!selectedMapel || !selectedKelas || !selectedTa) && (
          <Card className="bg-muted/30">
            <CardContent className="text-center py-12 text-muted-foreground">
              Pilih tahun ajaran, mata pelajaran diniyah, dan kelas untuk memulai input nilai
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
}
