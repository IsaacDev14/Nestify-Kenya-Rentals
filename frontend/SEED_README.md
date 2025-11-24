# Firebase Database Seeding

## 🌱 Seed Your Firestore Database

This seed file will populate your Firebase Firestore database with realistic data for the KenyaRentals application.

## What Gets Seeded

### Categories (10)
- Beachfront 🏖️
- Apartment 🏢
- Villa 🏡
- Cabin 🏕️
- Treehouse 🌳
- Countryside 🌾
- Lakefront 🏞️
- Camping ⛺
- Mansion 🏰
- Cottage 🏘️

### Properties (300+)
Each property includes:
- **Title**: Generated from Kenyan locations
- **Description**: Unique descriptions
- **Price**: KES 3,000 - 50,000 per night
- **Location**: 20 Kenyan cities/towns
- **Images**: 3-6 high-quality images
- **Amenities**: 4-8 random amenities
- **Rating**: 3.5 - 5.0 stars
- **Reviews**: 5-150 reviews
- **Bedrooms**: 1-6
- **Bathrooms**: 1-4
- **Max Guests**: 2-12

### Users (50)
- 20 hosts
- 30 regular users
- Kenyan names
- Profile avatars
- Realistic creation dates

## 🚀 How to Run

### Option 1: Direct Run (Recommended)
\`\`\`bash
cd frontend
npx ts-node src/utils/seedData.ts
\`\`\`

### Option 2: Add to package.json
Add this to your frontend/package.json scripts:
\`\`\`json
"scripts": {
  "seed": "ts-node src/utils/seedData.ts"
}
\`\`\`

Then run:
\`\`\`bash
npm run seed
\`\`\`

## 📊 Expected Output

\`\`\`
🌱 Starting database seeding...

Seeding categories...
✅ Seeded 10 categories
Seeding 50 sample users...
✅ Seeded 50 users
Seeding 300 properties...
✅ Seeded 300/300 properties

✅ Database seeding completed successfully!
📊 Summary:
  - 10 categories
  - 50 users (20 hosts)
  - 300 properties
\`\`\`

## ⚠️ Important Notes

1. **Run Once**: Only run the seed script once to avoid duplicates
2. **Firebase Config**: Ensure `firebase.ts` is properly configured
3. **Internet**: Requires internet connection
4. **Time**: May take 1-2 minutes to complete
5. **Firestore Rules**: Ensure your Firestore rules allow writes

## 🔧 Customize

To change the number of records, edit `seedData.ts`:

\`\`\`typescript
await seedProperties(500); // Change to 500 properties
await seedUsers(100);      // Change to 100 users
\`\`\`

## 🗑️ Clear Data

To clear all seeded data, go to Firebase Console:
1. Open Firestore Database
2. Select collection (properties, users, categories)
3. Delete all documents

## 📍 Kenyan Locations Included

Nairobi, Mombasa, Kisumu, Nakuru, Eldoret, Thika, Malindi, Kitale, Garissa, Kakamega, Nyeri, Machakos, Meru, Kericho, Naivasha, Nanyuki, Diani Beach, Lamu, Watamu, Kilifi
