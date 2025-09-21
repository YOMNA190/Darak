import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Client for browser usage
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Admin client for server-side operations
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey)

// Database types
export interface Lead {
  id?: number
  name: string
  phone: string
  email?: string
  service: string
  area: number
  message?: string
  status: 'new' | 'contacted' | 'converted'
  created_at?: string
}

export interface Project {
  id?: number
  name: string
  client_name: string
  client_phone: string
  service: string
  area: number
  status: 'new' | 'in_progress' | 'completed'
  start_date?: string
  end_date?: string
  budget?: number
  description?: string
  created_at?: string
  updated_at?: string
}

// Database initialization SQL
export const initializeDatabase = async () => {
  const { error: leadsError } = await supabaseAdmin.rpc('create_leads_table')
  const { error: projectsError } = await supabaseAdmin.rpc('create_projects_table')
  
  if (leadsError) console.error('Error creating leads table:', leadsError)
  if (projectsError) console.error('Error creating projects table:', projectsError)
}

