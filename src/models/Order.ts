import { Item } from "./Item";

export interface Order {
    id: number,
    items: Item[],
    cost: number,
    status: string,
    timer: number
}