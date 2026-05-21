"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error("Global Error Caught:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground p-4">
      <div className="max-w-md w-full bg-card border rounded-2xl p-8 text-center shadow-xl">
        <div className="w-16 h-16 bg-destructive/10 text-destructive rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold mb-4">Terjadi Kesalahan</h2>
        <p className="text-muted-foreground mb-8 text-sm">
          Maaf, terjadi kesalahan tak terduga pada halaman ini. Hal ini mungkin disebabkan oleh ekstensi browser atau gangguan koneksi.
        </p>
        <div className="flex flex-col gap-3">
          <Button onClick={() => reset()} className="w-full h-12 rounded-xl">
            Muat Ulang Halaman
          </Button>
          <Button variant="outline" onClick={() => window.location.href = '/'} className="w-full h-12 rounded-xl">
            Kembali ke Beranda
          </Button>
        </div>
      </div>
    </div>
  );
}
