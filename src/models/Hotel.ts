import { Item } from "./Item";

export interface Hotel {
    id: number,
    name: string,
    zipcode: number,
    rating: number,
    image: string,
    items: Item[]
}
