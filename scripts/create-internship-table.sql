-- Create internship table
CREATE TABLE IF NOT EXISTS internship (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    duration VARCHAR(100) NOT NULL,
    location VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('Full-time', 'Part-time', 'Remote', 'Hybrid')),
    requirements TEXT NOT NULL,
    description TEXT NOT NULL,
    is_active BOOLEAN DEFAULT true,
    max_participants INTEGER DEFAULT 50,
    current_participants INTEGER DEFAULT 0,
    start_date DATE,
    end_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_internship_updated_at BEFORE UPDATE
    ON internship FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data
INSERT INTO internship (
    title, 
    company, 
    duration, 
    location, 
    type, 
    requirements, 
    description,
    max_participants,
    current_participants,
    start_date,
    end_date
) VALUES 
(
    'Magang IT Support',
    'PT. Teknologi Maju',
    '3 bulan',
    'Jakarta Selatan',
    'Part-time',
    'SMK/SMA jurusan TKJ atau setara',
    'Belajar troubleshooting komputer dan jaringan',
    30,
    12,
    '2024-02-01',
    '2024-04-30'
),
(
    'Magang Marketing Digital',
    'CV. Kreatif Media',
    '2 bulan',
    'Bandung',
    'Full-time',
    'Minat di bidang marketing dan sosial media',
    'Mengelola konten sosial media dan kampanye digital',
    25,
    8,
    '2024-01-15',
    '2024-03-15'
),
(
    'Magang Administrasi',
    'Koperasi Sejahtera',
    '1 bulan',
    'Surabaya',
    'Part-time',
    'Teliti dan dapat menggunakan MS Office',
    'Membantu kegiatan administrasi dan dokumentasi',
    20,
    15,
    '2024-01-20',
    '2024-02-20'
),
(
    'Magang Web Development',
    'PT. Digital Solusi',
    '4 bulan',
    'Jakarta Pusat',
    'Full-time',
    'Menguasai HTML, CSS, JavaScript dasar',
    'Mengembangkan website dan aplikasi web sederhana',
    15,
    5,
    '2024-02-15',
    '2024-06-15'
),
(
    'Magang Desain Grafis',
    'Studio Kreatif Nusantara',
    '3 bulan',
    'Yogyakarta',
    'Hybrid',
    'Menguasai Adobe Photoshop dan Illustrator',
    'Membuat desain untuk media promosi dan branding',
    20,
    10,
    '2024-01-25',
    '2024-04-25'
),
(
    'Magang Customer Service',
    'PT. Layanan Prima',
    '2 bulan',
    'Medan',
    'Full-time',
    'Komunikasi baik dan sabar dalam melayani',
    'Menangani keluhan dan pertanyaan pelanggan',
    25,
    18,
    '2024-02-01',
    '2024-03-31'
);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_internship_active ON internship(is_active);
CREATE INDEX IF NOT EXISTS idx_internship_type ON internship(type);
CREATE INDEX IF NOT EXISTS idx_internship_location ON internship(location);
