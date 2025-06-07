/*
  # Create clients table

  1. New Tables
    - `clients`
      - `id` (uuid, primary key)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
      - `first_name` (text)
      - `last_name` (text)
      - `email` (text)
      - `phone` (text)
      - `birthday` (date)
      - `birth_year` (integer)
      - `notes` (text)
      - `total_visits` (integer)
      - `total_spent` (numeric)
      - `last_visit` (timestamptz)

  2. Security
    - Enable RLS on `clients` table
    - Add policies for authenticated users to:
      - Read all clients
      - Insert new clients
      - Update existing clients
      - Delete clients
*/

CREATE TABLE IF NOT EXISTS clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  first_name text NOT NULL,
  last_name text,
  email text,
  phone text NOT NULL,
  birthday date,
  birth_year integer,
  notes text,
  total_visits integer DEFAULT 0,
  total_spent numeric DEFAULT 0,
  last_visit timestamptz
);

-- Enable Row Level Security
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read all clients"
  ON clients
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert clients"
  ON clients
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update clients"
  ON clients
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Users can delete clients"
  ON clients
  FOR DELETE
  TO authenticated
  USING (true);