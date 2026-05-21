import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, ChevronRight, Store, BarChart3, Cloud, Shield } from "lucide-react";
import Link from "next/link";
import { DemoModal } from "@/components/DemoModal";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Store className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold tracking-tight">DEVELZY<span className="text-primary">POS</span></span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#fitur" className="text-sm font-medium text-muted-foreground hover:text-foreground">Fitur</Link>
            <Link href="#solusi" className="text-sm font-medium text-muted-foreground hover:text-foreground">Solusi</Link>
            <Link href="#harga" className="text-sm font-medium text-muted-foreground hover:text-foreground">Harga</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground hidden sm:block">
              Masuk
            </Link>
            <Link href="/register" className={buttonVariants({ className: "rounded-full" })}>
              Coba Gratis
            </Link>
          </div>
        </div>
      </header>

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

            {/* Dashboard Mockup */}
            <div className="mx-auto max-w-5xl mt-16 rounded-xl border bg-background/50 p-2 shadow-2xl backdrop-blur-sm">
              <div className="rounded-lg border bg-card p-4 overflow-hidden aspect-[16/9] relative flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
                <div className="text-center space-y-4 relative z-10">
                  <div className="mx-auto h-16 w-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                    <BarChart3 className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Dashboard Premium & Interaktif</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">Tampilan analitik penjualan realtime, manajemen stok cerdas, dan kontrol penuh atas bisnis Anda dalam satu layar.</p>
                </div>
              </div>
            </div>
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

      <footer className="border-t py-12 bg-background">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Store className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold tracking-tight text-foreground">DEVELZY<span className="text-primary">POS</span></span>
          </div>
          <p className="mb-6">Aplikasi Permanen, Usaha Makin Paten.</p>
          <div className="text-sm">
            &copy; {new Date().getFullYear()} DEVELZY POS. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
