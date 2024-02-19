const { createClient } = require('@supabase/supabase-js');
import type { NextApiRequest, NextApiResponse } from 'next';
import { parse } from 'querystring';

const supabaseUrl = 'https://fhrfoqwkefquagndexwm.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZocmZvcXdrZWZxdWFnbmRleHdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDU1OTU5NzEsImV4cCI6MjAyMTE3MTk3MX0.5ON0qNM0qQ1wrkyo18NWAJUmHmRCniFKbp6_HCgf3jU';
const supabase = createClient(supabaseUrl, supabaseKey);

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    res.setHeader('Access-Control-Allow-Origin', 'https://rolling.mydopweb.com');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    if (req.method === 'POST') {
      // Manually parse the request body
      let body = '';
      req.on('data', (chunk) => {
        body += chunk.toString();
      });
      await new Promise((resolve) => req.on('end', resolve));
  
      const parsedBody = parse(body);
      const { name, email } = parsedBody;
  
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