import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, ChevronRight, Store, BarChart3, Cloud, Shield, LayoutDashboard, ShoppingCart, Package, Users, Search, HelpCircle } from "lucide-react";
import Link from "next/link";
import { DemoModal } from "@/components/DemoModal";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { DashboardMockup } from "@/components/DashboardMockup";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <SiteHeader />

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-24 pb-32">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background"></div>
          <div className="container relative mx-auto px-4 text-center">
            <div className="mx-auto max-w-3xl space-y-8">
              <div className="inline-flex items-center rounded-full border bg-muted/50 px-3 py-1 text-sm text-muted-foreground backdrop-blur-sm">
                <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
                Aplikasi Kasir Berbasis Cloud #1 di Indonesia
              </div>
              <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
                Aplikasi <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Permanen</span>,<br />
                Usaha Makin <span className="text-primary">Paten.</span>
              </h1>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground leading-relaxed">
                Tingkatkan efisiensi bisnis Anda dengan DEVELZY POS. Solusi point-of-sale modern berbasis cloud untuk Toko, UMKM, Cafe, Retail, dan Usaha Modern dengan fitur enterprise-ready.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Link href="/register" className={buttonVariants({ size: "lg", className: "w-full sm:w-auto rounded-full h-12 px-8 text-base shadow-lg shadow-primary/25" })}>
                  Mulai Sekarang <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <DemoModal />
              </div>
              <div className="pt-8 flex items-center justify-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> Tanpa Kartu Kredit</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> Setup 5 Menit</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> Support 24/7</div>
              </div>
            </div>

            {/* Interactive Dashboard Mockups */}
            <DashboardMockup />
          </div>
        </section>

        {/* Features Section */}
        <section id="fitur" className="py-24 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Fitur Enterprise, Harga UMKM</h2>
              <p className="mt-4 text-lg text-muted-foreground">Semua yang Anda butuhkan untuk mengelola dan mengembangkan bisnis, kini dalam satu aplikasi super.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                { icon: Cloud, title: "Cloud Sync Real-time", desc: "Data aman di cloud, akses dari mana saja kapan saja. Sinkronisasi multi-cabang tanpa delay." },
                { icon: BarChart3, title: "Analitik Cerdas", desc: "Pantau laporan penjualan harian, bulanan, dan laba rugi dengan grafik interaktif dan mudah dipahami." },
                { icon: Shield, title: "Keamanan Enterprise", desc: "Sistem role-based access, proteksi ganda, dan enkripsi data setara standar perbankan (Fintech-grade)." },
              ].map((feature, i) => (
                <div key={i} className="bg-card p-6 rounded-2xl border shadow-sm hover:shadow-md transition-all group">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Zig-Zag Feature Showcase Section */}
        <section className="py-24 overflow-hidden bg-background">
          <div className="container mx-auto px-4 max-w-6xl">
            
            {/* Row 1: Payment Methods */}
            <div className="flex flex-col lg:flex-row items-center gap-16 mb-32">
              <div className="flex-1 space-y-6">
                <div className="inline-flex items-center rounded-full border bg-blue-50 dark:bg-blue-900/20 px-3 py-1 text-sm text-blue-600 dark:text-blue-400 font-bold tracking-wider uppercase">
                  Integrasi Seamless
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                  Terima Semua Metode Pembayaran
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Bebaskan pelanggan Anda membayar dengan metode apapun. Dari tunai, kartu debit/kredit, hingga dompet digital melalui fitur QRIS dinamis yang langsung terintegrasi ke sistem kasir tanpa perlu mesin EDC tambahan.
                </p>
                <div className="flex flex-wrap gap-3 pt-4">
                  {/* Mock Logos */}
                  <div className="bg-[#118EEA]/10 text-[#118EEA] font-extrabold px-3 py-1.5 rounded-xl text-sm flex items-center shadow-sm">DANA</div>
                  <div className="bg-[#00AED6]/10 text-[#00AED6] font-extrabold px-3 py-1.5 rounded-xl text-sm flex items-center shadow-sm">gopay</div>
                  <div className="bg-[#4C3494]/10 text-[#4C3494] font-extrabold px-3 py-1.5 rounded-xl text-sm flex items-center shadow-sm italic">OVO</div>
                  <div className="bg-[#EE4D2D]/10 text-[#EE4D2D] font-extrabold px-3 py-1.5 rounded-xl text-sm flex items-center shadow-sm">ShopeePay</div>
                  <div className="bg-[#E31E24]/10 text-[#E31E24] font-extrabold px-3 py-1.5 rounded-xl text-sm flex items-center shadow-sm italic">LinkAja!</div>
                </div>
              </div>

              <div className="flex-1 relative w-full h-[400px]">
                <div className="absolute inset-0 bg-blue-50 dark:bg-blue-900/10 rounded-[3rem] transform rotate-3"></div>
                {/* Center Image Placeholder / Gradient Box */}
                <div className="absolute inset-4 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded-[2rem] border overflow-hidden shadow-xl flex items-center justify-center relative">
                  <img src="https://images.unsplash.com/photo-1556742111-a301076d9d18?q=80&w=800&auto=format&fit=crop" alt="Customer paying" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -top-6 -left-6 bg-slate-900 p-3 rounded-2xl shadow-2xl animate-[bounce_4s_infinite]">
                  <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=QRIS_DEMO" alt="QRIS" className="w-24 h-24 rounded-lg bg-white p-1" />
                </div>
                
                <div className="absolute bottom-10 -left-10 bg-background border p-4 rounded-2xl shadow-xl animate-[bounce_5s_infinite_reverse]">
                  <div className="text-sm text-muted-foreground mb-1">Total Tagihan</div>
                  <div className="text-2xl font-bold mb-3">Rp 150.000</div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden"><div className="w-full h-full bg-blue-500"></div></div>
                </div>

                <div className="absolute top-1/4 -right-12 bg-background border p-4 rounded-2xl shadow-xl w-48 animate-[bounce_6s_infinite]">
                  <div className="flex items-center gap-3 mb-3">
                     <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center"><CheckCircle2 className="w-4 h-4" /></div>
                     <div className="text-sm font-bold">Lunas!</div>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded mb-2"></div>
                  <div className="h-2 w-2/3 bg-slate-100 rounded"></div>
                </div>
              </div>
            </div>

            {/* Row 2: Realtime Analytics */}
            <div className="flex flex-col-reverse lg:flex-row items-center gap-16">
              <div className="flex-1 relative w-full h-[400px]">
                <div className="absolute inset-0 bg-amber-50 dark:bg-amber-900/10 rounded-[3rem] transform -rotate-3"></div>
                {/* Center Image Placeholder / Gradient Box */}
                <div className="absolute inset-4 bg-gradient-to-bl from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded-[2rem] border overflow-hidden shadow-xl flex items-center justify-center relative">
                   <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop" alt="Business Analytics" className="w-full h-full object-cover" />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -top-10 right-10 bg-background border p-5 rounded-2xl shadow-xl w-56 animate-[bounce_5s_infinite]">
                  <div className="text-xs text-muted-foreground mb-2">Total Keuntungan</div>
                  <div className="text-xl font-bold text-emerald-500 mb-4">+ Rp 4.5M</div>
                  {/* Mock Chart line */}
                  <div className="w-full h-12 flex items-end gap-1">
                    {[30, 40, 25, 50, 45, 70, 85].map((h, i) => (
                      <div key={i} className="flex-1 bg-emerald-100 dark:bg-emerald-900/30 rounded-t-sm relative">
                        <div className="absolute bottom-0 w-full bg-emerald-500 rounded-t-sm" style={{ height: `${h}%` }}></div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="absolute -bottom-8 -left-4 bg-background border p-5 rounded-2xl shadow-xl w-64 animate-[bounce_4s_infinite_reverse]">
                  <div className="text-sm font-bold mb-4">Produk Terlaris</div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-amber-100"></div>
                        <div className="h-2 w-16 bg-slate-200 rounded"></div>
                      </div>
                      <div className="text-xs font-bold bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">35x</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-blue-100"></div>
                        <div className="h-2 w-20 bg-slate-200 rounded"></div>
                      </div>
                      <div className="text-xs font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full">24x</div>
                    </div>
                  </div>
                </div>

              </div>

              <div className="flex-1 space-y-6">
                <div className="inline-flex items-center rounded-full border bg-amber-50 dark:bg-amber-900/20 px-3 py-1 text-sm text-amber-600 dark:text-amber-400 font-bold tracking-wider uppercase">
                  Kontrol Penuh
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                  Pantau Bisnis dari Mana Saja, Kapan Saja
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Tinggalkan cara lama yang mengikat Anda di toko. Dengan sistem berbasis Cloud kami, Anda bisa memantau laporan penjualan secara real-time, melacak stok barang, hingga menganalisis produk paling laris langsung dari genggaman Anda.
                </p>
                <ul className="space-y-3 pt-2 text-muted-foreground">
                  <li className="flex items-center gap-3"><CheckCircle2 className="h-5 w-5 text-amber-500" /> Analitik Penjualan Harian</li>
                  <li className="flex items-center gap-3"><CheckCircle2 className="h-5 w-5 text-amber-500" /> Pengawasan Multi-Cabang</li>
                  <li className="flex items-center gap-3"><CheckCircle2 className="h-5 w-5 text-amber-500" /> Ekspor Laporan Excel/PDF Instan</li>
                </ul>
              </div>
            </div>

          </div>
        </section>

        {/* Pricing Section */}
        <section id="harga" className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Pilihan Paket Sesuai Kebutuhan</h2>
              <p className="mt-4 text-lg text-muted-foreground font-medium italic">“Aplikasi Permanen, Usaha Paten.”</p>
            </div>
            
            {/* SECTION 1: PEMBELIAN APLIKASI PERMANEN */}
            <div className="mb-20">
              <div className="text-center mb-10">
                <h4 className="text-2xl font-bold">PEMBELIAN APLIKASI PERMANEN</h4>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-start">
                {/* BASIC PLAN */}
                <div className="bg-card rounded-3xl border p-8 shadow-sm flex flex-col relative h-full">
                  <div className="mb-6">
                    <h3 className="text-xl font-bold mb-2">BASIC</h3>
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-4xl font-extrabold tracking-tight">Rp200.000</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Cocok untuk UMKM & usaha kecil</p>
                  </div>
                  <div className="space-y-3 mb-8 flex-1">
                    <div className="font-semibold text-sm mb-4">Fitur:</div>
                    {[
                      "Transaksi Kasir", "Kelola Produk / Sparepart", "Kelola Layanan", "Kelola Pelanggan", 
                      "Riwayat Transaksi", "Cetak Struk Bluetooth", "Backup & Restore", "Laporan Harian", 
                      "Pengaturan Toko", "Multi Metode Pembayaran", "Offline Mode", "Security PIN", "User Permanent"
                    ].map((f, i) => (
                      <div key={i} className="flex items-start gap-3 text-sm">
                        <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                  <Link href="/register" className={buttonVariants({ variant: "outline", className: "w-full rounded-xl h-12" })}>
                    Beli Basic
                  </Link>
                </div>

                {/* BISNIS PLAN */}
                <div className="bg-card rounded-3xl border-2 border-blue-500 p-8 shadow-xl shadow-blue-500/10 flex flex-col relative h-full transform md:-translate-y-4">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase">
                    Paling Populer
                  </div>
                  <div className="mb-6 mt-2">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-blue-600">BISNIS</h3>
                      <span className="bg-destructive/10 text-destructive text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Diskon 75Rb</span>
                    </div>
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-4xl font-extrabold tracking-tight">Rp275.000</span>
                      <span className="text-sm font-medium text-muted-foreground line-through decoration-destructive/50">Rp350.000</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Cocok untuk usaha berkembang</p>
                  </div>
                  <div className="space-y-3 mb-8 flex-1">
                    <div className="font-semibold text-sm mb-4">Semua fitur BASIC +</div>
                    {[
                      "QRIS Gratis 1 Bulan", "Transfer Gratis 1 Bulan", "Cloud Backup", "Multi Kasir", 
                      "Manajemen Karyawan", "Laporan Lengkap", "Export Excel/PDF", "Dashboard Statistik", 
                      "Hak Akses User", "Notifikasi Stok", "Share Struk WhatsApp", "Sinkronisasi Online"
                    ].map((f, i) => (
                      <div key={i} className="flex items-start gap-3 text-sm font-medium">
                        <CheckCircle2 className="h-5 w-5 text-blue-500 shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                  <Link href="/register" className={buttonVariants({ variant: "default", className: "w-full rounded-xl h-12 bg-blue-600 hover:bg-blue-700" })}>
                    Beli Bisnis
                  </Link>
                </div>

                {/* PREMIUM PLAN */}
                <div className="bg-card rounded-3xl border p-8 shadow-sm flex flex-col relative h-full">
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-amber-500">PREMIUM</h3>
                      <span className="bg-destructive/10 text-destructive text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Diskon 100Rb</span>
                    </div>
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-4xl font-extrabold tracking-tight">Rp350.000</span>
                      <span className="text-sm font-medium text-muted-foreground line-through decoration-destructive/50">Rp450.000</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Cocok untuk usaha profesional</p>
                  </div>
                  <div className="space-y-3 mb-8 flex-1">
                    <div className="font-semibold text-sm mb-4">Semua fitur BISNIS +</div>
                    {[
                      "Multi Cabang", "Real-time Cloud Sync", "Admin Panel", "Lock Feature User", 
                      "Custom Branding", "QRIS Otomatis", "Transfer Otomatis", "Thermal Printer Support", 
                      "Cashdrawer Support", "AI Laporan Penjualan", "Full Security Management", 
                      "Analitik Penjualan", "Sistem Role Permission", "Dark Mode", "Progressive Web App (PWA)"
                    ].map((f, i) => (
                      <div key={i} className="flex items-start gap-3 text-sm">
                        <CheckCircle2 className="h-5 w-5 text-amber-500 shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                  <Link href="/register" className={buttonVariants({ variant: "outline", className: "w-full rounded-xl h-12 hover:bg-amber-500/10 hover:text-amber-600 hover:border-amber-500/50" })}>
                    Beli Premium
                  </Link>
                </div>
              </div>
            </div>

            {/* SECTION 2: SEWA / LANGGANAN APLIKASI */}
            <div className="mb-16">
              <div className="text-center mb-10">
                <h4 className="text-2xl font-bold">SEWA / LANGGANAN APLIKASI</h4>
              </div>

              <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {/* BASIC RENT */}
                <div className="bg-muted/30 rounded-2xl border p-6 hover:bg-muted/50 transition-colors">
                  <h3 className="text-lg font-bold mb-1">BASIC</h3>
                  <div className="text-2xl font-extrabold mb-3">Rp50.000 <span className="text-sm font-normal text-muted-foreground">/ bulan</span></div>
                  <p className="text-sm text-muted-foreground">Fitur BASIC dengan sistem langganan bulanan.</p>
                </div>
                
                {/* BISNIS RENT */}
                <div className="bg-blue-50/50 dark:bg-blue-950/20 rounded-2xl border border-blue-100 dark:border-blue-900/50 p-6 hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-colors">
                  <h3 className="text-lg font-bold mb-1 text-blue-600">BISNIS</h3>
                  <div className="text-2xl font-extrabold mb-3">Rp100.000 <span className="text-sm font-normal text-muted-foreground">/ bulan</span></div>
                  <p className="text-sm text-muted-foreground">Fitur BISNIS dengan sistem langganan bulanan.</p>
                </div>
                
                {/* PREMIUM RENT */}
                <div className="bg-amber-50/50 dark:bg-amber-950/20 rounded-2xl border border-amber-100 dark:border-amber-900/50 p-6 hover:bg-amber-50 dark:hover:bg-amber-950/40 transition-colors">
                  <h3 className="text-lg font-bold mb-1 text-amber-600">PREMIUM</h3>
                  <div className="text-2xl font-extrabold mb-3">Rp200.000 <span className="text-sm font-normal text-muted-foreground">/ bulan</span></div>
                  <p className="text-sm text-muted-foreground">Semua fitur PREMIUM dengan sistem langganan bulanan.</p>
                </div>
              </div>
            </div>
            
            {/* KETERANGAN */}
            <div className="max-w-3xl mx-auto bg-card rounded-2xl border p-6 shadow-sm">
              <h4 className="font-bold mb-4 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-primary" />
                Keterangan
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0"></span> Pembelian permanen cukup bayar sekali.</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0"></span> Langganan aktif selama masa sewa berjalan.</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0"></span> Data & fitur tetap aman saat upgrade paket.</li>
                <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0"></span> QRIS & Transfer mengikuti biaya provider pembayaran.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-primary"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 to-transparent"></div>
          <div className="container relative mx-auto px-4 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground mb-6">Siap Meroketkan Bisnis Anda?</h2>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-10 text-lg">
              Bergabunglah dengan ribuan pengusaha yang telah beralih ke DEVELZY POS. Dapatkan akses penuh selama 14 hari, gratis!
            </p>
            <Link href="/register" className={buttonVariants({ size: "lg", variant: "secondary", className: "rounded-full h-14 px-10 text-lg font-semibold" })}>
              Mulai Coba Gratis <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
