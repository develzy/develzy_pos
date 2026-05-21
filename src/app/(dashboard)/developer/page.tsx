"use client";

import { useState } from "react";
import { ShieldAlert, Users, HardDrive, Activity, Search, Edit2, Lock, Unlock, Zap, Server } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { useAppStore } from "@/store/useStore";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// Dummy SaaS Tenants
const initialTenants = [
  { id: "TEN-001", name: "Budi Motor", email: "budi@motor.com", plan: "Basic", business_type: "Bengkel", status: "Aktif", expire: "2024-12-31" },
  { id: "TEN-002", name: "Kopi Senja", email: "kopi@senja.com", plan: "Premium", business_type: "Cafe", status: "Aktif", expire: "2025-06-30" },
  { id: "TEN-003", name: "Toko Sinar Jaya", email: "sinar@jaya.com", plan: "Bisnis", business_type: "Retail", status: "Aktif", expire: "2024-10-15" },
  { id: "TEN-004", name: "Cuci Bersih", email: "cuci@bersih.com", plan: "Basic", business_type: "Laundry", status: "Suspend", expire: "2024-01-01" },
];

export default function DeveloperPanelPage() {
  const { user } = useAppStore();
  const router = useRouter();
  const [tenants, setTenants] = useState(initialTenants);
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState<any>(null);

  // Security Guard
  if (user?.role !== "superadmin") {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] text-center space-y-4">
        <ShieldAlert className="h-24 w-24 text-destructive opacity-20" />
        <h2 className="text-3xl font-bold">Akses Ditolak</h2>
        <p className="text-muted-foreground max-w-md">Halaman ini adalah Area Terbatas khusus untuk Developer (Super Admin). Anda tidak memiliki izin untuk melihat halaman ini.</p>
        <Button onClick={() => router.push('/dashboard')}>Kembali ke Dashboard</Button>
      </div>
    );
  }

  const filteredTenants = tenants.filter(t => 
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    t.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEditClick = (tenant: any) => {
    setSelectedTenant(tenant);
    setIsEditOpen(true);
  };

  const handleSavePlan = () => {
    setTenants(prev => prev.map(t => t.id === selectedTenant.id ? selectedTenant : t));
    setIsEditOpen(false);
    toast.success("Konfigurasi Tenant berhasil diperbarui!");
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="destructive" className="bg-destructive/10 text-destructive border-destructive/20 hover:bg-destructive/20 transition-colors">SUPER ADMIN PANEL</Badge>
          </div>
          <h2 className="text-3xl font-bold tracking-tight">Developer Dashboard</h2>
          <p className="text-muted-foreground">Monitor sistem SaaS, kelola klien (tenant), dan kunci/buka fitur aplikasi secara terpusat.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-primary/20 shadow-sm bg-primary/5">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Tenant Aktif</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{tenants.filter(t => t.status === 'Aktif').length}</div>
            <p className="text-xs text-muted-foreground mt-1">+12 bulan ini</p>
          </CardContent>
        </Card>
        <Card className="border-border/50 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pengguna Premium</CardTitle>
            <Zap className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{tenants.filter(t => t.plan === 'Premium').length}</div>
            <p className="text-xs text-muted-foreground mt-1">Tenant Paket Tertinggi</p>
          </CardContent>
        </Card>
        <Card className="border-border/50 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Status Database D1</CardTitle>
            <HardDrive className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">Sehat</div>
            <p className="text-xs text-muted-foreground mt-1">23.4 MB Terpakai / 10 GB</p>
          </CardContent>
        </Card>
        <Card className="border-border/50 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Status Server API</CardTitle>
            <Activity className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-emerald-600">Online</div>
            <p className="text-xs text-muted-foreground mt-1">Cloudflare Workers: 99.9% Uptime</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border/50 shadow-sm">
        <CardHeader>
          <CardTitle>Manajemen Tenant SaaS</CardTitle>
          <CardDescription>Ubah paket, perpanjang masa aktif, atau blokir tenant yang melanggar.</CardDescription>
          <div className="relative w-full md:w-96 mt-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Cari email atau nama tenant..." 
              className="pl-9 bg-muted/50 rounded-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-x-auto">
            <Table className="min-w-[800px]">
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead>Nama Toko / Usaha</TableHead>
                  <TableHead>Jenis Usaha</TableHead>
                  <TableHead>Paket (Plan)</TableHead>
                  <TableHead>Masa Aktif</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Aksi Developer</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTenants.map((tenant) => (
                  <TableRow key={tenant.id}>
                    <TableCell>
                      <div className="font-semibold">{tenant.name}</div>
                      <div className="text-xs text-muted-foreground">{tenant.email}</div>
                      <div className="text-[10px] text-muted-foreground mt-0.5">ID: {tenant.id}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-normal">{tenant.business_type}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={tenant.plan === 'Premium' ? 'default' : tenant.plan === 'Bisnis' ? 'secondary' : 'outline'} className={tenant.plan === 'Premium' ? 'bg-amber-500 hover:bg-amber-600' : ''}>
                        {tenant.plan.toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">
                      {new Date(tenant.expire).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </TableCell>
                    <TableCell>
                      <Badge variant={tenant.status === "Aktif" ? "default" : "destructive"} className="text-[10px] bg-opacity-10 text-emerald-600 bg-emerald-500" style={tenant.status === 'Suspend' ? { backgroundColor: 'rgba(239,68,68,0.1)', color: 'rgb(239,68,68)' } : {}}>
                        {tenant.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" onClick={() => handleEditClick(tenant)}>
                        <Edit2 className="h-4 w-4 mr-2" /> Kelola Tenant
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Dialog Edit Tenant */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <Server className="h-5 w-5 text-primary" />
              Kelola Konfigurasi Tenant
            </DialogTitle>
            <DialogDescription>
              Ubah paket langganan dan kontrol fitur khusus untuk <strong>{selectedTenant?.name}</strong>.
            </DialogDescription>
          </DialogHeader>
          
          {selectedTenant && (
            <div className="py-4 space-y-6">
              <div className="grid grid-cols-2 gap-4 border p-4 rounded-xl bg-muted/20">
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">Ubah Paket (Plan)</Label>
                  <Select 
                    value={selectedTenant.plan} 
                    onValueChange={(val) => setSelectedTenant({...selectedTenant, plan: val})}
                  >
                    <SelectTrigger className="h-10">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Basic">BASIC (Rp 450rb)</SelectItem>
                      <SelectItem value="Bisnis">BISNIS (Rp 990rb)</SelectItem>
                      <SelectItem value="Premium">PREMIUM (Rp 1.35jt)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">Status Akun</Label>
                  <Select 
                    value={selectedTenant.status} 
                    onValueChange={(val) => setSelectedTenant({...selectedTenant, status: val})}
                  >
                    <SelectTrigger className="h-10">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Aktif">Aktif</SelectItem>
                      <SelectItem value="Suspend">Suspend / Banned</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-sm mb-3">Feature Flags (Overrides)</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b pb-3">
                    <div>
                      <Label className="font-medium text-sm flex items-center gap-2">
                        <Lock className="h-4 w-4 text-muted-foreground" /> Lock Menu Laporan
                      </Label>
                      <p className="text-[10px] text-muted-foreground">Sembunyikan menu laporan dari semua user tenant ini.</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between border-b pb-3">
                    <div>
                      <Label className="font-medium text-sm flex items-center gap-2">
                        <Unlock className="h-4 w-4 text-muted-foreground" /> Bypass QRIS Otomatis
                      </Label>
                      <p className="text-[10px] text-muted-foreground">Berikan akses QRIS Realtime meskipun paket Basic.</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between border-b pb-3">
                    <div>
                      <Label className="font-medium text-sm flex items-center gap-2">
                        <Unlock className="h-4 w-4 text-muted-foreground" /> Unlock Multi Cabang
                      </Label>
                      <p className="text-[10px] text-muted-foreground">Buka batasan sinkronisasi cabang.</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>

              <div className="grid gap-2">
                <Label>Masa Aktif Sampai</Label>
                <Input type="date" value={selectedTenant.expire} onChange={(e) => setSelectedTenant({...selectedTenant, expire: e.target.value})} />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>Batal</Button>
            <Button onClick={handleSavePlan}>Terapkan Perubahan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
