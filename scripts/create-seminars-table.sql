-- Create seminars table
CREATE TABLE IF NOT EXISTS seminars (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Seminar Information
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  speaker TEXT NOT NULL,
  date DATE NOT NULL,
  time_start TIME NOT NULL,
  time_end TIME NOT NULL,
  location TEXT NOT NULL,
  max_participants INTEGER NOT NULL DEFAULT 50,
  current_participants INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'full', 'cancelled', 'completed')),
  category TEXT NOT NULL DEFAULT 'pengembangan-diri',
  
  -- Additional Information
  requirements TEXT,
  benefits TEXT[],
  image_url TEXT,
  registration_deadline DATE,
  
  -- Metadata
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_seminars_date ON seminars(date);
CREATE INDEX IF NOT EXISTS idx_seminars_status ON seminars(status);
CREATE INDEX IF NOT EXISTS idx_seminars_category ON seminars(category);

-- Enable Row Level Security (RLS)
ALTER TABLE seminars ENABLE ROW LEVEL SECURITY;

-- Create policy to allow reading seminars
CREATE POLICY "Allow reading seminars" ON seminars
  FOR SELECT USING (true);

-- Create policy to allow inserting seminars (for admin)
CREATE POLICY "Allow inserting seminars" ON seminars
  FOR INSERT WITH CHECK (true);

-- Create policy to allow updating seminars (for admin)
CREATE POLICY "Allow updating seminars" ON seminars
  FOR UPDATE USING (true);

-- Insert sample data
INSERT INTO seminars (
  title, 
  description, 
  speaker, 
  date, 
  time_start, 
  time_end, 
  location, 
  max_participants, 
  current_participants, 
  status,
  requirements,
  benefits,
  registration_deadline
) VALUES 
(
  'Membangun Kepercayaan Diri',
  'Seminar tentang cara membangun kepercayaan diri untuk menghadapi masa depan dan tantangan hidup',
  'Dr. Sarah Wijaya, M.Psi',
  '2025-01-25',
  '14:00',
  '16:00',
  'Aula Sekolah',
  30,
  12,
  'available',
  'Siswa kelas X, XI, XII',
  ARRAY['Meningkatkan rasa percaya diri', 'Teknik mengatasi rasa takut', 'Strategi komunikasi efektif'],
  '2025-01-23'
),
(
  'Keterampilan Komunikasi Efektif',
  'Belajar teknik komunikasi yang efektif untuk kehidupan sehari-hari dan persiapan karir masa depan',
  'Prof. Ahmad Santoso, M.Kom',
  '2025-02-02',
  '09:00',
  '11:00',
  'Online (Zoom)',
  50,
  35,
  'available',
  'Memiliki akses internet stabil',
  ARRAY['Teknik presentasi yang baik', 'Komunikasi interpersonal', 'Public speaking'],
  '2025-01-31'
),
(
  'Manajemen Waktu untuk Pelajar',
  'Tips dan trik mengelola waktu secara efektif untuk meningkatkan produktivitas belajar dan aktivitas',
  'Dra. Lisa Permata, S.Pd',
  '2025-02-15',
  '13:00',
  '15:00',
  'Lab Komputer',
  25,
  25,
  'full',
  'Membawa laptop/notebook',
  ARRAY['Teknik time management', 'Prioritas tugas', 'Work-life balance'],
  '2025-02-13'
),
(
  'Entrepreneurship untuk Remaja',
  'Memahami dasar-dasar kewirausahaan dan cara memulai bisnis sederhana di usia muda',
  'Budi Hartono, S.E., M.M',
  '2025-02-20',
  '10:00',
  '12:00',
  'Ruang Serbaguna',
  40,
  8,
  'available',
  'Minat dalam bidang bisnis',
  ARRAY['Mindset entrepreneur', 'Ide bisnis kreatif', 'Marketing dasar'],
  '2025-02-18'
),
(
  'Digital Marketing untuk Pemula',
  'Pengenalan dunia digital marketing dan strategi promosi online yang efektif',
  'Rina Sari, S.Kom',
  '2025-03-05',
  '15:30',
  '17:30',
  'Online (Google Meet)',
  60,
  42,
  'available',
  'Smartphone atau laptop',
  ARRAY['Social media marketing', 'Content creation', 'Online branding'],
  '2025-03-03'
);
