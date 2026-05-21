import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Coffee, ShoppingBag, Wrench, Shirt, Utensils, Scissors, Store, Star, Users, PieChart, Receipt, ClipboardList } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return [
    { type: 'coffee-shop' },
    { type: 'retail' },
    { type: 'bengkel' },
    { type: 'laundry' },
    { type: 'restoran' },
    { type: 'barbershop' },
  ];
}

const solusiData: Record<string, any> = {
  "coffee-shop": { 
    title: "Aplikasi Kasir Coffee Shop", 
    desc: "Membantumu Lebih Fokus Meracik Kopi Istimewa. Sekarang kamu bisa menciptakan aneka kreasi menu dengan lebih fokus. Urusan pencatatan penjualan serahkan saja pada aplikasi point of sale terbaik untuk coffee shop.", 
    icon: Coffee,
    typeStr: "Cafe",
    features: ["Manajemen Varian Kopi & Topping", "Sistem Antrian & Nomor Meja", "Integrasi Printer Dapur/Bar", "Manajemen Stok Bahan Baku", "Laporan Penjualan Real-time"],
    introTitle: "Mengelola Coffee Shop Jadi Lebih Mudah",
    introDesc: "DEVELZY POS memiliki beragam fitur yang dirancang khusus untuk usahawan coffee shop. Mulai dari manajemen resep, pembayaran digital QRIS, kelola bahan baku, hingga laporan penjualan.",
    feature1Title: "Bebaskan Pelanggan Memilih Menu Tambahan Favorit Mereka",
    feature1Desc: "Cappuccino dengan extra shot, iced cafe latte plus vanilla syrup, atau caramel macchiato dengan tambahan whipped cream. Fitur Opsi Tambahan (Add-ons) kami siap mewujudkannya tanpa membuat barista Anda pusing.",
    feature1Icon: Coffee,
    feature1Image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=800&auto=format&fit=crop",
    feature2Title: "Buat Pelanggan Menunggu dengan Nyaman (Sistem Antrean)",
    feature2Desc: "Beri tahu pelanggan nomor antrean pesanannya lewat cetak struk atau layar pemanggilan. Antrean yang teratur membantu staf bar/dapur lebih fokus dan meminimalisir salah pesanan saat jam sibuk.",
    feature2Icon: Users,
    feature2Image: "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?q=80&w=800&auto=format&fit=crop",
    testiName: "Budi Santoso",
    testiRole: "Pemilik Senja Kopi",
    testiQuote: "DEVELZY POS cocok banget buat Senja Kopi. Fitur varian topping-nya sangat detail, bikin barista nggak pernah salah bikin pesanan pelanggan lagi."
  },
  "retail": { 
    title: "Aplikasi Kasir Toko Retail", 
    desc: "Kelola Produk di Tokomu Sebanyak Apa pun Itu. Hanya perlu satu perangkat cerdas, kamu bisa kelola ribuan produk, mencatat penjualan dan monitor laporan secara real-time dari mana saja.", 
    icon: ShoppingBag,
    typeStr: "Retail",
    features: ["Manajemen Ribuan SKU & Barcode", "Peringatan Stok Menipis", "Multi Cabang & Gudang", "Laporan Profit Margin", "Promo & Diskon Fleksibel"],
    introTitle: "Maksimalkan Profit Toko Retail Anda",
    introDesc: "Bebas pusing urus stok hilang. DEVELZY POS memberikan kontrol penuh terhadap inventaris, riwayat barang masuk/keluar, dan sistem barcode otomatis untuk mempercepat antrean kasir.",
    feature1Title: "Scan Barcode Hitungan Detik, Antrean Cepat Terurai",
    feature1Desc: "Integrasikan scanner barcode fisik atau gunakan kamera smartphone/tablet untuk memindai SKU produk dengan kecepatan luar biasa. Kasir lebih cepat, pelanggan lebih puas.",
    feature1Icon: Receipt,
    feature1Image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=800&auto=format&fit=crop",
    feature2Title: "Peringatan Stok Menipis Otomatis ke HP Anda",
    feature2Desc: "Jangan biarkan rak kosong membuat Anda kehilangan pelanggan. Sistem akan otomatis mengirimkan notifikasi saat stok suatu barang mencapai batas minimum yang Anda tentukan.",
    feature2Icon: ClipboardList,
    feature2Image: "https://images.unsplash.com/photo-1556740758-90de374c12ad?q=80&w=800&auto=format&fit=crop",
    testiName: "Siti Aminah",
    testiRole: "Owner Minimarket Berkah",
    testiQuote: "Sejak pakai aplikasi ini, saya nggak pernah kecolongan stok barang lagi. Sinkronisasi antar cabangnya sangat cepat dan akurat!"
  },
  "bengkel": { 
    title: "Aplikasi Kasir Bengkel", 
    desc: "Manajemen Jasa & Sparepart Dalam Satu Platform. Permudah alur kerja montir, catat riwayat servis pelanggan, dan pantau stok oli hingga sparepart terkecil secara otomatis.", 
    icon: Wrench,
    typeStr: "Bengkel",
    features: ["Riwayat Servis Kendaraan", "Komisi Montir/Mekanik", "Manajemen Stok Oli & Sparepart", "Pengingat Servis Berkala", "Cetak Struk/Nota Digital"],
    introTitle: "Bengkel Modern dengan Sistem yang Modern",
    introDesc: "Beralih dari nota kertas yang mudah hilang ke sistem digital yang terintegrasi. DEVELZY POS menggabungkan manajemen stok sparepart yang rumit dengan sistem pembagian komisi montir.",
    feature1Title: "Database Riwayat Servis Kendaraan Pelanggan",
    feature1Desc: "Hanya dengan mencari nomor pelat kendaraan, Anda bisa melihat seluruh riwayat penggantian oli, ganti kampas rem, hingga catatan keluhan dari pelanggan untuk memberikan servis yang lebih personal.",
    feature1Icon: ClipboardList,
    feature1Image: "/images/bengkel_1.png",
    feature2Title: "Otomatisasi Hitung Komisi Mekanik/Montir",
    feature2Desc: "Tidak perlu lagi pusing menghitung jatah montir di akhir bulan. Tetapkan persentase atau nominal komisi per jasa, dan biarkan sistem merekapnya secara otomatis setiap hari.",
    feature2Icon: Users,
    feature2Image: "/images/bengkel_2.png",
    testiName: "Ahmad Wijaya",
    testiRole: "Maju Motor Garage",
    testiQuote: "Sistem komisi montirnya juara! Mekanik saya jadi makin semangat karena hitungannya transparan, dan rekap omzet saya jadi jauh lebih mudah."
  },
  "laundry": { 
    title: "Aplikasi Kasir Laundry", 
    desc: "Sistem Manajemen Laundry yang Otomatis & Cerdas. Pantau status cucian, hitung timbangan otomatis, dan kelola antrean dengan fitur khusus usaha laundry masa kini.", 
    icon: Shirt,
    typeStr: "Laundry",
    features: ["Timbangan & Kalkulasi Otomatis", "Status Proses Cucian (Tracking)", "Notifikasi WhatsApp Pelanggan", "Manajemen Layanan (Kiloan/Satuan)", "Kasbon & Piutang Pelanggan"],
    introTitle: "Solusi Cerdas Anti Baju Hilang & Tertukar",
    introDesc: "Manajemen laundry tidak pernah semudah ini. Dengan DEVELZY POS, Anda bisa melacak posisi pakaian (sedang dicuci, disetrika, atau siap diambil) dan menagih piutang pelanggan dengan rapi.",
    feature1Title: "Kirim Nota & Pengingat Pengambilan via WhatsApp",
    feature1Desc: "Hemat kertas! Kirimkan nota digital langsung ke WhatsApp pelanggan, lengkap dengan link untuk melacak status pakaian mereka. Sistem juga akan mengingatkan pelanggan jika pakaian sudah siap diambil.",
    feature1Icon: Receipt,
    feature1Image: "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?q=80&w=800&auto=format&fit=crop",
    feature2Title: "Manajemen Layanan Kiloan, Satuan, dan Karpet",
    feature2Desc: "Satu aplikasi untuk semua jenis cucian. Atur harga berbeda untuk cuci kilat 1 hari, reguler 3 hari, cuci sepatu, bedcover, hingga layanan antar-jemput dengan sangat fleksibel.",
    feature2Icon: PieChart,
    feature2Image: "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?q=80&w=800&auto=format&fit=crop",
    testiName: "Nadia Larasati",
    testiRole: "Owner Clean & Fresh Laundry",
    testiQuote: "Pelanggan makin trust sama laundry saya karena mereka dapat nota langsung di WA. Pembukuannya juga bikin saya tahu jelas untung bersih bulanan."
  },
  "restoran": { 
    title: "Aplikasi Kasir Restoran", 
    desc: "Tingkatkan Pelayanan Restoranmu Jadi Lebih Cepat. Hindari antrean panjang dan salah pesanan. Atur meja, split bill, dan teruskan order langsung ke dapur dengan satu klik.", 
    icon: Utensils,
    typeStr: "Cafe",
    features: ["Manajemen Denah Meja", "Split Bill & Merge Bill", "Pemesanan via QR Code", "Manajemen Resep & Food Cost", "Integrasi Kitchen Display System (KDS)"],
    introTitle: "Manajemen Dapur ke Meja yang Sempurna",
    introDesc: "Dari pelanggan memesan hingga chef memasak, semua terkoneksi. DEVELZY POS dirancang agar restoran Anda terhindar dari pesanan yang terlewat dan antrean pembayaran yang menumpuk.",
    feature1Title: "Pemesanan Mandiri via QR Code di Meja (Dine-in)",
    feature1Desc: "Pelanggan cukup scan QR Code yang ada di meja untuk melihat menu interaktif, memesan, hingga melakukan pembayaran langsung dari HP mereka tanpa harus memanggil pelayan.",
    feature1Icon: Store,
    feature1Image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800&auto=format&fit=crop",
    feature2Title: "Manajemen Denah Meja & Split Bill Pembayaran",
    feature2Desc: "Ubah layout aplikasi kasir menyerupai denah restoran Anda untuk memantau meja mana yang kosong. Tersedia juga fitur Split Bill jika sekelompok teman ingin membayar makanannya masing-masing.",
    feature2Icon: PieChart,
    feature2Image: "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?q=80&w=800&auto=format&fit=crop",
    testiName: "Chef Renata",
    testiRole: "Manajer Resto Nusantara",
    testiQuote: "KDS (Kitchen Display System)-nya sangat membantu tim dapur kami. Pesanan tidak ada lagi yang terselip kertasnya, semua digital dan terpantau durasinya."
  },
  "barbershop": { 
    title: "Aplikasi Kasir Barbershop", 
    desc: "Fokus Berikan Potongan Terbaik, Biar Kami Urus Sisanya. Atur jadwal, hitung komisi kapster, dan kelola loyalitas pelanggan Barbershop-mu dengan mudah.", 
    icon: Scissors,
    typeStr: "Barbershop",
    features: ["Sistem Booking / Reservasi", "Komisi Kapster/Barber", "Manajemen Paket Perawatan", "Database Loyalitas Pelanggan", "Laporan Kinerja Karyawan"],
    introTitle: "Tingkatkan Retensi Pelanggan Barbershop",
    introDesc: "Tidak hanya sekadar kasir, ini adalah asisten manajer Anda. DEVELZY POS mengatur pembagian komisi potong rambut yang adil dan mengelola data pelanggan VIP Anda.",
    feature1Title: "Manajemen Komisi Kapster yang Transparan",
    feature1Desc: "Tingkatkan motivasi para Barber dengan sistem perhitungan komisi yang instan. Anda dapat mengatur skema bagi hasil yang berbeda untuk setiap layanan (Haircut, Creambath, Coloring, dll).",
    feature1Icon: Users,
    feature1Image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=800&auto=format&fit=crop",
    feature2Title: "Program Loyalitas & Diskon Member Otomatis",
    feature2Desc: "Buat pelanggan selalu kembali ke Barbershop Anda! Berikan poin di setiap kunjungan yang bisa ditukar dengan potongan harga atau layanan gratis pada kunjungan ke-10.",
    feature2Icon: Star,
    feature2Image: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80&w=800&auto=format&fit=crop",
    testiName: "Doni Pratama",
    testiRole: "Founder Captain's Cut",
    testiQuote: "Sistem komisinya luar biasa detail! Dan sejak ada fitur poin pelanggan, banyak klien yang milih potong di tempat saya terus dibanding pindah barbershop lain."
  }
};

export default async function SolusiPage({ params }: { params: Promise<{ type: string }> }) {
  const resolvedParams = await params;
  const type = resolvedParams.type;
  
  const data = solusiData[type];

  if (!data) {
    notFound();
  }

  const Icon = data.icon;
  const Feature1Icon = data.feature1Icon || CheckCircle2;
  const Feature2Icon = data.feature2Icon || CheckCircle2;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SiteHeader />
      
      <main className="flex-1">
        {/* 1. Hero Section */}
        <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background"></div>
          
          <div className="container mx-auto px-4 max-w-6xl relative">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              
              {/* Left Content */}
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-flex items-center rounded-full border bg-primary/10 px-4 py-1.5 text-sm text-primary font-bold tracking-wider uppercase mb-6 backdrop-blur-sm shadow-sm">
                  {data.title}
                </div>
                
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
                  {data.desc.split(". ")[0]}
                </h1>
                
                <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                  {data.desc.split(". ").slice(1).join(". ")}
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                  <Link href={`/register?type=${data.typeStr}`} className={buttonVariants({ size: "lg", className: "w-full sm:w-auto rounded-full h-14 px-8 text-base shadow-lg shadow-primary/25" })}>
                    Coba Gratis Sekarang <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </div>
              </div>

              {/* Right Content - Mockup */}
              <div className="flex-1 w-full max-w-xl lg:max-w-none relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-blue-400/20 rounded-[3rem] transform rotate-3 scale-105 blur-2xl z-0"></div>
                <div className="bg-card border shadow-2xl rounded-[2rem] p-8 relative z-10 overflow-hidden">
                  <div className="absolute -top-10 -right-10 text-primary/5">
                    <Icon className="w-64 h-64" />
                  </div>
                  
                  <div className="relative z-20">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground mb-8 shadow-xl">
                      <Icon className="h-8 w-8" />
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-6">Fitur Khusus untuk Bisnis Anda:</h3>
                    
                    <div className="space-y-4">
                      {data.features.map((feature: string, i: number) => (
                        <div key={i} className="flex items-start gap-3 bg-background/50 p-3 rounded-xl border backdrop-blur-sm">
                          <CheckCircle2 className="h-6 w-6 text-emerald-500 shrink-0" />
                          <span className="font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </section>

        {/* 2. Intro Section */}
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6 tracking-tight">{data.introTitle}</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {data.introDesc}
              </p>
            </div>
          </div>
        </section>

        {/* 3. Zig-Zag Feature 1 */}
        <section className="py-24 overflow-hidden bg-background">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="flex-1 space-y-6">
                <div className="inline-flex items-center rounded-full border bg-primary/10 px-3 py-1 text-sm text-primary font-bold tracking-wider uppercase">
                  Opsi Tambahan Terpadu
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight leading-tight">
                  {data.feature1Title}
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {data.feature1Desc}
                </p>
              </div>

              <div className="flex-1 relative w-full h-[350px] md:h-[400px]">
                <div className="absolute inset-0 bg-primary/10 rounded-[3rem] transform rotate-3"></div>
                <div className="absolute inset-4 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded-[2rem] border overflow-hidden shadow-xl flex items-center justify-center relative">
                  {data.feature1Image ? (
                    <img src={data.feature1Image} alt="Feature 1" className="w-full h-full object-cover" />
                  ) : (
                    <Feature1Icon className="w-32 h-32 text-slate-300 dark:text-slate-700 opacity-50" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>
                {/* Floating Elements Mock */}
                <div className="absolute -top-6 -left-6 bg-background border p-4 rounded-2xl shadow-xl animate-[bounce_4s_infinite]">
                  <div className="text-sm font-bold text-primary mb-2">Setting Tambahan</div>
                  <div className="w-24 h-2 bg-slate-200 rounded-full mb-2"></div>
                  <div className="w-16 h-2 bg-slate-200 rounded-full"></div>
                </div>
                <div className="absolute bottom-10 -right-6 bg-background border p-4 rounded-2xl shadow-xl animate-[bounce_5s_infinite_reverse]">
                  <div className="flex items-center gap-3">
                     <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center"><CheckCircle2 className="w-4 h-4" /></div>
                     <div className="text-sm font-bold">Sinkronisasi Berhasil</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Zig-Zag Feature 2 */}
        <section className="py-24 overflow-hidden bg-muted/30 border-y">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex flex-col-reverse lg:flex-row items-center gap-16">
              
              <div className="flex-1 relative w-full h-[350px] md:h-[400px]">
                <div className="absolute inset-0 bg-amber-500/10 rounded-[3rem] transform -rotate-3"></div>
                <div className="absolute inset-4 bg-gradient-to-bl from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded-[2rem] border overflow-hidden shadow-xl flex items-center justify-center relative">
                   {data.feature2Image ? (
                     <img src={data.feature2Image} alt="Feature 2" className="w-full h-full object-cover" />
                   ) : (
                     <Feature2Icon className="w-32 h-32 text-slate-300 dark:text-slate-700 opacity-50" />
                   )}
                   <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -top-10 right-10 bg-background border p-5 rounded-2xl shadow-xl w-56 animate-[bounce_5s_infinite]">
                  <div className="text-xs text-muted-foreground mb-2">Kinerja Real-time</div>
                  <div className="w-full h-12 flex items-end gap-1">
                    {[30, 40, 25, 50, 45, 70, 85].map((h, i) => (
                      <div key={i} className="flex-1 bg-amber-100 dark:bg-amber-900/30 rounded-t-sm relative">
                        <div className="absolute bottom-0 w-full bg-amber-500 rounded-t-sm" style={{ height: `${h}%` }}></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex-1 space-y-6">
                <div className="inline-flex items-center rounded-full border bg-amber-500/10 px-3 py-1 text-sm text-amber-600 font-bold tracking-wider uppercase">
                  Efisiensi Maksimal
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight leading-tight">
                  {data.feature2Title}
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {data.feature2Desc}
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* 5. Testimonial Section */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4 max-w-5xl text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-16 tracking-tight max-w-2xl mx-auto">
              Jadilah salah satu dari pengusaha sukses yang tumbuh pesat bersama DEVELZY POS
            </h2>
            
            <div className="bg-primary text-primary-foreground rounded-[2rem] p-8 md:p-12 relative overflow-hidden text-left shadow-2xl">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Star className="w-48 h-48" />
              </div>
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-12">
                <div className="w-32 h-32 md:w-48 md:h-48 shrink-0 bg-white/20 rounded-full border-4 border-white/30 flex items-center justify-center shadow-inner backdrop-blur-sm">
                  <span className="text-4xl md:text-6xl font-black text-white">{data.testiName.charAt(0)}</span>
                </div>
                <div>
                  <div className="flex gap-1 mb-4 text-amber-300">
                    <Star className="w-5 h-5 fill-current" />
                    <Star className="w-5 h-5 fill-current" />
                    <Star className="w-5 h-5 fill-current" />
                    <Star className="w-5 h-5 fill-current" />
                    <Star className="w-5 h-5 fill-current" />
                  </div>
                  <p className="text-lg md:text-2xl font-medium italic mb-6 leading-relaxed">
                    "{data.testiQuote}"
                  </p>
                  <div>
                    <div className="font-bold text-xl">{data.testiName}</div>
                    <div className="text-primary-foreground/80">{data.testiRole}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
      </main>
      <SiteFooter />
    </div>
  );
}
