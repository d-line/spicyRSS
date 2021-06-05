import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedsRoutingModule } from './feeds-routing.module';
import { FeedsComponent } from './feeds/feeds.component';
import { FeedComponent } from './feed/feed.component';
import { FeedEditComponent } from './feed-edit/feed-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    FeedsComponent,
    FeedComponent,
    FeedEditComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FeedsRoutingModule
  ]
})
export class FeedsModule { }
