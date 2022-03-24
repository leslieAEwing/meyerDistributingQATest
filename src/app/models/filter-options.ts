import { FilterTypes } from './filter-types';

export interface FilterOptions {
  filterType: FilterTypes;
  value: string | number;
}
