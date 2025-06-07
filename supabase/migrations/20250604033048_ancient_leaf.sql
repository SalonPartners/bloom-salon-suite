/*
  # Create clients table

  1. New Tables
    - `clients`
      - `id` (uuid, primary key)
      - `first_name` (text, required)
      - `last_name` (text)
      - `email` (text)
      - `phone` (text, required)
      - `birthday` (date)
      - `birth_year` (integer)
      - `total_spent` (numeric, default 0)
      - `total_visits` (integer, default 0)
      - `last_visit` (timestamptz)
      - `notes` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `clients` table
    - Add policies for authenticated users to manage their clients
*/

CREATE TABLE IF NOT EXISTS clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text,
  email text,
  phone text NOT NULL,
  birthday date,
  birth_year integer,
  total_spent numeric DEFAULT 0,
  total_visits integer DEFAULT 0,
  last_visit timestamptz,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE clients ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to read all clients
CREATE POLICY "Users can read all clients"
  ON clients
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow authenticated users to insert clients
CREATE POLICY "Users can insert clients"
  ON clients
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow authenticated users to update their clients
CREATE POLICY "Users can update clients"
  ON clients
  FOR UPDATE
  TO authenticated
  USING (true);

-- Allow authenticated users to delete their clients
CREATE POLICY "Users can delete clients"
  ON clients
  FOR DELETE
  TO authenticated
  USING (true);