export interface Review {
  id: string;
  productId: number;
  userId: number;
  rating?: number;
  comment?: string;
}