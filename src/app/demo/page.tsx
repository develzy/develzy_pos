"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Store, LayoutDashboard, ShoppingCart, Package, Users, BarChart3, Settings, 
  ArrowLeft, Bell, Search, Activity, CheckCircle2, TrendingUp, CreditCard 
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DemoPage() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="flex h-screen w-full bg-slate-50 dark:bg-slate-950 overflow-hidden text-foreground">
      
      {/* Sidebar */}
      <div className="hidden md:flex w-64 bg-card border-r flex-col z-20">
        <div className="h-16 flex items-center px-6 border-b">
          <Link href="/" className="flex items-center gap-2 font-bold tracking-tight text-xl transition-transform hover:scale-105 hover:text-primary cursor-pointer">
            <div className="bg-primary text-primary-foreground p-1.5 rounded-lg shadow-sm">
              <Store className="h-5 w-5" />
            </div>
            DEVELZY<span className="text-primary">POS</span>
          </Link>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4 px-3 flex flex-col gap-1">
          <div className="px-3 text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Menu Demo</div>
          
          {[
            { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
            { id: "pos", icon: ShoppingCart, label: "Kasir (POS)" },
            { id: "products", icon: Package, label: "Katalog Produk" },
            { id: "customers", icon: Users, label: "Pelanggan" },
            { id: "analytics", icon: BarChart3, label: "Laporan AI" },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left w-full ${
                activeTab === tab.id 
                  ? "bg-primary text-primary-foreground shadow-md" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <tab.icon className="h-5 w-5" />
              {tab.label}
            </button>
          ))}
          
          <div className="mt-8 px-3 text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Sistem</div>
          <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground text-left w-full">
            <Settings className="h-5 w-5" />
            Pengaturan (Demo)
          </button>
        </div>
        
        <div className="p-4 border-t">
          <Link href="/register">
            <Button className="w-full shadow-lg font-semibold animate-pulse">
              Daftar Sekarang
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        
        {/* Header */}
        <header className="h-16 bg-card/80 backdrop-blur-md border-b flex items-center justify-between px-4 md:px-6 z-10">
          <div className="flex items-center gap-4">
            <Link href="/" className="md:hidden flex items-center gap-2">
               <Store className="h-6 w-6 text-primary" />
            </Link>
            <div className="hidden md:flex relative w-64 lg:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input type="text" placeholder="Cari transaksi, menu, pelanggan..." className="w-full h-10 pl-9 pr-4 rounded-full bg-muted/50 border-none focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm" />
            </div>
          </div>
          
          <div className="flex items-center gap-3 md:gap-4">
            <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-primary hidden sm:flex items-center gap-1 mr-4">
              <ArrowLeft className="h-4 w-4" /> Keluar Demo
            </Link>
            <button className="relative p-2 text-muted-foreground hover:bg-muted rounded-full">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-card"></span>
            </button>
            <div className="h-9 w-9 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-sm border-2 border-primary/20">
              DM
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 relative">
          
          {/* Dashboard View */}
          {activeTab === "dashboard" && (
            <div className="max-w-6xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight">Selamat Datang di Tampilan Demo! 👋</h1>
                  <p className="text-muted-foreground">Ini adalah contoh tampilan dashboard interaktif DEVELZY POS.</p>
                </div>
                <Link href="/register">
                  <Button variant="default" className="shadow-lg">Gunakan Sistem Asli</Button>
                </Link>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: "Omset Hari Ini", value: "Rp 4.250.000", icon: TrendingUp, color: "text-blue-500", bg: "bg-blue-500/10", trend: "+12.5%" },
                  { label: "Total Transaksi", value: "128", icon: Activity, color: "text-emerald-500", bg: "bg-emerald-500/10", trend: "+5.2%" },
                  { label: "Menu Terjual", value: "342", icon: Package, color: "text-amber-500", bg: "bg-amber-500/10", trend: "+18.1%" },
                  { label: "Pelanggan Baru", value: "24", icon: Users, color: "text-purple-500", bg: "bg-purple-500/10", trend: "+2.4%" },
                ].map((stat, i) => (
                  <div key={i} className="bg-card p-5 rounded-2xl border shadow-sm flex flex-col hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`p-2.5 rounded-xl ${stat.bg} ${stat.color}`}>
                        <stat.icon className="h-5 w-5" />
                      </div>
                      <span className="text-sm font-medium text-muted-foreground">{stat.label}</span>
                    </div>
                    <div className="flex items-end justify-between">
                      <h3 className="text-2xl font-bold">{stat.value}</h3>
                      <span className="text-emerald-500 text-xs font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full">{stat.trend}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Chart & Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-card rounded-2xl border shadow-sm p-6 flex flex-col min-h-[350px]">
                  <h3 className="font-bold text-lg mb-6">Grafik Penjualan (Contoh)</h3>
                  <div className="flex-1 w-full flex items-end gap-2 pb-4">
                    {/* Dummy Bar Chart */}
                    {[40, 60, 45, 80, 55, 90, 75].map((height, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                        <div className="w-full bg-primary/10 rounded-t-md relative h-full flex items-end group-hover:bg-primary/20 transition-colors">
                          <div className="w-full bg-primary rounded-t-md" style={{ height: `${height}%` }}></div>
                        </div>
                        <span className="text-xs text-muted-foreground font-medium">Hari {i+1}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-card rounded-2xl border shadow-sm p-6 flex flex-col">
                  <h3 className="font-bold text-lg mb-6">Aktivitas Terakhir</h3>
                  <div className="flex flex-col gap-4 flex-1 overflow-y-auto">
                    {[1, 2, 3, 4, 5].map(i => (
                      <div key={i} className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center shrink-0">
                          <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold truncate">Transaksi INV-00{i}</p>
                          <p className="text-xs text-muted-foreground">Selesai • 12:4{i} WIB</p>
                        </div>
                        <div className="text-sm font-bold">
                          Rp {(75000 + i * 15000).toLocaleString('id-ID')}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* POS View Demo */}
          {activeTab === "pos" && (
            <div className="h-full flex flex-col items-center justify-center text-center max-w-lg mx-auto space-y-6 animate-in zoom-in-95 duration-500">
              <div className="h-24 w-24 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-2">
                <ShoppingCart className="h-12 w-12" />
              </div>
              <h2 className="text-2xl font-bold">Modul Kasir (POS)</h2>
              <p className="text-muted-foreground leading-relaxed">
                Modul kasir dilengkapi dengan fitur hitung otomatis, scan barcode, cetak struk thermal, dan QRIS dinamis.
              </p>
              <Link href="/register">
                <Button size="lg" className="rounded-full px-8 shadow-lg">Daftar untuk Mencoba Modul POS</Button>
              </Link>
            </div>
          )}

          {/* Fallback View for other tabs */}
          {activeTab !== "dashboard" && activeTab !== "pos" && (
            <div className="h-full flex flex-col items-center justify-center text-center max-w-lg mx-auto space-y-6 animate-in zoom-in-95 duration-500 opacity-70">
              <div className="h-24 w-24 bg-muted text-muted-foreground rounded-full flex items-center justify-center mx-auto mb-2">
                <LockIcon tab={activeTab} />
              </div>
              <h2 className="text-2xl font-bold capitalize">Modul {activeTab}</h2>
              <p className="text-muted-foreground leading-relaxed">
                Tampilan interaktif untuk modul ini tersedia setelah Anda mendaftar. Kelola bisnis dengan lebih mudah menggunakan DEVELZY POS.
              </p>
            </div>
          )}

        </main>
      </div>

      {/* Mobile Bottom Bar for Demo */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t flex justify-around p-2 z-20 pb-safe">
        {[
          { id: "dashboard", icon: LayoutDashboard },
          { id: "pos", icon: ShoppingCart },
          { id: "products", icon: Package },
          { id: "analytics", icon: BarChart3 },
        ].map(tab => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`p-3 rounded-xl flex flex-col items-center gap-1 ${activeTab === tab.id ? 'text-primary' : 'text-muted-foreground'}`}
          >
            <tab.icon className="h-6 w-6" />
          </button>
        ))}
      </div>
    </div>
  );
}

function LockIcon({ tab }: { tab: string }) {
  if (tab === 'products') return <Package className="h-10 w-10" />;
  if (tab === 'customers') return <Users className="h-10 w-10" />;
  if (tab === 'analytics') return <BarChart3 className="h-10 w-10" />;
  return <Store className="h-10 w-10" />;
}
