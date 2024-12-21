import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://hagyhnwznyqtcogjkyqk.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhhZ3lobnd6bnlxdGNvZ2preXFrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ1MTg0MTQsImV4cCI6MjA1MDA5NDQxNH0.MsUW93bb9-RaKLk-fZv7kI2RvX8xn0Bv8S5b1LQGwlw'

export const supabase = createClient(supabaseUrl, supabaseKey)

export interface Product {
  id: number
  name: string
  description: string
  price: number
  image: string
  rating: number
  vatRate?: number | null
  created_at?: string
}

// Helper function to check if we're in the admin panel
export const isAdminRoute = () => window.location.pathname.startsWith('/admin')