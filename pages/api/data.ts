import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = 'https://fhrfoqwkefquagndexwm.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZocmZvcXdrZWZxdWFnbmRleHdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDU1OTU5NzEsImV4cCI6MjAyMTE3MTk3MX0.5ON0qNM0qQ1wrkyo18NWAJUmHmRCniFKbp6_HCgf3jU';
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        // Set CORS headers to allow requests from any origin
        res.setHeader('Access-Control-Allow-Origin', 'https://rolling.mydopweb.com');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        res.setHeader('Access-Control-Allow-Credentials', 'true');

        if (req.method === 'OPTIONS') {
            // Preflight request, respond with 200
            return res.status(200).end();
        }

        let query = supabase.from('users').select('*');

        // Filter by age if provided
        if (req.method === 'GET' && req.query.age) {
            query = query.eq('age', req.query.age);
        }

        const { data, error } = await query;

        if (error) {
            throw error;
        }

        const responseData = {
            items: data
        };

        res.status(200).json(responseData);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching data from Supabase' });
    }
}