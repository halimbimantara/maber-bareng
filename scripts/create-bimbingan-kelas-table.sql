CREATE TABLE IF NOT EXISTS bimbingan_kelas (
  id SERIAL PRIMARY KEY,
  kode_kelas VARCHAR(255) NOT NULL UNIQUE,
  nama_kelas VARCHAR(255) NOT NULL,
  deskripsi TEXT,
  tingkatan VARCHAR(255) NOT NULL,
  mata_pelajaran VARCHAR(255) NOT NULL,
  guru_id INTEGER REFERENCES users(id),
  tanggal_mulai DATE NOT NULL,
  tanggal_berakhir DATE NOT NULL,
  kapasitas INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Sample data for bimbingan_kelas table
INSERT INTO bimbingan_kelas (kode_kelas, nama_kelas, deskripsi, tingkatan, mata_pelajaran, guru_id, tanggal_mulai, tanggal_berakhir, kapasitas) VALUES
('KELAS001', 'Kelas Matematika Dasar', 'Kelas untuk mempelajari dasar-dasar matematika', 'SD', 'Matematika', 1, '2024-01-15', '2024-06-15', 20),
('KELAS002', 'Kelas IPA Terpadu', 'Kelas yang mempelajari konsep IPA secara terpadu', 'SMP', 'IPA', 2, '2024-01-20', '2024-06-20', 15),
('KELAS003', 'Kelas Bahasa Inggris Intensif', 'Kelas intensif untuk meningkatkan kemampuan berbahasa Inggris', 'SMA', 'Bahasa Inggris', 3, '2024-02-01', '2024-07-01', 10),
('KELAS004', 'Kelas Fisika Lanjutan', 'Kelas untuk mempelajari konsep fisika lebih mendalam', 'SMA', 'Fisika', 1, '2024-02-05', '2024-07-05', 12),
('KELAS005', 'Kelas Kimia Dasar', 'Kelas yang mempelajari dasar-dasar kimia', 'SMK', 'Kimia', 2, '2024-02-10', '2024-07-10', 18);
