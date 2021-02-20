import { Component, OnInit } from '@angular/core';
import { Story } from './story';
import { StoryService } from './story.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.scss'],
})
export class StoriesComponent implements OnInit {
  stories: Story[] = [];

  constructor(private storyService: StoryService) {}

  ngOnInit(): void {
    this.storyService
      .unread()
      .pipe(first())
      .subscribe((stories: Story[]) => (this.stories = stories));
  }
}
