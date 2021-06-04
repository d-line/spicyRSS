import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { AggregatesService, AggregatesStory } from '../aggregates.service';
import { Feed } from '../feed';
import { FeedService } from '../feed.service';

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.scss']
})
export class FeedsComponent implements OnInit {
  feeds: Feed[] = [];

  constructor(private feedService: FeedService, private aggregatesService: AggregatesService) { }

  ngOnInit(): void {
    this.feedService.getAll().pipe(first()).subscribe((feeds: Feed[]) => {
      this.feeds = feeds;
      this.aggregatesService.stories().pipe(first()).subscribe((aggregates) => {
        const aggregatesMap: {[key: string]: number} = {};
        aggregates.forEach((a: AggregatesStory) => {
          // eslint-disable-next-line no-underscore-dangle
          aggregatesMap[a._id] = a.count;
        });
        this.feeds.forEach((feed: Feed) => {
          // eslint-disable-next-line no-underscore-dangle
          const id: string = feed._id || '';
          feed.storiesCount = aggregatesMap[id] || 0;
        });
      });
    });
  }

}
