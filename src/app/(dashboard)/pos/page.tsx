"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ShoppingCart, Trash2, Plus, Minus, CreditCard, Banknote, QrCode, Receipt, Share2, Package, Wrench } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAppStore } from "@/store/useStore";
import { toast } from "sonner";

// Dummy Categories
const categories = ["Semua", "Minuman", "Makanan", "Snack", "Lainnya"];
export default function POSPage() {
  const [activeTab, setActiveTab] = useState("Produk");
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);
  const [isQrisOpen, setIsQrisOpen] = useState(false);
  const [isCashOpen, setIsCashOpen] = useState(false);
  const [cashReceived, setCashReceived] = useState<number | "">("");
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [discountType, setDiscountType] = useState<"PERCENT" | "FIXED">("FIXED");
  const [lastTransaction, setLastTransaction] = useState<any>(null);
  
  const { products, services, fetchServices, cart, addToCart, updateCartQty, addTransaction, user } = useAppStore();

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  const updateQty = (id: string, delta: number) => {
    updateCartQty(id, delta);
  };

  const filteredProducts = products.filter(p => 
    (activeCategory === "Semua" || p.category === activeCategory) &&
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredServices = services.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePaymentInitiate = (method: string) => {
    setIsPaymentOpen(false);
    if (method === "QRIS") {
      setIsQrisOpen(true);
    } else if (method === "CASH") {
      setCashReceived("");
      setIsCashOpen(true);
    } else {
      finalizePayment(method);
    }
  };

  const finalizePayment = (method: string = "QRIS") => {
    const cash = Number(cashReceived) || total;
    const newTransaction = {
      id: `TRX-${Math.floor(Math.random() * 10000)}`,
      total: total,
      subtotal: subtotal,
      discount: discountValue,
      tax: tax,
      items: [...cart],
      method: method,
      cashReceived: method === "CASH" ? cash : total,
      change: method === "CASH" ? cash - total : 0,
      date: new Date().toISOString()
    };
    
    addTransaction(newTransaction);
    setLastTransaction(newTransaction);
    setIsQrisOpen(false);
    setIsCashOpen(false);
    setIsReceiptOpen(true);
    
    toast.success("Transaksi Berhasil!", {
      description: `Pembayaran ${method} sebesar Rp ${total.toLocaleString('id-ID')} diterima.`,
    });
  };

  const handlePrint = () => {
    const printContent = document.getElementById('print-receipt');
    const windowPrint = window.open('', '', 'width=300,height=600');
    if (windowPrint && printContent) {
      windowPrint.document.write(`
        <html>
          <head>
            <title>Cetak Struk</title>
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
            ${printContent.innerHTML}
            <script>
              window.onload = () => { window.print(); window.close(); }
            </script>
          </body>
        </html>
      `);
      windowPrint.document.close();
    }
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.qty), 0);
  const discountValue = discountType === "PERCENT" ? (subtotal * discountAmount / 100) : discountAmount;
  const subtotalAfterDiscount = subtotal - discountValue;
  const tax = subtotalAfterDiscount * 0.11; // 11% PPN
  const total = subtotalAfterDiscount + tax;

  const handleShareWA = () => {
    if (!lastTransaction) return;
    const text = `*${user?.store_name || "DEVELZY POS"}*\n` +
      `ID: ${lastTransaction.id}\n` +
      `Tanggal: ${new Date(lastTransaction.date).toLocaleDateString('id-ID')}\n` +
      `------------------------\n` +
      lastTransaction.items.map((i:any) => `${i.product.name}\n${i.qty} x Rp ${i.product.price.toLocaleString('id-ID')} = Rp ${(i.qty*i.product.price).toLocaleString('id-ID')}`).join("\n") +
      `\n------------------------\n` +
      (lastTransaction.discount > 0 ? `Diskon: -Rp ${lastTransaction.discount.toLocaleString('id-ID')}\n` : '') +
      `Total: Rp ${lastTransaction.total.toLocaleString('id-ID')}\n\n` +
      `Terima kasih!`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-120px)] animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Product List Section */}
      <div className="flex-1 flex flex-col gap-4">
        <Tabs defaultValue="Produk" className="w-full flex-1 flex flex-col" onValueChange={setActiveTab}>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-card p-4 rounded-xl border shadow-sm">
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <TabsList className="bg-muted/50 p-1">
                <TabsTrigger value="Produk" className="data-[state=active]:bg-background data-[state=active]:shadow-sm"><Package className="h-4 w-4 mr-2"/> Produk</TabsTrigger>
                <TabsTrigger value="Jasa" className="data-[state=active]:bg-background data-[state=active]:shadow-sm"><Wrench className="h-4 w-4 mr-2"/> Jasa</TabsTrigger>
              </TabsList>
            </div>
            <div className="relative w-full flex-1 sm:max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder={`Cari ${activeTab.toLowerCase()} (F2)...`} 
                className="pl-10 rounded-full bg-muted/50 border-transparent focus-visible:ring-primary w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            {activeTab === "Produk" && (
              <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0 hide-scrollbar">
                {categories.map(cat => (
                  <Badge 
                    key={cat} 
                    variant={activeCategory === cat ? "default" : "secondary"}
                    className="cursor-pointer px-4 py-1.5 rounded-full whitespace-nowrap text-sm"
                    onClick={() => setActiveCategory(cat)}
                  >
                    {cat}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <ScrollArea className="flex-1 h-full pr-4 mt-4">
            <TabsContent value="Produk" className="mt-0 h-full">
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 pb-4">
                {filteredProducts.map(product => (
                  <Card 
                    key={product.id} 
                    className="overflow-hidden cursor-pointer hover:border-primary/50 transition-all hover:shadow-md group"
                    onClick={() => addToCart(product)}
                  >
                    <div className="h-32 bg-muted relative overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute top-2 right-2 bg-background/80 backdrop-blur-md px-2 py-1 rounded-md text-xs font-semibold shadow-sm">
                        {product.category}
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-sm line-clamp-2 leading-tight">{product.name}</h3>
                      <p className="text-primary font-bold mt-2">Rp {product.price.toLocaleString('id-ID')}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="Jasa" className="mt-0 h-full">
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 pb-4">
                {filteredServices.map(service => (
                  <Card 
                    key={service.id} 
                    className="overflow-hidden cursor-pointer hover:border-primary/50 transition-all hover:shadow-md group flex flex-col justify-between"
                    onClick={() => addToCart(service, "SERVICE")}
                  >
                    <CardHeader className="bg-primary/5 pb-2 border-b">
                      <div className="flex justify-between items-start">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                          <Wrench className="h-5 w-5" />
                        </div>
                        <Badge variant="outline" className="text-[10px]">{service.category}</Badge>
                      </div>
                      <CardTitle className="text-base mt-3 line-clamp-2 leading-tight">{service.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-3">
                      <p className="text-primary font-bold text-lg">Rp {service.price.toLocaleString('id-ID')}</p>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{service.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </div>

      {/* Cart Section */}
      <Card className="w-full lg:w-[400px] flex flex-col h-full shadow-lg border-primary/10">
        <CardHeader className="border-b bg-muted/20 pb-4">
          <CardTitle className="flex items-center justify-between text-lg">
            <span className="flex items-center gap-2"><ShoppingCart className="h-5 w-5" /> Keranjang</span>
            <Badge variant="secondary" className="rounded-full px-3">{cart.length} Item</Badge>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="flex-1 overflow-hidden p-0">
          <ScrollArea className="h-full px-4">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-muted-foreground gap-4">
                <ShoppingCart className="h-12 w-12 opacity-20" />
                <p>Keranjang masih kosong</p>
              </div>
            ) : (
              <div className="flex flex-col gap-4 py-4">
                {cart.map((item) => (
                  <div key={item.product.id} className="flex gap-3 items-center group">
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold truncate">{item.product.name}</h4>
                      <p className="text-xs text-muted-foreground">Rp {item.product.price.toLocaleString('id-ID')}</p>
                    </div>
                    <div className="flex items-center gap-2 bg-muted/50 rounded-full p-1 border">
                      <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full" onClick={() => updateQty(item.product.id, -1)}>
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="text-sm w-4 text-center font-medium">{item.qty}</span>
                      <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full" onClick={() => updateQty(item.product.id, 1)}>
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    <div className="text-sm font-bold text-right min-w-[70px]">
                      Rp {(item.product.price * item.qty).toLocaleString('id-ID')}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </CardContent>

        <CardFooter className="flex-col border-t bg-muted/10 p-4 gap-4">
          <div className="w-full space-y-2">
            <div className="flex items-center gap-2 pb-2 mb-2 border-b">
              <span className="text-sm text-muted-foreground w-16">Diskon:</span>
              <Input 
                type="number" 
                placeholder="0" 
                className="h-8 text-sm" 
                value={discountAmount || ""}
                onChange={(e) => setDiscountAmount(Number(e.target.value))}
              />
              <Select value={discountType} onValueChange={(val: any) => setDiscountType(val)}>
                <SelectTrigger className="h-8 w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="FIXED">Rp</SelectItem>
                  <SelectItem value="PERCENT">%</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Subtotal</span>
              <span>Rp {subtotal.toLocaleString('id-ID')}</span>
            </div>
            {discountValue > 0 && (
              <div className="flex justify-between text-sm text-destructive">
                <span>Diskon</span>
                <span>- Rp {discountValue.toLocaleString('id-ID')}</span>
              </div>
            )}
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>PPN (11%)</span>
              <span>Rp {tax.toLocaleString('id-ID')}</span>
            </div>
            <div className="flex justify-between text-xl font-bold pt-2 border-t mt-2">
              <span>Total</span>
              <span className="text-primary">Rp {total.toLocaleString('id-ID')}</span>
            </div>
          </div>

          <Dialog open={isPaymentOpen} onOpenChange={setIsPaymentOpen}>
            <DialogTrigger className={buttonVariants({ size: "lg", className: "w-full h-14 rounded-xl text-lg shadow-lg shadow-primary/25" })} disabled={cart.length === 0}>
              Bayar Sekarang
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Pilih Metode Pembayaran</DialogTitle>
                <DialogDescription>Total Tagihan: <strong className="text-primary text-lg">Rp {total.toLocaleString('id-ID')}</strong></DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4 py-4">
                <Button onClick={() => handlePaymentInitiate("CASH")} variant="outline" className="h-24 flex flex-col gap-2 hover:border-primary hover:bg-primary/5">
                  <Banknote className="h-8 w-8 text-emerald-500" />
                  <span>Tunai (Cash)</span>
                </Button>
                <Button onClick={() => handlePaymentInitiate("QRIS")} variant="outline" className="h-24 flex flex-col gap-2 hover:border-primary hover:bg-primary/5">
                  <QrCode className="h-8 w-8 text-sky-500" />
                  <span>QRIS</span>
                </Button>
                <Button onClick={() => handlePaymentInitiate("DEBIT")} variant="outline" className="h-24 flex flex-col gap-2 hover:border-primary hover:bg-primary/5">
                  <CreditCard className="h-8 w-8 text-indigo-500" />
                  <span>Debit / Kredit</span>
                </Button>
                <Button onClick={() => handlePaymentInitiate("TRANSFER")} variant="outline" className="h-24 flex flex-col gap-2 hover:border-primary hover:bg-primary/5">
                  <Banknote className="h-8 w-8 text-amber-500" />
                  <span>Transfer Bank</span>
                </Button>
              </div>
              <DialogFooter>
                <Button variant="ghost" className="w-full" onClick={() => setIsPaymentOpen(false)}>Batalkan</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* QRIS Payment Dialog */}
          <Dialog open={isQrisOpen} onOpenChange={setIsQrisOpen}>
            <DialogContent className="sm:max-w-[400px]">
              <DialogHeader>
                <DialogTitle className="text-center text-2xl font-bold">Scan QRIS</DialogTitle>
                <DialogDescription className="text-center">Silakan arahkan pelanggan untuk scan kode QR di bawah ini menggunakan M-Banking atau e-Wallet favorit mereka.</DialogDescription>
              </DialogHeader>
              <div className="flex flex-col items-center justify-center p-2">
                <div className="bg-white p-6 rounded-3xl shadow-sm border-2 border-primary/20 mb-4 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=DEVELZY_POS_QRIS_DUMMY" alt="QRIS Code" className="w-48 h-48 group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="text-3xl font-black text-primary mb-1 tracking-tight">Rp {total.toLocaleString('id-ID')}</div>
                <div className="text-sm text-muted-foreground font-medium uppercase tracking-widest">{user?.store_name || "DEVELZY POS"}</div>
              </div>
              <DialogFooter className="flex-col sm:flex-col gap-3 mt-4">
                <Button onClick={() => finalizePayment("QRIS")} className="w-full h-14 text-lg font-bold rounded-2xl shadow-lg shadow-primary/25">
                  <QrCode className="mr-2 h-5 w-5" /> Verifikasi Pembayaran
                </Button>
                <Button variant="ghost" className="w-full h-12 rounded-xl text-muted-foreground hover:text-foreground" onClick={() => setIsQrisOpen(false)}>
                  Batalkan Transaksi
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* CASH Payment Dialog */}
          <Dialog open={isCashOpen} onOpenChange={setIsCashOpen}>
            <DialogContent className="sm:max-w-[400px]">
              <DialogHeader>
                <DialogTitle>Pembayaran Tunai</DialogTitle>
                <DialogDescription>Masukkan nominal uang yang diterima dari pelanggan.</DialogDescription>
              </DialogHeader>
              <div className="py-4 space-y-4">
                <div className="flex justify-between items-center text-lg font-semibold border-b pb-2">
                  <span>Total Tagihan:</span>
                  <span className="text-primary text-2xl">Rp {total.toLocaleString('id-ID')}</span>
                </div>
                <div className="space-y-2">
                  <Label>Uang Diterima (Rp)</Label>
                  <Input 
                    type="number" 
                    value={cashReceived} 
                    onChange={(e) => setCashReceived(Number(e.target.value))}
                    className="h-14 text-2xl font-bold"
                    autoFocus
                  />
                </div>
                {Number(cashReceived) > 0 && (
                  <div className="flex justify-between items-center bg-muted/50 p-3 rounded-lg border">
                    <span className="font-medium">Kembalian:</span>
                    <span className={`text-2xl font-black ${Number(cashReceived) >= total ? 'text-emerald-500' : 'text-destructive'}`}>
                      Rp {(Number(cashReceived) - total).toLocaleString('id-ID')}
                    </span>
                  </div>
                )}
                <div className="grid grid-cols-3 gap-2">
                  <Button variant="outline" className="font-semibold" onClick={() => setCashReceived(total)}>Uang Pas</Button>
                  <Button variant="outline" className="font-semibold" onClick={() => setCashReceived(50000)}>50.000</Button>
                  <Button variant="outline" className="font-semibold" onClick={() => setCashReceived(100000)}>100.000</Button>
                </div>
              </div>
              <DialogFooter>
                <Button 
                  onClick={() => finalizePayment("CASH")} 
                  disabled={Number(cashReceived) < total}
                  className="w-full h-12 text-lg shadow-md shadow-primary/20"
                >
                  Selesaikan Pembayaran
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Receipt Dialog */}
          <Dialog open={isReceiptOpen} onOpenChange={setIsReceiptOpen}>
            <DialogContent className="sm:max-w-[350px]">
              <DialogHeader>
                <DialogTitle className="text-center">Struk Pembayaran</DialogTitle>
              </DialogHeader>
              
              <div className="bg-white text-black p-4 rounded-md border shadow-inner flex justify-center overflow-hidden">
                {/* This div format is specifically for 58mm POS thermal printers */}
                <div id="print-receipt" className="w-[58mm] font-mono text-[12px] leading-tight">
                  <div className="center text-center mb-2">
                    <h3 className="font-bold text-sm uppercase">{user?.store_name || "DEVELZY POS"}</h3>
                    <p className="text-[10px]">Aplikasi Kasir Modern</p>
                  </div>
                  
                  <div className="text-[10px] mb-2 flex justify-between">
                    <div>
                      <div>{lastTransaction?.id}</div>
                      <div>{new Date(lastTransaction?.date || Date.now()).toLocaleDateString('id-ID')}</div>
                    </div>
                    <div className="text-right">
                      <div>Kasir: {user?.name.split(' ')[0] || "Admin"}</div>
                      <div>{lastTransaction?.method}</div>
                    </div>
                  </div>
                  
                  <div className="dashed border-t border-dashed border-gray-400 my-2"></div>
                  
                  <div className="mb-2">
                    {lastTransaction?.items.map((item: any, idx: number) => (
                      <div key={idx} className="mb-1">
                        <div>{item.product.name}</div>
                        <div className="flex justify-between">
                          <span>{item.qty} x {item.product.price.toLocaleString('id-ID')}</span>
                          <span>{(item.qty * item.product.price).toLocaleString('id-ID')}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="dashed border-t border-dashed border-gray-400 my-2"></div>
                  
                  {lastTransaction?.discount > 0 && (
                    <div className="flex justify-between">
                      <span>Diskon</span>
                      <span>- Rp {lastTransaction?.discount.toLocaleString('id-ID')}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between font-bold text-[14px] my-1">
                    <span>TOTAL</span>
                    <span>Rp {lastTransaction?.total.toLocaleString('id-ID')}</span>
                  </div>

                  {lastTransaction?.method === "CASH" && (
                    <>
                      <div className="flex justify-between mt-1">
                        <span>Tunai</span>
                        <span>Rp {lastTransaction?.cashReceived?.toLocaleString('id-ID')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Kembali</span>
                        <span>Rp {lastTransaction?.change?.toLocaleString('id-ID')}</span>
                      </div>
                    </>
                  )}
                  
                  <div className="center text-center mt-4 text-[10px]">
                    <p>Terima Kasih Atas Kunjungan Anda!</p>
                    <p className="mt-1">Powered by Develzy POS</p>
                  </div>
                </div>
              </div>

              <DialogFooter className="flex-col sm:flex-col gap-2 mt-4">
                <Button onClick={handlePrint} className="w-full h-12 gap-2 text-lg">
                  <Receipt className="h-5 w-5" /> Cetak ke Thermal
                </Button>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="secondary" onClick={handleShareWA} className="gap-2 bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20">
                    <Share2 className="h-4 w-4" /> Share WA
                  </Button>
                  <Button variant="outline" onClick={() => setIsReceiptOpen(false)}>
                    Tutup
                  </Button>
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </div>
  );
}
