"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Store, ArrowLeft, Loader2, ShoppingBag, Wrench, Coffee, Smartphone, Scissors, HelpCircle, Shirt } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("Basic");
  const [billingType, setBillingType] = useState<"Permanen" | "Bulanan">("Permanen");

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      phone: formData.get('phone'),
      store: formData.get('store'),
      business_type: formData.get('business_type'),
      email: formData.get('email'),
      plan: `${selectedPlan} (${billingType})`,
    };

    try {
      // Panggil API untuk trigger Telegram Webhook
      await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
    } catch (error) {
      console.error(error);
    }

    setTimeout(() => {
      router.push('/dashboard');
    }, 1000);
  };
  return (
    <div className="h-screen flex w-full overflow-hidden">
      {/* Left Column - Branding (Hidden on Mobile/Tablet) */}
      <div className="hidden lg:flex flex-col justify-between w-5/12 bg-primary p-12 text-primary-foreground relative overflow-hidden shrink-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/20 to-transparent"></div>
        
        <div className="relative z-10">
          <Link href="/" className="inline-flex items-center text-sm font-medium text-primary-foreground/80 hover:text-white transition-colors mb-12">
            <ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke Beranda
          </Link>
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-primary mb-8 shadow-xl">
            <Store className="h-8 w-8" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-6 leading-tight">
            Tingkatkan Omzet<br />Bisnis Anda
          </h1>
          <p className="text-primary-foreground/90 text-lg max-w-sm leading-relaxed">
            Bergabunglah dengan ribuan pengusaha hebat yang telah mempercayakan operasional bisnisnya kepada DEVELZY POS.
          </p>
        </div>
        
        <div className="relative z-10 bg-black/10 p-6 rounded-3xl backdrop-blur-md border border-white/10 mt-12">
          <p className="italic mb-6 text-sm lg:text-base leading-relaxed">
            "Semenjak pakai DEVELZY POS, pembukuan bengkel dan stok barang saya jadi sangat akurat. Fitur kasir otomatisnya juara!"
          </p>
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center font-bold text-lg border border-white/30">
              BS
            </div>
            <div>
              <div className="font-bold text-white">Budi Santoso</div>
              <div className="text-xs text-primary-foreground/80">Pemilik Bengkel Maju Jaya</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Form */}
      <div className="w-full lg:w-7/12 flex items-center justify-center p-4 sm:p-8 lg:p-12 bg-background relative overflow-y-auto h-full">
        <Link href="/" className="lg:hidden absolute top-6 left-6 flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" /> Kembali
        </Link>
        
        <div className="w-full max-w-xl space-y-4 my-auto">
          <div className="text-center lg:text-left">
            <div className="mx-auto lg:mx-0 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4 lg:hidden">
              <Store className="h-6 w-6" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight">Buat Akun Baru</h2>
            <p className="text-sm text-muted-foreground mt-2">Mulai kelola bisnis Anda dengan DEVELZY POS gratis selama 14 hari.</p>
          </div>

        <form className="space-y-4" onSubmit={handleRegister}>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="name" className="text-xs">Nama Lengkap</Label>
                <Input name="name" id="name" type="text" placeholder="John Doe" required className="h-10" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="phone" className="text-xs">Nomor WhatsApp</Label>
                <Input name="phone" id="phone" type="text" placeholder="0812..." required className="h-10" />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="store" className="text-xs">Nama Toko</Label>
                <Input name="store" id="store" type="text" placeholder="Toko Sejahtera" required className="h-10" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="business_type" className="text-xs">Jenis Usaha</Label>
                <Select name="business_type" defaultValue="Retail">
                  <SelectTrigger className="h-10 w-full bg-muted/30 focus:bg-background transition-colors rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Retail"><span className="flex items-center gap-2"><ShoppingBag className="w-4 h-4 text-primary" /> Retail / Toko</span></SelectItem>
                    <SelectItem value="Bengkel"><span className="flex items-center gap-2"><Wrench className="w-4 h-4 text-primary" /> Bengkel</span></SelectItem>
                    <SelectItem value="Laundry"><span className="flex items-center gap-2"><Shirt className="w-4 h-4 text-primary" /> Laundry</span></SelectItem>
                    <SelectItem value="Cafe"><span className="flex items-center gap-2"><Coffee className="w-4 h-4 text-primary" /> Cafe / Resto</span></SelectItem>
                    <SelectItem value="Servis HP"><span className="flex items-center gap-2"><Smartphone className="w-4 h-4 text-primary" /> Servis HP</span></SelectItem>
                    <SelectItem value="Barbershop"><span className="flex items-center gap-2"><Scissors className="w-4 h-4 text-primary" /> Barbershop</span></SelectItem>
                    <SelectItem value="Custom"><span className="flex items-center gap-2"><HelpCircle className="w-4 h-4 text-primary" /> Lainnya</span></SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-1">
              <Label htmlFor="email" className="text-xs">Email</Label>
              <Input name="email" id="email" type="email" placeholder="nama@email.com" required className="h-10 bg-muted/30 focus:bg-background transition-colors rounded-xl" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password" className="text-xs">Password</Label>
              <Input name="password" id="password" type="password" required className="h-10 bg-muted/30 focus:bg-background transition-colors rounded-xl" />
            </div>

            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between">
                <Label className="text-xs">Pilih Paket</Label>
              </div>
              
              <div className="flex p-1 bg-muted/50 rounded-xl">
                <button
                  type="button"
                  onClick={() => setBillingType("Permanen")}
                  className={`flex-1 text-xs font-semibold py-2 rounded-lg transition-all ${billingType === "Permanen" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                >
                  Beli Permanen
                </button>
                <button
                  type="button"
                  onClick={() => setBillingType("Bulanan")}
                  className={`flex-1 text-xs font-semibold py-2 rounded-lg transition-all ${billingType === "Bulanan" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                >
                  Sewa Bulanan
                </button>
              </div>

              <input type="hidden" name="plan" value={`${selectedPlan} - ${billingType}`} />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2">
                <div 
                  onClick={() => setSelectedPlan("Basic")}
                  className={`relative flex flex-col p-3 cursor-pointer rounded-2xl border-2 transition-all duration-200 ${
                    selectedPlan === "Basic" 
                    ? "border-primary bg-primary/5 shadow-md shadow-primary/10" 
                    : "border-border hover:border-primary/50 bg-card hover:bg-muted/20"
                  }`}
                >
                  <div className="font-bold text-foreground">BASIC</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {billingType === "Permanen" ? <span>Rp 200.000</span> : <span>Rp 50.000 / bln</span>}
                  </div>
                  <div className="text-[10px] mt-3 font-medium opacity-80">Cocok untuk UMKM Kecil</div>
                </div>

                <div 
                  onClick={() => setSelectedPlan("Bisnis")}
                  className={`relative flex flex-col p-3 cursor-pointer rounded-2xl border-2 transition-all duration-200 ${
                    selectedPlan === "Bisnis" 
                    ? "border-blue-500 bg-blue-500/5 shadow-md shadow-blue-500/10" 
                    : "border-border hover:border-blue-500/50 bg-card hover:bg-muted/20"
                  }`}
                >
                  {selectedPlan === "Bisnis" && <div className="absolute -top-2.5 right-3 bg-blue-500 text-white text-[8px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm">Populer</div>}
                  <div className="font-bold text-blue-600">BISNIS</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {billingType === "Permanen" ? (
                      <span>Rp 275.000 <span className="line-through text-[10px] ml-1 opacity-50">350k</span></span>
                    ) : (
                      <span>Rp 100.000 / bln</span>
                    )}
                  </div>
                  <div className="text-[10px] mt-3 font-medium opacity-80">Multi Kasir & Cloud</div>
                </div>

                <div 
                  onClick={() => setSelectedPlan("Premium")}
                  className={`relative flex flex-col p-3 cursor-pointer rounded-2xl border-2 transition-all duration-200 ${
                    selectedPlan === "Premium" 
                    ? "border-amber-500 bg-amber-500/5 shadow-md shadow-amber-500/10" 
                    : "border-border hover:border-amber-500/50 bg-card hover:bg-muted/20"
                  }`}
                >
                  <div className="font-bold text-amber-500">PREMIUM</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {billingType === "Permanen" ? (
                      <span>Rp 350.000 <span className="line-through text-[10px] ml-1 opacity-50">450k</span></span>
                    ) : (
                      <span>Rp 200.000 / bln</span>
                    )}
                  </div>
                  <div className="text-[10px] mt-3 font-medium opacity-80">Cabang & AI Fitur</div>
                </div>
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full h-11 text-base" disabled={isLoading}>
            {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Memproses...</> : "Daftar Sekarang"}
          </Button>
        </form>

        <div className="text-center text-sm text-muted-foreground">
          Sudah punya akun? <Link href="/login" className="font-semibold text-primary hover:underline">Masuk di sini</Link>
        </div>
        </div>
      </div>
    </div>
  );
}
