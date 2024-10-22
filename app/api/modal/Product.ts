import { Category } from "./Category"
import { OrderProduct } from "./OrderProduct"
import { Review } from "./Review"
import { Stock } from "./Stock"

export interface Product {
    id: number;
    name?: string;
    description?: string;
    price?: number;
    imageUrl?: string;
    stock: Stock;
    categories: Category[];
    reviews: Review[];
    orderProduct: OrderProduct[];
    History: History[];
}