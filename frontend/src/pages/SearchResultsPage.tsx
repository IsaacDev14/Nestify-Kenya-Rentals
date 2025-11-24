import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PropertyCard from "../components/PropertyCard";
import type { Property } from "../types";

const SearchResultsPage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q") || "";
    const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/properties");
                const allProperties = response.data;

                // Filter properties based on search query
                const filtered = query
                    ? allProperties.filter(
                        (p: Property) =>
                            p.name.toLowerCase().includes(query.toLowerCase()) ||
                            p.location.toLowerCase().includes(query.toLowerCase()) ||
                            p.description.toLowerCase().includes(query.toLowerCase())
                    )
                    : allProperties;

                setProperties(filtered);
            } catch (error) {
                console.error("Error fetching properties:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProperties();
    }, [query]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-xl">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />

            <main className="container mx-auto px-6 py-8 flex-grow">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                        {query ? `Search results for "${query}"` : "All properties"}
                    </h1>
                    <p className="text-gray-600">
                        {properties.length} {properties.length === 1 ? "property" : "properties"} found
                    </p>
                </div>

                {properties.length === 0 ? (
                    <div className="text-center py-12">
                        <svg
                            className="h-16 w-16 text-gray-400 mx-auto mb-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                        <p className="text-gray-600 text-lg">No properties found</p>
                        <p className="text-gray-500 text-sm mt-2">
                            Try adjusting your search criteria
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {properties.map((property) => (
                            <PropertyCard key={property.id} property={property} />
                        ))}
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default SearchResultsPage;
