import React, { useState } from "react";
import type { Property } from "../types";
import { useNavigate } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";

interface PropertyCardProps {
    property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();
    const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();

    const goToNextImage = () => {
        setCurrentImageIndex(
            (prevIndex) => (prevIndex + 1) % property.imageUrls.length
        );
    };

    const goToPrevImage = () => {
        setCurrentImageIndex(
            (prevIndex) =>
                (prevIndex - 1 + property.imageUrls.length) %
                property.imageUrls.length
        );
    };

    return (
        <div
            className="bg-white rounded-xl overflow-hidden transition-all duration-300 ease-in-out cursor-pointer shadow-md hover:shadow-xl"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => navigate(`/properties/${property.id}`)}
        >
            <div className="property-image-container relative aspect-[4/3]">
                {/* Image */}
                <img
                    src={property.imageUrls[currentImageIndex]}
                    alt={`${property.name} ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500"
                    style={{ transform: isHovered ? "scale(1.05)" : "scale(1)" }}
                    onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src =
                            "https://placehold.co/800x600/e2e8f0/64748b?text=Image+Unavailable";
                    }}
                />

                {/* Wishlist Heart Button */}
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (isInWishlist(property.id)) {
                            removeFromWishlist(property.id);
                        } else {
                            addToWishlist(property.id);
                        }
                    }}
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white hover:scale-110 transition-all duration-200 focus:outline-none z-20"
                    aria-label={isInWishlist(property.id) ? "Remove from wishlist" : "Add to wishlist"}
                >
                    <svg
                        className={`h-6 w-6 ${isInWishlist(property.id)
                            ? "fill-red-500 stroke-red-500"
                            : "fill-none stroke-gray-700"
                            } transition-all duration-200`}
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                    </svg>
                </button>

                {/* Navigation Buttons */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        goToPrevImage();
                    }}
                    className="absolute top-1/2 left-2 -translate-y-1/2 p-2 bg-white bg-opacity-80 rounded-full shadow-lg hover:bg-opacity-100 transition-all duration-200 opacity-0 group-hover:opacity-100 focus:outline-none"
                    style={{ opacity: isHovered ? 1 : 0 }}
                    aria-label="Previous image"
                >
                    <svg
                        className="h-5 w-5 text-gray-800"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 19l-7-7 7-7"
                        ></path>
                    </svg>
                </button>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        goToNextImage();
                    }}
                    className="absolute top-1/2 right-2 -translate-y-1/2 p-2 bg-white bg-opacity-80 rounded-full shadow-lg hover:bg-opacity-100 transition-all duration-200 opacity-0 group-hover:opacity-100 focus:outline-none"
                    style={{ opacity: isHovered ? 1 : 0 }}
                    aria-label="Next image"
                >
                    <svg
                        className="h-5 w-5 text-gray-800"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 5l7 7-7 7"
                        ></path>
                    </svg>
                </button>

                {/* Pagination Dots */}
                <div
                    className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-1.5 z-10"
                    style={{ opacity: isHovered ? 1 : 0.7 }}
                >
                    {property.imageUrls.map((_, dotIndex) => (
                        <div
                            key={dotIndex}
                            className={`w-2 h-2 rounded-full transition-all duration-200 ${dotIndex === currentImageIndex
                                ? "bg-white w-3"
                                : "bg-gray-300 bg-opacity-70"
                                } cursor-pointer`}
                            onClick={(e) => {
                                e.stopPropagation();
                                setCurrentImageIndex(dotIndex);
                            }}
                            aria-label={`Go to image ${dotIndex + 1}`}
                        ></div>
                    ))}
                </div>

                {/* Like/Heart Icon */}
                <button className="absolute top-3 right-3 z-10 p-2 bg-white bg-opacity-80 rounded-full shadow-lg hover:bg-opacity-100 transition-all duration-200 focus:outline-none">
                    <svg
                        className="h-5 w-5 text-red-500 hover:text-red-700"
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
                </button>
                {property.isGuestFavorite && (
                    <span className="absolute top-3 left-3 bg-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-md z-10">
                        Guest favorite
                    </span>
                )}
            </div>
            <div className="p-4 pt-3">
                <div className="flex justify-between items-start mb-1">
                    <h3 className="font-semibold text-gray-900 text-lg leading-tight truncate">
                        {property.location}
                    </h3>
                    <div className="flex items-center text-sm text-gray-600">
                        <svg
                            className="h-4 w-4 text-yellow-500 mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.83-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"></path>
                        </svg>
                        <span className="text-sm font-medium">{property.rating}</span>
                    </div>
                </div>
                <p className="text-gray-600 text-base mb-1 truncate">
                    {property.name}
                </p>
                <p className="text-gray-500 text-sm mb-2 line-clamp-2">
                    {property.description}
                </p>
                <p className="font-bold text-gray-900 text-base">{property.price}</p>
            </div>
        </div>
    );
};

export default PropertyCard;
