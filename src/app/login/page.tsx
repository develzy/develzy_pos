"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Store, ArrowLeft, Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { useAppStore } from "@/store/useStore";
import { toast } from "sonner";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const login = useAppStore(state => state.login);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (searchParams.get("demo") === "true") {
      const autoLogin = async () => {
        setIsLoading(true);
        const success = await login("premium@develzy.com", "premium123");
        if (success) {
          toast.success("Masuk Mode Demo Berhasil!");
          router.push('/dashboard');
        }
        setIsLoading(false);
      };
      autoLogin();
    }
  }, [searchParams, login, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const success = await login(email, password);
    
    if (success) {
      toast.success("Login Berhasil!");
      router.push('/dashboard');
    } else {
      toast.error("Email atau password salah!");
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-muted/30 p-4">
      <Link href="/" className="absolute top-8 left-8 flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="mr-2 h-4 w-4" /> Kembali
      </Link>
      
      <div className="w-full max-w-md space-y-8 bg-card p-8 rounded-2xl shadow-xl border">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground mb-4">
            <Store className="h-6 w-6" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight">Masuk ke Akun Anda</h2>
          <p className="text-sm text-muted-foreground mt-2">Masukkan email dan password untuk melanjutkan.</p>
        </div>

        <form className="space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="nama@email.com" required className="h-11" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="#" className="text-xs font-medium text-primary hover:underline">Lupa password?</Link>
              </div>
              <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required className="h-11" />
            </div>
          </div>

          <Button type="submit" className="w-full h-11 text-base" disabled={isLoading}>
            {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sedang Masuk...</> : "Masuk Sekarang"}
          </Button>
        </form>

        <div className="text-center text-sm text-muted-foreground">
          Belum punya akun? <Link href="/register" className="font-semibold text-primary hover:underline">Daftar di sini</Link>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-muted/30"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>}>
      <LoginForm />
    </Suspense>
  );
}
