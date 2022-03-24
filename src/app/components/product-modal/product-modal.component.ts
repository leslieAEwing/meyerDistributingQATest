import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Product } from 'src/app/models/product';
import { ProductColor } from 'src/app/models/product-color';

@Component({
  selector: 'product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.scss'],
})
export class ProductModalComponent implements OnInit {
  @Input() product: Product;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {}

  getColorStyles(productColor: ProductColor): string {
    return `background-color: #${productColor.hex_value}`;
  }

  showColorName(productColor: ProductColor): void {
    console.log('Color name is:', productColor.colour_name);
  }
}
