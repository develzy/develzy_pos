"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Store, ArrowLeft, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulasi loading API
    setTimeout(() => {
      router.push('/dashboard');
    }, 1000);
  };
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-muted/30 p-4">
      <Link href="/" className="absolute top-8 left-8 flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="mr-2 h-4 w-4" /> Kembali
      </Link>
      
      <div className="w-full max-w-md space-y-8 bg-card p-8 rounded-2xl shadow-xl border mt-8 md:mt-0">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground mb-4">
            <Store className="h-6 w-6" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight">Buat Akun Baru</h2>
          <p className="text-sm text-muted-foreground mt-2">Mulai kelola bisnis Anda dengan DEVELZY POS gratis selama 14 hari.</p>
        </div>

        <form className="space-y-6" onSubmit={handleRegister}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nama Lengkap</Label>
              <Input id="name" type="text" placeholder="John Doe" required className="h-11" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="store">Nama Toko/Bisnis</Label>
              <Input id="store" type="text" placeholder="Toko Sejahtera" required className="h-11" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="nama@email.com" required className="h-11" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required className="h-11" />
            </div>
          </div>

          <Button type="submit" className="w-full h-11 text-base" disabled={isLoading}>
            {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Memproses...</> : "Daftar Sekarang"}
          </Button>
        </form>

        <div className="text-center text-sm text-muted-foreground">
          Sudah punya akun? <Link href="/login" className="font-semibold text-primary hover:underline">Masuk di sini</Link>
        </div>
      </div>
    </div>
  );
}
