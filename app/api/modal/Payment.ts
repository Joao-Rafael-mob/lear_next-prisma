export interface Payment {
  id: string;
  orderId?: string;
  userId?: number;
  method?: string;
  status?: string;
  amount?: number;
  paymentDate?: Date;
}