# Supabase Setup Instructions

## Step 1: Create Tables in Supabase

1. Go to your Supabase project dashboard: https://app.supabase.com
2. Navigate to the **SQL Editor** in the left sidebar
3. Copy the contents of `backend/supabase-schema.sql`
4. Paste it into the SQL Editor
5. Click **Run** to execute the SQL script

This will create all the necessary tables:
- User
- Category
- Property
- Review
- Booking
- Message

## Step 2: Configure Environment Variables

Make sure your `backend/.env` file contains:

```env
PORT=5000
SUPABASE_URL=https://fvsunzvhisbwwcobxpyj.supabase.co
SUPABASE_KEY=your_supabase_anon_key_here
```

**Important:** Replace `your_supabase_anon_key_here` with your actual Supabase anon/public key.

To find your Supabase keys:
1. Go to your Supabase project dashboard
2. Click on **Settings** (gear icon) in the left sidebar
3. Click on **API**
4. Copy the `anon` `public` key (NOT the `service_role` key for security)

## Step 3: Seed the Database

Once the tables are created and environment variables are set, run:

```bash
cd backend
npm run seed
```

This will populate your Supabase database with:
- 12 categories (Amazing views, Beachfront, Cabins, etc.)
- 10 properties with images, descriptions, and ratings

## Step 4: Configure Render Environment Variables

For deployment on Render, add these environment variables in your Render dashboard:

1. Go to your Render service
2. Navigate to **Environment**
3. Add the following variables:
   - `SUPABASE_URL`: `https://fvsunzvhisbwwcobxpyj.supabase.co`
   - `SUPABASE_KEY`: Your Supabase anon key
   - `PORT`: `5000` (optional, Render sets this automatically)

## Step 5: Deploy

Push your changes to GitHub:

```bash
git add .
git commit -m "Migrate to Supabase"
git push
```

Render will automatically redeploy your backend with the new Supabase configuration.

## Verification

Test your backend locally:

```bash
cd backend
npm run dev
```

Then visit:
- http://localhost:5000 - Should show "KenyaRentals API is running"
- http://localhost:5000/api/categories - Should return all categories
- http://localhost:5000/api/properties - Should return all properties
- http://localhost:5000/test-supabase - Should return user data (if any users exist)

## Troubleshooting

If seeding fails:
1. Verify your `SUPABASE_KEY` is correct in `.env`
2. Check that all tables were created successfully in Supabase
3. Ensure Row Level Security (RLS) policies allow inserts (the schema includes permissive policies for development)

If you need to reset the database:
1. Run the SQL script again in Supabase (it will drop and recreate tables)
2. Run `npm run seed` again
