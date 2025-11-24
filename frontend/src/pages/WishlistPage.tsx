import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PropertyCard from "../components/PropertyCard";
import type { Property } from "../types";
import { useWishlist } from "../context/WishlistContext";

const WishlistPage: React.FC = () => {
    const navigate = useNavigate();
    const { wishlist } = useWishlist();
    const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWishlistProperties = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/properties");
                const allProperties = response.data;
                const wishlistProperties = allProperties.filter((p: Property) =>
                    wishlist.includes(p.id)
                );
                setProperties(wishlistProperties);
            } catch (error) {
                console.error("Error fetching wishlist properties:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchWishlistProperties();
    }, [wishlist]);

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
                <h1 className="text-3xl font-bold text-gray-800 mb-8">My Wishlist</h1>

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
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                        </svg>
                        <p className="text-gray-600 mb-4">Your wishlist is empty</p>
                        <button
                            onClick={() => navigate("/")}
                            className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors"
                        >
                            Start exploring
                        </button>
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

export default WishlistPage;
