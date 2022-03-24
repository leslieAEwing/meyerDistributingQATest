import { ProductColor } from './product-color';
export interface Product {
  id: Number;
  brand: string | null;
  name: string | null;
  price: string | null;
  image_link: string | null;
  product_link: string | null;
  website_link: string | null;
  description: string | null;
  rating: number;
  category: string | null;
  product_type: string | null;
  product_colors: ProductColor[] | [];
}
