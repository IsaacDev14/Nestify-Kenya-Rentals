import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import type { Property, Category } from "../types";
import { propertyService } from "../services/api";

interface PropertyWithCategory extends Property {
    category?: Category;
}

const PropertyDetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [property, setProperty] = useState<PropertyWithCategory | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                if (id) {
                    const data = await propertyService.getById(parseInt(id));
                    setProperty(data);
                }
            } catch (err) {
                setError("Failed to load property details.");
            } finally {
                setLoading(false);
            }
        };

        fetchProperty();
    }, [id]);

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    if (error || !property) return <div className="min-h-screen flex items-center justify-center text-red-500">{error || "Property not found"}</div>;

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="container mx-auto px-6 py-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{property.name}</h1>
                <div className="flex items-center text-gray-600 mb-6">
                    <span className="mr-2">★ {property.rating}</span>
                    <span className="mr-2">·</span>
                    <span className="underline font-medium mr-2">{property.reviewCount} reviews</span>
                    <span className="mr-2">·</span>
                    <span className="underline font-medium">{property.location}</span>
                </div>

                {/* Images Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 rounded-xl overflow-hidden mb-8 h-[400px] md:h-[500px]">
                    <div className="h-full">
                        <img src={property.imageUrls[0]} alt={property.name} className="w-full h-full object-cover hover:opacity-90 transition-opacity cursor-pointer" />
                    </div>
                    <div className="grid grid-cols-2 gap-4 h-full">
                        {property.imageUrls.slice(1, 5).map((url, index) => (
                            <img key={index} src={url} alt={`${property.name} ${index + 2}`} className="w-full h-full object-cover hover:opacity-90 transition-opacity cursor-pointer" />
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {/* Left Column: Description */}
                    <div className="md:col-span-2">
                        <div className="border-b border-gray-200 pb-6 mb-6">
                            <h2 className="text-2xl font-semibold mb-2">Hosted by Host</h2>
                            <p className="text-gray-600">{property.description}</p>
                        </div>
                        {property.category && (
                            <div className="flex items-center mb-6">
                                <div className="mr-4" dangerouslySetInnerHTML={{ __html: property.category.icon }} />
                                <div>
                                    <h3 className="font-semibold text-lg">{property.category.name}</h3>
                                    <p className="text-gray-500 text-sm">This property is in the {property.category.name} category.</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column: Booking Card */}
                    <div className="md:col-span-1">
                        <div className="bg-white border border-gray-200 rounded-xl shadow-xl p-6 sticky top-24">
                            <div className="flex justify-between items-end mb-4">
                                <div>
                                    <span className="text-2xl font-bold">{property.price}</span>
                                </div>
                                <div className="text-sm text-gray-600">
                                    ★ {property.rating} · {property.reviewCount} reviews
                                </div>
                            </div>
                            <button
                                onClick={() => navigate(`/book/${property.id}`)}
                                className="w-full bg-red-500 text-white font-bold py-3 rounded-lg hover:bg-red-600 transition-colors mb-4"
                            >
                                Reserve
                            </button>
                            <p className="text-center text-sm text-gray-500">You won't be charged yet</p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default PropertyDetailsPage;
