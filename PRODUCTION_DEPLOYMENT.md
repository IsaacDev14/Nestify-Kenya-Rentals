# Production Deployment Guide

## Prerequisites
- Git repository connected to Render
- Production Supabase database credentials
- Render account with backend deployed

## Step 1: Deploy Backend Code to Production

The local backend has been updated with the `imageUrls` parsing fix. To deploy to production:

### Option A: Git Push (Recommended)
```bash
cd backend
git add src/routes/properties.ts
git commit -m "Fix imageUrls parsing to handle comma-separated strings"
git push origin main
```

Render will automatically detect the push and redeploy your backend.

### Option B: Manual Deploy via Render Dashboard
1. Go to your Render dashboard
2. Select your backend service (`nestify-homes-kenya`)
3. Click "Manual Deploy" → "Deploy latest commit"

## Step 2: Seed Production Database

### Update Production Environment Variables

Make sure your production backend on Render has these environment variables set:
- `SUPABASE_URL`: Your production Supabase URL
- `SUPABASE_KEY`: Your production Supabase anon/service key
- `PORT`: 5000 (or whatever Render assigns)

### Run Seed Script

You have two options:

#### Option A: Run Locally Against Production DB
1. Temporarily update `backend/.env` with production Supabase credentials:
   ```
   SUPABASE_URL=your_production_url
   SUPABASE_KEY=your_production_key
   ```

2. Run the seed script:
   ```bash
   cd backend
   node seed.js
   ```

3. Restore local credentials in `backend/.env`

#### Option B: Run on Render (if you have shell access)
```bash
# SSH into your Render instance (if available)
cd /opt/render/project/src
node seed.js
```

## Step 3: Verify Production Connection

1. Frontend `.env` is already set to:
   ```
   VITE_API_URL=https://nestify-homes-kenya.onrender.com/api
   ```

2. Open `http://localhost:5173` in your browser

3. You should see all 40 properties loaded from production

4. Test the category filters (Beachfront, Cabins, etc.)

## Troubleshooting

### CORS Errors
- The backend uses `app.use(cors())` which allows all origins
- If you still see CORS errors, check Render logs

### 500 Errors
- Check Render logs for the backend
- Verify the `imageUrls` fix was deployed
- Verify the database was seeded correctly

### No Data
- Verify the seed script ran successfully
- Check Supabase dashboard to confirm data exists
- Check the `Property` and `Category` tables

## Current Status

✅ Frontend `.env` updated to production URL  
✅ Backend CORS configured correctly  
✅ Backend `imageUrls` fix applied locally  
⏳ Backend code needs to be pushed to Git/Render  
⏳ Production database needs to be seeded  

## Next Steps

1. Push backend code to Git (triggers Render deployment)
2. Wait for Render to finish deploying (~2-3 minutes)
3. Seed the production database using one of the methods above
4. Test the frontend connection
