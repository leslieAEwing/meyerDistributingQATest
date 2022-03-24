import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'filter-rating',
  templateUrl: './filter-rating.component.html',
  styleUrls: ['./filter-rating.component.scss'],
})
export class FilterRatingComponent implements OnInit {
  ratingList: number[] = [0, 1, 2, 3, 4, 5];
  @Output() filterByRating = new EventEmitter<number>();
  constructor() {}

  ngOnInit(): void {}

  getInputId(index: number) {
    return `ratingId-${index.toString()}`;
  }

  ratingFilter(e: any) {
    var rating: number = e.target.value;
    if (!e.target.checked) {
      rating = -1;
    }
    console.log('Inside ratingFilter:', rating);
    this.filterByRating.emit(rating);
  }
}
