import dotenv from 'dotenv';
dotenv.config();
import { supabase } from './lib/supabase';

async function createTables() {
    console.log('\n🔧 Creating Supabase Tables...\n');

    // Note: Supabase doesn't allow DDL (CREATE TABLE) via the JS client
    // You MUST run the SQL in the Supabase SQL Editor

    console.log('⚠️  IMPORTANT: Tables cannot be created via the JavaScript client.\n');
    console.log('You MUST create tables using the Supabase SQL Editor:\n');
    console.log('1. Go to: https://app.supabase.com/project/fvsunzvhisbwwcobxpyj/sql/new');
    console.log('2. Copy the contents of: backend/supabase-schema.sql');
    console.log('3. Paste into the SQL Editor');
    console.log('4. Click "Run" or press Ctrl+Enter\n');

    // Test if tables exist
    console.log('🧪 Testing if tables exist...\n');

    const { data, error } = await supabase
        .from('Category')
        .select('count');

    if (error) {
        if (error.message.includes('relation') || error.message.includes('does not exist')) {
            console.log('❌ Tables DO NOT exist yet');
            console.log('\n📋 Quick Link:');
            console.log('   https://app.supabase.com/project/fvsunzvhisbwwcobxpyj/sql/new\n');
        } else {
            console.log('❌ Error:', error.message);
        }
    } else {
        console.log('✅ Tables exist! You can now run: npm run seed\n');
    }
}

createTables();
