-- Add link_tryout column to existing tryout table
ALTER TABLE tryout ADD COLUMN IF NOT EXISTS link_tryout TEXT;

-- Update existing data with sample links
UPDATE tryout SET link_tryout = 'https://tryout.example.com/utbk-sbmptn-2024' WHERE title = 'UTBK SBMPTN 2024';
UPDATE tryout SET link_tryout = 'https://tryout.example.com/matematika-ipa-intensif' WHERE title = 'Matematika IPA Intensif';
UPDATE tryout SET link_tryout = 'https://tryout.example.com/toefl-preparation' WHERE title = 'TOEFL Preparation Test';
UPDATE tryout SET link_tryout = 'https://tryout.example.com/ips-terpadu' WHERE title = 'Try Out IPS Terpadu';
UPDATE tryout SET link_tryout = 'https://tryout.example.com/saintek-utbk' WHERE title = 'Try Out Saintek UTBK';
UPDATE tryout SET link_tryout = 'https://tryout.example.com/soshum-utbk' WHERE title = 'Try Out Soshum UTBK';

-- Add some new tryout data with links
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
  link_tryout
) VALUES 
(
  'Try Out Bahasa Indonesia UTBK',
  'Latihan soal Bahasa Indonesia untuk persiapan UTBK dengan fokus pada pemahaman bacaan dan tata bahasa',
  ARRAY['Bahasa Indonesia', 'Pemahaman Bacaan', 'Tata Bahasa'],
  50,
  90,
  'medium',
  '2024-01-15 08:00:00+07',
  '2024-12-31 23:59:59+07',
  true,
  200,
  45,
  70,
  'Baca setiap soal dengan teliti. Pilih jawaban yang paling tepat.',
  ARRAY['Analisis hasil detail', 'Pembahasan lengkap', 'Ranking nasional'],
  'https://tryout.example.com/bahasa-indonesia-utbk'
),
(
  'Try Out Fisika Dasar',
  'Try out khusus mata pelajaran Fisika dengan soal-soal konsep dasar hingga aplikasi',
  ARRAY['Fisika', 'Mekanika', 'Termodinamika', 'Listrik'],
  40,
  120,
  'hard',
  '2024-01-10 09:00:00+07',
  '2024-12-25 18:00:00+07',
  true,
  150,
  89,
  75,
  'Gunakan rumus dengan benar. Perhatikan satuan dalam setiap perhitungan.',
  ARRAY['Pembahasan rumus', 'Tips mengerjakan', 'Bank soal tambahan'],
  'https://tryout.example.com/fisika-dasar'
);
