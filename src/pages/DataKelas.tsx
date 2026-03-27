import { useState } from "react";
import { MOCK_USTADZ } from "@/lib/mock-data";
import { MOCK_KELAS_AKADEMIK, MockKelasAkademik } from "@/lib/mock-akademik-data";
import { usePagination } from "@/hooks/use-pagination";
import { TablePagination } from "@/components/TablePagination";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Plus, Pencil, Trash2, GraduationCap } from "lucide-react";
import { toast } from "sonner";

export default function DataKelas() {
  const [kelasList, setKelasList] = useState<MockKelasAkademik[]>([...MOCK_KELAS_AKADEMIK]);
  const ustadzList = MOCK_USTADZ;
  const pagination = usePagination(kelasList);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedKelas, setSelectedKelas] = useState<MockKelasAkademik | null>(null);
  const [namaKelas, setNamaKelas] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [waliKelas, setWaliKelas] = useState("");

  const getWaliName = (id: string | null) => {
    if (!id) return "-";
    return ustadzList.find(u => u.id === id)?.nama || "-";
  };

  const handleSubmit = () => {
    if (!namaKelas.trim()) {
      toast.error("Nama kelas harus diisi");
      return;
    }
    if (isEditMode && selectedKelas) {
      setKelasList(prev => prev.map(k => k.id === selectedKelas.id ? { ...k, nama_kelas: namaKelas, deskripsi: deskripsi || null, id_wali_kelas: waliKelas || null } : k));
      toast.success("Kelas berhasil diupdate");
    } else {
      const newKelas: MockKelasAkademik = {
        id: `k_${Date.now()}`,
        nama_kelas: namaKelas,
        deskripsi: deskripsi || null,
        id_wali_kelas: waliKelas || null,
        jenjang: "SMP",
        created_at: new Date().toISOString(),
      };
      setKelasList(prev => [...prev, newKelas]);
      toast.success("Kelas berhasil ditambahkan");
    }
    resetForm();
    setIsDialogOpen(false);
  };

  const handleEdit = (kelas: MockKelasAkademik) => {
    setSelectedKelas(kelas);
    setNamaKelas(kelas.nama_kelas);
    setDeskripsi(kelas.deskripsi || "");
    setWaliKelas(kelas.id_wali_kelas || "");
    setIsEditMode(true);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus kelas ini?")) return;
    setKelasList(prev => prev.filter(k => k.id !== id));
    toast.success("Kelas berhasil dihapus");
  };

  const resetForm = () => {
    setNamaKelas("");
    setDeskripsi("");
    setWaliKelas("");
    setSelectedKelas(null);
    setIsEditMode(false);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <GraduationCap className="w-7 h-7 text-primary" />
              Data Kelas
            </h1>
            <p className="text-muted-foreground text-sm mt-1">Kelola data kelas seperti KBTK, Paket A, Paket B, dll.</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm(); }}>
            <DialogTrigger asChild>
              <Button><Plus className="w-4 h-4 mr-2" />Tambah Kelas</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>{isEditMode ? "Edit Kelas" : "Tambah Kelas Baru"}</DialogTitle></DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label>Nama Kelas *</Label>
                  <Input placeholder="Contoh: KBTK A, Paket A Kelas 6" value={namaKelas} onChange={(e) => setNamaKelas(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Deskripsi</Label>
                  <Input placeholder="Deskripsi kelas (opsional)" value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Wali Kelas</Label>
                  <Select value={waliKelas} onValueChange={setWaliKelas}>
                    <SelectTrigger><SelectValue placeholder="Pilih wali kelas (opsional)" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">— Tidak ada —</SelectItem>
                      {ustadzList.map((u) => (<SelectItem key={u.id} value={u.id}>{u.nama}</SelectItem>))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Batal</Button>
                  <Button onClick={handleSubmit}>{isEditMode ? "Simpan Perubahan" : "Tambah Kelas"}</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="bg-card rounded-lg border border-border p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>No</TableHead>
                <TableHead>Nama Kelas</TableHead>
                <TableHead>Deskripsi</TableHead>
                <TableHead>Wali Kelas</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pagination.paginatedItems.map((kelas, index) => (
                <TableRow key={kelas.id}>
                  <TableCell>{pagination.startIndex + index + 1}</TableCell>
                  <TableCell className="font-semibold">{kelas.nama_kelas}</TableCell>
                  <TableCell className="text-muted-foreground">{kelas.deskripsi || "-"}</TableCell>
                  <TableCell>{getWaliName(kelas.id_wali_kelas)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleEdit(kelas)}><Pencil className="w-4 h-4" /></Button>
                      <Button variant="outline" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => handleDelete(kelas.id)}><Trash2 className="w-4 h-4" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} totalItems={pagination.totalItems} startIndex={pagination.startIndex} onPageChange={pagination.setCurrentPage} />
        </div>
      </div>
    </Layout>
  );
}
