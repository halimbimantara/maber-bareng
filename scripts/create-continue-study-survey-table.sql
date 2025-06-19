-- Create continue study survey responses table
CREATE TABLE IF NOT EXISTS continue_study_survey_responses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Personal Information
  nama_siswa TEXT NOT NULL,
  email TEXT NOT NULL,
  kelas TEXT NOT NULL,
  no_telepon TEXT NOT NULL,
  
  -- Continue Study Survey Questions
  jenis_pendidikan_tinggi TEXT,
  bidang_studi TEXT,
  sudah_memilih_pt TEXT,
  tantangan_terbesar TEXT,
  
  -- Metadata
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_continue_study_survey_email ON continue_study_survey_responses(email);
CREATE INDEX IF NOT EXISTS idx_continue_study_survey_kelas ON continue_study_survey_responses(kelas);
CREATE INDEX IF NOT EXISTS idx_continue_study_survey_created_at ON continue_study_survey_responses(created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE continue_study_survey_responses ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts for authenticated users
CREATE POLICY "Allow continue study survey submissions" ON continue_study_survey_responses
  FOR INSERT WITH CHECK (true);

-- Create policy to allow reading own submissions
CREATE POLICY "Allow reading own continue study submissions" ON continue_study_survey_responses
  FOR SELECT USING (true);
