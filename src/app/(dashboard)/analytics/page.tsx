"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, CalendarDays, TrendingUp, DollarSign, ShoppingCart, Users, Package } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useState, useEffect } from "react";

// Dummy Data
const monthlyData = [
  { name: "Jan", penjualan: 12000000, profit: 4500000 },
  { name: "Feb", penjualan: 15000000, profit: 5200000 },
  { name: "Mar", penjualan: 11000000, profit: 3800000 },
  { name: "Apr", penjualan: 18000000, profit: 7100000 },
  { name: "Mei", penjualan: 24000000, profit: 9500000 },
  { name: "Jun", penjualan: 22000000, profit: 8900000 },
];

const categoryData = [
  { name: "Minuman", terjual: 450 },
  { name: "Makanan", terjual: 320 },
  { name: "Snack", terjual: 210 },
  { name: "Lainnya", terjual: 85 },
];

export default function AnalyticsPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleExport = (type: string) => {
    toast.success(`Laporan sedang diexport ke format ${type}...`, {
      description: "File akan terunduh otomatis dalam beberapa saat."
    });
  };

  if (!isMounted) return null; // Prevent hydration mismatch with recharts

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Analitik & Laporan</h2>
          <p className="text-muted-foreground">Pantau performa penjualan dan kesehatan bisnis Anda.</p>
        </div>
        
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button variant="outline" className="w-full sm:w-auto shadow-sm" onClick={() => handleExport("PDF")}>
            <Download className="mr-2 h-4 w-4" /> PDF
          </Button>
          <Button className="w-full sm:w-auto shadow-lg shadow-primary/20" onClick={() => handleExport("Excel")}>
            <Download className="mr-2 h-4 w-4" /> Excel (.xlsx)
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border/50 shadow-sm relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Pendapatan</CardTitle>
            <div className="p-2 bg-emerald-100 dark:bg-emerald-500/20 rounded-lg">
              <DollarSign className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rp 102.000.000</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center">
              <span className="text-emerald-500 font-medium flex items-center mr-1">
                <TrendingUp className="h-3 w-3 mr-1" /> +14.5%
              </span>
              vs bulan lalu
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/50 shadow-sm relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Transaksi</CardTitle>
            <div className="p-2 bg-blue-100 dark:bg-blue-500/20 rounded-lg">
              <ShoppingCart className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,245</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center">
              <span className="text-emerald-500 font-medium flex items-center mr-1">
                <TrendingUp className="h-3 w-3 mr-1" /> +8.2%
              </span>
              vs bulan lalu
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/50 shadow-sm relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pelanggan Aktif</CardTitle>
            <div className="p-2 bg-purple-100 dark:bg-purple-500/20 rounded-lg">
              <Users className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">854</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center">
              <span className="text-emerald-500 font-medium flex items-center mr-1">
                <TrendingUp className="h-3 w-3 mr-1" /> +12.1%
              </span>
              vs bulan lalu
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/50 shadow-sm relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Produk Terjual</CardTitle>
            <div className="p-2 bg-amber-100 dark:bg-amber-500/20 rounded-lg">
              <Package className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3,842</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center">
              <span className="text-emerald-500 font-medium flex items-center mr-1">
                <TrendingUp className="h-3 w-3 mr-1" /> +18.4%
              </span>
              vs bulan lalu
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-7 lg:grid-cols-8">
        {/* Main Chart */}
        <Card className="col-span-full lg:col-span-5 border-border/50 shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Tren Pendapatan & Profit</CardTitle>
                <CardDescription>Grafik pertumbuhan penjualan 6 bulan terakhir.</CardDescription>
              </div>
              <Badge variant="secondary" className="hidden sm:flex items-center">
                <CalendarDays className="mr-1 h-3 w-3" /> Semester 1 2026
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorPenjualan" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#88888833" />
                  <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis 
                    stroke="#888888" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                    tickFormatter={(value) => `Rp ${(value / 1000000)}M`}
                  />
                  <Tooltip 
                    formatter={(value: any) => [`Rp ${value.toLocaleString('id-ID')}`, '']}
                    contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                  <Area type="monotone" name="Total Penjualan" dataKey="penjualan" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorPenjualan)" />
                  <Area type="monotone" name="Net Profit" dataKey="profit" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorProfit)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Categories Chart */}
        <Card className="col-span-full lg:col-span-3 border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle>Penjualan Kategori</CardTitle>
            <CardDescription>Komposisi produk terjual per kategori.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryData} layout="vertical" margin={{ top: 0, right: 30, left: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#88888833" />
                  <XAxis type="number" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis dataKey="name" type="category" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    cursor={{fill: 'transparent'}}
                    formatter={(value: any) => [`${value} Item`, 'Terjual']}
                    contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="terjual" fill="#6366f1" radius={[0, 4, 4, 0]} barSize={30} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
