import { Address } from "./Address";
import { Order } from "./Order";
import { Payment } from "./Payment";
import { Review } from "./Review";
import { Role } from "./Role";

export interface User {
    id: number;
    name: string;
    email: string;
    senha: string;
    isAdmin: Role;
    address?: Address;
    orders: Order[];
    reviews: Review[];
    payment: Payment[];
  }
  