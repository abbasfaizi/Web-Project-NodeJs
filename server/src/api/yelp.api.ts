import axios, { AxiosInstance } from 'axios';
import {Restaurants} from "../model/restaurants";
import {RestaurantDetails} from "./restaurantDetails";


class YelpApiService {
    private apiKey: string;
    private url: string;
    private client: AxiosInstance;

    constructor(apiKey: string) {
        this.apiKey = apiKey;
        this.url = 'https://api.yelp.com/v3/businesses';
        this.client = axios.create({
            headers: {
                Authorization: `Bearer ${apiKey}`,
            },
        });
    }

    public async getRestaurants(location: string, term?: string) : Promise<Restaurants[]>{
        try {
            const url = `${this.url}/search`;
            const params = {
                location,
                term,
            };
            const response = await this.client.get(url, { params });
            const { data, status } = response;

            if (status !== 200) {
                throw new Error(`Received ${status} status code from Yelp API`);
            }

            return data.businesses.map((restaurant: any) => ({
                id: restaurant.id,
                name: restaurant.name,
                imageUrl: restaurant.image_url || (restaurant.photos &&
                                                  restaurant.photos.length > 0 ? restaurant.photos[0] :
                                        "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"),

                                     // "https://via.placeholder.com/300x300.png?text=No+Image+Available+For+The+Restaurant+" + restaurant.name),
            }));


        } catch (e : any) {
            console.error(e);
            return [];
        }
    }

    public async getRestaurantDetails(id: string) : Promise<RestaurantDetails | null> {
        try {
            const url = `${this.url}/${id}`;
            const response = await this.client.get(url);
            const { data, status } = response;
            const parsedData = JSON.parse(JSON.stringify(data));

            if (status !== 200) {
                throw new Error(`Received ${status} status code from Yelp API`);
            }

            const restaurantDetails: RestaurantDetails = {
                id: parsedData.id,
                name: parsedData.name,
                image_url: parsedData.image_url || "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg",
                phone: parsedData.phone,
                price: parsedData.price,
                rating: parsedData.rating,
                review_count: parsedData.review_count,
                categories: parsedData.categories.map((category: any) => category.title),
                location: {
                    address1: parsedData.location.address1,
                    address2: parsedData.location.address2,
                    address3: parsedData.location.address3,
                    city: parsedData.location.city,
                    state: parsedData.location.state,
                    zip_code: parsedData.location.zip_code,
                    country: parsedData.location.country,
                    latitude: parsedData.coordinates.latitude,
                    longitude: parsedData.coordinates.longitude,
                },
                photos: parsedData.photos,
            };

            return restaurantDetails;
        } catch (e) {
            console.error(e);
            return null;
        }
    }
}

export function makeYelpApiService(key : string) : YelpApiService{
    return new YelpApiService(key);
}
