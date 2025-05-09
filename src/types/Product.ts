export interface Product {
   id: string;
   name: string;
   price: number;
   category: string;
   description: string;
   stock: number;
   image: string | null;
   isActive: boolean;
   total_likes: number;
   total_sales: number;
   createdAt: Date;
   store: {
      slug: string;
      name: string;
      logo: string | null;
   } | null;
}
