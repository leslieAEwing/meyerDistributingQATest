import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Product } from 'src/app/models/product';
import { ProductProject } from 'src/app/models/product-project';
import { ProjectServiceService } from '../../services/project-service.service';
import { ProductModalComponent } from '../product-modal/product-modal.component';
import { FilterTypes } from '../../models/filter-types';
import {
  faChevronDown,
  faChevronLeft,
  faChevronRight,
  faChevronUp,
} from '@fortawesome/free-solid-svg-icons';
import { FilterOptions } from 'src/app/models/filter-options';
import { ProductColor } from '../../models/product-color';
import { ProductPriceRange } from '../../models/product-price-range';
import { Pagination } from '../../models/pagination';
import { ProductColorFilter } from 'src/app/models/product-color-filter';

@Component({
  selector: 'project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit {
  productProject: ProductProject;

  counter = Array;
  filterTypes = FilterTypes;
  iconDown = faChevronDown;
  iconUp = faChevronUp;
  iconLeft = faChevronLeft;
  iconRight = faChevronRight;

  openFilters = false;

  constructor(
    private modalService: NgbModal,
    private projectService: ProjectServiceService
  ) {}

  ngOnInit(): void {
    this.productProject = this.projectService.getInitialProjectObject();
  }

  productColor(color: ProductColor): string {
    return `background-color: #${color.hex_value}`;
  }

  openModal(product: Product) {
    const modalRef = this.modalService.open(ProductModalComponent);
    modalRef.componentInstance.product = product;
  }

  filterCategories(category: string) {
    this.productProject = this.projectService.filterBasedOnCategory(category);
  }

  filterProductTypes(type: string) {
    this.productProject = this.projectService.filterBasedOnProductType(type);
  }

  paginationClick(pageNumber: number) {
    this.productProject = this.projectService.getBasedOnPageNumber(pageNumber);
  }

  getFilterType(filterType: FilterTypes): string {
    var filterTypeText: string = '';
    switch (filterType) {
      case this.filterTypes.Category:
        filterTypeText = 'Category';
        break;
      case this.filterTypes.Color:
        filterTypeText = 'Color';
        break;
      case this.filterTypes.Types:
        filterTypeText = 'Type';
        break;
      case this.filterTypes.Rating:
        filterTypeText = 'Rating';
        break;
      case this.filterTypes.Price:
        filterTypeText = 'Price';
        break;
    }
    return filterTypeText;
  }

  getId(startString: string, index: number): string {
    return `${startString}-${index}`;
  }

  filterRating(e: any) {
    this.productProject = this.projectService.filterBasedOnRating(
      e.target.value
    );
  }

  filterPrice(e: any) {
    this.productProject = this.projectService.filterBasedOnPrice(
      e.target.value
    );
  }

  filterColor(colorFilter: ProductColorFilter) {
    this.productProject =
      this.projectService.updateProductColorFilter(colorFilter);
  }

  appliedFilterText(filter: FilterOptions): string {
    var filterTextString: string = '';

    switch (filter.filterType) {
      case this.filterTypes.Category:
        filterTextString = `Category : ${filter.value}`;
        break;
      case this.filterTypes.Color:
        filterTextString = 'Color : ';
        var isColorFound: boolean = false;
        this.productProject.colors.forEach((color: ProductColor) => {
          if (color.hex_value == filter.value) {
            isColorFound = true;
            filterTextString += `${color.colour_name}`;
            return;
          }
        });

        if (!isColorFound) {
          filterTextString += `#${filter.value}`;
        }
        break;
      case this.filterTypes.Price:
        const priceRange: ProductPriceRange =
          this.productProject.priceRanges[Number(filter.value)];
        filterTextString = `Price : $${priceRange.min}`;
        if (filter.value < this.productProject.priceRanges.length - 1) {
          filterTextString += ` - ${priceRange.max}`;
        }
        break;
      case this.filterTypes.Rating:
        filterTextString = `Rating : ${filter.value}`;
        break;
      case this.filterTypes.Types:
        filterTextString = `Product Type : ${filter.value}`;
        break;
    }
    return filterTextString;
  }

  removeFilters() {
    const checkboxes = document.getElementsByTagName('input');
    for (var i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked) {
        checkboxes[i].checked = false;
      }
    }
    this.productProject = this.projectService.removeFilters();
  }

  pageText(): string {
    var beginningNumber: number =
      this.productProject.pagination.currentPage *
        this.productProject.productsToShow +
      1;
    var endingNumber: number =
      beginningNumber + this.productProject.productsToShow - 1;

    if (endingNumber > this.productProject.fullProductLength) {
      endingNumber = this.productProject.fullProductLength;
    }
    var pageText: string = `Products ${beginningNumber} to ${endingNumber} of ${this.productProject.fullProductLength}`;
    return pageText;
  }

  toggleFilter(): void {
    if (this.openFilters) {
      this.openFilters = false;
      document.body.classList.remove('filter-open');
    } else {
      this.openFilters = true;
      document.body.classList.add('filter-open');
    }
  }
}
