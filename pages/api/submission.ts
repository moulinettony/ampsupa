const { createClient } = require('@supabase/supabase-js');
import type { NextApiRequest, NextApiResponse } from 'next';

const supabaseUrl = 'https://fhrfoqwkefquagndexwm.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZocmZvcXdrZWZxdWFnbmRleHdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDU1OTU5NzEsImV4cCI6MjAyMTE3MTk3MX0.5ON0qNM0qQ1wrkyo18NWAJUmHmRCniFKbp6_HCgf3jU';
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const { name, email } = req.body;
        const { data, error } = await supabase
            .from('users')
            .insert([{ name, email }]);

        if (error) {
            console.error('Error inserting data into Supabase:', error);
            res.status(500).json({ success: false, error: 'Error inserting data into Supabase' });
        } else {
            res.status(200).json({ success: true, "test" : data });
            console.log('testing data:', data);
    }
    } catch (error) {
        console.error('Error processing form submission:', error);
        res.status(500).json({ success: false, error: 'Error processing form submission' });
    }
}