"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { buttonVariants, Button } from "@/components/ui/button";
import { Store, ChevronDown, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function SiteHeader() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 z-50 w-full transition-all duration-300 ${isScrolled ? "bg-background/80 backdrop-blur-md border-b shadow-sm" : "bg-transparent"}`}>
      <div className="container mx-auto max-w-6xl flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 cursor-pointer transition-transform hover:scale-105">
          <div className="flex h-8 w-8 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm shadow-primary/50">
            <Store className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold tracking-tight">DEVELZY<span className="text-primary">POS</span></span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 bg-background/50 backdrop-blur-lg px-6 py-2 rounded-full border shadow-sm">
          <Link href="/" className={`text-sm font-medium transition-colors hover:text-primary ${pathname === "/" ? "text-primary font-bold" : "text-muted-foreground"}`}>Beranda</Link>
          <Link href="/fitur" className={`text-sm font-medium transition-colors hover:text-primary ${pathname.startsWith("/fitur") ? "text-primary font-bold" : "text-muted-foreground"}`}>Fitur</Link>
          
          <div className="relative group">
            <div className={`flex items-center gap-1 cursor-pointer text-sm font-medium transition-colors hover:text-primary ${pathname.startsWith("/solusi") ? "text-primary font-bold" : "text-muted-foreground"}`}>
              Solusi Bisnis <ChevronDown className="h-3 w-3 transition-transform duration-200 group-hover:rotate-180" />
            </div>
            
            {/* Mega Menu Dropdown */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300">
              <div className="bg-background rounded-2xl border shadow-xl p-2 w-64 flex flex-col relative overflow-hidden">
                {/* Glow Effect */}
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary via-blue-400 to-primary"></div>
                
                <Link href="/solusi/coffee-shop" className="px-4 py-3 text-sm hover:bg-muted/50 rounded-xl transition-colors text-muted-foreground hover:text-foreground hover:pl-5 flex items-center group/link">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2 opacity-0 group-hover/link:opacity-100 transition-opacity"></span> Aplikasi Kasir Coffee Shop
                </Link>
                <Link href="/solusi/retail" className="px-4 py-3 text-sm hover:bg-muted/50 rounded-xl transition-colors text-muted-foreground hover:text-foreground hover:pl-5 flex items-center group/link">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2 opacity-0 group-hover/link:opacity-100 transition-opacity"></span> Aplikasi Kasir Toko Retail
                </Link>
                <Link href="/solusi/laundry" className="px-4 py-3 text-sm hover:bg-muted/50 rounded-xl transition-colors text-muted-foreground hover:text-foreground hover:pl-5 flex items-center group/link">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2 opacity-0 group-hover/link:opacity-100 transition-opacity"></span> Aplikasi Kasir Laundry
                </Link>
                <Link href="/solusi/restoran" className="px-4 py-3 text-sm hover:bg-muted/50 rounded-xl transition-colors text-muted-foreground hover:text-foreground hover:pl-5 flex items-center group/link">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2 opacity-0 group-hover/link:opacity-100 transition-opacity"></span> Aplikasi Kasir Restoran
                </Link>
                <Link href="/solusi/barbershop" className="px-4 py-3 text-sm hover:bg-muted/50 rounded-xl transition-colors text-muted-foreground hover:text-foreground hover:pl-5 flex items-center group/link">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2 opacity-0 group-hover/link:opacity-100 transition-opacity"></span> Aplikasi Kasir Barbershop
                </Link>
                <Link href="/solusi/bengkel" className="px-4 py-3 text-sm hover:bg-muted/50 rounded-xl transition-colors text-muted-foreground hover:text-foreground hover:pl-5 flex items-center group/link">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2 opacity-0 group-hover/link:opacity-100 transition-opacity"></span> Aplikasi Kasir Bengkel
                </Link>
              </div>
            </div>
          </div>

          <Link href="/harga" className={`text-sm font-medium transition-colors hover:text-primary ${pathname.startsWith("/harga") ? "text-primary font-bold" : "text-muted-foreground"}`}>Harga</Link>
        </nav>
        <div className="flex items-center gap-2 sm:gap-4">
          <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground hidden sm:block">
            Masuk
          </Link>
          <Link href="/register" className={buttonVariants({ className: "rounded-full shadow-md shadow-primary/20 hidden sm:flex" })}>
            Coba Gratis
          </Link>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger className={`${buttonVariants({ variant: "ghost", size: "icon" })} md:hidden`}>
                <Menu className="h-6 w-6" />
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] flex flex-col gap-6 pt-12 overflow-y-auto">
                <Link href="/" className="text-lg font-bold hover:text-primary">Beranda</Link>
                <Link href="/#fitur" className="text-lg font-bold hover:text-primary">Fitur</Link>
                <Link href="/#harga" className="text-lg font-bold hover:text-primary">Harga</Link>
                
                <div className="flex flex-col gap-3 pt-4 border-t">
                  <span className="text-sm text-muted-foreground font-semibold uppercase tracking-wider">Solusi Bisnis</span>
                  <Link href="/solusi/retail" className="text-base font-medium hover:text-primary">Toko Retail</Link>
                  <Link href="/solusi/bengkel" className="text-base font-medium hover:text-primary">Bengkel</Link>
                  <Link href="/solusi/coffee-shop" className="text-base font-medium hover:text-primary">Coffee Shop</Link>
                  <Link href="/solusi/laundry" className="text-base font-medium hover:text-primary">Laundry</Link>
                  <Link href="/solusi/restoran" className="text-base font-medium hover:text-primary">Restoran</Link>
                  <Link href="/solusi/barbershop" className="text-base font-medium hover:text-primary">Barbershop</Link>
                </div>
                
                <div className="flex flex-col gap-3 pt-6 border-t mt-auto mb-4">
                  <Link href="/login" className={buttonVariants({ variant: "outline", className: "w-full h-12" })}>Masuk ke Akun</Link>
                  <Link href="/register" className={buttonVariants({ className: "w-full h-12" })}>Coba Gratis Sekarang</Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
