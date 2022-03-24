import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductComponent } from './components/product/product.component';
import { ProductModalComponent } from './components/product-modal/product-modal.component';
import { RatingStarsComponent } from './components/rating-stars/rating-stars.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FilterComponent } from './components/filter/filter.component';
import { ColorListComponent } from './components/color-list/color-list.component';
import { FilterRatingComponent } from './components/filter-rating/filter-rating.component';
import { ProjectComponent } from './components/project/project.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    ProductModalComponent,
    RatingStarsComponent,
    FilterComponent,
    ColorListComponent,
    FilterRatingComponent,
    ProjectComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, NgbModule, FontAwesomeModule],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ProductModalComponent],
})
export class AppModule {}
