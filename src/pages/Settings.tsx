
import React, { useState } from "react";
import { 
  Shield, 
  User, 
  Building, 
  CreditCard, 
  Bell,
  HelpCircle
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import BlurredCard from "@/components/ui/BlurredCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { APP_NAME } from "@/lib/constants";

const Settings = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gradient-subtle overflow-hidden">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Navbar toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 overflow-y-auto px-4 md:px-6 pt-20 pb-6">
          <div className="max-w-4xl mx-auto">
            <header className="mb-6">
              <h1 className="text-2xl md:text-3xl font-bold mb-1 animate-fade-in">
                Pengaturan
              </h1>
              <p className="text-muted-foreground animate-fade-in" style={{ animationDelay: "100ms" }}>
                Kelola preferensi dan informasi akun Anda
              </p>
            </header>
            
            <Tabs defaultValue="profile" className="w-full animate-scale-in">
              <TabsList className="mb-6 w-full justify-start overflow-x-auto">
                <TabsTrigger value="profile" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>Profil</span>
                </TabsTrigger>
                <TabsTrigger value="company" className="flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  <span>Perusahaan</span>
                </TabsTrigger>
                <TabsTrigger value="payment" className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  <span>Pembayaran</span>
                </TabsTrigger>
                <TabsTrigger value="notifications" className="flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  <span>Notifikasi</span>
                </TabsTrigger>
                <TabsTrigger value="security" className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  <span>Keamanan</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile" className="space-y-6">
                <BlurredCard>
                  <h3 className="text-lg font-medium mb-4">Informasi Profil</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Nama Lengkap</label>
                      <Input defaultValue="Budi Setiawan" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <Input defaultValue="budi.setiawan@example.com" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Telepon</label>
                      <Input defaultValue="+62 812 3456 7890" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Jabatan</label>
                      <Input defaultValue="Manajer Keuangan" />
                    </div>
                  </div>
                  <div className="mt-6">
                    <Button>Simpan Perubahan</Button>
                  </div>
                </BlurredCard>
              </TabsContent>
              
              <TabsContent value="company" className="space-y-6">
                <BlurredCard>
                  <h3 className="text-lg font-medium mb-4">Informasi Perusahaan</h3>
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Nama Perusahaan</label>
                      <Input defaultValue="PT Maju Bersama Indonesia" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Alamat</label>
                      <Input defaultValue="Jl. Sudirman No. 123, Jakarta Pusat" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">NPWP</label>
                        <Input defaultValue="01.234.567.8-123.000" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Website</label>
                        <Input defaultValue="www.majubersama.co.id" />
                      </div>
                    </div>
                  </div>
                  <div className="mt-6">
                    <Button>Simpan Perubahan</Button>
                  </div>
                </BlurredCard>
              </TabsContent>
              
              <TabsContent value="security" className="space-y-6">
                <BlurredCard>
                  <h3 className="text-lg font-medium mb-4">Ubah Kata Sandi</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Kata Sandi Lama</label>
                      <Input type="password" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Kata Sandi Baru</label>
                      <Input type="password" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Konfirmasi Kata Sandi</label>
                      <Input type="password" />
                    </div>
                  </div>
                  <div className="mt-6">
                    <Button>Perbarui Kata Sandi</Button>
                  </div>
                </BlurredCard>
                
                <BlurredCard>
                  <h3 className="text-lg font-medium mb-4">Otentikasi Dua Faktor</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Tingkatkan keamanan akun Anda dengan menambahkan lapisan keamanan kedua.
                  </p>
                  <Button variant="outline">Aktifkan 2FA</Button>
                </BlurredCard>
              </TabsContent>
              
              <TabsContent value="payment" className="space-y-6">
                <BlurredCard>
                  <h3 className="text-lg font-medium mb-4">Metode Pembayaran</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Atur metode pembayaran untuk langganan {APP_NAME}.
                  </p>
                  <div className="p-4 border rounded-lg flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <CreditCard className="h-6 w-6 text-primary" />
                      <div>
                        <p className="font-medium">VISA ••••8765</p>
                        <p className="text-xs text-muted-foreground">Berakhir 05/2025</p>
                      </div>
                    </div>
                    <div>
                      <Button variant="outline" size="sm">Hapus</Button>
                    </div>
                  </div>
                  <Button>Tambah Metode Pembayaran</Button>
                </BlurredCard>
                
                <BlurredCard>
                  <h3 className="text-lg font-medium mb-4">Paket Langganan</h3>
                  <div className="p-4 bg-primary/5 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <p className="font-medium">Paket Bisnis</p>
                      <p className="font-semibold text-primary">Rp 499.000/bulan</p>
                    </div>
                    <p className="text-sm text-muted-foreground">Ditagih bulanan pada tanggal 15</p>
                  </div>
                  <div className="mt-4 flex gap-3">
                    <Button variant="outline">Ubah Paket</Button>
                    <Button variant="outline" className="text-destructive hover:text-destructive">Batalkan Langganan</Button>
                  </div>
                </BlurredCard>
              </TabsContent>
              
              <TabsContent value="notifications" className="space-y-6">
                <BlurredCard>
                  <h3 className="text-lg font-medium mb-4">Preferensi Notifikasi</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50">
                      <div>
                        <p className="font-medium">Transaksi Baru</p>
                        <p className="text-sm text-muted-foreground">Dapatkan notifikasi ketika ada transaksi baru</p>
                      </div>
                      <input type="checkbox" className="toggle" checked />
                    </div>
                    
                    <div className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50">
                      <div>
                        <p className="font-medium">Pengingat Pembayaran</p>
                        <p className="text-sm text-muted-foreground">Dapatkan pengingat sebelum tenggat pembayaran</p>
                      </div>
                      <input type="checkbox" className="toggle" checked />
                    </div>
                    
                    <div className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50">
                      <div>
                        <p className="font-medium">Update Sistem</p>
                        <p className="text-sm text-muted-foreground">Dapatkan informasi tentang pembaruan sistem</p>
                      </div>
                      <input type="checkbox" className="toggle" />
                    </div>
                    
                    <div className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50">
                      <div>
                        <p className="font-medium">Email Bulanan</p>
                        <p className="text-sm text-muted-foreground">Terima ringkasan bulanan via email</p>
                      </div>
                      <input type="checkbox" className="toggle" checked />
                    </div>
                  </div>
                  <div className="mt-6">
                    <Button>Simpan Preferensi</Button>
                  </div>
                </BlurredCard>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;
