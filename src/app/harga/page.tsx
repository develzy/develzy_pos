"use client";

import { SiteHeader } from "@/components/SiteHeader";
import { Button, buttonVariants } from "@/components/ui/button";
import { CheckCircle2, HelpCircle, Store, Zap, Shield, Crown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function HargaPage() {
  const [isPermanent, setIsPermanent] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col overflow-hidden">
      <SiteHeader />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-blue-500/10 via-background to-background pointer-events-none"></div>
          
          {/* Animated Floating Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
             {/* Glowing Orbs */}
             <div className="absolute top-20 left-[10%] w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }}></div>
             <div className="absolute top-40 right-[15%] w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }}></div>
             
             {/* Floating Icons */}
             <div className="absolute top-32 left-[15%] md:left-[25%] animate-bounce hidden sm:block" style={{ animationDuration: '4s' }}>
               <div className="bg-background/80 backdrop-blur-md p-4 rounded-3xl border shadow-xl transform -rotate-12 hover:scale-110 transition-transform">
                 <Store className="w-8 h-8 text-blue-600" />
               </div>
             </div>
             <div className="absolute top-24 right-[15%] md:right-[25%] animate-bounce hidden sm:block" style={{ animationDuration: '5s', animationDelay: '1s' }}>
               <div className="bg-background/80 backdrop-blur-md p-4 rounded-3xl border shadow-xl transform rotate-12 hover:scale-110 transition-transform">
                 <Zap className="w-8 h-8 text-yellow-500 fill-yellow-500" />
               </div>
             </div>
             <div className="absolute bottom-8 left-[50%] -translate-x-1/2 animate-bounce" style={{ animationDuration: '4.5s', animationDelay: '0.5s' }}>
               <div className="bg-background/80 backdrop-blur-md p-4 rounded-3xl border shadow-xl transform rotate-6 hover:scale-110 transition-transform">
                 <Crown className="w-8 h-8 text-indigo-500" />
               </div>
             </div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
              Harga Transparan, <br className="hidden md:block"/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Tanpa Biaya Tersembunyi</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-150 fill-mode-both">
              Pilih paket yang paling sesuai dengan skala bisnis Anda. Mulai dari UMKM hingga perusahaan dengan ratusan cabang.
            </p>
            
            {/* Toggle Switch */}
            <div className="flex items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300 fill-mode-both">
              <span className={`text-sm md:text-base font-medium ${!isPermanent ? 'text-foreground font-bold' : 'text-muted-foreground'}`}>Langganan</span>
              <button 
                onClick={() => setIsPermanent(!isPermanent)}
                className="relative inline-flex h-10 w-20 items-center rounded-full bg-blue-600 transition-colors focus:outline-none shadow-lg shadow-blue-500/20"
              >
                <span className={`inline-block h-8 w-8 transform rounded-full bg-white shadow-sm transition-transform duration-300 ${isPermanent ? 'translate-x-11' : 'translate-x-1'}`} />
              </button>
              <span className={`text-sm md:text-base font-medium flex items-center gap-2 ${isPermanent ? 'text-foreground font-bold' : 'text-muted-foreground'}`}>
                Permanen <span className="hidden sm:inline">(Beli Aplikasi)</span>
                <span className="bg-emerald-100 text-emerald-700 text-[10px] uppercase font-bold px-2 py-0.5 rounded-full shadow-sm">1x Bayar</span>
              </span>
            </div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-12 bg-background relative z-10 -mt-8">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid md:grid-cols-3 gap-8">
              
              {/* Basic Plan */}
              <div className="bg-card border rounded-[2.5rem] p-8 shadow-sm relative overflow-hidden group hover:shadow-xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300 fill-mode-both">
                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform duration-500 group-hover:opacity-10">
                   <Store className="w-32 h-32" />
                </div>
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-2">BASIC</h3>
                  <p className="text-sm text-muted-foreground mb-6">Untuk pengusaha yang baru merintis UMKM.</p>
                  <div className="mb-8 min-h-[120px] flex flex-col justify-end">
                    {isPermanent && (
                      <div className="text-sm text-muted-foreground line-through decoration-red-500 mb-1">Rp 525.000</div>
                    )}
                    <div>
                      <span className="text-4xl font-extrabold tracking-tighter">Rp {isPermanent ? "450.000" : "50.000"}</span>
                      <span className="text-muted-foreground">{isPermanent ? " /selamanya" : "/bln"}</span>
                    </div>
                    {isPermanent && (
                      <div className="text-xs font-bold text-emerald-500 mt-1">Hemat Rp 75.000</div>
                    )}
                  </div>
                  <Link href="/register" className={buttonVariants({ variant: "outline", className: "w-full rounded-full h-12 mb-8 border-primary/20 hover:bg-primary/5 text-primary font-bold" })}>
                    Mulai Gratis 14 Hari
                  </Link>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
                      <span className="text-sm">1 Outlet / Cabang</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
                      <span className="text-sm">Maksimal 2 Kasir / User</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
                      <span className="text-sm">Manajemen Produk Dasar (200 SKU)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
                      <span className="text-sm">Laporan Penjualan Standar</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
                      <span className="text-sm">Support Jam Kerja (Senin-Jumat)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pro Plan (Popular) */}
              <div className="bg-gradient-to-b from-blue-600 to-indigo-700 text-white rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden transform md:-translate-y-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500 fill-mode-both hover:-translate-y-6 transition-transform duration-300">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-900/40 rounded-full blur-2xl"></div>
                
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                       BISNIS <Zap className="w-5 h-5 text-yellow-300 fill-yellow-300" />
                    </h3>
                    <span className="bg-white/20 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full backdrop-blur-md shadow-sm border border-white/10">
                      Paling Populer
                    </span>
                  </div>
                  <p className="text-blue-100 text-sm mb-6">Cocok untuk bisnis yang mulai berkembang pesat.</p>
                  <div className="mb-8 min-h-[120px] flex flex-col justify-end">
                    {isPermanent && (
                      <div className="text-sm text-blue-200 line-through decoration-red-400 mb-1">Rp 1.140.000</div>
                    )}
                    <div>
                      <span className="text-4xl font-extrabold tracking-tighter">Rp {isPermanent ? "990.000" : "100.000"}</span>
                      <span className="text-blue-200">{isPermanent ? " /selamanya" : "/bln"}</span>
                    </div>
                    {isPermanent && (
                      <div className="text-xs font-bold text-yellow-300 mt-1">Hemat Rp 150.000</div>
                    )}
                  </div>
                  <Link href="/register" className={buttonVariants({ className: "w-full rounded-full h-12 mb-8 bg-white text-blue-600 hover:bg-slate-100 shadow-xl font-bold" })}>
                    Langganan Sekarang
                  </Link>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-blue-300 shrink-0" />
                      <span className="text-sm font-medium">Hingga 5 Outlet / Cabang</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-blue-300 shrink-0" />
                      <span className="text-sm font-medium">Hingga 15 Kasir / User</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-blue-300 shrink-0" />
                      <span className="text-sm font-medium">Produk & SKU Tidak Terbatas</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-blue-300 shrink-0" />
                      <span className="text-sm font-medium">Manajemen Stok & Peringatan Otomatis</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-blue-300 shrink-0" />
                      <span className="text-sm font-medium">Program Loyalitas Pelanggan (CRM)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-blue-300 shrink-0" />
                      <span className="text-sm font-medium">Prioritas Support 24/7 via WA</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enterprise Plan */}
              <div className="bg-card border rounded-[2.5rem] p-8 shadow-sm relative overflow-hidden group hover:shadow-xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-700 fill-mode-both">
                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform duration-500 group-hover:opacity-10">
                   <Crown className="w-32 h-32" />
                </div>
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-2">PREMIUM</h3>
                  <p className="text-sm text-muted-foreground mb-6">Skala besar, keamanan tingkat tinggi, kustomisasi.</p>
                  <div className="mb-8 min-h-[120px] flex flex-col justify-end">
                    {isPermanent && (
                      <div className="text-sm text-muted-foreground line-through decoration-red-500 mb-1">Rp 1.550.000</div>
                    )}
                    <div>
                      <span className="text-4xl font-extrabold tracking-tighter">Rp {isPermanent ? "1.350.000" : "200.000"}</span>
                      <span className="text-muted-foreground">{isPermanent ? " /selamanya" : "/bln"}</span>
                    </div>
                    {isPermanent && (
                      <div className="text-xs font-bold text-emerald-500 mt-1">Hemat Rp 200.000</div>
                    )}
                  </div>
                  <Link href="/register" className={buttonVariants({ variant: "outline", className: "w-full rounded-full h-12 mb-8 border-primary/20 hover:bg-primary/5 text-primary font-bold" })}>
                    Hubungi Sales
                  </Link>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                      <span className="text-sm">Semua Fitur Paket Pro</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                      <span className="text-sm">Outlet & User Tidak Terbatas</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                      <span className="text-sm">Dedicated Account Manager</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                      <span className="text-sm">Kustomisasi Laporan Eksekutif</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                      <span className="text-sm">API Access untuk Integrasi Sistem (ERP/SAP)</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 bg-muted/30 border-t">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight mb-12 text-center">Pertanyaan yang Sering Diajukan</h2>
            <div className="space-y-6">
              {[
                {q: "Apakah saya bisa ganti paket di tengah bulan?", a: "Tentu bisa! Anda bebas melakukan upgrade ke paket yang lebih tinggi kapan saja. Selisih harga akan dihitung secara prorata otomatis oleh sistem kami."},
                {q: "Apakah ada biaya instalasi di awal?", a: "Tidak ada sama sekali. Anda hanya membayar biaya berlangganan sesuai paket yang dipilih. Instalasi aplikasi gratis dan bisa Anda lakukan sendiri karena sistem kami berbasis Cloud."},
                {q: "Bagaimana jika koneksi internet di toko mati?", a: "Aplikasi DEVELZY POS dilengkapi dengan mode Offline. Anda tetap bisa melakukan transaksi secara normal. Begitu koneksi internet kembali menyala, data akan langsung tersinkronisasi ke Cloud secara otomatis."},
              ].map((faq, i) => (
                <div key={i} className="bg-background border rounded-2xl p-6 shadow-sm">
                  <h4 className="font-bold text-lg mb-2 flex items-start gap-2">
                    <HelpCircle className="w-5 h-5 text-blue-600 shrink-0 mt-1" />
                    {faq.q}
                  </h4>
                  <p className="text-muted-foreground ml-7 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t py-12 bg-background">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
             <Store className="w-5 h-5 text-primary" />
             <span className="font-bold tracking-tight">DEVELZY<span className="text-primary">POS</span></span>
          </div>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} DEVELZY POS. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
