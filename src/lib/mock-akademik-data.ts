// Mock data for akademik pages (replacing Supabase cloud data)

import { MOCK_SANTRI, MOCK_KELAS } from "./mock-data";

// ============ TAHUN AJARAN ============
export interface MockTahunAjaran {
  id: string;
  nama: string;
  semester: string;
  aktif: boolean;
  created_at: string;
}

export const MOCK_TAHUN_AJARAN: MockTahunAjaran[] = [
  { id: "ta1", nama: "2025/2026", semester: "Ganjil", aktif: true, created_at: "2025-07-01" },
  { id: "ta2", nama: "2024/2025", semester: "Genap", aktif: false, created_at: "2025-01-01" },
  { id: "ta3", nama: "2024/2025", semester: "Ganjil", aktif: false, created_at: "2024-07-01" },
];

// ============ MATA PELAJARAN ============
export interface MockMapel {
  id: string;
  nama: string;
  kode: string | null;
  jenjang: string;
  kategori: string;
  kkm: number;
  urutan: number;
  aktif: boolean;
}

export const MOCK_MAPEL: MockMapel[] = [
  // SMP Umum
  { id: "mp1", nama: "Matematika", kode: "MTK", jenjang: "SMP", kategori: "Umum", kkm: 70, urutan: 1, aktif: true },
  { id: "mp2", nama: "Bahasa Indonesia", kode: "BIND", jenjang: "SMP", kategori: "Umum", kkm: 70, urutan: 2, aktif: true },
  { id: "mp3", nama: "Bahasa Inggris", kode: "BING", jenjang: "SMP", kategori: "Umum", kkm: 70, urutan: 3, aktif: true },
  { id: "mp4", nama: "IPA", kode: "IPA", jenjang: "SMP", kategori: "Umum", kkm: 70, urutan: 4, aktif: true },
  { id: "mp5", nama: "IPS", kode: "IPS", jenjang: "SMP", kategori: "Umum", kkm: 70, urutan: 5, aktif: true },
  { id: "mp6", nama: "PKn", kode: "PKN", jenjang: "SMP", kategori: "Umum", kkm: 70, urutan: 6, aktif: true },
  // SMP Agama
  { id: "mp7", nama: "Aqidah Akhlak", kode: "AA", jenjang: "SMP", kategori: "Agama", kkm: 70, urutan: 7, aktif: true },
  { id: "mp8", nama: "Fiqih", kode: "FQH", jenjang: "SMP", kategori: "Agama", kkm: 70, urutan: 8, aktif: true },
  { id: "mp9", nama: "SKI", kode: "SKI", jenjang: "SMP", kategori: "Agama", kkm: 70, urutan: 9, aktif: true },
  { id: "mp10", nama: "Bahasa Arab", kode: "BAR", jenjang: "SMP", kategori: "Agama", kkm: 70, urutan: 10, aktif: true },
  // SD Umum
  { id: "mp11", nama: "Matematika", kode: "MTK", jenjang: "SD", kategori: "Umum", kkm: 65, urutan: 1, aktif: true },
  { id: "mp12", nama: "Bahasa Indonesia", kode: "BIND", jenjang: "SD", kategori: "Umum", kkm: 65, urutan: 2, aktif: true },
  { id: "mp13", nama: "IPA", kode: "IPA", jenjang: "SD", kategori: "Umum", kkm: 65, urutan: 3, aktif: true },
  // SD Agama
  { id: "mp14", nama: "Aqidah Akhlak", kode: "AA", jenjang: "SD", kategori: "Agama", kkm: 65, urutan: 4, aktif: true },
  { id: "mp15", nama: "Fiqih", kode: "FQH", jenjang: "SD", kategori: "Agama", kkm: 65, urutan: 5, aktif: true },
];

// ============ KOMPONEN NILAI ============
export interface MockKomponenNilai {
  id: string;
  id_mapel: string;
  nama_komponen: string;
  jenis: string;
  bobot: number;
  urutan: number;
  kelas: string | null;
}

export const MOCK_KOMPONEN_NILAI: MockKomponenNilai[] = [
  { id: "kn1", id_mapel: "mp1", nama_komponen: "Tugas Harian 1", jenis: "Tugas Harian", bobot: 1, urutan: 1, kelas: null },
  { id: "kn2", id_mapel: "mp1", nama_komponen: "Tugas Harian 2", jenis: "Tugas Harian", bobot: 1, urutan: 2, kelas: null },
  { id: "kn3", id_mapel: "mp1", nama_komponen: "PTS", jenis: "PTS", bobot: 2, urutan: 3, kelas: null },
  { id: "kn4", id_mapel: "mp1", nama_komponen: "PAS", jenis: "PAS", bobot: 2, urutan: 4, kelas: null },
  { id: "kn5", id_mapel: "mp2", nama_komponen: "Tugas Harian 1", jenis: "Tugas Harian", bobot: 1, urutan: 1, kelas: null },
  { id: "kn6", id_mapel: "mp2", nama_komponen: "PTS", jenis: "PTS", bobot: 2, urutan: 2, kelas: null },
  { id: "kn7", id_mapel: "mp2", nama_komponen: "PAS", jenis: "PAS", bobot: 2, urutan: 3, kelas: null },
  { id: "kn8", id_mapel: "mp7", nama_komponen: "Ujian Lisan", jenis: "Ujian Lisan", bobot: 1, urutan: 1, kelas: null },
  { id: "kn9", id_mapel: "mp7", nama_komponen: "PTS", jenis: "PTS", bobot: 2, urutan: 2, kelas: null },
  { id: "kn10", id_mapel: "mp7", nama_komponen: "PAS", jenis: "PAS", bobot: 2, urutan: 3, kelas: null },
  { id: "kn11", id_mapel: "mp8", nama_komponen: "Ujian Lisan", jenis: "Ujian Lisan", bobot: 1, urutan: 1, kelas: null },
  { id: "kn12", id_mapel: "mp8", nama_komponen: "Ujian Tulis", jenis: "Ujian Tulis", bobot: 1, urutan: 2, kelas: null },
  { id: "kn13", id_mapel: "mp8", nama_komponen: "PAS", jenis: "PAS", bobot: 2, urutan: 3, kelas: null },
];

// ============ KELAS (extended with jenjang) ============
export interface MockKelasAkademik {
  id: string;
  nama_kelas: string;
  deskripsi: string | null;
  id_wali_kelas: string | null;
  jenjang: string | null;
  created_at: string;
}

export const MOCK_KELAS_AKADEMIK: MockKelasAkademik[] = MOCK_KELAS.map(k => {
  let jenjang: string | null = null;
  if (k.id === "ka" || k.id === "kb") jenjang = "TK";
  else if (["k1", "k2", "k3", "k4", "k5", "k6"].includes(k.id)) jenjang = "SD";
  else jenjang = "SMP";
  return {
    id: k.id,
    nama_kelas: k.nama_kelas,
    deskripsi: k.deskripsi,
    id_wali_kelas: null,
    jenjang,
    created_at: "2024-07-01",
  };
});

// ============ SANTRI AKADEMIK ============
export interface MockSantriAkademik {
  id: string;
  nama_santri: string;
  nis: string;
  id_kelas: string;
  status: string;
}

export const MOCK_SANTRI_AKADEMIK: MockSantriAkademik[] = MOCK_SANTRI.map(s => ({
  id: s.id,
  nama_santri: s.nama,
  nis: s.nis,
  id_kelas: s.idKelas,
  status: s.status,
}));

// ============ EKSTRAKURIKULER ============
export interface MockEkskul {
  id: string;
  nama: string;
  aktif: boolean;
}

export const MOCK_EKSKUL: MockEkskul[] = [
  { id: "eks1", nama: "Pramuka", aktif: true },
  { id: "eks2", nama: "Futsal", aktif: true },
  { id: "eks3", nama: "Kaligrafi", aktif: true },
  { id: "eks4", nama: "Memanah", aktif: true },
];

// ============ MOCK NILAI (sample grades) ============
export function generateMockNilai(): Record<string, number> {
  const map: Record<string, number> = {};
  // Generate some sample grades for SMP kelas 7-9 students
  const smpSantri = MOCK_SANTRI_AKADEMIK.filter(s => ["k7", "k8", "k9"].includes(s.id_kelas));
  const smpKomponen = MOCK_KOMPONEN_NILAI.filter(k => {
    const mapel = MOCK_MAPEL.find(m => m.id === k.id_mapel);
    return mapel && mapel.jenjang === "SMP";
  });
  
  smpSantri.forEach(s => {
    smpKomponen.forEach(k => {
      const key = `${s.id}_${k.id}`;
      map[key] = Math.floor(Math.random() * 30) + 70; // 70-100
    });
  });
  return map;
}

// ============ HALAQOH for supabase-like format ============
export interface MockHalaqohAkademik {
  id: string;
  nama_halaqoh: string;
}

export const MOCK_HALAQOH_AKADEMIK: MockHalaqohAkademik[] = [
  { id: "h1", nama_halaqoh: "Halaqoh Al-Fatih" },
  { id: "h2", nama_halaqoh: "Halaqoh An-Nur" },
  { id: "h3", nama_halaqoh: "Halaqoh Al-Furqon" },
  { id: "h4", nama_halaqoh: "Halaqoh Al-Hidayah" },
  { id: "h5", nama_halaqoh: "Halaqoh As-Salam" },
];

// Helper to get santri by kelas
export const getSantriByKelas = (kelasId: string) =>
  MOCK_SANTRI_AKADEMIK.filter(s => s.id_kelas === kelasId && s.status === "Aktif");
