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
function createTables() {
    return __awaiter(this, void 0, void 0, function* () {
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
        const { data, error } = yield supabase_1.supabase
            .from('Category')
            .select('count');
        if (error) {
            if (error.message.includes('relation') || error.message.includes('does not exist')) {
                console.log('❌ Tables DO NOT exist yet');
                console.log('\n📋 Quick Link:');
                console.log('   https://app.supabase.com/project/fvsunzvhisbwwcobxpyj/sql/new\n');
            }
            else {
                console.log('❌ Error:', error.message);
            }
        }
        else {
            console.log('✅ Tables exist! You can now run: npm run seed\n');
        }
    });
}
createTables();
