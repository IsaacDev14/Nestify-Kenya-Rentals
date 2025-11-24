import React, { createContext, useContext, useState, useEffect } from "react";

interface WishlistContextType {
    wishlist: number[];
    addToWishlist: (propertyId: number) => void;
    removeFromWishlist: (propertyId: number) => void;
    isInWishlist: (propertyId: number) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [wishlist, setWishlist] = useState<number[]>(() => {
        const saved = localStorage.getItem("wishlist");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }, [wishlist]);

    const addToWishlist = (propertyId: number) => {
        setWishlist((prev) => [...prev, propertyId]);
    };

    const removeFromWishlist = (propertyId: number) => {
        setWishlist((prev) => prev.filter((id) => id !== propertyId));
    };

    const isInWishlist = (propertyId: number) => {
        return wishlist.includes(propertyId);
    };

    return (
        <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error("useWishlist must be used within WishlistProvider");
    }
    return context;
};
