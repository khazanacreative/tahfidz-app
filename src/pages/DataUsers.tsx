import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, Users, Loader2, Rocket } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface UserData {
  id: string;
  user_id: string;
  full_name: string | null;
  phone: string | null;
  email: string;
  role: "admin" | "asatidz" | "wali_santri";
  created_at: string;
}

const roleOptions = ["Semua Role", "admin", "asatidz", "wali_santri"];

const getRoleBadgeVariant = (role: string) => {
  switch (role) {
    case "admin":
      return "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200";
    case "asatidz":
      return "bg-primary/10 text-primary hover:bg-primary/20";
    case "wali_santri":
      return "bg-amber-100 text-amber-700 hover:bg-amber-200 dark:bg-amber-900 dark:text-amber-200";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const getRoleDisplayName = (role: string) => {
  switch (role) {
    case "admin":
      return "Admin";
    case "asatidz":
      return "Asatidz";
    case "wali_santri":
      return "Wali Santri";
    default:
      return role;
  }
};

export default function DataUsers() {
  const [filterRole, setFilterRole] = useState("Semua Role");
  const [users, setUsers] = useState<UserData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSeeding, setIsSeeding] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
    full_name: "",
    phone: "",
    role: "asatidz" as "admin" | "asatidz" | "wali_santri",
  });
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      // Fetch profiles and roles
      const { data: profiles, error: profilesError } = await supabase
        .from("profiles")
        .select("*");

      if (profilesError) throw profilesError;

      const { data: roles, error: rolesError } = await supabase
        .from("user_roles")
        .select("*");

      if (rolesError) throw rolesError;

      // Map profiles with roles
      const usersData: UserData[] = (profiles || []).map((profile) => {
        const userRole = roles?.find((r) => r.user_id === profile.user_id);
        return {
          id: profile.id,
          user_id: profile.user_id,
          full_name: profile.full_name,
          phone: profile.phone,
          email: "", // Email tidak tersedia dari profiles
          role: userRole?.role || "wali_santri",
          created_at: profile.created_at,
        };
      });

      setUsers(usersData);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Gagal memuat data pengguna");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSeedUsers = async () => {
    setIsSeeding(true);
    try {
      const response = await supabase.functions.invoke("seed-admin");
      
      if (response.error) throw response.error;
      
      console.log("Seed results:", response.data);
      toast.success("User demo berhasil dibuat!");
      fetchUsers();
    } catch (error: any) {
      console.error("Error seeding users:", error);
      toast.error(error.message || "Gagal membuat user demo");
    } finally {
      setIsSeeding(false);
    }
  };

  const handleCreateUser = async () => {
    if (!newUser.email || !newUser.password || !newUser.full_name) {
      toast.error("Email, password, dan nama harus diisi");
      return;
    }

    setIsCreating(true);
    try {
      const response = await supabase.functions.invoke("create-user", {
        body: newUser,
      });

      if (response.error) throw response.error;

      toast.success("User berhasil dibuat");
      setIsDialogOpen(false);
      setNewUser({
        email: "",
        password: "",
        full_name: "",
        phone: "",
        role: "asatidz",
      });
      fetchUsers();
    } catch (error: any) {
      console.error("Error creating user:", error);
      toast.error(error.message || "Gagal membuat user");
    } finally {
      setIsCreating(false);
    }
  };

  const filteredUsers = users.filter((user) => {
    return filterRole === "Semua Role" || user.role === filterRole;
  });

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Users className="w-7 h-7 text-primary" />
              Akun Pengguna
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Kelola akun pengguna sistem
            </p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={handleSeedUsers}
              disabled={isSeeding}
            >
              {isSeeding ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Rocket className="w-4 h-4 mr-2" />
              )}
              Buat User Demo
            </Button>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90">
                  <Plus className="w-4 h-4 mr-2" />
                  Tambah User
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Tambah User Baru</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Email *</Label>
                    <Input
                      type="email"
                      placeholder="email@example.com"
                      value={newUser.email}
                      onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Password *</Label>
                    <Input
                      type="password"
                      placeholder="Minimal 6 karakter"
                      value={newUser.password}
                      onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Nama Lengkap *</Label>
                    <Input
                      placeholder="Nama lengkap"
                      value={newUser.full_name}
                      onChange={(e) => setNewUser({ ...newUser, full_name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>No. HP</Label>
                    <Input
                      placeholder="081234567890"
                      value={newUser.phone}
                      onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Role *</Label>
                    <Select 
                      value={newUser.role} 
                      onValueChange={(value: "admin" | "asatidz" | "wali_santri") => 
                        setNewUser({ ...newUser, role: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="asatidz">Asatidz</SelectItem>
                        <SelectItem value="wali_santri">Wali Santri</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex justify-end gap-2 pt-4">
                    <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Batal
                    </Button>
                    <Button onClick={handleCreateUser} disabled={isCreating}>
                      {isCreating && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                      Tambah User
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="bg-card rounded-lg border border-border p-6">
          <div className="mb-6">
            <Select value={filterRole} onValueChange={setFilterRole}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {roleOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option === "Semua Role" ? option : getRoleDisplayName(option)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
              <span className="ml-2 text-muted-foreground">Memuat data...</span>
            </div>
          ) : users.length === 0 ? (
            <div className="text-center py-8">
              <Users className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-4">Belum ada pengguna terdaftar</p>
              <Button onClick={handleSeedUsers} disabled={isSeeding}>
                {isSeeding ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Rocket className="w-4 h-4 mr-2" />
                )}
                Buat User Demo
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-muted-foreground">Nama Lengkap</TableHead>
                  <TableHead className="text-muted-foreground">Role</TableHead>
                  <TableHead className="text-muted-foreground">No. HP</TableHead>
                  <TableHead className="text-muted-foreground">Tanggal Daftar</TableHead>
                  <TableHead className="text-muted-foreground">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">
                      {user.full_name || "-"}
                    </TableCell>
                    <TableCell>
                      <Badge className={getRoleBadgeVariant(user.role)}>
                        {getRoleDisplayName(user.role)}
                      </Badge>
                    </TableCell>
                    <TableCell>{user.phone || "-"}</TableCell>
                    <TableCell>
                      {new Date(user.created_at).toLocaleDateString("id-ID")}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="icon" className="h-8 w-8">
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>

        {/* Info Akun Demo */}
        <div className="bg-muted/50 rounded-lg border border-border p-4">
          <h3 className="font-semibold mb-2">Akun Demo (jika sudah dibuat):</h3>
          <div className="grid gap-2 text-sm">
            <div className="flex justify-between items-center p-2 bg-background rounded">
              <span><strong>Admin:</strong> admin@mantaf.id</span>
              <span className="text-muted-foreground">Password: admin123</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-background rounded">
              <span><strong>Ustadz:</strong> ustadz@mantaf.id</span>
              <span className="text-muted-foreground">Password: ustadz123</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-background rounded">
              <span><strong>Wali Santri:</strong> wali@mantaf.id</span>
              <span className="text-muted-foreground">Password: wali123</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
