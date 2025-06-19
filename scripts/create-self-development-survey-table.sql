-- Create self development survey responses table
CREATE TABLE IF NOT EXISTS self_development_survey_responses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Personal Information
  nama_siswa TEXT NOT NULL,
  email TEXT NOT NULL,
  kelas TEXT NOT NULL,
  no_telepon TEXT NOT NULL,
  
  -- Self Development Survey Questions
  jenis_pekerjaan_diminati TEXT,
  keterampilan_sertifikasi TEXT,
  tantangan_terbesar_kerja TEXT,
  bidang_keahlian_non_teknis TEXT,
  
  -- Metadata
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_self_dev_survey_email ON self_development_survey_responses(email);
CREATE INDEX IF NOT EXISTS idx_self_dev_survey_kelas ON self_development_survey_responses(kelas);
CREATE INDEX IF NOT EXISTS idx_self_dev_survey_created_at ON self_development_survey_responses(created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE self_development_survey_responses ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts for authenticated users
CREATE POLICY "Allow self development survey submissions" ON self_development_survey_responses
  FOR INSERT WITH CHECK (true);

-- Create policy to allow reading own submissions
CREATE POLICY "Allow reading own self development submissions" ON self_development_survey_responses
  FOR SELECT USING (true);
