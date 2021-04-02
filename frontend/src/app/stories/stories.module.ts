import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoriesComponent } from './stories/stories.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { StoryComponent } from './story/story.component';
import { StoriesRoutingModule } from './stoires-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    StoriesComponent, 
    StoryComponent,
  ],
  imports: [
    CommonModule,
    InfiniteScrollModule,
    StoriesRoutingModule,
    FontAwesomeModule,
  ]
})
export class StoriesModule { }
