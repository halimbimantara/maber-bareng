-- Create tryout table
CREATE TABLE IF NOT EXISTS tryout (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Tryout Information
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  subject_areas TEXT[] NOT NULL, -- Array of subject areas
  total_questions INTEGER NOT NULL,
  duration_minutes INTEGER NOT NULL,
  difficulty_level TEXT NOT NULL DEFAULT 'medium' CHECK (difficulty_level IN ('easy', 'medium', 'hard')),
  
  -- Availability
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  max_participants INTEGER,
  current_participants INTEGER NOT NULL DEFAULT 0,
  
  -- Tryout Details
  passing_score INTEGER,
  instructions TEXT,
  benefits TEXT[],
  requirements TEXT,
  
  -- Metadata
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_tryout_active ON tryout(is_active);
CREATE INDEX IF NOT EXISTS idx_tryout_dates ON tryout(start_date, end_date);
CREATE INDEX IF NOT EXISTS idx_tryout_difficulty ON tryout(difficulty_level);

-- Enable Row Level Security (RLS)
ALTER TABLE tryout ENABLE ROW LEVEL SECURITY;

-- Create policy to allow reading tryouts
CREATE POLICY "Allow reading tryouts" ON tryout
  FOR SELECT USING (true);

-- Create policy to allow inserting tryouts (for admin)
CREATE POLICY "Allow inserting tryouts" ON tryout
  FOR INSERT WITH CHECK (true);

-- Create policy to allow updating tryouts (for admin)
CREATE POLICY "Allow updating tryouts" ON tryout
  FOR UPDATE USING (true);

-- Insert sample data
INSERT INTO tryout (
  title, 
  description, 
  subject_areas,
  total_questions,
  duration_minutes,
  difficulty_level,
  start_date,
  end_date,
  is_active,
  max_participants,
  current_participants,
  passing_score,
  instructions,
  benefits,
  requirements
) VALUES 
(
  'UTBK SBMPTN 2024 - Tes Potensi Skolastik',
  'Try out komprehensif untuk persiapan UTBK SBMPTN dengan fokus pada Tes Potensi Skolastik dan Literasi',
  ARRAY['TPS', 'Literasi Bahasa Indonesia', 'Literasi Bahasa Inggris', 'Penalaran Matematika'],
  120,
  180,
  'medium',
  '2025-01-15',
  '2025-03-15',
  true,
  500,
  234,
  60,
  'Baca petunjuk dengan teliti sebelum mengerjakan. Pastikan koneksi internet stabil selama mengerjakan.',
  ARRAY['Simulasi ujian UTBK yang realistis', 'Pembahasan lengkap setiap soal', 'Analisis kemampuan per subtes', 'Prediksi skor UTBK'],
  'Siswa kelas XII atau alumni SMA/SMK'
),
(
  'Try Out Matematika IPA Intensif',
  'Try out khusus untuk siswa IPA dengan fokus pada soal-soal Matematika tingkat lanjut',
  ARRAY['Matematika Wajib', 'Matematika Peminatan'],
  50,
  90,
  'hard',
  '2025-01-20',
  '2025-02-28',
  true,
  200,
  89,
  70,
  'Siapkan alat tulis dan kalkulator. Kerjakan soal sesuai urutan yang diberikan.',
  ARRAY['Soal setara dengan UTBK', 'Tips dan trik pengerjaan', 'Ranking nasional', 'Sertifikat digital'],
  'Siswa kelas XI-XII jurusan IPA'
),
(
  'Try Out Bahasa Inggris TOEFL Preparation',
  'Persiapan TOEFL dengan format soal yang sesuai standar internasional',
  ARRAY['Reading Comprehension', 'Listening', 'Grammar', 'Vocabulary'],
  80,
  120,
  'medium',
  '2025-01-25',
  '2025-04-30',
  true,
  300,
  156,
  500,
  'Gunakan headphone untuk section listening. Pastikan tidak ada gangguan selama tes.',
  ARRAY['Format soal TOEFL asli', 'Prediksi skor TOEFL', 'Materi pembelajaran', 'Konsultasi gratis'],
  'Siswa yang ingin melanjutkan studi ke luar negeri'
),
(
  'Try Out IPS Terpadu',
  'Try out komprehensif untuk siswa IPS mencakup Sejarah, Geografi, Ekonomi, dan Sosiologi',
  ARRAY['Sejarah', 'Geografi', 'Ekonomi', 'Sosiologi'],
  100,
  150,
  'medium',
  '2025-02-01',
  '2025-03-31',
  true,
  250,
  67,
  65,
  'Baca setiap soal dengan teliti. Manajemen waktu sangat penting dalam try out ini.',
  ARRAY['Soal terintegrasi antar mata pelajaran', 'Analisis per bidang studi', 'Rekomendasi belajar', 'Forum diskusi'],
  'Siswa kelas XI-XII jurusan IPS'
),
(
  'Try Out Saintek UTBK 2024',
  'Try out khusus untuk tes Saintek UTBK dengan soal-soal terbaru dan prediksi akurat',
  ARRAY['Matematika', 'Fisika', 'Kimia', 'Biologi'],
  80,
  105,
  'hard',
  '2025-02-10',
  '2025-04-15',
  true,
  400,
  298,
  55,
  'Fokus pada konsep dasar dan aplikasinya. Gunakan waktu dengan efisien.',
  ARRAY['Soal prediksi UTBK terbaru', 'Video pembahasan', 'Konsultasi dengan mentor', 'Simulasi CBT'],
  'Siswa kelas XII jurusan IPA yang akan mengikuti UTBK'
),
(
  'Try Out Soshum UTBK 2024',
  'Persiapan lengkap untuk tes Soshum UTBK dengan materi terkini',
  ARRAY['Sejarah', 'Geografi', 'Sosiologi', 'Ekonomi'],
  80,
  105,
  'medium',
  '2025-02-15',
  '2025-04-20',
  true,
  350,
  178,
  60,
  'Pahami konteks sejarah dan fenomena sosial. Analisis kritis sangat diperlukan.',
  ARRAY['Materi sesuai kisi-kisi UTBK', 'Analisis tren soal', 'Strategi pengerjaan', 'Grup belajar online'],
  'Siswa kelas XII jurusan IPS yang akan mengikuti UTBK'
);
