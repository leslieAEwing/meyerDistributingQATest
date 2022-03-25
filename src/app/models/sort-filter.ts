import { FilterTypes } from './filter-types';
import { SortFilterDirection } from './sort-filter-direction';

export interface SortFilter {
  name: FilterTypes;
  direction: SortFilterDirection;
}
