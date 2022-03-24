import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  @Input() categoryList: string[];
  @Input() title: string;
  @Input() categoryType: string;
  @Output() filterCategory = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  getCategoryId(index: number): string {
    return `${this.categoryType}Id- ${index.toString()}`;
  }

  filterTheCategory(e: any) {
    this.filterCategory.emit(e.target.value);
  }

  reformattingCategoryName(originalName: string): string {
    return originalName.replace(/_/g, ' ');
  }
}
