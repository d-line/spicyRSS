import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoriesComponent } from '../stories/stories.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [StoriesComponent],
  imports: [
    CommonModule
  ]
})
export class StoriesModule { }
