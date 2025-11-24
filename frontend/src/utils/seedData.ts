import { collection, writeBatch, doc, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

// Kenyan locations
const locations = [
    "Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret",
    "Thika", "Malindi", "Kitale", "Garissa", "Kakamega",
    "Nyeri", "Machakos", "Meru", "Kericho", "Naivasha",
    "Nanyuki", "Diani Beach", "Lamu", "Watamu", "Kilifi"
];

// Property types
const propertyTypes = [
    "Beachfront", "Apartment", "Villa", "Cabin", "Treehouse",
    "Countryside", "Lakefront", "Camping", "Mansion", "Cottage"
];

// Amenities
const allAmenities = [
    "WiFi", "Kitchen", "Parking", "Pool", "Air conditioning",
    "Washing machine", "TV", "Gym", "Hot tub", "BBQ grill",
    "Beach access", "Garden", "Balcony", "Fireplace", "Security"
];

// Sample property titles
const titlePrefixes = [
    "Luxury", "Cozy", "Modern", "Spacious", "Charming",
    "Beautiful", "Stunning", "Elegant", "Serene", "Private"
];

const titleSuffixes = [
    "Retreat", "Getaway", "Haven", "Escape", "Paradise",
    "Oasis", "Sanctuary", "Villa", "Home", "Residence"
];

// Generate random number in range
const random = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

// Generate random amenities
const getRandomAmenities = () => {
    const count = random(4, 8);
    const shuffled = [...allAmenities].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
};

// Generate property title
const generateTitle = (propertyType: string, location: string) => {
    const prefix = titlePrefixes[random(0, titlePrefixes.length - 1)];
    const suffix = titleSuffixes[random(0, titleSuffixes.length - 1)];
    return `${prefix} ${propertyType} ${suffix} in ${location}`;
};

// Generate property description
const generateDescription = (propertyType: string, location: string) => {
    const descriptions = [
        `Experience the perfect blend of comfort and luxury in this stunning ${propertyType.toLowerCase()} located in the heart of ${location}. Ideal for families and groups looking for an unforgettable Kenyan getaway.`,
        `Discover this beautiful ${propertyType.toLowerCase()} nestled in ${location}. With modern amenities and breathtaking views, it's the perfect escape from the everyday hustle.`,
        `Welcome to your home away from home! This charming ${propertyType.toLowerCase()} in ${location} offers everything you need for a relaxing and memorable stay in Kenya.`,
        `Immerse yourself in the beauty of ${location} from this exceptional ${propertyType.toLowerCase()}. Perfect for those seeking adventure, relaxation, or a bit of both.`,
        `This exquisite ${propertyType.toLowerCase()} in ${location} combines traditional Kenyan hospitality with modern comfort. Your perfect vacation starts here!`
    ];
    return descriptions[random(0, descriptions.length - 1)];
};

// Generate image URLs
const generateImages = () => {
    const baseUrl = "https://images.unsplash.com/photo-";
    const imageIds = [
        "1564013799919-ab600027ffc6",
        "1568605114967-8130f3a36994",
        "1600596542815-ffad4c1539a9",
        "1600607687939-ce8a6c25118c",
        "1600607687644-aac4c3eac7f4",
        "1600566753190-17f0baa2a6c3",
    ];

    const count = random(3, 6);
    const images = [];
    for (let i = 0; i < count; i++) {
        const id = imageIds[random(0, imageIds.length - 1)];
        images.push(`${baseUrl}${id}?w=800&q=80`);
    }
    return images;
};

// Clear a collection
const clearCollection = async (collectionName: string) => {
    console.log(`🗑️  Clearing ${collectionName} collection...`);
    const collectionRef = collection(db, collectionName);
    const snapshot = await getDocs(collectionRef);

    if (snapshot.size === 0) {
        console.log(`✅ ${collectionName} is already empty`);
        return;
    }

    const batchSize = 500;
    let deleted = 0;

    while (deleted < snapshot.size) {
        const batch = writeBatch(db);
        const remaining = Math.min(batchSize, snapshot.size - deleted);

        for (let i = deleted; i < deleted + remaining; i++) {
            batch.delete(snapshot.docs[i].ref);
        }

        await batch.commit();
        deleted += remaining;
    }

    console.log(`✅ Cleared ${snapshot.size} documents from ${collectionName}`);
};

// Seed categories
const seedCategories = async () => {
    console.log("Seeding categories...");
    const categories = [
        { name: "Beachfront", icon: "🏖️" },
        { name: "Apartment", icon: "🏢" },
        { name: "Villa", icon: "🏡" },
        { name: "Cabin", icon: "🏕️" },
        { name: "Treehouse", icon: "🌳" },
        { name: "Countryside", icon: "🌾" },
        { name: "Lakefront", icon: "🏞️" },
        { name: "Camping", icon: "⛺" },
        { name: "Mansion", icon: "🏰" },
        { name: "Cottage", icon: "🏘️" }
    ];

    const batch = writeBatch(db);

    for (const category of categories) {
        const docRef = doc(collection(db, "categories"));
        batch.set(docRef, category);
    }

    await batch.commit();
    console.log(`✅ Seeded ${categories.length} categories`);
};

// Seed properties
const seedProperties = async (count: number = 200) => {
    console.log(`Seeding ${count} properties...`);

    let seeded = 0;
    const batchSize = 500;

    while (seeded < count) {
        const batch = writeBatch(db);
        const remaining = Math.min(batchSize, count - seeded);

        for (let i = 0; i < remaining; i++) {
            const propertyType = propertyTypes[random(0, propertyTypes.length - 1)];
            const location = locations[random(0, locations.length - 1)];

            const property = {
                title: generateTitle(propertyType, location),
                description: generateDescription(propertyType, location),
                price: random(30, 500) * 100,
                location: location,
                categoryId: propertyType,
                images: generateImages(),
                amenities: getRandomAmenities(),
                rating: (random(35, 50) / 10).toFixed(1),
                reviews: random(5, 150),
                bedrooms: random(1, 6),
                bathrooms: random(1, 4),
                maxGuests: random(2, 12),
                hostId: `host_${random(1, 50)}`,
                available: random(0, 10) > 1,
                createdAt: new Date(Date.now() - random(0, 365) * 24 * 60 * 60 * 1000)
            };

            const docRef = doc(collection(db, "properties"));
            batch.set(docRef, property);
        }

        await batch.commit();
        seeded += remaining;
        console.log(`✅ Seeded ${seeded}/${count} properties`);
    }
};

// Seed sample users
const seedUsers = async (count: number = 50) => {
    console.log(`Seeding ${count} sample users...`);

    const firstNames = [
        "John", "Jane", "Michael", "Sarah", "David", "Emily",
        "James", "Emma", "Robert", "Olivia", "William", "Ava",
        "Joseph", "Sophia", "Charles", "Isabella", "Thomas", "Mia"
    ];

    const lastNames = [
        "Kamau", "Wanjiru", "Ochieng", "Akinyi", "Mwangi",
        "Njeri", "Otieno", "Adhiambo", "Kimani", "Wambui"
    ];

    const batch = writeBatch(db);

    for (let i = 1; i <= count; i++) {
        const firstName = firstNames[random(0, firstNames.length - 1)];
        const lastName = lastNames[random(0, lastNames.length - 1)];

        const user = {
            name: `${firstName} ${lastName}`,
            email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@example.com`,
            isHost: i <= 20,
            avatar: `https://i.pravatar.cc/150?img=${i}`,
            wishlist: [],
            createdAt: new Date(Date.now() - random(0, 730) * 24 * 60 * 60 * 1000)
        };

        const docRef = doc(collection(db, "users"), `host_${i}`);
        batch.set(docRef, user);
    }

    await batch.commit();
    console.log(`✅ Seeded ${count} users`);
};

// Main seed function
const seedDatabase = async () => {
    try {
        console.log("🌱 Starting database seeding...\n");

        // Clear existing data
        console.log("🗑️  Clearing existing data...");
        await clearCollection("properties");
        await clearCollection("users");
        await clearCollection("categories");
        console.log("✅ All collections cleared\n");

        // Seed new data
        await seedCategories();
        await seedUsers(50);
        await seedProperties(300);

        console.log("\n✅ Database seeding completed successfully!");
        console.log("📊 Summary:");
        console.log("  - 10 categories");
        console.log("  - 50 users (20 hosts)");
        console.log("  - 300 properties");
    } catch (error) {
        console.error("❌ Error seeding database:", error);
        throw error;
    }
};

// Export for use in other files
export default seedDatabase;

// Run seed
seedDatabase()
    .then(() => {
        console.log("\n🎉 Seeding complete! Check your Firebase Console.");
        process.exit(0);
    })
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
