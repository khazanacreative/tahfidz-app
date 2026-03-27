import { useState, useMemo } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Save } from "lucide-react";
import { toast } from "sonner";
import { keteranganPredikatP3 } from "@/lib/rapor-akademik-types";
import { MOCK_TAHUN_AJARAN, MOCK_KELAS_AKADEMIK, getSantriByKelas } from "@/lib/mock-akademik-data";

type PredikatP5 = "MB" | "SB" | "BSH" | "SAB";

interface DimensiP5 { dimensi: string; elemen: string; deskripsi: string; }

const DIMENSI_P5: DimensiP5[] = [
  { dimensi: "Beriman, Bertaqwa kepada Tuhan YME, dan Berakhlak Mulia", elemen: "Elemen akhlak beragama", deskripsi: "Terbiasa melaksanakan ibadah wajib sesuai tuntunan agama/kepercayaannya." },
  { dimensi: "Beriman, Bertaqwa kepada Tuhan YME, dan Berakhlak Mulia", elemen: "Elemen akhlak pribadi", deskripsi: "Mulai membiasakan diri untuk disiplin, rapi, menjaga tingkah laku." },
  { dimensi: "Beriman, Bertaqwa kepada Tuhan YME, dan Berakhlak Mulia", elemen: "Elemen akhlak kepada alam", deskripsi: "Terbiasa berperilaku ramah lingkungan." },
  { dimensi: "Bergotong Royong", elemen: "Elemen kolaborasi", deskripsi: "Menyadari perlunya saling membantu dalam memenuhi kebutuhan." },
  { dimensi: "Mandiri", elemen: "Elemen pemahaman diri", deskripsi: "Mengidentifikasi kemampuan dan tantangan yang dihadapi." },
  { dimensi: "Mandiri", elemen: "Elemen regulasi diri", deskripsi: "Menjalankan kegiatan secara mandiri dan bertahan mengerjakan tugas." },
  { dimensi: "Bernalar Kritis", elemen: "Elemen memperoleh informasi", deskripsi: "Mengajukan pertanyaan untuk mengidentifikasi permasalahan." },
  { dimensi: "Bernalar Kritis", elemen: "Elemen refleksi pemikiran", deskripsi: "Menyampaikan dan menjelaskan alasan dari hal yang dipikirkan." },
  { dimensi: "Kreatif", elemen: "Elemen menghasilkan karya orisinal", deskripsi: "Mengeksplorasi pikiran dalam bentuk karya dan tindakan." },
];

const predikatColors: Record<PredikatP5, string> = {
  MB: "bg-amber-500/10 text-amber-700",
  SB: "bg-blue-500/10 text-blue-700",
  BSH: "bg-green-500/10 text-green-700",
  SAB: "bg-purple-500/10 text-purple-700",
};

export default function AkademikP5() {
  const [selectedTa, setSelectedTa] = useState(MOCK_TAHUN_AJARAN.find(t => t.aktif)?.id || "");
  const [filterJenjang, setFilterJenjang] = useState("SMP");
  const [selectedKelas, setSelectedKelas] = useState("");
  const [selectedSantri, setSelectedSantri] = useState("");
  const [p5Data, setP5Data] = useState<Record<number, PredikatP5>>({});
  const [saving, setSaving] = useState(false);

  const filteredKelas = MOCK_KELAS_AKADEMIK.filter(k => !k.jenjang || k.jenjang === filterJenjang);
  const santriList = useMemo(() => {
    if (!selectedKelas) return [];
    const list = getSantriByKelas(selectedKelas);
    if (list.length > 0 && !selectedSantri) setSelectedSantri(list[0].id);
    return list;
  }, [selectedKelas]);

  const handleNilaiChange = (idx: number, value: PredikatP5) => {
    setP5Data(prev => ({ ...prev, [idx]: value }));
  };

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => { toast.success("Data P5 berhasil disimpan"); setSaving(false); }, 300);
  };

  const grouped = DIMENSI_P5.reduce((acc, d, idx) => {
    if (!acc[d.dimensi]) acc[d.dimensi] = [];
    acc[d.dimensi].push({ ...d, idx });
    return acc;
  }, {} as Record<string, (DimensiP5 & { idx: number })[]>);

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Profil Pelajar Pancasila (P5)</h1>
            <p className="text-muted-foreground text-sm mt-1">Penilaian capaian dimensi P5 santri</p>
          </div>
          <Button onClick={handleSave} disabled={saving}><Save className="w-4 h-4 mr-2" />{saving ? "Menyimpan..." : "Simpan"}</Button>
        </div>

        <Card>
          <CardContent className="pt-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
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
                <Select value={filterJenjang} onValueChange={v => { setFilterJenjang(v); setSelectedKelas(""); setSelectedSantri(""); }}>
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
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1 block">Santri</label>
                <Select value={selectedSantri} onValueChange={setSelectedSantri}>
                  <SelectTrigger><SelectValue placeholder="Pilih Santri" /></SelectTrigger>
                  <SelectContent>
                    {santriList.map(s => <SelectItem key={s.id} value={s.id}>{s.nama_santri}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-wrap gap-2">
          {(Object.entries(keteranganPredikatP3) as [PredikatP5, string][]).map(([key, val]) => (
            <Badge key={key} className={predikatColors[key]}>{key} = {val}</Badge>
          ))}
        </div>

        {selectedSantri && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">
                Penilaian P5 — {santriList.find(s => s.id === selectedSantri)?.nama_santri}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {Object.entries(grouped).map(([dimensi, items]) => (
                  <div key={dimensi}>
                    <h3 className="font-semibold text-sm mb-2 text-primary">Dimensi: {dimensi}</h3>
                    <Table className="border">
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[200px]">Elemen</TableHead>
                          <TableHead>Deskripsi</TableHead>
                          <TableHead className="text-center w-[200px]">Penilaian</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {items.map((item) => (
                          <TableRow key={item.idx}>
                            <TableCell className="text-sm font-medium">{item.elemen}</TableCell>
                            <TableCell className="text-xs text-muted-foreground">{item.deskripsi}</TableCell>
                            <TableCell>
                              <div className="flex justify-center gap-1">
                                {(["MB", "SB", "BSH", "SAB"] as PredikatP5[]).map((p) => (
                                  <Button key={p} size="sm" variant={p5Data[item.idx] === p ? "default" : "outline"} className="h-7 px-2 text-xs" onClick={() => handleNilaiChange(item.idx, p)}>{p}</Button>
                                ))}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {!selectedSantri && (
          <Card className="bg-muted/30">
            <CardContent className="text-center py-12 text-muted-foreground">
              Pilih tahun ajaran, kelas, dan santri untuk memulai penilaian P5
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
}
