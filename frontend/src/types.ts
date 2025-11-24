export interface Property {
    id: number;
    name: string;
    location: string;
    price: string;
    imageUrls: string[];
    description: string;
    rating: number;
    reviewCount: number;
    isGuestFavorite: boolean;
    categoryId?: number;
}

export interface Category {
    id: number;
    name: string;
    icon: string;
}
