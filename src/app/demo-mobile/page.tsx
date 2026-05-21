import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function DemoMobilePage() {
  return (
    <div className="min-h-screen bg-neutral-900 flex flex-col items-center justify-center p-4">
      <Link href="/" className="absolute top-6 left-6 flex items-center text-neutral-400 hover:text-white transition-colors">
        <ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke Home
      </Link>
      
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-white">Simulasi Tampilan Mobile</h1>
        <p className="text-neutral-400 text-sm mt-1">Gunakan mouse untuk interaksi layaknya layar sentuh HP.</p>
      </div>

      {/* iPhone Mockup Frame */}
      <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[800px] w-[375px] shadow-2xl overflow-hidden ring-4 ring-neutral-800">
        <div className="absolute top-0 inset-x-0 h-6 bg-black z-50 flex justify-center rounded-b-3xl">
          {/* Notch */}
          <div className="w-32 h-6 bg-black rounded-b-3xl"></div>
        </div>
        
        {/* Iframe for the app */}
        <iframe 
          src="/login?demo=true" 
          className="w-full h-full bg-white rounded-[2rem] border-0"
          title="Mobile Demo DEVELZY POS"
        />
      </div>
    </div>
  );
}
