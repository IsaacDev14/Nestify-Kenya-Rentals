import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const categories = [
    { name: "Amazing views", icon: `<svg class="h-6 w-6 text-indigo-700 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>` },
    { name: "Beachfront", icon: `<svg class="h-6 w-6 text-blue-700 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>` },
    { name: "Cabins", icon: `<svg class="h-6 w-6 text-green-700 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"></path></svg>` },
    { name: "Treehouses", icon: `<svg class="h-6 w-6 text-yellow-700 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10l-2 2m0 0l-2-2m2 2V3m2 17a2 2 0 11-4 0 2 2 0 014 0zM7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-2.414-2.414A1 1 0 0015.586 6H7a2 2 0 00-2 2v11a2 2 0 002 2z"></path></svg>` },
    { name: "Glamping", icon: `<svg class="h-6 w-6 text-purple-700 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>` },
    { name: "Tiny homes", icon: `<svg class="h-6 w-6 text-pink-700 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>` },
    { name: "Unique stays", icon: `<svg class="h-6 w-6 text-orange-700 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 13l5.447-2.724A1 1 0 0021 16.382V5.618a1 1 0 00-1.447-.894L15 7m0 13V7m0 0L9 7"></path></svg>` },
    { name: "Castles", icon: `<svg class="h-6 w-6 text-red-700 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"></path></svg>` },
    { name: "Lakeside", icon: `<svg class="h-6 w-6 text-teal-700 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>` },
    { name: "Farms", icon: `<svg class="h-6 w-6 text-lime-700 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586L4 13.586V10a2 2 0 012-2h11z"></path></svg>` },
    { name: "Desert", icon: `<svg class="h-6 w-6 text-amber-700 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h1M3 12H2M18.364 5.636l-.707-.707M6.343 17.657l-.707.707M16.95 18.364l.707-.707M7.05 5.636l-.707.707M12 12a5 5 0 110-10 5 5 0 010 10z"></path></svg>` },
    { name: "Ski-in/out", icon: `<svg class="h-6 w-6 text-sky-700 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10l-2 2m0 0l-2-2m2 2V3m2 17a2 2 0 11-4 0 2 2 0 014 0zM7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-2.414-2.414A1 1 0 0015.586 6H7a2 2 0 00-2 2v11a2 2 0 002 2z"></path></svg>` },
];

const properties = [
    {
        name: "Charming Apartment",
        location: "Nairobi, Kilimani",
        price: "KSh 7,500 / night",
        imageUrls: [
            "https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG91c2UlMjBpbnRlcmlvcnxlbnwwfHwwfHx8MA%3D%3D",
            "https://images.unsplash.com/photo-1574362678128-4c9b2d3e3e3e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bGl2aW5nJTIwcm9vbSUyMGFwYXJ0bWVudHxlbnwwfHwwfHx8MA%3D%3D",
            "https://images.unsplash.com/photo-1556912167-f705199a0a3a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3w1MjA3fDB8MHxzZWFyY2h8N3x8a2l0Y2hlbiUyMGFwYXJ0bWVudHxlbnwwfHwwfHx8MA%3D%3D",
        ],
        description:
            "Modern and cozy apartment in the heart of Kilimani, perfect for business or leisure.",
        rating: 4.8,
        reviewCount: 120,
        isGuestFavorite: true,
        categoryName: "Amazing views"
    },
    {
        name: "Beachfront Villa",
        location: "Diani Beach, Kwale",
        price: "KSh 25,000 / night",
        imageUrls: [
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bW91bnRhaW4lMjBjYWJpbnxlbnwwfHwwfHx8MA%3D%3D",
            "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9yZXN0JTIwY2FiaW58ZW58MHx8fHwxNzAxOTU3ODY5fDA%3D",
            "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bW91bnRhaW4lMjBsYWtlfGVufDB8fHx8MA%3D%3D",
        ],
        description:
            "Luxurious villa with direct beach access, private pool, and stunning ocean views.",
        rating: 4.9,
        reviewCount: 85,
        isGuestFavorite: false,
        categoryName: "Beachfront"
    },
    {
        name: "Serene Cottage",
        location: "Naivasha, Nakuru",
        price: "KSh 12,000 / night",
        imageUrls: [
            "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y290dGFnZSUyMG5haXZhc2hhfGVufDB8fHx8MA%3D%3D",
            "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y290dGFnZSUyMGludGVyaW9yfGVufDB8fHx8MA%3D%3D",
            "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y290dGFnZSUyMGV4dGVyaW9yfGVufDB8fHx8MA%3D%3D",
        ],
        description:
            "Escape to this peaceful cottage near Lake Naivasha. Enjoy nature and tranquility.",
        rating: 4.7,
        reviewCount: 95,
        isGuestFavorite: true,
        categoryName: "Cabins"
    },
    {
        name: "Urban Loft",
        location: "Nairobi, Westlands",
        price: "KSh 8,000 / night",
        imageUrls: [
            "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXJiYW4lMjBsb2Z0fGVufDB8fHx8MA%3D%3D",
            "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0b21?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXJiYW4lMjBsb2Z0JTIwaW50ZXJpb3J8ZW58MHx8fHwxNzAxOTU3NzEyfDA%3D",
        ],
        description:
            "Stylish loft apartment in a vibrant neighborhood, close to nightlife and corporate offices.",
        rating: 4.6,
        reviewCount: 150,
        isGuestFavorite: false,
        categoryName: "Amazing views"
    },
    {
        name: "Safari Tent",
        location: "Maasai Mara, Narok",
        price: "KSh 35,000 / night",
        imageUrls: [
            "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c2FmYXJpJTIwdGVudHxlbnwwfHwwfHx8MA%3D%3D",
            "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1506535995048-638aa1b62b77?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c2FmYXJpJTIwc3Vuc2V0fGVufDB8fHx8MA%3D%3D",
        ],
        description:
            "Experience the wild in comfort with this luxury safari tent. Game drives await.",
        rating: 5.0,
        reviewCount: 60,
        isGuestFavorite: true,
        categoryName: "Glamping"
    },
    {
        name: "Cozy Studio",
        location: "Nairobi, Lavington",
        price: "KSh 6,000 / night",
        imageUrls: [
            "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c3R1ZGlvJTIwYXBhcnRtZW50fGVufDB8fHx8MA%3D%3D",
            "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0b21?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3R1ZGlvJTIwaW50ZXJpb3J8ZW58MHx8fHwxNzAxOTU3ODI5fDA%3D",
        ],
        description:
            "Compact and comfortable studio, perfect for solo travelers or couples.",
        rating: 4.5,
        reviewCount: 70,
        isGuestFavorite: false,
        categoryName: "Amazing views"
    },
    {
        name: "Mountain View Cabin",
        location: "Nanyuki, Laikipia",
        price: "KSh 15,000 / night",
        imageUrls: [
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bW91bnRhaW4lMjBjYWJpbnxlbnwwfHwwfHx8MA%3D%3D",
            "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9yZXN0JTIwY2FiaW58ZW58MHx8fHwxNzAxOTU3ODY5fDA%3D",
            "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bW91bnRhaW4lMjBsYWtlfGVufDB8fHx8MA%3D%3D",
        ],
        description:
            "Rustic cabin with breathtaking views of Mount Kenya. Ideal for hiking.",
        rating: 4.9,
        reviewCount: 45,
        isGuestFavorite: true,
        categoryName: "Cabins"
    },
    {
        name: "Lakeside Retreat",
        location: "Kisumu, Kisumu County",
        price: "KSh 9,000 / night",
        imageUrls: [
            "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bGakeside%20retreat%7Cen%7C0%7C0%7C0%7C0%7C1701957920%7C0",
            "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bGFrZSUyMHZpY3RvcmlhfGVufDB8fHx8MA%3D%3D",
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bGFrZSUyMHN1bnNldHxlbnwwfHx8fDA%3D",
        ],
        description:
            "Tranquil retreat by Lake Victoria. Enjoy stunning sunsets and fresh fish.",
        rating: 4.7,
        reviewCount: 110,
        isGuestFavorite: false,
        categoryName: "Lakeside"
    },
    {
        name: "Modern Townhouse",
        location: "Nairobi, Karen",
        price: "KSh 18,000 / night",
        imageUrls: [
            "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bW9kZXJuJTIwdG93bmhvdXNlfGVufDB8fHx8MA%3D%3D",
            "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dG93bmhvdXNlJTIwaW50ZXJpb3J8ZW58MHx8fHwxNzAxOTU3OTY2fDA%3D",
            "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dG93bmhvdXNlJTIwZ2FyZGVufGVufDB8fHx8MA%3D%3D",
        ],
        description:
            "Spacious and elegant townhouse in the leafy suburbs of Karen. Perfect for families.",
        rating: 4.8,
        reviewCount: 90,
        isGuestFavorite: true,
        categoryName: "Amazing views"
    },
    {
        name: "Coastal Bungalow",
        location: "Watamu, Kilifi",
        price: "KSh 20,000 / night",
        imageUrls: [
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y29hc3RhbCUyMGJ1bmdhbG93fGVufDB8fHx8MA%3D%3D",
            "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2F0YW11JTIwYmVhY2h8ZW58MHx8fHwxNzAxOTU4MDExfDA%3D",
            "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y29hc3RhbCUyMHBvb2x8ZW58MHx8fHwxNzAxOTU4MDEyfDA%3D",
        ],
        description:
            "Charming bungalow a short walk from Watamu's pristine beaches. Dive into ocean life.",
        rating: 4.9,
        reviewCount: 75,
        isGuestFavorite: false,
        categoryName: "Beachfront"
    },
];

async function main() {
    console.log('Start seeding ...');

    // Seed Categories
    for (const category of categories) {
        await prisma.category.upsert({
            where: { name: category.name },
            update: {},
            create: category,
        });
    }

    // Seed Properties
    for (const property of properties) {
        const { categoryName, ...propData } = property;
        const category = await prisma.category.findUnique({ where: { name: categoryName } });

        if (category) {
            await prisma.property.create({
                data: {
                    ...propData,
                    imageUrls: JSON.stringify(propData.imageUrls),
                    categoryId: category.id
                }
            });
        }
    }

    console.log('Seeding finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
