import Link from "next/link";
import { Store, MapPin, Phone, Mail, ChevronRight } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="bg-slate-50 dark:bg-slate-900 border-t pt-16 pb-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Column 1: Brand & Address */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm shadow-primary/50">
                <Store className="h-6 w-6" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-foreground">DEVELZY<span className="text-primary">POS</span></span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Aplikasi Kasir Permanen, Usaha Makin Paten. Solusi pintar berbasis cloud untuk mengelola dan membesarkan bisnis Anda.
            </p>
            <div className="flex items-start gap-3 text-sm text-muted-foreground">
              <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <span>Jl. Kalisalak - Margasari, Kalisalak, Kec. Margasari, Kabupaten Tegal, Jawa Tengah 52463</span>
            </div>
          </div>

          {/* Column 2: Solusi Bisnis */}
          <div>
            <h4 className="font-bold text-foreground mb-6">Solusi Bisnis</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/solusi/retail" className="hover:text-primary transition-colors flex items-center gap-2"><ChevronRight className="w-3 h-3" /> Toko Retail</Link></li>
              <li><Link href="/solusi/bengkel" className="hover:text-primary transition-colors flex items-center gap-2"><ChevronRight className="w-3 h-3" /> Bengkel Motor/Mobil</Link></li>
              <li><Link href="/solusi/coffee-shop" className="hover:text-primary transition-colors flex items-center gap-2"><ChevronRight className="w-3 h-3" /> Coffee Shop / Cafe</Link></li>
              <li><Link href="/solusi/laundry" className="hover:text-primary transition-colors flex items-center gap-2"><ChevronRight className="w-3 h-3" /> Laundry</Link></li>
              <li><Link href="/solusi/barbershop" className="hover:text-primary transition-colors flex items-center gap-2"><ChevronRight className="w-3 h-3" /> Barbershop / Salon</Link></li>
            </ul>
          </div>

          {/* Column 3: Tautan Cepat */}
          <div>
            <h4 className="font-bold text-foreground mb-6">Tautan Cepat</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/" className="hover:text-primary transition-colors flex items-center gap-2"><ChevronRight className="w-3 h-3" /> Beranda</Link></li>
              <li><Link href="/#fitur" className="hover:text-primary transition-colors flex items-center gap-2"><ChevronRight className="w-3 h-3" /> Fitur Unggulan</Link></li>
              <li><Link href="/#harga" className="hover:text-primary transition-colors flex items-center gap-2"><ChevronRight className="w-3 h-3" /> Harga & Paket</Link></li>
              <li><Link href="/login" className="hover:text-primary transition-colors flex items-center gap-2"><ChevronRight className="w-3 h-3" /> Login Kasir</Link></li>
              <li><Link href="/register" className="hover:text-primary transition-colors flex items-center gap-2"><ChevronRight className="w-3 h-3" /> Daftar Gratis</Link></li>
            </ul>
          </div>

          {/* Column 4: Kontak */}
          <div>
            <h4 className="font-bold text-foreground mb-6">Hubungi Kami</h4>
            <div className="space-y-4">
              <a href="https://wa.me/6285879584257" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-xl bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/50 transition-colors">
                <Phone className="w-5 h-5" />
                <div className="text-sm">
                  <div className="font-bold">WhatsApp Sales</div>
                  <div>0858-7958-4257</div>
                </div>
              </a>
              <a href="mailto:halo@develzy.com" className="flex items-center gap-3 p-3 rounded-xl bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors">
                <Mail className="w-5 h-5" />
                <div className="text-sm">
                  <div className="font-bold">Email Support</div>
                  <div>halo@develzy.com</div>
                </div>
              </a>
            </div>
          </div>
          
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div>
            &copy; {new Date().getFullYear()} DEVELZY POS. Seluruh hak cipta dilindungi.
          </div>
          <div className="flex items-center gap-6">
            <Link href="#" className="hover:text-primary transition-colors">Syarat & Ketentuan</Link>
            <Link href="#" className="hover:text-primary transition-colors">Kebijakan Privasi</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
