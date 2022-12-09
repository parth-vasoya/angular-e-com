export interface OrderResponse {
  userId: string;
  items: Order[];
  total: number;
  id?: string;
}

export interface Order {
  name: string;
  quantity: string | number;
  stock: number;
  price: string;
  productId: string;
}
