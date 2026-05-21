# DEVELZY POS

Aplikasi Kasir Modern Premium Berbasis Cloud, dibangun dengan arsitektur modern yang scalable dan siap untuk production.

## 🚀 Fitur Unggulan
- **Dashboard Premium**: Analitik realtime dengan UI/UX modern (SaaS-like).
- **POS Modern**: Transaksi kasir cepat, mudah, dan responsive.
- **Manajemen Produk & Stok**: Pantau dan kelola inventaris dengan mudah.
- **Multi Pembayaran**: Dukungan QRIS, Cash, Debit, dan Transfer.
- **RBAC (Role-Based Access Control)**: Super Admin, Admin, dan Kasir.
- **Cloud-based Sync**: Data aman di cloud, multi-cabang support.

## 🛠️ Tech Stack
- **Frontend**: Next.js 15 (App Router), TypeScript, TailwindCSS v4, Shadcn UI, Zustand
- **Backend API**: Hono.js (Edge Runtime)
- **Database**: Cloudflare D1 (SQLite)
- **Deployment**: Cloudflare Pages & Cloudflare Workers

## 📂 Struktur Project
```
├── src/
│   ├── app/                # Next.js App Router (Frontend + API Routes)
│   │   ├── (dashboard)/    # Layout Dashboard & POS
│   │   ├── api/            # Hono.js API Router (Edge)
│   │   └── page.tsx        # Landing Page Modern
│   ├── components/         # Reusable UI Components (Shadcn UI)
│   ├── database/           # D1 Schema & Migrations
│   ├── features/           # Feature-based logic (Products, Pos, dll)
│   ├── hooks/              # Custom React Hooks
│   ├── lib/                # Utility libraries (cn, dll)
│   ├── middleware/         # Auth & Role Protection
│   ├── services/           # External API & Service Integrations
│   ├── store/              # Zustand Global State
│   └── types/              # TypeScript Definitions
```

## ⚙️ Cara Menjalankan Lokal

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Setup Database (Cloudflare D1 Local)**
   Instal Wrangler CLI:
   ```bash
   npm install -g wrangler
   ```
   *Catatan: Pastikan untuk mensetup D1 binding di `wrangler.toml` jika akan di deploy.*

3. **Jalankan Development Server**
   ```bash
   npm run dev
   ```

4. Buka `http://localhost:3000` di browser Anda.

## 🌐 Deployment (Cloudflare)

Project ini siap di deploy ke Cloudflare Pages dengan Hono API berjalan di Edge Runtime.

1. **Deploy Frontend (Next.js)**:
   Gunakan `@cloudflare/next-on-pages` untuk mendeploy aplikasi Next.js App Router ke Cloudflare Pages.
   
2. **Deploy Database (D1)**:
   Jalankan file `src/database/schema.sql` menggunakan Wrangler D1 execute.

```bash
npx wrangler d1 execute develzy-pos-db --local --file=./src/database/schema.sql
```

## 🔒 Keamanan
- Middleware terproteksi untuk semua route `/dashboard` dan `/pos`.
- API endpoints divalidasi menggunakan otentikasi JWT dan Role-based permission.

---
**DEVELZY POS** — *Aplikasi Permanen, Usaha Makin Paten.*
