-- Create survey responses table
CREATE TABLE IF NOT EXISTS survey_responses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Personal Information
  nama_siswa TEXT NOT NULL,
  email TEXT NOT NULL,
  kelas TEXT NOT NULL,
  no_telepon TEXT NOT NULL,
  
  -- Survey Questions
  rencana_setelah_lulus TEXT,
  tujuan_karir TEXT,
  faktor_utama TEXT,
  informasi_bimbingan TEXT,
  dukungan_dibutuhkan TEXT,
  kesiapan_menghadapi TEXT,
  harapan_masa_depan TEXT,
  
  -- Metadata
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_survey_responses_email ON survey_responses(email);
CREATE INDEX IF NOT EXISTS idx_survey_responses_kelas ON survey_responses(kelas);
CREATE INDEX IF NOT EXISTS idx_survey_responses_created_at ON survey_responses(created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE survey_responses ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts for authenticated users
CREATE POLICY "Allow survey submissions" ON survey_responses
  FOR INSERT WITH CHECK (true);

-- Create policy to allow reading own submissions
CREATE POLICY "Allow reading own submissions" ON survey_responses
  FOR SELECT USING (true);
