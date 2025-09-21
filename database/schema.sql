-- Darak Website Database Schema
-- This file contains the SQL commands to set up the database tables

-- Create leads table
CREATE TABLE IF NOT EXISTS leads (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(255),
  service VARCHAR(100) NOT NULL,
  area VARCHAR(100) NOT NULL,
  message TEXT,
  status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'converted')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  client_name VARCHAR(255) NOT NULL,
  client_phone VARCHAR(20) NOT NULL,
  service VARCHAR(100) NOT NULL,
  area NUMERIC DEFAULT 0,
  budget NUMERIC,
  description TEXT,
  status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'completed')),
  start_date DATE,
  end_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at);
CREATE INDEX IF NOT EXISTS idx_leads_service ON leads(service);

CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects(created_at);
CREATE INDEX IF NOT EXISTS idx_projects_service ON projects(service);

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to automatically update updated_at
CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON leads
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data for testing (optional)
-- INSERT INTO leads (name, phone, email, service, area, message) VALUES
-- ('أحمد محمد', '+966501234567', 'ahmed@example.com', 'marble-ceramic', '100-200', 'أريد تشطيب صالة المنزل'),
-- ('فاطمة علي', '+966509876543', 'fatima@example.com', 'gypsum-board', '50-100', 'تركيب جبس بورد في غرفة النوم'),
-- ('محمد السعيد', '+966555555555', NULL, 'painting-plastering', 'أكثر من 1000', 'دهان المنزل كاملاً');

-- INSERT INTO projects (name, client_name, client_phone, service, area, budget, status) VALUES
-- ('تشطيب فيلا الرياض', 'عبدالله أحمد', '+966501111111', 'marble-ceramic', 500, 150000, 'in_progress'),
-- ('ديكور مكتب تجاري', 'شركة النور', '+966502222222', 'gypsum-board', 200, 80000, 'new'),
-- ('دهان شقة سكنية', 'سارة محمد', '+966503333333', 'painting-plastering', 120, 25000, 'completed');

