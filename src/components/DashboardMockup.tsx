"use client";

import { useState } from "react";
import { BarChart3, LayoutDashboard, Package, Search, ShoppingCart, Store, Users, DollarSign, Activity, CheckCircle2 } from "lucide-react";

export function DashboardMockup() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div id="solusi" className="relative w-full max-w-4xl lg:max-w-5xl mx-auto h-[450px] md:h-[550px] lg:h-[600px] mt-20 perspective-1000 scroll-mt-24">
      
      {/* 1. Main Dashboard UI (Backdrop) */}
      <div className="absolute inset-0 bg-white dark:bg-slate-900 rounded-2xl md:rounded-[2rem] shadow-2xl border flex overflow-hidden z-10 transform transition-transform duration-500 hover:scale-[1.02]">
        {/* Sidebar */}
        <div className="w-16 md:w-64 bg-slate-950 flex flex-col pt-6 md:pt-8 pb-4 shrink-0 transition-all duration-300">
          <div className="flex items-center gap-3 px-4 md:px-6 mb-6 md:mb-10 text-white">
            <div className="bg-blue-600 p-1.5 md:p-2 rounded-lg"><Store className="h-4 w-4 md:h-5 md:w-5" /></div>
            <span className="font-bold text-lg hidden md:block tracking-tight">DEVELZY<span className="text-blue-500">POS</span></span>
          </div>
          
          <div className="flex flex-col gap-1 p-2 md:p-4 mt-2">
            {[
              { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
              { id: "transaksi", icon: ShoppingCart, label: "Transaksi" },
              { id: "produk", icon: Package, label: "Produk" },
              { id: "pelanggan", icon: Users, label: "Pelanggan" },
              { id: "laporan", icon: BarChart3, label: "Laporan" },
            ].map((tab) => (
              <div 
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`p-2.5 rounded-lg flex items-center justify-center md:justify-start gap-3 transition-colors cursor-pointer ${
                  activeTab === tab.id 
                    ? "bg-blue-600 text-white shadow-md shadow-blue-900/20" 
                    : "hover:bg-white/10 text-slate-400"
                }`}
              >
                <tab.icon className="h-5 w-5 shrink-0"/> 
                <span className="hidden md:block text-sm font-medium">{tab.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 bg-slate-50 dark:bg-slate-950 p-4 md:p-6 flex flex-col gap-4 md:gap-6 overflow-hidden">
          <div className="flex justify-between items-center pb-2 md:pb-4 border-b border-border/50">
            <h3 className="font-bold text-lg md:text-xl text-foreground capitalize">
              {activeTab === 'dashboard' ? 'Dashboard Overview' : `Manajemen ${activeTab}`}
            </h3>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 border-2 border-white dark:border-slate-700 shadow-sm"></div>
            </div>
          </div>
          
          {/* Dynamic Content based on Active Tab */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col gap-4">
            
            {activeTab === "dashboard" && (
              <>
                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                  <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-4 text-white shadow-lg shadow-blue-600/20 relative overflow-hidden group">
                    <div className="absolute right-0 top-0 opacity-10 group-hover:scale-150 transition-transform duration-700">
                      <BarChart3 className="w-24 h-24 -mt-4 -mr-4" />
                    </div>
                    <p className="text-blue-100 text-xs font-medium mb-1 relative z-10">Total Penjualan</p>
                    <h4 className="font-bold text-lg md:text-xl lg:text-2xl whitespace-nowrap tracking-tight relative z-10">Rp 12.850.000</h4>
                  </div>
                  <div className="bg-card rounded-xl p-4 border shadow-sm flex flex-col justify-center">
                    <p className="text-muted-foreground text-xs font-medium mb-1">Total Transaksi</p>
                    <div className="flex items-end gap-2">
                      <h4 className="font-bold text-lg md:text-xl lg:text-2xl text-foreground">256</h4>
                      <span className="text-emerald-500 text-[10px] md:text-xs font-bold pb-1 flex items-center">▲ 12.5%</span>
                    </div>
                  </div>
                  <div className="bg-card rounded-xl p-4 border shadow-sm flex flex-col justify-center hidden md:flex">
                    <p className="text-muted-foreground text-xs font-medium mb-1">Produk Terjual</p>
                    <div className="flex items-end gap-2">
                      <h4 className="font-bold text-xl lg:text-2xl text-foreground">320</h4>
                      <span className="text-emerald-500 text-xs font-bold pb-1 flex items-center">▲ 8.3%</span>
                    </div>
                  </div>
                </div>
                {/* Chart Area */}
                <div className="bg-card rounded-xl border shadow-sm flex-1 min-h-[100px] flex flex-col relative overflow-hidden">
                  <div className="px-4 py-3 border-b bg-muted/20">
                    <h4 className="text-sm font-semibold text-foreground">Grafik Penjualan 7 Hari</h4>
                  </div>
                  {/* SVG Line Chart Representation */}
                  <div className="flex-1 relative animate-in fade-in zoom-in duration-500">
                    <svg viewBox="0 0 100 30" preserveAspectRatio="none" className="w-full h-full stroke-blue-500 fill-blue-500/10 opacity-80">
                      <path d="M0,25 L10,20 L20,22 L30,12 L40,15 L50,8 L60,18 L70,12 L80,5 L90,10 L100,2 L100,30 L0,30 Z" strokeWidth="0" />
                      <path d="M0,25 L10,20 L20,22 L30,12 L40,15 L50,8 L60,18 L70,12 L80,5 L90,10 L100,2" fill="none" strokeWidth="0.8" className="drop-shadow-md" />
                      <circle cx="30" cy="12" r="1.5" className="fill-white stroke-blue-500 stroke-[0.5]" />
                      <circle cx="80" cy="5" r="1.5" className="fill-white stroke-blue-500 stroke-[0.5]" />
                    </svg>
                    {/* Tooltip Mock */}
                    <div className="absolute top-1/4 right-[15%] bg-slate-800 text-white text-[9px] px-2 py-1 rounded shadow-lg hidden md:block">
                      <div className="font-bold">16 Mei</div>
                      <div>Rp 2.450.000</div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeTab === "transaksi" && (
              <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="flex items-center justify-between p-3 border rounded-xl bg-card hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 flex items-center justify-center">
                        <Activity className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-semibold text-sm">INV-202405{i}0</div>
                        <div className="text-xs text-muted-foreground">Hari ini, 14:{30 + i} WIB</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-sm text-foreground">Rp {(125000 + i * 55000).toLocaleString('id-ID')}</div>
                      <div className="text-[10px] text-emerald-500 font-medium bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded-full inline-block mt-1">Lunas</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "produk" && (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="bg-card p-3 rounded-xl border flex flex-col gap-2">
                    <div className="h-24 bg-slate-100 dark:bg-slate-800 rounded-lg w-full flex items-center justify-center">
                      <Package className="w-8 h-8 text-slate-300 dark:text-slate-600" />
                    </div>
                    <div className="font-semibold text-sm truncate">Produk Item {i}</div>
                    <div className="text-xs text-muted-foreground flex justify-between">
                      <span>Stok: {100 - i * 10}</span>
                      <span className="font-bold text-blue-600 dark:text-blue-400">Rp {(25000 * i).toLocaleString('id-ID')}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "pelanggan" && (
               <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
                 {[1, 2, 3].map(i => (
                   <div key={i} className="flex items-center justify-between p-3 border rounded-xl bg-card">
                     <div className="flex items-center gap-3">
                       <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center font-bold text-slate-500">
                         P{i}
                       </div>
                       <div>
                         <div className="font-semibold text-sm">Pelanggan Setia {i}</div>
                         <div className="text-xs text-muted-foreground">0812-3456-789{i}</div>
                       </div>
                     </div>
                     <div className="text-right">
                       <div className="text-xs text-muted-foreground">Total Belanja</div>
                       <div className="font-bold text-sm text-foreground">Rp {(1250000 * i).toLocaleString('id-ID')}</div>
                     </div>
                   </div>
                 ))}
               </div>
            )}

            {activeTab === "laporan" && (
              <div className="flex items-center justify-center h-full animate-in fade-in zoom-in duration-500">
                <div className="text-center">
                  <BarChart3 className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                  <p className="text-muted-foreground">Pilih rentang tanggal untuk melihat laporan lengkap.</p>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* 2. Tablet POS UI (Floating Bottom Left) */}
      <div className="absolute -bottom-4 md:-bottom-10 -left-2 md:-left-8 w-[250px] md:w-[350px] h-[180px] md:h-[240px] bg-white dark:bg-slate-900 rounded-xl md:rounded-[1.5rem] border-[4px] border-slate-200 dark:border-slate-700 shadow-2xl z-20 overflow-hidden flex hidden sm:flex rotate-[2deg] hover:rotate-0 transition-transform duration-500 hover:z-40">
        <div className="w-12 md:w-16 bg-slate-50 dark:bg-slate-950 flex flex-col items-center py-3 md:py-4 gap-3 border-r">
          <div className="h-6 w-6 md:h-8 md:w-8 bg-blue-600 text-white rounded-lg flex items-center justify-center shadow-md mb-2"><Store className="h-3 w-3 md:h-4 md:w-4" /></div>
          <div className="h-8 w-8 bg-blue-100 dark:bg-blue-900/50 text-blue-600 rounded-full flex items-center justify-center"><Package className="h-4 w-4" /></div>
          <div className="h-8 w-8 text-slate-400 flex items-center justify-center"><ShoppingCart className="h-4 w-4" /></div>
        </div>
        <div className="flex-1 p-2 md:p-3 bg-slate-100/50 dark:bg-slate-900 flex flex-col gap-2 overflow-hidden">
          <div className="h-6 md:h-8 bg-white dark:bg-slate-800 rounded-full border flex items-center px-3 mb-1 shadow-sm">
            <Search className="h-3 w-3 text-slate-400 mr-2" /> <div className="h-1.5 w-20 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 flex-1">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="bg-white dark:bg-slate-800 p-1.5 md:p-2 rounded-lg border shadow-sm flex flex-col">
                <div className="h-10 md:h-14 bg-slate-100 dark:bg-slate-700 rounded mb-1.5 md:mb-2 w-full flex items-center justify-center">
                   <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-slate-200 dark:bg-slate-600 opacity-50"></div>
                </div>
                <div className="h-1.5 md:h-2 w-3/4 bg-slate-200 dark:bg-slate-600 rounded mb-1"></div>
                <div className="h-1.5 md:h-2 w-1/2 bg-blue-200 dark:bg-blue-900/50 rounded mt-auto"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Mobile QRIS Payment UI (Floating Bottom Right) */}
      <div className="absolute -bottom-8 md:-bottom-12 right-0 md:-right-8 w-[160px] md:w-[220px] h-[320px] md:h-[450px] bg-slate-950 rounded-[1.5rem] md:rounded-[2.5rem] border-[6px] md:border-[8px] border-slate-800 shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-30 overflow-hidden flex flex-col rotate-[-4deg] hover:rotate-0 transition-transform duration-500 hover:z-40">
        <div className="h-5 w-full bg-slate-950 flex justify-center items-center rounded-t-xl pt-1">
          <div className="w-12 h-1.5 bg-slate-800 rounded-full"></div>
        </div>
        <div className="bg-blue-600 text-white p-4 pb-8 flex flex-col items-center justify-center text-center relative">
          <div className="text-[10px] md:text-xs font-medium opacity-90 mb-1">Menunggu Pembayaran</div>
          <div className="text-lg md:text-2xl font-bold tracking-tight whitespace-nowrap">Rp 125.000</div>
          <div className="absolute -bottom-3 w-full flex justify-center">
            <div className="bg-amber-400 text-slate-900 text-[8px] md:text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">QRIS DYNAMIC</div>
          </div>
        </div>
        <div className="flex-1 bg-white p-4 flex flex-col items-center gap-3 md:gap-5 justify-center relative">
          <div className="font-bold text-[10px] md:text-xs text-slate-500 mb-1">SCAN UNTUK BAYAR</div>
          <div className="w-24 h-24 md:w-32 md:h-32 bg-white border-2 border-dashed border-slate-300 p-2 rounded-xl flex items-center justify-center">
            <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=DEVELZY_POS_DEMO" alt="QRIS Demo" className="w-full h-full object-contain" />
          </div>
          <div className="text-[8px] md:text-[10px] text-slate-400 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-500" /> Transaksi Terlindungi
          </div>
        </div>
        <div className="h-10 bg-slate-50 border-t flex justify-around items-center px-4">
           <div className="w-8 h-1 bg-slate-300 rounded-full"></div>
        </div>
      </div>

    </div>
  );
}
