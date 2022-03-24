import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductColor } from 'src/app/models/product-color';
import { ProductColorFilter } from 'src/app/models/product-color-filter';

@Component({
  selector: 'color-list',
  templateUrl: './color-list.component.html',
  styleUrls: ['./color-list.component.scss'],
})
export class ColorListComponent implements OnInit {
  @Input() colorHueList: ProductColorFilter[];
  @Output() updateColorFilters = new EventEmitter<ProductColorFilter>();

  constructor() {}

  ngOnInit(): void {}

  getStyles(productColor: ProductColor): string {
    return `background-color: #${productColor.hex_value}`;
  }

  updatingColorFilters(colorFilter: ProductColorFilter) {
    this.updateColorFilters.emit(colorFilter);
  }
}
