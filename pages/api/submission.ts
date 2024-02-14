const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://fhrfoqwkefquagndexwm.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZocmZvcXdrZWZxdWFnbmRleHdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDU1OTU5NzEsImV4cCI6MjAyMTE3MTk3MX0.5ON0qNM0qQ1wrkyo18NWAJUmHmRCniFKbp6_HCgf3jU';
const supabase = createClient(supabaseUrl, supabaseKey);

exports.handler = async (event:any) => {
    try {
      const body = JSON.parse(event.body);
      const { name, email } = body;
      
      const { data, error } = await supabase
        .from('your_table_name')
        .insert([{ name, email }]);
        
      if (error) {
        throw error;
      }
      
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*', // Allow requests from any origin
          'Access-Control-Allow-Methods': 'POST', // Allow only POST requests
          'Access-Control-Allow-Headers': 'Content-Type', // Allow Content-Type header
        },
        body: JSON.stringify({ success: true, data }),
      };
    } catch (error) {
      return {
        statusCode: 500,
        headers: {
          'Access-Control-Allow-Origin': '*', // Allow requests from any origin
          'Access-Control-Allow-Methods': 'POST', // Allow only POST requests
          'Access-Control-Allow-Headers': 'Content-Type', // Allow Content-Type header
        },
        body: JSON.stringify({ success: false, error: 'Error inserting data into Supabase' }),
      };
    }
  };