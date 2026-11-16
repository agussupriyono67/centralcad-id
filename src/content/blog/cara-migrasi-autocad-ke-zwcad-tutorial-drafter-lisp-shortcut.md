---
title: "Tutorial Cara Migrasi AutoCAD ke ZWCAD dalam 1 Hari: Shortcut PGP, Script LISP, dan Template DWG"
description: "Panduan praktis langkah-demi-langkah cara migrasi AutoCAD ke ZWCAD bagi drafter dan studio desain. Pindah file shortcut acad.pgp, load script LISP, dan sinkronisasi template gambar kerja."
pubDate: "2026-11-16"
author: "Tim Teknis Central CAD"
image: "/images/cad_script_programming_code.jpg"
tags: ['Cara Migrasi AutoCAD ke ZWCAD', 'Tutorial ZWCAD', 'LISP ZWCAD', 'Shortcut CAD', 'Kompatibilitas DWG']
keywords: "cara migrasi autocad ke zwcad, tutorial pindah software cad tanpa training, cara import shortcut acad pgp ke zwcad, jalankan script lisp di zwcad, kompatibilitas template dwt dwg"
---

Kekhawatiran terbesar setiap drafter senior dan manajer studio saat mendengar rencana perpindahan software CAD adalah **waktu adaptasi (*learning curve*)** dan risiko rusaknya alur kerja yang sudah mapan. Kumpulan tombol pintas keyboard (*shortcuts*), file script otomatisasi AutoLISP yang dirakit bertahun-tahun, serta template kop gambar standar kantor seringkali menjadi alasan utama mengapa tim enggan beralih.

Kabar baiknya: beralih dari AutoCAD ke ZWCAD tidak membutuhkan waktu adaptasi berminggu-minggu. Karena ZWCAD mengadopsi standar antarmuka, perintah baris (*command line*), dan arsitektur DWG yang identik, proses migrasi dapat dituntaskan **hanya dalam 1 hari kerja**.

Berikut panduan teknis langkah demi langkah untuk memindahkan seluruh kustomisasi kerja Anda dari AutoCAD ke ZWCAD.

---

## Langkah 1: Memindahkan Tombol Pintas Keyboard (Import `acad.pgp`)

Jika tim drafter Anda memiliki alias perintah khusus (misal membuat shortcut sendiri untuk `REC`, `TR`, atau perintah dimensi), Anda tidak perlu mengetik ulang kustomisasi tersebut satu per satu:

1. **Temukan File Lama:** Cari file `acad.pgp` pada komputer Anda (biasanya terletak di folder `AppData\Roaming\Autodesk\AutoCAD...\Support`).
2. **Buka ZWCAD:** Pada baris perintah (*command line*), ketik perintah `ALIASEDIT` lalu tekan Enter.
3. **Impor Shortcut:** Pada jendela antarmuka yang muncul, klik tab **Command Alias** lalu klik tombol **Import**.
4. **Pilih File:** Pilih file `acad.pgp` lama Anda. Seluruh kombinasi shortcut favorit drafter akan langsung aktif di ZWCAD tanpa perlu restart aplikasi.

---

## Langkah 2: Menjalankan Script Otomatisasi LISP (`.lsp` & `.fas`)

Salah satu keunggulan terbesar ZWCAD dibandingkan software CAD alternatif lainnya adalah engine LISP-nya yang sangat cepat dan kompatibel penuh dengan kode AutoLISP standar:

1. Ketik perintah `APPLOAD` pada command line ZWCAD.
2. Klik tombol **Add File** dan pilih script LISP Anda (`.lsp`, `.fas`, atau `.vlx`).
3. Klik tombol **Load** untuk menjalankan script pada gambar aktif saat itu.
4. **Agar LISP Otomatis Jalan Setiap Membuka CAD:** Klik icon koper (*Startup Suite*), lalu tambahkan script LISP tersebut ke dalam daftar. Setiap kali ZWCAD dibuka, seluruh script otomatisasi gambar Anda akan siap digunakan.

---

## Langkah 3: Sinkronisasi Template Kop Gambar (.DWT) & Plot Style (.CTB)

Agar hasil cetak gambar kerja proyek Anda tetap memiliki ketebalan garis (*lineweight*) dan standar kop gambar yang sama persis dengan proyek-proyek sebelumnya:

### Memindahkan File CTB (Plot Style):
1. Buka ZWCAD dan ketik perintah `STYLESMANAGER` di command line.
2. Folder Plot Styles ZWCAD akan otomatis terbuka di Windows Explorer.
3. Salin (copy-paste) seluruh file `.ctb` yang biasa Anda gunakan di AutoCAD ke dalam folder tersebut.
4. Saat Anda melakukan pencetakan (`PLOT` atau `Ctrl+P`), seluruh profil warna dan ketebalan garis lama akan langsung tersedia di menu dropdown Plot Style Table.

### Memindahkan Template Gambar Kerja (.DWT):
* Buka file kop standar perusahaan Anda (`.dwg` atau `.dwt`), lalu lakukan **Save As** dengan format `.dwt` (AutoCAD Drawing Template) ke folder Template bawaan ZWCAD.
* Atur template tersebut sebagai default drawing melalui menu `OPTIONS` > tab `Files` > `Template Settings`.

---

## Langkah 4: Memindahkan Font Khusus (.SHX) Perusahaan

Jika gambar proyek Anda menggunakan jenis font teknik khusus agar tidak muncul tanda tanya (`?`) pada teks dimensi:

* Cukup salin seluruh file font `.shx` dari folder lama Anda ke direktori:
  `C:\Program Files\ZWSOFT\ZWCAD 2026\Fonts`
* Saat membuka file gambar kerja lama di ZWCAD, seluruh teks, simbol toleransi, dan notasi gambar akan langsung muncul sempurna tanpa teks yang hilang (*missing font*).

---

## Evaluasi Paralel (Side-by-Side Run) Tanpa Downtime

Untuk memastikan alur kerja tidak terganggu, Anda dapat memasang ZWCAD berdampingan dengan AutoCAD pada komputer yang sama. Keduanya tidak akan saling mengganggu konfigurasi registry Windows. Biarkan drafter mencoba mengerjakan proyek aktif selama beberapa hari untuk merasakan langsung stabilitas dan ringannya performa ZWCAD.

Bagi tim manajemen yang membutuhkan framework tata kelola transisi skala kantor, baca juga panduan korporat kami: [Roadmap 14 Hari Zero Downtime Migrasi AutoCAD ke ZWCAD](https://blog.cadsolution.co.id/cara-migrasi-autocad-ke-zwcad-roadmap-zero-downtime/).

---

## Uji Coba Gratis ZWCAD untuk Tim Drafter Anda

Jangan ragu untuk menguji kompatibilitas alur kerja tim Anda sekarang juga secara gratis:

* **Download ZWCAD Full Version 30 Hari:** [Unduh Installer Resmi Central CAD](https://hetra.orderonline.id/centralcadid)
* **Konsultasi Setting & Bantuan Migrasi:** [WhatsApp Tim Teknis Central CAD (0819-1224-4662)](https://wa.me/6281912244662?text=Halo%20CentralCAD,%20saya%20butuh%20panduan%20migrasi%20setting%20shortcut%20dan%20LISP%20dari%20AutoCAD%20ke%20ZWCAD)
