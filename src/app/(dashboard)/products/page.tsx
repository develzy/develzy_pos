"use strict";
"use client";

import { useState } from "react";
import { Plus, Search, MoreHorizontal, Pencil, Trash2, Filter, Package } from "lucide-react";
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
import { useEffect, useRef } from "react";
import { Loader2, X } from "lucide-react";
import { toast } from "sonner";

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const { products, fetchProducts, user } = useAppStore();
  
  // Form States
  const [isUploading, setIsUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [imageId, setImageId] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("file", file);
      if (user) formData.append("store_id", user.id);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal upload gambar");

      setImageUrl(data.url);
      setImageId(data.public_id);
      toast.success("Gambar berhasil diupload!");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleRemoveImage = async () => {
    if (!imageId) return;
    try {
      setIsUploading(true);
      const res = await fetch("/api/upload/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ public_id: imageId })
      });
      if (!res.ok) throw new Error("Gagal menghapus gambar di server");
      
      setImageUrl("");
      setImageId("");
      toast.success("Gambar berhasil dihapus");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSaveProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return toast.error("Anda harus login");
    
    const formData = new FormData(e.currentTarget);
    const newProduct = {
      store_id: user.id,
      name: formData.get("name"),
      sku: formData.get("sku"),
      category: formData.get("category"),
      price: Number(formData.get("price")),
      cogs: Number(formData.get("cogs")),
      stock: Number(formData.get("stock")),
      status: formData.get("status"),
      image: imageUrl || "https://images.unsplash.com/photo-1550133730-695473e544be?w=100&q=80"
    };

    try {
      setIsUploading(true);
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct)
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      toast.success("Produk berhasil ditambahkan!");
      fetchProducts(); // Refresh data
      // Reset state
      setImageUrl("");
      setImageId("");
      
      // Close sheet
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    } catch (err: any) {
      toast.error(err.message || "Gagal menyimpan produk");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm("Yakin ingin menghapus produk ini?")) return;
    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Gagal hapus");
      toast.success("Produk dihapus!");
      fetchProducts();
    } catch (err) {
      toast.error("Gagal menghapus produk");
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Manajemen Produk</h2>
          <p className="text-muted-foreground">Kelola inventaris, harga, dan varian produk Anda.</p>
        </div>
        
        <Sheet>
          <SheetTrigger className={buttonVariants({ className: "rounded-full shadow-lg shadow-primary/20" })}>
            <Plus className="mr-2 h-4 w-4" /> Tambah Produk
          </SheetTrigger>
          <SheetContent className="sm:max-w-[600px] overflow-y-auto border-l shadow-2xl p-0 flex flex-col">
            <form onSubmit={handleSaveProduct} className="flex flex-col h-full">
            <div className="p-6 border-b bg-muted/10">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2 text-2xl">
                  <Package className="h-6 w-6 text-primary" />
                  Tambah Produk Baru
                </SheetTitle>
                <SheetDescription>
                  Lengkapi informasi di bawah ini untuk menambahkan produk ke katalog Anda.
                </SheetDescription>
              </SheetHeader>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              {/* Image Upload Section */}
              <div className="space-y-4">
                <Label className="text-base font-semibold">Foto Produk</Label>
                <div className="flex justify-center relative">
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    ref={fileInputRef} 
                    onChange={handleUploadImage} 
                  />
                  
                  {imageUrl ? (
                    <div className="relative w-40 h-40 rounded-3xl border shadow-sm bg-muted/20 overflow-hidden group transition-all hover:shadow-md">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={imageUrl} alt="Preview" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                        <button 
                          type="button"
                          disabled={isUploading}
                          onClick={handleRemoveImage}
                          className="h-10 w-10 bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-full flex items-center justify-center transition-transform hover:scale-110 shadow-lg"
                        >
                          {isUploading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Trash2 className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div 
                      onClick={() => !isUploading && fileInputRef.current?.click()}
                      className={`w-full max-w-[280px] h-40 rounded-3xl border-2 border-dashed flex flex-col items-center justify-center text-muted-foreground bg-primary/5 border-primary/20 transition-all ${isUploading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary/10 hover:border-primary/50 cursor-pointer shadow-sm hover:shadow-md'}`}
                    >
                      {isUploading ? (
                        <>
                          <Loader2 className="h-10 w-10 mb-3 animate-spin text-primary" />
                          <span className="text-sm font-medium text-primary">Mengunggah...</span>
                        </>
                      ) : (
                        <>
                          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3 text-primary">
                            <Plus className="h-6 w-6" />
                          </div>
                          <span className="text-sm font-semibold text-primary">Upload Foto Baru</span>
                          <span className="text-xs text-muted-foreground mt-1">PNG, JPG up to 5MB</span>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-6">
                <Label className="text-base font-semibold border-b pb-2 flex w-full">Detail Informasi</Label>
                
                <div className="grid gap-3">
                  <Label htmlFor="name" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Nama Produk <span className="text-destructive">*</span></Label>
                  <Input id="name" name="name" required placeholder="Cth: Kopi Susu Aren" className="h-12 bg-muted/30 focus:bg-background transition-colors text-base rounded-xl" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-3">
                    <Label htmlFor="sku" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">SKU / Barcode</Label>
                    <Input id="sku" name="sku" placeholder="Cth: KSA-001" className="h-11 bg-muted/30 focus:bg-background transition-colors rounded-xl" />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="category" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Kategori <span className="text-destructive">*</span></Label>
                    <Select name="category" defaultValue="minuman">
                      <SelectTrigger className="h-11 bg-muted/30 focus:bg-background transition-colors rounded-xl">
                        <SelectValue placeholder="Pilih kategori" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="minuman">Minuman</SelectItem>
                        <SelectItem value="makanan">Makanan</SelectItem>
                        <SelectItem value="snack">Snack</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-3">
                    <Label htmlFor="price" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Harga Jual (Rp) <span className="text-destructive">*</span></Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">Rp</span>
                      <Input id="price" name="price" type="number" required placeholder="15000" className="h-11 pl-9 bg-muted/30 focus:bg-background transition-colors rounded-xl font-medium text-primary" />
                    </div>
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="cogs" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Modal/HPP (Rp)</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">Rp</span>
                      <Input id="cogs" name="cogs" type="number" placeholder="10000" className="h-11 pl-9 bg-muted/30 focus:bg-background transition-colors rounded-xl" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-3">
                    <Label htmlFor="stock" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Stok Awal</Label>
                    <Input id="stock" name="stock" type="number" placeholder="100" className="h-11 bg-muted/30 focus:bg-background transition-colors rounded-xl" />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="status" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</Label>
                    <Select name="status" defaultValue="aktif">
                      <SelectTrigger className="h-11 bg-muted/30 focus:bg-background transition-colors rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="aktif">Aktif</SelectItem>
                        <SelectItem value="nonaktif">Nonaktif</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t bg-muted/10">
              <SheetFooter className="flex sm:justify-end gap-3 w-full">
                <SheetClose className={buttonVariants({ variant: "outline", className: "h-11 rounded-xl px-6 w-full sm:w-auto" })}>
                  Batal
                </SheetClose>
                <Button type="submit" disabled={isUploading} className="h-11 rounded-xl px-8 shadow-md shadow-primary/25 w-full sm:w-auto">
                  {isUploading ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Menyimpan...</>
                  ) : (
                    'Simpan Produk'
                  )}
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
                placeholder="Cari nama produk atau SKU..." 
                className="pl-9 bg-muted/50 border-transparent focus-visible:ring-primary rounded-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto">
              <Button variant="outline" className="rounded-full w-full md:w-auto">
                <Filter className="mr-2 h-4 w-4" /> Filter
              </Button>
              <Button variant="outline" className="rounded-full w-full md:w-auto">
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-x-auto">
            <Table className="min-w-[800px]">
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead className="w-[80px]">Gambar</TableHead>
                  <TableHead>Produk</TableHead>
                  <TableHead>Kategori</TableHead>
                  <TableHead className="text-right">Harga</TableHead>
                  <TableHead className="text-center">Stok</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                      Produk tidak ditemukan.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredProducts.map((product) => (
                    <TableRow key={product.id} className="hover:bg-muted/30 transition-colors">
                      <TableCell>
                        <div className="h-12 w-12 rounded-lg bg-muted overflow-hidden">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium text-foreground">{product.name}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">{product.sku}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="font-normal text-xs">{product.category}</Badge>
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        Rp {product.price.toLocaleString('id-ID')}
                      </TableCell>
                      <TableCell className="text-center">
                        <span className={product.stock <= 5 ? "text-destructive font-bold" : ""}>
                          {product.stock}
                        </span>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant={product.status === "Aktif" ? "default" : "destructive"} className="text-[10px]">
                          {product.status}
                        </Badge>
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
                              <Pencil className="mr-2 h-4 w-4" /> Edit Produk
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDeleteProduct(product.id)} className="text-destructive">
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
              Menampilkan <strong>{filteredProducts.length}</strong> produk
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
