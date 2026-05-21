"use client";

import { useState, useEffect } from "react";
import { Plus, Search, MoreHorizontal, Pencil, Trash2, Filter, UserCog } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppStore } from "@/store/useStore";
import { toast } from "sonner";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function EmployeesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const { employees, fetchEmployees, addEmployee, deleteEmployee, user } = useAppStore();
  
  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);
  
  const filteredEmployees = employees.filter(e => 
    e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSaveEmployee = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return toast.error("Anda harus login");
    if (user.role !== "superadmin" && user.role !== "admin" && user.role !== "Manajer") {
      return toast.error("Anda tidak memiliki akses untuk menambah karyawan");
    }
    
    const formData = new FormData(e.currentTarget);
    const newEmployee = {
      id: `EMP-${Math.floor(Math.random() * 10000)}`,
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      role: formData.get("role") as any,
      phone: formData.get("phone") as string,
      status: formData.get("status") as any,
    };

    try {
      addEmployee(newEmployee);
      toast.success("Data karyawan berhasil ditambahkan!");
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    } catch (err: any) {
      toast.error(err.message || "Gagal menyimpan data karyawan");
    }
  };

  const handleDeleteEmployee = (id: string) => {
    if (!confirm("Yakin ingin menghapus karyawan ini?")) return;
    deleteEmployee(id);
    toast.success("Karyawan dihapus!");
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Manajemen Karyawan</h2>
          <p className="text-muted-foreground">Kelola akun staf, peran (role), dan hak akses aplikasi.</p>
        </div>
        
        <Sheet>
          <SheetTrigger className={buttonVariants({ className: "rounded-full shadow-lg shadow-primary/20" })}>
            <Plus className="mr-2 h-4 w-4" /> Tambah Karyawan
          </SheetTrigger>
          <SheetContent className="sm:max-w-[500px] overflow-y-auto border-l shadow-2xl p-0 flex flex-col">
            <form onSubmit={handleSaveEmployee} className="flex flex-col h-full">
            <div className="p-6 border-b bg-muted/10">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2 text-2xl">
                  <UserCog className="h-6 w-6 text-primary" />
                  Tambah Akun Karyawan
                </SheetTitle>
                <SheetDescription>
                  Daftarkan staf baru dan berikan hak akses (role) yang sesuai.
                </SheetDescription>
              </SheetHeader>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="grid gap-3">
                <Label htmlFor="name" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Nama Lengkap <span className="text-destructive">*</span></Label>
                <Input id="name" name="name" required placeholder="Cth: Budi Santoso" className="h-12 bg-muted/30 focus:bg-background transition-colors rounded-xl" />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="email" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Email (Untuk Login) <span className="text-destructive">*</span></Label>
                <Input id="email" name="email" type="email" required placeholder="budi@toko.com" className="h-12 bg-muted/30 focus:bg-background transition-colors rounded-xl" />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="password" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Password Default</Label>
                <Input id="password" type="text" disabled value="123456" className="h-12 bg-muted/50 rounded-xl" />
                <p className="text-[10px] text-muted-foreground">Karyawan dapat mengubah password setelah login pertama kali.</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-3">
                  <Label htmlFor="role" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Role (Hak Akses) <span className="text-destructive">*</span></Label>
                  <Select name="role" defaultValue="Kasir">
                    <SelectTrigger className="h-11 bg-muted/30 focus:bg-background transition-colors rounded-xl">
                      <SelectValue placeholder="Pilih Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Admin">Admin (Full Akses)</SelectItem>
                      <SelectItem value="Manajer">Manajer</SelectItem>
                      <SelectItem value="Kasir">Kasir (POS Saja)</SelectItem>
                      <SelectItem value="Teknisi">Teknisi (Bengkel)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="status" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status Akun</Label>
                  <Select name="status" defaultValue="Aktif">
                    <SelectTrigger className="h-11 bg-muted/30 focus:bg-background transition-colors rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Aktif">Aktif</SelectItem>
                      <SelectItem value="Nonaktif">Nonaktif</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-3">
                <Label htmlFor="phone" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Nomor HP/WA</Label>
                <Input id="phone" name="phone" placeholder="Cth: 08123456789" className="h-12 bg-muted/30 focus:bg-background transition-colors rounded-xl" />
              </div>
            </div>
            
            <div className="p-6 border-t bg-muted/10">
              <SheetFooter className="flex sm:justify-end gap-3 w-full">
                <SheetClose className={buttonVariants({ variant: "outline", className: "h-11 rounded-xl px-6 w-full sm:w-auto" })}>
                  Batal
                </SheetClose>
                <Button type="submit" className="h-11 rounded-xl px-8 shadow-md shadow-primary/25 w-full sm:w-auto">
                  Simpan Karyawan
                </Button>
              </SheetFooter>
            </div>
            </form>
          </SheetContent>
        </Sheet>
      </div>

      <Card className="border-border/50 shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Cari nama atau role..." 
                className="pl-9 bg-muted/50 border-transparent focus-visible:ring-primary rounded-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto">
              <Button variant="outline" className="rounded-full w-full md:w-auto" onClick={() => toast.info("Fitur Filter Lanjutan akan segera hadir!")}>
                <Filter className="mr-2 h-4 w-4" /> Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-x-auto">
            <Table className="min-w-[800px]">
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead>Profil Karyawan</TableHead>
                  <TableHead>Role / Jabatan</TableHead>
                  <TableHead>No. HP (WhatsApp)</TableHead>
                  <TableHead className="text-center">Status Akun</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEmployees.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                      Karyawan tidak ditemukan.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredEmployees.map((emp) => (
                    <TableRow key={emp.id} className="hover:bg-muted/30 transition-colors">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10 border border-primary/10">
                            <AvatarFallback className="bg-primary/5 text-primary font-bold">
                              {emp.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-semibold text-foreground">{emp.name}</div>
                            <div className="text-xs text-muted-foreground">{emp.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={
                          emp.role === "Admin" ? "default" : 
                          emp.role === "Manajer" ? "secondary" : "outline"
                        } className="font-medium text-xs">
                          {emp.role}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {emp.phone || "-"}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant={emp.status === "Aktif" ? "default" : "destructive"} className="text-[10px] bg-opacity-10 text-emerald-600 bg-emerald-500 hover:bg-emerald-500/20" style={emp.status === 'Nonaktif' ? { backgroundColor: 'rgba(239,68,68,0.1)', color: 'rgb(239,68,68)' } : {}}>
                          {emp.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger className={buttonVariants({ variant: "ghost", size: "icon", className: "h-8 w-8" })}>
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Buka menu</span>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-[160px]">
                            <DropdownMenuGroup>
                              <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => toast.info("Fitur Edit akan segera hadir!")}>
                              <Pencil className="mr-2 h-4 w-4" /> Edit Data
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDeleteEmployee(emp.id)} className="text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" /> Hapus Akun
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
