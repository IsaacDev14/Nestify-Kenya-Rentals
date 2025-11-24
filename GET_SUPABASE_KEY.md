# How to Get Your Supabase API Key

## The Problem
Your current `SUPABASE_KEY` is only 9 characters long, but it should be around 200+ characters.
The value "netify123" is NOT a valid Supabase API key.

## How to Get the Correct Key

### Step 1: Go to Supabase Dashboard
1. Open https://app.supabase.com
2. Sign in to your account
3. Select your project: `fvsunzvhisbwwcobxpyj`

### Step 2: Navigate to API Settings
1. Click on the **Settings** icon (⚙️) in the left sidebar
2. Click on **API** in the settings menu

### Step 3: Copy the Anon Key
You'll see two keys:
- **anon** / **public** key - This is what you need! (starts with `eyJ...`)
- **service_role** key - DO NOT use this for the frontend/general use

**Copy the `anon` key** - it should look something like:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ2c3VuenZoaXNid3djb2J4cHlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk...
```

### Step 4: Update Your .env File
Open `backend/.env` and update it:

```env
PORT=5000
SUPABASE_URL=https://fvsunzvhisbwwcobxpyj.supabase.co
SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ2c3VuenZoaXNid3djb2J4cHlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk... (your actual key here)
```

**IMPORTANT:** 
- Replace the entire `SUPABASE_KEY` value with your actual anon key
- The key should be very long (200+ characters)
- Do NOT use quotes around the key
- Make sure there are no spaces

### Step 5: Test the Connection
After updating the .env file, run:

```bash
npm run test:supabase
```

You should see:
- ✅ All tables exist
- ✅ Connection successful

### Step 6: Seed the Database
Once the connection works, run:

```bash
npm run seed
```

This will populate your database with categories and properties.

## Security Note
- Never commit your `.env` file to Git (it's already in `.gitignore`)
- Never share your API keys publicly
- The `anon` key is safe to use in frontend code (it has limited permissions)
- The `service_role` key should NEVER be exposed in frontend code

## Still Having Issues?
Make sure:
1. You copied the ENTIRE key (it's very long)
2. There are no extra spaces or line breaks
3. You're using the `anon` key, not the `service_role` key
4. Your Supabase project is active and not paused
