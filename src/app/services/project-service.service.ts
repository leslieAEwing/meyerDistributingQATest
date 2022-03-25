import { Injectable } from '@angular/core';
import PRODUCTS from '../db.json';
import { Product } from '../models/product';
import { ProductProject } from '../models/product-project';
import { Pagination } from '../models/pagination';
import { FilterOptions } from '../models/filter-options';
import { FilterTypes } from '../models/filter-types';
import { ProductPriceRange } from '../models/product-price-range';
import { ProductColor } from '../models/product-color';
import { ProductColorFilter } from '../models/product-color-filter';
import { SortFilter } from '../models/sort-filter';
import { SortFilterDirection } from '../models/sort-filter-direction';

@Injectable({
  providedIn: 'root',
})
export class ProjectServiceService {
  numberOfProducts: number = 9;
  currentPage: number = 0;
  allProducts: Product[] = PRODUCTS;
  filteredProducts: Product[] = PRODUCTS;
  filters: FilterOptions[] = [];
  priceRanges: ProductPriceRange[] = [
    {
      min: 0,
      max: 5,
    },
    {
      min: 6,
      max: 10,
    },
    {
      min: 11,
      max: 15,
    },
    {
      min: 16,
      max: 1000000000,
    },
  ];

  sortFilterDirection = SortFilterDirection;
  filterTypes = FilterTypes;

  allProductColorFilters: ProductColorFilter[] = [];
  currentFilter: SortFilter = {
    name: this.filterTypes.Name,
    direction: this.sortFilterDirection.Ascend,
  };

  constructor() {}

  getInitialProjectObject(): ProductProject {
    this.allProductColorFilters = this.getAllProductColorsFilters();
    this.filteredProducts = this.filteredProducts.sort(
      (a: Product, b: Product) => a.name.localeCompare(b.name)
    );
    return this.updateProductProject();
  }

  getBasedOnPageNumber(pageNumber: number): ProductProject {
    this.currentPage = pageNumber;
    return this.updateProductProject();
  }

  filterBasedOnCategory(category: string): ProductProject {
    var filterOption: FilterOptions = {
      filterType: this.filterTypes.Category,
      value: category,
    };

    return this.addToFilterOptions(filterOption);
  }

  filterBasedOnProductType(type: string): ProductProject {
    var filterOption: FilterOptions = {
      filterType: this.filterTypes.Types,
      value: type,
    };

    return this.addToFilterOptions(filterOption);
  }

  filterBasedOnRating(rating: number): ProductProject {
    var filterOption: FilterOptions = {
      filterType: this.filterTypes.Rating,
      value: rating,
    };

    return this.addToFilterOptions(filterOption);
  }

  filterBasedOnPrice(price: number): ProductProject {
    var filterOption: FilterOptions = {
      filterType: this.filterTypes.Price,
      value: price,
    };

    return this.addToFilterOptions(filterOption);
  }

  filterBasedOnColor(colorHex: string): ProductProject {
    var filterOption: FilterOptions = {
      filterType: this.filterTypes.Color,
      value: colorHex,
    };

    return this.addToFilterOptions(filterOption);
  }

  removeFilters(): ProductProject {
    this.filters = [];
    this.currentPage = 0;
    this.filteredProducts = this.allProducts;
    return this.updateProductProject();
  }

  sortProducts(sortOption: SortFilter): ProductProject {
    this.currentPage = 0;

    if (sortOption.name == this.filterTypes.Name) {
      this.filteredProducts = this.filteredProducts.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    } else if (sortOption.name == this.filterTypes.Price) {
      this.filteredProducts = this.filteredProducts.sort(
        (a, b) => Number(a.price) - Number(b.price)
      );
    } else if (sortOption.name == this.filterTypes.Rating) {
      this.filteredProducts = this.filteredProducts.sort(
        (a, b) => a.rating - b.rating
      );
    }

    if (sortOption.direction == this.sortFilterDirection.Descend) {
      this.filteredProducts = this.filteredProducts.reverse();
    }

    return this.updateProductProject();
  }

  changeNumberProducts(newNumberOfProducts: number): ProductProject {
    this.numberOfProducts = newNumberOfProducts;
    this.currentPage = 0;
    return this.updateProductProject();
  }

  private addToFilterOptions(filterOption: FilterOptions): ProductProject {
    var isFound: boolean = false;
    var filterIndex = 0;
    this.currentPage = 0;
    this.filters.forEach((filter: FilterOptions, index) => {
      if (filterOption.filterType == filter.filterType) {
        if (filterOption.value == filter.value) {
          isFound = true;
          filterIndex = index;
          return;
        }
      }
    });

    if (isFound) {
      this.filters.splice(filterIndex, 1);
    } else {
      this.filters.push(filterOption);
    }

    this.filteredProducts = this.filterProductList();
    return this.updateProductProject();
  }

  private getPagination(products: Product[]): Pagination {
    var productLength: number = products.length;
    var numberOfPages: number = Math.ceil(
      productLength / this.numberOfProducts
    );

    var pagination: Pagination = {
      currentPage: this.currentPage,
      numberOfPages: numberOfPages,
    };

    return pagination;
  }

  private updateProductProject(): ProductProject {
    var startingNumber: number = this.currentPage;
    var endingNumber: number = this.numberOfProducts;
    if (this.currentPage > 0) {
      startingNumber = this.currentPage * this.numberOfProducts;
      endingNumber = startingNumber + this.numberOfProducts;

      if (endingNumber > this.filteredProducts.length) {
        endingNumber = this.filteredProducts.length + 1;
      }
    }
    var productProject: ProductProject = {
      pagination: this.getPagination(this.filteredProducts),
      filters: this.filters,
      fullProductLength: this.filteredProducts.length,
      productsToShow: this.numberOfProducts,
      products: this.filteredProducts.slice(startingNumber, endingNumber),
      categories: this.getAllCatgories(),
      productTypes: this.getAllProductTypes(),
      priceRanges: this.priceRanges,
      colors: this.getAllProductColors(),
      colorFilters: this.allProductColorFilters,
    };

    return productProject;
  }

  private getAllCatgories(): string[] {
    var categoryList: string[] = [];
    this.allProducts.forEach((x) => {
      const currentCategory = x.category;
      var inList = categoryList.find((c) => c == currentCategory);
      if (!inList && x.category != null) {
        categoryList.push(x.category);
      }
    });
    return categoryList;
  }

  private getAllProductTypes(): string[] {
    var productTypeList: string[] = [];
    this.allProducts.forEach((x) => {
      const currentType = x.product_type;
      var inList = productTypeList.find((c) => c == currentType);
      if (!inList && x.product_type != null) {
        productTypeList.push(x.product_type);
      }
    });
    return productTypeList;
  }

  private getAllProductColors(): ProductColor[] {
    var allProductColors: ProductColor[] = [];
    this.allProducts.forEach((prod: Product) => {
      const colorLists = prod.product_colors;
      if (colorLists.length != 0) {
        colorLists.forEach((color: ProductColor) => {
          var inList = allProductColors.find(
            (cur) => cur.hex_value == color.hex_value
          );
          if (!inList) {
            allProductColors.push(color);
          }
        });
      }
    });

    return allProductColors.sort((a, b) =>
      a.hex_value.localeCompare(b.hex_value)
    );
  }

  private getAllProductColorsFilters(): ProductColorFilter[] {
    var allProductColorFilters: ProductColorFilter[] = [];
    this.allProducts.forEach((prod: Product) => {
      const colorLists = prod.product_colors;
      if (colorLists.length != 0) {
        colorLists.forEach((color: ProductColor) => {
          var inList = allProductColorFilters.find(
            (cur) => cur.color.hex_value == color.hex_value
          );
          if (!inList) {
            allProductColorFilters.push(this.createHue(color));
          }
        });
      }
    });

    return allProductColorFilters.sort(
      (a: ProductColorFilter, b: ProductColorFilter) => a.hue - b.hue
    );
  }

  createHue(color: ProductColor): ProductColorFilter {
    var hue: number = 0;

    var r: number = parseInt(color.hex_value.slice(0, 2), 16);
    var g: number = parseInt(color.hex_value.slice(2, 4), 16);
    var b: number = parseInt(color.hex_value.slice(4, 6), 16);

    hue = r + g + b;
    var colorFilter: ProductColorFilter = {
      color: color,
      hue: hue,
      isSelected: false,
    };
    return colorFilter;
  }

  updateProductColorFilter(colorFilter: ProductColorFilter): ProductProject {
    this.allProductColorFilters.forEach((c: ProductColorFilter) => {
      if (c == colorFilter) {
        if (c.isSelected) {
          c.isSelected = false;
        } else {
          c.isSelected = true;
        }
        return;
      }
    });

    return this.filterBasedOnColor(colorFilter.color.hex_value);
  }

  private filterProductList(): Product[] {
    // will move this to a separate function
    var newFilteredProducts: Product[] = [];

    if (this.filters.length == 0) {
      newFilteredProducts = this.allProducts;
    } else {
      this.allProducts.forEach((prod: Product) => {
        var addProduct: boolean = false;
        this.filters.forEach((filter: FilterOptions) => {
          switch (filter.filterType) {
            case this.filterTypes.Category:
              if (filter.value == prod.category) {
                addProduct = true;
              }
              return;
            case this.filterTypes.Types:
              if (filter.value == prod.product_type) {
                addProduct = true;
              }
              return;
            case this.filterTypes.Color:
              if (prod.product_colors.length > 0) {
                prod.product_colors.forEach((color: ProductColor) => {
                  if (filter.value == color.hex_value) {
                    addProduct = true;
                    return;
                  }
                });
              }
              return;
            case this.filterTypes.Price:
              const minToCompare: number =
                this.priceRanges[Number(filter.value)].min;
              const maxToCompare: number =
                this.priceRanges[Number(filter.value)].max;

              if (
                Number(prod.price) >= minToCompare &&
                Number(prod.price) <= maxToCompare
              ) {
                addProduct = true;
              }
              return;
            case this.filterTypes.Rating:
              var filterRating = Number(filter.value);
              var filterRatingPlusOne = Number(filterRating) + Number(1);

              if (
                Number(prod.rating) >= filterRating &&
                Number(prod.rating) < filterRatingPlusOne
              ) {
                addProduct = true;
              }
              return;
          }
        });

        var alreadyAdded = newFilteredProducts.find(
          (foundProd: Product) => prod.name == foundProd.name
        );

        if (addProduct && !alreadyAdded) {
          newFilteredProducts.push(prod);
        }
      });
    }

    return newFilteredProducts;
  }
}
