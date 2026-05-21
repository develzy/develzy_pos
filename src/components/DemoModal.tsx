"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Monitor, Smartphone } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

import { useRouter } from "next/navigation";
import { useAppStore } from "@/store/useStore";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export function DemoModal() {
  const router = useRouter();
  const { login } = useAppStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleDemoDesktop = async () => {
    setIsLoading(true);
    // Auto login as Premium user for Demo Mode
    const success = await login("premium@develzy.com", "premium123");
    if (success) {
      router.push("/dashboard");
    }
    setIsLoading(false);
  };

  return (
    <Dialog>
      <DialogTrigger className="inline-flex items-center justify-center whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground w-full sm:w-auto rounded-full h-12 px-8 text-base">
        Lihat Demo
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Pilih Versi Demo</DialogTitle>
          <DialogDescription>
            Pilih bagaimana Anda ingin melihat tampilan aplikasi kasir DEVELZY POS.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
          <button 
            onClick={handleDemoDesktop}
            disabled={isLoading}
            className="flex flex-col items-center justify-center p-6 border-2 rounded-xl hover:border-primary hover:bg-primary/5 transition-all group relative disabled:opacity-50"
          >
            {isLoading ? (
              <Loader2 className="h-12 w-12 mb-4 text-primary animate-spin" />
            ) : (
              <Monitor className="h-12 w-12 mb-4 text-muted-foreground group-hover:text-primary transition-colors" />
            )}
            <h3 className="font-semibold text-center">Versi Layar Besar</h3>
            <p className="text-xs text-center text-muted-foreground mt-2">Untuk Kasir PC/Laptop/Tablet</p>
          </button>
          
          <Link href="/demo-mobile" className="flex flex-col items-center justify-center p-6 border-2 rounded-xl hover:border-primary hover:bg-primary/5 transition-all group">
            <Smartphone className="h-12 w-12 mb-4 text-muted-foreground group-hover:text-primary transition-colors" />
            <h3 className="font-semibold text-center">Versi Mobile (HP)</h3>
            <p className="text-xs text-center text-muted-foreground mt-2">Simulasi tampilan di layar HP</p>
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
}
