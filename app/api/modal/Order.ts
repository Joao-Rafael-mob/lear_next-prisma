import { OrderProduct } from "./OrderProduct";
import { Payment } from "./Payment";

export interface Order {
  id: string;
  userId: number;
  orderDate?: Date;
  status?: string;
  products: OrderProduct[];
  payments: Payment[];
}