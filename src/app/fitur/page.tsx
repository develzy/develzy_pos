import { SiteHeader } from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, Cloud, LayoutDashboard, Package, Shield, ShoppingCart, Store, Users, Zap, Smartphone, CheckCircle2, QrCode } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Fitur Lengkap | DEVELZY POS",
  description: "Jelajahi semua fitur unggulan aplikasi kasir DEVELZY POS. Dari manajemen stok, kasir pintar, hingga laporan keuangan real-time untuk bisnis Anda.",
};

export default function FiturPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SiteHeader />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-600/10 via-background to-background"></div>
          
          {/* Animated Background Orbs */}
          <div className="absolute top-20 left-1/4 w-72 h-72 bg-blue-500/20 rounded-full blur-[100px] animate-[pulse_8s_ease-in-out_infinite]"></div>
          <div className="absolute top-40 right-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-[100px] animate-[pulse_10s_ease-in-out_infinite_reverse]"></div>
          <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-[100%] blur-[80px]"></div>

          <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
            <div className="inline-flex items-center rounded-full border bg-background px-3 py-1 text-sm font-medium mb-6 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-700">
              <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2 animate-pulse"></span>
              Fitur Lengkap Enterprise
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-150 fill-mode-both">
              Satu Aplikasi, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Ratusan Kemudahan</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-10 leading-relaxed max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300 fill-mode-both">
              Tidak perlu banyak aplikasi untuk mengurus bisnis. Mulai dari kasir kasir, stok barang, hingga laporan keuangan, semua ada di DEVELZY POS.
            </p>
          </div>
        </section>

        {/* Bento Grid Features Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 max-w-6xl">
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
              
              {/* Feature 1: Point of Sale (Large Card) */}
              <div className="md:col-span-2 md:row-span-2 bg-card rounded-[2rem] p-8 border shadow-sm relative overflow-hidden group hover:shadow-lg transition-all duration-300">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl -mr-20 -mt-20 group-hover:bg-blue-600/10 transition-colors"></div>
                <div className="flex items-center gap-4 mb-6 relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-600/20">
                    <LayoutDashboard className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Kasir Cerdas & Cepat</h3>
                    <p className="text-muted-foreground font-medium">Transaksi sat-set tanpa hambatan</p>
                  </div>
                </div>
                
                <p className="text-muted-foreground mb-8 text-lg relative z-10 max-w-md leading-relaxed">
                  Antarmuka kasir yang dirancang untuk kecepatan. Layani pelanggan di jam sibuk dengan mulus, dukung scan barcode, serta pencarian produk cerdas.
                </p>
                
                <div className="grid grid-cols-2 gap-4 relative z-10">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-sm font-medium">Split Bill & Gabung Tagihan</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-sm font-medium">Kasbon & Cicilan</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-sm font-medium">Pending Order / Simpan Pesanan</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-sm font-medium">Diskon Fleksibel (Rp & %)</span>
                  </div>
                </div>
                
                {/* Decorative Elements */}
                <div className="absolute -bottom-10 -right-10 w-72 h-48 bg-slate-100 dark:bg-slate-800 rounded-t-xl border border-b-0 transform rotate-[-10deg] shadow-2xl flex p-4 hidden md:flex">
                  <div className="w-full flex flex-col gap-2 opacity-50">
                    <div className="h-6 w-1/2 bg-slate-300 dark:bg-slate-600 rounded"></div>
                    <div className="h-4 w-3/4 bg-slate-200 dark:bg-slate-700 rounded"></div>
                    <div className="h-4 w-5/6 bg-slate-200 dark:bg-slate-700 rounded"></div>
                  </div>
                </div>
              </div>

              {/* Feature 2: Integrasi QRIS */}
              <div className="bg-card rounded-[2rem] p-8 border shadow-sm relative overflow-hidden group hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center mb-6">
                    <QrCode className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">QRIS Terintegrasi</h3>
                  <p className="text-sm text-muted-foreground">
                    Terima pembayaran e-Wallet dan M-Banking secara instan. Saldo langsung masuk tanpa perlu verifikasi manual.
                  </p>
                </div>
                <div className="relative h-24 mt-4 bg-amber-50 dark:bg-amber-900/10 rounded-xl border border-amber-100 dark:border-amber-900/30 flex items-center justify-center">
                  <img src="https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=QRIS_DEMO" alt="QRIS" className="w-16 h-16 rounded opacity-80" />
                </div>
              </div>

              {/* Feature 3: Inventaris & Stok */}
              <div className="bg-card rounded-[2rem] p-8 border shadow-sm relative overflow-hidden group hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center mb-6">
                    <Package className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Manajemen Stok Anti-Bocor</h3>
                  <p className="text-sm text-muted-foreground">
                    Pantau pergerakan stok, terima peringatan stok menipis, dan kelola transfer barang antar cabang.
                  </p>
                </div>
              </div>

              {/* Feature 4: Laporan Keuangan */}
              <div className="md:col-span-2 bg-gradient-to-br from-slate-900 to-slate-950 rounded-[2rem] p-8 border border-slate-800 shadow-xl relative overflow-hidden group hover:shadow-2xl transition-all duration-300 text-white flex flex-col md:flex-row gap-8 items-center">
                <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity">
                   <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full stroke-blue-500/30 fill-none">
                     <path d="M0,100 L20,80 L40,85 L60,50 L80,60 L100,20" strokeWidth="2" />
                   </svg>
                </div>
                <div className="flex-1 relative z-10">
                  <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium mb-4 backdrop-blur-md">
                    Analitik Real-time
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Laporan Keuangan Cerdas</h3>
                  <p className="text-slate-400 mb-6 text-sm">
                    Ketahui keuntungan bersih Anda setiap hari. Analisis produk terlaris, jam paling sibuk, hingga performa kasir secara otomatis.
                  </p>
                  <Button variant="secondary" className="bg-white text-slate-900 hover:bg-slate-200">Lihat Contoh Laporan</Button>
                </div>
                <div className="w-full md:w-64 h-48 bg-slate-800/50 rounded-xl border border-slate-700/50 backdrop-blur-sm p-4 relative z-10 flex flex-col justify-end">
                  <div className="flex justify-between items-end h-full w-full gap-2 opacity-80">
                    <div className="w-1/6 bg-blue-500 rounded-t h-[40%]"></div>
                    <div className="w-1/6 bg-blue-500 rounded-t h-[60%]"></div>
                    <div className="w-1/6 bg-blue-500 rounded-t h-[30%]"></div>
                    <div className="w-1/6 bg-emerald-500 rounded-t h-[80%]"></div>
                    <div className="w-1/6 bg-emerald-500 rounded-t h-[100%]"></div>
                  </div>
                </div>
              </div>

              {/* Feature 5: CRM */}
              <div className="bg-card rounded-[2rem] p-8 border shadow-sm relative overflow-hidden group hover:shadow-lg transition-all duration-300">
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center mb-6">
                    <Users className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">CRM & Program Loyalitas</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Kumpulkan data pelanggan dan berikan poin reward otomatis untuk membuat mereka terus kembali.
                  </p>
                  <div className="flex items-center gap-2 text-xs font-bold text-purple-600 bg-purple-50 dark:bg-purple-900/20 p-2 rounded-lg inline-flex">
                    <StarIcon className="w-4 h-4" /> VIP Member Support
                  </div>
                </div>
              </div>

            </div>
            
          </div>
        </section>

        {/* Feature List Details */}
        <section className="py-20 bg-muted/30 border-t">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight mb-4">Fitur Spesifik Lainnya</h2>
              <p className="text-muted-foreground">Kami membangun fitur berdasarkan permintaan dan studi kasus ribuan UMKM.</p>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-x-12 gap-y-8">
              {[
                "Manajemen Multi-Outlet / Cabang",
                "Hak Akses Karyawan Berbeda (Kasir, Admin, Owner)",
                "Cetak Nota & Kirim Nota Digital via WhatsApp",
                "Mode Offline (Tetap bisa jualan tanpa internet)",
                "Hitung Pajak (PB1) dan Service Charge Otomatis",
                "Laporan Absensi & Komisi Karyawan",
                "Ekspor Data ke Excel / PDF",
                "Dukungan Semua Tipe Printer Bluetooth & Thermal"
              ].map((text, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="mt-1 w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <p className="font-medium text-foreground leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-blue-600"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="container mx-auto px-4 relative z-10 text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Mulai Tingkatkan Bisnis Anda Hari Ini</h2>
            <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">
              Ribuan pelaku usaha sudah membuktikan betapa mudahnya mengelola bisnis bersama DEVELZY POS. Sekarang giliran Anda.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 animate-in fade-in slide-in-from-bottom-6 duration-1000">
              <Link href="/register">
                <Button size="lg" className="h-14 px-8 text-lg bg-white text-blue-600 hover:bg-slate-100 rounded-full w-full sm:w-auto shadow-xl">
                  Coba Gratis 14 Hari
                </Button>
              </Link>
              <Link href="https://wa.me/6285879584257">
                <Button size="lg" className="h-14 px-8 text-lg bg-transparent text-white border-2 border-white hover:bg-white hover:text-blue-600 rounded-full w-full sm:w-auto transition-colors">
                  Hubungi Sales
                </Button>
              </Link>
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

function StarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}
