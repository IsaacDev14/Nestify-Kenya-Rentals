// Test script to verify frontend can connect to production backend
const API_URL = 'https://nestify-kenya-rentals.onrender.com/api';

async function testBackendConnection() {
    console.log('🧪 Testing connection to production backend...\n');
    console.log(`Backend URL: ${API_URL}\n`);

    try {
        // Test 1: Health check
        console.log('Test 1: Health check...');
        const healthResponse = await fetch('https://nestify-kenya-rentals.onrender.com/');
        const healthText = await healthResponse.text();
        console.log(`✅ Health check: ${healthText}\n`);

        // Test 2: Get categories
        console.log('Test 2: Fetching categories...');
        const categoriesResponse = await fetch(`${API_URL}/categories`);
        const categories = await categoriesResponse.json();
        console.log(`✅ Categories: Found ${categories.length} categories`);
        console.log(`   Sample: ${categories[0]?.name}\n`);

        // Test 3: Get properties
        console.log('Test 3: Fetching properties...');
        const propertiesResponse = await fetch(`${API_URL}/properties`);
        const properties = await propertiesResponse.json();
        console.log(`✅ Properties: Found ${properties.length} properties`);
        console.log(`   Sample: ${properties[0]?.name} - ${properties[0]?.location}\n`);

        console.log('🎉 All tests passed! Frontend can connect to production backend.\n');
        console.log('Your frontend at http://localhost:5173 is now using:');
        console.log(`   ${API_URL}`);

    } catch (error) {
        console.error('❌ Error connecting to backend:', error.message);
        console.log('\n🔧 Troubleshooting:');
        console.log('   1. Check if backend is deployed and running on Render');
        console.log('   2. Verify CORS is enabled in backend');
        console.log('   3. Check Render logs for errors');
    }
}

testBackendConnection();
