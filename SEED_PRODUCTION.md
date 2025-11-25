# Quick Start: Seed Production Database

## Step 1: Get Your Production Supabase Credentials

You need:
- Production Supabase URL
- Production Supabase Service Key (or anon key)

Find these in your Supabase project dashboard under Settings → API.

## Step 2: Temporarily Update backend/.env

Open `backend/.env` and temporarily replace with your production credentials:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-production-service-key
```

## Step 3: Run the Seed Script

```bash
cd backend
node seed.js
```

You should see output like:
```
🌱 Starting database seed...
🗑️  Clearing existing data...
✅ Existing data cleared

📂 Inserting categories...
✅ Inserted 10 categories

🏠 Inserting properties...
✅ Inserted 40 properties

📊 Seed Summary:
   Categories: 10
   Properties: 40

✨ Database seeded successfully!
```

## Step 4: Restore Local Credentials

After seeding, restore your local credentials in `backend/.env`:

```env
SUPABASE_URL=your-local-supabase-url
SUPABASE_KEY=your-local-supabase-key
```

## Step 5: Test the Connection

1. Make sure frontend `.env` has:
   ```
   VITE_API_URL=https://nestify-homes-kenya.onrender.com/api
   ```

2. Open `http://localhost:5173` in your browser

3. You should see all 40 properties loaded from production!

## Troubleshooting

- **Error: Invalid API key**: Check your Supabase credentials
- **Error: Tables don't exist**: Run the schema SQL in Supabase SQL Editor first
- **No properties showing**: Wait 2-3 minutes for Render to finish deploying the backend
