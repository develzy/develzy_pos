"use strict";
"use client";

import { Store, User, CreditCard, Receipt, Save, Crown, CheckCircle2, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function SettingsPage() {
  const handleTestPrint = () => {
    const windowPrint = window.open('', '', 'width=300,height=600');
    if (windowPrint) {
      windowPrint.document.write(`
        <html>
          <head>
            <title>Test Print</title>
            <style>
              @page { margin: 0; size: 58mm auto; }
              body { font-family: monospace; padding: 10px; margin: 0; width: 58mm; font-size: 12px; color: #000; }
              .center { text-align: center; }
              .flex { display: flex; justify-content: space-between; }
              .dashed { border-top: 1px dashed #000; margin: 8px 0; }
              .bold { font-weight: bold; }
            </style>
          </head>
          <body>
            <div class="center mb-2">
              <h3 class="bold uppercase" style="margin-bottom:2px;">DEVELZY POS</h3>
              <p style="font-size:10px; margin-top:0;">TEST PRINT STRUK</p>
            </div>
            
            <div style="font-size:10px; margin-bottom:8px;" class="flex">
              <div>
                <div>TRX-TEST-001</div>
                <div>${new Date().toLocaleDateString('id-ID')}</div>
              </div>
              <div style="text-align:right;">
                <div>Kasir: Admin</div>
                <div>TEST</div>
              </div>
            </div>
            
            <div class="dashed"></div>
            
            <div style="margin-bottom:8px;">
              <div style="margin-bottom:4px;">
                <div>Kopi Susu Aren</div>
                <div class="flex">
                  <span>1 x 15.000</span>
                  <span>15.000</span>
                </div>
              </div>
              <div style="margin-bottom:4px;">
                <div>Nasi Goreng Spesial</div>
                <div class="flex">
                  <span>1 x 25.000</span>
                  <span>25.000</span>
                </div>
              </div>
            </div>
            
            <div class="dashed"></div>
            
            <div class="flex bold">
              <span>TOTAL</span>
              <span>Rp 40.000</span>
            </div>
            
            <div class="center mt-4" style="font-size:10px; margin-top:16px;">
              <p>Printer Thermal Anda Berfungsi!</p>
              <p style="margin-top:4px;">Powered by Develzy POS</p>
            </div>
            <script>
              window.onload = () => { window.print(); window.close(); }
            </script>
          </body>
        </html>
      `);
      windowPrint.document.close();
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Pengaturan</h2>
        <p className="text-muted-foreground">Kelola pengaturan toko, akun, dan langganan Anda.</p>
      </div>

      <Tabs defaultValue="store" className="space-y-6">
        <TabsList className="flex w-full overflow-x-auto flex-nowrap justify-start p-1 bg-muted/50 rounded-xl h-12 md:h-11 md:inline-flex md:w-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] shadow-inner border border-muted">
          <TabsTrigger value="store" className="shrink-0 flex-1 md:flex-none whitespace-nowrap rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm px-4 py-2 transition-all">
            <Store className="w-4 h-4 mr-2" /> Profil Toko
          </TabsTrigger>
          <TabsTrigger value="account" className="shrink-0 flex-1 md:flex-none whitespace-nowrap rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm px-4 py-2 transition-all">
            <User className="w-4 h-4 mr-2" /> Akun Keamanan
          </TabsTrigger>
          <TabsTrigger value="billing" className="shrink-0 flex-1 md:flex-none whitespace-nowrap rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm px-4 py-2 transition-all">
            <CreditCard className="w-4 h-4 mr-2" /> Paket & Tagihan
          </TabsTrigger>
          <TabsTrigger value="receipt" className="shrink-0 flex-1 md:flex-none whitespace-nowrap rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm px-4 py-2 transition-all">
            <Receipt className="w-4 h-4 mr-2" /> Pengaturan Struk
          </TabsTrigger>
        </TabsList>

        <TabsContent value="store" className="space-y-4">
          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <CardTitle>Informasi Toko</CardTitle>
              <CardDescription>Perbarui informasi dasar toko Anda yang akan tampil di struk pelanggan.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-6">
                <div className="h-24 w-24 rounded-2xl bg-muted flex items-center justify-center border-2 border-dashed">
                  <Store className="h-8 w-8 text-muted-foreground" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-medium">Logo Toko</h4>
                  <p className="text-xs text-muted-foreground mb-2">Disarankan ukuran 512x512px (PNG/JPG)</p>
                  <Button variant="outline" size="sm">Upload Logo</Button>
                </div>
              </div>
              
              <div className="grid gap-2 pt-2">
                <Label htmlFor="store-name">Nama Toko</Label>
                <Input id="store-name" defaultValue="Toko Sejahtera" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="store-phone">Nomor Telepon/WhatsApp</Label>
                  <Input id="store-phone" defaultValue="081234567890" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="store-email">Email Bisnis</Label>
                  <Input id="store-email" defaultValue="kontak@sejahtera.com" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="store-address">Alamat Lengkap</Label>
                <Textarea id="store-address" defaultValue="Jl. Sudirman No. 123, Jakarta Selatan" className="min-h-[100px]" />
              </div>
            </CardContent>
            <CardFooter className="border-t bg-muted/20 px-6 py-4">
              <Button><Save className="w-4 h-4 mr-2" /> Simpan Perubahan</Button>
            </CardFooter>
          </Card>

          <Card className="border-border/50 shadow-sm mt-6">
            <CardHeader>
              <CardTitle>Pengaturan QRIS Pembayaran</CardTitle>
              <CardDescription>Upload gambar barcode QRIS statis dari M-Banking atau e-Wallet bisnis Anda.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="h-40 w-40 rounded-2xl bg-muted flex items-center justify-center border-2 border-dashed relative overflow-hidden group hover:border-primary/50 transition-colors cursor-pointer">
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground bg-primary/5 hover:bg-primary/10 transition-colors">
                    <QrCode className="h-8 w-8 mb-2 text-primary" />
                    <span className="text-xs font-medium text-primary">Upload QRIS</span>
                  </div>
                </div>
                <div className="space-y-4 flex-1 w-full">
                  <div className="grid gap-2">
                    <Label htmlFor="qris-name">Nama Pemilik QRIS (Sesuai M-Banking/e-Wallet)</Label>
                    <Input id="qris-name" defaultValue="Toko Sejahtera" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="qris-nmid">NMID (National Merchant ID) - Opsional</Label>
                    <Input id="qris-nmid" placeholder="ID1029384756..." />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t bg-muted/20 px-6 py-4">
              <Button><Save className="w-4 h-4 mr-2" /> Simpan Pengaturan QRIS</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="account" className="space-y-4">
          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <CardTitle>Keamanan Akun</CardTitle>
              <CardDescription>Ganti password dan amankan akun Anda.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="current-password">Password Saat Ini</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="new-password">Password Baru</Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirm-password">Konfirmasi Password Baru</Label>
                <Input id="confirm-password" type="password" />
              </div>
            </CardContent>
            <CardFooter className="border-t bg-muted/20 px-6 py-4">
              <Button><Save className="w-4 h-4 mr-2" /> Update Password</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="space-y-4">
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-primary shadow-md md:col-span-2 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-1 text-xs font-bold rounded-bl-lg">
                PAKET AKTIF
              </div>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Crown className="w-5 h-5 text-primary" /> Premium Plan
                </CardTitle>
                <CardDescription>Anda sedang menikmati semua fitur enterprise DEVELZY POS.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <span className="text-3xl font-bold">Rp 149.000</span>
                  <span className="text-muted-foreground"> / bulan</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> Unlimited Produk & Transaksi</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> Sinkronisasi Multi-Cabang</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> Analitik Penjualan AI</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> Laporan Export PDF & Excel</div>
                </div>
              </CardContent>
              <CardFooter className="border-t bg-muted/20 px-6 py-4 flex justify-between items-center">
                <div className="text-sm text-muted-foreground">Aktif hingga <strong>31 Desember 2026</strong></div>
                <Button variant="outline">Batalkan Langganan</Button>
              </CardFooter>
            </Card>
            
            <Card className="border-border/50 shadow-sm">
              <CardHeader>
                <CardTitle>Metode Pembayaran</CardTitle>
                <CardDescription>Pembayaran otomatis.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4 p-4 border rounded-xl bg-card">
                  <div className="h-10 w-14 bg-muted rounded flex items-center justify-center">
                    <CreditCard className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Visa berakhiran 4242</p>
                    <p className="text-xs text-muted-foreground">Kedaluwarsa 12/28</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full">Ubah Metode</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="receipt" className="space-y-4">
          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <CardTitle>Pengaturan Printer Thermal & Struk</CardTitle>
              <CardDescription>Sesuaikan ukuran kertas dan format struk yang akan dicetak untuk pelanggan.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-b pb-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Ukuran Kertas Printer</Label>
                    <Select defaultValue="58mm">
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih ukuran kertas" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="58mm">Kertas Thermal 58mm (Kecil)</SelectItem>
                        <SelectItem value="80mm">Kertas Thermal 80mm (Besar)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between border rounded-lg p-3">
                    <div className="space-y-0.5">
                      <Label>Koneksi Printer</Label>
                      <p className="text-xs text-muted-foreground">Otomatis deteksi print browser</p>
                    </div>
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Tampilkan Logo di Struk</Label>
                      <p className="text-xs text-muted-foreground">Logo akan dicetak di header</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Tampilkan QRIS</Label>
                      <p className="text-xs text-muted-foreground">Cetak QRIS di bagian bawah</p>
                    </div>
                    <Switch defaultChecked={false} />
                  </div>
                </div>
              </div>
              
              <div className="grid gap-4 pt-2">
                <div className="grid gap-2">
                  <Label htmlFor="receipt-header">Teks Header Struk (Opsional)</Label>
                  <Textarea id="receipt-header" placeholder="Cth: Selamat Datang di Toko Kami!" className="min-h-[80px]" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="receipt-footer">Teks Footer Struk</Label>
                  <Textarea id="receipt-footer" defaultValue="Terima kasih atas kunjungan Anda.&#13;&#10;Barang yang sudah dibeli tidak dapat ditukar." className="min-h-[80px]" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t bg-muted/20 px-6 py-4 flex justify-between">
              <Button variant="outline" onClick={handleTestPrint}><Receipt className="w-4 h-4 mr-2" /> Test Print</Button>
              <Button><Save className="w-4 h-4 mr-2" /> Simpan Peraturan</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
