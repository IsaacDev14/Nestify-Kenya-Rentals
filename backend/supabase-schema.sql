-- Supabase Schema Migration
-- Run this in your Supabase SQL Editor to create all tables

-- Drop existing tables if they exist (be careful in production!)
DROP TABLE IF EXISTS "Review" CASCADE;
DROP TABLE IF EXISTS "Booking" CASCADE;
DROP TABLE IF EXISTS "Property" CASCADE;
DROP TABLE IF EXISTS "Category" CASCADE;
DROP TABLE IF EXISTS "User" CASCADE;
DROP TABLE IF EXISTS "Message" CASCADE;

-- Create User table
CREATE TABLE "User" (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NOW()
);

-- Create Category table
CREATE TABLE "Category" (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) UNIQUE NOT NULL,
  icon TEXT NOT NULL
);

-- Create Property table
CREATE TABLE "Property" (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL,
  price VARCHAR(100) NOT NULL,
  "imageUrls" TEXT NOT NULL,
  description TEXT NOT NULL,
  rating DECIMAL(3,2) DEFAULT 0,
  "reviewCount" INTEGER DEFAULT 0,
  "isGuestFavorite" BOOLEAN DEFAULT FALSE,
  "categoryId" INTEGER REFERENCES "Category"(id) ON DELETE SET NULL,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NOW()
);

-- Create Review table
CREATE TABLE "Review" (
  id SERIAL PRIMARY KEY,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  "userId" INTEGER NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
  "propertyId" INTEGER NOT NULL REFERENCES "Property"(id) ON DELETE CASCADE,
  "createdAt" TIMESTAMP DEFAULT NOW()
);

-- Create Booking table
CREATE TABLE "Booking" (
  id SERIAL PRIMARY KEY,
  "startDate" TIMESTAMP NOT NULL,
  "endDate" TIMESTAMP NOT NULL,
  "userId" INTEGER NOT NULL REFERENCES "User"(id) ON DELETE CASCADE,
  "propertyId" INTEGER NOT NULL REFERENCES "Property"(id) ON DELETE CASCADE,
  "createdAt" TIMESTAMP DEFAULT NOW()
);

-- Create Message table (for messaging feature)
CREATE TABLE "Message" (
  id SERIAL PRIMARY KEY,
  "senderId" INTEGER NOT NULL,
  "senderName" VARCHAR(255) NOT NULL,
  "receiverId" INTEGER NOT NULL,
  "receiverName" VARCHAR(255) NOT NULL,
  "propertyId" INTEGER,
  "propertyName" VARCHAR(255),
  message TEXT NOT NULL,
  timestamp TIMESTAMP DEFAULT NOW(),
  read BOOLEAN DEFAULT FALSE
);

-- Create indexes for better performance
CREATE INDEX idx_property_category ON "Property"("categoryId");
CREATE INDEX idx_review_property ON "Review"("propertyId");
CREATE INDEX idx_review_user ON "Review"("userId");
CREATE INDEX idx_booking_property ON "Booking"("propertyId");
CREATE INDEX idx_booking_user ON "Booking"("userId");
CREATE INDEX idx_message_sender ON "Message"("senderId");
CREATE INDEX idx_message_receiver ON "Message"("receiverId");

-- Enable Row Level Security (RLS) - Optional but recommended
ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Category" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Property" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Review" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Booking" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Message" ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (adjust as needed for your security requirements)
CREATE POLICY "Allow public read access on Category" ON "Category" FOR SELECT USING (true);
CREATE POLICY "Allow public read access on Property" ON "Property" FOR SELECT USING (true);

-- For development, you might want to allow all operations (remove in production!)
CREATE POLICY "Allow all operations on Category" ON "Category" FOR ALL USING (true);
CREATE POLICY "Allow all operations on Property" ON "Property" FOR ALL USING (true);
CREATE POLICY "Allow all operations on User" ON "User" FOR ALL USING (true);
CREATE POLICY "Allow all operations on Review" ON "Review" FOR ALL USING (true);
CREATE POLICY "Allow all operations on Booking" ON "Booking" FOR ALL USING (true);
CREATE POLICY "Allow all operations on Message" ON "Message" FOR ALL USING (true);
