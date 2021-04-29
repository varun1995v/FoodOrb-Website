import { Item } from "./Item";

export interface OrderDetail {
    items: Item[],
    address: string,
    payment: string,
    timer: number,
    status: string,
    user: string,
    amount: number
}