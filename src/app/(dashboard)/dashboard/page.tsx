"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Users, ShoppingBag, ArrowUpRight, ArrowDownRight, CreditCard, Activity } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Link from "next/link";
import { useAppStore } from "@/store/useStore";

export default function DashboardPage() {
  const { transactions, customers } = useAppStore();

  const totalPenjualan = transactions.reduce((sum, trx) => sum + trx.total, 0);
  const totalTransaksi = transactions.length;
  const totalPelanggan = customers.length;
  const keuntungan = totalPenjualan * 0.3; // Simulasi keuntungan 30% dari penjualan

  const formatRupiah = (angka: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(angka);
  };

  const latestTransactions = transactions.slice(0, 5);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard Overview</h2>
          <p className="text-muted-foreground">Pantau performa bisnis Anda secara real-time.</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={() => toast.info("Fitur Unduh Laporan akan segera hadir!")}>Unduh Laporan</Button>
          <Link href="/pos">
            <Button>Buka Kasir (POS)</Button>
          </Link>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          { title: "Total Penjualan", value: formatRupiah(totalPenjualan), change: "0%", trend: "up", icon: DollarSign },
          { title: "Transaksi", value: totalTransaksi.toString(), change: "0%", trend: "up", icon: ShoppingBag },
          { title: "Pelanggan Baru", value: totalPelanggan.toString(), change: "0%", trend: "up", icon: Users },
          { title: "Keuntungan", value: formatRupiah(keuntungan), change: "0%", trend: "up", icon: Activity },
        ].map((stat, i) => (
          <Card key={i} className="border-border/50 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                <stat.icon className="h-5 w-5 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1 flex items-center">
                <span className={`flex items-center mr-1 font-medium ${stat.trend === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}>
                  {stat.trend === 'up' ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
                  {stat.change}
                </span>
                dari bulan lalu
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle>Grafik Pendapatan</CardTitle>
            <CardDescription>Pendapatan bulan ini vs bulan lalu</CardDescription>
          </CardHeader>
          <CardContent className="pl-2 flex justify-center items-center h-[300px] text-muted-foreground">
            {/* Chart placeholder - in real app, use Recharts */}
            <div className="w-full h-full flex flex-col items-center justify-center bg-muted/20 rounded-lg border border-dashed border-border">
              {totalTransaksi > 0 ? (
                 <Activity className="h-8 w-8 mb-2 text-primary" />
              ) : (
                 <Activity className="h-8 w-8 mb-2 text-muted-foreground/50" />
              )}
              <p className="text-sm">{totalTransaksi > 0 ? "Grafik akan muncul setelah beberapa transaksi" : "Area untuk Chart Penjualan (Recharts)"}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-3 border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle>Transaksi Terbaru</CardTitle>
            <CardDescription>
              {latestTransactions.length > 0 ? `${latestTransactions.length} transaksi terakhir.` : "Belum ada transaksi hari ini."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {latestTransactions.length > 0 ? latestTransactions.map((trx, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
                      {trx.method === 'CASH' ? <DollarSign className="h-5 w-5 text-secondary-foreground" /> : <CreditCard className="h-5 w-5 text-secondary-foreground" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium leading-none">Transaksi #{trx.id.substring(0, 8)}</p>
                      <p className="text-sm text-muted-foreground mt-1">{new Date(trx.date).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <div className="font-medium">{formatRupiah(trx.total)}</div>
                    <Badge variant="default" className="text-[10px]">
                      SUCCESS
                    </Badge>
                  </div>
                </div>
              )) : (
                <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
                  <ShoppingBag className="h-8 w-8 mb-3 opacity-20" />
                  <p className="text-sm">Belum ada transaksi</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
