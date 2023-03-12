export interface Category {
    alias: string;
    title: string;
}

export interface Location {
    address1: string;
    address2?: string;
    address3?: string;
    city: string;
    state: string;
    zip_code: string;
    country: string;
    latitude: number;
    longitude: number;
}

export interface RestaurantDetails {
    id: string;
    name: string;
    image_url: string;
    phone: string;
    price: string;
    rating: number;
    review_count: number;
    categories: Category;
    location: Location;
    photos: string[];
}
