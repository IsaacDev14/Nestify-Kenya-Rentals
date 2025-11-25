-- Add missing columns to Booking table
-- Run this in your Supabase SQL Editor

ALTER TABLE "Booking" 
ADD COLUMN IF NOT EXISTS guests INTEGER DEFAULT 1,
ADD COLUMN IF NOT EXISTS "totalPrice" DECIMAL(10,2) DEFAULT 0;

-- Add index for better query performance
CREATE INDEX IF NOT EXISTS idx_booking_dates ON "Booking"("startDate", "endDate");
