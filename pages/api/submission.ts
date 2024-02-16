const { createClient } = require('@supabase/supabase-js');
import type { NextApiRequest, NextApiResponse } from 'next';

const supabaseUrl = 'https://fhrfoqwkefquagndexwm.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZocmZvcXdrZWZxdWFnbmRleHdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDU1OTU5NzEsImV4cCI6MjAyMTE3MTk3MX0.5ON0qNM0qQ1wrkyo18NWAJUmHmRCniFKbp6_HCgf3jU';
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'POST') {
      const { name, email } = req.body;
  
      const { data, error } = await supabase
        .from('users')
        .insert([{ name, email }]);
  
      if (error) {
        return res.status(400).json({ error: error.message });
      }
  
      return res.status(200).json(data);
    }
  
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }