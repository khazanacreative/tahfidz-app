import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, Tag } from "lucide-react";
import { toast } from "sonner";

const ENUM_JENIS = ["Tugas Harian", "Ujian Lisan", "Ujian Tulis", "Praktikum", "Proyek", "PAS", "PTS"];

export default function JenisKomponen() {
  const [jenisList] = useState<string[]>([...ENUM_JENIS]);
  const [customJenis, setCustomJenis] = useState<{ id: string; nama: string; deskripsi: string | null }[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ nama: "", deskripsi: "" });

  const handleSave = () => {
    if (!form.nama.trim()) { toast.error("Nama jenis komponen wajib diisi"); return; }
    if (ENUM_JENIS.includes(form.nama.trim())) { toast.error("Jenis komponen sudah ada di sistem"); return; }
    if (editId) {
      setCustomJenis(prev => prev.map(j => j.id === editId ? { ...j, nama: form.nama.trim(), deskripsi: form.deskripsi || null } : j));
      toast.success("Jenis komponen berhasil diupdate");
    } else {
      setCustomJenis(prev => [...prev, { id: `jk_${Date.now()}`, nama: form.nama.trim(), deskripsi: form.deskripsi || null }]);
      toast.success("Jenis komponen berhasil ditambahkan");
    }
    setDialogOpen(false); setEditId(null); setForm({ nama: "", deskripsi: "" });
  };

  const handleDelete = (id: string) => {
    setCustomJenis(prev => prev.filter(j => j.id !== id));
    toast.success("Jenis komponen dihapus");
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Jenis Komponen Penilaian</h1>
            <p className="text-muted-foreground">Kelola jenis/tipe komponen penilaian yang tersedia</p>
          </div>
          <Button onClick={() => { setEditId(null); setForm({ nama: "", deskripsi: "" }); setDialogOpen(true); }}>
            <Plus className="w-4 h-4 mr-2" /> Tambah Jenis
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2"><Tag className="w-5 h-5" /> Jenis Bawaan Sistem</CardTitle>
            <CardDescription>Jenis komponen penilaian standar yang sudah tersedia</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {jenisList.map(j => <Badge key={j} variant="secondary" className="text-sm py-1 px-3">{j}</Badge>)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2"><Tag className="w-5 h-5" /> Jenis Kustom</CardTitle>
            <CardDescription>Jenis komponen penilaian tambahan yang dibuat pengguna</CardDescription>
          </CardHeader>
          <CardContent>
            {customJenis.length === 0 ? (
              <p className="text-muted-foreground text-sm text-center py-8">Belum ada jenis komponen kustom. Klik "Tambah Jenis" untuk menambahkan.</p>
            ) : (
              <Table>
                <TableHeader><TableRow><TableHead>Nama Jenis</TableHead><TableHead>Deskripsi</TableHead><TableHead className="w-24">Aksi</TableHead></TableRow></TableHeader>
                <TableBody>
                  {customJenis.map(item => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.nama}</TableCell>
                      <TableCell className="text-muted-foreground">{item.deskripsi || "-"}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button size="icon" variant="ghost" onClick={() => { setEditId(item.id); setForm({ nama: item.nama, deskripsi: item.deskripsi || "" }); setDialogOpen(true); }}><Pencil className="w-4 h-4" /></Button>
                          <Button size="icon" variant="ghost" onClick={() => handleDelete(item.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>{editId ? "Edit" : "Tambah"} Jenis Komponen</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div><Label>Nama Jenis Komponen</Label><Input value={form.nama} onChange={e => setForm({ ...form, nama: e.target.value })} placeholder="Contoh: Kuis, Portofolio, dll." /></div>
            <div><Label>Deskripsi (opsional)</Label><Input value={form.deskripsi} onChange={e => setForm({ ...form, deskripsi: e.target.value })} placeholder="Keterangan singkat" /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Batal</Button>
            <Button onClick={handleSave}>{editId ? "Update" : "Simpan"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
