import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeedsRoutingModule } from './feeds-routing.module';
import { FeedsComponent } from './feeds/feeds.component';
import { FeedComponent } from './feed/feed.component';


@NgModule({
  declarations: [
    FeedsComponent,
    FeedComponent
  ],
  imports: [
    CommonModule,
    FeedsRoutingModule
  ]
})
export class FeedsModule { }
