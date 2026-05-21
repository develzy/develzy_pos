"use client";

import { useState, useEffect } from "react";
import { Plus, Search, MoreHorizontal, Pencil, Trash2, Filter, Wrench } from "lucide-react";
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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function ServicesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const { services, fetchServices, addService, deleteService, user } = useAppStore();
  
  useEffect(() => {
    fetchServices();
  }, [fetchServices]);
  
  const filteredServices = services.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSaveService = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return toast.error("Anda harus login");
    
    const formData = new FormData(e.currentTarget);
    const newService = {
      id: `SRV-${Math.floor(Math.random() * 10000)}`,
      name: formData.get("name") as string,
      category: formData.get("category") as string,
      price: Number(formData.get("price")),
      description: formData.get("description") as string,
      status: formData.get("status") as string,
    };

    try {
      addService(newService);
      toast.success("Jasa layanan berhasil ditambahkan!");
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    } catch (err: any) {
      toast.error(err.message || "Gagal menyimpan jasa layanan");
    }
  };

  const handleDeleteService = (id: string) => {
    if (!confirm("Yakin ingin menghapus layanan ini?")) return;
    deleteService(id);
    toast.success("Layanan dihapus!");
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Jasa Servis / Layanan</h2>
          <p className="text-muted-foreground">Kelola daftar layanan bengkel, tarif jasa, dan paket servis.</p>
        </div>
        
        <Sheet>
          <SheetTrigger className={buttonVariants({ className: "rounded-full shadow-lg shadow-primary/20" })}>
            <Plus className="mr-2 h-4 w-4" /> Tambah Layanan
          </SheetTrigger>
          <SheetContent className="sm:max-w-[600px] overflow-y-auto border-l shadow-2xl p-0 flex flex-col">
            <form onSubmit={handleSaveService} className="flex flex-col h-full">
            <div className="p-6 border-b bg-muted/10">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2 text-2xl">
                  <Wrench className="h-6 w-6 text-primary" />
                  Tambah Jasa Layanan
                </SheetTitle>
                <SheetDescription>
                  Masukkan tarif jasa dan deskripsi layanan bengkel Anda.
                </SheetDescription>
              </SheetHeader>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              <div className="space-y-6">
                <div className="grid gap-3">
                  <Label htmlFor="name" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Nama Jasa / Layanan <span className="text-destructive">*</span></Label>
                  <Input id="name" name="name" required placeholder="Cth: Ganti Oli Mesin" className="h-12 bg-muted/30 focus:bg-background transition-colors text-base rounded-xl" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-3">
                    <Label htmlFor="category" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Kategori <span className="text-destructive">*</span></Label>
                    <Select name="category" defaultValue="Ringan">
                      <SelectTrigger className="h-11 bg-muted/30 focus:bg-background transition-colors rounded-xl">
                        <SelectValue placeholder="Pilih kategori" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Ringan">Servis Ringan</SelectItem>
                        <SelectItem value="Sedang">Servis Sedang</SelectItem>
                        <SelectItem value="Berat">Servis Berat (Turun Mesin)</SelectItem>
                        <SelectItem value="Modifikasi">Modifikasi</SelectItem>
                        <SelectItem value="Cuci">Cuci / Detailing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="price" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Tarif Jasa (Rp) <span className="text-destructive">*</span></Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">Rp</span>
                      <Input id="price" name="price" type="number" required placeholder="35000" className="h-11 pl-9 bg-muted/30 focus:bg-background transition-colors rounded-xl font-medium text-primary" />
                    </div>
                  </div>
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="description" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Deskripsi Pekerjaan</Label>
                  <Textarea id="description" name="description" placeholder="Jelaskan detail pekerjaan yang dilakukan..." className="h-24 bg-muted/30 focus:bg-background transition-colors rounded-xl resize-none" />
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="status" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</Label>
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
            </div>
            
            <div className="p-6 border-t bg-muted/10">
              <SheetFooter className="flex sm:justify-end gap-3 w-full">
                <SheetClose className={buttonVariants({ variant: "outline", className: "h-11 rounded-xl px-6 w-full sm:w-auto" })}>
                  Batal
                </SheetClose>
                <Button type="submit" className="h-11 rounded-xl px-8 shadow-md shadow-primary/25 w-full sm:w-auto">
                  Simpan Layanan
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
                placeholder="Cari nama jasa servis..." 
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
                  <TableHead>Nama Layanan & Deskripsi</TableHead>
                  <TableHead>Kategori</TableHead>
                  <TableHead className="text-right">Tarif (Rp)</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredServices.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                      Layanan tidak ditemukan.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredServices.map((service) => (
                    <TableRow key={service.id} className="hover:bg-muted/30 transition-colors">
                      <TableCell>
                        <div className="font-semibold text-foreground flex items-center gap-2">
                          <div className="h-8 w-8 rounded bg-primary/10 flex items-center justify-center text-primary">
                            <Wrench className="h-4 w-4" />
                          </div>
                          {service.name}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1 line-clamp-1 pl-10">{service.description}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="font-normal text-xs">{service.category}</Badge>
                      </TableCell>
                      <TableCell className="text-right font-bold text-primary">
                        Rp {service.price.toLocaleString('id-ID')}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant={service.status === "Aktif" ? "default" : "secondary"} className="text-[10px]">
                          {service.status}
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
                              <Pencil className="mr-2 h-4 w-4" /> Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDeleteService(service.id)} className="text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" /> Hapus
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
          <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
            <div>
              Menampilkan <strong>{filteredServices.length}</strong> layanan
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
