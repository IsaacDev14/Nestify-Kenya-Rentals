"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const supabase_1 = require("./lib/supabase");
function testSupabaseConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('🔍 Testing Supabase Connection...\n');
        // Check environment variables
        console.log('📋 Environment Variables:');
        console.log(`   SUPABASE_URL: ${process.env.SUPABASE_URL || '❌ NOT SET'}`);
        console.log(`   SUPABASE_KEY: ${process.env.SUPABASE_KEY ? '✅ SET (length: ' + process.env.SUPABASE_KEY.length + ')' : '❌ NOT SET'}\n`);
        if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
            console.error('❌ Missing environment variables! Please check your .env file.\n');
            process.exit(1);
        }
        try {
            // Test 1: Check Category table
            console.log('🧪 Test 1: Checking Category table...');
            const { data: categories, error: catError } = yield supabase_1.supabase
                .from('Category')
                .select('*')
                .limit(5);
            if (catError) {
                console.error('❌ Category table error:', catError.message);
                if (catError.message.includes('relation') || catError.message.includes('does not exist')) {
                    console.log('\n⚠️  Tables do not exist in Supabase!');
                    console.log('📝 Please run the SQL script in Supabase:');
                    console.log('   1. Go to https://app.supabase.com');
                    console.log('   2. Open SQL Editor');
                    console.log('   3. Copy contents of backend/supabase-schema.sql');
                    console.log('   4. Paste and click Run\n');
                }
            }
            else {
                console.log(`✅ Category table exists! Found ${(categories === null || categories === void 0 ? void 0 : categories.length) || 0} categories`);
                if (categories && categories.length > 0) {
                    console.log(`   Sample: ${categories[0].name}`);
                }
            }
            // Test 2: Check Property table
            console.log('\n🧪 Test 2: Checking Property table...');
            const { data: properties, error: propError } = yield supabase_1.supabase
                .from('Property')
                .select('*')
                .limit(5);
            if (propError) {
                console.error('❌ Property table error:', propError.message);
            }
            else {
                console.log(`✅ Property table exists! Found ${(properties === null || properties === void 0 ? void 0 : properties.length) || 0} properties`);
                if (properties && properties.length > 0) {
                    console.log(`   Sample: ${properties[0].name} - ${properties[0].location}`);
                }
            }
            // Test 3: Check User table
            console.log('\n🧪 Test 3: Checking User table...');
            const { data: users, error: userError } = yield supabase_1.supabase
                .from('User')
                .select('*')
                .limit(1);
            if (userError) {
                console.error('❌ User table error:', userError.message);
            }
            else {
                console.log(`✅ User table exists! Found ${(users === null || users === void 0 ? void 0 : users.length) || 0} users`);
            }
            // Test 4: Check Booking table
            console.log('\n🧪 Test 4: Checking Booking table...');
            const { data: bookings, error: bookingError } = yield supabase_1.supabase
                .from('Booking')
                .select('*')
                .limit(1);
            if (bookingError) {
                console.error('❌ Booking table error:', bookingError.message);
            }
            else {
                console.log(`✅ Booking table exists! Found ${(bookings === null || bookings === void 0 ? void 0 : bookings.length) || 0} bookings`);
            }
            // Test 5: Check Message table
            console.log('\n🧪 Test 5: Checking Message table...');
            const { data: messages, error: messageError } = yield supabase_1.supabase
                .from('Message')
                .select('*')
                .limit(1);
            if (messageError) {
                console.error('❌ Message table error:', messageError.message);
            }
            else {
                console.log(`✅ Message table exists! Found ${(messages === null || messages === void 0 ? void 0 : messages.length) || 0} messages`);
            }
            // Summary
            console.log('\n' + '='.repeat(50));
            console.log('📊 SUMMARY:');
            console.log('='.repeat(50));
            const hasCategories = categories && categories.length > 0;
            const hasProperties = properties && properties.length > 0;
            if (!catError && !propError) {
                console.log('✅ All tables exist in Supabase');
                if (hasCategories && hasProperties) {
                    console.log('✅ Database is seeded with data');
                    console.log(`   - ${categories.length} categories`);
                    console.log(`   - ${properties.length} properties`);
                    console.log('\n🎉 Your Supabase database is ready!');
                }
                else {
                    console.log('⚠️  Tables exist but no data found');
                    console.log('\n📝 Run the seed script:');
                    console.log('   npm run seed\n');
                }
            }
            else {
                console.log('❌ Some tables are missing');
                console.log('\n📝 Please create tables first:');
                console.log('   1. Open Supabase SQL Editor');
                console.log('   2. Run backend/supabase-schema.sql');
                console.log('   3. Then run: npm run seed\n');
            }
        }
        catch (error) {
            console.error('\n❌ Connection Error:', error.message);
            console.log('\n🔧 Troubleshooting:');
            console.log('   1. Check your SUPABASE_URL is correct');
            console.log('   2. Check your SUPABASE_KEY is the anon/public key');
            console.log('   3. Verify your Supabase project is active\n');
        }
    });
}
testSupabaseConnection()
    .then(() => {
    console.log('\n✅ Test completed');
    process.exit(0);
})
    .catch((error) => {
    console.error('\n❌ Test failed:', error);
    process.exit(1);
});
