-- Create table for self-development classes
CREATE TABLE IF NOT EXISTS kelas_pengembangan_diri (
  id SERIAL PRIMARY KEY,
  judul VARCHAR(255) NOT NULL,
  deskripsi TEXT,
  pengisi VARCHAR(255) NOT NULL,
  bio_pengisi TEXT,
  kategori VARCHAR(100),
  durasi_jam INTEGER,
  tanggal_mulai TIMESTAMP WITH TIME ZONE,
  tanggal_selesai TIMESTAMP WITH TIME ZONE,
  jadwal_hari VARCHAR(100),
  jadwal_waktu VARCHAR(100),
  max_peserta INTEGER DEFAULT 30,
  peserta_terdaftar INTEGER DEFAULT 0,
  lokasi VARCHAR(255),
  fasilitas TEXT[],
  persyaratan TEXT[],
  materi TEXT[],
  tingkat_kesulitan VARCHAR(50) DEFAULT 'pemula',
  status VARCHAR(50) DEFAULT 'aktif',
  gambar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_kelas_pengembangan_diri_kategori ON kelas_pengembangan_diri(kategori);
CREATE INDEX IF NOT EXISTS idx_kelas_pengembangan_diri_status ON kelas_pengembangan_diri(status);
CREATE INDEX IF NOT EXISTS idx_kelas_pengembangan_diri_tanggal ON kelas_pengembangan_diri(tanggal_mulai);

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_kelas_pengembangan_diri_updated_at 
    BEFORE UPDATE ON kelas_pengembangan_diri 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data
INSERT INTO kelas_pengembangan_diri (
  judul, 
  deskripsi, 
  pengisi, 
  bio_pengisi,
  kategori,
  durasi_jam,
  tanggal_mulai,
  tanggal_selesai,
  jadwal_hari,
  jadwal_waktu,
  max_peserta,
  peserta_terdaftar,
  lokasi,
  fasilitas,
  persyaratan,
  materi,
  tingkat_kesulitan,
  status,
  gambar_url
) VALUES 
(
  'Bagaimana Menjadi Pengusaha',
  'Pelatihan komprehensif untuk memulai bisnis dari nol hingga berkembang. Pelajari strategi bisnis, manajemen keuangan, dan tips sukses dari pengusaha berpengalaman.',
  'David Handrawan, SE (Owner Samchick Blitar)',
  'Pengusaha sukses dengan pengalaman lebih dari 10 tahun di bidang kuliner. Owner dari Samchick Blitar yang telah berkembang menjadi franchise ternama.',
  'Kewirausahaan',
  16,
  '2024-02-01 09:00:00+07',
  '2024-02-03 16:00:00+07',
  'Kamis - Sabtu',
  '09:00 - 16:00 WIB',
  25,
  12,
  'Ruang Seminar Utama',
  ARRAY['Modul pelatihan', 'Sertifikat', 'Konsultasi bisnis', 'Networking session', 'Business plan template'],
  ARRAY['Minimal SMA/SMK', 'Memiliki ide bisnis', 'Laptop/notebook', 'Motivasi tinggi'],
  ARRAY['Mindset entrepreneur', 'Analisis pasar', 'Business model canvas', 'Strategi pemasaran', 'Manajemen keuangan', 'Legal aspek bisnis', 'Scaling business'],
  'menengah',
  'aktif',
  '/placeholder.svg?height=200&width=300'
),
(
  'Pelatihan Mencukur / Barbershop',
  'Kursus praktis untuk mempelajari teknik mencukur profesional dan mengelola barbershop. Dari teknik dasar hingga gaya modern.',
  'Budi Santoso (Master Barber)',
  'Barber profesional dengan sertifikat internasional dan pengalaman 15 tahun. Pemilik barbershop chain "Gentleman Cut".',
  'Keterampilan Teknis',
  20,
  '2024-02-05 08:00:00+07',
  '2024-02-09 17:00:00+07',
  'Senin - Jumat',
  '08:00 - 17:00 WIB',
  15,
  8,
  'Workshop Keterampilan',
  ARRAY['Peralatan lengkap', 'Sertifikat kompetensi', 'Starter kit', 'Job placement assistance'],
  ARRAY['Minimal SMP', 'Sehat jasmani', 'Tidak buta warna', 'Minat di bidang grooming'],
  ARRAY['Teknik dasar mencukur', 'Penggunaan alat', 'Hygiene dan sanitasi', 'Customer service', 'Trend gaya rambut', 'Manajemen barbershop'],
  'pemula',
  'aktif',
  '/placeholder.svg?height=200&width=300'
),
(
  'Pelatihan Menjadi Pekerja F&B',
  'Program pelatihan komprehensif untuk bekerja di industri Food & Beverage. Mulai dari service excellence hingga manajemen operasional.',
  'Chef Maria Sari & Tim F&B Experts',
  'Tim ahli F&B dengan pengalaman di hotel bintang 5 dan restoran internasional. Bersertifikat HACCP dan food safety.',
  'Hospitality',
  24,
  '2024-02-12 07:00:00+07',
  '2024-02-16 18:00:00+07',
  'Senin - Jumat',
  '07:00 - 18:00 WIB',
  20,
  15,
  'Kitchen Training Center',
  ARRAY['Uniform lengkap', 'Sertifikat F&B', 'Job guarantee program', 'Magang di hotel partner'],
  ARRAY['Minimal SMA/SMK', 'Sehat jasmani', 'Tinggi minimal 155cm', 'Komunikasi baik'],
  ARRAY['Food safety & hygiene', 'Menu knowledge', 'Service techniques', 'POS system', 'Customer handling', 'Teamwork', 'Upselling strategies'],
  'pemula',
  'aktif',
  '/placeholder.svg?height=200&width=300'
),
(
  'Digital Marketing untuk UMKM',
  'Pelajari strategi pemasaran digital yang efektif untuk mengembangkan usaha kecil dan menengah di era digital.',
  'Andi Wijaya (Digital Marketing Specialist)',
  'Praktisi digital marketing dengan pengalaman 8 tahun membantu UMKM berkembang melalui platform digital.',
  'Digital Marketing',
  12,
  '2024-02-19 13:00:00+07',
  '2024-02-21 17:00:00+07',
  'Senin - Rabu',
  '13:00 - 17:00 WIB',
  30,
  22,
  'Lab Komputer',
  ARRAY['Akses tools premium', 'Template konten', 'Konsultasi 1-on-1', 'Grup WhatsApp support'],
  ARRAY['Memiliki smartphone/laptop', 'Akun media sosial aktif', 'Usaha yang sedang berjalan'],
  ARRAY['Social media strategy', 'Content creation', 'Facebook & Instagram ads', 'Google My Business', 'Analytics & reporting'],
  'pemula',
  'aktif',
  '/placeholder.svg?height=200&width=300'
),
(
  'Keterampilan Public Speaking',
  'Tingkatkan kemampuan berbicara di depan umum dengan teknik-teknik profesional dan latihan intensif.',
  'Dr. Sinta Dewi, M.Kom (Communication Expert)',
  'Dosen komunikasi dan praktisi public speaking dengan pengalaman melatih ribuan peserta dari berbagai profesi.',
  'Soft Skills',
  8,
  '2024-02-26 09:00:00+07',
  '2024-02-27 16:00:00+07',
  'Senin - Selasa',
  '09:00 - 16:00 WIB',
  25,
  18,
  'Auditorium',
  ARRAY['Video recording practice', 'Feedback personal', 'Materi presentasi', 'Sertifikat'],
  ARRAY['Minimal SMA', 'Motivasi belajar tinggi', 'Siap tampil di depan kamera'],
  ARRAY['Mengatasi demam panggung', 'Teknik vokal', 'Body language', 'Struktur presentasi', 'Handling Q&A'],
  'pemula',
  'aktif',
  '/placeholder.svg?height=200&width=300'
),
(
  'Manajemen Keuangan Pribadi',
  'Belajar mengelola keuangan pribadi dengan baik, mulai dari budgeting hingga investasi untuk masa depan.',
  'Rini Hartati, CFP (Certified Financial Planner)',
  'Financial planner bersertifikat dengan pengalaman 12 tahun membantu individu mencapai kebebasan finansial.',
  'Keuangan',
  6,
  '2024-03-04 19:00:00+07',
  '2024-03-06 21:00:00+07',
  'Senin, Rabu, Jumat',
  '19:00 - 21:00 WIB',
  35,
  28,
  'Ruang Kelas Online',
  ARRAY['Financial planning template', 'Aplikasi budgeting', 'Konsultasi gratis', 'E-book panduan'],
  ARRAY['Memiliki penghasilan', 'Smartphone/laptop', 'Rekening bank aktif'],
  ARRAY['Budgeting 50/30/20', 'Emergency fund', 'Debt management', 'Investment basics', 'Retirement planning'],
  'pemula',
  'aktif',
  '/placeholder.svg?height=200&width=300'
);
