import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Users, ShoppingBag, ArrowUpRight, ArrowDownRight, CreditCard, Activity } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard Overview</h2>
          <p className="text-muted-foreground">Pantau performa bisnis Anda secara real-time.</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">Unduh Laporan</Button>
          <Button>Buka Kasir (POS)</Button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          { title: "Total Penjualan", value: "Rp 12.450.000", change: "+20.1%", trend: "up", icon: DollarSign },
          { title: "Transaksi", value: "342", change: "+12.5%", trend: "up", icon: ShoppingBag },
          { title: "Pelanggan Baru", value: "12", change: "-2.4%", trend: "down", icon: Users },
          { title: "Keuntungan", value: "Rp 4.230.000", change: "+18.2%", trend: "up", icon: Activity },
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
              <Activity className="h-8 w-8 mb-2 text-muted-foreground/50" />
              <p className="text-sm">Area untuk Chart Penjualan (Recharts)</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-3 border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle>Transaksi Terbaru</CardTitle>
            <CardDescription>
              5 transaksi terakhir hari ini.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                { name: "Budi Santoso", id: "TRX-1024", amount: "Rp 150.000", status: "SUCCESS", method: "QRIS" },
                { name: "Siti Aminah", id: "TRX-1023", amount: "Rp 45.000", status: "SUCCESS", method: "CASH" },
                { name: "Agus Prasetyo", id: "TRX-1022", amount: "Rp 320.000", status: "SUCCESS", method: "TRANSFER" },
                { name: "Dina Mariana", id: "TRX-1021", amount: "Rp 85.000", status: "PENDING", method: "QRIS" },
                { name: "Wahyu Saputra", id: "TRX-1020", amount: "Rp 12.000", status: "SUCCESS", method: "CASH" },
              ].map((trx, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
                      {trx.method === 'CASH' ? <DollarSign className="h-5 w-5 text-secondary-foreground" /> : <CreditCard className="h-5 w-5 text-secondary-foreground" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium leading-none">{trx.name}</p>
                      <p className="text-sm text-muted-foreground mt-1">{trx.id}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <div className="font-medium">{trx.amount}</div>
                    <Badge variant={trx.status === 'SUCCESS' ? 'default' : 'secondary'} className="text-[10px]">
                      {trx.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
