import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Maybelline Store';
  year: string = '2022';

  constructor() {}

  ngOnInit() {
    this.year = new Date().getFullYear().toString();
  }
}
