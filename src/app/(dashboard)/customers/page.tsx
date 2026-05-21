"use strict";
"use client";

import { useState } from "react";
import { Plus, Search, MoreHorizontal, Pencil, Trash2, Award, Download } from "lucide-react";
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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppStore } from "@/store/useStore";
import { useEffect } from "react";

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const { customers, fetchCustomers } = useAppStore();
  
  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  // Use the fetched customers or fallback to an empty array
  const filteredCustomers = (customers && customers.length > 0 ? customers : []).filter(cust => 
    cust.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cust.phone.includes(searchQuery)
  );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Manajemen Pelanggan</h2>
          <p className="text-muted-foreground">Kelola data member, poin loyalty, dan riwayat kunjungan.</p>
        </div>
        
        <Dialog>
          <DialogTrigger className={buttonVariants({ className: "rounded-full shadow-lg shadow-primary/20" })}>
            <Plus className="mr-2 h-4 w-4" /> Tambah Pelanggan
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Tambah Pelanggan Baru</DialogTitle>
              <DialogDescription>
                Daftarkan member baru untuk mulai mengumpulkan poin loyalty.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nama Lengkap <span className="text-destructive">*</span></Label>
                <Input id="name" placeholder="Cth: Budi Santoso" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">No. Handphone <span className="text-destructive">*</span></Label>
                <Input id="phone" type="tel" placeholder="0812..." />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="nama@email.com" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="tier">Member Tier</Label>
                <Select defaultValue="regular">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="regular">Regular</SelectItem>
                    <SelectItem value="vip">VIP</SelectItem>
                    <SelectItem value="vvip">VVIP</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Simpan Pelanggan</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="border-border/50 shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Cari nama atau nomor handphone..." 
                className="pl-9 bg-muted/50 border-transparent focus-visible:ring-primary rounded-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" className="rounded-full w-full md:w-auto">
              <Download className="mr-2 h-4 w-4" /> Export Data
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-x-auto">
            <Table className="min-w-[800px]">
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead>Pelanggan</TableHead>
                  <TableHead>Kontak</TableHead>
                  <TableHead>Tier</TableHead>
                  <TableHead className="text-center">Poin</TableHead>
                  <TableHead>Kunjungan Terakhir</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                      Pelanggan tidak ditemukan.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCustomers.map((cust) => (
                    <TableRow key={cust.id} className="hover:bg-muted/30 transition-colors">
                      <TableCell>
                        <div className="font-medium text-foreground">{cust.name}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">{cust.id}</div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{cust.phone}</div>
                        <div className="text-xs text-muted-foreground">{cust.email}</div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={
                            cust.tier === "VVIP" ? "default" : 
                            cust.tier === "VIP" ? "secondary" : "outline"
                          } 
                          className="font-normal text-xs"
                        >
                          {cust.tier}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-1 font-semibold text-primary">
                          <Award className="h-4 w-4" />
                          {cust.points.toLocaleString('id-ID')}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {cust.lastVisit}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger className={buttonVariants({ variant: "ghost", size: "icon", className: "h-8 w-8" })}>
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Buka menu</span>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-[160px]">
                            <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Pencil className="mr-2 h-4 w-4" /> Edit Profil
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Award className="mr-2 h-4 w-4" /> Tambah Poin
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
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
              Total <strong>{filteredCustomers.length}</strong> pelanggan terdaftar
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>Sebelumnya</Button>
              <Button variant="outline" size="sm" disabled>Selanjutnya</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
