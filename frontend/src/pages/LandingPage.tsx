import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PropertyCard from "../components/PropertyCard";
import type { Property, Category } from "../types";
import { propertyService, categoryService } from "../services/api";

const LandingPage: React.FC = () => {
    const [properties, setProperties] = useState<Property[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [propertiesData, categoriesData] = await Promise.all([
                    propertyService.getAll(),
                    categoryService.getAll(),
                ]);
                setProperties(propertiesData);
                setCategories(categoriesData);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Filter properties based on selected category
    const filteredProperties = selectedCategory
        ? properties.filter(p => p.categoryId === selectedCategory)
        : properties;

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />

            {/* Mobile Search Bar */}
            <div className="md:hidden px-6 py-4 bg-white">
                <div className="flex items-center border border-gray-300 rounded-full py-3 px-4 shadow-sm">
                    <svg
                        className="h-5 w-5 text-gray-500 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        ></path>
                    </svg>
                    <div className="flex flex-col">
                        <span className="text-xs font-semibold">Anywhere</span>
                        <span className="text-xs text-gray-500">Any week · Add guests</span>
                    </div>
                </div>
            </div>

            {/* Category Scrollbar */}
            <section className="px-6 md:px-12 py-4 bg-white overflow-x-auto sticky top-16 z-40 shadow-sm">
                <div className="flex space-x-8 justify-center">
                    {/* All Categories Option */}
                    <div
                        onClick={() => setSelectedCategory(null)}
                        className={`flex flex-col items-center min-w-fit pb-2 ${selectedCategory === null
                            ? "border-b-2 border-black"
                            : "border-b-2 border-transparent hover:border-gray-300"
                            } transition-all duration-200 cursor-pointer group`}
                    >
                        <svg className={`h-6 w-6 ${selectedCategory === null ? "text-black" : "text-gray-500 group-hover:text-gray-700"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                        </svg>
                        <span className={`text-xs font-medium mt-1 ${selectedCategory === null ? "text-black" : "text-gray-700 group-hover:text-gray-900"}`}>
                            All
                        </span>
                    </div>

                    {categories.map((category) => (
                        <div
                            key={category.id}
                            onClick={() => setSelectedCategory(category.id)}
                            className={`flex flex-col items-center min-w-fit pb-2 ${selectedCategory === category.id
                                ? "border-b-2 border-black"
                                : "border-b-2 border-transparent hover:border-gray-300"
                                } transition-all duration-200 cursor-pointer group`}
                        >
                            <div
                                className={selectedCategory === category.id ? "text-black" : "text-gray-500 group-hover:text-gray-700"}
                                dangerouslySetInnerHTML={{ __html: category.icon }}
                            />
                            <span className={`text-xs font-medium mt-1 ${selectedCategory === category.id ? "text-black" : "text-gray-700 group-hover:text-gray-900"}`}>
                                {category.name}
                            </span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Main Content Area - Property Listings */}
            <main className="container mx-auto px-6 py-8 flex-grow">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">
                        {selectedCategory
                            ? `${categories.find(c => c.id === selectedCategory)?.name} in Kenya`
                            : "Popular homes in Kenya"}
                        <span className="text-sm font-normal text-gray-500 ml-2">
                            ({filteredProperties.length} properties)
                        </span>
                    </h2>
                    <button className="text-sm font-medium text-gray-700 hover:underline">
                        Show all
                    </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {filteredProperties.length > 0 ? (
                        filteredProperties.map((property) => (
                            <PropertyCard key={property.id} property={property} />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12">
                            <svg className="h-16 w-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                            <p className="text-gray-500">No properties found in this category</p>
                        </div>
                    )}
                </div>

                {/* Divider */}
                <div className="border-t border-gray-200 my-8"></div>

                {/* Featured Section - Animated Carousel */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                        Featured destinations
                    </h2>
                    <div className="relative overflow-hidden">
                        <div className="flex gap-6 animate-scroll-slow hover:pause-animation">
                            {/* First set of destinations */}
                            {[
                                { name: "Diani Beach", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" },
                                { name: "Maasai Mara", image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c2FmYXJpJTIwdGVudHxlbnwwfHwwfHx8MA%3D%3D" },
                                { name: "Naivasha", image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y290dGFnZSUyMG5haXZhc2hhfGVufDB8fHx8MA%3D%3D" },
                                { name: "Nairobi", image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXJiYW4lMjBsb2Z0fGVufDB8fHx8MA%3D%3D" },
                                { name: "Lamu Island", image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&auto=format&fit=crop&q=60" },
                                { name: "Mount Kenya", image: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?w=600&auto=format&fit=crop&q=60" },
                                // Duplicate for seamless loop
                                { name: "Diani Beach", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" },
                                { name: "Maasai Mara", image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c2FmYXJpJTIwdGVudHxlbnwwfHwwfHx8MA%3D%3D" },
                            ].map((dest, index) => (
                                <div
                                    key={index}
                                    className="relative rounded-xl overflow-hidden flex-shrink-0 w-64 md:w-80 aspect-square group cursor-pointer transform transition-transform duration-300 hover:scale-105"
                                >
                                    <img
                                        src={dest.image}
                                        alt={dest.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-6">
                                        <h3 className="text-white font-bold text-2xl transform transition-transform duration-300 group-hover:translate-y-[-4px]">
                                            {dest.name}
                                        </h3>
                                    </div>
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default LandingPage;
