export interface CartItem {
   quantity: number;
   product: Product | null;
}

export interface Product {
   id: string;
   name: string;
   price: number;
   image: string | null;
}

export type CartDetails = {
   totalQuantity: number;
   totalPrice: number;
} | null;
