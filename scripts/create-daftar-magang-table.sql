-- Create daftar_magang table
CREATE TABLE IF NOT EXISTS daftar_magang (
    id SERIAL PRIMARY KEY,
    internship_id INTEGER NOT NULL REFERENCES internship(id) ON DELETE CASCADE,
    nama VARCHAR(255) NOT NULL,
    no_wa VARCHAR(20) NOT NULL,
    kelas VARCHAR(100) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'completed')),
    tanggal_daftar TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    catatan TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create trigger for updated_at
CREATE TRIGGER update_daftar_magang_updated_at BEFORE UPDATE
    ON daftar_magang FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_daftar_magang_internship_id ON daftar_magang(internship_id);
CREATE INDEX IF NOT EXISTS idx_daftar_magang_status ON daftar_magang(status);
CREATE INDEX IF NOT EXISTS idx_daftar_magang_tanggal ON daftar_magang(tanggal_daftar);

-- Insert sample registration data
INSERT INTO daftar_magang (internship_id, nama, no_wa, kelas, status, catatan) VALUES 
(1, 'Ahmad Rizki', '081234567890', 'XII TKJ A', 'approved', 'Siswa berprestasi dengan nilai tinggi'),
(1, 'Siti Nurhaliza', '081234567891', 'XII TKJ B', 'pending', 'Menunggu konfirmasi dari perusahaan'),
(2, 'Budi Santoso', '081234567892', 'XII MM A', 'approved', 'Memiliki pengalaman mengelola media sosial sekolah'),
(2, 'Dewi Lestari', '081234567893', 'XII MM B', 'pending', 'Portfolio desain grafis yang menarik'),
(3, 'Andi Pratama', '081234567894', 'XII OTKP A', 'completed', 'Telah menyelesaikan magang dengan baik'),
(4, 'Maya Sari', '081234567895', 'XII RPL A', 'approved', 'Menguasai dasar-dasar programming'),
(5, 'Riko Firmansyah', '081234567896', 'XII DKV A', 'pending', 'Portfolio desain yang kreatif');
