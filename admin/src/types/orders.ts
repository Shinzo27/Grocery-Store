export type Order = {
    _id: string;
    user: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    total: string;
    products: [],
    orderId: string;
    status?: string | "Pending"
}