const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

console.log('\n=== SUPABASE CONNECTION TEST ===\n');
console.log('URL:', supabaseUrl);
console.log('Key:', supabaseKey ? `SET (${supabaseKey.substring(0, 20)}...)` : 'NOT SET');
console.log('\n');

if (!supabaseUrl || !supabaseKey) {
    console.log('ERROR: Missing environment variables!');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
    try {
        // Test Category table
        const { data: cats, error: catErr } = await supabase.from('Category').select('count');
        console.log('Category table:', catErr ? `ERROR: ${catErr.message}` : `OK - ${JSON.stringify(cats)}`);

        // Test Property table  
        const { data: props, error: propErr } = await supabase.from('Property').select('count');
        console.log('Property table:', propErr ? `ERROR: ${propErr.message}` : `OK - ${JSON.stringify(props)}`);

        console.log('\n');
        if (catErr || propErr) {
            console.log('TABLES DO NOT EXIST - Run supabase-schema.sql in Supabase SQL Editor');
        } else {
            console.log('SUCCESS - Tables exist! Run npm run seed if no data');
        }
    } catch (e) {
        console.log('CONNECTION ERROR:', e.message);
    }
}

test();
