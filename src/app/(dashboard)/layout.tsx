"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Store, 
  LayoutDashboard, 
  ShoppingCart, 
  Package, 
  Users, 
  Settings, 
  LogOut,
  Menu,
  Bell,
  Plus,
  BarChart3,
  Wrench,
  UserCog,
  Server,
  Coffee,
  WashingMachine,
  Smartphone,
  Lock,
  ChevronDown
} from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAppStore } from "@/store/useStore";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, logout, updateUserPlan, updateUserBusinessType } = useAppStore();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) return null; // or a loading spinner
  const pathname = usePathname();

  const getLinkClass = (path: string) => {
    return pathname === path 
      ? "flex items-center gap-3 rounded-lg px-3 py-2.5 text-primary bg-primary/10 transition-all hover:text-primary font-medium"
      : "flex items-center gap-3 rounded-lg px-3 py-2.5 text-muted-foreground transition-all hover:text-foreground hover:bg-muted font-medium";
  };

  const getMobileLinkClass = (path: string) => {
    return pathname === path
      ? "flex flex-col items-center justify-center w-full h-full text-primary active:scale-95 transition-all"
      : "flex flex-col items-center justify-center w-full h-full text-muted-foreground hover:text-primary active:scale-95 transition-all";
  };

  const NavLinks = () => (
    <>
      <Link href="/dashboard" className={getLinkClass("/dashboard")}>
        <LayoutDashboard className="h-5 w-5" />
        <span>Dashboard</span>
      </Link>
      <Link href="/pos" className={getLinkClass("/pos")}>
        <ShoppingCart className="h-5 w-5" />
        <span>Kasir (POS)</span>
      </Link>
      {user.business_type === 'Bengkel' && (
        <>
          <div className="mt-4 mb-2 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Modul Bengkel</div>
          <Link href="/services" className={getLinkClass("/services")}>
            <Wrench className="h-5 w-5" />
            <span>Jasa Servis</span>
          </Link>
          <Link href="/products" className={getLinkClass("/products")}>
            <Package className="h-5 w-5" />
            <span>Sparepart</span>
          </Link>
        </>
      )}

      {user.business_type === 'Retail' && (
        <>
          <div className="mt-4 mb-2 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Modul Toko / Retail</div>
          <Link href="/products" className={getLinkClass("/products")}>
            <Package className="h-5 w-5" />
            <span>Katalog Produk</span>
          </Link>
        </>
      )}
      
      {user.business_type !== 'Bengkel' && user.business_type !== 'Retail' && (
        <>
          <div className="mt-4 mb-2 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Katalog Utama</div>
          <Link href="/products" className={getLinkClass("/products")}>
            <Package className="h-5 w-5" />
            <span>Produk / Menu</span>
          </Link>
          <Link href="/services" className={getLinkClass("/services")}>
            <Wrench className="h-5 w-5" />
            <span>Layanan / Jasa</span>
          </Link>
        </>
      )}

      <div className="mt-4 mb-2 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Manajemen</div>
      
      {/* Premium Only Feature */}
      {user.plan === 'Premium' || user.plan === 'Enterprise' ? (
        <Link href="/customers" className={getLinkClass("/customers")}>
          <Users className="h-5 w-5" />
          <span>Pelanggan</span>
        </Link>
      ) : (
        <div className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-muted-foreground opacity-50 cursor-not-allowed font-medium">
          <Users className="h-5 w-5" />
          <span className="flex-1">Pelanggan</span>
          <Lock className="h-4 w-4" />
        </div>
      )}

      {/* Bisnis / Premium Only Feature */}
      {user.plan !== 'Basic' ? (
        <Link href="/employees" className={getLinkClass("/employees")}>
          <UserCog className="h-5 w-5" />
          <span>Karyawan</span>
        </Link>
      ) : (
        <div className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-muted-foreground opacity-50 cursor-not-allowed font-medium">
          <UserCog className="h-5 w-5" />
          <span className="flex-1">Karyawan</span>
          <Lock className="h-4 w-4" />
        </div>
      )}

      {/* Bisnis / Premium Only Feature */}
      {user.plan !== 'Basic' ? (
        <Link href="/analytics" className={getLinkClass("/analytics")}>
          <BarChart3 className="h-5 w-5" />
          <span>Laporan</span>
        </Link>
      ) : (
        <div className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-muted-foreground opacity-50 cursor-not-allowed font-medium">
          <BarChart3 className="h-5 w-5" />
          <span className="flex-1">Laporan</span>
          <Lock className="h-4 w-4" />
        </div>
      )}

      <Link href="/settings" className={getLinkClass("/settings")}>
        <Settings className="h-5 w-5" />
        <span>Pengaturan</span>
      </Link>

      {user.role === 'superadmin' && (
        <div className="mt-4">
          <Link href="/developer" className={getLinkClass("/developer")}>
            <Server className="h-5 w-5" />
            <span>Developer Panel</span>
          </Link>
        </div>
      )}
    </>
  );

  return (
    <div className="grid h-[100dvh] w-full max-w-[100vw] overflow-hidden md:grid-cols-[260px_1fr]">
      {/* Desktop Sidebar */}
      <div className="hidden border-r bg-card/50 md:block backdrop-blur-xl">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-16 items-center border-b px-6 lg:h-[72px]">
            <Link href="/" className="flex items-center gap-2 font-bold tracking-tight">
              <div className="flex h-8 w-8 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm shadow-primary/50">
                <Store className="h-5 w-5" />
              </div>
              <span className="text-xl">DEVELZY<span className="text-primary">POS</span></span>
            </Link>
          </div>
          


          <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start px-4 text-sm gap-1">
              <NavLinks />
            </nav>
          </div>
          <div className="mt-auto p-4 border-t">
            <div className="bg-primary/5 rounded-xl p-4 text-center">
              <h4 className="text-sm font-semibold mb-1">Paket {user.plan}</h4>
              <p className="text-xs text-muted-foreground mb-3">
                {user.plan === 'Enterprise' ? 'Unlimited Access' : 'Aktif hingga 31 Des 2026'}
              </p>
              {user.plan !== 'Enterprise' && (
                <Button variant="default" size="sm" className="w-full text-xs rounded-full" onClick={() => toast.info("Silakan hubungi tim sales kami untuk Upgrade!")}>Upgrade</Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col min-w-0">
        <header className="flex h-16 items-center gap-2 md:gap-4 border-b bg-background/80 px-3 md:px-6 lg:h-[72px] backdrop-blur-xl sticky top-0 z-30">
          <div className="md:hidden flex items-center gap-1.5 font-bold tracking-tight shrink-0">
            <div className="flex h-7 w-7 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm shadow-primary/50">
              <Store className="h-4 w-4" />
            </div>
            <span className="text-lg">DEVELZY<span className="text-primary">POS</span></span>
          </div>
          
          <div className="w-full flex-1 min-w-0">
            {/* Can put search bar here */}
          </div>
          
          <div className="flex items-center gap-2 shrink-0">
            {/* Notification Bell */}
            <DropdownMenu>
              <DropdownMenuTrigger className={buttonVariants({ variant: "outline", size: "icon", className: "rounded-full relative shrink-0 h-9 w-9" })}>
                <Bell className="h-4 w-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Notifikasi Baru</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="flex flex-col max-h-[300px] overflow-y-auto">
                  <DropdownMenuItem className="p-3 cursor-pointer border-b flex flex-col items-start gap-1 h-auto" onClick={(e) => e.preventDefault()}>
                    <p className="text-sm font-medium">Pembaruan Sistem Berhasil 🚀</p>
                    <p className="text-xs text-muted-foreground whitespace-normal text-left">Versi terbaru DEVELZY POS 2.0 telah aktif dengan optimasi kecepatan.</p>
                    <p className="text-[10px] text-muted-foreground">Baru saja</p>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="p-3 cursor-pointer flex flex-col items-start gap-1 h-auto" onClick={(e) => e.preventDefault()}>
                    <p className="text-sm font-medium">Laporan Harian Tersedia 📊</p>
                    <p className="text-xs text-muted-foreground whitespace-normal text-left">Ringkasan penjualan dari seluruh cabang kemarin sudah bisa Anda lihat.</p>
                    <p className="text-[10px] text-muted-foreground">2 jam yang lalu</p>
                  </DropdownMenuItem>
                </div>
                <DropdownMenuSeparator />
                <div className="p-2">
                  <DropdownMenuItem className="w-full justify-center text-xs h-8 bg-primary/10 text-primary font-bold cursor-pointer" onClick={(e) => { e.preventDefault(); toast.success("Notifikasi telah ditandai dibaca"); }}>
                    Tandai Semua Dibaca
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Avatar Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger className={buttonVariants({ variant: "ghost", size: "icon", className: "rounded-full shrink-0 h-9 w-9" })}>
                <Avatar className="h-9 w-9 border border-border/50 hover:opacity-80 transition-opacity">
                  <AvatarImage src="https://github.com/shadcn.png" alt="User Avatar" />
                  <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <span className="sr-only">Toggle user menu</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64">
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="font-normal pb-2">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-bold leading-none">{user.name}</p>
                      <p className="text-xs font-medium leading-none text-primary mt-1">{user.role}</p>
                      <p className="text-[10px] leading-none text-muted-foreground mt-2">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer font-medium" onClick={() => router.push('/settings')}>
                  Profil Saya
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer font-medium" onClick={() => router.push('/settings')}>
                  Tagihan & Paket ({user.plan})
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer font-medium" onClick={() => router.push('/settings')}>
                  Pengaturan Toko & Outlet
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive cursor-pointer font-semibold" onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Keluar dari Akun
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-4 pb-24 md:p-6 lg:p-8 bg-muted/20">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 border-t bg-background/95 backdrop-blur-md z-40 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_-4px_20px_rgba(0,0,0,0.2)]">
        <nav className="flex justify-around items-center h-16 px-1">
          <Link href="/dashboard" className={getMobileLinkClass("/dashboard")}>
            <LayoutDashboard className="h-5 w-5 mb-1" />
            <span className="text-[10px] font-medium">Beranda</span>
          </Link>
          <Link href="/pos" className={getMobileLinkClass("/pos")}>
            <ShoppingCart className="h-5 w-5 mb-1" />
            <span className="text-[10px] font-medium">Kasir</span>
          </Link>
          <div className="relative -top-5 flex flex-col items-center justify-center">
            <Link href="/pos" className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 hover:scale-105 active:scale-95 transition-all">
              <Plus className="h-6 w-6" />
            </Link>
          </div>
          <Link href="/products" className={getMobileLinkClass("/products")}>
            <Package className="h-5 w-5 mb-1" />
            <span className="text-[10px] font-medium">Produk</span>
          </Link>
          <Link href="/settings" className={getMobileLinkClass("/settings")}>
            <Settings className="h-5 w-5 mb-1" />
            <span className="text-[10px] font-medium">Setelan</span>
          </Link>
        </nav>
      </div>
    </div>
  );
}
