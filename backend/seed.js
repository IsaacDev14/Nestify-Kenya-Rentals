const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.log('ERROR: Missing SUPABASE_URL or SUPABASE_KEY in .env file');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Category data with icons
const categories = [
    {
        name: 'Beachfront',
        icon: '<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path></svg>'
    },
    {
        name: 'Cabins',
        icon: '<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>'
    },
    {
        name: 'Trending',
        icon: '<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>'
    },
    {
        name: 'Mansions',
        icon: '<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>'
    },
    {
        name: 'Countryside',
        icon: '<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>'
    },
    {
        name: 'Lakefront',
        icon: '<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"></path></svg>'
    },
    {
        name: 'Farms',
        icon: '<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>'
    },
    {
        name: 'Tiny homes',
        icon: '<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"></path></svg>'
    },
    {
        name: 'Amazing pools',
        icon: '<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>'
    },
    {
        name: 'National parks',
        icon: '<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'
    }
];

// Property data for each category
const properties = [
    // Beachfront properties
    { name: 'Diani Beach Villa', location: 'Diani Beach, Kenya', price: '$250/night', imageUrls: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800,https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800,https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800', description: 'Luxurious beachfront villa with stunning ocean views, private pool, and direct beach access. Perfect for families and groups.', rating: 4.95, reviewCount: 127, isGuestFavorite: true, categoryName: 'Beachfront' },
    { name: 'Watamu Coastal Retreat', location: 'Watamu, Kenya', price: '$180/night', imageUrls: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800,https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800', description: 'Charming beach house with panoramic ocean views. Features include outdoor dining area and hammocks on the beach.', rating: 4.87, reviewCount: 89, isGuestFavorite: true, categoryName: 'Beachfront' },
    { name: 'Malindi Beach House', location: 'Malindi, Kenya', price: '$220/night', imageUrls: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800,https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800', description: 'Modern beachfront property with infinity pool overlooking the Indian Ocean. Fully equipped kitchen and spacious living areas.', rating: 4.92, reviewCount: 156, isGuestFavorite: true, categoryName: 'Beachfront' },
    { name: 'Lamu Island Getaway', location: 'Lamu Island, Kenya', price: '$195/night', imageUrls: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800,https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800', description: 'Traditional Swahili beach house on pristine Lamu Island. Experience authentic coastal living with modern amenities.', rating: 4.88, reviewCount: 94, isGuestFavorite: false, categoryName: 'Beachfront' },

    // Cabins
    { name: 'Mount Kenya Log Cabin', location: 'Mount Kenya, Kenya', price: '$120/night', imageUrls: 'https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800,https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=800', description: 'Cozy log cabin nestled in the forests of Mount Kenya. Perfect for nature lovers and hikers seeking mountain adventures.', rating: 4.91, reviewCount: 78, isGuestFavorite: true, categoryName: 'Cabins' },
    { name: 'Aberdare Forest Cabin', location: 'Aberdare National Park, Kenya', price: '$140/night', imageUrls: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800,https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=800', description: 'Rustic cabin with fireplace in the heart of Aberdare Forest. Wake up to bird songs and forest views.', rating: 4.85, reviewCount: 62, isGuestFavorite: false, categoryName: 'Cabins' },
    { name: 'Nanyuki Highland Retreat', location: 'Nanyuki, Kenya', price: '$135/night', imageUrls: 'https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800,https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800', description: 'Mountain cabin with spectacular views of Mount Kenya. Features wood-burning stove and outdoor deck.', rating: 4.89, reviewCount: 71, isGuestFavorite: true, categoryName: 'Cabins' },

    // Trending
    { name: 'Nairobi Modern Loft', location: 'Westlands, Nairobi', price: '$95/night', imageUrls: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800,https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800', description: 'Trendy urban loft in the heart of Nairobi. Walking distance to restaurants, cafes, and nightlife.', rating: 4.93, reviewCount: 203, isGuestFavorite: true, categoryName: 'Trending' },
    { name: 'Karen Eco-Lodge', location: 'Karen, Nairobi', price: '$175/night', imageUrls: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800,https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', description: 'Sustainable eco-lodge with solar power and rainwater harvesting. Surrounded by indigenous forest and wildlife.', rating: 4.96, reviewCount: 184, isGuestFavorite: true, categoryName: 'Trending' },
    { name: 'Giraffe Manor View', location: 'Langata, Nairobi', price: '$165/night', imageUrls: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800,https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800', description: 'Unique property overlooking the famous Giraffe Centre. Watch giraffes from your breakfast table!', rating: 4.98, reviewCount: 267, isGuestFavorite: true, categoryName: 'Trending' },
    { name: 'Kilimani Penthouse', location: 'Kilimani, Nairobi', price: '$110/night', imageUrls: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800,https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800', description: 'Stylish penthouse with rooftop terrace and city views. Modern amenities and central location.', rating: 4.86, reviewCount: 142, isGuestFavorite: false, categoryName: 'Trending' },

    // Mansions
    { name: 'Runda Estate Mansion', location: 'Runda, Nairobi', price: '$450/night', imageUrls: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800,https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800', description: 'Palatial 6-bedroom mansion with swimming pool, tennis court, and manicured gardens. Perfect for luxury getaways.', rating: 4.94, reviewCount: 87, isGuestFavorite: true, categoryName: 'Mansions' },
    { name: 'Muthaiga Colonial Villa', location: 'Muthaiga, Nairobi', price: '$380/night', imageUrls: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800,https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800', description: 'Historic colonial-style mansion with modern renovations. Features library, wine cellar, and staff quarters.', rating: 4.91, reviewCount: 64, isGuestFavorite: true, categoryName: 'Mansions' },
    { name: 'Tigoni Highland Estate', location: 'Tigoni, Limuru', price: '$420/night', imageUrls: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800,https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800', description: 'Grand mansion on 5 acres with panoramic views of the Rift Valley. Includes guest cottage and entertainment pavilion.', rating: 4.97, reviewCount: 52, isGuestFavorite: true, categoryName: 'Mansions' },

    // Countryside
    { name: 'Kiambu Tea Farm Cottage', location: 'Kiambu, Kenya', price: '$85/night', imageUrls: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800,https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=800', description: 'Peaceful cottage on a working tea farm. Experience rural Kenya life with farm-to-table meals.', rating: 4.82, reviewCount: 96, isGuestFavorite: false, categoryName: 'Countryside' },
    { name: 'Limuru Country House', location: 'Limuru, Kenya', price: '$105/night', imageUrls: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800,https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800', description: 'Charming country house surrounded by rolling hills and coffee plantations. Ideal for weekend escapes.', rating: 4.88, reviewCount: 118, isGuestFavorite: true, categoryName: 'Countryside' },
    { name: 'Nyeri Farmstay', location: 'Nyeri, Kenya', price: '$90/night', imageUrls: 'https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800,https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800', description: 'Traditional farmhouse with vegetable gardens and fruit orchards. Participate in farm activities.', rating: 4.79, reviewCount: 73, isGuestFavorite: false, categoryName: 'Countryside' },

    // Lakefront
    { name: 'Lake Naivasha Villa', location: 'Naivasha, Kenya', price: '$160/night', imageUrls: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800,https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', description: 'Stunning lakefront villa with private dock and boat access. Watch hippos and flamingos from your terrace.', rating: 4.92, reviewCount: 145, isGuestFavorite: true, categoryName: 'Lakefront' },
    { name: 'Lake Elementaita Retreat', location: 'Elementaita, Kenya', price: '$140/night', imageUrls: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800,https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800', description: 'Peaceful retreat on the shores of Lake Elementaita. Perfect for bird watching and nature photography.', rating: 4.87, reviewCount: 92, isGuestFavorite: true, categoryName: 'Lakefront' },
    { name: 'Lake Victoria Beach House', location: 'Kisumu, Kenya', price: '$125/night', imageUrls: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800,https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800', description: 'Lakeside property with sandy beach and water sports equipment. Enjoy fishing and sunset cruises.', rating: 4.84, reviewCount: 67, isGuestFavorite: false, categoryName: 'Lakefront' },

    // Farms
    { name: 'Nanyuki Organic Farm', location: 'Nanyuki, Kenya', price: '$95/night', imageUrls: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800,https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=800', description: 'Stay on a certified organic farm with dairy cows and vegetable gardens. Fresh produce daily.', rating: 4.81, reviewCount: 58, isGuestFavorite: false, categoryName: 'Farms' },
    { name: 'Nakuru Dairy Farm', location: 'Nakuru, Kenya', price: '$88/night', imageUrls: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800,https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800', description: 'Working dairy farm with comfortable guest house. Learn about cheese making and farm operations.', rating: 4.76, reviewCount: 44, isGuestFavorite: false, categoryName: 'Farms' },
    { name: 'Kericho Tea Estate', location: 'Kericho, Kenya', price: '$110/night', imageUrls: 'https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800,https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800', description: 'Colonial-era bungalow on a sprawling tea estate. Tour the tea factory and enjoy fresh Ceylon tea.', rating: 4.89, reviewCount: 102, isGuestFavorite: true, categoryName: 'Farms' },

    // Tiny homes
    { name: 'Nairobi Tiny House', location: 'Karen, Nairobi', price: '$65/night', imageUrls: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800,https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800', description: 'Minimalist tiny house with clever storage and eco-friendly design. Perfect for solo travelers or couples.', rating: 4.83, reviewCount: 134, isGuestFavorite: false, categoryName: 'Tiny homes' },
    { name: 'Ngong Hills Micro Cabin', location: 'Ngong Hills, Kenya', price: '$55/night', imageUrls: 'https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=800,https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800', description: 'Compact cabin with big views of Ngong Hills. Off-grid living with solar power and composting toilet.', rating: 4.78, reviewCount: 87, isGuestFavorite: false, categoryName: 'Tiny homes' },
    { name: 'Thika Treehouse Pod', location: 'Thika, Kenya', price: '$70/night', imageUrls: 'https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800,https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=800', description: 'Unique treehouse pod suspended in the canopy. Eco-friendly and adventurous accommodation.', rating: 4.91, reviewCount: 156, isGuestFavorite: true, categoryName: 'Tiny homes' },

    // Amazing pools
    { name: 'Diani Infinity Pool Villa', location: 'Diani Beach, Kenya', price: '$280/night', imageUrls: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800,https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800', description: 'Luxury villa with stunning infinity pool overlooking the ocean. Pool bar and sun loungers included.', rating: 4.97, reviewCount: 178, isGuestFavorite: true, categoryName: 'Amazing pools' },
    { name: 'Karen Pool Estate', location: 'Karen, Nairobi', price: '$220/night', imageUrls: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800,https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800', description: 'Modern estate with Olympic-sized swimming pool and poolside cabana. Perfect for pool parties.', rating: 4.92, reviewCount: 124, isGuestFavorite: true, categoryName: 'Amazing pools' },
    { name: 'Naivasha Pool Resort', location: 'Naivasha, Kenya', price: '$195/night', imageUrls: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800,https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800', description: 'Resort-style property with heated pool and jacuzzi. Lake views and water slide for kids.', rating: 4.88, reviewCount: 167, isGuestFavorite: true, categoryName: 'Amazing pools' },

    // National parks
    { name: 'Maasai Mara Safari Lodge', location: 'Maasai Mara, Kenya', price: '$320/night', imageUrls: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800,https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?w=800', description: 'Luxury tented camp in the heart of Maasai Mara. Game drives and cultural experiences included.', rating: 4.99, reviewCount: 289, isGuestFavorite: true, categoryName: 'National parks' },
    { name: 'Amboseli Elephant Camp', location: 'Amboseli National Park, Kenya', price: '$295/night', imageUrls: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?w=800,https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800', description: 'Safari camp with views of Mount Kilimanjaro. Watch elephants from your private deck.', rating: 4.96, reviewCount: 234, isGuestFavorite: true, categoryName: 'National parks' },
    { name: 'Tsavo Safari Cottage', location: 'Tsavo National Park, Kenya', price: '$185/night', imageUrls: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800,https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?w=800', description: 'Rustic cottage on the edge of Tsavo National Park. Self-catering with game viewing opportunities.', rating: 4.84, reviewCount: 112, isGuestFavorite: false, categoryName: 'National parks' },
    { name: 'Hell\'s Gate Eco Camp', location: 'Hell\'s Gate National Park, Kenya', price: '$145/night', imageUrls: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?w=800,https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800', description: 'Eco-friendly camp near Hell\'s Gate gorge. Rock climbing and cycling safaris available.', rating: 4.81, reviewCount: 98, isGuestFavorite: false, categoryName: 'National parks' }
];

async function seed() {
    console.log('🌱 Starting database seed...\n');

    try {
        // Clear existing data
        console.log('🗑️  Clearing existing data...');
        await supabase.from('Property').delete().neq('id', 0);
        await supabase.from('Category').delete().neq('id', 0);
        console.log('✅ Existing data cleared\n');

        // Insert categories
        console.log('📂 Inserting categories...');
        const { data: insertedCategories, error: categoryError } = await supabase
            .from('Category')
            .insert(categories)
            .select();

        if (categoryError) {
            throw new Error(`Category insert failed: ${categoryError.message}`);
        }
        console.log(`✅ Inserted ${insertedCategories.length} categories\n`);

        // Create a map of category names to IDs
        const categoryMap = {};
        insertedCategories.forEach(cat => {
            categoryMap[cat.name] = cat.id;
        });

        // Update properties with correct category IDs
        const propertiesWithCategoryIds = properties.map(prop => {
            const { categoryName, ...rest } = prop;
            return {
                ...rest,
                categoryId: categoryMap[categoryName]
            };
        });

        // Insert properties
        console.log('🏠 Inserting properties...');
        const { data: insertedProperties, error: propertyError } = await supabase
            .from('Property')
            .insert(propertiesWithCategoryIds)
            .select();

        if (propertyError) {
            throw new Error(`Property insert failed: ${propertyError.message}`);
        }
        console.log(`✅ Inserted ${insertedProperties.length} properties\n`);

        // Summary
        console.log('📊 Seed Summary:');
        console.log(`   Categories: ${insertedCategories.length}`);
        console.log(`   Properties: ${insertedProperties.length}`);
        console.log('\n✨ Database seeded successfully!\n');

        // Show properties per category
        console.log('📈 Properties per category:');
        for (const [catName, catId] of Object.entries(categoryMap)) {
            const count = propertiesWithCategoryIds.filter(p => p.categoryId === catId).length;
            console.log(`   ${catName}: ${count} properties`);
        }
        console.log('');

    } catch (error) {
        console.error('❌ Seed failed:', error.message);
        process.exit(1);
    }
}

seed();
