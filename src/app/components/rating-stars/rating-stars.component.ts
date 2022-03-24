import { Component, Input, OnInit } from '@angular/core';
import { faStar as filledStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'rating-stars',
  templateUrl: './rating-stars.component.html',
  styleUrls: ['./rating-stars.component.scss'],
})
export class RatingStarsComponent implements OnInit {
  @Input() starRating: number = 0;

  numberOfStars: number[] = [0, 1, 2, 3, 4];
  filledStar = filledStar;
  regularStar = regularStar;
  flooredStar = 0;
  constructor() {}

  ngOnInit(): void {
    this.flooredStar = Math.floor(this.starRating);
  }
}
