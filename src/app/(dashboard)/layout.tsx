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
          
          {/* DEMO PLAN SWITCHER */}
          <div className="px-4 pt-4 pb-2 border-b border-dashed mx-2 mb-2">
            <p className="text-[10px] font-bold text-primary uppercase mb-2 tracking-wider flex items-center justify-between">
              <span>Demo Plan Mode</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </p>
            <div className="flex bg-muted rounded-lg p-1 text-[10px] font-medium border">
              <button 
                onClick={() => updateUserPlan('Basic')}
                className={`flex-1 py-1.5 text-center rounded-md transition-all ${user.plan === 'Basic' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
              >
                BASIC
              </button>
              <button 
                onClick={() => updateUserPlan('Bisnis')}
                className={`flex-1 py-1.5 text-center rounded-md transition-all ${user.plan === 'Bisnis' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
              >
                BISNIS
              </button>
              <button 
                onClick={() => updateUserPlan('Premium')}
                className={`flex-1 py-1.5 text-center rounded-md transition-all ${user.plan === 'Premium' || user.plan === 'Enterprise' ? 'bg-background shadow-sm text-primary font-bold' : 'text-muted-foreground hover:text-foreground'}`}
              >
                PREMIUM
              </button>
            </div>
          </div>

          {/* DEMO BUSINESS SWITCHER */}
          <div className="px-4 pb-4 border-b border-dashed mx-2 mb-2">
            <p className="text-[10px] font-bold text-primary uppercase mb-2 tracking-wider flex items-center justify-between">
              <span>Demo Business Type</span>
            </p>
            <div className="grid grid-cols-2 gap-1 bg-muted rounded-lg p-1 text-[10px] font-medium border">
              <button 
                onClick={() => updateUserBusinessType('Retail')}
                className={`py-1.5 text-center rounded-md transition-all ${user.business_type === 'Retail' ? 'bg-background shadow-sm text-primary font-bold' : 'text-muted-foreground hover:text-foreground'}`}
              >
                Retail
              </button>
              <button 
                onClick={() => updateUserBusinessType('Bengkel')}
                className={`py-1.5 text-center rounded-md transition-all ${user.business_type === 'Bengkel' ? 'bg-background shadow-sm text-primary font-bold' : 'text-muted-foreground hover:text-foreground'}`}
              >
                Bengkel
              </button>
              <button 
                onClick={() => updateUserBusinessType('Cafe')}
                className={`py-1.5 text-center rounded-md transition-all ${user.business_type === 'Cafe' ? 'bg-background shadow-sm text-primary font-bold' : 'text-muted-foreground hover:text-foreground'}`}
              >
                Cafe
              </button>
              <button 
                onClick={() => updateUserBusinessType('Laundry')}
                className={`py-1.5 text-center rounded-md transition-all ${user.business_type === 'Laundry' ? 'bg-background shadow-sm text-primary font-bold' : 'text-muted-foreground hover:text-foreground'}`}
              >
                Laundry
              </button>
            </div>
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
            <Button variant="outline" size="icon" className="rounded-full relative shrink-0 h-9 w-9">
              <Bell className="h-4 w-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger className={buttonVariants({ variant: "ghost", size: "icon", className: "rounded-full shrink-0 h-9 w-9" })}>
                <Avatar className="h-9 w-9 border border-border/50">
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                <span className="sr-only">Toggle user menu</span>
              </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuGroup>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profil ({user.role})</DropdownMenuItem>
              <DropdownMenuItem>Billing ({user.plan})</DropdownMenuItem>
              <DropdownMenuItem>Pengaturan Toko</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive" onClick={logout}>
                <LogOut className="mr-2 h-4 w-4" />
                Keluar
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
