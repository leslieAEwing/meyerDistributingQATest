import { Pagination } from './pagination';
import { FilterOptions } from './filter-options';
import { Product } from './product';
import { ProductPriceRange } from './product-price-range';
import { ProductColor } from './product-color';
import { ProductColorFilter } from './product-color-filter';

export interface ProductProject {
  pagination: Pagination;
  filters: FilterOptions[];
  products: Product[];
  fullProductLength: number;
  productsToShow: number;
  categories: string[];
  productTypes: string[];
  priceRanges: ProductPriceRange[];
  colors: ProductColor[];
  colorFilters: ProductColorFilter[];
}
