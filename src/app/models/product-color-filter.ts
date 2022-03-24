import { ProductColor } from './product-color';

export interface ProductColorFilter {
  color: ProductColor;
  hue: number;
  isSelected: boolean;
}
