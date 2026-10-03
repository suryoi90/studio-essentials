# Studio Essentials — Luxury Brand Strategy & Digital Atelier

Website luxury editorial kelas dunia yang terinspirasi langsung dari desain **Luxe Theme #A354 (Luxor Agency)**. Dibuat dengan presisi tinggi, estetika "quiet luxury", tipografi elegan, palet warna warm espresso & ivory, serta interaksi modern siap deploy ke **GitHub** dan **Vercel**.

---

## 🏛️ Bedah Desain & Visual Breakdown (Luxe Theme #A354)

Berdasarkan analisis visual gambar referensi Pinterest dan situs Luxor Agency:

1. **Brand Aesthetic & Vibe**:
   - **Gaya**: *Quiet Luxury, High-End Editorial, Contemporary Atelier*.
   - **Nuansa**: Eksklusif, berkelas, minimalis, dan profesional tanpa berlebihan.
   - **Dual Color Scheme**: Kontras harmonis antara espresso tua (`#1F1713`) dan ivory cream lembut (`#F6F2EB`), dengan aksen camel/soft bronze (`#C8A882`).

2. **Tipografi Berkelas (Typography Hierarchy)**:
   - **Display Headings**: *Cormorant Garamond* (Serif display klasik dengan letter-spacing lebar dan proporsi elegan).
   - **Body & Metadata**: *Montserrat* (Geometric sans-serif yang bersih, modern, dan mudah dibaca pada semua resolusi layar).

3. **Struktur Bagian Utama**:
   - **Outer Editorial Border**: Frame bergaris tipis 1px khas majalah fashion mewah yang membingkai hero banner.
   - **Hero Section**: Foto potret berkarakter kuat (*Executive Director*) berlatar espresso dengan headline berwibawa *"ELEVATE YOUR BUSINESS VISION"* dan tombol *"BOOK CONSULTATION"*.
   - **Services Section**: Tata letak editorial 2 kolom dengan patung seni marmer berbalut sutra (*Artisanal Sculpture*) dan poin kapabilitas utama.
   - **Client Testimonial Slider**: Kutipan ulasan klien terverifikasi dengan avatar melingkar dan navigasi carousel halus.
   - **Case Studies Grid**: Galeri 3 kartu karya terpilih (*Architecture, Haute Parfumerie, Modernist Ceramics*) dilengkapi modal interaktif *Project Dossier*.
   - **Bespoke Consultation Drawer**: Modal formulir reservasi konsultasi privat dengan validasi formulir dan animasi status terkirim.
   - **Dual-tone Footer**: Banner aksen camel untuk buletin eksklusif dan footer lengkap dengan navigasi sitemap.

---

## 📁 Struktur Direktori Project

```
studio-essentials/
├── index.html                 # Struktur semantik HTML5, meta tags SEO & OpenGraph
├── style.css                  # Desain sistem CSS luxury, variables, & responsivitas
├── script.js                  # Interaktivitas (Carousel slider, modal drawer, form feedback)
├── vercel.json                # Konfigurasi caching, clean URLs, dan headers security Vercel
├── package.json               # Konfigurasi dev server & package metadata
├── .gitignore                 # Filter file Git
├── README.md                  # Dokumentasi & panduan deployment
└── assets/
    └── images/
        ├── hero_portrait.jpg       # Foto potret hero berkualitas tinggi
        ├── service_sculpture.jpg   # Foto seni patung marmer berbalut sutra
        ├── case_study_one.jpg      # Case Study 1: Aurelia Architecture
        ├── case_study_two.jpg      # Case Study 2: Lumen & Essence
        ├── case_study_three.jpg    # Case Study 3: Nocturne Atelier
        └── avatar_testimonial.jpg  # Foto avatar ulasan klien
```

---

## 🚀 Panduan Upload ke GitHub

### Langkah 1: Buka Terminal di Folder Project
Buka terminal / PowerShell dan arahkan ke folder project:
```bash
cd "C:\Users\IT GLOBALDISPOMEDIKA\.gemini\antigravity-ide\scratch\studio-essentials"
```

### Langkah 2: Inisialisasi Git & Commit
Jalankan perintah berikut:
```bash
git init
git add .
git commit -m "feat: initial commit Studio Essentials luxury website"
```

### Langkah 3: Hubungkan ke Repository GitHub
1. Buka [GitHub.com](https://github.com) dan buat repository baru bernama `studio-essentials` (Public atau Private).
2. Salin URL repository Anda, lalu jalankan:
```bash
git branch -M main
git remote add origin https://github.com/USERNAME-ANDA/studio-essentials.git
git push -u origin main
```

---

## ⚡ Panduan Deploy ke Vercel (Gratis & Cepat)

### Metode A: Melalui Dashboard Vercel (Paling Direkomendasikan)
1. Buka [vercel.com](https://vercel.com) dan login menggunakan akun GitHub Anda.
2. Klik tombol **"Add New..."** lalu pilih **"Project"**.
3. Cari repository `studio-essentials` yang baru saja Anda push, lalu klik **"Import"**.
4. Biarkan pengaturan default (Framework Preset: *Other*, Root Directory: `./`).
5. Klik **"Deploy"**.
6. Dalam 15-30 detik, website Anda langsung online dengan domain gratis seperti:
   `https://studio-essentials.vercel.app`!

### Metode B: Melalui Terminal (Vercel CLI)
Jika Anda memiliki Vercel CLI di komputer:
```bash
npx vercel
```
Ikuti instruksi prompt singkat, dan website Anda langsung ter-deploy secara instan.

---

## 💻 Menjalankan Secara Lokal di Komputer

Anda dapat langsung membuka file `index.html` di browser apa saja, atau menjalankan live server lokal:

```bash
# Menggunakan npx serve
npx serve .

# Atau menggunakan Python jika terpasang
python -m http.server 3000
```
Lalu buka `http://localhost:3000` di browser.

---

## 🎨 Kustomisasi Cepat

- **Mengubah Teks & Kontak**: Edit konten di file [index.html](file:///C:/Users/IT%20GLOBALDISPOMEDIKA/.gemini/antigravity-ide/scratch/studio-essentials/index.html).
- **Mengubah Warna Utama**: Buka [style.css](file:///C:/Users/IT%20GLOBALDISPOMEDIKA/.gemini/antigravity-ide/scratch/studio-essentials/style.css) pada bagian `:root` untuk mengganti nilai `--accent-gold`, `--bg-espresso`, atau `--bg-cream`.
- **Menyesuaikan Form Konsultasi**: Anda dapat menghubungkan formulir konsultasi dengan layanan gratis seperti [Formspree](https://formspree.io) atau [Web3Forms](https://web3forms.com) cukup dengan mengganti `action="https://formspree.io/f/YOUR_ID"` pada tag `<form>`.

---

© 2026 Studio Essentials. All rights reserved.
