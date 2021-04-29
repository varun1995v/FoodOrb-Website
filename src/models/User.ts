export interface User {
    id: number,
    name: string,
    email: string,
    password: string,
    phone: number,
    type: string,
    friends: Friend[],
    image: string,
    request: boolean,
    addresses: string[],
    cards: string[]
}

export interface Friend {
    id: number
}