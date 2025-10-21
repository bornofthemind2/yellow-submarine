
export enum ProductCategory {
    FLOWER = 'Flower',
    EDIBLE = 'Edible',
    CONCENTRATE = 'Concentrate',
    VAPE = 'Vape',
}

export enum StrainType {
    SATIVA = 'Sativa',
    INDICA = 'Indica',
    HYBRID = 'Hybrid',
}

export interface Comment {
    id: number;
    author: string;
    text: string;
}

export interface Review {
    id: number;
    name: string;
    brand: string;
    category: ProductCategory;
    strain: StrainType;
    image: string;
    rating: number; // 1-5
    thc: number; // percentage
    cbd: number; // percentage
    effects: string[];
    flavors: string[];
    summary: string;
    fullReview: string;
    likes: number;
    comments: Comment[];
    price: number; // Price in USD
    isFeatured: boolean; // Whether this product should be featured in hero section
}

export interface VibePairing {
    activity: {
        name: string;
        description: string;
    };
    music: {
        album: string;
        artist: string;
        description: string;
    };
    movie: {
        title: string;
        year: number;
        description: string;
    };
}

export enum UserRole {
    USER = 'user',
    ADMIN = 'admin',
}

export interface User {
    id: number;
    username: string;
    password; // In a real app, this would be a hash
    role: UserRole;
}
