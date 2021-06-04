import { Component, OnInit } from '@angular/core';
import { Story } from '../story';
import { StoryService } from '../story.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.scss'],
})
export class StoriesComponent implements OnInit {
  stories: Story[] = [];
  currentPage = 1;

  constructor(private storyService: StoryService) {}

  public ngOnInit(): void {
    this.currentPage = 1
    this.storyService
      .unread()
      .pipe(first())
      .subscribe((stories: Story[]) => (this.stories = stories));
  }

  public onScroll(): void {
    this.currentPage++;
    this.storyService
      .unread(this.currentPage)
      .pipe(first())
      .subscribe((stories: Story[]) => {
        this.stories = [...this.stories, ...stories]
      })
  }

  public onCloseAll(story: Story) {
    this.stories.forEach((el: Story, index) => {
      if (el._id !== story._id) {
        this.stories[index].isOpened = false;
      }
    });
  }
}
