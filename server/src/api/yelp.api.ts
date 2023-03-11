import axios, { AxiosInstance } from 'axios';
import {Restaurants} from "../model/restaurants";


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
            const { data } = response;

            return data.businesses.map((restaurant: any) => ({
                id: restaurant.id,
                name: restaurant.name,
                imageUrl: restaurant.image_url,
            }));


        } catch (e : any) {
            console.error(e);
            return [];
        }
    }

    public async getRestaurantDetails(id: string) : Promise<any> {
        try {
            const url = `${this.url}/${id}`;
            const response = await this.client.get(url);
            const { data } = response;
            return data;

        } catch (e) {
            console.error(e);
            return null;
        }
    }
}

export function makeYelpApiService(key : string) : YelpApiService{
    return new YelpApiService(key);
}
