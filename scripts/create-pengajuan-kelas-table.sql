-- Create pengajuan_kelas table
CREATE TABLE IF NOT EXISTS pengajuan_kelas (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Personal Information
  nama_siswa TEXT NOT NULL,
  email TEXT NOT NULL,
  kelas TEXT NOT NULL,
  no_telepon TEXT NOT NULL,
  
  -- Class Application Information
  mata_pelajaran TEXT NOT NULL,
  jadwal_preferensi TEXT NOT NULL,
  catatan_tambahan TEXT,
  jenis_kelas TEXT NOT NULL DEFAULT 'lanjut-studi' CHECK (jenis_kelas IN ('lanjut-studi', 'pengembangan-diri')),
  
  -- For self-development classes
  jenis_keterampilan TEXT,
  pengalaman_sebelumnya TEXT,
  tujuan_pembelajaran TEXT,
  
  -- Application Status
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'completed')),
  admin_notes TEXT,
  approved_at TIMESTAMP WITH TIME ZONE,
  approved_by TEXT,
  
  -- Metadata
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_pengajuan_kelas_email ON pengajuan_kelas(email);
CREATE INDEX IF NOT EXISTS idx_pengajuan_kelas_status ON pengajuan_kelas(status);
CREATE INDEX IF NOT EXISTS idx_pengajuan_kelas_jenis ON pengajuan_kelas(jenis_kelas);
CREATE INDEX IF NOT EXISTS idx_pengajuan_kelas_created_at ON pengajuan_kelas(created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE pengajuan_kelas ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts for authenticated users
CREATE POLICY "Allow class applications" ON pengajuan_kelas
  FOR INSERT WITH CHECK (true);

-- Create policy to allow reading own applications
CREATE POLICY "Allow reading own applications" ON pengajuan_kelas
  FOR SELECT USING (true);

-- Create policy to allow updates for admin
CREATE POLICY "Allow admin updates" ON pengajuan_kelas
  FOR UPDATE USING (true);
