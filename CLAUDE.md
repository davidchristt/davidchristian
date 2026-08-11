# CLAUDE.md

Panduan untuk Claude Code saat bekerja di repo ini.

## Ringkasan Proyek

Portfolio pribadi **David Christian Nathaniel** — single-page Next.js App Router yang
merender seluruh isi CV (profil, pendidikan, pengalaman kerja, proyek, organisasi, skill)
dari database PostgreSQL via Prisma. Semua konten adalah data, bukan hardcode di JSX:
untuk mengubah isi portfolio, ubah `prisma/seed.js` atau data di DB — bukan `app/page.js`.

## Stack & Versi

| Bagian | Teknologi | Versi |
|---|---|---|
| Framework | Next.js (App Router, React Server Components) | 16.0.10 |
| UI | React / React DOM | 19.2.1 |
| Styling | Tailwind CSS v4 (via `@tailwindcss/postcss`) | ^4 (terpasang 4.1.18) |
| ORM | Prisma + `@prisma/client` | ^5.22.0 (terpasang 5.22.0) |
| Database | PostgreSQL | — |
| Lint | ESLint flat config + `eslint-config-next` | ^9 / 16.0.10 |
| Font | `next/font/google` — Geist Sans & Geist Mono | — |
| Runtime dev | Node.js | v22.18.0, npm 10.9.3 |

Catatan penting:
- **JavaScript murni, bukan TypeScript.** Semua file `.js` (bukan `.jsx`/`.tsx`). Jangan
  konversi ke TS tanpa diminta.
- **Tailwind v4**: tidak ada `tailwind.config.js`. Konfigurasi tema lewat `@theme inline`
  di [app/globals.css](app/globals.css) dan plugin PostCSS di [postcss.config.mjs](postcss.config.mjs).
- `@prisma/client` ada di `devDependencies` (secara teknis dia runtime dependency —
  build tetap jalan karena Next.js membundel-nya, tapi ini perlu diperhatikan).

## Struktur Folder

```
app/
  layout.js              # Root layout: font Geist, metadata SEO, <html lang="en">
  page.js                # Home (Server Component async) — SEMUA section kecuali hero
  actions.js             # Server Actions ('use server') — satu-satunya akses DB
  globals.css            # Import Tailwind + CSS variable tema
  favicon.ico
  components/
    HeroSection.js       # Client Component ('use client') — hero + modal preview CV
prisma/
  schema.prisma          # Skema data (6 model)
  seed.js                # Seeder isi CV (CommonJS, dijalankan manual via node)
public/
  images/                # Foto profil, logo perusahaan/kampus, thumbnail proyek
  documents/             # "CV - David Christian Nathaniel.pdf"
  *.svg                  # Sisa aset bawaan create-next-app (tidak dipakai)
.env                     # DATABASE_URL, DIRECT_URL — gitignored, jangan pernah di-commit
```

Belum ada folder `lib/`, `api/`, route selain `/`, dan belum ada test.

## Konvensi Penamaan

**File & folder**
- File route Next.js pakai nama baku lowercase: `page.js`, `layout.js`, `actions.js`.
- Komponen di `app/components/` pakai **PascalCase**: `HeroSection.js`. Export default,
  nama function sama dengan nama file.
- Import antar file saat ini pakai **path relatif** (`./actions`, `./components/HeroSection`).
  Alias `@/*` sudah dikonfigurasi di [jsconfig.json](jsconfig.json) tapi belum dipakai
  di mana pun — ikuti gaya relatif yang ada kecuali diminta lain.

**Kode**
- Function & variabel: `camelCase`. Server Action diberi nama kata kerja: `getPortfolioData`,
  `updateProfile`.
- Server Component adalah default. Tambahkan `'use client'` **hanya** kalau butuh state /
  event handler (contoh: `HeroSection` butuh `useState` untuk modal PDF).
- Komentar di codebase ini ditulis **bahasa Indonesia** dan bergaya penanda section
  (`{/* 3. WORK EXPERIENCE */}`). Ikuti gaya ini saat menambah kode.

**Prisma**
- Model: PascalCase singular (`Project`, bukan `Projects`). Field: `camelCase`.
- Setiap model punya `id Int @id @default(autoincrement())`.
- Field teks panjang selalu `@db.Text` (`description`, `summary`).
- Field opsional pakai `?`: `imageUrl`, `github`, `avatarUrl`, `resumeUrl`.

**Tailwind / desain**
- Base gelap: `bg-slate-950` + `text-slate-200`, kartu `bg-slate-900/*` dengan
  `border-slate-800`.
- Tiap section punya warna aksen tetap — pertahankan saat menambah/mengubah section:
  - Hero & Work Experience → **blue** (`border-l-4 border-blue-500`)
  - Education → **yellow**
  - Projects → **emerald**
  - Organizations → **purple**
- Judul section: `text-3xl font-bold text-white` + `border-l-4` berwarna aksen.
- Data teknis/periode ditampilkan dengan `font-mono`.
- Gambar dirender pakai `<img>` biasa, **bukan** `next/image`.

## Cara Run / Build

```bash
npm install

# Isi .env dulu:
#   DATABASE_URL="postgresql://..."   # koneksi (pooled) yang dipakai app
#   DIRECT_URL="postgresql://..."     # koneksi langsung untuk migrate/push

npx prisma generate          # generate Prisma Client
npx prisma db push           # sinkronkan schema.prisma ke database
node prisma/seed.js          # isi data CV (menghapus semua data lama dulu!)

npm run dev                  # http://localhost:3000
```

Script yang tersedia di [package.json](package.json):

| Script | Perintah | Keterangan |
|---|---|---|
| `npm run dev` | `next dev` | Dev server |
| `npm run build` | `npx prisma generate && next build` | Generate client dulu, lalu build |
| `npm start` | `next start` | Jalankan hasil build |
| `npm run lint` | `eslint` | Lint seluruh proyek (flat config) |

Hal yang perlu diingat:
- **Seeder bersifat destruktif**: `prisma/seed.js` menjalankan `deleteMany()` pada semua
  tabel sebelum insert. Jangan jalankan di database yang datanya sudah diedit manual.
- Seeder **tidak** terdaftar di `package.json` (`prisma.seed`), jadi `npx prisma db seed`
  tidak jalan — panggil `node prisma/seed.js` langsung.
- Kalau halaman menampilkan `"Data kosong..."`, artinya `profile.findFirst()` mengembalikan
  `null` → DB belum di-seed atau `DATABASE_URL` salah.
- Halaman utama query DB saat render, jadi **build butuh database yang bisa diakses**.

## Skema Data (Prisma)

Datasource: `postgresql`, dengan `url = env("DATABASE_URL")` dan `directUrl = env("DIRECT_URL")`
(pola koneksi pooled + direct, umum untuk Supabase/Neon).

**Tidak ada relasi antar model** — semua tabel berdiri sendiri dan dirender sebagai list
terpisah. Pengelompokan (mis. beberapa role dalam satu perusahaan) dilakukan di sisi
JavaScript, bukan lewat foreign key.

```
Profile        id, fullName, headline, summary(Text), email, linkedin,
               github?, location, avatarUrl?, resumeUrl?
               → hanya 1 baris yang dipakai (findFirst)

Education      id, school, degree, period, description(Text), imageUrl?
Experience     id, role, company, period, type, description(Text), imageUrl?
Project        id, name, role, techStack, description(Text), period, imageUrl?
Organization   id, name, role, period, description(Text)
Skill          id, category, items
```

Konvensi data yang **implisit** dan diandalkan oleh UI — patuhi saat menambah data:
- `period` adalah **string bebas**, bukan tanggal. Format: `"Jan 2026 - Feb 2026"`,
  `"August 2023 - Present"`. Tidak bisa disortir/difilter secara kronologis.
- `Skill.items` dan `Project.techStack` adalah string dipisah koma; UI melakukan
  `.split(', ')` / `.split(',')` untuk membuat chip.
- `Education.description` menyimpan GPA di dalam teks. [app/page.js](app/page.js) mem-parsing
  dengan regex `/(GPA: [\d\.\/]+|Average Score: [\d\.]+)/` untuk menampilkannya sebagai
  kartu besar. Kalau format ini berubah, kartu GPA hilang diam-diam.
- `Experience.company` dipakai sebagai kunci grouping (gaya LinkedIn) di `page.js` —
  penulisan nama perusahaan harus **persis sama** agar role-nya tergabung.
- `Experience.type` bebas teks (`"Internship"`, `"Part-Time"`), dirender sebagai badge.
- `imageUrl` / `avatarUrl` / `resumeUrl` adalah path relatif ke `public/`
  (mis. `/images/unpad.png`). File harus benar-benar ada — tidak ada fallback kecuali avatar.
- `linkedin` & `github` disimpan **tanpa** skema URL (`linkedin.com/in/...`); UI menambahkan
  `https://` sendiri.

## Bagian yang Masih Placeholder / Belum Selesai

1. **Fitur admin belum ada.** `updateProfile()` di [app/actions.js](app/actions.js) sudah
   ditulis (dan hanya meng-update field `summary`) tapi **tidak dipanggil dari mana pun** —
   tidak ada route `/admin`, form, maupun autentikasi. Ini API tanpa UI.
2. **Tidak ada proteksi pada Server Action.** `updateProfile` adalah endpoint publik tanpa
   auth/validasi. Wajib ditangani sebelum dipakai di produksi.
3. **`PrismaClient` di-instansiasi langsung** di `actions.js` (dan `seed.js`) tanpa pola
   singleton global. Di dev dengan hot reload ini bisa menumpuk koneksi.
4. **Belum ada folder migrations.** Hanya ada `schema.prisma`; alur yang dipakai kemungkinan
   `prisma db push`. Belum ada riwayat migrasi yang bisa direproduksi.
5. **README.md masih boilerplate `create-next-app`** — belum mendeskripsikan proyek ini.
6. **[next.config.mjs](next.config.mjs) masih kosong** (`/* config options here */`).
   Belum ada konfigurasi `images`, dan memang belum diperlukan karena UI pakai `<img>` biasa
   — migrasi ke `next/image` masih pekerjaan terbuka.
7. **[app/globals.css](app/globals.css) masih tema bawaan template**: variabel
   `--background`/`--foreground` dengan `prefers-color-scheme`, dan `body` di-set
   `font-family: Arial`. Semuanya di-override oleh class Tailwind gelap di `page.js`,
   jadi token tema ini praktis tidak terpakai (termasuk `--font-geist-sans` di `@theme inline`).
8. **Alias import `@/*`** dikonfigurasi tapi belum dipakai sama sekali.
9. **Tidak ada `orderBy`** pada satu pun `findMany()` di `actions.js` — urutan tampilan
   mengikuti urutan insert di DB. Belum ada field `order`/`sortIndex` di skema.
10. **Project belum punya link.** Model `Project` tidak punya field `url`/`repoUrl`/`demoUrl`,
    sehingga kartu proyek tidak bisa diklik ke mana pun.
11. **Belum ada `.env.example`**, padahal `.env` di-gitignore — setup di mesin baru harus menebak
    nama variabel (`DATABASE_URL`, `DIRECT_URL`).
12. **Belum ada `loading.js`, `error.js`, atau `not-found.js`** di `app/`. Kegagalan query DB
    akan memunculkan error Next.js mentah; satu-satunya penanganan adalah teks
    `"Data kosong. Jalankan 'node prisma/seed.js' dulu."` saat profil `null`.
13. **Fallback avatar mengarah ke layanan eksternal** `https://placehold.co/400x400`
    di [app/components/HeroSection.js](app/components/HeroSection.js).
14. **Aset sisa template** di `public/`: `file.svg`, `globe.svg`, `window.svg`, `next.svg`,
    `vercel.svg`, plus `images/UNPAD.jpg` yang tidak direferensikan seeder (yang dipakai
    `images/unpad.png`).
15. **Belum ada test, CI, maupun formatter** (tidak ada Prettier/Husky).
16. **Section yang umum ada di portfolio tapi belum dibuat**: contact form, navbar/anchor nav
    (hanya `#projects` yang bisa di-scroll), dan halaman detail proyek.
